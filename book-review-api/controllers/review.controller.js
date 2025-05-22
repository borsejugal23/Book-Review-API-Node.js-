const Review = require('../models/review.model');
const Book = require('../models/book.model');

class ReviewController {
    // Add a review
    static async addReview(req, res) {
        try {
            const { id: bookId } = req.params;
            const { rating, comment } = req.body;
            const userId = req.user.id;

            if (!rating) return res.status(400).json({ message: 'Rating is required' });

            const book = await Book.findById(bookId);
            if (!book) return res.status(404).json({ message: 'Book not found' });

            // Check if review already exists
            const existingReview = await Review.findOne({ book: bookId, user: userId });
            if (existingReview) {
                return res.status(400).json({ message: 'You have already reviewed this book' });
            }

            const review = await Review.create({ book: bookId, user: userId, rating, comment });

            res.status(201).json({
                message: 'Review added successfully',
                review,
            });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Update review
    static async updateReview(req, res) {
        try {
            const { id } = req.params;
            const { rating, comment } = req.body;
            const userId = req.user.id;

            const review = await Review.findById(id);
            if (!review) return res.status(404).json({ message: 'Review not found' });

            if (review.user.toString() !== userId) {
                return res.status(403).json({ message: 'Not authorized to update this review' });
            }

            if (rating !== undefined) review.rating = rating;
            if (comment !== undefined) review.comment = comment;

            await review.save();

            res.json({ message: 'Review updated successfully', review });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    // Delete review
    static async deleteReview(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const review = await Review.findById(id);
            if (!review) return res.status(404).json({ message: 'Review not found' });

            if (review.user.toString() !== userId) {
                return res.status(403).json({ message: 'Not authorized to delete this review' });
            }

            await review.deleteOne();

            res.json({ message: 'Review deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = ReviewController;
