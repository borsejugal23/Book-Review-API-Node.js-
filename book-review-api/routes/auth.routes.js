const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../controllers/auth.controller');
const validate = require('../utils/validators');

const router = express.Router();

router.post(
    '/signup',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password')
            .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
            .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
            .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
            .matches(/\d/).withMessage('Password must contain a number')
            .matches(/[@$!%*?&]/).withMessage('Password must contain a special character'),
    ],
    validate,
    AuthController.signup
);

router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    validate,
    AuthController.login
);

module.exports = router;
