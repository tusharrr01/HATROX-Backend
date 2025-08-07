const productModel = require("../models/product-model");


module.exports.createProduct = async (req,res)=>{
    let {name , price , discount, bgcolor ,panelcolor, textcolor} = req.body;

    await productModel.create({
        image : req.file.buffer,
        name ,
        price ,
        discount, 
        bgcolor ,
        panelcolor, 
        textcolor
    });

    req.flash("success", "Product Created Successfully ");
    res.redirect("/owners/admin");
}