🎯 GoalGuru — Smart Academic & Career Companion

An interactive platform empowering Class 10th and 12th students (and their parents) to make informed decisions about streams, careers, scholarships, and colleges — all in one place.

<img width="1337" height="625" alt="image" src="https://github.com/user-attachments/assets/97a681a0-fb05-4f27-8d6c-790a1a2ced73" />



🧠 Overview

GoalGuru simplifies the student journey through:

🎓 AI-Powered Stream Recommendation – Psychometric quiz to suggest ideal streams based on interests, aptitude, and personality.

💰 Local Scholarship Finder(All States) – Discover state-wise government and private scholarships using Node.js & Express backend.

🏫 College Finder – Filter colleges by stream, location, rating, and fee range using a fast, searchable JSON database.

▶️ YouTube Resource Integration – Search for study resources via YouTube Data API v3 (secured through backend proxy).

🧭 Career & Subject Mapping – Explore subject relevance, career pathways, and personalized recommendations.

<img width="1350" height="623" alt="image" src="https://github.com/user-attachments/assets/893137e4-a47f-478a-8500-6c3984df6172" />

<img width="1357" height="628" alt="image" src="https://github.com/user-attachments/assets/7df1e4e1-10d5-4bf0-8bec-5df04136fcae" />

<img width="1349" height="631" alt="image" src="https://github.com/user-attachments/assets/01d732da-c464-4110-9348-88bf23bd2591" />

<img width="1349" height="631" alt="image" src="https://github.com/user-attachments/assets/d956ba3a-81f9-4a8c-8bed-bac262cfa2ac" />

⚙️ Tech Stack
Layer	Technologies
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express.js
Data Storage	JSON (colleges, scholarships)
APIs	YouTube Data API v3 (proxied via backend)
Environment	dotenv for secret key management
Version Control	Git, GitHub
🚀 Features

✅ Stream Selection Quiz – Engaging quiz with typewriter effect and real-time scoring.
✅ Scholarship Finder – State filter, keyword search, and dynamic scholarship cards.
✅ College Finder – Stream & budget filters, instant search, responsive design.
✅ YouTube Search Modal – Watch learning videos directly from the Resource Hub.
✅ Authentication UI (WIP) – Signup/Login modals with session-based user state.
✅ Notification System – Smart pop-ups for success, error, and info messages.
✅ Analytics Tracking – Client-side event logging.
✅ Responsive Design – Optimized across mobile, tablet, and desktop.

🧩 Project Structure
GOALGURU/
├── backend/
│   ├── data.json               # Scholarship data
│   ├── data-colleges.json      # College data
│   ├── app.js                  # Express app with API routes
│   ├── server.js               # Server bootstrap
│   ├── .env                    # Environment variables (not committed)
│   └── package.json            # Backend dependencies & scripts
│
├── css/
│   └── style.css               # Global and component styles
│
├── js/
│   ├── resource-hub.js         # Scholarship, college, YouTube logic
│   ├── script.js               # Main UI logic, quiz, notifications
│   └── other scripts…          # Dashboard & quiz logic
│
├── index.html                  # Landing page with typewriter effect
├── resource-hub.html           # Resource Hub: quizzes, finders, videos
├── college-finder.html         # Dedicated College Finder page
├── 10th-dashboard.html         # Dashboard (Class 10)
├── 12th-dashboard.html         # Dashboard (Class 12)
├── parent-dashboard.html       # Dashboard (Parent)
├── role-selection.html         # Role selection screen
└── README.md                   # Project documentation

📅 Project Timeline

Phase: Building (October 2025)
Status: Core features implemented

✅ Completed

Backend APIs (Scholarship, College, YouTube Proxy)

Frontend UI, Quiz Engine, Search Components

🧩 In Progress

Personalized Dashboards (10th, 12th, Parent)

Authentication & JWT Authorization

Database Migration (MongoDB/Postgres)

AI Chatbot Integration

💡 Future Enhancements

🧮 College Comparison Tool

📊 Cutoff Predictor

🔔 Admission Alerts

🧭 Counselling Info Portal

🤖 AI Career Chatbot

🗄️ Database Backend (MongoDB/PostgreSQL)

and many more..

👨‍💻 Developer

Yug Yadav

🔗 LinkedIn-https://www.linkedin.com/in/yug-yadav-b27366248/
