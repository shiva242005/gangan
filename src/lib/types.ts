import type { GenerateTriageRecommendationOutput } from "@/ai/flows/generate-triage-recommendation";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  imageHint: string;
}

export type TriageResult = GenerateTriageRecommendationOutput & {
  summary: string;
};

export interface Activity {
  date: string;
  type: string;
  description: string;
  details: string;
}
