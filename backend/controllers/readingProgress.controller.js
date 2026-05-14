const ReadingProgress = require("../models/readingProgress.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");

// Get all reading progress for current user
const getMyReadingProgress = async (req, res) => {
  try {
    const progress = await ReadingProgress.find({ user: req.user.id })
      .populate("product", "name image category price")
      .sort({ lastReadAt: -1 });

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reading progress",
      error: error.message,
    });
  }
};

// Get reading progress by ID
const getReadingProgressById = async (req, res) => {
  try {
    const progress = await ReadingProgress.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("product", "name image category price");

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Reading progress not found",
      });
    }

    res.status(200).json({
      success: true,
      data: progress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reading progress",
      error: error.message,
    });
  }
};

// Create or update reading progress
const updateReadingProgress = async (req, res) => {
  try {
    const { productId, currentPage, totalPages, status, notes } = req.body;

    // Validate required fields
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
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

    // Check if user has purchased this product (book)
    const hasPurchased = await Order.findOne({
      user: req.user.id,
      "items.product": productId,
      status: { $in: ["DELIVERED", "SHIPPED"] },
    });

    if (!hasPurchased) {
      return res.status(403).json({
        success: false,
        message: "You must purchase this book to track reading progress",
      });
    }

    // Find existing progress or create new one
    let progress = await ReadingProgress.findOne({
      user: req.user.id,
      product: productId,
    });

    if (progress) {
      // Update existing
      if (currentPage !== undefined) progress.currentPage = currentPage;
      if (totalPages !== undefined) progress.totalPages = totalPages;
      if (status) progress.status = status;
      if (notes !== undefined) progress.notes = notes;
      progress.lastReadAt = new Date();
    } else {
      // Create new
      progress = new ReadingProgress({
        user: req.user.id,
        product: productId,
        currentPage: currentPage || 0,
        totalPages: totalPages || 100, // Default, should be updated
        status: status || "READING",
        notes: notes || [],
      });
    }

    await progress.save();

    const populatedProgress = await ReadingProgress.findById(
      progress._id,
    ).populate("product", "name image category price");

    res.status(200).json({
      success: true,
      data: populatedProgress,
      message: progress.isNew
        ? "Reading progress created"
        : "Reading progress updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating reading progress",
      error: error.message,
    });
  }
};

// Delete reading progress
const deleteReadingProgress = async (req, res) => {
  try {
    const progress = await ReadingProgress.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: "Reading progress not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reading progress deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting reading progress",
      error: error.message,
    });
  }
};

// Get reading statistics for current user
const getReadingStats = async (req, res) => {
  try {
    const stats = await ReadingProgress.aggregate([
      { $match: { user: req.user.id } },
      {
        $group: {
          _id: null,
          totalBooks: { $sum: 1 },
          completedBooks: {
            $sum: { $cond: [{ $eq: ["$status", "COMPLETED"] }, 1, 0] },
          },
          readingBooks: {
            $sum: { $cond: [{ $eq: ["$status", "READING"] }, 1, 0] },
          },
          totalPagesRead: { $sum: "$currentPage" },
          averageProgress: { $avg: "$progressPercentage" },
        },
      },
    ]);

    const result = stats[0] || {
      totalBooks: 0,
      completedBooks: 0,
      readingBooks: 0,
      totalPagesRead: 0,
      averageProgress: 0,
    };

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching reading statistics",
      error: error.message,
    });
  }
};

module.exports = {
  getMyReadingProgress,
  getReadingProgressById,
  updateReadingProgress,
  deleteReadingProgress,
  getReadingStats,
};
