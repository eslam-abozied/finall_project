export type Month =
  | "Feb"
  | "Mar"
  | "May"
  | "June"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";

export type VisitorType = "Returning_Visitor" | "New_Visitor" | "Other";

export interface ShopperFeatures {
  Administrative: number;
  Administrative_Duration: number;
  Informational: number;
  Informational_Duration: number;
  ProductRelated: number;
  ProductRelated_Duration: number;
  BounceRates: number;
  ExitRates: number;
  PageValues: number;
  SpecialDay: number;
  Month: Month;
  OperatingSystems: number;
  Browser: number;
  Region: number;
  TrafficType: number;
  VisitorType: VisitorType;
  Weekend: boolean;
}

export interface FactorContribution {
  feature: string;
  impact: string;
  description: string;
}

export interface PredictionResponse {
  prediction: number;
  prediction_label: string;
  purchase_probability: number;
  no_purchase_probability: number;
  confidence_level: "Very High" | "High" | "Moderate" | "Borderline" | string;
  summary: string;
  key_insights: string[];
  influencing_factors: FactorContribution[];
  model_name: string;
}

export interface ScenarioPreset {
  id: string;
  title: string;
  badge: string;
  description: string;
  data: ShopperFeatures;
}
