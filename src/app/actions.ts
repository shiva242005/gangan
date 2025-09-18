'use server';

import { z } from 'zod';
import { summarizeSymptomAndImage } from '@/ai/flows/ayurveda-triage';
import { generateTriageRecommendation } from '@/ai/flows/generate-triage-recommendation';
import { extractKeyFindingsFromReport } from '@/ai/flows/extract-report-findings';
import { analyzeImageForSymptoms } from '@/ai/flows/analyze-image';


const triageSchema = z.object({
  symptoms: z.string().min(10, { message: 'Please describe your symptoms in at least 10 characters.' }),
  image: z.string().optional(),
  ayurvedaMode: z.boolean(),
});

export async function performTriage(prevState: any, formData: FormData) {
  const validatedFields = triageSchema.safeParse({
    symptoms: formData.get('symptoms'),
    image: formData.get('image'),
    ayurvedaMode: formData.get('ayurvedaMode') === 'true',
  });
  
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { symptoms, image, ayurvedaMode } = validatedFields.data;

  try {
    const summaryResult = await summarizeSymptomAndImage({
      symptomsDescription: symptoms,
      symptomsImage: image,
      ayurvedaMode,
    });

    const imageAnalysisResult = image 
      ? await analyzeImageForSymptoms({ imageDataUri: image })
      : { summary: '' };

    const recommendationResult = await generateTriageRecommendation({
      symptomSummary: summaryResult.summary,
      imageAnalysis: imageAnalysisResult.summary,
      ayurvedaMode,
    });
    
    return {
      data: { ...recommendationResult, summary: summaryResult.summary }
    };

  } catch (error) {
    console.error('Triage failed:', error);
    return {
      error: { general: 'An AI processing error occurred. Please try again.' },
    };
  }
}


const reportSchema = z.object({
    reportDataUri: z.string().min(1, { message: "File is required." }),
});

export async function analyzeReport(prevState: any, formData: FormData) {
    const validatedFields = reportSchema.safeParse({
        reportDataUri: formData.get('reportDataUri'),
    });

    if (!validatedFields.success) {
        return {
            error: "Invalid file data.",
        };
    }

    try {
        const result = await extractKeyFindingsFromReport({
            reportDataUri: validatedFields.data.reportDataUri,
        });
        return { data: result.keyFindings };
    } catch (error) {
        console.error('Report analysis failed:', error);
        return {
            error: 'Failed to analyze the report. Please try another file.',
        };
    }
}
