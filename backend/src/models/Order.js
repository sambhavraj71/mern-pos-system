const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {
      customerName: {
        type: String,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: [
          "cash",
          "card",
          "upi",
        ],
        required: true,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "completed",
          "cancelled",
        ],
        default: "completed",
      },

      createdBy: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Order",
  orderSchema
);