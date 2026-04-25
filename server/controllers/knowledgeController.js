const Knowledge = require("../models/Knowledge");

/**
 * GET /api/knowledge
 * Return all knowledge entries, sorted newest first.
 */
const getAllKnowledge = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { question: { $regex: search, $options: "i" } },
        { keywords: { $in: [new RegExp(search, "i")] } },
      ];
    }

    const entries = await Knowledge.find(query).sort({ createdAt: -1 });
    res.json({ success: true, count: entries.length, data: entries });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch knowledge base." });
  }
};

/**
 * GET /api/knowledge/:id
 * Return a single knowledge entry by ID.
 */
const getKnowledgeById = async (req, res) => {
  try {
    const entry = await Knowledge.findById(req.params.id);
    if (!entry) return res.status(404).json({ success: false, error: "Entry not found." });
    res.json({ success: true, data: entry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch entry." });
  }
};

/**
 * POST /api/knowledge
 * Create a new knowledge entry.
 */
const createKnowledge = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;

    if (!question || !answer || !keywords || keywords.length === 0) {
      return res.status(400).json({ success: false, error: "Question, answer, and keywords are required." });
    }

    const newEntry = await Knowledge.create({
      question: question.trim(),
      answer: answer.trim(),
      keywords: keywords.map((k) => k.toLowerCase().trim()),
      category: category || "General",
    });

    res.status(201).json({ success: true, data: newEntry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to create entry." });
  }
};

/**
 * PUT /api/knowledge/:id
 * Update an existing knowledge entry.
 */
const updateKnowledge = async (req, res) => {
  try {
    const { question, answer, keywords, category } = req.body;

    const updated = await Knowledge.findByIdAndUpdate(
      req.params.id,
      {
        question: question?.trim(),
        answer: answer?.trim(),
        keywords: keywords?.map((k) => k.toLowerCase().trim()),
        category,
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ success: false, error: "Entry not found." });
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to update entry." });
  }
};

/**
 * DELETE /api/knowledge/:id
 * Remove a knowledge entry.
 */
const deleteKnowledge = async (req, res) => {
  try {
    const deleted = await Knowledge.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: "Entry not found." });
    res.json({ success: true, message: "Entry deleted successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete entry." });
  }
};

/**
 * GET /api/knowledge/categories
 * Return all unique categories.
 */
const getCategories = async (req, res) => {
  try {
    const categories = await Knowledge.distinct("category");
    res.json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch categories." });
  }
};

module.exports = {
  getAllKnowledge,
  getKnowledgeById,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
  getCategories,
};
