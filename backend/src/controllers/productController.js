const Product = require("../models/Product");
const Inventory = require(
  "../models/Inventory"
);


exports.createProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.create(
        req.body
      );

    await Inventory.create({
      product: product._id,
      currentStock:
        product.stock || 0,
      reorderLevel: 10,
    });

    res.status(201).json(
      product
    );
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProducts = async (
  req,
  res
) => {
  try {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 10;

    const search =
      req.query.search || "";

    const query = search
      ? {
          $text: {
            $search: search,
          },
        }
      : {};

    const total =
      await Product.countDocuments(
        query
      );

    const products =
      await Product.find(query)
        .populate("store", "name")
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({ createdAt: -1 });

    res.json({
      total,
      page,
      pages: Math.ceil(
        total / limit
      ),
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      ).populate(
        "store",
        "name address"
      );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteProduct = async (
  req,
  res
) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};