import { createContext, useContext, useReducer, useCallback } from "react";
import { sendMessage } from "../services/api";

// ─── State Shape ─────────────────────────────────────────────────────────────
const initialState = {
  messages: [],       // { id, role: 'user'|'bot', text, meta?, timestamp }
  isTyping: false,
  error: null,
};

// ─── Reducer ─────────────────────────────────────────────────────────────────
function chatReducer(state, action) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_TYPING":
      return { ...state, isTyping: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "CLEAR_CHAT":
      return { ...state, messages: [] };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ChatContext = createContext(null);

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const addMessage = useCallback((role, text, meta = null) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: Date.now() + Math.random(),
        role,
        text,
        meta,
        timestamp: new Date(),
      },
    });
  }, []);

  const submitMessage = useCallback(
    async (userText) => {
      if (!userText || !userText.trim()) return;

      // Add user message immediately
      addMessage("user", userText.trim());
      dispatch({ type: "SET_TYPING", payload: true });
      dispatch({ type: "CLEAR_ERROR" });

      try {
        const response = await sendMessage(userText.trim());
        const { answer, matchedKeywords, confidenceScore, found, matchedQuestion } =
          response.data.data;

        // Small delay for natural feel
        await new Promise((r) => setTimeout(r, 400));

        addMessage("bot", answer, {
          matchedKeywords,
          confidenceScore,
          found,
          matchedQuestion,
        });
      } catch (err) {
        const errorMsg =
          err.response?.data?.error ||
          "Connection failed. Make sure the server is running.";
        dispatch({ type: "SET_ERROR", payload: errorMsg });
        addMessage(
          "bot",
          "⚠️ I couldn't reach the server. Please check that the backend is running on port 5000.",
          { found: false, confidenceScore: 0, matchedKeywords: [] }
        );
      } finally {
        dispatch({ type: "SET_TYPING", payload: false });
      }
    },
    [addMessage]
  );

  const clearChat = useCallback(() => {
    dispatch({ type: "CLEAR_CHAT" });
  }, []);

  return (
    <ChatContext.Provider value={{ ...state, submitMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error("useChat must be used inside ChatProvider");
  return ctx;
};
