const express = require("express");
const router = express.Router();
const { chat, getChatHistory } = require("../controllers/chatController");

// POST /api/chat — Send a message and get an AI-like response
router.post("/", chat);

// GET /api/chat/history — Fetch recent chat history
router.get("/history", getChatHistory);

module.exports = router;
