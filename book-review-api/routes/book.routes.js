const express = require('express');
const { body } = require('express-validator');
const BookController = require('../controllers/book.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../utils/validators');

const router = express.Router();

router.post(
    '/books',
    authenticate,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('author').notEmpty().withMessage('Author is required'),
    ],
    validate,
    BookController.create
);

router.get('/getAllBooks', BookController.getAll);
router.get('/books/search', BookController.search);
router.get('/books/:id', BookController.getById);

module.exports = router;
