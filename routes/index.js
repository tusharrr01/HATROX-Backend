const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin")

router.get("/", (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");

    res.render("index",{error,success})
});

router.get("/shop", isloggedin, (req, res) => {
    res.render("shop");
});



module.exports = router;