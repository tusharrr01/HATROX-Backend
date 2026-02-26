const userModel = require("../models/user-model");
const Cart = require("../models/cart-model");
const Product = require("../models/product-model");



module.exports.addToCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: userId, isActive: true });

    const product = await Product.findById(productId);

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity, price: product.price }],
        totalAmount: product.price * quantity
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.equals(productId));
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity, price: product.price });
      }
      cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


module.exports.userCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId, isActive: true })
      .populate("items.product");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId, isActive: true });
    cart.items = cart.items.filter(item => !item.product.equals(req.params.productId));
    cart.totalAmount = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}