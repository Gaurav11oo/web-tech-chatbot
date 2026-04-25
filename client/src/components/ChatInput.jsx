import { useState, useRef } from "react";

export default function ChatInput({ onSend, disabled }) {
  const [input, setInput] = useState("");
  const textareaRef = useRef(null);

  const handleSubmit = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    // Auto-resize textarea
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = Math.min(el.scrollHeight, 120) + "px";
    }
  };

  const isEmpty = !input.trim();

  return (
    <div
      style={{
        padding: "12px 16px 16px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "10px",
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "14px",
          padding: "10px 12px",
          transition: "border-color 0.2s",
        }}
        onFocusCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--accent-dim)";
          e.currentTarget.style.boxShadow = "0 0 0 2px rgba(74,222,128,0.08)";
        }}
        onBlurCapture={(e) => {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about React, JavaScript, CSS, Node.js..."
          disabled={disabled}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            resize: "none",
            color: "var(--text-primary)",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "0.92rem",
            lineHeight: "1.5",
            minHeight: "24px",
            maxHeight: "120px",
            overflowY: "auto",
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSubmit}
          disabled={isEmpty || disabled}
          title="Send (Enter)"
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            border: "none",
            cursor: isEmpty || disabled ? "not-allowed" : "pointer",
            background: isEmpty || disabled
              ? "var(--border)"
              : "var(--accent)",
            color: isEmpty || disabled ? "var(--text-muted)" : "#0a0f0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.18s",
            boxShadow: isEmpty || disabled ? "none" : "0 0 12px rgba(74,222,128,0.3)",
          }}
        >
          {/* Arrow-up SVG */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </button>
      </div>

      <p
        style={{
          textAlign: "center",
          marginTop: "8px",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        Enter to send · Shift+Enter for new line · Powered by MongoDB Knowledge Base
      </p>
    </div>
  );
}
