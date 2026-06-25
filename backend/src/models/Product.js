const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    size: {
      type: String,
      default: "",
    },

    color: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    store: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  name: "text",
  category: "text",
  sku: "text",
});

module.exports = mongoose.model(
  "Product",
  productSchema
);