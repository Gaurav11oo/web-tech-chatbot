require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// ✅ FIXED CORS
const allowedOrigins = [
  "http://localhost:5173",
  "https://web-tech-chatbot.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.includes("vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed: " + origin));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// Dev logs
if (process.env.NODE_ENV === "development") {
  app.use((req, _res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });
}

// ✅ FIXED ROUTES
app.use("/api", require("./routes/chatRoutes"));
app.use("/api", require("./routes/knowledgeRoutes"));

app.get("/api/health", (_req, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString() })
);

// 404
app.use((_req, res) =>
  res.status(404).json({ success: false, error: "Route not found." })
);

// Error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, error: err.message });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});