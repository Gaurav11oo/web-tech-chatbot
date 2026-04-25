const express = require("express");
const router = express.Router();
const {
  getAllKnowledge,
  getKnowledgeById,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
  getCategories,
} = require("../controllers/knowledgeController");

// // GET /api/knowledge/categories — Fetch all unique categories (must be before /:id)
// router.get("/categories", getCategories);

// // GET /api/knowledge — Fetch all entries (supports ?category=React&search=hooks)
// router.get("/", getAllKnowledge);

// // GET /api/knowledge/:id — Fetch one entry
// router.get("/:id", getKnowledgeById);

// // POST /api/knowledge — Create new entry
// router.post("/", createKnowledge);

// // PUT /api/knowledge/:id — Update entry
// router.put("/:id", updateKnowledge);

// // DELETE /api/knowledge/:id — Delete entry
// router.delete("/:id", deleteKnowledge);

router.get("/knowledge", getAllKnowledge);
router.get("/knowledge/categories", getCategories);
router.get("/knowledge/:id", getKnowledgeById);
router.post("/knowledge", createKnowledge);
router.put("/knowledge/:id", updateKnowledge);
router.delete("/knowledge/:id", deleteKnowledge);

module.exports = router;
