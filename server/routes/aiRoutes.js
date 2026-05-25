const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const {
    generateQuestions,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", protect, generateQuestions);

module.exports = router;