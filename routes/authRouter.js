const express = require('express');
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedin");
const { registerUser, loginUser, logoutUser ,getUsers ,deleteUser} = require("../controllers/authController");
const isAdmin = require('../middlewares/isAdmin');


// Get all tyhe users existing in the database
router.post("/users",isAdmin, getUsers);

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Logout user (clears cookie)
router.post("/logout", isLoggedIn, logoutUser);

router.delete("/delete/:userId",isAdmin,deleteUser);

module.exports = router;
