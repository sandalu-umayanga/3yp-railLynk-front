# RailLynk Test Suite Quick Reference

## 🚀 Quick Start

### Run All Tests
```bash
npm test -- --run
```

### Run Tests in Watch Mode
```bash
npm test
```

### Run with Coverage
```bash
npm test -- --coverage
```

## 📊 Current Test Status

| Metric | Value |
|--------|-------|
| Total Test Files | 29 ✅ |
| Total Tests | 104 ✅ |
| Pass Rate | 100% ✅ |
| Failing Tests | 0 ✅ |

## 📁 Test Structure Overview

```
src/__test__/
├── integration/ (6 files, 12 tests)
│   ├── AdminDashboard.test.jsx (2)
│   ├── Login.integration.test.jsx (2)
│   ├── PassengerRegister.test.jsx (1)
│   ├── PassengerTransactionPage.test.jsx (5)
│   ├── RechargePage.test.jsx (2)
│   └── StationRegister.test.jsx (2)
└── unit/ (23 files, 92 tests)
    ├── About.test.jsx (10)
    ├── AdminDashboard.test.jsx (6)
    ├── AdminLogin.test.jsx (15)
    ├── AnnouncementCard.test.jsx (13)
    ├── ProtectedRoute.test.jsx (8)
    └── ... (18 more files)
```

## 🧪 Test Categories

| Category | Files | Tests | Description |
|----------|-------|-------|-------------|
| Auth & Authorization | 7 | 30 | Login, registration, protected routes |
| Dashboard Components | 4 | 14 | Admin, passenger, station dashboards |
| UI Components | 5 | 27 | Navigation, announcements, footers |
| Transaction Management | 5 | 13 | Payments, transaction history |
| Integration Flows | 6 | 12 | End-to-end user workflows |
| Utility & API | 8 | 8 | API handlers, utility functions |

## 🔧 Common Test Patterns

### Basic Component Test
```javascript
test("renders component correctly", () => {
  render(<ComponentName />);
  expect(screen.getByText("Expected Text")).toBeInTheDocument();
});
```

### Router-Wrapped Component
```javascript
test("component with routing", () => {
  render(
    <MemoryRouter>
      <ComponentName />
    </MemoryRouter>
  );
  // assertions...
});
```

### API Mock Test
```javascript
test("handles API response", async () => {
  API.get.mockResolvedValue({ data: mockData });
  render(<ComponentName />);
  await waitFor(() => {
    expect(screen.getByText("Data")).toBeInTheDocument();
  });
});
```

### User Interaction Test
```javascript
test("handles button click", () => {
  render(<ComponentName />);
  fireEvent.click(screen.getByRole("button", { name: /click me/i }));
  expect(/* assertion */).toBeTruthy();
});
```

## 🎯 Testing Utilities

### Common Imports
```javascript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import { vi } from "vitest";
```

### Useful Screen Queries
```javascript
// By role (preferred)
screen.getByRole("button", { name: /login/i })
screen.getByRole("textbox", { name: /email/i })

// By label
screen.getByLabelText(/password/i)

// By text content
screen.getByText("Welcome")

// For forms
screen.getByDisplayValue("default value")
```

### Common Matchers
```javascript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveTextContent("text")
expect(element).toHaveAttribute("href", "/path")
expect(mockFunction).toHaveBeenCalledWith(args)
expect(mockFunction).toHaveBeenCalledTimes(1)
```

## 🛠 Mock Templates

### API Mock Setup
```javascript
vi.mock("../../api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

// In test
API.get.mockResolvedValue({ data: mockData });
API.post.mockRejectedValue(new Error("API Error"));
```

### LocalStorage Mock
```javascript
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key],
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });
```

### Window Alert Mock
```javascript
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
  configurable: true,
});
```

## 🔍 Debugging Tips

### Debug DOM Structure
```javascript
screen.debug(); // Print entire DOM
screen.debug(screen.getByRole("button")); // Print specific element
```

### Check Available Elements
```javascript
screen.logTestingPlaygroundURL(); // Get playground URL
```

### Mock Verification
```javascript
console.log(mockFunction.mock.calls); // See all mock calls
expect(mockFunction).toHaveBeenCalledWith(expectedArgs);
```

## ⚡ Performance Tips

1. **Use Specific Queries**: Prefer `getByRole` over `getByText`
2. **Minimize Setup**: Only mock what you need
3. **Clean Up**: Use `vi.clearAllMocks()` in `beforeEach`
4. **Async Handling**: Always use `waitFor` for async operations

## 🚨 Common Issues & Solutions

### "Unable to find element"
- Check if element exists: `screen.debug()`
- Verify component is properly wrapped with Router
- Use more specific queries

### Test Timeouts
- Increase timeout: `waitFor(() => {}, { timeout: 5000 })`
- Check API mocks are configured correctly
- Ensure async operations complete

### Mock Not Working
- Verify mock setup is in correct scope
- Clear mocks between tests
- Check import paths

## 📈 Test Health Metrics

### Coverage Goals
- **Unit Test Coverage**: 80%+ of components
- **Integration Coverage**: All major user flows
- **Critical Path Coverage**: 100% for auth and payments

### Quality Indicators
- ✅ No flaky tests
- ✅ Fast execution (< 10 seconds total)
- ✅ Clear test descriptions
- ✅ Minimal test dependencies

## 🔄 Test Maintenance

### Before Adding New Tests
1. Determine if unit or integration test is needed
2. Check existing patterns for similar components
3. Follow naming conventions
4. Include both success and error scenarios

### Regular Maintenance
- Run tests daily during development
- Review and refactor complex tests monthly
- Update dependencies quarterly
- Monitor test execution times

## 📚 Additional Resources

- [Full Documentation](./TEST_DOCUMENTATION.md)
- [Test Cleanup Summary](./TEST_CLEANUP_SUMMARY.md)
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

*Last Updated: July 13, 2025*
*Test Suite Version: 1.0.0*
