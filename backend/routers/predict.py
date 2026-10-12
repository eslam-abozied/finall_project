from fastapi import APIRouter, HTTPException
from schemas.prediction import ShopperFeatures, PredictionResponse
from services.predictor import predictor_service
from typing import Dict, Any, List

router = APIRouter(tags=["Prediction"])

@router.get("/health")
def health_check() -> Dict[str, str]:
    return {
        "status": "healthy",
        "service": "Online Shoppers Intention Prediction API",
        "model": "Random Forest Pipeline"
    }

@router.get("/metadata")
def get_metadata() -> Dict[str, Any]:
    return predictor_service.get_metadata()

@router.get("/sample-scenarios")
def get_sample_scenarios() -> List[Dict[str, Any]]:
    return [
        {
            "id": "high_intent",
            "title": "High-Intent Buyer",
            "badge": "High Probability",
            "description": "Engaged returning shopper exploring multiple catalog items with high cart page value in November.",
            "data": {
                "Administrative": 3,
                "Administrative_Duration": 120.0,
                "Informational": 1,
                "Informational_Duration": 45.0,
                "ProductRelated": 38,
                "ProductRelated_Duration": 1420.0,
                "BounceRates": 0.005,
                "ExitRates": 0.018,
                "PageValues": 24.5,
                "SpecialDay": 0.0,
                "Month": "Nov",
                "OperatingSystems": 2,
                "Browser": 2,
                "Region": 1,
                "TrafficType": 2,
                "VisitorType": "Returning_Visitor",
                "Weekend": False
            }
        },
        {
            "id": "window_shopper",
            "title": "Casual Window Shopper",
            "badge": "Low Probability",
            "description": "Brief glance at a couple of product pages with zero page value and high bounce rate.",
            "data": {
                "Administrative": 0,
                "Administrative_Duration": 0.0,
                "Informational": 0,
                "Informational_Duration": 0.0,
                "ProductRelated": 4,
                "ProductRelated_Duration": 78.0,
                "BounceRates": 0.045,
                "ExitRates": 0.082,
                "PageValues": 0.0,
                "SpecialDay": 0.0,
                "Month": "May",
                "OperatingSystems": 3,
                "Browser": 2,
                "Region": 2,
                "TrafficType": 3,
                "VisitorType": "Returning_Visitor",
                "Weekend": False
            }
        },
        {
            "id": "researcher",
            "title": "Deep Researcher",
            "badge": "Moderate Probability",
            "description": "Visitor checking store policies, info pages, and multiple items with modest page value.",
            "data": {
                "Administrative": 2,
                "Administrative_Duration": 95.0,
                "Informational": 4,
                "Informational_Duration": 160.0,
                "ProductRelated": 28,
                "ProductRelated_Duration": 980.0,
                "BounceRates": 0.012,
                "ExitRates": 0.032,
                "PageValues": 7.8,
                "SpecialDay": 0.2,
                "Month": "Oct",
                "OperatingSystems": 1,
                "Browser": 1,
                "Region": 3,
                "TrafficType": 4,
                "VisitorType": "Returning_Visitor",
                "Weekend": True
            }
        },
        {
            "id": "holiday_hunter",
            "title": "Holiday Bargain Hunter",
            "badge": "Strong Probability",
            "description": "New visitor shopping during high holiday discount period close to a special festival day.",
            "data": {
                "Administrative": 4,
                "Administrative_Duration": 150.0,
                "Informational": 0,
                "Informational_Duration": 0.0,
                "ProductRelated": 52,
                "ProductRelated_Duration": 2100.0,
                "BounceRates": 0.008,
                "ExitRates": 0.021,
                "PageValues": 18.2,
                "SpecialDay": 0.8,
                "Month": "Nov",
                "OperatingSystems": 2,
                "Browser": 4,
                "Region": 1,
                "TrafficType": 2,
                "VisitorType": "New_Visitor",
                "Weekend": True
            }
        }
    ]

@router.post("/predict", response_model=PredictionResponse)
def predict_intention(features: ShopperFeatures) -> PredictionResponse:
    try:
        return predictor_service.predict(features)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {str(e)}")
