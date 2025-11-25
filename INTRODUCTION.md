# HealthFlow — Blood Pressure Tracker for IgA Nephropathy

## What is HealthFlow?

HealthFlow is a simple, privacy-focused web application that helps you track your blood pressure readings and monitor your kidney health, especially if you have IgA Nephropathy or need to maintain a healthy BP for kidney protection.

**Key idea:** Record your BP anytime, see trends, get insights about your kidney health risk, and take control of your health data.

---

## Why HealthFlow?

- **📊 Track your BP:** Log systolic, diastolic, and pulse readings with date/time.
- **📈 See trends:** Visualize your BP changes over time with interactive charts.
- **🔍 Smart insights:** Get automatic analysis of your BP status (Normal, Elevated, Stage 1/2 Hypertension).
- **🫀 Kidney-focused:** Uses KDIGO-aligned BP thresholds (130/80 mmHg) to assess kidney risk for IgA Nephropathy.
- **🔒 Privacy first:** Your data stays on your device — nothing is sent to servers by default.
- **📱 Mobile-ready:** Works on phones, tablets, and desktops.

---

## Quick Start (60 seconds)

1. **Open the app** → Open `index.html` in your web browser.
2. **Create an account** → Enter email and password, click "Register".
3. **Complete your profile** → Add name, age, gender, height, weight.
4. **Log a BP reading** → Enter your systolic, diastolic, pulse, date, and time.
5. **View your dashboard** → See your latest reading, trends, and kidney risk analysis.

**Done!** Your data is safe on your device and auto-deleted when you close your browser.

---

## Features

### User Account & Profile
- Create a personal account with email/password.
- Set up your profile (name, age, gender, height, weight).
- Automatic BMI calculation.
- Edit profile anytime from the dashboard.

### Blood Pressure Recording
- Log BP readings (systolic, diastolic, pulse).
- Timestamp each reading (date & time).
- View full history in a sortable table.
- Track unlimited readings.

### Health Insights
- **BP Classification:** Automatic status (Normal, Elevated, Stage 1, Stage 2).
- **IgA Nephropathy Trend:** Analysis based on ≥2 readings showing if your BP is stable, improving, worsening, or fluctuating.
- **Kidney Risk Assessment:** Warns if your BP average exceeds 130/80 mmHg (KDIGO threshold for kidney protection).
- **Long-Term Progress:** Summary of your BP trend over 6+ readings with health recommendations.

### Data Visualization
- **Interactive Chart:** See your BP readings plotted over time (systolic and diastolic).
- **Color-coded status:** Green (Normal), Yellow (Elevated), Red (High).

### Privacy & Security
- **Local storage only:** Data stored in your browser, never sent to servers (unless you opt for backend sync).
- **Auto-delete on close:** Browser session data deleted automatically when you close the tab/window.
- **No tracking:** No ads, no analytics, no third-party data sharing.
- **Privacy policy included:** Full transparency in `privacy-policy.html`.

---

## What You Can Do

✅ Register and log in  
✅ Create and update your profile  
✅ Record BP readings with timestamps  
✅ View your complete BP history  
✅ See trends and kidney risk analysis  
✅ View interactive BP charts  
✅ Edit your profile anytime  
✅ Logout and clear your session  

---

## Technical Stack

**Frontend:**
- HTML5, CSS3, JavaScript (vanilla — no frameworks)
- Chart.js for data visualization
- sessionStorage for temporary, secure local storage

**Backend (Optional):**
- Node.js + Express.js
- MongoDB for persistent data storage
- bcrypt for password hashing
- JWT for secure authentication

**Deployment:**
- Frontend: Vercel (free static hosting)
- Backend: Render or Heroku (free Node.js hosting)
- Database: MongoDB Atlas (free tier available)

---

## Privacy & Data

### Where is my data stored?
- **By default:** In your browser's temporary storage (`sessionStorage`). Auto-deleted when you close your browser.
- **Optionally:** On a secure backend database (if you enable sync) with encrypted transmission and hashed passwords.

### What data do you collect?
- Email, password, name, age, gender, height, weight
- Blood pressure readings (systolic, diastolic, pulse, date, time)
- Calculated metrics (BMI, kidney risk status)

### Who can see my data?
- **Only you** — your data never leaves your device unless you use backend sync.
- No ads, no analytics, no selling data.
- See full privacy policy: `privacy-policy.html`

---

## Getting Started

### For Users (No Technical Knowledge Needed)
1. Open `index.html` in any web browser (Chrome, Firefox, Safari, Edge).
2. Create an account.
3. Start logging your BP readings!
4. Use private/incognito browsing for maximum privacy.

### For Developers (Deploy & Customize)
1. See `DEPLOYMENT.md` for step-by-step deployment to GitHub, Vercel (frontend), and Render (backend).
2. See `README.md` for technical details and API routes.
3. See `TESTING.md` to run tests and verify functionality.

---

## Support & Questions

- **Privacy concerns?** Read `privacy-policy.html` or `PRIVACY.md`.
- **How do I deploy this?** See `DEPLOYMENT.md`.
- **How do I test it?** Run `test-runner.html` in your browser or `npm test` in Node.
- **How do I contribute?** Fork the repo and submit a pull request.

---

## Important Notes

⚠️ **This app is for health tracking only** — not a substitute for medical advice. Always consult your doctor about your blood pressure and kidney health.

✅ **MVP (Minimum Viable Product):** This is a functional MVP suitable for personal use and testing. Before clinical/production deployment, add HIPAA compliance, audit logging, and professional security review.

---

## License

Open Source — feel free to use, modify, and share.

---

**Ready to track your health? Open `index.html` now!** 💙
