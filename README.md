# Fundoo App (Express.js)

Fundoo App is a backend service built with **Express.js** that allows users to register, log in, and manage their notes. It securely hashes passwords using **bcrypt** before storing them in the database.

## Features 🚀

### 🔐 User Authentication
- User **Registration** with name, email, phone number, and password.
- **Password Hashing** using bcrypt before saving to the database.
- User **Login** with email and password authentication.
- **JWT Token Generation** for authentication.

### 📝 Notes Management (CRUD)
- Users can **Create, Read, Update, and Delete** notes after logging in.
- Each note contains a **title**, **description**, and **user association**.
- **Notes are private** to each user.

## Tech Stack 🛠️
- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **bcrypt**
- **jsonwebtoken (JWT)**
- **Swagger (API Documentation)**

## Installation 📥

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/fundoo-app.git
cd fundoo-app

API Documentation 📖
Swagger documentation is available at:

👉 http://localhost:3000/api-docs
