# HealthFlow – BP & IgA Nephropathy Tracker

A clinical-grade blood pressure tracking application with user authentication, health profiles, trend analysis, and kidney protection features aligned with KDIGO guidelines.

## 🎯 Features

### User Management
- **Registration & Login**: Secure email-based authentication
- **Health Profile**: Track age, gender, height, weight
- **BMI Calculation**: Automatic BMI computation with health status

### Blood Pressure Tracking
- **Quick Entry**: Systolic, diastolic, pulse, date, time
- **History Table**: View all readings with status colors
- **Data Persistence**: All data saved to browser localStorage

### Clinical Analysis
- **BP Classification**: Normal, Elevated, Stage 1, Stage 2 Hypertension
- **Trend Detection**: Stable, Improving, Worsening, Fluctuating
- **Kidney Risk Assessment**: KDIGO-aligned 130/80 mmHg threshold
- **Long-Term Progress**: 6+ reading analysis and trends

### Visualization
- **Interactive Charts**: Line graph of systolic/diastolic over time
- **Real-Time Updates**: Dashboard updates immediately on new entries
- **Health Insights**: Context-specific tips and recommendations

## 🚀 Getting Started

### Quick Start
1. Open `index.html` in your browser
2. Register with an email and password
3. Complete your health profile (height, weight, etc.)
4. Start recording BP readings

### No Installation Required
HealthFlow runs entirely in your browser—no backend server needed for local use.

## 📊 BP Classification System

| Category | Systolic (mmHg) | Diastolic (mmHg) |
|----------|-----------------|-----------------|
| Normal | < 120 | < 80 |
| Elevated | 120–129 | < 80 |
| Stage 1 Hypertension | 130–139 | 80–89 |
| Stage 2 Hypertension | ≥ 140 | ≥ 90 |

### KDIGO Kidney Risk Threshold
**⚠️ High Risk Alert:** Average BP ≥ **130/80 mmHg**

For IgA Nephropathy patients, we align with KDIGO guidelines and flag higher kidney strain risk at 130/80 (instead of standard 140/90) for earlier intervention.

## 📁 Project Structure

```
health flow/
├── index.html           # Main app UI
├── index.js             # Core application logic
├── test-runner.html     # Test suite UI
├── tests.js             # Unit & integration tests
├── TESTING.md           # Test documentation
├── README.md            # This file
└── server/              # Backend (optional Node.js setup)
    ├── index.js
    ├── package.json
    └── README.md
```

## 🧪 Testing

### Run Tests
1. Open `test-runner.html` in your browser
2. Click **"Run All Tests"** button
3. View real-time results

### Test Coverage
- **29 total tests** covering:
  - BP classification (4 tests)
  - BMI calculation (6 tests)
  - Average BP computation (4 tests)
  - Kidney risk assessment (2 tests)
  - Trend analysis (4 tests)
  - User registration (1 test)
  - User login (1 test)
  - Profile persistence (1 test)
  - BP record persistence (1 test)
  - Multi-record analysis (1 test)

**Expected Result**: 100% pass rate (29/29)

See [TESTING.md](./TESTING.md) for detailed test documentation.

## 💾 Data Storage

All user data is stored locally in your browser using **localStorage**:
- User accounts and profiles
- BP readings and history
- Personal health information

**Privacy**: Data never leaves your device (when used without backend).

## 🔒 BP Constants & KDIGO Alignment

```javascript
// Normal/Target Thresholds
SYSTOLIC_NORMAL = 120
DIASTOLIC_NORMAL = 80

// Elevated
SYSTOLIC_ELEVATED = 130

// Stage 1
SYSTOLIC_STAGE1 = 140
DIASTOLIC_STAGE1 = 90

// Kidney Risk (KDIGO-Aligned for IgA Nephropathy)
KIDNEY_RISK_SYSTOLIC = 130
KIDNEY_RISK_DIASTOLIC = 80
```

## 📈 Trend Analysis

### Short-Term Trend (2 Readings)
- **Stable**: ±5 mmHg change
- **Improving**: ≥ 5 mmHg decrease in both
- **Worsening**: ≥ 5 mmHg increase in either
- **Fluctuating**: Mixed changes

### Long-Term Progress (6+ Readings)
Compares first 3 readings vs. last 3 readings to identify:
- Overall improvement or decline
- Stability in BP management
- Need for lifestyle/medication adjustments

## 🎨 UI/UX Features

- **Responsive Design**: Works on desktop, tablet, mobile
- **Medical Color Scheme**: Blue/green (healthy), yellow (caution), red (alert)
- **Clear Navigation**: Separate login, profile, and dashboard pages
- **Real-Time Validation**: Immediate feedback on form inputs
- **Persistent Sessions**: Auto-restores user after page refresh

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charts**: Chart.js for data visualization
- **Storage**: Browser localStorage for persistence
- **Backend** (optional): Node.js, Express, MongoDB

## 📝 User Workflow

```
1. Register / Login
   ↓
2. Complete Health Profile
   (Name, age, gender, height, weight → BMI calculated)
   ↓
3. Record BP Readings
   (Systolic, diastolic, pulse, date, time)
   ↓
4. View Dashboard
   ├─ Latest reading with health classification
   ├─ Trend analysis (short-term)
   ├─ Long-term progress report
   ├─ Interactive chart
   └─ Complete history table
   ↓
5. Edit Profile / Logout
```

## 🔧 Development

### Adding Features
1. Edit `index.js` to add logic
2. Update `index.html` for UI
3. Add tests to `tests.js`
4. Run test suite to validate

### Example: Adding a new BP threshold

```javascript
// 1. Update constants in index.js
const SYSTOLIC_HYPERTENSION_CRITICAL = 160;

// 2. Update classify() function
if (s >= SYSTOLIC_HYPERTENSION_CRITICAL) return "Critical Hypertension";

// 3. Add test in tests.js
TestRunner.assertEqual(classify(160, 90), "Critical Hypertension", "...test...");
```

## 🚀 Deployment

### Local Browser
Simply open `index.html` in any modern browser.

### Vercel (Frontend)
```bash
vercel deploy
```

### Render (Backend - Optional)
1. Set up `server/` with Express
2. Deploy to Render.com
3. Update API endpoint in `index.js`

## ⚠️ Disclaimer

**HealthFlow is for educational and personal tracking purposes.** It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult with a healthcare provider for medical concerns.

## 📚 References

- [KDIGO Guidelines for Blood Pressure Control in IgA Nephropathy](https://kdigo.org/)
- [American Heart Association BP Classification](https://www.heart.org/)
- [Chart.js Documentation](https://www.chartjs.org/)

## 📄 License

Open source for educational use. Modify and distribute freely.

## 🤝 Contributing

Found a bug or want to improve HealthFlow?
1. Test your changes
2. Update TESTING.md if needed
3. Submit with clear documentation

## 📞 Support

For issues, questions, or feature requests, please check the testing guide and documentation.

---

**Last Updated**: November 21, 2025

**Version**: 1.0.0 (Alpha)

💙 Built for kidney health awareness.
