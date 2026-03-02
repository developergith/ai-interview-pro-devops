# Setup Checklist - AI-Interview Pro Frontend

Follow this checklist to get the app up and running.

## ✅ Pre-Setup

- [ ] Node.js 16+ installed (`node --version`)
- [ ] npm or yarn available (`npm --version`)
- [ ] Backend API source code ready
- [ ] Backend running on `http://localhost:5000`
- [ ] Text editor/IDE ready (VS Code recommended)

## ✅ Installation

- [ ] Navigate to project directory: `cd ai-interview-pro`
- [ ] Install dependencies: `npm install`
- [ ] Wait for installation to complete (1-2 minutes)
- [ ] No errors in installation output

## ✅ Configuration

### Backend Setup
- [ ] Backend code available
- [ ] Database set up (if needed)
- [ ] Environment variables configured
- [ ] Backend starts with `npm run dev` or equivalent
- [ ] Backend accessible at `http://localhost:5000`

### Frontend Verification
- [ ] `vite.config.js` has API proxy to `http://localhost:5000`
- [ ] `src/utils/api.js` has correct `API_BASE_URL`
- [ ] `tailwind.config.js` exists and is configured
- [ ] `package.json` has all required dependencies

## ✅ Start Development Server

```bash
npm run dev
```

- [ ] Terminal shows "VITE ready in XXX ms"
- [ ] Shows "Local: http://localhost:3000/"
- [ ] No error messages in terminal
- [ ] Dev server running without issues

## ✅ Browser Testing

### Open Application
- [ ] Open browser to `http://localhost:3000`
- [ ] Page loads without errors
- [ ] No console errors (F12 → Console)
- [ ] Logo and title visible

### Landing Page
- [ ] Hero section displays correctly
- [ ] "Ace Your Interviews with AI" headline visible
- [ ] Feature cards show 3 items
- [ ] Buttons styled correctly
- [ ] Layout responsive on mobile view

### Navigation
- [ ] "Login" button works
- [ ] "Register" button works
- [ ] All links navigate correctly
- [ ] No 404 errors

## ✅ Authentication Testing

### Register
- [ ] Navigate to `/register`
- [ ] Form displays all 4 fields
- [ ] Can type in all fields
- [ ] Validation works (try empty submit)
- [ ] Submit button shows loading state
- [ ] Success redirects to login

### Login
- [ ] Navigate to `/login`
- [ ] Form displays email and password fields
- [ ] Can type in fields
- [ ] Submit button works
- [ ] Check Network tab (DevTools) for `/auth/login` request
- [ ] Verify response includes `token` and `user`
- [ ] Token stored in localStorage (DevTools → Application → localStorage)
- [ ] Redirects to `/dashboard` after login

## ✅ Dashboard Testing

### After Login
- [ ] Dashboard displays
- [ ] Welcome message shows user name
- [ ] 4 stat cards visible (Interviews, Time, Success Rate, Improvement)
- [ ] 2 quick action cards visible
- [ ] Sidebar shows navigation items
- [ ] Theme toggle visible in sidebar

### Navigation
- [ ] "Generate Interview" button/link works
- [ ] "History" button/link works
- [ ] "Logout" button works
- [ ] Logout clears token and redirects to login

## ✅ Generate Interview Testing

### Form
- [ ] Navigate to `/generate`
- [ ] Job Role input visible
- [ ] Experience Level dropdown works
- [ ] Tech Stack input visible
- [ ] All fields have labels

### Submission
- [ ] Fill form with test data:
  - Job Role: "Frontend Developer"
  - Experience: "Intermediate"
  - Tech Stack: "React, Node.js"
- [ ] Click "Generate Questions"
- [ ] Loading spinner appears
- [ ] Check Network tab for `/interview/generate` POST request
- [ ] Request includes Authorization header

### Results
- [ ] Questions display below form
- [ ] Each question shows text and tips
- [ ] Copy button visible for each question
- [ ] Copy button works (click and check clipboard)
- [ ] Empty state shows if no questions

## ✅ History Testing

### View History
- [ ] Navigate to `/history`
- [ ] Page title shows "Interview History"
- [ ] "Refresh" button visible
- [ ] Check Network tab for `/interview/history` GET request

### Display
- [ ] If no history: Empty state with CTA button
- [ ] If history exists: Cards show for each interview
- [ ] Each card displays:
  - Job role
  - Date
  - Score (if available)
  - Duration (if available)
  - View button

### Stats
- [ ] Summary stats at bottom (total, average, roles)
- [ ] Stats calculate correctly

## ✅ Dark/Light Mode

### Theme Toggle
- [ ] Find theme toggle button (in sidebar)
- [ ] Toggle works
- [ ] Theme changes across app
- [ ] localStorage has `theme` key after toggle
- [ ] Refresh page - theme persists

## ✅ Responsive Design

### Mobile View (DevTools)
- [ ] Open DevTools (F12)
- [ ] Click device toggle (responsive view)
- [ ] Select iPhone 12 or similar
- [ ] Hamburger menu visible
- [ ] Click menu - sidebar opens
- [ ] Click menu item - sidebar closes
- [ ] Layout adapts to narrow width

### Tablet View
- [ ] Select iPad in device options
- [ ] Two-column layout appears
- [ ] Sidebar visible
- [ ] All content readable

### Desktop View
- [ ] Reset to full width
- [ ] Sidebar always visible
- [ ] Proper spacing
- [ ] No horizontal scroll

## ✅ Error Handling

### Invalid Login
- [ ] Try login with wrong password
- [ ] Error message displays
- [ ] No redirect to dashboard
- [ ] Can try again

### Network Error
- [ ] Stop backend server
- [ ] Try API call (generate questions)
- [ ] Error message shows
- [ ] App doesn't crash

### API Timeout
- [ ] With very slow API (simulate), see loading state
- [ ] Spinner shows
- [ ] Can interact after response

## ✅ Console Checks

### No Errors
- [ ] Open DevTools Console (F12)
- [ ] No red error messages
- [ ] No orange warnings about missing props
- [ ] Check for 404s or failed requests

### Network Requests
- [ ] Network tab shows API requests
- [ ] Requests have proper method (POST/GET)
- [ ] Status codes are 200, 201 (success)
- [ ] Authorization header present

### Storage
- [ ] Application → localStorage
- [ ] After login: `token` key exists
- [ ] After login: `user` key exists
- [ ] After logout: Both keys cleared

## ✅ API Integration

### Request Headers
- [ ] Authorization: `Bearer <token>` included
- [ ] Content-Type: `application/json` set
- [ ] CORS errors: None

### Response Format
- [ ] Register response has `user` and `token`
- [ ] Login response has `user` and `token`
- [ ] Generate response has `questions` array
- [ ] History response has `interviews` array

## ✅ Component Verification

### Pages Load
- [ ] Landing - no errors
- [ ] Register - no errors
- [ ] Login - no errors
- [ ] Dashboard - no errors (when authenticated)
- [ ] Generate - no errors (when authenticated)
- [ ] History - no errors (when authenticated)

### Components Render
- [ ] Buttons have correct variants
- [ ] Inputs show validation errors
- [ ] Cards have proper styling
- [ ] Sidebar toggles on mobile
- [ ] Theme toggle works

## ✅ Performance

### Page Load
- [ ] Initial page load < 3 seconds
- [ ] No lag when typing in forms
- [ ] Smooth button clicks
- [ ] Fast page transitions

### Network
- [ ] API calls complete in < 2 seconds
- [ ] No failed requests
- [ ] No duplicate requests

## ✅ Final Verification

- [ ] App is fully functional
- [ ] No console errors
- [ ] Authentication works
- [ ] Protected routes work
- [ ] All pages display correctly
- [ ] Responsive on all sizes
- [ ] Dark/light mode works
- [ ] API integration successful
- [ ] Ready to start development

## ✅ Next Steps

- [ ] Read README.md for full documentation
- [ ] Check QUICKSTART.md for common tasks
- [ ] Review API_INTEGRATION.md for API details
- [ ] Study STRUCTURE.md for code organization
- [ ] Make your first customization (colors, text, etc.)
- [ ] Deploy to Vercel/Netlify when ready

## 🆘 Troubleshooting

### Issue: "Cannot find module 'react'"
**Fix**: Run `npm install` again

### Issue: "ECONNREFUSED on :5000"
**Fix**: Start backend server on port 5000

### Issue: "Module not found vite"
**Fix**: Run `npm install`, then `npm run dev`

### Issue: "Styles not applying"
**Fix**: Restart dev server with `npm run dev`

### Issue: "Login fails silently"
**Fix**: Check Network tab, verify API response, check backend logs

### Issue: "Blank page after login"
**Fix**: Check console for errors, verify token in localStorage

### Issue: "Theme toggle not working"
**Fix**: Check ThemeProvider wraps App, check localStorage 'theme' key

## ✅ Successful Setup Indicators

You know everything is working when:
1. ✅ App loads at http://localhost:3000
2. ✅ Can register new account
3. ✅ Can login successfully
4. ✅ Dashboard displays with user name
5. ✅ Can generate interview questions
6. ✅ Questions display with copy button
7. ✅ Can view interview history
8. ✅ Logout clears authentication
9. ✅ Dark/light mode toggles
10. ✅ Layout responds to mobile view
11. ✅ No errors in console
12. ✅ All API requests have status 200/201

---

**Congratulations!** 🎉

Your AI-Interview Pro frontend is fully set up and ready for development.

Start making it your own:
1. Customize colors in `tailwind.config.js`
2. Update text content in pages
3. Add new features
4. Deploy to production

Happy coding! 🚀
