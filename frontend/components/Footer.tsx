import React from "react";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "var(--camel-900)",
      color: "var(--camel-200)",
      paddingTop: "64px",
      paddingBottom: "48px",
      borderTop: "4px solid var(--camel-600)",
      marginTop: "96px"
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "40px",
          marginBottom: "48px"
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.35rem",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "12px"
            }}>
              SaharaShopper <span style={{ color: "var(--camel-400)", fontWeight: 400 }}>AI</span>
            </div>
            <p style={{
              fontSize: "0.85rem",
              lineHeight: 1.6,
              color: "var(--camel-300)",
              maxWidth: "320px"
            }}>
              High-precision e-commerce customer intention inference engine built upon the UCI Online Shoppers Purchasing Intention benchmark.
            </p>
          </div>

          <div>
            <div style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--camel-400)",
              marginBottom: "16px"
            }}>
              Machine Learning Core
            </div>
            <ul style={{ listStyle: "none", fontSize: "0.85rem", lineHeight: 2, color: "var(--camel-200)" }}>
              <li>Random Forest Classifier (100 Trees)</li>
              <li>ColumnTransformer Pipeline</li>
              <li>StandardScaler + OneHotEncoder</li>
              <li>12,330 Validated Sessions</li>
            </ul>
          </div>

          <div>
            <div style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--camel-400)",
              marginBottom: "16px"
            }}>
              Architecture & Stack
            </div>
            <ul style={{ listStyle: "none", fontSize: "0.85rem", lineHeight: 2, color: "var(--camel-200)" }}>
              <li>Frontend: Next.js (App Router, TypeScript)</li>
              <li>Backend: FastAPI (Python 3.11+, ASGI)</li>
              <li>Design: Handcrafted Camel Palette</li>
              <li>Deployment: Vercel Ready</li>
            </ul>
          </div>

          <div>
            <div style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--camel-400)",
              marginBottom: "16px"
            }}>
              Production Specs
            </div>
            <div style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              padding: "14px",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "0.78rem",
              lineHeight: 1.5,
              color: "var(--camel-300)"
            }}>
              <div>Average Latency: ~18ms</div>
              <div style={{ marginTop: "4px" }}>Model Size: ~14.6 MB</div>
              <div style={{ marginTop: "4px" }}>Language: English (US)</div>
            </div>
          </div>
        </div>

        <div style={{
          paddingTop: "28px",
          borderTop: "1px solid rgba(255, 255, 255, 0.12)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          fontSize: "0.78rem",
          color: "var(--camel-400)"
        }}>
          <div>
            &copy; 2026 SaharaShopper Predictive Intelligence. Built for real-time e-commerce conversion optimization.
          </div>
          <div>
            Designed in Warm Camel & Saddle Palette
          </div>
        </div>
      </div>
    </footer>
  );
}
