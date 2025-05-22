const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const { generateToken } = require('../services/token.service');

class AuthController {
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;

            // Check if email exists
            const existingUser = await User.findOne({ email });
            if (existingUser) return res.status(409).json({ message: 'Email already registered' });

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create user
            const user = await User.create({ name, email, password: hashedPassword });

            res.status(201).json({
                message: 'User registered successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check user exists
            const user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: 'Invalid email or password' });

            // Match password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

            // Generate token
            const token = generateToken({ id: user._id });

            res.status(200).json({
                message: 'Login successful',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = AuthController;
