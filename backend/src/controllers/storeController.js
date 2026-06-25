const Store = require("../models/Store");

exports.createStore = async (req, res) => {
  try {
    const store = await Store.create(req.body);

    res.status(201).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStores = async (req, res) => {
  try {
    const stores = await Store.find()
      .populate("manager", "name email role");

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.getStore = async (req, res) => {
  try {
    const store = await Store.findById(
      req.params.id
    ).populate(
      "manager",
      "name email role"
    );

    if (!store) {
      return res.status(404).json({
        message: "Store not found",
      });
    }

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateStore = async (
  req,
  res
) => {
  try {
    const store =
      await Store.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    res.status(200).json(store);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteStore = async (
  req,
  res
) => {
  try {
    await Store.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Store deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};