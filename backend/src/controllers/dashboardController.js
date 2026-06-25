const Product = require("../models/Product");
const Order = require("../models/Order");
const Inventory = require("../models/Inventory");
const OrderItem = require("../models/OrderItem");

exports.getDashboardStats =
  async (req, res) => {
    try {
      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const lowStockProducts =
        await Inventory.countDocuments({
          $expr: {
            $lte: [
              "$currentStock",
              "$reorderLevel",
            ],
          },
        });

      const revenue =
        await Order.aggregate([
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: "$totalAmount",
              },
            },
          },
        ]);

      res.json({
        totalProducts,
        totalOrders,
        totalRevenue:
          revenue[0]
            ?.totalRevenue || 0,
        lowStockProducts,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  exports.getRecentOrders =
  async (req, res) => {
    try {
      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          })
          .limit(10);

      res.json(orders);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


  exports.getTopProducts = async (
  req,
  res
) => {
  try {
    const products =
      await OrderItem.aggregate([
        {
          $group: {
            _id: "$product",
            totalSold: {
              $sum: "$quantity",
            },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $limit: 5,
        },
      ]);

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


