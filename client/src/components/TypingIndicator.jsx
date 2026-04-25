export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 message-enter">
      {/* Bot avatar */}
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm font-bold accent-glow"
        style={{ background: "var(--accent)", color: "#0a0f0a" }}
      >
        AI
      </div>

      {/* Dots */}
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
        style={{ background: "var(--bot-bubble)", border: "1px solid var(--border)" }}
      >
        <span
          className="typing-dot animate-typing-1"
          style={{ animationName: "typing-dot", animationDuration: "1.2s", animationIterationCount: "infinite", animationDelay: "0s" }}
        />
        <span
          className="typing-dot"
          style={{ animationName: "typing-dot", animationDuration: "1.2s", animationIterationCount: "infinite", animationDelay: "0.2s", display: "inline-block", width: "8px", height: "8px", background: "var(--accent)", borderRadius: "50%" }}
        />
        <span
          className="typing-dot"
          style={{ animationName: "typing-dot", animationDuration: "1.2s", animationIterationCount: "infinite", animationDelay: "0.4s", display: "inline-block", width: "8px", height: "8px", background: "var(--accent)", borderRadius: "50%" }}
        />
      </div>
    </div>
  );
}
