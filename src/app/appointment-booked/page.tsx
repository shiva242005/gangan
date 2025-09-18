"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

function AppointmentDetails() {
  const searchParams = useSearchParams();

  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const doctorName = searchParams.get('doctorName');
  const date = searchParams.get('date');
  const time = searchParams.get('time');

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-theme(spacing.14)*2)] p-4">
        <Card className="w-full max-w-lg">
            <CardHeader className="items-center text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                <CardTitle className="text-2xl font-headline">Appointment Request Sent!</CardTitle>
                <CardDescription>Your request has been received. We will send a confirmation to your email shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 text-sm bg-secondary/50 p-4 rounded-lg">
                    <div className="flex justify-between"><span className="text-muted-foreground">Name:</span> <span className="font-semibold">{name}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Email:</span> <span className="font-semibold">{email}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Doctor:</span> <span className="font-semibold">{doctorName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Date:</span> <span className="font-semibold">{date}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Time:</span> <span className="font-semibold">{time}</span></div>
                </div>
                <Button asChild className="w-full mt-6">
                    <Link href="/">Back to Home</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
  );
}

export default function AppointmentBookedPage() {
    return (
        <Suspense fallback={<div>Loading confirmation...</div>}>
            <AppointmentDetails />
        </Suspense>
    )
}
