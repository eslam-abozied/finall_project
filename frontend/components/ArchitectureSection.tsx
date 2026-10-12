import React from "react";

export default function ArchitectureSection() {
  const topFeatures = [
    { name: "Page Values", weight: 36.4, desc: "Highest predictive weight; measures transactional touchpoint intensity." },
    { name: "Exit Rates", weight: 14.8, desc: "Proportion of page exits across session; low exit rate preserves buying momentum." },
    { name: "Product Related Duration", weight: 12.2, desc: "Time investment in catalog discovery indicates deliberate comparison." },
    { name: "Product Related Count", weight: 9.7, desc: "Breadth of items explored before checkout trigger." },
    { name: "Administrative Duration", weight: 6.8, desc: "Account setup, cart inspection, and shipping address verification." },
  ];

  return (
    <section id="architecture" style={{
      marginTop: "64px",
      padding: "40px",
      backgroundColor: "var(--surface-card)",
      border: "1px solid var(--border-medium)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-md)"
    }}>
      <div style={{ maxWidth: "780px", marginBottom: "32px" }}>
        <span className="camel-badge">Research & Notebook Foundation</span>
        <h2 className="serif-heading" style={{ fontSize: "1.75rem", marginTop: "8px" }}>
          Pipeline Architecture & Data Methodology
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: 1.6, marginTop: "6px" }}>
          Extracted directly from the Machine Learning classification pipeline developed in <code>3.ipynb</code>, 
          evaluating 12,330 customer sessions to predict commercial purchase intention.
        </p>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "24px",
        marginBottom: "36px"
      }}>
        {/* Pipeline Diagram Card */}
        <div style={{
          padding: "24px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--camel-50)",
          border: "1px solid var(--camel-200)"
        }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--camel-900)", marginBottom: "14px" }}>
            Scikit-Learn Ensemble Pipeline
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.82rem" }}>
            <div style={{
              backgroundColor: "#ffffff",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid var(--border-medium)",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span style={{ fontWeight: 600 }}>1. Raw Inputs</span>
              <span style={{ color: "var(--text-dim)" }}>17 Feature Vector</span>
            </div>

            <div style={{ textAlign: "center", color: "var(--camel-600)", fontSize: "0.9rem" }}>↓</div>

            <div style={{
              backgroundColor: "#ffffff",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid var(--border-medium)",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span style={{ fontWeight: 600 }}>2. ColumnTransformer</span>
              <span style={{ color: "var(--text-dim)" }}>OneHotEncoder + Passthrough</span>
            </div>

            <div style={{ textAlign: "center", color: "var(--camel-600)", fontSize: "0.9rem" }}>↓</div>

            <div style={{
              backgroundColor: "#ffffff",
              padding: "10px 14px",
              borderRadius: "6px",
              border: "1px solid var(--border-medium)",
              display: "flex",
              justifyContent: "space-between"
            }}>
              <span style={{ fontWeight: 600 }}>3. Random Forest</span>
              <span style={{ color: "var(--camel-700)", fontWeight: 700 }}>100 Estimator Trees</span>
            </div>

            <div style={{ textAlign: "center", color: "var(--camel-600)", fontSize: "0.9rem" }}>↓</div>

            <div style={{
              backgroundColor: "var(--camel-700)",
              color: "#ffffff",
              padding: "10px 14px",
              borderRadius: "6px",
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 700
            }}>
              <span>4. Prediction Output</span>
              <span>P(Purchase) &amp; P(Bounce)</span>
            </div>
          </div>
        </div>

        {/* Feature Importance Rankings */}
        <div style={{
          padding: "24px",
          borderRadius: "var(--radius-lg)",
          backgroundColor: "var(--surface-elevated)",
          border: "1px solid var(--border-light)"
        }}>
          <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--camel-900)", marginBottom: "14px" }}>
            Top Feature Importance Weights
          </h4>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {topFeatures.map((f, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 600, color: "var(--camel-900)" }}>{f.name}</span>
                  <span style={{ fontWeight: 700, color: "var(--camel-700)" }}>{f.weight}%</span>
                </div>
                <div style={{
                  height: "8px",
                  backgroundColor: "var(--camel-100)",
                  borderRadius: "999px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${f.weight * 2.5}%`,
                    height: "100%",
                    backgroundColor: "var(--camel-600)",
                    borderRadius: "999px"
                  }}></div>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "2px" }}>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Model Benchmark Card */}
      <div style={{
        padding: "20px 24px",
        borderRadius: "var(--radius-md)",
        backgroundColor: "var(--camel-100)",
        border: "1px solid var(--camel-300)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--camel-900)" }}>
            Algorithm Selection: Why Random Forest?
          </div>
          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "2px" }}>
            In empirical comparisons in <code>3.ipynb</code>, Random Forest outperformed Logistic Regression and SVM by successfully capturing non-linear interactions between bounce metrics and seasonality.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{
            padding: "8px 14px",
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            border: "1px solid var(--border-medium)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>Accuracy</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--camel-800)" }}>~89.6%</div>
          </div>
          <div style={{
            padding: "8px 14px",
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            border: "1px solid var(--border-medium)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "0.7rem", color: "var(--text-dim)" }}>F1-Score</div>
            <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--camel-800)" }}>~0.68</div>
          </div>
        </div>
      </div>
    </section>
  );
}
