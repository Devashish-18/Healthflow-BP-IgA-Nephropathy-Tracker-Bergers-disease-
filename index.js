/**
 * @file HealthFlow Application - User Authentication, Profile Management, and BP Tracking
 * For IgA Nephropathy management with KDIGO-aligned thresholds
 */

// --- Named BP threshold constants ---
const SYSTOLIC_NORMAL = 120;
const DIASTOLIC_NORMAL = 80;
const SYSTOLIC_ELEVATED = 130;
const SYSTOLIC_STAGE1 = 140;
const DIASTOLIC_STAGE1 = 90;
const KIDNEY_RISK_SYSTOLIC = 130;
const KIDNEY_RISK_DIASTOLIC = 80;

// --- Global State ---
let currentUser = null;
let chart = null;

// --- Storage Keys ---
// By default the frontend uses sessionStorage for temporary, per-tab storage.
// When a backend is configured, calls will go to the server and sessionStorage
// will be used as a fallback.
const USERS_KEY = 'healthflow_users';
const CURRENT_USER_KEY = 'healthflow_currentUser';

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  setupEventListeners();
});

function initializeApp() {
  const savedUser = (typeof sessionStorage !== 'undefined') ? sessionStorage.getItem(CURRENT_USER_KEY) : null;
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showPage('dashboardPage');
    displayProfileInfo();
    displayBPHistory();
    updateDashboard();
  } else {
    showPage('loginPage');
  }
}

// === NAVIGATION ===
function showPage(pageName) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageName).classList.add('active');
  
  const logoutBtn = document.getElementById('logoutBtn');
  logoutBtn.style.display = pageName === 'dashboardPage' ? 'block' : 'none';
}

// === EVENT LISTENERS ===
function setupEventListeners() {
  // Auth
  document.getElementById('loginBtn').addEventListener('click', login);
  document.getElementById('registerBtn').addEventListener('click', registerUser);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Profile
  document.getElementById('profileForm').addEventListener('submit', saveProfile);
  document.getElementById('height').addEventListener('change', calculateBMI);
  document.getElementById('weight').addEventListener('change', calculateBMI);
  document.getElementById('editProfileBtn').addEventListener('click', () => showPage('profilePage'));

  // BP
  document.getElementById('bpForm').addEventListener('submit', addBPReading);
}

// === AUTHENTICATION ===
// Store user accounts in localStorage (persists across browser restarts so users can log in again)
// Store current session/BP data in sessionStorage (auto-clears for privacy)
function getAllUsers() {
  try {
    // User accounts stored in localStorage for persistent login
    const data = (typeof localStorage !== 'undefined') ? localStorage.getItem(USERS_KEY) : null;
    return data ? JSON.parse(data) : {};
  } catch (err) {
    console.error('Failed to load users:', err);
    return {};
  }
}

function saveUsers(users) {
  try {
    // Save user accounts to localStorage for persistence across sessions
    if (typeof localStorage !== 'undefined') localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save users:', err);
  }
}

function login() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();

  if (!email || !password) {
    alert('Please fill in email and password');
    return;
  }

  const users = getAllUsers();
  const user = users[email];

  if (!user || user.password !== password) {
    alert('Invalid email or password');
    return;
  }

  currentUser = user;
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  document.getElementById('authEmail').value = '';
  document.getElementById('authPassword').value = '';
  showPage('dashboardPage');
  displayProfileInfo();
  displayBPHistory();
  updateDashboard();
}

function registerUser() {
  const email = document.getElementById('authEmail').value.trim();
  const password = document.getElementById('authPassword').value.trim();

  if (!email || !password) {
    alert('Please fill in email and password');
    return;
  }

  const users = getAllUsers();
  if (users[email]) {
    alert('User already exists');
    return;
  }

  // Create new user with account credentials (stored in localStorage for persistent login)
  currentUser = {
    email,
    password,  // Note: For production, use backend with bcrypt hashing
    name: '',
    age: null,
    gender: '',
    height: null,
    weight: null,
    bmi: null,
    bpRecords: []
  };

  // Store user account in localStorage so they can log in again later
  users[email] = currentUser;
  saveUsers(users);
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  document.getElementById('authEmail').value = '';
  document.getElementById('authPassword').value = '';
  showPage('profilePage');
}

function logout() {
  currentUser = null;
  if (typeof sessionStorage !== 'undefined') sessionStorage.removeItem(CURRENT_USER_KEY);
  document.getElementById('authEmail').value = '';
  document.getElementById('authPassword').value = '';
  showPage('loginPage');
}

// === PROFILE MANAGEMENT ===
function saveProfile(e) {
  e.preventDefault();

  const name = document.getElementById('fullName').value.trim();
  const age = +document.getElementById('age').value;
  const gender = document.getElementById('gender').value;
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;

  if (!name || !age || !gender || !height || !weight) {
    alert('Please fill in all fields');
    return;
  }

  currentUser.name = name;
  currentUser.age = age;
  currentUser.gender = gender;
  currentUser.height = height;
  currentUser.weight = weight;
  currentUser.bmi = calculateBMIValue(height, weight);

  // Update in localStorage
  const users = getAllUsers();
  users[currentUser.email] = currentUser;
  saveUsers(users);
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

  alert('Profile saved successfully!');
  document.getElementById('profileForm').reset();
  showPage('dashboardPage');
  displayProfileInfo();
}

function calculateBMI() {
  const height = +document.getElementById('height').value;
  const weight = +document.getElementById('weight').value;

  if (height && weight) {
    const bmi = calculateBMIValue(height, weight);
    const status = getBMIStatus(bmi);
    document.getElementById('bmiResult').innerHTML = `<strong>BMI: ${bmi.toFixed(1)}</strong> - ${status}`;
    document.getElementById('bmiResult').style.display = 'block';
  }
}

function calculateBMIValue(height, weight) {
  return weight / ((height / 100) ** 2);
}

function getBMIStatus(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function displayProfileInfo() {
  if (!currentUser) return;

  const bmiStatus = currentUser.bmi ? getBMIStatus(currentUser.bmi) : 'Not calculated';
  const profileInfo = document.getElementById('profileInfo');
  profileInfo.innerHTML = `
    <p><strong>Name:</strong> ${currentUser.name || 'Not set'}</p>
    <p><strong>Age:</strong> ${currentUser.age || 'Not set'}</p>
    <p><strong>Gender:</strong> ${currentUser.gender || 'Not set'}</p>
    <p><strong>Height:</strong> ${currentUser.height ? currentUser.height + ' cm' : 'Not set'}</p>
    <p><strong>Weight:</strong> ${currentUser.weight ? currentUser.weight + ' kg' : 'Not set'}</p>
    <p><strong>BMI:</strong> ${currentUser.bmi ? currentUser.bmi.toFixed(1) : 'Not calculated'} - ${bmiStatus}</p>
  `;
}

// === BP MANAGEMENT ===
function addBPReading(e) {
  e.preventDefault();

  const record = {
    systolic: +document.getElementById('systolic').value,
    diastolic: +document.getElementById('diastolic').value,
    pulse: +document.getElementById('pulse').value,
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
  };

  if (!currentUser.bpRecords) currentUser.bpRecords = [];
  currentUser.bpRecords.unshift(record);

  // Save to sessionStorage-backed users
  const users = getAllUsers();
  users[currentUser.email] = currentUser;
  saveUsers(users);
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));

  document.getElementById('bpForm').reset();
  updateDashboard();
  displayBPHistory();
}

function updateDashboard() {
  if (!currentUser || !currentUser.bpRecords || currentUser.bpRecords.length === 0) {
    document.getElementById('latest').innerHTML = '<p class="status">No record yet</p>';
    document.getElementById('trendText').innerHTML = 'Add at least 2 readings to analyze kidney BP stability.';
    document.getElementById('progressText').innerHTML = 'Add at least 6 readings for a progress report.';
    return;
  }

  const last = currentUser.bpRecords[0];
  const condition = classify(last.systolic, last.diastolic);

  // Update latest card
  const latestCard = document.getElementById('latest');
  latestCard.innerHTML = `
    <p class="status ${
      condition.toLowerCase().includes('normal')
        ? 'normal'
        : condition.toLowerCase().includes('elevated')
        ? 'elevated'
        : 'high'
    }">
      ${last.systolic}/${last.diastolic} mmHg — ${condition}
    </p>
    <p>${getTip(condition)}</p>
  `;

  // Update trend analysis
  const analysis = analyzeBPTrend(currentUser.bpRecords);
  document.getElementById('trendText').innerHTML = `
    <strong>Trend:</strong> ${analysis.trend}<br>
    <strong>Kidney Risk:</strong> ${analysis.risk}<br>
    <em>${analysis.message}</em>
  `;

  // Update progress
  document.getElementById('progressText').textContent = analyzeLongTermProgress(currentUser.bpRecords);

  // Draw chart
  drawChart(currentUser.bpRecords);
}

function displayBPHistory() {
  if (!currentUser || !currentUser.bpRecords || currentUser.bpRecords.length === 0) {
    document.getElementById('historyBody').innerHTML = '<tr><td colspan="6">No records yet</td></tr>';
    return;
  }

  const rows = currentUser.bpRecords.map(record => {
    const condition = classify(record.systolic, record.diastolic);
    const statusClass = condition.toLowerCase().includes('normal')
      ? 'normal'
      : condition.toLowerCase().includes('elevated')
      ? 'elevated'
      : 'high';

    return `
      <tr>
        <td>${record.date}</td>
        <td>${record.time}</td>
        <td>${record.systolic}</td>
        <td>${record.diastolic}</td>
        <td>${record.pulse}</td>
        <td><span class="status ${statusClass}">${condition}</span></td>
      </tr>
    `;
  });

  document.getElementById('historyBody').innerHTML = rows.join('');
}

// === BP ANALYSIS FUNCTIONS ===
function classify(s, d) {
  if (s < SYSTOLIC_NORMAL && d < DIASTOLIC_NORMAL) return "Normal";
  if (s < SYSTOLIC_ELEVATED && d < DIASTOLIC_NORMAL) return "Elevated";
  if (s < SYSTOLIC_STAGE1 || d < DIASTOLIC_STAGE1) return "Stage 1 Hypertension";
  return "Stage 2 Hypertension";
}

function getTip(condition) {
  if (condition === "Normal")
    return "✅ Excellent! Well-controlled BP is key for kidney health. Keep up the great work.";
  if (condition === "Elevated")
    return "⚠️ Slightly elevated. A good time to focus on lifestyle changes like reducing salt.";
  if (condition.includes("Stage 1"))
    return "⚠️ BP in mild hypertension range. Consistent monitoring and lifestyle adjustments are important.";
  return "🚨 High BP. Please consult your doctor to manage this, as high BP can accelerate kidney damage.";
}

function analyzeBPTrend(records) {
  if (records.length < 2) {
    return {
      trend: "Not enough data",
      risk: "—",
      message: "Add at least 2 readings to see your short-term trend.",
    };
  }

  const latest = records[0];
  const previous = records[1];
  const condition = classify(latest.systolic, latest.diastolic);

  const trend = determineBPTrend(latest, previous);
  const kidneyRisk = assessKidneyRisk(records);
  const message = trendMessage(trend, condition);

  return { trend, risk: kidneyRisk, message };
}

function determineBPTrend(latest, previous) {
  const deltaSys = latest.systolic - previous.systolic;
  const deltaDia = latest.diastolic - previous.diastolic;

  if (Math.abs(deltaSys) < 5 && Math.abs(deltaDia) < 5) return "Stable";
  if (deltaSys <= -5 && deltaDia <= -5) return "Improving";
  if (deltaSys >= 5 || deltaDia >= 5) return "Worsening";
  return "Fluctuating";
}

function assessKidneyRisk(records) {
  const recentRecords = records.slice(0, 5);
  const avg = averageBP(recentRecords);

  const isHighRisk = avg.systolic >= KIDNEY_RISK_SYSTOLIC || avg.diastolic >= KIDNEY_RISK_DIASTOLIC;

  if (isHighRisk) {
    return `⚠️ Higher kidney strain likely (avg ≥ ${KIDNEY_RISK_SYSTOLIC}/${KIDNEY_RISK_DIASTOLIC}). Consult your doctor.`;
  } else {
    return "✅ Good! Your recent average suggests kidney pressure is being managed.";
  }
}

function averageBP(data) {
  if (data.length === 0) return { systolic: 0, diastolic: 0 };
  const totalSys = data.reduce((a, b) => a + b.systolic, 0);
  const totalDia = data.reduce((a, b) => a + b.diastolic, 0);
  return {
    systolic: Math.round(totalSys / data.length),
    diastolic: Math.round(totalDia / data.length),
  };
}

function trendMessage(trend, condition) {
  if (trend === "Improving")
    return "Great job! Your BP is improving, which helps protect your kidneys.";
  if (trend === "Stable" && condition.includes("Normal"))
    return "Excellent, your BP is stable and in a healthy range.";
  if (trend === "Worsening")
    return "Your BP appears to be rising. This is an important signal to watch closely.";
  if (trend === "Fluctuating")
    return "Your BP is fluctuating. Aim for consistency in diet, exercise, and medication.";
  return "Continue monitoring your readings to establish a clear trend.";
}

function analyzeLongTermProgress(records) {
  if (records.length < 6) {
    return "Add at least 6 readings for a long-term progress report.";
  }

  const recentRecords = records.slice(0, 6).reverse();
  const firstHalf = recentRecords.slice(0, 3);
  const secondHalf = recentRecords.slice(3, 6);

  const avgFirst = averageBP(firstHalf);
  const avgSecond = averageBP(secondHalf);

  const sysTrend = avgSecond.systolic - avgFirst.systolic;
  const diaTrend = avgSecond.diastolic - avgFirst.diastolic;

  if (sysTrend < -5 && diaTrend < -5) {
    return `✅ Great progress! Your average BP has dropped from ${avgFirst.systolic}/${avgFirst.diastolic} to ${avgSecond.systolic}/${avgSecond.diastolic}.`;
  }
  if (sysTrend > 5 || diaTrend > 5) {
    return `🚨 Your average BP has risen from ${avgFirst.systolic}/${avgFirst.diastolic} to ${avgSecond.systolic}/${avgSecond.diastolic}. Please consult your doctor.`;
  }
  if (Math.abs(sysTrend) <= 5 && Math.abs(diaTrend) <= 5) {
    const avgOverall = averageBP(recentRecords);
    if (avgOverall.systolic < 130 && avgOverall.diastolic < 85) {
      return `✅ Your BP is stable and in a healthy range (${avgOverall.systolic}/${avgOverall.diastolic} avg). Keep up the good work!`;
    }
    return `⚠️ Your BP is stable but remains elevated (${avgOverall.systolic}/${avgOverall.diastolic} avg). Continue to monitor closely.`;
  }
  return "Your BP is fluctuating. Try to maintain a consistent lifestyle and medication schedule.";
}

// === CHARTING ===
function drawChart(records) {
  const ctx = document.getElementById('chart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: records.map(r => r.date).reverse(),
      datasets: [
        {
          label: 'Systolic',
          data: records.map(r => r.systolic).reverse(),
          borderColor: '#e53935',
          tension: 0.3,
        },
        {
          label: 'Diastolic',
          data: records.map(r => r.diastolic).reverse(),
          borderColor: '#0b8bd7',
          tension: 0.3,
        },
      ],
    },
    options: {
      plugins: { legend: { position: 'bottom' } },
      scales: { y: { beginAtZero: true } },
    },
  });
}
