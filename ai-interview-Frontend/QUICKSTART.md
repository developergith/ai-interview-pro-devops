# Quick Start Guide - AI-Interview Pro Frontend

Get up and running in 5 minutes!

## 1. Prerequisites

- Node.js 16+ installed
- Backend API running on `http://localhost:5000`
- Git (optional)

## 2. Installation

```bash
# Clone or download the project
cd ai-interview-pro

# Install dependencies
npm install

# This may take a minute...
```

## 3. Start Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

You should see this in the terminal:
```
  VITE v5.0.8 ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

## 4. Test the App

### Landing Page
1. Open http://localhost:3000
2. See hero section with "Ace Your Interviews with AI"
3. Click "Register" or "Get Started Free"

### Register
1. Fill in name, email, password
2. Click "Create Account"
3. Should redirect to login page

### Login
1. Use credentials from registration
2. Click "Sign In"
3. Should redirect to dashboard

### Dashboard
1. See welcome message with your name
2. View stats (all will be 0 initially)
3. Click "Generate Interview" or "View History"

### Generate Interview
1. Fill in job role (e.g., "Frontend Developer")
2. Select experience level
3. Enter tech stack (comma-separated, e.g., "React, Node.js")
4. Click "Generate Questions"
5. Questions should appear below form
6. Click copy icon to copy any question

### History
1. Fetch will show empty state initially
2. Once you generate interviews, they appear here
3. Shows score, date, role information

## 5. Key Files to Know

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with routes |
| `src/pages/` | All page components |
| `src/components/` | Reusable UI components |
| `src/context/` | Auth and theme state |
| `src/utils/api.js` | API client setup |
| `tailwind.config.js` | Color and styling theme |
| `vite.config.js` | Dev server proxy to backend |

## 6. Common Tasks

### Add a New Page

1. Create `src/pages/NewPage.jsx`
2. Add route in `src/App.jsx`:
   ```jsx
   <Route path="/new" element={<NewPage />} />
   ```

### Add a New Component

1. Create `src/components/NewComponent.jsx`
2. Use existing components as templates
3. Import and use in pages

### Update Colors

1. Edit `tailwind.config.js`
2. Update color values
3. Changes apply automatically

### Change API URL

1. Edit `src/utils/api.js`
2. Change `API_BASE_URL` constant
3. Or update `vite.config.js` proxy

## 7. Troubleshooting

### "Cannot GET /api/..."
**Problem**: Backend not running or API URL is wrong

**Fix**:
1. Start backend: `npm run dev` (in backend directory)
2. Ensure it's on http://localhost:5000
3. Check `vite.config.js` proxy config

### "Module not found: axios"
**Problem**: Dependencies not installed

**Fix**:
```bash
npm install
```

### "Token missing when calling API"
**Problem**: Not authenticated

**Fix**:
1. Login first
2. Check localStorage has 'token' key (DevTools → Application → localStorage)
3. Check browser console for errors

### "Styles not applying"
**Problem**: Tailwind CSS not compiled

**Fix**:
```bash
# Restart dev server
npm run dev
```

### "Theme not switching"
**Problem**: Theme provider not initialized

**Fix**:
1. Check App.jsx has `<ThemeProvider>` wrapper
2. Check browser console for React errors
3. Clear browser cache and restart

## 8. Development Workflow

### Make a Change
1. Edit a file in `src/`
2. Save the file
3. Browser auto-refreshes (HMR)
4. See changes instantly

### Check Network Requests
1. Open DevTools (F12)
2. Go to Network tab
3. Make API calls
4. See request/response details

### Debug State
1. Open DevTools Console
2. Type `localStorage.getItem('token')` to check token
3. Type `localStorage.getItem('user')` to check user info
4. Use `console.log()` in code

### Test in Mobile View
1. Open DevTools
2. Click device toggle icon (top-left of DevTools)
3. Select "iPhone 12" or "iPad"
4. See responsive layout

## 9. Building for Production

```bash
# Create optimized build
npm run build

# Output goes to 'dist/' folder
# This is what you deploy to production

# Test the production build
npm run preview

# Open http://localhost:4173 to view
```

## 10. Deployment

### Deploy to Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect GitHub repo in Netlify
3. Auto-deploys on push

### Deploy to Any Host
1. Run `npm run build`
2. Upload `dist/` folder to host
3. Configure server to serve `index.html` for all routes

## 11. Environment Variables (Optional)

Create `.env.local` if you need:
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=AI-Interview Pro
```

Access in code:
```jsx
const apiUrl = import.meta.env.VITE_API_URL;
```

## 12. API Endpoints Quick Reference

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| POST | `/auth/register` | No | Create account |
| POST | `/auth/login` | No | Login user |
| POST | `/interview/generate` | Yes | Generate questions |
| GET | `/interview/history` | Yes | Get past interviews |

See `API_INTEGRATION.md` for full details.

## 13. Package.json Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 14. Browser DevTools

### React DevTools
1. Install React DevTools browser extension
2. See component tree in DevTools
3. Inspect props and state

### Network DevTools
1. F12 → Network tab
2. See all API requests
3. Check request/response headers
4. Verify Authorization header

### Storage DevTools
1. F12 → Application tab
2. Storage → localStorage
3. Check 'token' and 'user' values
4. Clear to force re-login

## 15. Next Steps

1. **Customize**: Update colors, fonts, content in components
2. **Deploy**: Push to production using Vercel/Netlify
3. **Connect Backend**: Ensure API matches expected formats
4. **Add Features**: Add new pages, components, or functionality
5. **Style**: Update Tailwind config or component styles

## 16. Getting Help

1. Check console for error messages (F12)
2. Read API_INTEGRATION.md for API details
3. Read STRUCTURE.md for project organization
4. Check README.md for full documentation
5. Verify backend is running and accessible

## 17. Project Structure (One-liner)

```
src/
├── pages/       ← All page components
├── components/  ← Reusable UI pieces
├── context/     ← Auth & theme state
├── routes/      ← Protected route wrapper
├── utils/       ← API client setup
└── App.jsx      ← Main app & router
```

---

**That's it!** You now have a fully functional AI-Interview Pro frontend ready to develop and deploy. Happy coding! 🚀
