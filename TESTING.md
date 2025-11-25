# HealthFlow Testing Guide

## Overview
HealthFlow includes a comprehensive test suite to validate BP analysis, user authentication, profile management, and data persistence.

## Running Tests

### Via Test Runner (Easy)
1. Open `test-runner.html` in your browser
2. Click "Run All Tests"
3. View results instantly with pass/fail indicators

### Via Console (Advanced)
1. Open the main app or test runner page
2. Press F12 to open browser console
3. Run: `runHealthFlowTests()`

## Test Categories

### Unit Tests

#### BP Classification (4 tests)
Tests the `classify()` function for correct BP categorization:
- **Normal**: Systolic < 120 AND Diastolic < 80
- **Elevated**: Systolic 120–129 AND Diastolic < 80
- **Stage 1 Hypertension**: Systolic 130–139 OR Diastolic 80–89
- **Stage 2 Hypertension**: Systolic ≥ 140 OR Diastolic ≥ 90

```javascript
classify(119, 79) → "Normal"
classify(128, 79) → "Elevated"
classify(130, 89) → "Stage 1 Hypertension"
classify(140, 90) → "Stage 2 Hypertension"
```

#### BMI Calculation (6 tests)
Tests `calculateBMIValue()` and `getBMIStatus()`:
- Validates BMI formula: weight (kg) / height (m)²
- Categorizes BMI into 4 statuses:
  - Underweight: < 18.5
  - Normal: 18.5–24.9
  - Overweight: 25–29.9
  - Obese: ≥ 30

```javascript
calculateBMIValue(170, 70) → ~24.2 (Normal)
getBMIStatus(32) → "Obese"
```

#### Average BP (4 tests)
Tests `averageBP()` for multi-record averaging:
- Validates systolic average
- Validates diastolic average
- Handles empty arrays gracefully

```javascript
averageBP([{systolic: 120, diastolic: 80}, {systolic: 130, diastolic: 90}])
→ {systolic: 125, diastolic: 85}
```

#### Kidney Risk Assessment (2 tests)
Tests `assessKidneyRisk()` with KDIGO 130/80 threshold:
- **Low Risk**: Average BP < 130/80 (shows ✅ message)
- **High Risk**: Average BP ≥ 130/80 (shows ⚠️ message)

```javascript
assessKidneyRisk([{systolic: 120, diastolic: 78}]) 
→ "✅ Good! Your recent average..."

assessKidneyRisk([{systolic: 135, diastolic: 85}])
→ "⚠️ Higher kidney strain likely..."
```

#### BP Trend Analysis (4 tests)
Tests `determineBPTrend()` for trend detection:
- **Stable**: Change < 5 mmHg in both
- **Improving**: Decrease ≥ 5 mmHg in both
- **Worsening**: Increase ≥ 5 mmHg in either
- **Fluctuating**: Mixed changes

```javascript
determineBPTrend({s: 120, d: 80}, {s: 121, d: 81}) → "Stable"
determineBPTrend({s: 115, d: 75}, {s: 125, d: 85}) → "Improving"
determineBPTrend({s: 135, d: 88}, {s: 120, d: 80}) → "Worsening"
```

### Integration Tests

#### User Registration (1 test)
- Creates new user account
- Verifies data saved to localStorage
- Checks email is correctly stored

#### User Login (1 test)
- Loads user from localStorage
- Validates email and password match
- Verifies user object structure

#### Profile Update (1 test)
- Saves profile (name, age, gender, height, weight)
- Calculates and stores BMI
- Verifies all fields persisted in localStorage

#### BP Record Persistence (1 test)
- Saves multiple BP records
- Verifies record count
- Checks systolic values match

#### Multi-Record Analysis (1 test)
- Creates 6+ BP records
- Runs trend analysis
- Generates long-term progress report
- Validates all analysis functions work with real data

## Test Results Interpretation

### Success Criteria
- ✅ **Pass**: Test assertion is true
- ❌ **Fail**: Test assertion is false

### Summary Metrics
- **Total Tests**: Number of assertions run
- **Passed**: Number of passing tests
- **Failed**: Number of failing tests
- **Success Rate**: Percentage of tests passed

### Expected Result
```
🏥 HealthFlow Test Suite
═══════════════════════════════════════════════════════════

📊 TEST SUMMARY
Total Tests: 29
✅ Passed: 29
❌ Failed: 0
Success Rate: 100.0%

═══════════════════════════════════════════════════════════
```

## Common Test Failures & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| BP Classification fails | Constants changed | Verify BP thresholds match KDIGO guidelines |
| BMI calculation off | Formula error | Check: `weight / (height/100)²` |
| localStorage tests fail | Private browsing | Disable private/incognito mode |
| Average BP wrong | Rounding error | Allow ±1 tolerance in tests |
| Trend analysis fails | Threshold mismatch | Confirm delta thresholds = 5 mmHg |

## Adding New Tests

To add a test to `tests.js`:

```javascript
function testMyNewFeature() {
  console.log('\n--- My New Feature Tests ---');
  
  // Arrange
  const input = someValue;
  
  // Act
  const result = myFunction(input);
  
  // Assert
  TestRunner.assertEqual(result, expectedValue, 'My test description');
  TestRunner.assert(condition, 'Another assertion message');
}
```

Then add to `runAllTests()`:
```javascript
testMyNewFeature();
```

## CI/CD Integration

To run tests in automated pipelines:

```bash
# Node.js / Headless Chrome example
npm install jest
npm test
```

Or use `test-runner.html` with:
- Puppeteer for headless testing
- GitHub Actions / GitLab CI workflows
- CircleCI / Jenkins

## Performance Benchmarks

Typical test execution times:
- Unit tests: ~50ms
- Integration tests: ~100ms
- Full suite: ~150ms

## Troubleshooting

### Tests show "Not enough data"
- **Cause**: Trying to analyze with < required records
- **Fix**: Ensure test data has sufficient records (e.g., 6+ for progress)

### localStorage errors
- **Cause**: Private browsing or storage quota exceeded
- **Fix**: Use normal browsing mode or clear localStorage

### Functions undefined
- **Cause**: Test suite can't access main app functions
- **Fix**: Ensure `index.js` loads before `tests.js`

## Future Enhancements

- [ ] E2E tests with Selenium/Cypress
- [ ] Performance profiling
- [ ] Code coverage reports
- [ ] Visual regression testing
- [ ] Accessibility (a11y) tests
- [ ] API endpoint testing (when backend is ready)
