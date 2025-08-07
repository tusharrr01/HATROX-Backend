const userModel = require("../models/user-model");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
    const token = req.cookies ? req.cookies.token : null;
    // console.log(token);
    // console.log(req.cookies.token);
    
    if (token) {
        try {
            let decoded = jwt.verify(token, process.env.JWT_KEY);
            let user = await userModel
                .findOne({ email: decoded.email })
                .select("-password");

            req.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.redirect("/auth/register");
        }
    }else{
        req.flash("error","You Must Be Logged In");
        res.redirect("/auth/register");
    }
};