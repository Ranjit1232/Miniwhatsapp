# 📱 MiniWhatsApp

MiniWhatsApp is a real-time chat application built using **Node.js**, **Express**, and **MongoDB**.  
It demonstrates how to create a scalable messaging backend with authentication, database connectivity, and API handling.

---

## 🚀 Features

- 👤 User registration and login (with JWT authentication)
- 💬 Real-time messaging between users
- 🧑‍🤝‍🧑 User management (add / fetch contacts)
- 🗂️ MongoDB for data storage
- ⚙️ RESTful API using Express.js
- 🌐 Environment-based configuration support

---

## 🏗️ Tech Stack

**Node.js**  => Server-side JavaScript runtime |
**Express.js => Web framework for handling APIs and routes |
**MongoDB**  => NoSQL database for user and message data |
**Mongoose** => ODM for MongoDB |


## ⚙️ Installation and Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Ranjit1232/Miniwhatsapp.git


2️⃣ Navigate to the project folder
cd Miniwhatsapp

3️⃣ Install dependencies
npm install

4️⃣ Configure environment variables

Create a .env file in the root directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
To start server
nodemon index.js

5️⃣ Start the server
npm start

Server will run on:

http://localhost:5000
