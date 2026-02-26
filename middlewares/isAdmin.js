const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports = async function isAdmin(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
    
    if (!token) {
      return res.status(401).json({ message: "Admin authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const owner = await ownerModel.findById(decoded.id).select("-password");

    if (!owner) {
      return res.status(403).json({ message: "Access denied: not an admin" });
    }

    req.owner = owner;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired admin session" });
  }
};
