<div align="center">

# ✦ BookVerse ✦

### A Modern Editorial-Inspired Online Bookstore Experience

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3B1Y2V1YjF3NzN2d2w4dGZ3N2k2ZHZwNnA4a2N5cGR1N3Q5YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/26ufdipQqU2lhNA4g/giphy.gif" width="100%" />

<br/>

[![Live Site](https://img.shields.io/badge/Live-Demo-black?style=for-the-badge&logo=vercel)](https://book-verse-edge.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github)](https://github.com/JayedHoshen/bookVerse-edge)

</div>

---

# 📂 Folder Structure

```bash
bookverse/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   ├── store/
│   │
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

---

# ⚙️ Installation

# 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/bookverse.git
cd bookverse
```

---

# 2️⃣ Backend Setup

```bash
cd backend
npm install
```

## Create `.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/bookverse
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:3000
```

## Run Backend

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

## Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔐 API Endpoints

# Authentication

| Method | Endpoint             | Description   |
| ------ | -------------------- | ------------- |
| POST   | `/api/auth/register` | Register User |
| POST   | `/api/auth/login`    | Login User    |

---

# Books

| Method | Endpoint         | Description      |
| ------ | ---------------- | ---------------- |
| GET    | `/api/books`     | Get All Books    |
| GET    | `/api/books/:id` | Get Book Details |
| POST   | `/api/books`     | Add Book (Admin) |
| PUT    | `/api/books/:id` | Update Book      |
| DELETE | `/api/books/:id` | Delete Book      |

---

# Reviews

| Method | Endpoint               | Description |
| ------ | ---------------------- | ----------- |
| POST   | `/api/reviews`         | Add Review  |
| GET    | `/api/reviews/:bookId` | Get Reviews |

---

# Orders

| Method | Endpoint           | Description        |
| ------ | ------------------ | ------------------ |
| POST   | `/api/orders`      | Create Order       |
| GET    | `/api/orders/user` | User Orders        |
| GET    | `/api/orders`      | All Orders (Admin) |

---

# 🗄 Database Models

## User

```js
{
  (name, email, password, role, readingHistory, createdAt);
}
```

---

## Book

```js
{
  (title, author, genre, price, rating, stock, coverImage, description);
}
```

---

## Review

```js
{
  (userId, bookId, rating, comment, createdAt);
}
```

---

## Order

```js
{
  (userId, items, totalPrice, status, shippingAddress, createdAt);
}
```

---

# ✦ Visual Philosophy

BookVerse follows a clean and premium visual language inspired by:

- Clean white layout
- Serif typography
- Reading-first experience
- Minimal distractions
- Smooth browsing

---

# 🔒 Security Features

- JWT Authentication
- Password Hashing
- Protected Routes
- Role-Based Authorization
- Input Validation

---

# 🚀 Future Improvements

- Stripe / SSLCommerz Integration
- Cloudinary Image Upload
- Wishlist System
- Dark Mode
- AI Recommendations
- Email Verification
- OAuth Login

---

# 📸 Screenshots

## Home Page

- Hero Banner
- Featured Books
- Trending Books

## Dashboard

- Order History
- Reading Progress
- Reviews

## Admin Panel

- Books CRUD
- Orders Management
- User Management

---

# 🤝 Contributing

Contributions are welcome.

## Steps

1. Fork the repository
2. Create your branch
3. Commit changes
4. Push changes
5. Open Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Hm Jayed

- MERN Stack Developer
- Passionate about clean UI & scalable apps

---

# ⭐ Support

If you like this project:

- Give it a ⭐ on GitHub
- Share with others
- Fork the repository

---

# 🔥 BookVerse

> “A modern home for readers, stories, and discovery.”
