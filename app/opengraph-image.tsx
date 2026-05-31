import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";
export const alt = "Urbancare - Amministratore condominiale a Milano";
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
          padding: 72,
          color: "#203161",
          background: "linear-gradient(135deg, #ffffff 0%, #edf2ff 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800 }}>
            {siteConfig.name}
          </div>
          <div
            style={{
              maxWidth: 900,
              fontSize: 58,
              lineHeight: 1.08,
              fontWeight: 700,
            }}
          >
            Amministrazione condominiale chiara, digitale e presente.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#4364c7",
          }}
        >
          <span>Milano e provincia</span>
          <span>{siteConfig.phone}</span>
        </div>
      </div>
    ),
    size
  );
}
