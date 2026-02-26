const express = require('express');
const router = express.Router();
const { createOwner, loginOwner,logoutUser } = require("../controllers/ownerController");

// Create Owner (only if no owner exists)
router.post("/create", createOwner);

// Login as Owner/Admin
router.post("/login", loginOwner);

router.post("/logout",logoutUser)

module.exports = router;
