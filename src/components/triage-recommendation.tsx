import { ShieldCheck, AlertTriangle, ShieldAlert, HeartPulse, Stethoscope, Siren } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { TriageResult } from "@/lib/types";

interface TriageRecommendationProps {
  result: TriageResult;
}

const severityConfig = {
  Low: {
    icon: ShieldCheck,
    color: "bg-green-500",
    text: "text-green-300",
    label: "Low Severity",
  },
  Medium: {
    icon: AlertTriangle,
    color: "bg-yellow-500",
    text: "text-yellow-300",
    label: "Medium Severity",
  },
  High: {
    icon: ShieldAlert,
    color: "bg-red-500",
    text: "text-red-300",
    label: "High Severity",
  },
};

const actionConfig = {
  "Self-care": {
    icon: HeartPulse,
    label: "Self-Care Recommended",
  },
  "Doctor Visit": {
    icon: Stethoscope,
    label: "Doctor Visit Recommended",
  },
  Emergency: {
    icon: Siren,
    label: "Emergency Care Recommended",
  },
};

export function TriageRecommendation({ result }: TriageRecommendationProps) {
  const severity = severityConfig[result.severityLevel] || severityConfig.Low;
  const action = actionConfig[result.suggestedAction] || actionConfig["Self-care"];
  const SeverityIcon = severity.icon;
  const ActionIcon = action.icon;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Triage Recommendation</CardTitle>
        <CardDescription>Based on the information you provided.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-full", severity.color)}>
                    <SeverityIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <p className="font-semibold">{severity.label}</p>
                    <p className="text-sm text-muted-foreground">AI-assessed severity level</p>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary">
                    <ActionIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <p className="font-semibold">{action.label}</p>
                    <p className="text-sm text-muted-foreground">Suggested next step</p>
                </div>
            </div>
        </div>
        
        <div>
            <h4 className="font-semibold mb-2">Detailed Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {result.detailedSummary}
            </p>
        </div>

        <div>
            <h4 className="font-semibold mb-2">Initial Symptoms Summary</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {result.summary}
            </p>
        </div>
      </CardContent>
    </Card>
  );
}
