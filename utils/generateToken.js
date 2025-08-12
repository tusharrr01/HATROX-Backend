
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  // Expires in 1 day (in seconds: 60*60*24)
  return jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_KEY,
    { expiresIn: "1d" } // clearer syntax than raw seconds
  );
};

module.exports = { generateToken };
