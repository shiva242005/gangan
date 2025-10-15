# MediBook: AI-Powered Medical Triage Assistant

MediBook is an AI-powered health assistant designed to provide users with initial medical guidance. It features a smart triage system where users can describe their symptoms and optionally upload an image. The application's AI analyzes this information to offer a preliminary assessment, including severity level and a suggested course of action (self-care, doctor visit, or emergency).

Additionally, MediBook includes an AI-powered report reader that can extract and summarize key findings from uploaded medical documents (like PDFs or images). For non-emergency cases, the app suggests relevant doctors and allows users to book appointments. User authentication is integrated to provide a personalized experience, including a dashboard to view past activity.

## Key Features

- **AI Symptom Triage:** Get instant analysis of symptoms with severity and action recommendations.
- **Ayurveda Mode:** Option to receive recommendations from an Ayurvedic perspective.
- **Image Analysis:** Upload photos of symptoms for a more accurate assessment.
- **AI Report Reader:** Upload medical reports (PDF/Image) to get a summary of key findings.
- **Doctor Suggestions:** Receive recommendations for relevant specialists based on your triage results.
- **Appointment Booking:** Schedule appointments with suggested doctors.
- **User Authentication:** Secure login and registration to manage your health journey.
- **Activity Dashboard:** View a history of your interactions with the app.

## Technology Stack

- **Framework:** Next.js (with App Router)
- **Language:** TypeScript
- **UI Components:** React with ShadCN UI
- **Styling:** Tailwind CSS
- **Generative AI:** Google's Gemini models via Genkit
- **Backend Services:** Firebase (Authentication and Firestore for data storage)
- **Deployment:** Firebase App Hosting
