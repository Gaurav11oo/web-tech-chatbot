import { useState, useEffect } from "react";

/* =========================
   Typing Effect Hook
========================= */
function useTypingEffect(text, speed = 5, enabled = true) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      return;
    }

    let i = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return displayed;
}

/* =========================
   Copy Button
========================= */
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy answer"
      style={{
        background: "transparent",
        border: "1px solid var(--border)",
        color: copied ? "var(--accent)" : "var(--text-muted)",
        borderRadius: "6px",
        padding: "2px 8px",
        fontSize: "0.7rem",
        fontFamily: "'JetBrains Mono', monospace",
        cursor: "pointer",
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {copied ? "✓ copied" : "copy"}
    </button>
  );
}

/* =========================
   Confidence Bar
========================= */
function ConfidenceBar({ score }) {
  const color =
    score >= 70 ? "#52e8ff" : score >= 40 ? "#facc15" : "#f87171";
  const label =
    score >= 70 ? "High" : score >= 40 ? "Medium" : "Low";

  return (
    <div style={{ marginTop: "10px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "0.68rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
          marginBottom: "4px",
        }}
      >
        <span>confidence</span>
        <span style={{ color }}>
          {label} · {score}%
        </span>
      </div>
      <div
        style={{
          height: "3px",
          background: "var(--border)",
          borderRadius: "2px",
          overflow: "hidden",
        }}
      >
        <div
          className="confidence-bar"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
    </div>
  );
}

/* =========================
   Chat Message Component
========================= */
export default function ChatMessage({ message }) {
  const { role, text, meta, timestamp } = message;
  const isUser = role === "user";

  // ✅ Typing effect only for AI
  const typedText = useTypingEffect(text, 10, !isUser);

  const timeStr = timestamp
    ? new Date(timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div
      className="message-enter"
      style={{
        display: "flex",
        flexDirection: isUser ? "row-reverse" : "row",
        alignItems: "flex-start",
        gap: "10px",
        marginBottom: "4px",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontWeight: 700,
          fontSize: "0.75rem",
          background: isUser
            ? "linear-gradient(135deg, #166534, #22c55e)"
            : "var(--accent)",
          color: isUser ? "#e8f5e8" : "#0a0f0a",
          boxShadow: isUser ? "none" : "0 0 12px rgba(74,222,128,0.3)",
        }}
      >
        {isUser ? "YOU" : "AI"}
      </div>

      {/* Message Bubble */}
      <div style={{ maxWidth: "75%", minWidth: "80px" }}>
        <div
          style={{
            background: isUser ? "var(--user-bubble)" : "var(--bot-bubble)",
            border: `1px solid ${
              isUser ? "#2a4a3a" : "var(--border)"
            }`,
            borderRadius: isUser
              ? "18px 4px 18px 18px"
              : "4px 18px 18px 18px",
            padding: "12px 16px",
            color: "var(--text-primary)",
            fontSize: "0.92rem",
            lineHeight: "1.65",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {/* ✅ Typing text */}
          {isUser ? text : typedText}

          {/* 🔥 Blinking cursor */}
          {!isUser && typedText.length < text.length && (
            <span style={{ opacity: 0.6 }}>▋</span>
          )}

          {/* Meta Info */}
          {!isUser && meta && (
            <div
              style={{
                marginTop: "12px",
                borderTop: "1px solid var(--border)",
                paddingTop: "10px",
              }}
            >
              {meta.matchedQuestion && (
                <p
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    fontFamily: "'JetBrains Mono', monospace",
                    marginBottom: "8px",
                  }}
                >
                  ↳ matched:{" "}
                  <span style={{ color: "var(--text-secondary)" }}>
                    {meta.matchedQuestion}
                  </span>
                </p>
              )}

              {meta.matchedKeywords &&
                meta.matchedKeywords.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "4px",
                      marginBottom: "8px",
                    }}
                  >
                    {meta.matchedKeywords.map((kw) => (
                      <span key={kw} className="keyword-badge">
                        # {kw}
                      </span>
                    ))}
                  </div>
                )}

              {meta.found && meta.confidenceScore > 0 && (
                <ConfidenceBar score={meta.confidenceScore} />
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: isUser
              ? "flex-end"
              : "flex-start",
            alignItems: "center",
            gap: "8px",
            marginTop: "4px",
            paddingLeft: isUser ? 0 : "4px",
            paddingRight: isUser ? "4px" : 0,
          }}
        >
          <span
            style={{
              fontSize: "0.65rem",
              color: "var(--text-muted)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            {timeStr}
          </span>

          {/* ✅ Copy full text (not typed) */}
          {!isUser && <CopyButton text={text} />}
        </div>
      </div>
    </div>
  );
}