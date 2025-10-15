"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { doctors } from "@/lib/placeholder-data";
import { useAuth } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Loader2 } from "lucide-react";


const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email(),
  phone: z.string().optional(),
  doctorId: z.string({ required_error: "Please select a doctor." }),
  date: z.date({ required_error: "Please select a date." }),
  time: z.string({ required_error: "Please select a time." }),
  message: z.string().optional(),
});

const availableTimes = ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

export function BookingForm() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const doctorIdFromQuery = searchParams.get("doctorId");

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      doctorId: doctorIdFromQuery || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        doctorId: doctorIdFromQuery || form.getValues("doctorId"),
      });
    }
  }, [user, form, doctorIdFromQuery]);

  useEffect(() => {
    if (doctorIdFromQuery) {
        form.setValue('doctorId', doctorIdFromQuery);
    }
  }, [doctorIdFromQuery, form]);

  function onSubmit(values: z.infer<typeof bookingSchema>) {
    setIsLoading(true);
    // In a real app, you would submit this to a backend.
    // For now, we'll simulate a delay and redirect.
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Booking Request Sent",
        description: "Your appointment request has been submitted successfully.",
      });
      
      const selectedDoctor = doctors.find(d => d.id === values.doctorId);
      const bookingDetails = {
          ...values,
          doctorName: selectedDoctor?.name,
          date: format(values.date, "PPP"),
      };
      
      const params = new URLSearchParams(bookingDetails as any);
      router.push(`/appointment-booked?${params.toString()}`);
    }, 1500);
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl><Input placeholder="name@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField control={form.control} name="doctorId" render={({ field }) => (
              <FormItem>
                <FormLabel>Doctor</FormLabel>
                <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select a doctor" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {doctors.map(doc => <SelectItem key={doc.id} value={doc.id}>{doc.name} - {doc.specialty}</SelectItem>)}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}/>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField control={form.control} name="date" render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) } initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}/>

              <FormField control={form.control} name="time" render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="Select a time slot" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}/>
            </div>

             <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                    <FormLabel>Message (Optional)</FormLabel>
                    <FormControl><Textarea placeholder="Reason for your visit..." {...field} /></FormControl>
                    <FormMessage />
                </FormItem>
            )}/>
            
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Booking Request
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
