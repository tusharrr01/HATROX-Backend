const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const { addToCart } = require("../controllers/cartController");

// Public: list products (Shop.jsx can just use /api/products for this, so optional)
router.get("/", async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// Authenticated: get cart contents
router.get("/cart", isLoggedIn, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate("cart");
    res.json({ items: user.cart });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

// Authenticated: add to cart
router.post("/cart/add", isLoggedIn, addToCart);

module.exports = router;
