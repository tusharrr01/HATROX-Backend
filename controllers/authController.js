// controllers/authController.js
const userModel = require("../models/user-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.getUsers = (req, res) => {
   userModel.find()
       .then(users => res.json(users))
       .catch(err => res.status(500).json({ message: "Error fetching users", error: err }));
};

module.exports.registerUser = async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "You already have an account, please login" });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hash,
            fullname
        });

        const token = generateToken(user);
        return res.status(201).json({
            message: "User created successfully!",
            token,
            user: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid email or password" });

        const token = generateToken(user);
        // Inside your login controller after generating token
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        // res.status(200).json({ message: "Login successful" });

        return res.json({
            message: "Login successful",
            token,
            user: { id: user._id, fullname: user.fullname, email: user.email }
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.json({ message: "Logged out successfully" });
};

module.exports.deleteUser = async (req,res) =>{
    try {
        const { userId } = req.params;
        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ message: "user not found" });
    
        
    
        await user.deleteOne();
        return res.json({ message: "user deleted successfully" });
      } catch (err) {
        return res.status(500).json({ message: "Error deleting user", err });
      }
}

