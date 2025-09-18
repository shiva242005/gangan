"use client";

import { useState, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { analyzeReport } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileUp, Loader2, FileText } from "lucide-react";

const initialState = {
  error: undefined,
  data: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
        </>
      ) : (
        "Analyze Report"
      )}
    </Button>
  );
}


export function ReportUploader() {
  const [state, formAction] = useFormState(analyzeReport, initialState);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // 4MB limit for demo
      if (selectedFile.size > 4 * 1024 * 1024) {
        toast({ title: "File is too large", description: "Please upload a file smaller than 4MB.", variant: "destructive" });
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const dataUri = reader.result as string;
        formData.set('reportDataUri', dataUri);
        const result = await analyzeReport(initialState, formData);
        
        if (result.error) {
            toast({ title: "Analysis Failed", description: result.error, variant: "destructive" });
        }
    };
    reader.onerror = () => {
        toast({ title: "File Read Error", description: "Could not read the selected file.", variant: "destructive" });
    };
  };

  return (
    <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload Report</CardTitle>
          <CardDescription>Select a PDF or image file of your medical report.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleFormSubmit} className="space-y-4">
            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-secondary/50">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FileUp className="w-8 h-8 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 4MB)</p>
                    </div>
                    <input ref={fileInputRef} id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf, .png, .jpg, .jpeg" />
                </label>
            </div>
            {file && (
              <div className="text-sm text-center text-muted-foreground">
                Selected file: <span className="font-semibold text-foreground">{file.name}</span>
              </div>
            )}
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Key Findings</CardTitle>
          <CardDescription>AI-extracted summary will appear here.</CardDescription>
        </CardHeader>
        <CardContent>
          {state.data ? (
            <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <p>{state.data}</p>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-48 text-center">
                <FileText className="w-8 h-8 mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Your report analysis is pending.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
