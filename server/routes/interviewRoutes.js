const express = require("express");

const router = express.Router();

const {
  chatInterview,
  getSessions,
  getAnalytics,
} = require("../controllers/interviewController");

const { protect } =
  require("../middleware/authMiddleware");

router.post(
  "/chat",
  protect,
  chatInterview
);

router.get(
  "/sessions",
  protect,
  getSessions
);

router.get(
  "/analytics",
  protect,
  getAnalytics
);

module.exports = router;