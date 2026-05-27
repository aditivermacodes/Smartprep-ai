const express = require("express");

const router = express.Router();

const {
  chatInterview,
  getSessions,
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

module.exports = router;