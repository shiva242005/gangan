import type { Doctor } from './types';

export const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Evelyn Reed',
      specialty: 'Dermatologist',
      avatar: 'https://picsum.photos/seed/doc1/100/100',
      imageHint: 'doctor portrait'
    },
    {
      id: '2',
      name: 'Dr. Marcus Chen',
      specialty: 'Cardiologist',
      avatar: 'https://picsum.photos/seed/doc2/100/100',
      imageHint: 'doctor portrait'
    },
    {
      id: '3',
      name: 'Dr. Sofia Rodriguez',
      specialty: 'General Physician',
      avatar: 'https://picsum.photos/seed/doc3/100/100',
      imageHint: 'doctor portrait'
    },
    {
      id: '4',
      name: 'Dr. Kenji Tanaka',
      specialty: 'Pediatrician',
      avatar: 'https://picsum.photos/seed/doc4/100/100',
      imageHint: 'doctor portrait'
    },
];

export const activityLog = [
  {
    date: "2024-07-21",
    type: "Symptom Check",
    description: "Checked symptoms for skin rash",
    details: "Severity: Low, Action: Self-care",
  },
  {
    date: "2024-07-20",
    type: "Report Upload",
    description: "Uploaded blood_report_final.pdf",
    details: "View Findings",
  },
  {
    date: "2024-07-18",
    type: "Appointment",
    description: "Booked appointment with Dr. Evelyn Reed",
    details: "Confirmed for July 25, 2024",
  },
  {
    date: "2024-07-15",
    type: "Symptom Check",
    description: "Checked symptoms for persistent headache",
    details: "Severity: Medium, Action: Doctor Visit",
  },
    {
    date: "2024-07-12",
    type: "Report Upload",
    description: "Uploaded chest_xray.png",
    details: "View Findings",
  },
];

export type Activity = typeof activityLog[0];
