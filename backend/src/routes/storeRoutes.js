const express = require("express");

const router = express.Router();

const {
  createStore,
  getStores,
  getStore,
  updateStore,
  deleteStore,
} = require("../controllers/storeController");

const {
  protect,
} = require("../middleware/authMiddleware");

const {
  authorizeRoles,
} = require("../middleware/roleMiddleware");

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createStore
);

router.get(
  "/",
  protect,
  getStores
);

router.get(
  "/:id",
  protect,
  getStore
);

router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  updateStore
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteStore
);

module.exports = router;