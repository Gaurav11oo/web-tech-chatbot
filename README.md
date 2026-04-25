# 🤖 WebTech AI — Smart Web Tech Chatbot

A **production-ready MERN stack chatbot** that answers web technology questions using a MongoDB knowledge base with a custom keyword-matching engine. **No AI APIs used.**

---

## 🧠 How It Works

```
User Message → Extract Keywords → Remove Stopwords
    → Search MongoDB → Score Matches → Return Best Answer
```

The keyword matching engine:
1. Converts the message to lowercase
2. Removes common English stopwords
3. Extracts meaningful keywords
4. Scores each knowledge entry by exact + partial keyword overlap
5. Returns the highest-scoring result with a confidence score

---

## 🧱 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18 + Vite + Tailwind CSS    |
| Backend    | Node.js + Express.js              |
| Database   | MongoDB + Mongoose                |
| HTTP       | Axios                             |
| Routing    | React Router DOM v6               |
| State      | Context API + useReducer          |

---

## 📁 Project Structure

```
web-tech-chatbot/
├── client/                     # React (Vite) frontend
│   └── src/
│       ├── components/
│       │   ├── ChatMessage.jsx     # Message bubble with keywords & confidence
│       │   ├── ChatInput.jsx       # Auto-resize textarea input
│       │   ├── TypingIndicator.jsx # Animated dots
│       │   ├── SuggestedQuestions.jsx
│       │   └── Sidebar.jsx
│       ├── context/
│       │   └── ChatContext.jsx     # Global chat state (useReducer)
│       ├── pages/
│       │   ├── ChatPage.jsx        # Main chat interface
│       │   └── AdminPage.jsx       # CRUD for knowledge base
│       ├── services/
│       │   └── api.js              # Axios API calls
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
│
├── server/                     # Express + MongoDB backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   ├── chatController.js   # Chat logic
│   │   └── knowledgeController.js # CRUD logic
│   ├── models/
│   │   ├── Knowledge.js        # Q&A schema
│   │   └── ChatHistory.js      # History schema
│   ├── routes/
│   │   ├── chatRoutes.js
│   │   └── knowledgeRoutes.js
│   ├── utils/
│   │   ├── matcher.js          # Keyword matching engine ⭐
│   │   └── seed.js             # Database seed script
│   ├── .env.example
│   └── server.js
│
├── package.json                # Root scripts
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+
- MongoDB running locally (default: `mongodb://localhost:27017`)
- npm v9+

---

### Step 1 — Clone & Install Dependencies

```bash
# From project root
npm run install:all

# Or manually:
cd server && npm install
cd ../client && npm install
```

---

### Step 2 — Configure Environment

```bash
cd server
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/web-tech-chatbot
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

---

### Step 3 — Seed the Database

```bash
npm run seed
# or: cd server && npm run seed
```

This inserts **16 knowledge entries** covering:
- React, JSX, Hooks
- JavaScript (Promises, async/await, var/let/const, Arrow Functions)
- TypeScript
- CSS (Flexbox, Grid, Tailwind)
- HTML (Semantic elements)
- Node.js, Express.js
- MongoDB
- REST API

---

### Step 4 — Start the App

**Option A: Run both together (recommended)**
```bash
npm install          # installs concurrently at root
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1 — Backend
cd server && npm run dev

# Terminal 2 — Frontend
cd client && npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

---

## 🔌 API Reference

### Chat

| Method | Endpoint             | Description               |
|--------|----------------------|---------------------------|
| POST   | `/api/chat`          | Send message, get answer  |
| GET    | `/api/chat/history`  | Get last 50 chat messages |

**POST /api/chat**
```json
// Request
{ "message": "What are React hooks?" }

// Response
{
  "success": true,
  "data": {
    "answer": "React hooks are special functions...",
    "matchedQuestion": "What are React hooks and how do they work?",
    "matchedKeywords": ["hooks", "react", "usestate"],
    "confidenceScore": 80,
    "found": true
  }
}
```

### Knowledge Base

| Method | Endpoint                       | Description         |
|--------|--------------------------------|---------------------|
| GET    | `/api/knowledge`               | Get all entries     |
| GET    | `/api/knowledge?search=react`  | Search entries      |
| GET    | `/api/knowledge/:id`           | Get single entry    |
| POST   | `/api/knowledge`               | Create entry        |
| PUT    | `/api/knowledge/:id`           | Update entry        |
| DELETE | `/api/knowledge/:id`           | Delete entry        |
| GET    | `/api/knowledge/categories`    | List categories     |

---

## ✨ Features

- 💬 **ChatGPT-style UI** — dark terminal aesthetic, chat bubbles, auto-scroll
- ⌨️ **Typing animation** — animated dot indicator while bot "thinks"
- 🔑 **Keyword badges** — shows which keywords matched
- 📊 **Confidence score** — color-coded progress bar (High/Medium/Low)
- 💡 **Suggested questions** — clickable chips on the welcome screen
- 📋 **Copy button** — one-click copy on every bot answer
- 🗂️ **Admin panel** — full CRUD interface for the knowledge base
- 📱 **Responsive** — works on desktop and mobile
- 🔒 **Input validation** — empty message prevention, length limiting
- 🗄️ **Chat history** — every conversation saved to MongoDB

---

## 🧪 Test Cases

| Scenario                  | Expected Behaviour                         |
|---------------------------|--------------------------------------------|
| Empty input               | Button disabled, no request sent           |
| `"What is React?"`        | Returns React explanation, confidence ~80% |
| `"tell me about hooks"`   | Matches hook keywords, partial scoring     |
| `"xyz blah blah"`         | Returns "No answer found" fallback         |
| Server down               | Shows connection error in chat             |
| MongoDB disconnected      | 500 error returned gracefully              |

---

## 🎨 Design System

| Token              | Value                    |
|--------------------|--------------------------|
| Background         | `#0a0f0a` (near black)   |
| Accent             | `#52e8ff` (green)        |
| Font — Display     | Space Grotesk            |
| Font — Mono        | JetBrains Mono           |
| Border radius      | 8–20px                   |
| Theme              | Dark terminal / hacker   |

---

## 📦 Production Build

```bash
cd client && npm run build
# Static files output to: client/dist/
# Serve with Express or any static host (Vercel, Netlify, etc.)
```

---

## 🔧 Extending the Knowledge Base

Add entries via the Admin Panel (`/admin`) or the seed script.

Each entry needs:
```json
{
  "question": "What is Redux?",
  "answer": "Redux is a state management library... (4-5 lines with examples)",
  "keywords": ["redux", "state", "store", "action", "reducer"],
  "category": "React"
}
```

The more specific and varied your keywords, the better the matching accuracy.
