const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
