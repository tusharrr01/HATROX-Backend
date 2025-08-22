const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function isLoggedIn(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "You must be logged in" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "Account not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired session, please login again" });
  }
};
