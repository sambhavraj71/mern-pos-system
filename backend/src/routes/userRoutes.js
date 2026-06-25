const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  deleteUser,
  createUser,
} = require(
  "../controllers/userController"
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

router.get(
  "/",
  protect,
  authorizeRoles("admin"),
  getAllUsers
);

router.get(
  "/:id",
  protect,
  authorizeRoles("admin"),
  getSingleUser
);

router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  createUser
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUser
);

module.exports = router;