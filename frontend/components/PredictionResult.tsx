"use client";

import React from "react";
import { PredictionResponse } from "../lib/types";

interface PredictionResultProps {
  result: PredictionResponse;
  onReset?: () => void;
}

export default function PredictionResult({ result, onReset }: PredictionResultProps) {
  const isPurchase = result.prediction === 1;
  const purchasePct = Math.round(result.purchase_probability * 100);
  const noPurchasePct = Math.round(result.no_purchase_probability * 100);

  return (
    <div className="animate-fade-in" style={{
      backgroundColor: "var(--surface-card)",
      border: isPurchase ? "2px solid var(--status-purchase-border)" : "2px solid var(--status-no-purchase-border)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      marginBottom: "48px"
    }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: isPurchase ? "var(--status-purchase-bg)" : "var(--status-no-purchase-bg)",
        borderBottom: isPurchase ? "1.5px solid var(--status-purchase-border)" : "1.5px solid var(--status-no-purchase-border)",
        padding: "32px 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: isPurchase ? "var(--status-purchase)" : "var(--status-no-purchase)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 18px rgba(0,0,0,0.18)",
            flexShrink: 0
          }}>
            {isPurchase ? (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            )}
          </div>

          <div>
            <div style={{
              fontSize: "0.78rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: isPurchase ? "var(--status-purchase)" : "var(--status-no-purchase)"
            }}>
              Inference Outcome • {result.confidence_level} Confidence
            </div>
            <h2 className="serif-heading" style={{
              fontSize: "1.9rem",
              color: isPurchase ? "var(--status-purchase)" : "var(--status-no-purchase)",
              lineHeight: 1.2,
              marginTop: "4px"
            }}>
              {isPurchase ? "Customer Will Purchase" : "No Purchase Expected"}
            </h2>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            textAlign: "right",
            padding: "9px 18px",
            borderRadius: "var(--radius-sm)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)"
          }}>
            <div style={{ fontSize: "0.68rem", color: "var(--text-dim)", textTransform: "uppercase", fontWeight: 700 }}>Inference Model</div>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--camel-900)" }}>{result.model_name}</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "36px" }}>
        {/* Probability Dual Dial / Metric Bar */}
        <div style={{
          backgroundColor: "var(--surface-elevated)",
          border: "1.5px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          padding: "26px",
          marginBottom: "32px"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "14px",
            flexWrap: "wrap",
            gap: "10px"
          }}>
            <div>
              <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--camel-900)" }}>
                Calculated Conversion Probability
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginLeft: "8px" }}>
                (Class 1 vs Class 0 Probability Spread)
              </span>
            </div>
            <div style={{ display: "flex", gap: "20px", fontSize: "0.86rem", fontWeight: 600 }}>
              <span style={{ color: "var(--status-purchase)" }}>
                Purchase: <strong style={{ fontSize: "1.05rem" }}>{purchasePct}%</strong>
              </span>
              <span style={{ color: "var(--status-no-purchase)" }}>
                No Purchase: <strong style={{ fontSize: "1.05rem" }}>{noPurchasePct}%</strong>
              </span>
            </div>
          </div>

          {/* Probability Bar */}
          <div style={{
            height: "18px",
            borderRadius: "999px",
            backgroundColor: "var(--status-no-purchase-bg)",
            overflow: "hidden",
            display: "flex",
            border: "1.5px solid var(--border-medium)"
          }}>
            <div style={{
              width: `${purchasePct}%`,
              backgroundColor: "var(--status-purchase)",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
            }}></div>
            <div style={{
              width: `${noPurchasePct}%`,
              backgroundColor: "var(--status-no-purchase)",
              transition: "width 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
            }}></div>
          </div>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.74rem",
            color: "var(--text-dim)",
            marginTop: "10px",
            fontWeight: 500
          }}>
            <span>0% (Abandonment)</span>
            <span>50% (Decision Boundary)</span>
            <span>100% (Guaranteed Conversion)</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div style={{ marginBottom: "32px" }}>
          <h4 style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--camel-900)",
            marginBottom: "10px"
          }}>
            Session Evaluation
          </h4>
          <p style={{
            fontSize: "0.95rem",
            lineHeight: 1.65,
            color: "var(--text-main)",
            backgroundColor: "var(--camel-50)",
            borderLeft: "4px solid var(--camel-600)",
            padding: "16px 20px",
            borderRadius: "0 var(--radius-sm) var(--radius-sm) 0"
          }}>
            {result.summary}
          </p>
        </div>

        {/* Analytical Insights & Contributing Factors */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "26px",
          marginBottom: "32px"
        }}>
          {/* Key Insights List */}
          <div>
            <h4 style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--camel-900)",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ color: "var(--camel-600)" }}>◆</span>
              Key Behavioral Insights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {result.key_insights.map((insight, idx) => (
                <div key={idx} style={{
                  padding: "14px 16px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--surface-elevated)",
                  border: "1px solid var(--border-light)",
                  fontSize: "0.85rem",
                  lineHeight: 1.55,
                  color: "var(--text-main)"
                }}>
                  {insight}
                </div>
              ))}
            </div>
          </div>

          {/* Influencing Factors Cards */}
          <div>
            <h4 style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              color: "var(--camel-900)",
              marginBottom: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <span style={{ color: "var(--camel-600)" }}>◆</span>
              Feature Impact Breakdown
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {result.influencing_factors.map((factor, idx) => (
                <div key={idx} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: "var(--surface-elevated)",
                  border: "1px solid var(--border-light)",
                  gap: "14px"
                }}>
                  <div>
                    <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--camel-900)" }}>
                      {factor.feature}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "3px" }}>
                      {factor.description}
                    </div>
                  </div>
                  <span style={{
                    fontSize: "0.74rem",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: "6px",
                    flexShrink: 0,
                    backgroundColor: factor.impact.includes("Positive") ? "var(--status-purchase-bg)" : "var(--camel-100)",
                    color: factor.impact.includes("Positive") ? "var(--status-purchase)" : "var(--camel-800)",
                    border: "1px solid rgba(0,0,0,0.06)"
                  }}>
                    {factor.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strategic E-Commerce Actions */}
        <div style={{
          padding: "24px 28px",
          borderRadius: "var(--radius-md)",
          backgroundColor: isPurchase ? "var(--camel-100)" : "var(--surface-elevated)",
          border: "1.5px solid var(--border-medium)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "18px"
        }}>
          <div>
            <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--camel-900)" }}>
              {isPurchase ? "Recommended Action: Prioritize Checkout Flow" : "Recommended Action: Deploy Retargeting & Exit Incentives"}
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginTop: "4px" }}>
              {isPurchase
                ? "Maintain friction-free one-click checkout, verify inventory availability, and trigger instant delivery confirmations."
                : "Trigger targeted exit-intent discount popups, present popular social proof reviews, or offer personalized bundle discounts."}
            </div>
          </div>

          {onReset && (
            <button
              onClick={onReset}
              className="btn-secondary"
              style={{ padding: "10px 20px", fontSize: "0.88rem" }}
            >
              Modify Inputs &amp; Re-run
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
