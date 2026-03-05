# 🧠 Predictive Healthcare Platform — Backend Service

This service is the **Node.js backend API** for the AI-Powered Predictive Healthcare Platform.

It manages:

* Patient authentication
* Patient vitals collection
* AI prediction integration
* Risk logging
* Health alerts for doctors and caregivers

The backend acts as the **central layer connecting the frontend, database, and AI microservice**.

---

# ⚙️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT Authentication**
* **bcrypt**

---

# 📂 Folder Structure

```
server/
│
├── config/          # Database configuration
├── controllers/     # API controllers
├── middleware/      # Authentication and error middleware
├── models/          # MongoDB schemas
│   ├── Patient.js
│   ├── Vitals.js
│   ├── RiskLog.js
│   └── Alert.js
│
├── routes/          # API routes
├── services/        # Business logic (AI integration)
├── utils/           # Helper utilities
│
├── app.js           # Express app configuration
├── server.js        # Entry point
├── package.json
└── README.md
```

---

# 🚀 Backend Setup

## 1️⃣ Navigate to Backend

```
cd predictive-healthcare-platform/server
```

---

## 2️⃣ Install Dependencies

```
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file in the backend root.

Example:

```
PORT=5000

MONGO_URI=mongodb://localhost:27017/predictive-healthcare

ACCESS_TOKEN_KEY=your_access_secret
REFRESH_TOKEN_KEY=your_refresh_secret

ACCESS_TOKEN_EXPIRY=1h
REFRESH_TOKEN_EXPIRY=7d

AI_SERVICE_URL=http://localhost:8000
```

---

# 🗄 Database

MongoDB runs locally on:

```
mongodb://localhost:27017
```

Database name:

```
predictive-healthcare
```

---

# ▶️ Run the Backend

Start development server:

```
npm run dev
```

or

```
node server.js
```

Server runs at:

```
http://localhost:5000
```

---

# 🔐 Authentication

The backend uses **JWT tokens**.

After login:

* client receives **access token**
* access token must be included in API requests

Example header:

```
Authorization: Bearer ACCESS_TOKEN
```

---

# 🧠 AI Prediction Flow

```
Patient submits vitals
        │
        ▼
Backend saves vitals
        │
        ▼
Backend sends data to AI service
        │
        ▼
AI returns prediction
        │
        ▼
RiskLog stored
        │
        ▼
Alert generated if risk is high
```

---

# 📡 Example API Endpoints

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

## Vitals

```
POST /api/vitals
GET /api/vitals/:patientId
```

---

## Risk Logs

```
GET /api/risk/:patientId
```

---

## Alerts

```
GET /api/alerts
GET /api/alerts/patient/:id
```

---

# 🔒 Security Notes

* Passwords hashed with **bcrypt**
* Authentication via **JWT**
* Environment variables stored in `.env`
* `.env` ignored in Git

---

# 🤝 Contribution

1. Fork repository
2. Create branch

```
git checkout -b feature/new-feature
```

3. Commit changes
4. Open pull request

---

# 📌 Related Services

This backend works with:

* **React Frontend**
* **Python AI Microservice**

Project structure:

```
predictive-healthcare-platform
│
├── client
├── server
└── ai-service
```
