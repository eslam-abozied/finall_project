from typing import List, Literal, Optional, Dict, Any
from pydantic import BaseModel, Field

MonthLiteral = Literal[
    "Feb", "Mar", "May", "Oct", "June", "Jul", "Aug", "Nov", "Sep", "Dec"
]

VisitorTypeLiteral = Literal[
    "Returning_Visitor", "New_Visitor", "Other"
]

class ShopperFeatures(BaseModel):
    Administrative: int = Field(
        default=2,
        ge=0,
        description="Number of administrative pages visited by the user in this session"
    )
    Administrative_Duration: float = Field(
        default=80.0,
        ge=0.0,
        description="Total duration (in seconds) spent on administrative pages"
    )
    Informational: int = Field(
        default=0,
        ge=0,
        description="Number of informational pages visited (e.g., about us, terms)"
    )
    Informational_Duration: float = Field(
        default=0.0,
        ge=0.0,
        description="Total duration (in seconds) spent on informational pages"
    )
    ProductRelated: int = Field(
        default=25,
        ge=0,
        description="Number of product-related catalog pages visited"
    )
    ProductRelated_Duration: float = Field(
        default=850.0,
        ge=0.0,
        description="Total duration (in seconds) spent on product-related pages"
    )
    BounceRates: float = Field(
        default=0.01,
        ge=0.0,
        le=1.0,
        description="Percentage of visitors who enter the site from that page and leave without triggering any other requests"
    )
    ExitRates: float = Field(
        default=0.03,
        ge=0.0,
        le=1.0,
        description="Percentage of visitors who left the site after viewing this page"
    )
    PageValues: float = Field(
        default=8.5,
        ge=0.0,
        description="Average value of the page visited by the user before completing an e-commerce transaction"
    )
    SpecialDay: float = Field(
        default=0.0,
        ge=0.0,
        le=1.0,
        description="Closeness of browsing date to a special holiday or promotion day (e.g. Valentine's Day, Mother's Day)"
    )
    Month: MonthLiteral = Field(
        default="Nov",
        description="Month of the session"
    )
    OperatingSystems: int = Field(
        default=2,
        ge=1,
        le=8,
        description="Operating system code used by the visitor (1-8)"
    )
    Browser: int = Field(
        default=2,
        ge=1,
        le=13,
        description="Browser code used by the visitor (1-13)"
    )
    Region: int = Field(
        default=1,
        ge=1,
        le=9,
        description="Geographic region code of the visitor (1-9)"
    )
    TrafficType: int = Field(
        default=2,
        ge=1,
        le=20,
        description="Traffic source referral code (1-20, e.g. direct, organic, ad campaigns)"
    )
    VisitorType: VisitorTypeLiteral = Field(
        default="Returning_Visitor",
        description="Visitor type (Returning_Visitor, New_Visitor, Other)"
    )
    Weekend: bool = Field(
        default=False,
        description="Whether the visit occurred on a weekend"
    )

class FactorContribution(BaseModel):
    feature: str
    impact: str
    description: str

class PredictionResponse(BaseModel):
    prediction: int = Field(description="Binary classification result: 1 for Purchase, 0 for No Purchase")
    prediction_label: str = Field(description="Human-readable outcome: 'Purchase' or 'No Purchase'")
    purchase_probability: float = Field(description="Model confidence score for Purchase (0.0 to 1.0)")
    no_purchase_probability: float = Field(description="Model confidence score for No Purchase (0.0 to 1.0)")
    confidence_level: str = Field(description="Confidence rating: 'Very High', 'High', 'Moderate', 'Borderline'")
    summary: str = Field(description="Executive summary of the customer's intent")
    key_insights: List[str] = Field(description="Analytical takeaways from session attributes")
    influencing_factors: List[FactorContribution] = Field(description="Breakdown of key session variables")
    model_name: str = Field(default="Random Forest Classifier (Trained on 12,330 Sessions)")
