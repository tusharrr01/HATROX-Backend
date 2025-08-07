const ownerModel = require("../models/owner-model");


module.exports.ownerCreate = async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res
            .status(500)
            .send("you don't have permission to create new owner");
        }
        
        let {fullname , email , password} =  req.body;
        let owner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.send("now the owner of this webapp is " + fullname);
};




