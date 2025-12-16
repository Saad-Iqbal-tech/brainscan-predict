This web application allows users to:

Sign up and log in using email & password

Upload a brain MRI image

Run inference using a deployed FastAPI + TensorFlow backend

View prediction results (Tumor / No Tumor with confidence)

Access a dashboard with future features marked as “Soon to be implemented”

How to Edit This Project

There are multiple ways to edit and maintain this application.

Option 1: Edit Using the Online Editor

Open the project in the browser-based editor

Modify components, pages, and styles

All changes are automatically saved to the repository

Option 2: Work Locally Using Your IDE
Prerequisites

Node.js (v18+ recommended)

npm

Option 3: Edit Directly on GitHub

Open any file in the repository

Click the ✏️ Edit button

Commit changes directly to the main branch

Option 4: Use GitHub Codespaces

Go to the repository

Click Code → Codespaces → New Codespace

Edit, commit, and push changes from the browser-based VS Code environment

Tech Stack
Frontend

React

TypeScript

Vite

Tailwind CSS

shadcn/ui

Firebase Authentication (Email & Password)

Backend

FastAPI

TensorFlow / Keras

OpenCV

Deployed on Railway

Authentication Flow

Users sign up and log in using Firebase Email & Password Authentication

Firebase handles:

User creation

Login

Session management

The frontend retrieves the Firebase ID token after login

The token is sent in the Authorization header when calling backend APIs

Example:

Authorization: Bearer <FIREBASE_ID_TOKEN>

Prediction Flow

User logs in

User navigates to Dashboard

User uploads an MRI image

Frontend sends image to:

POST /predict


Backend:

Preprocesses the image

Runs inference using the trained model

Returns:

Predicted class

Confidence score

Dashboard

The dashboard contains:

Predict Card

Upload image

View result

History Card

Displays: “Soon to be implemented”

No database storage is currently used for history

Deployment

The frontend can be deployed on any static hosting platform (e.g. Vercel, Netlify)

The backend is already live on Railway

No environment variables are required on the frontend other than Firebase config

Notes

No user profile data is stored in the backend

No reports are persisted

The system is intentionally minimal for stability


