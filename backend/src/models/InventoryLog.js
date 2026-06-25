const mongoose = require("mongoose");

const inventoryLogSchema =
  new mongoose.Schema(
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      action: {
        type: String,
        enum: [
          "IN",
          "OUT",
          "ADJUSTMENT",
        ],
        required: true,
      },

      quantity: {
        type: Number,
        required: true,
      },

      previousStock: Number,

      newStock: Number,

      note: String,

      performedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "InventoryLog",
  inventoryLogSchema
);