const { Schema, model } = require("mongoose");

const readingProgressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  currentPage: {
    type: Number,
    default: 0,
    min: 0,
  },
  totalPages: {
    type: Number,
    required: true,
    min: 1,
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ["NOT_STARTED", "READING", "COMPLETED", "ABANDONED"],
    default: "NOT_STARTED",
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  lastReadAt: {
    type: Date,
    default: Date.now,
  },
  notes: [
    {
      page: Number,
      content: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
readingProgressSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  // Calculate progress percentage
  if (this.totalPages > 0) {
    this.progressPercentage = Math.round(
      (this.currentPage / this.totalPages) * 100,
    );
  }
  // Set completed date if status is completed
  if (this.status === "COMPLETED" && !this.completedAt) {
    this.completedAt = new Date();
  }
  next();
});

// Index for efficient queries
readingProgressSchema.index({ user: 1, product: 1 }, { unique: true }); // One progress per user per product
readingProgressSchema.index({ user: 1, status: 1 }); // For user's reading status
readingProgressSchema.index({ user: 1, lastReadAt: -1 }); // For recently read books

module.exports = model("ReadingProgress", readingProgressSchema);
