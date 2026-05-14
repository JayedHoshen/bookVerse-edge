const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getReviewById,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { protect } = require("../middlewares/auth.middleware");

// Public routes
router.get("/", getAllReviews);
router.get("/:id", getReviewById);

// Protected routes (require authentication)
router.post("/", protect, createReview);
router.get("/user/my-reviews", protect, getMyReviews);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

module.exports = router;
