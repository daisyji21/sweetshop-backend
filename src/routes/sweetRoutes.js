const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  getSweets,
  addSweet,
  searchSweets,
  purchaseSweet,
  updateSweet,
  restockSweet,
  deleteSweet
} = require("../controllers/sweetController");

// ================= SWEETS ROUTES =================

// Get all sweets (Protected)
router.get("/", authMiddleware, getSweets);

// Search sweets
router.get("/search", authMiddleware, searchSweets);

// Add sweet (Admin)
router.post("/", authMiddleware, adminMiddleware, addSweet);

// Purchase sweet
router.post("/:id/purchase", authMiddleware, purchaseSweet);

// Update sweet (Admin)
router.put("/:id", authMiddleware, adminMiddleware, updateSweet);

// Restock sweet (Admin)
router.post("/:id/restock", authMiddleware, adminMiddleware, restockSweet);

// Delete sweet (Admin)
router.delete("/:id", authMiddleware, adminMiddleware, deleteSweet);

module.exports = router;
