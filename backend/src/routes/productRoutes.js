const express = require("express");

const router = express.Router();

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  createProduct
);

router.get(
  "/",
  protect,
  getProducts
);

router.get(
  "/:id",
  protect,
  getProduct
);

router.put(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  updateProduct
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;