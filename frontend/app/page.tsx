"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ScenarioPicker from "../components/ScenarioPicker";
import PredictionForm from "../components/PredictionForm";
import PredictionResult from "../components/PredictionResult";
import ArchitectureSection from "../components/ArchitectureSection";
import Footer from "../components/Footer";
import { DEFAULT_SHOPPER_FEATURES } from "../lib/scenarios";
import { ShopperFeatures, PredictionResponse, ScenarioPreset } from "../lib/types";
import { requestPrediction } from "../lib/api";

export default function Home() {
  const [currentFeatures, setCurrentFeatures] = useState<ShopperFeatures>(DEFAULT_SHOPPER_FEATURES);
  const [activeScenarioId, setActiveScenarioId] = useState<string | undefined>("high_intent");
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSelectScenario = (preset: ScenarioPreset) => {
    setActiveScenarioId(preset.id);
    setCurrentFeatures(preset.data);
    setErrorMessage(null);
    // Smooth scroll to form
    const formEl = document.getElementById("predictor");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handlePredict = async (features: ShopperFeatures) => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const pred = await requestPrediction(features);
      setResult(pred);
      // Smooth scroll to result
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }, 100);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unable to complete prediction";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setErrorMessage(null);
    const formEl = document.getElementById("predictor");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        <div className="container">
          <HeroSection />

          {/* Error Banner if any */}
          {errorMessage && (
            <div style={{
              backgroundColor: "var(--status-no-purchase-bg)",
              border: "1px solid var(--status-no-purchase-border)",
              color: "var(--status-no-purchase)",
              padding: "16px 20px",
              borderRadius: "var(--radius-md)",
              marginBottom: "28px",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <span><strong>Notice:</strong> {errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                style={{ fontWeight: 700, color: "inherit", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Active Result View */}
          {result && (
            <div style={{ marginBottom: "20px" }}>
              <PredictionResult result={result} onReset={handleReset} />
            </div>
          )}

          {/* 1-Click Scenario Presets */}
          <ScenarioPicker
            activeScenarioId={activeScenarioId}
            onSelect={handleSelectScenario}
          />

          {/* Interactive Feature Configuration Form */}
          <PredictionForm
            initialValues={currentFeatures}
            isLoading={isLoading}
            onSubmit={handlePredict}
          />

          {/* Notebook & Machine Learning Methodology */}
          <ArchitectureSection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
