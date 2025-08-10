const express = require('express');
const router = express.Router();
const { createOwner ,loginOwner} = require("../controllers/ownerController");


router.get("/login", (req, res) => {
    let success = req.flash("success")
    let error = req.flash("error")
    res.render("owner-login",{success,error});
});

// if (process.env.NODE_ENV === "development") {
    router.post("/create", createOwner);
// }

router.post("/login", loginOwner);

// update admin : post
// delete admin : post
// get user : post
// edit user : post 
// remove user : post




module.exports = router;