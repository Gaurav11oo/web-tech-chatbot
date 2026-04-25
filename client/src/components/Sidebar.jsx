import { Link, useLocation } from "react-router-dom";

const navItems = [
  {
    to: "/",
    label: "Chat",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  // {
  //   to: "/admin",
  //   label: "Admin",
  //   icon: (
  //     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M12 20h9" />
  //       <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  //     </svg>
  //   ),
  // },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside
      style={{
        width: "220px",
        minWidth: "220px",
        background: "var(--bg-secondary)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: "24px 20px 20px",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              background: "var(--accent)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: "0.85rem",
              color: "#0a0f0a",
              boxShadow: "0 0 16px rgba(74,222,128,0.4)",
              flexShrink: 0,
            }}
          >
            W
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.2 }}>
              WebTech AI
            </p>
            <p style={{ fontSize: "0.65rem", color: "var(--text-muted)", fontFamily: "'JetBrains Mono', monospace" }}>
              v1.0 · MongoDB
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ padding: "16px 12px", flex: 1 }}>
        <p
          style={{
            fontSize: "0.62rem",
            color: "var(--text-muted)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontFamily: "'JetBrains Mono', monospace",
            marginBottom: "8px",
            paddingLeft: "8px",
          }}
        >
          Navigation
        </p>
        {navItems.map(({ to, label, icon }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "9px 12px",
                borderRadius: "10px",
                marginBottom: "4px",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                background: active ? "rgba(74,222,128,0.08)" : "transparent",
                border: `1px solid ${active ? "rgba(74,222,128,0.2)" : "transparent"}`,
                textDecoration: "none",
                fontSize: "0.87rem",
                fontWeight: active ? 600 : 400,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--text-secondary)";
                }
              }}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer info */}
      <div
        style={{
          padding: "16px",
          borderTop: "1px solid var(--border)",
          fontSize: "0.65rem",
          color: "var(--text-muted)",
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 1.7,
        }}
      >
        <p>No AI APIs used.</p>
        <p>Pure keyword matching.</p>
        <p style={{ color: "var(--accent)", marginTop: "4px" }}>MERN Stack</p>
      </div>
    </aside>
  );
}
