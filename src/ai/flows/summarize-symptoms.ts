'use server';

/**
 * @fileOverview A symptom summarization AI agent.
 *
 * - summarizeSymptoms - A function that handles the symptom summarization process.
 * - SummarizeSymptomsInput - The input type for the summarizeSymptoms function.
 * - SummarizeSymptomsOutput - The return type for the summarizeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeSymptomsInputSchema = z.object({
  text: z.string().describe('The symptoms described by the user.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "A photo related to the symptoms, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  ayurvedaMode: z
    .boolean()
    .optional()
    .describe(
      'Whether or not to use Ayurveda mode, which will affect the recommendations made.'
    ),
});
export type SummarizeSymptomsInput = z.infer<typeof SummarizeSymptomsInputSchema>;

const SummarizeSymptomsOutputSchema = z.object({
  summary: z.string().describe('A summary of the symptoms.'),
});
export type SummarizeSymptomsOutput = z.infer<typeof SummarizeSymptomsOutputSchema>;

export async function summarizeSymptoms(input: SummarizeSymptomsInput): Promise<SummarizeSymptomsOutput> {
  return summarizeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeSymptomsPrompt',
  input: {schema: SummarizeSymptomsInputSchema},
  output: {schema: SummarizeSymptomsOutputSchema},
  prompt: `You are a medical assistant.  Summarize the following symptoms provided by the user.  Be as clear and concise as possible.

Symptoms: {{{text}}}

{{~#if photoDataUri}}
Photo: {{media url=photoDataUri}}
{{~/if}}

{{~#if ayurvedaMode}}
You are in Ayurveda mode.  In addition to the summary, incorporate Ayurveda principles into your assessment.
{{~/if}}`,
});

const summarizeSymptomsFlow = ai.defineFlow(
  {
    name: 'summarizeSymptomsFlow',
    inputSchema: SummarizeSymptomsInputSchema,
    outputSchema: SummarizeSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
