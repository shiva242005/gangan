"use client";

import { useState } from "react";
import { TriageForm } from "@/components/triage-form";
import { TriageRecommendation } from "@/components/triage-recommendation";
import { DoctorSuggestions } from "@/components/doctor-suggestions";
import type { TriageResult } from "@/lib/types";
import { Separator } from "./ui/separator";

export default function TriageClient() {
  const [triageResult, setTriageResult] = useState<TriageResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTriageComplete = (result: TriageResult) => {
    setTriageResult(result);
    setIsLoading(false);
  };
  
  const handleTriageStart = () => {
    setIsLoading(true);
    setTriageResult(null);
  }

  return (
    <div className="space-y-12">
      <TriageForm 
        onTriageComplete={handleTriageComplete}
        onTriageStart={handleTriageStart}
        isLoading={isLoading}
      />
      
      {isLoading && (
        <div className="text-center">
            <p className="text-primary">Analyzing your symptoms with AI...</p>
        </div>
      )}

      {triageResult && (
        <>
            <Separator />
            <div className="grid gap-12 lg:grid-cols-5">
                <div className="lg:col-span-2">
                    <TriageRecommendation result={triageResult} />
                </div>
                <div className="lg:col-span-3">
                    <DoctorSuggestions result={triageResult} />
                </div>
            </div>
        </>
      )}
    </div>
  );
}
