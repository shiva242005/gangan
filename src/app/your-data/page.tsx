
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { ActivityTable } from "@/components/activity-table";
import { activityLog } from "@/lib/placeholder-data";
import { Skeleton } from "@/components/ui/skeleton";

export default function YourDataPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect_to=/your-data');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Your Activity
        </h1>
        <p className="text-lg text-muted-foreground">
          A log of your interactions with MediBook.
        </p>
      </section>
      <ActivityTable data={activityLog} />
    </div>
  );
}
