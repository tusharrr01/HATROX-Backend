const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const { addToCart } = require("../controllers/shopController");
const ownerModel = require("../models/owner-model");




router.get("/", isloggedin, async (req, res) => {
    let products = await productModel.find();
    let success = req.flash("success")
    res.render("shop", { products, success });
});

//product detail
//search route


// display route
router.get("/cart", isloggedin, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate("cart");
    res.render("cart", { user });
});


router.post("/addtocart/:productid",isloggedin, addToCart);





module.exports = router;