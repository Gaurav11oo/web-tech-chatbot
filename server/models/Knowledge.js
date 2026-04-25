const mongoose = require("mongoose");

/**
 * Knowledge Schema
 * Stores question-answer pairs with associated keywords for matching.
 */
const knowledgeSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Question is required"],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, "Answer is required"],
      trim: true,
    },
    keywords: {
      type: [String],
      required: [true, "At least one keyword is required"],
      validate: {
        validator: (arr) => arr.length > 0,
        message: "Keywords array cannot be empty",
      },
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
  },
  { timestamps: true }
);

// Index keywords for faster querying
knowledgeSchema.index({ keywords: 1 });

module.exports = mongoose.model("Knowledge", knowledgeSchema);
