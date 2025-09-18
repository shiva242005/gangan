'use server';

/**
 * @fileOverview This file defines a Genkit flow for extracting key findings from medical reports (PDFs and images).
 *
 * - extractKeyFindingsFromReport - A function that accepts a data URI of a medical report (PDF or image) and returns the extracted key findings as text.
 * - ExtractKeyFindingsFromReportInput - The input type for the extractKeyFindingsFromReport function.
 * - ExtractKeyFindingsFromReportOutput - The return type for the extractKeyFindingsFromReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyFindingsFromReportInputSchema = z.object({
  reportDataUri: z
    .string()
    .describe(
      "A data URI of a medical report, which can be a PDF or an image, that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ExtractKeyFindingsFromReportInput = z.infer<
  typeof ExtractKeyFindingsFromReportInputSchema
>;

const ExtractKeyFindingsFromReportOutputSchema = z.object({
  keyFindings: z
    .string()
    .describe('The extracted key findings from the medical report.'),
});
export type ExtractKeyFindingsFromReportOutput = z.infer<
  typeof ExtractKeyFindingsFromReportOutputSchema
>;

export async function extractKeyFindingsFromReport(
  input: ExtractKeyFindingsFromReportInput
): Promise<ExtractKeyFindingsFromReportOutput> {
  return extractKeyFindingsFromReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeyFindingsFromReportPrompt',
  input: {schema: ExtractKeyFindingsFromReportInputSchema},
  output: {schema: ExtractKeyFindingsFromReportOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing medical reports and extracting key findings.
  Please analyze the provided medical report and extract the key findings in a concise and informative manner.

  Medical Report: {{media url=reportDataUri}}
  `,
});

const extractKeyFindingsFromReportFlow = ai.defineFlow(
  {
    name: 'extractKeyFindingsFromReportFlow',
    inputSchema: ExtractKeyFindingsFromReportInputSchema,
    outputSchema: ExtractKeyFindingsFromReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
