"use client";

import { useSearchParams } from "next/navigation";

export default function BookAppointment() {
  const searchParams = useSearchParams();
  const doctor = searchParams.get("doctor");

  return (
    <div>
      <h2>Book Appointment</h2>
      <p>Selected Doctor: {doctor}</p>
    </div>
  );
}
