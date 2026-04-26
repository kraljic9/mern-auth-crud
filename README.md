# 🔐 MERN Stack Auth & CRUD System

A full-stack application featuring a robust **Authentication system** and complete **CRUD functionality**. This project demonstrates the integration of a React frontend with a Node.js/Express backend and MongoDB database.

## 🚀 Full-Stack Showcase

<table align="center">
  <tr>
    <td align="center"><strong>User Dashboard (UI)</strong></td>
    <td align="center"><strong>Auth Logic (Backend)</strong></td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="./assets/mern-frontend.jpg" alt="MERN Frontend UI">
    </td>
    <td align="center" width="50%">
      <img src="./assets/mern-postman.jpg" alt="Postman Auth Testing">
    </td>
  </tr>
</table>

## 🛠️ Technical Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Security:** JWT (JSON Web Tokens) & Bcrypt password hashing

## ⚡ Key Features

- **Full Authentication:** Secure Register, Login, and Logout flow.
- **Protected Routes:** Frontend routes that only authorized users can access.
- **CRUD Operations:** Create, Read, Update, and Delete resources linked to specific user accounts.
- **State Management:** Keeping user sessions active using LocalStorage or Cookies.

## 🧠 Technical Highlights

- **JWT Implementation:** Secured the API by requiring a valid token for sensitive CRUD operations.
- **Password Hashing:** Implemented **Bcrypt** on the backend to ensure user passwords are never stored in plain text.
- **CORS & Middleware:** Configured cross-origin resource sharing and custom error-handling middleware for a seamless API experience.

## 💡 Key Learnings

This project was a deep dive into **Asynchronous Full-Stack communication**. I learned how to handle complex "Loading" and "Error" states on the frontend while the backend processes requests. Most importantly, it taught me the importance of **Data Security** and how to properly protect user data in a production-like environment.
