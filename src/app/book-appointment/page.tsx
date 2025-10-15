"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { BookingForm } from "@/components/booking-form";
import { doctors } from "@/lib/placeholder-data";

function BookAppointment() {
  const searchParams = useSearchParams();
  const doctorId = searchParams.get("doctorId");
  const doctor = doctors.find(d => d.id === doctorId);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2 font-headline">
          Book an Appointment
        </h1>
        <p className="text-lg text-muted-foreground">
          You are booking an appointment with <span className="font-semibold text-primary">{doctor ? doctor.name : 'a doctor'}</span>.
          Fill out the form below to schedule your appointment. We&apos;ll confirm your booking via email.
        </p>
      </section>
      <BookingForm />
    </div>
  );
}

export default function BookAppointmentPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BookAppointment />
        </Suspense>
    )
}