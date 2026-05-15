const express = require("express");
const router = express.Router();
const {
  getMyReadingProgress,
  getReadingProgressById,
  updateReadingProgress,
  deleteReadingProgress,
  getReadingStats,
} = require("../controllers/readingProgress.controller");
const { protect } = require("../middlewares/auth.middleware");

// All routes require authentication
router.get("/stats", protect, getReadingStats);
router.get("/", protect, getMyReadingProgress);
router.get("/:id", protect, getReadingProgressById);
router.post("/", protect, updateReadingProgress);
router.delete("/:id", protect, deleteReadingProgress);

module.exports = router;
