const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("error", "You already have an account, please login");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    console.log(err.message);
                    return res.redirect("/");
                } else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    })

                    let token = generateToken(user);
                    res.cookie("token", token);
                    req.flash("success", "User created successfully!");
                    res.redirect("/");
                }
            })
        })
    } catch (error) {
        // console.log(error.message);
        req.flash("error", "Something Went Wrong");
        res.redirect("/");
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    // console.log(user);
    
    if (user) {
        bcrypt.compare(password, user.password,async (err, result) => {
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token);

                res.redirect("/shop");
                
            } else {
                req.flash("error","Invalid email or password");
                res.redirect("/");
            }
        })
    } else {
        req.flash("error","Invalid email or password");
        res.redirect("/");
    }
}

module.exports.logoutUser = (req, res)=>{
    res.cookie("token","");
    req.flash("succes","Logout Successfully");
    res.redirect("/");
}