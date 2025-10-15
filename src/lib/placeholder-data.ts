import type { Doctor, Activity } from './types';
import { PlaceHolderImages } from './placeholder-images';

const doctorImageMap = new Map(PlaceHolderImages.map(img => [img.id, img]));

const getDoctorImage = (id: string) => {
    return doctorImageMap.get(id) || { imageUrl: '', imageHint: '' };
};

export const doctors: Doctor[] = [
    {
      id: '1',
      name: 'Dr. Evelyn Reed',
      specialty: 'Dermatologist',
      avatar: getDoctorImage('doc1').imageUrl,
      imageHint: getDoctorImage('doc1').imageHint,
    },
    {
      id: '2',
      name: 'Dr. Marcus Chen',
      specialty: 'Cardiologist',
      avatar: getDoctorImage('doc2').imageUrl,
      imageHint: getDoctorImage('doc2').imageHint,
    },
    {
      id: '3',
      name: 'Dr. Sofia Rodriguez',
      specialty: 'General Physician',
      avatar: getDoctorImage('doc3').imageUrl,
      imageHint: getDoctorImage('doc3').imageHint,
    },
    {
      id: '4',
      name: 'Dr. Kenji Tanaka',
      specialty: 'Pediatrician',
      avatar: getDoctorImage('doc4').imageUrl,
      imageHint: getDoctorImage('doc4').imageHint,
    },
];

export const activityLog: Activity[] = [
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
