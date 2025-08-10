const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

module.exports = async function isLoggedIn(req, res, next) {
    const token = req.cookies ? req.cookies.token : null;
    if (!token) {
        req.flash?.('error', 'You must be logged in');
        return res.redirect('/auth/register'); // res.status(401).json(...)
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await userModel.findById(decoded.id).select('-password');
        if (!user) {
            req.flash?.('error', 'You must create an account');
            return res.redirect('/auth/register'); // 401
        }
        req.user = user;
        return next();
    } catch (err) {
        req.flash?.('error', 'Session expired, please log in again');
        return res.redirect('/auth/register'); // res.status(401).json({error: 'Invalid token'})
    }
};
