const Book = require('../models/book.model');
const Review = require('../models/review.model');

class BookController {
    // Create new book
    static async create(req, res) {
        try {
            const { title, author, genre } = req.body;
            if (!title || !author) {
                return res.status(400).json({ message: 'Title and author are required' });
            }

            const book = await Book.create({
                title,
                author,
                genre,
                createdBy: req.user.id,
            });

            res.status(201).json({
                message: 'Book added successfully',
                book,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Get books with optional filters and pagination
    static async getAll(req, res) {
        try {
            const { page = 1, limit = 10, author, genre } = req.query;
            const query = {};

            if (author) query.author = new RegExp(author, 'i');
            if (genre) query.genre = new RegExp(genre, 'i');

            const books = await Book.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            const total = await Book.countDocuments(query);

            res.json({
                total,
                page: parseInt(page),
                limit: parseInt(limit),
                books,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Get book details with average rating & paginated reviews
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const { page = 1, limit = 5 } = req.query;

            const book = await Book.findById(id);
            if (!book) return res.status(404).json({ message: 'Book not found' });

            const reviews = await Review.find({ book: id })
                .populate('user', 'name')
                .skip((page - 1) * limit)
                .limit(parseInt(limit));

            const averageRatingData = await Review.aggregate([
                { $match: { book: book._id } },
                { $group: { _id: '$book', averageRating: { $avg: '$rating' } } },
            ]);

            const averageRating = averageRatingData[0]?.averageRating ?? null;

            res.json({
                book,
                averageRating,
                reviews,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Search books by title or author
    static async search(req, res) {
        try {
            const { query } = req.query;
            if (!query) return res.status(400).json({ message: 'Query is required' });

            const regex = new RegExp(query, 'i');

            const books = await Book.find({
                $or: [{ title: regex }, { author: regex }],
            });

            res.json({ results: books });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = BookController;
