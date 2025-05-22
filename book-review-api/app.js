const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./config/db');

// Route imports
const authRoutes = require('./routes/auth.routes');
const bookRoutes = require('./routes/book.routes');
const reviewRoutes = require('./routes/review.routes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Connect to DB
connectDB();

// Mount Routes
app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);

// Health check
app.get('/', (req, res) => res.send('📘 Book Review API is running...'));

// Error fallback
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something broke!' });
});

module.exports = app;
