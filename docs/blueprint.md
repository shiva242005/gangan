# **App Name**: MediBook

## Core Features:

- User Authentication: Implement secure user authentication (Sign Up, Login, Logout, Password Reset) using Firebase.
- Smart Triage Chatbot: AI-powered chatbot that analyzes user-described symptoms (text and optional image), considers 'Ayurveda Mode,' and provides a structured summary.
- Triage Recommendation: Based on chatbot analysis, display a Triage Recommendation card with Severity Level (Low, Medium, High) and Suggested Action (Self-care, Doctor Visit, Emergency) using distinct icons and colors. Tool.
- Available Doctors: Dynamically suggest relevant specialists based on the AI analysis and suggested action, with 'Book Now' buttons.
- Report Reader: Allow users to upload medical reports (PDF and images) for AI analysis, extracting and displaying key findings.
- Your Data: Display a sortable and filterable table of the user's past activities with export options (CSV, PDF).
- Appointment Booking: Allow users to book appointments.

## Style Guidelines:

- Dark theme background: Very dark, desaturated blue-gray (#121E29) for a professional and calm feel.
- Primary color: A calming light blue (#64B5F6) that conveys trust and health.
- Accent color: A vibrant yellow (#FFEA00) that complements the blue and signifies urgency or highlights in UI elements, creating a balanced interface.
- Body and headline font: 'PT Sans' (sans-serif) for a modern and readable experience. Note: currently only Google Fonts are supported.
- Sticky header and consistent footer to provide easy navigation.
- Use consistent and clear icons to represent severity levels (Low, Medium, High) and suggested actions.
- Subtle transitions and animations for a smooth user experience when loading content or navigating pages.