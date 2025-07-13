# RailLynk Developer Setup Guide

## 🚀 Quick Start

This guide will help you set up the RailLynk development environment on your local machine. Follow these steps to get the project running quickly and efficiently.

## 📋 Prerequisites

### Required Software
- **Node.js** >= 18.0.0 ([Download here](https://nodejs.org/))
- **npm** >= 9.0.0 (comes with Node.js)
- **Git** ([Download here](https://git-scm.com/))
- **Code Editor** (VS Code recommended)

### Recommended Tools
- **React Developer Tools** (Browser extension)
- **VS Code Extensions**:
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter
  - ESLint
  - Auto Rename Tag
  - Bracket Pair Colorizer

### System Requirements
- **RAM**: Minimum 4GB, Recommended 8GB+
- **Storage**: At least 2GB free space
- **OS**: Windows 10+, macOS 10.14+, or Linux

## 🔧 Installation Steps

### 1. Clone the Repository
```bash
# Clone the project
git clone <repository-url>
cd raillynk

# Check repository structure
ls -la
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install

# This will install:
# - React 19.0.0
# - Vite 6.1.0
# - All development and testing dependencies
```

### 3. Environment Configuration
```bash
# Create environment file (if needed)
cp .env.example .env

# Edit environment variables
nano .env
```

**Environment Variables:**
```bash
# .env file
VITE_API_BASE_URL=https://raillynk.site/api/
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
VITE_APP_NAME=RailLynk
VITE_APP_VERSION=0.0.0
```

### 4. Start Development Server
```bash
# Start the development server
npm run dev

# The server will start on http://localhost:5173
# Hot reload is enabled by default
```

### 5. Verify Installation
```bash
# Run tests to ensure everything is working
npm test -- --run

# Check linting
npm run lint

# Build production version to test
npm run build
```

## 🛠️ Development Workflow

### Daily Development Commands
```bash
# Start development server
npm run dev

# Run tests in watch mode
npm test

# Run linting
npm run lint

# Format code
npx prettier --write src/

# Build for production
npm run build

# Preview production build
npm run preview
```

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
git add .
git commit -m "Add: Your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request through GitHub/GitLab
```

## 📁 Project Structure Overview

```
raillynk/
├── public/                    # Static assets
│   ├── railways_lka.geojson  # Map data
│   └── vite.svg              # Favicon
├── src/                      # Source code
│   ├── components/           # Reusable components
│   ├── pages/               # Route components
│   ├── styles/              # CSS files
│   ├── __test__/            # Test files
│   ├── assets/              # Images, icons
│   ├── mocks/               # Test mocks
│   ├── api.js               # API configuration
│   ├── constants.js         # App constants
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── package.json             # Dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint rules
└── README.md               # Basic project info
```

## 🔌 IDE Setup

### VS Code Configuration

#### Settings (`.vscode/settings.json`)
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  },
  "files.associations": {
    "*.jsx": "javascriptreact"
  }
}
```

#### Extensions (`.vscode/extensions.json`)
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

### Code Snippets
Create custom React snippets in VS Code:

#### React Functional Component
```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "import './$1.css';",
      "",
      "const $1 = () => {",
      "  return (",
      "    <div className=\"$2\">",
      "      $0",
      "    </div>",
      "  );",
      "};",
      "",
      "export default $1;"
    ],
    "description": "Create a React functional component"
  }
}
```

## 🧪 Testing Setup

### Running Tests
```bash
# Run all tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test Login.test.jsx

# Run tests matching pattern
npm test -- --grep "authentication"
```

### Test File Structure
```bash
src/__test__/
├── integration/              # End-to-end tests
│   ├── Login.integration.test.jsx
│   └── AdminDashboard.test.jsx
├── unit/                     # Component tests
│   ├── Login.test.jsx
│   ├── Navbar.test.jsx
│   └── ProtectedRoute.test.jsx
└── mocks/                    # Test mocks
    ├── handlers.js
    └── server.js
```

### Writing Your First Test
```javascript
// src/__test__/unit/MyComponent.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MyComponent from '../../components/MyComponent';

describe('MyComponent', () => {
  test('renders correctly', () => {
    render(
      <MemoryRouter>
        <MyComponent />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    render(
      <MemoryRouter>
        <MyComponent />
      </MemoryRouter>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(screen.getByText('Button Clicked')).toBeInTheDocument();
  });
});
```

## 🔧 Configuration Files

### Vite Configuration (`vite.config.js`)
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.js",
  },
});
```

### ESLint Configuration (`eslint.config.js`)
```javascript
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
```

## 🌐 API Integration Setup

### API Configuration
```javascript
// src/api.js - Already configured
import axios from 'axios';

const api = axios.create({
  baseURL: "https://raillynk.site/api/",
  timeout: 10000,
});

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Testing API Calls
```javascript
// Use in components
import API from '../api';

const fetchData = async () => {
  try {
    const response = await API.get('/endpoint');
    setData(response.data);
  } catch (error) {
    console.error('API Error:', error);
    setError(error.message);
  }
};
```

## 🎨 Styling Setup

### CSS Structure
```bash
src/styles/
├── index.css               # Global styles
├── App.css                 # App component styles
├── navbar.css              # Navigation styles
├── login.css               # Login page styles
├── adminDashboard.css      # Dashboard styles
└── ...                     # Component-specific styles
```

### CSS Variables (Global)
```css
/* src/index.css */
:root {
  /* Colors */
  --primary-color: #1e40af;
  --secondary-color: #059669;
  --danger-color: #dc2626;
  --warning-color: #f59e0b;
  --success-color: #10b981;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Typography */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  
  /* Layout */
  --max-width: 1200px;
  --border-radius: 0.375rem;
  --box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
}
```

## 🐛 Debugging Setup

### Browser Developer Tools
1. **React Developer Tools**
   - Install browser extension
   - Inspect component props and state
   - Profile component performance

2. **Network Tab**
   - Monitor API requests
   - Check response data
   - Debug CORS issues

3. **Console Logging**
   ```javascript
   // Debug patterns
   console.log('Component rendered:', { props, state });
   console.error('API Error:', error);
   console.table(arrayData);
   ```

### VS Code Debugging
Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/vite",
      "args": ["dev"],
      "console": "integratedTerminal",
      "restart": true,
      "protocol": "inspector",
      "env": {
        "NODE_ENV": "development"
      }
    }
  ]
}
```

## 🚀 Performance Optimization

### Development Performance
```bash
# Enable hot module replacement
npm run dev

# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/

# Check for unused dependencies
npx depcheck
```

### Code Splitting Example
```javascript
// Lazy load components
import { lazy, Suspense } from 'react';

const AdminDashboard = lazy(() => import('./components/AdminDashboard'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
```

## 📦 Package Management

### Dependencies Overview
```bash
# Core dependencies
react: ^19.0.0              # UI framework
react-router-dom: ^7.2.0     # Routing
axios: ^1.7.9                # HTTP client
recharts: ^2.15.4            # Charts
leaflet: ^1.9.4              # Maps

# Development dependencies
vite: ^6.1.0                 # Build tool
vitest: ^3.0.5               # Testing
eslint: ^9.19.0              # Linting
@testing-library/react: ^16.2.0  # Testing utilities
```

### Adding New Dependencies
```bash
# Add production dependency
npm install package-name

# Add development dependency
npm install --save-dev package-name

# Update all dependencies
npm update

# Check for outdated packages
npm outdated
```

## 🔒 Security Considerations

### Environment Variables
```bash
# Never commit sensitive data
# Use VITE_ prefix for client-side variables
VITE_PUBLIC_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0

# Keep secrets server-side only
API_SECRET_KEY=your-secret-key  # This won't be exposed
```

### Code Security
```javascript
// Sanitize user inputs
const sanitizeInput = (input) => {
  return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};

// Validate API responses
const validateApiResponse = (data) => {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid API response');
  }
  return data;
};
```

## 📈 Monitoring & Analytics

### Development Monitoring
```javascript
// Performance monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### Error Tracking
```javascript
// Error boundary implementation
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }
}
```

## 🎯 Common Issues & Solutions

### Installation Issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use specific Node.js version
nvm use 18
npm install
```

### Development Server Issues
```bash
# Port already in use
npm run dev -- --port 3000

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Build Issues
```bash
# Clear build directory
rm -rf dist
npm run build

# Check for TypeScript errors
npx tsc --noEmit
```

## 📚 Learning Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [Vitest Documentation](https://vitest.dev/)

### Tutorials
- [React Tutorial](https://react.dev/learn)
- [Modern JavaScript](https://javascript.info/)
- [CSS Grid & Flexbox](https://css-tricks.com/)

### Community
- [React Community](https://reactjs.org/community/support.html)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/reactjs)
- [GitHub Discussions](https://github.com/facebook/react/discussions)

## 🤝 Contributing

### Code Style
- Use functional components with hooks
- Follow ESLint rules
- Write descriptive commit messages
- Add tests for new features
- Update documentation

### Pull Request Process
1. Create feature branch
2. Make changes with tests
3. Run linting and tests
4. Update documentation
5. Create pull request
6. Address review feedback

---

*Developer Setup Guide Version: 1.0.0*  
*Last Updated: July 13, 2025*  
*Maintainer: RailLynk Development Team*
