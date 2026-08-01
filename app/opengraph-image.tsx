import { ImageResponse } from "next/og";

import { siteConfig } from "@/config";

export const alt = `${siteConfig.name} — Frontend Developer | React, Next.js, Node.js`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "linear-gradient(145deg, #0F0F0F 0%, #171717 55%, #1a1510 100%)",
          color: "#FAFAFA",
          fontFamily: 'Fraunces, ui-serif, Georgia, serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            fontSize: 22,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#D4A574",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              color: "rgba(250,250,250,0.88)",
              letterSpacing: "-0.02em",
            }}
          >
            Frontend Developer
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 26,
              color: "rgba(250,250,250,0.62)",
              maxWidth: 860,
              lineHeight: 1.4,
            }}
          >
            React.js · Next.js · Node.js · MongoDB · Express · Figma
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(250,250,250,0.55)",
          }}
        >
          <span>Chennai, India</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
