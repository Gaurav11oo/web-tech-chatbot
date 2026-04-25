import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import Sidebar from "./components/Sidebar";
import ChatPage from "./pages/ChatPage";
import AdminPage from "./pages/AdminPage";

export default function App() {
  return (
    <ChatProvider>
      <div
        className="scanlines"
        style={{
          display: "flex",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
          background: "var(--bg-primary)",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <main style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
          <Routes>
            <Route path="/" element={<ChatPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </ChatProvider>
  );
}
