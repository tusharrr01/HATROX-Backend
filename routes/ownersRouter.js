const express = require('express');
const router = express.Router();
const { createOwner } = require("../controllers/ownerController");


router.get("/", (req, res) => {
    res.render("owner-login");
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", createOwner);
}



// update admin : post
// delete admin : post
// get user : post
// edit user : post 
// remove user : post




module.exports = router;