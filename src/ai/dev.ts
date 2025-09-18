import { config } from 'dotenv';
config();

import '@/ai/flows/extract-report-findings.ts';
import '@/ai/flows/ayurveda-triage.ts';
import '@/ai/flows/summarize-symptoms.ts';
import '@/ai/flows/generate-triage-recommendation.ts';
import '@/ai/flows/analyze-image.ts';