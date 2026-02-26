const express = require("express");
const Order = require("../models/orders-model");
const Cart = require("../models/cart-model");
const router = express.Router();

// ✅ Place order (from active cart)
router.post("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId, isActive: true }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const order = new Order({
      user: req.params.userId,
      products: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price
      })),
      totalAmount: cart.totalAmount,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod
    });

    await order.save();

    // deactivate cart
    cart.isActive = false;
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Get all orders of a user
router.get("/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).populate("products.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
