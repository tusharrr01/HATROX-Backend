const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.createOwner = async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res
            .status(500)
            .send("you don't have permission to create new owner");
        }

        let {fullname , email , password} =  req.body;
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    // console.log(err.message);
                    return res.redirect("/");
                } else {
                    await ownerModel.create({
                        fullname,
                        email,
                        password : hash,
                    })
                    res.send("now the owner of this webapp is " + fullname);
                }
            })
        })
};
module.exports.loginOwner = async (req, res) => {
    let { email, password } = req.body;

    let owner = await ownerModel.findOne({ email: email });
    // console.log(user);
    
    if (owner) {
        bcrypt.compare(password, owner.password,async (err, result) => {
            if (result) {
                let token = generateToken(owner);
                res.cookie("token", token);

                // res.redirect("/products");
                // res.send("hello owner")
                res.redirect("/products");
                
            } else {
                req.flash("error","Invalid email or password1");
                res.redirect("/owners/login");
            }
        })
    } else {
        req.flash("error","Invalid email or password1");
        res.redirect("/owners/login");
    }
}





