const productModel = require("../models/product-model");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const product = await productModel.create({
      image: req.file?.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor
    });

    return res.status(201).json({
      message: "Product created successfully",
      product
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
