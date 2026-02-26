const productModel = require("../models/product-model");
const cloudinary = require("cloudinary").v2;

module.exports.getProducts = async (req, res) => {
  try {
    const products = await productModel.find().lean();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};


module.exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, discountPrice, discountPercent, category, brand, isTopDeal, bgcolor, textcolor, pannelcolor } = req.body;

    const images = (req.files || []).map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    const product = await productModel.create({
      name,
      description,
      images,
      price,
      discountPrice,
      discountPercent,
      category,
      brand,
      bgcolor,
      textcolor,
      pannelcolor,
      isTopDeal: isTopDeal 
    });

    return res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};



module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      description,
      price,
      discountPrice,
      discountPercent,
      category,
      brand,
      bgcolor,
      textcolor,
      pannelcolor,
      isTopDeal,
      removedImages, // frontend se aayega
    } = req.body;

    let product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 🔹 Step 1: Remove selected images
    if (removedImages) {
      const deleteArray = JSON.parse(removedImages); // ["publicId1","publicId2"]

      for (let public_id of deleteArray) {
        try {
          await cloudinary.uploader.destroy(public_id);
          product.images = product.images.filter(
            (img) => img.public_id !== public_id
          );
        } catch (err) {
          console.log("Error deleting image:", err);
        }
      }
    }

    // 🔹 Step 2: Upload & Add new images
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        try {
          const uploadRes = await cloudinary.uploader.upload(file.path, {
            folder: "products",
          });

          product.images.push({
            url: uploadRes.secure_url,
            public_id: uploadRes.public_id,
          });
        } catch (err) {
          console.log("Error uploading image:", err);
        }
      }
    }

    // 🔹 Step 3: Update text fields
    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;
    if (discountPrice) product.discountPrice = discountPrice;
    if (discountPercent) product.discountPercent = discountPercent;
    if (category) product.category = category;
    if (brand) product.brand = brand;
    if (bgcolor) product.bgcolor = bgcolor;
    if (textcolor) product.textcolor = textcolor;
    if (pannelcolor) product.pannelcolor = pannelcolor;
    if (isTopDeal !== undefined) {
      product.isTopDeal =
        isTopDeal === "true" || isTopDeal === true ? true : false;
    }

    // 🔹 Save after all operations
    await product.save();

    return res.json({
      message: "✅ Product updated successfully",
      product,
    });
  } catch (err) {
    console.error("Update Error:", err);
    return res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
};



module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete images from Cloudinary
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();
    return res.json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting product", err });
  }
};