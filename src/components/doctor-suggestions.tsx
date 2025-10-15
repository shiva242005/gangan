import Image from "next/image";
import Link from "next/link";
import { Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { doctors as allDoctors } from "@/lib/placeholder-data";
import type { TriageResult } from "@/lib/types";

interface DoctorSuggestionsProps {
  result: TriageResult;
}

// Simple logic to suggest doctors. In a real app, this would be more complex.
const getSuggestedDoctors = (result: TriageResult) => {
    if (result.suggestedAction === "Self-care") {
        return allDoctors.filter(d => d.specialty === "General Physician");
    }
    if (result.summary.toLowerCase().includes("skin") || result.summary.toLowerCase().includes("rash")) {
        return allDoctors.filter(d => d.specialty === "Dermatologist" || d.specialty === "General Physician");
    }
    if (result.summary.toLowerCase().includes("heart") || result.summary.toLowerCase().includes("chest pain")) {
        return allDoctors.filter(d => d.specialty === "Cardiologist");
    }
    return allDoctors.slice(0, 3);
};


export function DoctorSuggestions({ result }: DoctorSuggestionsProps) {
  const suggestedDoctors = getSuggestedDoctors(result);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline text-xl">Available Doctors</CardTitle>
        <CardDescription>Here are some specialists we recommend based on your symptoms.</CardDescription>
      </CardHeader>
      <CardContent>
        {result.suggestedAction === "Emergency" ? (
             <div className="text-center py-8">
                 <p className="font-bold text-destructive">Please seek emergency care immediately.</p>
                 <p className="text-muted-foreground">Doctor suggestions are not available for emergency situations.</p>
             </div>
        ) : (
            <ul className="space-y-4">
            {suggestedDoctors.map((doctor) => (
                <li key={doctor.id} className="flex items-center gap-4 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <Image
                    src={doctor.avatar}
                    alt={`Avatar of ${doctor.name}`}
                    width={56}
                    height={56}
                    className="rounded-full"
                    data-ai-hint={doctor.imageHint}
                />
                <div className="flex-1">
                    <p className="font-semibold">{doctor.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Stethoscope className="w-4 h-4" />
                        {doctor.specialty}
                    </p>
                </div>
                <Button asChild>
                    <Link href={`/book-appointment?doctorId=${doctor.id}`}>Book Now</Link>
                </Button>
                </li>
            ))}
            </ul>
        )}
      </CardContent>
    </Card>
  );
}
