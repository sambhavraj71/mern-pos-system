const mongoose = require("mongoose");

const Order = require("../models/Order");
const OrderItem = require("../models/OrderItem");
const Product = require("../models/Product");
const Inventory = require("../models/Inventory");
const InventoryLog = require("../models/InventoryLog");
exports.createOrder = async (
  req,
  res
) => {
  const session =
    await mongoose.startSession();

  session.startTransaction();

  try {
    const {
      customerName,
      paymentMethod,
      items,
    } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const product =
        await Product.findById(
          item.product
        );

      if (!product) {
        throw new Error(
          "Product not found"
        );
      }

      if (
        product.stock <
        item.quantity
      ) {
        throw new Error(
          `${product.name} out of stock`
        );
      }

      totalAmount +=
        product.price *
        item.quantity;
    }

    const order =
      await Order.create(
        [
          {
            customerName,
            paymentMethod,
            totalAmount,
            createdBy:
              req.user._id,
          },
        ],
        { session }
      );

    for (const item of items) {
      const product =
        await Product.findById(
          item.product
        );

      await OrderItem.create(
        [
          {
            order:
              order[0]._id,
            product:
              product._id,
            quantity:
              item.quantity,
            price:
              product.price,
            subtotal:
              product.price *
              item.quantity,
          },
        ],
        { session }
      );

      const inventory =
        await Inventory.findOne({
          product:
            product._id,
        });

      const previousStock =
        inventory.currentStock;

      inventory.currentStock -=
        item.quantity;

      await inventory.save({
        session,
      });

      product.stock -=
        item.quantity;

      await product.save({
        session,
      });

      await InventoryLog.create(
        [
          {
            product:
              product._id,
            action: "OUT",
            quantity:
              item.quantity,
            previousStock,
            newStock:
              inventory.currentStock,
            note:
              "Order Checkout",
            performedBy:
              req.user._id,
          },
        ],
        { session }
      );
    }

    await session.commitTransaction();

    res.status(201).json({
      message:
        "Order created successfully",
      orderId:
        order[0]._id,
      totalAmount,
    });
  } catch (error) {
    await session.abortTransaction();

    res.status(500).json({
      message: error.message,
    });
  } finally {
    session.endSession();
  }
};


exports.getOrders = async (
  req,
  res
) => {
  try {
    const orders =
      await Order.find()
        .populate(
          "createdBy",
          "name role"
        )
        .sort({
          createdAt: -1,
        });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


exports.getOrder = async (
  req,
  res
) => {
  try {
    const order =
      await Order.findById(
        req.params.id
      );

    const items =
      await OrderItem.find({
        order: order._id,
      }).populate(
        "product",
        "name sku"
      );

    res.json({
      order,
      items,
    });
  } catch (error) {
  console.log("ORDER ERROR:");
  console.log(error);

  await session.abortTransaction();

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
};

