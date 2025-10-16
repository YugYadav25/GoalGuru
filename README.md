🎯 GoalGuru — Smart Academic & Career Companion
An interactive platform empowering Class 10th and 12th students (and their parents) to make informed decisions about streams, careers, scholarships, and colleges — all in one place.

🧠 Overview
GoalGuru simplifies the student journey through:

🎓 AI-Powered Stream Recommendation – Psychometric quiz to suggest ideal streams based on interests, aptitude, and personality.

💰 Local Scholarship Finder (All States) – Discover state-wise government and private scholarships using a Node.js & Express backend.

🏫 College Finder – Filter colleges by stream, location, rating, and fee range using a fast, searchable JSON database.

▶️ YouTube Resource Integration – Search for study resources via YouTube Data API v3, secured through backend proxy.

🧭 Career & Subject Mapping – Explore subject relevance, career pathways, and get personalized recommendations.

⚙️ Tech Stack
Layer	Technologies
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express.js
Data Storage	JSON (Colleges, Scholarships)
APIs	YouTube Data API v3 (proxied via backend)
Environment	dotenv for secret key management
Version Control	Git, GitHub
🚀 Key Features
✅ Stream Selection Quiz – Interactive quiz with typewriter effect and real-time scoring.

✅ Scholarship Finder – State filters, keyword search, and dynamic scholarship cards.

✅ College Finder – Stream and budget filters with instant search and responsive design.

✅ YouTube Search Modal – Watch study tutorials directly from the Resource Hub.

✅ Authentication UI (WIP) – Signup/Login modals with session-based user states.

✅ Notification System – Smart pop-ups for success, error, and information.

✅ Analytics Tracking – Client-side event logging for insights.

✅ Responsive Design – Optimized for mobile, tablet, and desktop.

🧩 Project Structure
text
```
GOALGURU/
│
├── backend/
│   ├── app.js                  # Express app with API routes
│   ├── server.js               # Server bootstrap
│   ├── data.json               # Scholarship data
│   ├── data-colleges.json      # College data
│   ├── .env                    # Environment variables (excluded from commits)
│   └── package.json            # Backend dependencies & scripts
│
├── css/
│   └── style.css               # Global and component styles
│
├── js/
│   ├── script.js               # Main UI logic, quiz, notifications
│   ├── resource-hub.js         # Scholarship, college, YouTube logic
│   └── other scripts…          # Dashboard & quiz logic
│
├── index.html                  # Landing page with typewriter effect
├── role-selection.html         # Role selection screen
├── resource-hub.html           # Resource Hub: quizzes, finders, videos
├── college-finder.html         # Dedicated College Finder page
├── 10th-dashboard.html         # Dashboard (Class 10)
├── 12th-dashboard.html         # Dashboard (Class 12)
├── parent-dashboard.html       # Dashboard (Parent)
└── README.md                   # Project documentation
```
📅 Project Timeline
Phase: Building (October 2025)
Status: Core features implemented

✅ Completed
Backend APIs (Scholarship, College, YouTube Proxy)

Frontend UI, Quiz Engine, Search Components

🧩 In Progress
Personalized Dashboards (10th, 12th, Parent)

Authentication & JWT Authorization

Database Migration (MongoDB/PostgreSQL)

AI Chatbot Integration

💡 Future Enhancements
🧮 College Comparison Tool

📊 Cutoff Predictor

🔔 Admission Alerts

🧭 Counselling Info Portal

🤖 AI Career Chatbot

🗄️ Database Backend (MongoDB/PostgreSQL)

…and many more 🚀

👨‍💻 Developer
Yug Yadav
🔗 LinkedIn
