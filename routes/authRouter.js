const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin")
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

router.get("/register", (req, res) => {
    let success = req.flash("success")
    let error = req.flash("error")
    res.render("register", { success, error, loggein: false });
})

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", isloggedin, logoutUser);
module.exports = router;