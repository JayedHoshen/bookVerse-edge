const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middlewares/auth.middleware");
const {
  getAllCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerStats,
} = require("../controllers/customer.controller");

// Admin-only routes
router.get("/", protect, authorize("admin"), getAllCustomers);
router.get("/stats", protect, authorize("admin"), getCustomerStats);
router.get("/:id", protect, authorize("admin"), getCustomerById);
router.post("/", protect, authorize("admin"), createCustomer);
router.put("/:id", protect, authorize("admin"), updateCustomer);
router.delete("/:id", protect, authorize("admin"), deleteCustomer);

module.exports = router;
