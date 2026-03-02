# AI-Interview Pro - Complete Setup Guide

This guide walks you through setting up and running the **AI-Interview Pro** SaaS frontend.

## ✅ Prerequisites

Before starting, ensure you have:

- **Node.js** v16 or higher ([Download](https://nodejs.org))
- **npm** or **pnpm** (pnpm recommended for faster installs)
- **Backend API** running at `http://localhost:5000/api`
- A modern web browser (Chrome, Firefox, Safari, Edge)

Verify installation:
```bash
node --version      # Should be v16+
npm --version       # Or 'pnpm --version'
```

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies
```bash
cd ai-interview-pro
pnpm install
```

### Step 2: Start Development Server
```bash
pnpm dev
```

### Step 3: Open in Browser
```
http://localhost:5173
```

The app should open automatically. If not, click the link above.

---

## 📋 Step-by-Step Setup Guide

### 1. Clone/Download the Project

```bash
# If using git
git clone <your-repo>
cd ai-interview-pro

# Or navigate to the project folder
cd /path/to/ai-interview-pro
```

### 2. Install Dependencies

**Using pnpm (Recommended)**
```bash
pnpm install
```

**Using npm**
```bash
npm install
```

**Using yarn**
```bash
yarn install
```

### 3. Configure Backend API (Optional)

If your backend runs on a different port/URL, update:

**File:** `src/utils/api.js`
```javascript
const API_BASE_URL = 'http://localhost:5000/api';  // Change this
```

Examples:
```javascript
// Production
const API_BASE_URL = 'https://api.aiinterviewpro.com/api';

// Different port
const API_BASE_URL = 'http://localhost:3001/api';

// Remote development
const API_BASE_URL = 'https://staging-api.example.com/api';
```

### 4. Start Development Server

```bash
pnpm dev
```

Output:
```
VITE v5.0.8  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Press h to show help
```

### 5. Open in Browser

Visit `http://localhost:5173` in your browser.

---

## 🎯 Testing the Application

### Test Workflow

1. **Landing Page**
   - Verify hero section displays
   - Click "Register" button

2. **Register**
   - Enter: Name, Email, Password
   - Click "Create Account"
   - Should redirect to Login after 2 seconds

3. **Login**
   - Enter registered email & password
   - Click "Sign In"
   - Should redirect to Dashboard

4. **Dashboard**
   - Verify welcome message
   - Check sidebar navigation
   - Click "Generate Interview"

5. **Generate Interview**
   - Enter Job Role: "Senior Frontend Engineer"
   - Select Level: "Senior (5+ years)"
   - Enter Tech Stack: "React, Node.js, AWS"
   - Click "Generate Questions"
   - Should show generated questions

6. **History Page**
   - Click "Interview History" in sidebar
   - Should show list of interviews

7. **Logout**
   - Click "Logout" in sidebar
   - Should redirect to Landing page

---

## 🛠️ Configuration Guide

### Change API Endpoint

**File:** `src/utils/api.js`

```javascript
// Line 3
const API_BASE_URL = 'http://your-api-url/api';
```

### Change Theme Colors

**File:** `tailwind.config.js`

```javascript
colors: {
  primary: '#6366f1',      // Main brand color
  secondary: '#8b5cf6',    // Secondary color
  accent: '#ec4899',       // Accent/danger color
  background: '#0f172a',   // Page background
  foreground: '#f1f5f9',   // Text color
  muted: '#64748b',        // Muted text
  card: '#1e293b',         // Card background
}
```

Example: Change to blue theme
```javascript
colors: {
  primary: '#0066ff',
  secondary: '#003d99',
  accent: '#ff6600',
  // ... rest of colors
}
```

### Customize App Title & Description

**File:** `index.html`

```html
<meta name="description" content="Your new description">
<title>Your App Name - Your Tagline</title>
```

### Environment Variables (Optional)

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI-Interview Pro
```

Then use in code:
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL;
```

---

## 📦 Build for Production

### Create Optimized Build

```bash
pnpm build
```

Output:
```
dist/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
```

### Preview Production Build

```bash
pnpm preview
```

Then visit `http://localhost:4173`

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms

**Netlify:**
```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
# Update vite.config.js
export default {
  base: '/repository-name/',
  // ...
}
```

---

## 🔧 Troubleshooting

### Issue: Port 5173 Already in Use

**Solution:** Change port in `vite.config.js`

```javascript
server: {
  port: 3000,  // Use 3000 instead
  open: true,
}
```

### Issue: Cannot Connect to API

**Check:**
1. Is backend running? (`http://localhost:5000`)
2. Is API URL correct in `src/utils/api.js`?
3. Are CORS headers enabled on backend?
4. Check browser console for errors

**Fix CORS (Backend):**
```javascript
// Node.js/Express
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Issue: Login Not Working

**Steps:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. Check for error messages
4. Go to Network tab
5. Verify login request succeeds (200 status)
6. Check if token is in localStorage:
```javascript
localStorage.getItem('token')
```

### Issue: Blank Screen After Login

**Solution:** Clear localStorage and try again
```javascript
localStorage.clear()
location.reload()
```

### Issue: Hot Module Replacement (HMR) Not Working

**Solution:** Update `vite.config.js`

```javascript
server: {
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    port: 5173,
  }
}
```

### Issue: CSS Not Loading

**Solution:** Rebuild Tailwind CSS
```bash
pnpm install
pnpm dev
```

---

## 📱 Testing on Mobile

### Local Network Access

1. Find your computer IP:
```bash
# macOS/Linux
ifconfig | grep inet

# Windows
ipconfig
```

2. Update `vite.config.js`:
```javascript
server: {
  host: '0.0.0.0',  // Listen on all interfaces
}
```

3. Access from phone:
```
http://YOUR_IP:5173
```

### Using Mobile Emulator

**Chrome DevTools:**
1. Press F12
2. Click device icon (top-left)
3. Select device from dropdown

---

## 📚 Project Structure Quick Reference

```
ai-interview-pro/
├── src/
│   ├── pages/          ← Page components
│   ├── components/     ← Reusable components
│   ├── context/        ← State management
│   ├── utils/          ← Utilities (API, helpers)
│   ├── routes/         ← Route guards
│   ├── App.jsx         ← Main app
│   └── index.css       ← Global styles
├── vite.config.js      ← Vite configuration
├── tailwind.config.js  ← Tailwind configuration
├── package.json        ← Dependencies
└── index.html          ← HTML entry point
```

---

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change API URL to production URL
- [ ] Update theme colors and branding
- [ ] Remove console.log statements
- [ ] Enable HTTPS on backend
- [ ] Set secure cookie flags
- [ ] Add rate limiting to API
- [ ] Configure CORS properly
- [ ] Use environment variables
- [ ] Test on real devices
- [ ] Security audit completed

---

## 📞 Getting Help

### Check Documentation
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Detailed file guide
- [README_AIPRO.md](./README_AIPRO.md) - Feature overview

### Debug Mode

Enable debug logging by adding to `src/utils/api.js`:

```javascript
api.interceptors.response.use(
  (response) => {
    console.log('[API]', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('[API Error]', error.config.url, error.response?.status);
    return Promise.reject(error);
  }
);
```

### Contact Support
- Check browser console (F12) for errors
- Verify backend is running
- Clear cache: Ctrl+Shift+Delete

---

## 🎉 Success!

You're ready to start developing AI-Interview Pro! 

### Next Steps:
1. Customize colors and branding
2. Connect to your backend API
3. Add additional features
4. Deploy to production

Happy coding! 🚀

---

**Last Updated:** February 2024
**Version:** 1.0.0
