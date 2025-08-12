const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Logout user (clears cookie)
router.post("/logout", isLoggedIn, logoutUser);

module.exports = router;
