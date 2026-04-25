const SUGGESTIONS = [
  "What is React?",
  "How do React hooks work?",
  "What is JSX?",
  "Explain JavaScript promises",
  "What is async/await?",
  "Difference between var, let, and const?",
  "What is TypeScript?",
  "How does CSS Flexbox work?",
  "What is MongoDB?",
  "How does Express.js work?",
  "What is a REST API?",
  "What is Tailwind CSS?",
];

export default function SuggestedQuestions({ onSelect }) {
  return (
    <div style={{ padding: "0 16px 20px" }}>
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "10px",
        }}
      >
        Suggested questions
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {SUGGESTIONS.map((q) => (
          <button
            key={q}
            onClick={() => onSelect(q)}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "9999px",
              padding: "5px 12px",
              fontSize: "0.78rem",
              color: "var(--text-secondary)",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "all 0.18s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.color = "var(--accent)";
              e.currentTarget.style.background = "rgba(74,222,128,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-secondary)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
