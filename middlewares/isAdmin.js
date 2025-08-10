const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model');

module.exports = async function isAdmin(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;    if (!token) {
        return res.redirect('/');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const owner = await ownerModel.findById(decoded.id).select('-password');
        
        if (!owner) {
            return res.redirect('/');   
            
        }
        req.owner = owner;
        return next();
    } catch (err) {
        return res.redirect('/'); 
    }
};
