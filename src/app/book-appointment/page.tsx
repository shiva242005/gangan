
import { Suspense } from "react";
import BookAppointment from "./BookAppointment";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookAppointment />
    </Suspense>
  );
}
