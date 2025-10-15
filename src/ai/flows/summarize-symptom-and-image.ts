// src/ai/flows/summarize-symptom-and-image.ts
'use server';

/**
 * @fileOverview This file defines the Genkit flow for the Ayurveda Mode in the chatbot.
 *
 * - summarizeSymptomAndImage - The main function to summarize symptoms and image with Ayurveda perspective.
 * - SummarizeSymptomAndImageInput - The input type for the summarizeSymptomAndImage function.
 * - SummarizeSymptomAndImageOutput - The output type for the summarizeSymptomAndImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSymptomAndImageInputSchema = z.object({
  symptomsDescription: z
    .string()
    .describe('The description of the symptoms provided by the user.'),
  symptomsImage: z
    .string()
    .optional()
    .describe(
      "An optional photo of the symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  ayurvedaMode: z
    .boolean()
    .describe(
      'A boolean indicating whether Ayurveda mode is enabled. If true, the AI should provide recommendations based on Ayurvedic principles.'
    ),
});
export type SummarizeSymptomAndImageInput = z.infer<typeof SummarizeSymptomAndImageInputSchema>;

const SummarizeSymptomAndImageOutputSchema = z.object({
  summary: z
    .string()
    .describe(
      'A summary of the symptoms and image analysis, incorporating Ayurvedic principles if ayurvedaMode is enabled.'
    ),
});
export type SummarizeSymptomAndImageOutput = z.infer<typeof SummarizeSymptomAndImageOutputSchema>;

export async function summarizeSymptomAndImage(
  input: SummarizeSymptomAndImageInput
): Promise<SummarizeSymptomAndImageOutput> {
  return summarizeSymptomAndImageFlow(input);
}

const summarizeSymptomAndImagePrompt = ai.definePrompt({
  name: 'summarizeSymptomAndImagePrompt',
  input: {schema: SummarizeSymptomAndImageInputSchema},
  output: {schema: SummarizeSymptomAndImageOutputSchema},
  prompt: `You are a medical assistant specializing in providing summaries of patient symptoms.

  The user has provided a description of their symptoms:
  {{symptomsDescription}}

  {{~#if symptomsImage}}
  The user has also provided an image of their symptoms: {{media url=symptomsImage}}.
  {{~/if}}

  {{~#if ayurvedaMode}}
  Ayurveda mode is enabled.  In your summary, incorporate Ayurvedic principles and perspectives.
  {{~/if}}

  Provide a concise summary of the user's symptoms and any relevant information from the image, if provided.
  The summary should be no more than 200 words.
  `,
});

const summarizeSymptomAndImageFlow = ai.defineFlow(
  {
    name: 'summarizeSymptomAndImageFlow',
    inputSchema: SummarizeSymptomAndImageInputSchema,
    outputSchema: SummarizeSymptomAndImageOutputSchema,
  },
  async input => {
    const {output} = await summarizeSymptomAndImagePrompt(input);
    return output!;
  }
);
