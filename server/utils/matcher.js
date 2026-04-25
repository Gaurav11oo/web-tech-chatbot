/**
 * Keyword Matching Engine
 * A custom AI-like system that extracts keywords from user messages
 * and matches them against MongoDB knowledge base entries.
 */

// Common English stopwords to filter out
const STOPWORDS = new Set([
  "a", "an", "the", "is", "it", "in", "on", "at", "to", "for",
  "of", "and", "or", "but", "not", "with", "this", "that", "are",
  "was", "be", "been", "being", "have", "has", "had", "do", "does",
  "did", "will", "would", "could", "should", "may", "might", "shall",
  "can", "i", "we", "you", "he", "she", "they", "my", "your", "its",
  "our", "their", "what", "how", "why", "when", "where", "which",
  "who", "whom", "me", "him", "her", "us", "them", "am", "so",
  "if", "then", "than", "as", "up", "about", "into", "through",
  "during", "before", "after", "above", "below", "between", "each",
  "more", "also", "just", "from", "by", "any", "all", "both", "few",
  "there", "here", "these", "those", "some", "such", "no", "nor",
  "too", "very", "s", "t", "now", "he", "she", "itself", "please",
  "tell", "explain", "describe", "give", "show", "help", "know",
  "mean", "use", "make", "get", "way", "work"
]);

/**
 * Tokenize and clean a raw text string.
 * @param {string} text - Raw user input
 * @returns {string[]} Array of cleaned keyword tokens
 */
const extractKeywords = (text) => {
  if (!text || typeof text !== "string") return [];

  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")   // Remove special chars
    .split(/\s+/)                     // Split by whitespace
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOPWORDS.has(w)); // Remove stopwords
};

/**
 * Score a single knowledge entry against extracted user keywords.
 * Uses exact + partial matching with weighted scoring.
 * @param {Object} entry - A Knowledge document from MongoDB
 * @param {string[]} userKeywords - Keywords extracted from user message
 * @returns {{ score: number, matched: string[] }}
 */
const scoreEntry = (entry, userKeywords) => {
  if (!userKeywords.length) return { score: 0, matched: [] };

  const dbKeywords = entry.keywords.map((k) => k.toLowerCase());
  const matched = [];
  let score = 0;

  for (const userKw of userKeywords) {
    for (const dbKw of dbKeywords) {
      if (dbKw === userKw) {
        // Exact match — high score
        score += 10;
        if (!matched.includes(dbKw)) matched.push(dbKw);
        break;
      } else if (dbKw.includes(userKw) || userKw.includes(dbKw)) {
        // Partial / fuzzy match — lower score
        score += 4;
        if (!matched.includes(dbKw)) matched.push(dbKw);
        break;
      }
    }
  }

  return { score, matched };
};

/**
 * Find the best matching knowledge entry for a user message.
 * @param {string} userMessage - Raw message from the user
 * @param {Object[]} allEntries - All documents from the Knowledge collection
 * @returns {{ answer: string, matchedKeywords: string[], confidenceScore: number, found: boolean }}
 */
const findBestMatch = (userMessage, allEntries) => {
  const userKeywords = extractKeywords(userMessage);

  if (!userKeywords.length) {
    return {
      answer: "Please ask a valid web technology question. Try using keywords like 'React', 'JavaScript', 'CSS', etc.",
      matchedKeywords: [],
      confidenceScore: 0,
      found: false,
    };
  }

  let bestMatch = null;
  let highestScore = 0;
  let bestMatchedKeywords = [];

  for (const entry of allEntries) {
    const { score, matched } = scoreEntry(entry, userKeywords);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
      bestMatchedKeywords = matched;
    }
  }

  // Minimum score threshold: at least 4 points (one partial match)
  const THRESHOLD = 4;
  if (!bestMatch || highestScore < THRESHOLD) {
    return {
      answer:
        "No answer found for your question. Try rephrasing it using specific web tech terms like 'React hooks', 'JavaScript promises', 'CSS flexbox', etc.",
      matchedKeywords: userKeywords,
      confidenceScore: 0,
      found: false,
    };
  }

  // Calculate a 0-100 confidence score
  const maxPossibleScore = userKeywords.length * 10;
  const confidenceScore = Math.min(
    100,
    Math.round((highestScore / maxPossibleScore) * 100)
  );

  return {
    answer: bestMatch.answer,
    question: bestMatch.question,
    matchedKeywords: bestMatchedKeywords,
    confidenceScore,
    found: true,
  };
};

module.exports = { extractKeywords, findBestMatch };
