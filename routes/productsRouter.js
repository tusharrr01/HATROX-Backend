const express  = require('express');
const router  = express.Router();
const upload = require("../config/multer-config");
const { createProduct } = require("../controllers/productController");
const isAdmin = require('../middlewares/isAdmin');

// admin route
router.get("/", isAdmin,(req, res) => {
    let success = req.flash("success");
    // let error = req.flash("error");
    res.render("createproducts",{success});
});

// admin route
router.post("/create",isAdmin,upload.single("image"), createProduct);



module.exports = router;