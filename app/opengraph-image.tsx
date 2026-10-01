import { ImageResponse } from "next/og"; // Edge-compatible OG image (no puppeteer/native deps)

// Generated OG card (P5): typography-driven, matches the dark editorial
// identity, no fake screenshots. 1200x630.

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Reyon Lau Jiemin — Software Engineer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#08090C",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 20, letterSpacing: 6, color: "#9AA1AD" }}>
          PORTFOLIO — 2026
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              lineHeight: 1.0,
              color: "#F5F7FA",
              fontFamily: "sans-serif",
            }}
          >
            <div>REYON</div>
            <div>LAU JIEMIN</div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 36,
              fontSize: 24,
              letterSpacing: 4,
              color: "#63B3FF",
            }}
          >
            SOFTWARE ENGINEER
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #2A2E37",
            paddingTop: 28,
            fontSize: 18,
            letterSpacing: 2,
            color: "#9AA1AD",
          }}
        >
          <div>WEB · MOBILE · DEVELOPER AUTOMATION</div>
          <div>github.com/Reyonl</div>
        </div>
      </div>
    ),
    size,
  );
}
