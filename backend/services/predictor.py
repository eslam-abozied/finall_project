import os
import json
import joblib
import pandas as pd
from typing import Dict, Any, List
from schemas.prediction import ShopperFeatures, PredictionResponse, FactorContribution

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MODEL_CANDIDATE_PATHS = [
    os.path.join(BASE_DIR, "models", "online_shoppers_best_model.pkl"),
    os.path.join(os.getcwd(), "models", "online_shoppers_best_model.pkl"),
    "/home/eslam/Downloads/pay/models/online_shoppers_best_model.pkl"
]

META_CANDIDATE_PATHS = [
    os.path.join(BASE_DIR, "models", "online_shoppers_model_metadata.json"),
    os.path.join(os.getcwd(), "models", "online_shoppers_model_metadata.json"),
    "/home/eslam/Downloads/pay/models/online_shoppers_model_metadata.json"
]

class ShopperPredictorService:
    def __init__(self):
        self.model = None
        self.metadata = {}
        self._load_artifacts()

    def _load_artifacts(self):
        model_path = None
        for p in MODEL_CANDIDATE_PATHS:
            if os.path.exists(p):
                model_path = p
                break

        if not model_path:
            raise FileNotFoundError(f"Model file not found in candidates: {MODEL_CANDIDATE_PATHS}")

        self.model = joblib.load(model_path)

        meta_path = None
        for p in META_CANDIDATE_PATHS:
            if os.path.exists(p):
                meta_path = p
                break

        if meta_path and os.path.exists(meta_path):
            with open(meta_path, "r", encoding="utf-8") as f:
                self.metadata = json.load(f)

    def get_metadata(self) -> Dict[str, Any]:
        return self.metadata

    def predict(self, features: ShopperFeatures) -> PredictionResponse:
        data_dict = features.model_dump()
        input_df = pd.DataFrame([data_dict])

        # Execute prediction through Scikit-Learn Pipeline
        raw_pred = self.model.predict(input_df)[0]
        raw_proba = self.model.predict_proba(input_df)[0]

        # Pipeline classes are [0, 1]
        p_no_purchase = round(float(raw_proba[0]), 4)
        p_purchase = round(float(raw_proba[1]), 4)
        pred_int = int(raw_pred)
        pred_label = "Purchase" if pred_int == 1 else "No Purchase"

        # Determine confidence grade
        max_prob = max(p_purchase, p_no_purchase)
        if max_prob >= 0.85:
            confidence = "Very High"
        elif max_prob >= 0.70:
            confidence = "High"
        elif max_prob >= 0.58:
            confidence = "Moderate"
        else:
            confidence = "Borderline"

        # Generate contextual, data-driven domain insights
        insights: List[str] = []
        factors: List[FactorContribution] = []

        # 1. Page Values (highest feature importance in e-commerce intention)
        if features.PageValues > 10.0:
            insights.append(
                f"Exceptional Page Value ({features.PageValues:.1f}) detected: In web analytics, visitors interacting with high-value pages are over 7x more likely to convert."
            )
            factors.append(FactorContribution(
                feature="Page Values",
                impact="Strong Positive",
                description=f"Value is {features.PageValues:.1f}, placing this session in the upper tier of commercial intent."
            ))
        elif features.PageValues > 0.0:
            insights.append(
                f"Moderate Page Value ({features.PageValues:.1f}): The visitor has reached revenue-generating pages on the site."
            )
            factors.append(FactorContribution(
                feature="Page Values",
                impact="Positive",
                description=f"Value {features.PageValues:.1f} shows interaction with monetized content."
            ))
        else:
            insights.append(
                "Zero Page Value: The shopper has not touched any page historically linked to completed cart checkouts."
            )
            factors.append(FactorContribution(
                feature="Page Values",
                impact="Negative",
                description="Zero page value is the primary indicator of casual browsing without buying."
            ))

        # 2. Bounce & Exit Rates
        if features.BounceRates <= 0.01 and features.ExitRates <= 0.03:
            insights.append(
                f"Very low bounce ({features.BounceRates*100:.1f}%) and exit ({features.ExitRates*100:.1f}%) rates indicate focused, deep browsing engagement."
            )
            factors.append(FactorContribution(
                feature="Engagement Rates",
                impact="Positive",
                description="Minimal exit velocity indicates sustained interest."
            ))
        elif features.ExitRates > 0.07:
            insights.append(
                f"Elevated exit rate ({features.ExitRates*100:.1f}%) suggests early abandonment friction or disengagement."
            )
            factors.append(FactorContribution(
                feature="Exit Rates",
                impact="Negative",
                description=f"Exit rate of {features.ExitRates*100:.1f}% increases session drop-off likelihood."
            ))

        # 3. Product Browsing Depth
        if features.ProductRelated >= 20 and features.ProductRelated_Duration >= 450:
            insights.append(
                f"Deep catalog exploration: Visited {features.ProductRelated} product pages and spent {features.ProductRelated_Duration/60:.1f} minutes browsing items."
            )
            factors.append(FactorContribution(
                feature="Catalog Depth",
                impact="Positive",
                description=f"{features.ProductRelated} items viewed for {features.ProductRelated_Duration/60:.1f} mins."
            ))
        elif features.ProductRelated <= 3:
            insights.append(
                "Shallow catalog activity: User inspected very few product listings during this session."
            )
            factors.append(FactorContribution(
                feature="Catalog Depth",
                impact="Weak",
                description=f"Only {features.ProductRelated} product pages visited."
            ))

        # 4. Temporal / Month context
        if features.Month in ["Nov", "Dec"]:
            insights.append(
                f"Seasonal holiday tailwind: Sessions during {features.Month} benefit from strong Q4 seasonal shopping discounts and holiday intent."
            )
            factors.append(FactorContribution(
                feature="Seasonality",
                impact="Positive",
                description=f"{features.Month} session coincides with high-conversion festive sales."
            ))
        elif features.Month in ["May"]:
            insights.append("May sessions represent high volume traffic in the benchmark dataset with moderate baseline conversion.")

        # 5. Visitor Type
        if features.VisitorType == "Returning_Visitor":
            factors.append(FactorContribution(
                feature="Visitor Loyalty",
                impact="Neutral/Positive",
                description="Returning shopper with established brand familiarity."
            ))
        elif features.VisitorType == "New_Visitor":
            factors.append(FactorContribution(
                feature="Visitor Loyalty",
                impact="Neutral",
                description="First-time visitor undergoing product discovery."
            ))

        if pred_int == 1:
            summary = (
                f"High-propensity session: The customer demonstrates clear purchasing signals "
                f"with a {p_purchase*100:.1f}% estimated probability of converting."
            )
        else:
            summary = (
                f"Informational / Browsing session: The customer exhibits low checkout readiness "
                f"with a {p_no_purchase*100:.1f}% likelihood of departing without a purchase."
            )

        return PredictionResponse(
            prediction=pred_int,
            prediction_label=pred_label,
            purchase_probability=p_purchase,
            no_purchase_probability=p_no_purchase,
            confidence_level=confidence,
            summary=summary,
            key_insights=insights,
            influencing_factors=factors,
            model_name="Random Forest Classifier (100 Trees Pipeline)"
        )

# Singleton instance
predictor_service = ShopperPredictorService()
