const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

router.get("/", (req, res) => {
    res.send("hey");
    // console.log(process.env.NODE_ENV);
});

if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0){
            return res
                .status(500)
                .send("you don't have permission to create new owner");
        }
        
        let {fullname , email , password} =  req.body;
        await ownerModel.create({
            fullname,
            email,
            password,
        })
    });
}

module.exports = router;