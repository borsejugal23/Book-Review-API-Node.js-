# 📘 Book Review API

A backend RESTful API built with **Node.js**, **Express**, and **MongoDB** that allows users to register, authenticate, manage books, and post reviews. The app includes JWT authentication, search functionality, and protected routes.

---

## 🚀 Project Type

**Backend**

---

## 🌐 Deployed App

- Backend: [Click here to test](https://book-review-api-node-js.onrender.com)  
- Database: MongoDB Atlas / Localhost

---

## 🧩 Directory Structure

```
book-review-api/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── app.js
├── index.js
├── .env
```

---

## 🎯 Features

- User registration and login with JWT
- Book creation, retrieval, and listing
- Add and view book reviews
- Search books by title or author (case-insensitive)
- Middleware to protect sensitive routes
- Mongoose schema validation

---

## 📌 Design Decisions & Assumptions

- Stateless auth using JWT
- MongoDB used for flexibility in schema design
- Regex-based partial and case-insensitive search
- Express middleware for authentication/authorization
- Modular code structure with controllers and routes

---

## ⚙️ Project Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/your-username/book-review-api.git

# 2. Navigate into the project
cd book-review-api

# 3. Install dependencies
npm install

# 4. Add environment variables in a `.env` file:
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=8080

# 5. Start the development server
node index.js
```

---

## 💻 Running Locally

Once the server is started (`node index.js`), you can test the API at:
```
http://localhost:8080
```

Example endpoints:
- `GET /api/books`
- `GET /api/search?query=harry`

---

## 📬 Example API Requests (via `curl` or Postman)

### 🔐 Register a user
```bash
curl -X POST http://localhost:8080/api/register   -H "Content-Type: application/json"   -d '{"email": "user@example.com", "password": "123456"}'
```

### 🔐 Login
```bash
curl -X POST http://localhost:8080/api/login   -H "Content-Type: application/json"   -d '{"email": "user@example.com", "password": "123456"}'
```

### 📚 Get all books
```bash
curl http://localhost:8080/api/books
```

### 🔍 Search books
```bash
curl http://localhost:8080/api/search?query=harry
```

---

## 📘 API Endpoints

| Method | Endpoint                | Description                          |
|--------|-------------------------|--------------------------------------|
| POST   | /api/register           | Register new user                    |
| POST   | /api/login              | Login and get JWT                    |
| GET    | /api/books              | Fetch all books                      |
| POST   | /api/books              | Add a new book (Auth required)       |
| GET    | /api/search?query=term  | Search books by title or author      |
| POST   | /api/reviews/:bookId    | Add a review for a book (Auth)       |
| GET    | /api/reviews/:bookId    | Get reviews for a book               |

---

## 🧠 Database Schema (Simplified)

### 📘 Book
```js
{
  title: String,
  author: String,
  description: String,
  createdBy: ObjectId (User)
}
```

### 👤 User
```js
{
  email: String,
  password: String (Hashed)
}
```

### 📝 Review
```js
{
  bookId: ObjectId (Book),
  userId: ObjectId (User),
  rating: Number,
  comment: String
}
```

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **JWT (Authentication)**
- **express-validator**
- **dotenv**
- **morgan**
- **cors**





