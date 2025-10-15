
"use client";

import { useRef, useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Image from "next/image";
import { Paperclip, Send, X, BotMessageSquare, Loader2 } from "lucide-react";

import { performTriage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { TriageResult } from "@/lib/types";

interface TriageFormProps {
  onTriageComplete: (result: TriageResult | null) => void;
  onTriageStart: () => void;
}

const initialState = {
  error: undefined,
  data: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="icon" disabled={pending}>
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
      <span className="sr-only">Submit</span>
    </Button>
  );
}

export function TriageForm({ onTriageComplete, onTriageStart }: TriageFormProps) {
  const [state, formAction] = useFormState(performTriage, initialState);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!state) return;
    
    if (state.error) {
        toast({
            title: "Submission Error",
            description: Object.values(state.error).flat().join('\n') || "Please check your input and try again.",
            variant: "destructive",
        });
        onTriageComplete(null);
    } else if (state.data) {
        onTriageComplete(state.data as TriageResult);
        formRef.current?.reset();
        handleRemoveImage();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 4MB.",
          variant: "destructive",
        });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFormAction = (formData: FormData) => {
    onTriageStart();
    
    if (imageFile) {
        formData.append("image", imagePreview as string);
    }

    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleFormAction}>
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                      <BotMessageSquare className="h-8 w-8 text-primary"/>
                  </div>
                  <div>
                      <CardTitle className="text-2xl font-headline">Smart Triage</CardTitle>
                      <CardDescription>Describe your symptoms to get an AI recommendation.</CardDescription>
                  </div>
              </div>
              <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Switch id="ayurvedaMode" name="ayurvedaMode" />
                  <Label htmlFor="ayurvedaMode">Ayurveda Mode</Label>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid w-full gap-2">
              <Label htmlFor="symptoms" className="sr-only">Your Symptoms</Label>
              <Textarea
                id="symptoms"
                name="symptoms"
                placeholder="e.g., I have a skin rash on my arm. It's red, itchy, and has small bumps..."
                rows={5}
                required
                minLength={10}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Paperclip className="mr-2 h-4 w-4" />
                  Attach Image
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
              
              <SubmitButton />
            </div>
            
            {imagePreview && (
              <div className="relative w-32 h-32 mt-2">
                <Image
                  src={imagePreview}
                  alt="Symptom preview"
                  fill
                  className="rounded-md object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
}
