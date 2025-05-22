# ReadMe File

# Book Review API

## Introduction

This project is a backend API for a Book Review Platform that allows users to register, login, manage books, and post reviews. It supports basic authentication, data validation, and protected routes using middleware. Built with Node.js, Express, and MongoDB, this project demonstrates RESTful API design, token-based auth, and role-based access control.

## Project Type

Backend

## Deployed App

Backend: [https://your-backend-deployment-link.com](https://your-backend-deployment-link.com)  
Database: MongoDB Atlas or Localhost

## Directory Structure
book-review-api/
├─ config/
├─ controllers/
├─ middleware/
├─ models/
├─ routes/
├─ utils/
├─ app.js
├─ index.js


## Features

- User registration and login with JWT authentication
- Book CRUD operations
- Review submission and retrieval
- Search functionality (title or author)
- Middleware for protected routes
- Mongoose schema validation

## Design Decisions or Assumptions

- Used JWT for stateless authentication
- Used MongoDB for flexible document-based storage
- Search implemented using regex with case-insensitive matching
- Authenticated routes are protected via middleware

GET http://localhost:8080/api/books                  # Get all books
POST http://localhost:8080/api/books                 # Add a book (auth required)
GET http://localhost:8080/api/search?query=harry     # Search books by title or author


| Method | Endpoint               | Description                     |
| ------ | ---------------------- | ------------------------------- |
| POST   | /api/register          | Register a new user             |
| POST   | /api/login             | Login and get JWT token         |
| GET    | /api/books             | Get all books                   |
| POST   | /api/books             | Add new book (auth required)    |
| GET    | /api/search?query=term | Search books by title or author |
| POST   | /api/reviews/\:bookId  | Add a review (auth required)    |
| GET    | /api/reviews/\:bookId  | Get reviews for a book          |



Tech Stack
Node.js

Express.js

MongoDB

Mongoose

JWT (jsonwebtoken)

express-validator

dotenv

morgan

cors