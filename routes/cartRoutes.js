const express = require("express");
const router = express.Router();

const { userCart ,removeFromCart ,addToCart } = require("../controllers/cartController");
const isLoggedin = require("../middlewares/isLoggedin");


// ✅ Get user's cart
router.get("/:userId", userCart );

// ✅ Add to cart
router.post("/add",isLoggedin, addToCart);

// ✅ Remove item
router.delete("/:userId/remove/:productId", removeFromCart);

module.exports = router;
