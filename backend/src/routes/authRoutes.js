const express = require("express");

const router = express.Router();
const {
  register,
  login,
  getProfile,
} = require("../controllers/authController");


const {
  protect,
} = require("../middleware/authMiddleware");
router.post(
  "/register",
  register
);
router.get(
  "/profile",
  protect,
  getProfile
);
router.post(
  "/login",
  login
);

module.exports = router;