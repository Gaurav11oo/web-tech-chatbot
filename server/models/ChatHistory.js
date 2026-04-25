const mongoose = require("mongoose");

/**
 * ChatHistory Schema
 * Stores every user message and the bot's response for history.
 */
const chatHistorySchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
    response: {
      type: String,
      required: [true, "Response is required"],
      trim: true,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    confidenceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    found: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ChatHistory", chatHistorySchema);
