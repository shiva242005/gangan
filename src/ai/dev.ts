import { config } from 'dotenv';
config();

import '@/ai/flows/analyze-image.ts';
import '@/ai/flows/extract-report-findings.ts';
import '@/ai/flows/generate-triage-recommendation.ts';
import '@/ai/flows/summarize-symptom-and-image.ts';