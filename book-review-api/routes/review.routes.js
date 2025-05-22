const express = require('express');
const { body } = require('express-validator');
const ReviewController = require('../controllers/review.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../utils/validators');

const router = express.Router();

// Submit a review
router.post(
    '/books/:id/reviews',
    authenticate,
    [
        body('rating')
            .isFloat({ min: 0.5, max: 5 })
            .withMessage('Rating must be between 0.5 and 5'),
    ],
    validate,
    ReviewController.addReview
);

// Update review
router.put(
    '/reviews/:id',
    authenticate,
    [
        body('rating')
            .optional()
            .isFloat({ min: 0.5, max: 5 })
            .withMessage('Rating must be between 0.5 and 5'),
    ],
    validate,
    ReviewController.updateReview
);

// Delete review
router.delete('/reviews/:id', authenticate, ReviewController.deleteReview);

module.exports = router;
