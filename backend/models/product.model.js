// models/Product.js
const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: true,
      enum: [
        "FICTION",
        "NON_FICTION",
        "MYSTERY",
        "ROMANCE",
        "SCIENCE_FICTION",
        "BIOGRAPHY",
        "HISTORY",
        "SELF_HELP",
        "CHILDREN",
        "POETRY",
      ],
    },
    author: {
      type: String,
      default: "",
    },
    isbn: {
      type: String,
      default: "",
    },
    publisher: {
      type: String,
      default: "",
    },
    publicationYear: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: "",
    },
    additionalImages: [
      {
        type: String,
      },
    ],
    stock: {
      type: Number,
      default: 20,
      min: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
      min: 0,
    },
    keyActives: [
      {
        icon: { type: String, default: "✦" },
        name: { type: String },
        desc: { type: String },
      },
    ],
    ritualSteps: [
      {
        num: { type: String },
        title: { type: String },
        desc: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = model("Product", productSchema);
