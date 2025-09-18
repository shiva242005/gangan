import { ActivityTable } from "@/components/activity-table";
import { activityLog } from "@/lib/placeholder-data";

export default function YourDataPage() {
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
