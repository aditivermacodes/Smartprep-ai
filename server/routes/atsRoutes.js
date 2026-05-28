const express = require("express");

const router = express.Router();

const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

const {
  analyzeResume,
  analyzeResumePDF,
} = require("../controllers/atsController");

const { protect } =
  require("../middleware/authMiddleware");

// TEXT ATS

router.post(
  "/analyze",
  protect,
  analyzeResume
);

// PDF ATS

router.post(
  "/analyze-pdf",
  protect,
  upload.single("resume"),
  analyzeResumePDF
);

module.exports = router;