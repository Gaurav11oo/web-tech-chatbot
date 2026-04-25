const Knowledge = require("../models/Knowledge");
const ChatHistory = require("../models/ChatHistory");
const { findBestMatch } = require("../utils/matcher");

/**
 * POST /api/chat
 * Accept a user message, find the best knowledge-base match, and return it.
 */
const chat = async (req, res) => {
  try {
    const { message } = req.body;

    // Input validation
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ success: false, error: "Message cannot be empty." });
    }

    const sanitized = message.trim().substring(0, 500); // Limit message length

    // Fetch all knowledge entries (small collection — cached in memory for speed)
    const allEntries = await Knowledge.find({});

    // Run the keyword matching engine
    const { answer, question, matchedKeywords, confidenceScore, found } =
      findBestMatch(sanitized, allEntries);

    // Save to chat history
    await ChatHistory.create({
      message: sanitized,
      response: answer,
      matchedKeywords,
      confidenceScore,
      found,
    });

    return res.json({
      success: true,
      data: {
        answer,
        matchedQuestion: question || null,
        matchedKeywords,
        confidenceScore,
        found,
      },
    });
  } catch (error) {
    console.error("Chat error:", error.message);
    res.status(500).json({ success: false, error: "Server error. Please try again." });
  }
};

/**
 * GET /api/chat/history
 * Return the last 50 chat history entries.
 */
const getChatHistory = async (req, res) => {
  try {
    const history = await ChatHistory.find({})
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch chat history." });
  }
};

module.exports = { chat, getChatHistory };
