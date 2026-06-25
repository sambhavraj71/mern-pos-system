const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },

    currentStock: {
      type: Number,
      default: 0,
    },

    reorderLevel: {
      type: Number,
      default: 10,
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);