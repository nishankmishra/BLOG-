// In controllers/authController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    const { userId, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ userId });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userId, username, password: hashedPassword });
        await newUser.save();

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Login user
const login = async (req, res) => {
    const { userId, password } = req.body;

    try {
        const user = await User.findOne({ userID });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
};
