const Review = require("../models/review.model");
const Product = require("../models/product.model");

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const { productId, userId, page = 1, limit = 10 } = req.query;

    const query = {};
    if (productId) query.product = productId;
    if (userId) query.user = userId;

    const reviews = await Review.find(query)
      .populate("user", "username email")
      .populate("product", "name image")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      data: reviews,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reviews",
      error: error.message,
    });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "username email")
      .populate("product", "name image");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching review",
      error: error.message,
    });
  }
};

// Get reviews by current user
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate("product", "name image category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching user reviews",
      error: error.message,
    });
  }
};

// Create new review
const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment } = req.body;

    // Validate required fields
    if (!productId || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: "Product ID, rating, title, and comment are required",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create review
    const review = new Review({
      user: req.user.id,
      product: productId,
      rating,
      title,
      comment,
    });

    await review.save();

    const populatedReview = await Review.findById(review._id)
      .populate("user", "username email")
      .populate("product", "name image");

    res.status(201).json({
      success: true,
      data: populatedReview,
      message: "Review created successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating review",
      error: error.message,
    });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { rating, title, comment } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { rating, title, comment },
      { new: true },
    )
      .populate("user", "username email")
      .populate("product", "name image");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you do not have permission to update it",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
      message: "Review updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found or you do not have permission to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
};
