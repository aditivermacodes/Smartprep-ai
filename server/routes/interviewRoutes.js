const express = require("express");

const router = express.Router();

const {
  chatInterview,
} = require("../controllers/interviewController");

const { protect } =
  require("../middleware/authMiddleware");

router.post(
  "/chat",
  protect,
  chatInterview
);

module.exports = router;