import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const sendMessage    = (message)      => api.post("/chat", { message });
export const getChatHistory = ()             => api.get("/chat/history");

// ─── Knowledge Base ───────────────────────────────────────────────────────────
export const getAllKnowledge    = (params)   => api.get("/knowledge", { params });
export const getKnowledgeById  = (id)       => api.get(`/knowledge/${id}`);
export const createKnowledge   = (data)     => api.post("/knowledge", data);
export const updateKnowledge   = (id, data) => api.put(`/knowledge/${id}`, data);
export const deleteKnowledge   = (id)       => api.delete(`/knowledge/${id}`);
export const getCategories     = ()         => api.get("/knowledge/categories");

export default api;
