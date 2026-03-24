# 📝 Feedback Digitilization System

A modern, full-stack feedback management application built with **React**, **Node.js**, **Express**, and **MongoDB**. The system allows users to submit feedback directly via a Google Form and provides admins with a powerful dashboard to manage, view, and export all submissions.

---

## 🚀 Features

### User Side
- **Landing Page** — Clean, premium UI with a single "Submit Feedback" button
- **Direct Google Form Redirect** — Users are instantly redirected to the official Google Form with no restrictions
- **Unlimited Submissions** — Any user can submit feedback multiple times

### Admin Panel (`/admin`)
- **Secure JWT Login** — Protected admin authentication
- **Live Data Table** — View all registered users with their submission status
- **Detailed View Modal** — See complete user details including submission info
- **Export Data** — Download all user data as **PDF** or **CSV**
- **Per-User Export** — Export individual user data as PDF or CSV
- **Delete Users** — Permanently remove user records from the database
- **Thank You Email** — Automatic thank-you email sent via Nodemailer after form submission

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JSON Web Tokens (JWT), bcrypt |
| Email | Nodemailer (Gmail SMTP) |
| Export | jsPDF, jsPDF-AutoTable |

---

## 📁 Project Structure

```
Feedback-Digitilization/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route logic (user & admin)
│   ├── middlewares/    # Auth & validation middleware
│   ├── models/         # Mongoose schemas (User, Admin)
│   ├── routes/         # API endpoint routing
│   ├── seed.js         # Admin seed script
│   └── index.js        # Main server entry point
├── frontend/
│   ├── src/
│   │   ├── pages/      # React page components
│   │   └── App.jsx     # Root component with routing
│   └── index.html
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- Gmail account with App Password enabled

### 1. Clone the Repository
```bash
git clone https://github.com/DHYEY2703/Feeback-System.git
cd Feeback-System
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file inside `/backend`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/feedback-system
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
GOOGLE_FORM_URL=https://docs.google.com/forms/...
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
```

Seed the default admin:
```bash
node seed.js
```

Start the backend:
```bash
npm start
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Access the App
| URL | Description |
|-----|-------------|
| `http://localhost:5173` | User-facing home page |
| `http://localhost:5173/admin` | Admin login panel |

**Default Admin Credentials:**
- Username: `admin`
- Password: `password123`

---

## 📸 Screenshots

> _Coming soon_

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

---

## 👨‍💻 Author

**Dhyey Barbhaya**  
GitHub: [@DHYEY2703](https://github.com/DHYEY2703)
