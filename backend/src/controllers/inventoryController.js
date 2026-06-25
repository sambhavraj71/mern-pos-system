const Inventory = require("../models/Inventory");
const InventoryLog = require("../models/InventoryLog");
const Product = require("../models/Product");
exports.createInventory = async (
  req,
  res
) => {
  try {
    const inventory =
      await Inventory.create(req.body);

    res.status(201).json(
      inventory
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInventories = async (
  req,
  res
) => {
  try {
    const inventories =
      await Inventory.find()
        .populate(
          "product",
          "name sku stock"
        );

    res.json(inventories);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getLowStockProducts =
  async (req, res) => {
    try {
      const lowStock =
        await Inventory.find({
          $expr: {
            $lte: [
              "$currentStock",
              "$reorderLevel",
            ],
          },
        }).populate(
          "product",
          "name sku"
        );

      res.json(lowStock);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  

exports.updateStock = async (
  req,
  res
) => {
  try {
    const {
      quantity,
      action,
      note,
    } = req.body;

    const inventory =
      await Inventory.findById(
        req.params.id
      );

    if (!inventory) {
      return res.status(404).json({
        message:
          "Inventory not found",
      });
    }

    const previousStock =
      inventory.currentStock;

    if (action === "IN") {
      inventory.currentStock +=
        quantity;
    }

    if (action === "OUT") {
      inventory.currentStock -=
        quantity;
    }

    inventory.lastUpdated =
      new Date();

    await inventory.save();

    await Product.findByIdAndUpdate(
      inventory.product,
      {
        stock:
          inventory.currentStock,
      }
    );

    await InventoryLog.create({
      product:
        inventory.product,
      action,
      quantity,
      previousStock,
      newStock:
        inventory.currentStock,
      note,
      performedBy:
        req.user._id,
    });

    res.json(inventory);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getInventoryLogs = async (
  req,
  res
) => {
  try {
    const logs =
      await InventoryLog.find()
        .populate(
          "product",
          "name sku"
        )
        .populate(
          "performedBy",
          "name role"
        )
        .sort({
          createdAt: -1,
        });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getDashboardStats =
  async (req, res) => {
    try {
      const Product =
        require("../models/Product");

      const Order =
        require("../models/Order");

      const Inventory =
        require("../models/Inventory");

      const totalProducts =
        await Product.countDocuments();

      const totalOrders =
        await Order.countDocuments();

      const lowStock =
        await Inventory.countDocuments({
          $expr: {
            $lte: [
              "$currentStock",
              "$reorderLevel",
            ],
          },
        });

      const orders =
        await Order.find();

      const totalRevenue =
        orders.reduce(
          (sum, order) =>
            sum +
            order.totalAmount,
          0
        );

      const recentOrders =
        await Order.find()
          .sort({
            createdAt: -1,
          })
          .limit(5);

      res.json({
        totalProducts,
        totalOrders,
        lowStock,
        totalRevenue,
        recentOrders,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

