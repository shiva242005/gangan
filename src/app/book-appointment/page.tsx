import { BookingForm } from "@/components/booking-form";

export default function BookAppointmentPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12">
            <section className="text-center mb-12 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
                Book an Appointment
                </h1>
                <p className="text-lg text-muted-foreground">
                Fill out the form below to schedule your appointment. We&apos;ll confirm your booking via email.
                </p>
            </section>
            <BookingForm />
        </div>
    );
}
