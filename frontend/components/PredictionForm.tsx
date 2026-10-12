"use client";

import React, { useState } from "react";
import { ShopperFeatures, Month, VisitorType } from "../lib/types";
import { DEFAULT_SHOPPER_FEATURES } from "../lib/scenarios";

interface PredictionFormProps {
  initialValues?: ShopperFeatures;
  isLoading: boolean;
  onSubmit: (features: ShopperFeatures) => void;
}

export default function PredictionForm({ initialValues, isLoading, onSubmit }: PredictionFormProps) {
  const [formData, setFormData] = useState<ShopperFeatures>(initialValues || DEFAULT_SHOPPER_FEATURES);

  // Sync if parent updates initialValues (e.g. from Scenario picker)
  React.useEffect(() => {
    if (initialValues) {
      setFormData(initialValues);
    }
  }, [initialValues]);

  const handleChange = (field: keyof ShopperFeatures, value: string | number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNumberChange = (field: keyof ShopperFeatures, val: string, isFloat = false) => {
    const num = isFloat ? parseFloat(val) : parseInt(val, 10);
    handleChange(field, isNaN(num) ? 0 : num);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData(DEFAULT_SHOPPER_FEATURES);
  };

  return (
    <form id="predictor" onSubmit={handleSubmit} className="form-card" style={{ marginBottom: "48px" }}>
      {/* Form Top Header */}
      <div style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
        marginBottom: "32px",
        paddingBottom: "24px",
        borderBottom: "1.5px solid var(--border-light)"
      }}>
        <div>
          <div style={{ marginBottom: "8px" }}>
            <span className="camel-badge">
              <span style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--camel-600)"
              }}></span>
              17-Feature Inference Vector
            </span>
          </div>
          <h2 className="serif-heading" style={{ fontSize: "1.85rem", color: "var(--camel-900)" }}>
            Session Feature Configuration
          </h2>
          <p style={{ fontSize: "0.88rem", color: "var(--text-muted)", marginTop: "4px" }}>
            Configure customer session attributes below to calculate immediate purchase readiness against the Random Forest model.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn-secondary"
          style={{ fontSize: "0.85rem", padding: "9px 18px" }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
            <path d="M3 3v5h5"/>
          </svg>
          Reset to Baseline
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>

        {/* =========================================================================
            SECTION 1: Browsing Volume & Dwell Time (3 Equal Balanced Cards)
           ========================================================================= */}
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "18px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "var(--camel-100)",
              color: "var(--camel-800)",
              border: "1px solid var(--camel-300)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              fontWeight: 700
            }}>
              1
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--camel-900)" }}>
                Browsing Volume &amp; Dwell Time
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                Page interaction counts and elapsed seconds across site sections (all 6 inputs aligned)
              </p>
            </div>
          </div>

          {/* 3 Balanced Cards: Exactly in 1 line on desktop */}
          <div className="section1-grid">
            {/* Card 1: Administrative */}
            <div className="form-subcard">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>📋</span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Administrative
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontWeight: 500 }}>
                  Account &amp; Cart
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Pages Visited
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="form-input form-input-with-suffix"
                      value={formData.Administrative}
                      onChange={(e) => handleNumberChange("Administrative", e.target.value)}
                    />
                    <span className="form-input-suffix">pgs</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Duration (s)
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="form-input form-input-with-suffix"
                      value={formData.Administrative_Duration}
                      onChange={(e) => handleNumberChange("Administrative_Duration", e.target.value, true)}
                    />
                    <span className="form-input-suffix">sec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Informational */}
            <div className="form-subcard">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>ℹ️</span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Informational
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--text-dim)", fontWeight: 500 }}>
                  FAQ, Terms &amp; About
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Pages Visited
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="form-input form-input-with-suffix"
                      value={formData.Informational}
                      onChange={(e) => handleNumberChange("Informational", e.target.value)}
                    />
                    <span className="form-input-suffix">pgs</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Duration (s)
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="0.1"
                      className="form-input form-input-with-suffix"
                      value={formData.Informational_Duration}
                      onChange={(e) => handleNumberChange("Informational_Duration", e.target.value, true)}
                    />
                    <span className="form-input-suffix">sec</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Product Related */}
            <div className="form-subcard">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "1.1rem" }}>🛍️</span>
                  <span style={{ fontSize: "0.92rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Product Catalog
                  </span>
                </div>
                <span style={{ fontSize: "0.72rem", color: "var(--camel-700)", fontWeight: 600 }}>
                  {(formData.ProductRelated_Duration / 60).toFixed(1)} mins dwell
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Items Viewed
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="form-input form-input-with-suffix"
                      value={formData.ProductRelated}
                      onChange={(e) => handleNumberChange("ProductRelated", e.target.value)}
                    />
                    <span className="form-input-suffix">items</span>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.76rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                    Duration (s)
                  </label>
                  <div className="form-input-container">
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="form-input form-input-with-suffix"
                      value={formData.ProductRelated_Duration}
                      onChange={(e) => handleNumberChange("ProductRelated_Duration", e.target.value, true)}
                    />
                    <span className="form-input-suffix">sec</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 2: Engagement & Commercial Funnel Indicators (4 Equal Cards)
           ========================================================================= */}
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "18px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "var(--camel-100)",
              color: "var(--camel-800)",
              border: "1px solid var(--camel-300)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              fontWeight: 700
            }}>
              2
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--camel-900)" }}>
                Engagement &amp; Commercial Funnel Indicators
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                E-commerce funnel telemetry and drop-off velocity (all 4 inputs aligned in 1 horizontal line)
              </p>
            </div>
          </div>

          {/* 4 Equal Metric Cards: Perfectly aligned horizontally */}
          <div className="section2-grid">
            {/* 1. Page Values */}
            <div className="form-subcard" style={{
              border: "1.5px solid var(--camel-400)",
              backgroundColor: "var(--camel-50)"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Page Values ($)
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 700,
                    color: "var(--camel-800)",
                    backgroundColor: "var(--camel-200)",
                    padding: "2px 7px",
                    borderRadius: "4px"
                  }}>
                    ★ Top Factor
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px", minHeight: "18px" }}>
                  Average revenue value of visited pages
                </div>
              </div>

              <div className="form-input-container" style={{ marginBottom: "10px" }}>
                <span className="form-input-prefix">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  className="form-input form-input-with-prefix"
                  style={{ fontWeight: 700, borderColor: "var(--camel-400)" }}
                  value={formData.PageValues}
                  onChange={(e) => handleNumberChange("PageValues", e.target.value, true)}
                />
              </div>

              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", lineHeight: 1.35 }}>
                {formData.PageValues > 0 ? (
                  <span style={{ color: "var(--status-purchase)", fontWeight: 600 }}>● Active commercial signal</span>
                ) : (
                  <span>● Non-transactional session</span>
                )}
              </div>
            </div>

            {/* 2. Bounce Rate */}
            <div className="form-subcard">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Bounce Rate
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "var(--text-dim)",
                    backgroundColor: "var(--surface-elevated)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    border: "1px solid var(--border-light)"
                  }}>
                    {(formData.BounceRates * 100).toFixed(1)}%
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px", minHeight: "18px" }}>
                  Percentage of single-page visits
                </div>
              </div>

              <div className="form-input-container" style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.001"
                  className="form-input form-input-with-suffix"
                  value={formData.BounceRates}
                  onChange={(e) => handleNumberChange("BounceRates", e.target.value, true)}
                />
                <span className="form-input-suffix">ratio</span>
              </div>

              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", lineHeight: 1.35 }}>
                {formData.BounceRates < 0.02 ? (
                  <span style={{ color: "var(--status-purchase)", fontWeight: 600 }}>● Low drop-off risk</span>
                ) : (
                  <span>● Standard entry rate</span>
                )}
              </div>
            </div>

            {/* 3. Exit Rate */}
            <div className="form-subcard">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Exit Rate
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "var(--text-dim)",
                    backgroundColor: "var(--surface-elevated)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    border: "1px solid var(--border-light)"
                  }}>
                    {(formData.ExitRates * 100).toFixed(1)}%
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px", minHeight: "18px" }}>
                  Ratio of pageviews that ended visit
                </div>
              </div>

              <div className="form-input-container" style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.001"
                  className="form-input form-input-with-suffix"
                  value={formData.ExitRates}
                  onChange={(e) => handleNumberChange("ExitRates", e.target.value, true)}
                />
                <span className="form-input-suffix">ratio</span>
              </div>

              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", lineHeight: 1.35 }}>
                {formData.ExitRates > 0.06 ? (
                  <span style={{ color: "var(--status-no-purchase)", fontWeight: 600 }}>● High exit velocity</span>
                ) : (
                  <span>● Sustained browsing</span>
                )}
              </div>
            </div>

            {/* 4. Special Day */}
            <div className="form-subcard">
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Special Day
                  </span>
                  <span style={{
                    fontSize: "0.68rem",
                    fontWeight: 600,
                    color: "var(--text-dim)",
                    backgroundColor: "var(--surface-elevated)",
                    padding: "2px 7px",
                    borderRadius: "4px",
                    border: "1px solid var(--border-light)"
                  }}>
                    {formData.SpecialDay.toFixed(1)}
                  </span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px", minHeight: "18px" }}>
                  Holiday / campaign proximity (0 to 1)
                </div>
              </div>

              <div className="form-input-container" style={{ marginBottom: "10px" }}>
                <input
                  type="number"
                  min="0"
                  max="1"
                  step="0.1"
                  className="form-input form-input-with-suffix"
                  value={formData.SpecialDay}
                  onChange={(e) => handleNumberChange("SpecialDay", e.target.value, true)}
                />
                <span className="form-input-suffix">prox</span>
              </div>

              <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", lineHeight: 1.35 }}>
                {formData.SpecialDay > 0 ? (
                  <span style={{ color: "var(--camel-700)", fontWeight: 600 }}>● Event promotion window</span>
                ) : (
                  <span>● Regular calendar day</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: Visitor Profile, Seasonality & Device Profile (Balanced Rows)
           ========================================================================= */}
        <div>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "18px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "var(--camel-100)",
              color: "var(--camel-800)",
              border: "1px solid var(--camel-300)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.9rem",
              fontWeight: 700
            }}>
              3
            </div>
            <div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--camel-900)" }}>
                Visitor Persona, Seasonality &amp; Device Profile
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>
                Demographic persona, timing, and technical session attributes
              </p>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

            {/* Row 3A: Calendar & Persona Profile (3 Equal Columns) */}
            <div className="section3a-grid">
              {/* Month */}
              <div className="form-subcard">
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--camel-900)", marginBottom: "4px" }}>
                  Calendar Month
                </label>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                  Session calendar seasonality
                </div>
                <select
                  className="form-select"
                  value={formData.Month}
                  onChange={(e) => handleChange("Month", e.target.value as Month)}
                >
                  {["Feb", "Mar", "May", "June", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
                    <option key={m} value={m}>{m} (Session Month)</option>
                  ))}
                </select>
              </div>

              {/* Visitor Type */}
              <div className="form-subcard">
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--camel-900)", marginBottom: "4px" }}>
                  Visitor Type
                </label>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                  User loyalty classification
                </div>
                <select
                  className="form-select"
                  value={formData.VisitorType}
                  onChange={(e) => handleChange("VisitorType", e.target.value as VisitorType)}
                >
                  <option value="Returning_Visitor">Returning Visitor (Frequent)</option>
                  <option value="New_Visitor">New Visitor (First Time)</option>
                  <option value="Other">Other Category</option>
                </select>
              </div>

              {/* Weekend Session: Luxury Segmented Control */}
              <div className="form-subcard">
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--camel-900)", marginBottom: "4px" }}>
                  Weekend Session
                </label>
                <div style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginBottom: "10px" }}>
                  Day classification of browsing
                </div>
                <div className="segmented-control">
                  <div
                    className={`segmented-option ${formData.Weekend === false ? "active" : ""}`}
                    onClick={() => handleChange("Weekend", false)}
                  >
                    <span>📅 Weekday</span>
                  </div>
                  <div
                    className={`segmented-option ${formData.Weekend === true ? "active" : ""}`}
                    onClick={() => handleChange("Weekend", true)}
                  >
                    <span>🌴 Weekend</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3B: Hardware & Channel Telemetry (4 Equal Columns) */}
            <div className="section3b-grid">
              <div className="form-subcard">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Operating System
                  </label>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>Code 1–8</span>
                </div>
                <div className="form-input-container">
                  <input
                    type="number"
                    min="1"
                    max="8"
                    className="form-input form-input-with-suffix"
                    value={formData.OperatingSystems}
                    onChange={(e) => handleNumberChange("OperatingSystems", e.target.value)}
                  />
                  <span className="form-input-suffix">OS #{formData.OperatingSystems}</span>
                </div>
              </div>

              <div className="form-subcard">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Browser Engine
                  </label>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>Code 1–13</span>
                </div>
                <div className="form-input-container">
                  <input
                    type="number"
                    min="1"
                    max="13"
                    className="form-input form-input-with-suffix"
                    value={formData.Browser}
                    onChange={(e) => handleNumberChange("Browser", e.target.value)}
                  />
                  <span className="form-input-suffix">Browser #{formData.Browser}</span>
                </div>
              </div>

              <div className="form-subcard">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Geographic Region
                  </label>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>Code 1–9</span>
                </div>
                <div className="form-input-container">
                  <input
                    type="number"
                    min="1"
                    max="9"
                    className="form-input form-input-with-suffix"
                    value={formData.Region}
                    onChange={(e) => handleNumberChange("Region", e.target.value)}
                  />
                  <span className="form-input-suffix">Region #{formData.Region}</span>
                </div>
              </div>

              <div className="form-subcard">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--camel-900)" }}>
                    Traffic Referral
                  </label>
                  <span style={{ fontSize: "0.68rem", color: "var(--text-dim)" }}>Code 1–20</span>
                </div>
                <div className="form-input-container">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    className="form-input form-input-with-suffix"
                    value={formData.TrafficType}
                    onChange={(e) => handleNumberChange("TrafficType", e.target.value)}
                  />
                  <span className="form-input-suffix">Channel #{formData.TrafficType}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Form Action Footer */}
      <div style={{
        marginTop: "40px",
        paddingTop: "28px",
        borderTop: "1.5px solid var(--border-light)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "var(--text-muted)" }}>
          <span style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "var(--status-purchase)"
          }}></span>
          <span>Target: <strong>Revenue</strong> (0 = No Purchase, 1 = Purchase) • Pipeline: Random Forest</span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary"
          style={{
            minWidth: "260px",
            fontSize: "1.02rem",
            padding: "15px 32px",
            opacity: isLoading ? 0.75 : 1,
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        >
          {isLoading ? (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "18px",
                height: "18px",
                border: "2.5px solid #ffffff",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 0.6s linear infinite",
                display: "inline-block"
              }}></span>
              Computing Probability...
            </span>
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
              Compute Purchase Intent
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          )}
        </button>
      </div>

      <style jsx>{`
        .section1-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .section2-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .section3a-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .section3b-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        @media (max-width: 1024px) {
          .section1-grid {
            grid-template-columns: 1fr;
          }
          .section2-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .section3a-grid {
            grid-template-columns: 1fr;
          }
          .section3b-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .section2-grid {
            grid-template-columns: 1fr;
          }
          .section3b-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </form>
  );
}
