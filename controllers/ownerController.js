const ownerModel = require("../models/owner-model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.createOwner = async (req, res) => {
  try {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res.status(403).json({ message: "Only one owner account allowed" });
    }

    const { fullname, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    const owner = await ownerModel.create({ fullname, email, password: hash });
    return res.status(201).json({ message: `Owner account created for ${fullname}` });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.loginOwner = async (req, res) => {
  try {
    const { email, password } = req.body;

    const owner = await ownerModel.findOne({ email });
    if (!owner) return res.status(400).json({ message: "Invalid email or password" });

    const match = await bcrypt.compare(password, owner.password);
    if (!match) return res.status(400).json({ message: "Invalid email or password" });

    const token = generateToken(owner);
    return res.json({
      message: "Owner login successful",
      token,
      owner: { id: owner._id, fullname: owner.fullname, email: owner.email }
    });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
