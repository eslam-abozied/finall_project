import React from "react";

export default function HeroSection() {
  return (
    <section style={{
      paddingTop: "68px",
      paddingBottom: "56px",
      textAlign: "center"
    }}>
      <div style={{ maxWidth: "860px", margin: "0 auto" }}>
        <div style={{ display: "inline-flex", marginBottom: "18px" }}>
          <span className="camel-badge" style={{ gap: "8px", padding: "6px 18px" }}>
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "var(--camel-600)"
            }}></span>
            Scikit-Learn Random Forest Pipeline • 12,330 Benchmark Records
          </span>
        </div>

        <h1 className="serif-heading" style={{
          fontSize: "clamp(2.5rem, 5.2vw, 3.8rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          color: "var(--camel-900)",
          marginBottom: "22px"
        }}>
          Predict Online Shopper Purchase Intention in Real Time
        </h1>

        <p style={{
          fontSize: "1.12rem",
          lineHeight: 1.68,
          color: "var(--text-muted)",
          maxWidth: "690px",
          margin: "0 auto 36px auto"
        }}>
          Evaluate session navigation telemetry, Google Analytics commercial touchpoints, and customer behavioral velocity 
          to forecast transaction readiness with high-precision machine learning.
        </p>

        {/* Action CTAs */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "18px",
          flexWrap: "wrap",
          marginBottom: "56px"
        }}>
          <a href="#predictor" className="btn-primary" style={{ padding: "15px 32px", fontSize: "1.02rem" }}>
            Configure &amp; Predict Session
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <polyline points="19 12 12 19 5 12"/>
            </svg>
          </a>

          <a href="#scenarios" className="btn-secondary" style={{ padding: "15px 28px", fontSize: "1.02rem" }}>
            Browse Preset Personas
          </a>
        </div>

        {/* Quantitative Benchmark Strip */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "16px",
          backgroundColor: "var(--surface-card)",
          border: "1.5px solid var(--border-medium)",
          borderRadius: "var(--radius-xl)",
          padding: "26px 24px",
          boxShadow: "var(--shadow-md)"
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "var(--camel-800)"
            }}>
              12,330
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", marginTop: "4px" }}>
              Sessions Trained
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "var(--camel-800)"
            }}>
              17
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", marginTop: "4px" }}>
              Session Features
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "var(--camel-800)"
            }}>
              100
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", marginTop: "4px" }}>
              Decision Trees
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.1rem",
              fontWeight: 700,
              color: "var(--camel-800)"
            }}>
              89.6%
            </div>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", marginTop: "4px" }}>
              Test Accuracy
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
