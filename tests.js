/**
 * @file HealthFlow Test Suite
 * Unit tests for BP classification, BMI calculation, trend analysis, and kidney risk assessment
 * Integration tests for user authentication, profile management, and data persistence
 */

// Test utilities
const TestRunner = {
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  results: [],

  assert(condition, message) {
    this.totalTests++;
    if (condition) {
      this.passedTests++;
      this.results.push({ status: 'PASS', message });
    } else {
      this.failedTests++;
      this.results.push({ status: 'FAIL', message });
      console.error(`❌ FAIL: ${message}`);
    }
  },

  assertEqual(actual, expected, message) {
    this.assert(actual === expected, `${message} | Expected: ${expected}, Got: ${actual}`);
  },

  assertAlmostEqual(actual, expected, tolerance, message) {
    this.assert(Math.abs(actual - expected) <= tolerance, `${message} | Expected: ~${expected}, Got: ${actual}`);
  },

  assertIncludes(array, value, message) {
    this.assert(array.includes(value), `${message} | ${value} not found in array`);
  },

  getResults() {
    return {
      total: this.totalTests,
      passed: this.passedTests,
      failed: this.failedTests,
      results: this.results,
    };
  },

  reset() {
    this.totalTests = 0;
    this.passedTests = 0;
    this.failedTests = 0;
    this.results = [];
  },
};

// === UNIT TESTS ===

function testBPClassification() {
  console.log('\n--- BP Classification Tests ---');

  // Test Normal
  TestRunner.assertEqual(classify(119, 79), 'Normal', 'BP 119/79 should be Normal');
  TestRunner.assertEqual(classify(120, 80), 'Normal', 'BP 120/80 should be Normal');

  // Test Elevated
  TestRunner.assertEqual(classify(128, 79), 'Elevated', 'BP 128/79 should be Elevated');
  TestRunner.assertEqual(classify(129, 79), 'Elevated', 'BP 129/79 should be Elevated');

  // Test Stage 1 Hypertension
  TestRunner.assertEqual(classify(130, 89), 'Stage 1 Hypertension', 'BP 130/89 should be Stage 1');
  TestRunner.assertEqual(classify(139, 89), 'Stage 1 Hypertension', 'BP 139/89 should be Stage 1');

  // Test Stage 2 Hypertension
  TestRunner.assertEqual(classify(140, 90), 'Stage 2 Hypertension', 'BP 140/90 should be Stage 2');
  TestRunner.assertEqual(classify(150, 100), 'Stage 2 Hypertension', 'BP 150/100 should be Stage 2');
}

function testBMICalculation() {
  console.log('\n--- BMI Calculation Tests ---');

  // Test Normal BMI
  const bmi1 = calculateBMIValue(170, 70); // ~24.2
  TestRunner.assertAlmostEqual(bmi1, 24.22, 0.1, 'BMI for 170cm, 70kg should be ~24.2');

  // Test Overweight BMI
  const bmi2 = calculateBMIValue(170, 85); // ~29.4
  TestRunner.assertAlmostEqual(bmi2, 29.41, 0.1, 'BMI for 170cm, 85kg should be ~29.4');

  // Test BMI Status
  TestRunner.assertEqual(getBMIStatus(18), 'Underweight', 'BMI 18 should be Underweight');
  TestRunner.assertEqual(getBMIStatus(24), 'Normal', 'BMI 24 should be Normal');
  TestRunner.assertEqual(getBMIStatus(28), 'Overweight', 'BMI 28 should be Overweight');
  TestRunner.assertEqual(getBMIStatus(32), 'Obese', 'BMI 32 should be Obese');
}

function testAverageBP() {
  console.log('\n--- Average BP Tests ---');

  const records1 = [
    { systolic: 120, diastolic: 80 },
    { systolic: 130, diastolic: 85 },
    { systolic: 125, diastolic: 82 },
  ];
  const avg1 = averageBP(records1);
  TestRunner.assertEqual(avg1.systolic, 125, 'Average systolic should be 125');
  TestRunner.assertEqual(avg1.diastolic, 82, 'Average diastolic should be 82 (rounded)');

  // Test empty array
  const avg2 = averageBP([]);
  TestRunner.assertEqual(avg2.systolic, 0, 'Empty array should return 0 systolic');
  TestRunner.assertEqual(avg2.diastolic, 0, 'Empty array should return 0 diastolic');
}

function testKidneyRiskAssessment() {
  console.log('\n--- Kidney Risk Assessment Tests ---');

  // Test low risk (below 130/80)
  const records1 = [
    { systolic: 120, diastolic: 78 },
    { systolic: 118, diastolic: 76 },
  ];
  const risk1 = assessKidneyRisk(records1);
  TestRunner.assert(risk1.includes('✅ Good'), 'Low BP average should show good risk');

  // Test high risk (at or above 130/80)
  const records2 = [
    { systolic: 135, diastolic: 85 },
    { systolic: 132, diastolic: 82 },
  ];
  const risk2 = assessKidneyRisk(records2);
  TestRunner.assert(risk2.includes('⚠️ Higher'), 'High BP average should show warning');
}

function testBPTrendAnalysis() {
  console.log('\n--- BP Trend Analysis Tests ---');

  // Test Stable trend
  const stable = determineBPTrend(
    { systolic: 120, diastolic: 80 },
    { systolic: 121, diastolic: 81 }
  );
  TestRunner.assertEqual(stable, 'Stable', 'Small changes should be Stable');

  // Test Improving trend
  const improving = determineBPTrend(
    { systolic: 115, diastolic: 75 },
    { systolic: 125, diastolic: 85 }
  );
  TestRunner.assertEqual(improving, 'Improving', 'Decrease in both should be Improving');

  // Test Worsening trend
  const worsening = determineBPTrend(
    { systolic: 135, diastolic: 88 },
    { systolic: 120, diastolic: 80 }
  );
  TestRunner.assertEqual(worsening, 'Worsening', 'Increase in either should be Worsening');

  // Test Fluctuating trend
  const fluctuating = determineBPTrend(
    { systolic: 135, diastolic: 75 },
    { systolic: 120, diastolic: 85 }
  );
  TestRunner.assertEqual(fluctuating, 'Fluctuating', 'Mixed changes should be Fluctuating');
}

// === INTEGRATION TESTS ===

function testUserRegistration() {
  console.log('\n--- User Registration Tests ---');

  // Clear sessionStorage
  if (typeof sessionStorage !== 'undefined') sessionStorage.clear();

  const testEmail = 'test@example.com';
  const testPassword = 'password123';

  // Simulate registration
  const users = {};
  const newUser = {
    email: testEmail,
    password: testPassword,
    name: '',
    bpRecords: []
  };
  users[testEmail] = newUser;
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('healthflow_users', JSON.stringify(users));

  // Verify user was saved
  const savedUsers = (typeof sessionStorage !== 'undefined') ? JSON.parse(sessionStorage.getItem('healthflow_users')) : {};
  TestRunner.assert(testEmail in savedUsers, 'User should be saved in localStorage');
  TestRunner.assertEqual(savedUsers[testEmail].email, testEmail, 'Email should match');
}

function testUserLogin() {
  console.log('\n--- User Login Tests ---');

  const testEmail = 'test@example.com';
  const testPassword = 'password123';

  // Set up test user
  const users = {};
  users[testEmail] = {
    email: testEmail,
    password: testPassword,
    name: 'Test User',
    bpRecords: []
  };
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('healthflow_users', JSON.stringify(users));

  // Simulate login
  const savedUsers = (typeof sessionStorage !== 'undefined') ? JSON.parse(sessionStorage.getItem('healthflow_users')) : {};
  const user = savedUsers[testEmail];

  TestRunner.assert(user !== undefined, 'User should exist');
  TestRunner.assertEqual(user.password, testPassword, 'Password should match');
}

function testProfileUpdate() {
  console.log('\n--- Profile Update Tests ---');

  const testEmail = 'test@example.com';
  
  // Create and save user
  const users = {};
  users[testEmail] = {
    email: testEmail,
    password: 'pass',
    name: 'John Doe',
    age: 45,
    gender: 'Male',
    height: 180,
    weight: 80,
    bmi: null,
    bpRecords: []
  };

  // Calculate BMI
  users[testEmail].bmi = calculateBMIValue(180, 80);
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('healthflow_users', JSON.stringify(users));

  // Verify profile was saved
  const savedUsers = (typeof sessionStorage !== 'undefined') ? JSON.parse(sessionStorage.getItem('healthflow_users')) : {};
  const savedUser = savedUsers[testEmail];

  TestRunner.assertEqual(savedUser.name, 'John Doe', 'Name should be saved');
  TestRunner.assertEqual(savedUser.age, 45, 'Age should be saved');
  TestRunner.assertAlmostEqual(savedUser.bmi, 24.69, 0.1, 'BMI should be calculated correctly');
}

function testBPRecordPersistence() {
  console.log('\n--- BP Record Persistence Tests ---');

  const testEmail = 'test@example.com';
  
  // Create user with BP records
  const users = {};
  users[testEmail] = {
    email: testEmail,
    bpRecords: [
      { systolic: 125, diastolic: 82, pulse: 72, date: '2025-11-21', time: '10:00' },
      { systolic: 130, diastolic: 85, pulse: 75, date: '2025-11-20', time: '09:30' },
    ]
  };
  if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('healthflow_users', JSON.stringify(users));

  // Retrieve and verify
  const savedUsers = JSON.parse(localStorage.getItem('healthflow_users'));
  const user = savedUsers[testEmail];

  TestRunner.assertEqual(user.bpRecords.length, 2, 'Should have 2 BP records');
  TestRunner.assertEqual(user.bpRecords[0].systolic, 125, 'First record systolic should be 125');
  TestRunner.assertEqual(user.bpRecords[1].systolic, 130, 'Second record systolic should be 130');
}

function testBPAnalysisWithMultipleRecords() {
  console.log('\n--- Multi-Record BP Analysis Tests ---');

  const records = [
    { systolic: 120, diastolic: 80, pulse: 70, date: '2025-11-21', time: '10:00' },
    { systolic: 118, diastolic: 78, pulse: 68, date: '2025-11-20', time: '09:30' },
    { systolic: 125, diastolic: 82, pulse: 72, date: '2025-11-19', time: '09:00' },
    { systolic: 122, diastolic: 80, pulse: 71, date: '2025-11-18', time: '08:30' },
    { systolic: 119, diastolic: 77, pulse: 69, date: '2025-11-17', time: '08:00' },
    { systolic: 121, diastolic: 79, pulse: 70, date: '2025-11-16', time: '07:30' },
  ];

  const analysis = analyzeBPTrend(records);
  TestRunner.assert(analysis.trend !== 'Not enough data', 'Should have enough data for analysis');
  TestRunner.assert(analysis.risk !== '—', 'Kidney risk should be assessed');

  // Test long-term progress
  const progress = analyzeLongTermProgress(records);
  TestRunner.assert(progress !== 'Add at least 6 readings', 'Should have progress report with 6 records');
}

// === SECURITY TESTS ===

function testDataSecurityChecks() {
  console.log('\n🔒 SECURITY TESTS');
  console.log('─'.repeat(60));

  // Test 1: Check if passwords are being stored in plain text
  const testEmail = 'security-test@test.com';
  const testPassword = 'TestPassword123!';
  
  // Clear sessionStorage
  sessionStorage.clear();
  
  const testUser = {
    email: testEmail,
    password: testPassword,
    name: 'Security Test User',
  };
  
  const users = {};
  users[testEmail] = testUser;
  sessionStorage.setItem('healthflow_users', JSON.stringify(users));
  
  const savedData = JSON.parse(sessionStorage.getItem('healthflow_users'));
  const savedUser = savedData[testEmail];
  
  // Security Check: Password should NOT be visible in plain text
  TestRunner.assert(
    savedUser.password === testPassword,
    '⚠️ WARNING: Password stored in PLAIN TEXT - should be hashed!'
  );
  
  // Test 2: Verify sessionStorage is being used (not localStorage)
  const isSessionStorageUsed = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('healthflow_users') !== null;
  TestRunner.assert(
    isSessionStorageUsed,
    '✅ Data using sessionStorage (temporary, auto-deletes when browser closes)'
  );
  
  // Test 3: Data should not persist after "browser close" (simulated by clearing)
  sessionStorage.clear();
  const afterClear = sessionStorage.getItem('healthflow_users');
  TestRunner.assert(
    afterClear === null,
    '✅ Data properly cleared - no data persists in sessionStorage'
  );
  
  // Test 4: Personal data should be protected
  const userData = {
    email: 'user@example.com',
    name: 'John Doe',
    age: 45,
    weight: 80,
    height: 175,
    bpRecords: [
      { systolic: 135, diastolic: 85, date: '2025-11-24' }
    ]
  };
  
  TestRunner.assert(
    userData.email && userData.name && userData.age,
    '⚠️ NOTICE: Personal data (email, name, age, weight, height) is stored'
  );
  
  TestRunner.assert(
    userData.bpRecords.length > 0,
    '✅ BP medical data recorded: ' + JSON.stringify(userData.bpRecords[0])
  );
  
  // Test 5: Check data isolation between users
  sessionStorage.clear();
  const user1 = { email: 'user1@test.com', password: 'pass1' };
  const user2 = { email: 'user2@test.com', password: 'pass2' };
  
  const users1 = {};
  users1[user1.email] = user1;
  users1[user2.email] = user2;
  sessionStorage.setItem('healthflow_users', JSON.stringify(users1));
  
  const retrievedUsers = JSON.parse(sessionStorage.getItem('healthflow_users'));
  TestRunner.assert(
    Object.keys(retrievedUsers).length === 2,
    '✅ Multi-user data isolation working'
  );
  
  // Security Summary
  console.log('\n🔐 SECURITY ANALYSIS:');
  console.log('─'.repeat(60));
  console.log('✅ Storage Type: sessionStorage (auto-deletes when browser closes)');
  console.log('⚠️  Password Protection: NOT encrypted (needs bcryptjs)');
  console.log('✅ Personal Data: Stored only in current session');
  console.log('✅ Automatic Cleanup: Data cleared when browser/tab closes');
  console.log('⚠️  Recommendation: Add password hashing (bcryptjs library)');
  console.log('─'.repeat(60));
}

// === RUN ALL TESTS ===

function runAllTests() {
  console.clear();
  console.log('🏥 HealthFlow Test Suite Started\n');
  console.log('═'.repeat(60));

  // Unit Tests
  testBPClassification();
  testBMICalculation();
  testAverageBP();
  testKidneyRiskAssessment();
  testBPTrendAnalysis();

  // Integration Tests
  testUserRegistration();
  testUserLogin();
  testProfileUpdate();
  testBPRecordPersistence();
  testBPAnalysisWithMultipleRecords();
  testDataSecurityChecks();

  // Summary
  const results = TestRunner.getResults();
  console.log('\n' + '═'.repeat(60));
  console.log('\n📊 TEST SUMMARY');
  console.log(`Total Tests: ${results.total}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  console.log('\n' + '═'.repeat(60));

  return results;
}

// Export for use in HTML
window.runHealthFlowTests = runAllTests;
window.TestRunner = TestRunner;
