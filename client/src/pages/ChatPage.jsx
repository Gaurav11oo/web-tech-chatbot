import { useEffect, useRef } from "react";
import { useChat } from "../context/ChatContext";
import ChatMessage from "../components/ChatMessage";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import SuggestedQuestions from "../components/SuggestedQuestions";

function WelcomeScreen() {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "64px",
          height: "64px",
          background: "var(--accent)",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 800,
          fontSize: "1.5rem",
          color: "#0a0f0a",
          boxShadow: "0 0 32px rgba(74,222,128,0.4)",
          marginBottom: "20px",
        }}
      >
        W
      </div>
      <h1
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "10px",
          letterSpacing: "-0.02em",
        }}
      >
        WebTech AI Chatbot
      </h1>
      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--text-secondary)",
          maxWidth: "380px",
          lineHeight: 1.7,
          marginBottom: "6px",
        }}
      >
        Ask anything about React, JavaScript, TypeScript, CSS, HTML, Node.js,
        Express, MongoDB, or REST APIs.
      </p>
      <p
        style={{
          fontSize: "0.72rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        Powered by MongoDB keyword matching · No AI APIs
      </p>
    </div>
  );
}

export default function ChatPage() {
  const { messages, isTyping, submitMessage, clearChat } = useChat();
  const bottomRef = useRef(null);
  const hasMessages = messages.length > 0;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--bg-primary)",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "14px 20px",
          borderBottom: "1px solid var(--border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg-secondary)",
          flexShrink: 0,
        }}
      >
        <div>
          <h2 style={{ fontWeight: 600, fontSize: "0.95rem", color: "var(--text-primary)" }}>
            Chat
          </h2>
          <p style={{ fontSize: "0.68rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
            {messages.length} message{messages.length !== 1 ? "s" : ""}
          </p>
        </div>

        {hasMessages && (
          <button
            onClick={clearChat}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "5px 12px",
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#f87171";
              e.currentTarget.style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.color = "var(--text-muted)";
            }}
          >
            Clear chat
          </button>
        )}
      </div>

      {/* Messages area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: hasMessages ? "20px 16px" : "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {!hasMessages ? (
          <WelcomeScreen />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* Suggested questions (only when no messages) */}
      {!hasMessages && (
        <SuggestedQuestions onSelect={(q) => submitMessage(q)} />
      )}

      {/* Input */}
      <ChatInput onSend={submitMessage} disabled={isTyping} />
    </div>
  );
}
