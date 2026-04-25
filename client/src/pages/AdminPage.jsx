import { useState, useEffect, useCallback } from "react";
import {
  getAllKnowledge,
  createKnowledge,
  updateKnowledge,
  deleteKnowledge,
} from "../services/api";

const EMPTY_FORM = { question: "", answer: "", keywords: "", category: "General" };
const CATEGORIES = ["General", "React", "JavaScript", "TypeScript", "CSS", "HTML", "Node.js", "Express", "MongoDB", "REST API"];

function FormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initial?._id;

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!form.question.trim() || !form.answer.trim() || !form.keywords.trim()) {
      setError("Question, answer and keywords are required.");
      return;
    }

    const payload = {
      question: form.question.trim(),
      answer: form.answer.trim(),
      keywords: form.keywords.split(",").map((k) => k.trim()).filter(Boolean),
      category: form.category,
    };

    setLoading(true);
    setError("");
    try {
      if (isEdit) {
        await updateKnowledge(initial._id, payload);
      } else {
        await createKnowledge(payload);
      }
      onSave();
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    background: "var(--bg-input)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "9px 12px",
    color: "var(--text-primary)",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.88rem",
    outline: "none",
    resize: "vertical",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.72rem",
    color: "var(--text-muted)",
    fontFamily: "'JetBrains Mono', monospace",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: "6px",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "16px",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "540px",
          padding: "28px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <h2 style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: "20px", color: "var(--text-primary)" }}>
          {isEdit ? "Edit Entry" : "Add New Entry"}
        </h2>

        {error && (
          <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "8px", padding: "10px 14px", color: "#f87171", fontSize: "0.82rem", marginBottom: "16px" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={labelStyle}>Question</label>
            <input name="question" value={form.question} onChange={handleChange} style={inputStyle} placeholder="e.g. What is React?" />
          </div>

          <div>
            <label style={labelStyle}>Answer (4–5 lines recommended)</label>
            <textarea name="answer" value={form.answer} onChange={handleChange} rows={5} style={inputStyle} placeholder="Write a clear, beginner-friendly answer with examples..." />
          </div>

          <div>
            <label style={labelStyle}>Keywords (comma-separated)</label>
            <input name="keywords" value={form.keywords} onChange={handleChange} style={inputStyle} placeholder="react, component, virtual, dom" />
          </div>

          <div>
            <label style={labelStyle}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "24px", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ padding: "9px 18px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer", fontSize: "0.85rem" }}>
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "9px 20px",
              borderRadius: "8px",
              border: "none",
              background: loading ? "var(--border)" : "var(--accent)",
              color: "#0a0f0a",
              fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              fontSize: "0.85rem",
            }}
          >
            {loading ? "Saving…" : isEdit ? "Update" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // null | 'add' | entry object
  const [deleteId, setDeleteId] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAllKnowledge({ search: search || undefined });
      setEntries(res.data.data);
    } catch {
      /* handle */
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async (id) => {
    try {
      await deleteKnowledge(id);
      setDeleteId(null);
      load();
    } catch { /* */ }
  };

  const handleSave = () => {
    setModal(null);
    load();
  };

  const badgeColor = (cat) => {
    const map = {
      React: "#61dafb", JavaScript: "#f7df1e", TypeScript: "#3178c6",
      CSS: "#264de4", HTML: "#e34c26", "Node.js": "#68a063",
      Express: "#aaaaaa", MongoDB: "#52e8ff", "REST API": "#fb923c", General: "#9ca3af",
    };
    return map[cat] || "#9ca3af";
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--bg-primary)" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexShrink: 0, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--text-primary)" }}>Knowledge Base</h2>
          <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>{entries.length} entries</p>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search entries…"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "7px 12px",
              color: "var(--text-primary)",
              fontSize: "0.82rem",
              outline: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              width: "200px",
            }}
          />
          <button
            onClick={() => setModal("add")}
            style={{
              background: "var(--accent)",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              color: "#0a0f0a",
              fontWeight: 700,
              fontSize: "0.82rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add Entry
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
            Loading…
          </div>
        ) : entries.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem" }}>
            No entries found. {search ? "Try a different search." : "Add your first entry."}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {entries.map((entry) => (
              <div
                key={entry._id}
                style={{
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  borderRadius: "12px",
                  padding: "14px 16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", flexWrap: "wrap" }}>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                        {entry.question}
                      </span>
                      <span style={{
                        fontSize: "0.65rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        padding: "1px 7px",
                        borderRadius: "9999px",
                        border: `1px solid ${badgeColor(entry.category)}40`,
                        color: badgeColor(entry.category),
                        background: `${badgeColor(entry.category)}12`,
                        flexShrink: 0,
                      }}>
                        {entry.category}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.55, marginBottom: "8px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {entry.answer}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                      {entry.keywords.slice(0, 6).map((kw) => (
                        <span key={kw} className="keyword-badge"># {kw}</span>
                      ))}
                      {entry.keywords.length > 6 && (
                        <span style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
                          +{entry.keywords.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    <button
                      onClick={() => setModal({ ...entry, keywords: entry.keywords.join(", ") })}
                      style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-secondary)", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(entry._id)}
                      style={{ padding: "5px 12px", borderRadius: "7px", border: "1px solid rgba(248,113,113,0.3)", background: "rgba(248,113,113,0.06)", color: "#f87171", fontSize: "0.75rem", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal && (
        <FormModal
          initial={modal === "add" ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "16px" }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px", maxWidth: "360px", width: "100%", textAlign: "center" }}>
            <p style={{ fontSize: "1rem", fontWeight: 600, marginBottom: "8px" }}>Delete this entry?</p>
            <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: "24px" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "8px 20px", borderRadius: "8px", border: "1px solid var(--border)", background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}>Cancel</button>
              <button onClick={() => handleDelete(deleteId)} style={{ padding: "8px 20px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", fontWeight: 700, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
