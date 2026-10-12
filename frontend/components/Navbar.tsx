import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header style={{
      borderBottom: "1.5px solid var(--border-medium)",
      backgroundColor: "rgba(251, 248, 243, 0.94)",
      backdropFilter: "blur(14px)",
      position: "sticky",
      top: 0,
      zIndex: 50,
      transition: "all 0.2s ease"
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "76px"
      }}>
        {/* Brand Logo & Editorial Typography */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, var(--camel-700) 0%, var(--camel-900) 100%)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(88, 52, 24, 0.28)",
            border: "1px solid var(--camel-600)",
            flexShrink: 0
          }}>
            {/* Elegant shopping bag / commerce insignia */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: "-0.015em",
              color: "var(--camel-900)",
              lineHeight: 1.15
            }}>
              Sahara<span style={{ color: "var(--camel-600)", fontWeight: 500 }}>Shopper</span>
            </div>
            <div style={{
              fontSize: "0.66rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              fontWeight: 700,
              marginTop: "1px"
            }}>
              Intention AI • E-Commerce Analytics
            </div>
          </div>
        </Link>

        {/* Navigation links & Model status */}
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <a href="#predictor" style={{
              fontSize: "0.9rem",
              fontWeight: 600,
              color: "var(--text-main)",
              transition: "color 0.15s ease"
            }}>
              Predictor
            </a>
            <a href="#scenarios" style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              transition: "color 0.15s ease"
            }}>
              Scenarios
            </a>
            <a href="#architecture" style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--text-muted)",
              transition: "color 0.15s ease"
            }}>
              Methodology
            </a>
          </nav>

          <div className="camel-badge" style={{ display: "flex" }}>
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--status-purchase)"
            }}></span>
            Random Forest Active
          </div>

          <a
            href="#predictor"
            className="btn-primary"
            style={{
              padding: "9px 20px",
              fontSize: "0.88rem",
              borderRadius: "var(--radius-sm)"
            }}
          >
            Launch Test
          </a>
        </div>
      </div>
    </header>
  );
}
