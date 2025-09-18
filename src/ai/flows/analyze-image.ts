'use server';

/**
 * @fileOverview Image analysis flow for symptom assessment.
 *
 * - analyzeImageForSymptoms - Analyzes an image of symptoms to provide an assessment.
 * - AnalyzeImageForSymptomsInput - The input type for the analyzeImageForSymptoms function.
 * - AnalyzeImageForSymptomsOutput - The return type for the analyzeImageForSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeImageForSymptomsInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "A photo of symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeImageForSymptomsInput = z.infer<typeof AnalyzeImageForSymptomsInputSchema>;

const AnalyzeImageForSymptomsOutputSchema = z.object({
  summary: z.string().describe('A summary of the image analysis.'),
});
export type AnalyzeImageForSymptomsOutput = z.infer<typeof AnalyzeImageForSymptomsOutputSchema>;

export async function analyzeImageForSymptoms(input: AnalyzeImageForSymptomsInput): Promise<AnalyzeImageForSymptomsOutput> {
  return analyzeImageForSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeImageForSymptomsPrompt',
  input: {schema: AnalyzeImageForSymptomsInputSchema},
  output: {schema: AnalyzeImageForSymptomsOutputSchema},
  prompt: `You are a medical expert analyzing images to assess symptoms.

  Analyze the following image and provide a detailed summary of the visible symptoms.

  Image: {{media url=imageDataUri}}
  `,
});

const analyzeImageForSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeImageForSymptomsFlow',
    inputSchema: AnalyzeImageForSymptomsInputSchema,
    outputSchema: AnalyzeImageForSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
