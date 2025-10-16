GoalGuru
An interactive web platform empowering Class 10th and 12th students (and their parents) to make informed decisions about academic streams, career paths, scholarships, and colleges through AI-based assessments, real-time resources, and personalized recommendations.
<img width="1337" height="625" alt="image" src="https://github.com/user-attachments/assets/0e4e9576-090f-4b4b-ae8b-655d06221543" />


🧠 Overview
GoalGuru guides users through:

AI-Powered Stream Recommendation
Psychometric quizzes analyze interests, aptitude, and personality to suggest ideal streams (Science-Maths, Science-Biology, Commerce, Arts).
<img width="701" height="523" alt="image" src="https://github.com/user-attachments/assets/19750db7-ce67-4c99-8939-8b633c506557" />


Local Scholarship Finder
Instantly discover government and private scholarships available in your state via a Node.js & Express backend and a searchable JSON database.

Local College Finder
Filter colleges by stream, location, type, fees, and rating to pinpoint institutions matching your goals and budget.
<img width="1341" height="629" alt="image" src="https://github.com/user-attachments/assets/b5e29125-3b72-4f74-b725-186ea6b930f3" />


YouTube Resource Integration
Real-time video suggestions for study problems, powered by YouTube Data API v3 through a secure backend proxy.

Career & Subject Mapping
Explore detailed career modules, subject relevance, and pathways for every recommended stream.

⚙️ Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Data Storage: JSON files (scholarships, colleges)

APIs: YouTube Data API v3 (proxied via backend)

Version Control: Git, GitHub

Environment: dotenv for secret management

🚀 Features
AI-powered Quiz for stream selection

Interactive Quiz UI with typewriter effect and smooth scrolling

Local Scholarship Detector

State filter dropdown

Keyword search

Dynamic scholarship cards with apply/view details buttons

Local College Finder

Stream, location, type, rating, and fee range filters

Instant search and responsive college cards

YouTube Search Modal

Search videos from within the Resource Hub

Securely hidden API key via backend proxy

Signup/login modal with session storage

Role selection (10th-student, 12th-student, parent)

Personalized Dashboards (10th, 12th, Parent) [under development]

Notification System for success, error, and info messages

Analytics Tracking (client-side events logged locally)

Responsive Design for all devices

📁 Project Structure
text
GOALGURU/
├── backend/
│   ├── data.json            # Scholarship data
│   ├── data-colleges.json   # College data
│   ├── app.js               # Express app with API routes
│   ├── server.js            # Server bootstrap
│   ├── .env                 # Environment variables (not committed)
│   └── package.json         # Backend dependencies & scripts
├── css/
│   └── style.css            # Global and component styles
├── js/
│   ├── resource-hub.js      # Scholarship, college, YouTube logic
│   ├── script.js            # Main UI logic, auth, quiz, notifications
│   └── other scripts…       # Dashboard & quiz logic
├── index.html               # Landing page with typewriter effect
├── resource-hub.html        # Resource Hub: quizzes, finders, videos
├── college-finder.html      # Dedicated College Finder page
├── 10th-dashboard.html      # 10th-grade dashboard skeleton
├── 12th-dashboard.html      # 12th-grade dashboard skeleton
├── parent-dashboard.html    # Parent dashboard skeleton
├── role-selection.html      # Role selection page
└── README.md                # Project documentation
📅 Project Timeline
Oct 2025 – Building Phase

Core features implemented

Backend APIs for scholarships, colleges, YouTube proxy

Frontend UI, quiz engine, and search components

🎯 Purpose
To simplify and personalize the stream-selection and college-search process by combining psychometric insights, curated resources, and local data into one cohesive, student-friendly web experience.

🧾 Future Enhancements

College Comparison Tool 

Cutoff Predictor (in Advance)

Admissions Alert for localites

Counselling Info

AI chatbot for instant academic & career guidance

Database backend (MongoDB/Postgres) for dynamic data

Authentication & authorization with JWT

🤝 Contributing
Contributions are welcome!

Developer: Yug Yadav
LinkedIn: linkedin.com/in/yugyadav
