const express = require('express');
const router = express.Router();
const { createOwner, loginOwner } = require("../controllers/ownerController");

// Create Owner (only if no owner exists)
router.post("/create", createOwner);

// Login as Owner/Admin
router.post("/login", loginOwner);

module.exports = router;
