import { ShopperFeatures, PredictionResponse } from "./types";

export async function requestPrediction(features: ShopperFeatures): Promise<PredictionResponse> {
  const response = await fetch("/api/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(features),
  });

  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(errBody.error || `Server error: ${response.status}`);
  }

  return response.json();
}
