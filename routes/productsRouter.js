const express = require('express');
const router = express.Router();
const upload = require("../middlewares/upload");
const { createProduct ,deleteProduct,updateProduct ,getProducts } = require("../controllers/productController");
const isAdmin = require('../middlewares/isAdmin');
const productModel = require("../models/product-model");

// Public: Get all products
router.get("/", getProducts);

// Admin: Create new product
router.post("/create" ,isAdmin, upload.array("images", 5), createProduct);

router.put("/update/:id", isAdmin, upload.array("images", 5), updateProduct);

router.delete("/delete/:id", isAdmin, deleteProduct);


module.exports = router;
