
const userModel = require("../models/user-model");


module.exports.addToCart = async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added To Cart");
    res.redirect("/shop");
}



