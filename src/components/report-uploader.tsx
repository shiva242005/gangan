
"use client";

import { useState, useRef, useEffect } from "react";
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
  const [fileDataUri, setFileDataUri] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
        toast({ title: "Analysis Failed", description: state.error, variant: "destructive" });
    }
    if (state?.data) {
        // Clear form on success
        setFile(null);
        setFileDataUri("");
        if(formRef.current) formRef.current.reset();
        if(fileInputRef.current) fileInputRef.current.value = "";
    }
  }, [state, toast]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 4 * 1024 * 1024) { // 4MB limit
        toast({ title: "File is too large", description: "Please upload a file smaller than 4MB.", variant: "destructive" });
        return;
      }
      setFile(selectedFile);

      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
          setFileDataUri(reader.result as string);
      };
      reader.onerror = () => {
          toast({ title: "File Read Error", description: "Could not read the selected file.", variant: "destructive" });
      };
    }
  };
  
  const handleFormAction = (formData: FormData) => {
    if (!file) {
      toast({ title: "No file selected", description: "Please select a file to upload.", variant: "destructive" });
      return;
    }
    formAction(formData);
  }

  return (
    <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upload Report</CardTitle>
          <CardDescription>Select a PDF or image file of your medical report.</CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={handleFormAction} className="space-y-4">
            <input type="hidden" name="reportDataUri" value={fileDataUri} />
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
