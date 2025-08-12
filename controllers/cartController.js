const userModel = require("../models/user-model");

module.exports.addToCart = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.body.productId); // React sends in body
    await user.save();

    return res.json({ message: "Added to cart", cart: user.cart });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
