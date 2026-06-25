const express = require("express");

const router = express.Router();

const {
  createInventory,
  getInventories,
  updateStock,
  getInventoryLogs,
  getLowStockProducts,
} = require(
  "../controllers/inventoryController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const {
  authorizeRoles,
} = require(
  "../middleware/roleMiddleware"
);

router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  createInventory
);

router.get(
  "/",
  protect,
  getInventories
);

router.get(
  "/low-stock",
  protect,
  getLowStockProducts
);

router.get(
  "/logs/all",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  getInventoryLogs
);
router.put(
  "/:id/stock",
  protect,
  authorizeRoles(
    "admin",
    "manager"
  ),
  updateStock
);

module.exports = router;