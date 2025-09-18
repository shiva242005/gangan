'use server';

/**
 * @fileOverview Generates a triage recommendation based on symptom summary, image analysis, and Ayurveda mode.
 *
 * - generateTriageRecommendation - A function that generates the triage recommendation.
 * - GenerateTriageRecommendationInput - The input type for the generateTriageRecommendation function.
 * - GenerateTriageRecommendationOutput - The return type for the generateTriageRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTriageRecommendationInputSchema = z.object({
  symptomSummary: z
    .string()
    .describe('A summary of the patient\'s symptoms.'),
  imageAnalysis: z
    .string()
    .optional()
    .describe('Analysis of the uploaded image, if any.'),
  ayurvedaMode: z
    .boolean()
    .describe(
      'Whether Ayurveda mode is enabled. If true, recommendations should follow Ayurvedic principles.'
    ),
});
export type GenerateTriageRecommendationInput = z.infer<
  typeof GenerateTriageRecommendationInputSchema
>;

const GenerateTriageRecommendationOutputSchema = z.object({
  severityLevel: z.enum(['Low', 'Medium', 'High']).describe('The severity level of the condition.'),
  suggestedAction: z
    .enum(['Self-care', 'Doctor Visit', 'Emergency'])
    .describe('The suggested action based on the triage.'),
  detailedSummary: z.string().describe('A detailed summary of the triage recommendation.'),
});
export type GenerateTriageRecommendationOutput = z.infer<
  typeof GenerateTriageRecommendationOutputSchema
>;

export async function generateTriageRecommendation(
  input: GenerateTriageRecommendationInput
): Promise<GenerateTriageRecommendationOutput> {
  return generateTriageRecommendationFlow(input);
}

const triageRecommendationPrompt = ai.definePrompt({
  name: 'triageRecommendationPrompt',
  input: {schema: GenerateTriageRecommendationInputSchema},
  output: {schema: GenerateTriageRecommendationOutputSchema},
  prompt: `You are an AI assistant that provides triage recommendations based on the patient's symptoms, image analysis (if available), and whether Ayurveda mode is enabled.

  Symptom Summary: {{{symptomSummary}}}
  Image Analysis: {{{imageAnalysis}}}
  Ayurveda Mode: {{{ayurvedaMode}}}

  Based on the information above, determine the severity level (Low, Medium, High) and the suggested action (Self-care, Doctor Visit, Emergency).
  Provide a detailed summary of the triage recommendation.  If ayurvedaMode is enabled, provide an ayurvedic perspective in the recommendation.

  Ensure that your response adheres to the schema.
  Remember that you MUST select one of the values in the enum for severityLevel and suggestedAction.
  Do not include any additional explanation other than the fields requested by the schema.
  Set the ayurvedaMode appropriately based on the user provided input, but never mention it directly in the recommendation.`,
});

const generateTriageRecommendationFlow = ai.defineFlow(
  {
    name: 'generateTriageRecommendationFlow',
    inputSchema: GenerateTriageRecommendationInputSchema,
    outputSchema: GenerateTriageRecommendationOutputSchema,
  },
  async input => {
    const {output} = await triageRecommendationPrompt(input);
    return output!;
  }
);
