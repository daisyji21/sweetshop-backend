const Sweet = require("../models/Sweet");

// GET ALL SWEETS
exports.getSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch {
    res.status(500).json({ message: "Failed to fetch sweets" });
  }
};

// ADD SWEET (ADMIN)
exports.addSweet = async (req, res) => {
  try {
    const sweet = await Sweet.create(req.body);
    res.json(sweet);
  } catch {
    res.status(500).json({ message: "Failed to add sweet" });
  }
};

// SEARCH SWEETS
exports.searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const query = {};

    if (name) query.name = new RegExp(name, "i");
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = minPrice;
      if (maxPrice) query.price.$lte = maxPrice;
    }

    const sweets = await Sweet.find(query);
    res.json(sweets);
  } catch {
    res.status(500).json({ message: "Search failed" });
  }
};

// PURCHASE SWEET
exports.purchaseSweet = async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet || sweet.quantity <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: "Sweet purchased successfully" });
  } catch {
    res.status(500).json({ message: "Purchase failed" });
  }
};

// UPDATE SWEET (ADMIN)
exports.updateSweet = async (req, res) => {
  try {
    const updated = await Sweet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Update failed" });
  }
};

// RESTOCK SWEET (ADMIN)
exports.restockSweet = async (req, res) => {
  try {
    const { quantity } = req.body;
    const sweet = await Sweet.findById(req.params.id);
    sweet.quantity += quantity;
    await sweet.save();
    res.json({ message: "Sweet restocked", sweet });
  } catch {
    res.status(500).json({ message: "Restock failed" });
  }
};

// DELETE SWEET (ADMIN)
exports.deleteSweet = async (req, res) => {
  try {
    await Sweet.findByIdAndDelete(req.params.id);
    res.json({ message: "Sweet deleted successfully" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
};
