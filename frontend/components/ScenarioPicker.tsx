"use client";

import React from "react";
import { PRESET_SCENARIOS } from "../lib/scenarios";
import { ScenarioPreset } from "../lib/types";

interface ScenarioPickerProps {
  activeScenarioId?: string;
  onSelect: (preset: ScenarioPreset) => void;
}

export default function ScenarioPicker({ activeScenarioId, onSelect }: ScenarioPickerProps) {
  const getIconForScenario = (id: string) => {
    switch (id) {
      case "high_intent":
        return "💎";
      case "window_shopper":
        return "👀";
      case "researcher":
        return "🔍";
      case "holiday_hunter":
        return "🎁";
      default:
        return "📊";
    }
  };

  return (
    <div id="scenarios" style={{ marginBottom: "40px" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "20px"
      }}>
        <div>
          <span className="camel-badge">
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--camel-600)"
            }}></span>
            1-Click Benchmark Presets
          </span>
          <h3 className="serif-heading" style={{ fontSize: "1.45rem", marginTop: "8px" }}>
            Explore Realistic Shopper Personas
          </h3>
          <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginTop: "2px" }}>
            Select any archetypal session below to auto-populate all 17 feature fields with authentic dataset parameters.
          </p>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "18px"
      }}>
        {PRESET_SCENARIOS.map((preset) => {
          const isSelected = activeScenarioId === preset.id;
          const isPositive = preset.id === "high_intent" || preset.id === "holiday_hunter";

          return (
            <div
              key={preset.id}
              onClick={() => onSelect(preset)}
              style={{
                backgroundColor: isSelected ? "var(--camel-100)" : "var(--surface-card)",
                border: isSelected ? "2px solid var(--camel-600)" : "1.5px solid var(--border-medium)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 22px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                boxShadow: isSelected ? "var(--shadow-md)" : "var(--shadow-sm)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--camel-400)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "var(--shadow-md)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = "var(--border-medium)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                }
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "1.25rem" }}>{getIconForScenario(preset.id)}</span>
                    <span style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      color: isPositive ? "var(--status-purchase)" : "var(--camel-800)",
                      backgroundColor: isPositive ? "var(--status-purchase-bg)" : "var(--camel-200)",
                      padding: "3px 9px",
                      borderRadius: "999px",
                      border: "1px solid rgba(0,0,0,0.06)"
                    }}>
                      {preset.badge}
                    </span>
                  </div>

                  {isSelected && (
                    <span style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      color: "#ffffff",
                      backgroundColor: "var(--camel-700)",
                      padding: "3px 8px",
                      borderRadius: "999px",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px"
                    }}>
                      ✓ LOADED
                    </span>
                  )}
                </div>

                <h4 style={{
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  color: "var(--camel-900)",
                  marginBottom: "8px",
                  lineHeight: 1.25
                }}>
                  {preset.title}
                </h4>

                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--text-muted)",
                  lineHeight: 1.5,
                  marginBottom: "16px"
                }}>
                  {preset.description}
                </p>
              </div>

              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: "12px",
                borderTop: "1px solid var(--border-light)",
                fontSize: "0.76rem",
                color: "var(--text-dim)"
              }}>
                <span>Month: <strong style={{ color: "var(--camel-900)" }}>{preset.data.Month}</strong></span>
                <span>PageVal: <strong style={{ color: "var(--camel-900)" }}>${preset.data.PageValues.toFixed(1)}</strong></span>
                <span>Catalog: <strong style={{ color: "var(--camel-900)" }}>{preset.data.ProductRelated}</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
