const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config");
const { createProduct } = require("../controllers/productController");
const isAdmin = require('../middlewares/isAdmin');
const productModel = require("../models/product-model");

// Public: Get all products
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Admin: Create new product
router.post("/create", isAdmin, upload.single("image"), createProduct);

// Admin: Delete all products
router.delete("/", isAdmin, async (req, res) => {
  try {
    await productModel.deleteMany({});
    res.json({ message: "All products deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting products" });
  }
});

module.exports = router;
