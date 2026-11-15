import { ImageResponse } from "next/og";

export const alt = "RustCode — Coding agents, one desktop app";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: 64,
        background: "#0d0d0f",
        color: "#f0e6e1",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32 }}
      >
        <svg aria-hidden="true" width="68" height="40" viewBox="0 0 8.5 5">
          <path fill="#4a6577" d="M0 1h1v4H0zM1 0h2.8v1H1z" />
          <path
            fill="#f0e6e1"
            d="M4.4 1h1v3h-1zM5.4 0h3.1v1H5.4zM5.4 4h3.1v1H5.4z"
          />
        </svg>
        RustCode
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 76,
          letterSpacing: -3,
        }}
      >
        <span>Your coding agents.</span>
        <span style={{ color: "#9cbcd0" }}>One desktop app.</span>
      </div>
      <div style={{ fontSize: 24 }}>
        Claude Code · Codex · Gemini CLI · OpenCode · Pi · RustCode
      </div>
    </div>,
    size,
  );
}
