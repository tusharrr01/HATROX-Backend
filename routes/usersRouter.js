const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin")
const { registerUser, loginUser, logoutUser } = require("../controllers/userController")

router.get("/", (req, res) => {
    res.send("hey ")
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout",isloggedin, logoutUser);
module.exports = router;