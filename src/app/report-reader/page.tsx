import { ReportUploader } from "@/components/report-uploader";

export default function ReportReaderPage() {
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
