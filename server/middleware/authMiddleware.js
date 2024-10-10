const jwt = require('jsonwebtoken');
const User = require('../models/userModel');  // Assuming you have a user model

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];  // Extract token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify token
            req.user = await User.findById(decoded.id).select('-password');  // Get user without password
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
