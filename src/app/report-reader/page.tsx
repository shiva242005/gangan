
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ReportUploader } from "@/components/report-uploader";
import { Skeleton } from "@/components/ui/skeleton";

export default function ReportReaderPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect_to=/report-reader');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
             <div className="space-y-8">
                <div className="text-center mb-12 max-w-3xl mx-auto space-y-4">
                    <Skeleton className="h-12 w-2/3 mx-auto" />
                    <Skeleton className="h-6 w-full mx-auto" />
                </div>
                <div className="max-w-4xl mx-auto grid gap-8 lg:grid-cols-2">
                    <Skeleton className="h-80 w-full" />
                    <Skeleton className="h-80 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          AI Report Reader
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Upload your medical reports (PDF, JPG, PNG) to get a summary of key findings, powered by AI.
        </p>
      </section>
      <ReportUploader />
    </div>
  );
}
