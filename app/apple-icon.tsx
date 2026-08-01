import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F0F0F",
          color: "#D4A574",
          fontSize: 96,
          fontWeight: 700,
          fontFamily: 'Fraunces, ui-serif, Georgia, serif',
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
