# AI-Interview Pro - Quick Reference Card

## 🚀 Start Development
```bash
pnpm install
pnpm dev
# Open: http://localhost:5173
```

## 📁 File Locations

| What | Where |
|------|-------|
| Pages | `src/pages/*.jsx` |
| Components | `src/components/*.jsx` |
| Auth State | `src/context/AuthContext.jsx` |
| API Config | `src/utils/api.js` |
| Routes | `src/App.jsx` |
| Styles | `src/index.css` |
| Colors | `tailwind.config.js` |

## 🎨 Color Changes
Edit `tailwind.config.js`:
```javascript
primary: '#6366f1',      // Change main color
secondary: '#8b5cf6',    // Change secondary
accent: '#ec4899',       // Change accent
```

## 🔌 API Configuration
Edit `src/utils/api.js` line 3:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📱 Component Usage

### Button
```jsx
<Button variant="primary" loading={false} fullWidth>
  Click Me
</Button>
```

### Input
```jsx
<Input 
  label="Email" 
  error={errors.email}
  onChange={handleChange}
/>
```

### Card
```jsx
<Card className="p-6">
  Content
</Card>
```

## 🔐 Authentication

### Login User
```javascript
const { login } = useAuth();
login(userData, jwtToken);
```

### Get Auth State
```javascript
const { user, token, isAuthenticated } = useAuth();
```

### Logout
```javascript
const { logout } = useAuth();
logout();
```

## 🔗 API Calls

### Register
```javascript
import { authAPI } from '../utils/api';
await authAPI.register({ name, email, password });
```

### Login
```javascript
const response = await authAPI.login({ email, password });
const { user, token } = response.data;
login(user, token);
```

### Generate Questions
```javascript
const response = await interviewAPI.generate({
  jobRole: 'Senior Frontend Engineer',
  experienceLevel: 'senior',
  techStack: 'React, Node.js'
});
```

### Get History
```javascript
const response = await interviewAPI.getHistory();
const interviews = response.data.interviews;
```

## 🛣️ Routes

| URL | Page | Protected |
|-----|------|-----------|
| `/` | Landing | ❌ |
| `/login` | Login | ❌ |
| `/register` | Register | ❌ |
| `/dashboard` | Dashboard | ✅ |
| `/generate` | Generate | ✅ |
| `/history` | History | ✅ |

## 🚢 Build & Deploy

### Build
```bash
pnpm build
```

### Preview Build
```bash
pnpm preview
```

### Deploy to Vercel
```bash
npm i -g vercel
vercel
```

## 🐛 Troubleshoot

### Port in Use?
Change `vite.config.js`:
```javascript
server: { port: 3000 }
```

### API Not Connecting?
- Check backend running: `http://localhost:5000`
- Update API URL in `src/utils/api.js`
- Check CORS on backend

### Login Not Working?
```javascript
// Clear storage
localStorage.clear()
location.reload()
```

## 📦 Install New Package
```bash
pnpm add package-name
```

## 📝 Create New Page

1. Create file: `src/pages/NewPage.jsx`
2. Import layout: `import Sidebar from '../components/Sidebar'`
3. Add route in `src/App.jsx`

## 🎨 Tailwind Classes

| Class | Purpose |
|-------|---------|
| `flex` | Flexbox layout |
| `gap-4` | Add spacing |
| `rounded-xl` | Rounded corners |
| `shadow-lg` | Add shadow |
| `hover:` | Hover state |
| `md:` | Tablet breakpoint |
| `lg:` | Desktop breakpoint |

## 💾 Save Changes

Files auto-reload with HMR (Hot Module Replacement). Just save and browser updates!

## 📚 Learn More

- **Full Setup**: See `SETUP_GUIDE.md`
- **Features**: See `README_AIPRO.md`
- **Files**: See `PROJECT_STRUCTURE.md`
- **Summary**: See `IMPLEMENTATION_SUMMARY.md`

## 🎯 Common Tasks

### Add New Page
```jsx
// src/pages/NewPage.jsx
import Sidebar from '../components/Sidebar';

export default function NewPage() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        Your content
      </main>
    </div>
  );
}
```

### Add Protected Route
```jsx
// In src/App.jsx
<Route
  path="/newpage"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

### Make API Call
```javascript
import { authAPI, interviewAPI } from '../utils/api';

const response = await interviewAPI.generate(data);
```

### Use Auth
```javascript
import { useAuth } from '../context/AuthContext';

const { user, token, login, logout } = useAuth();
```

## 🎨 Theme Colors Quick Test

Change `tailwind.config.js` and refresh:
```javascript
primary: '#ff0000',        // Red
secondary: '#00ff00',      // Green  
accent: '#0000ff',         // Blue
```

## 📱 Test Responsive

Press F12 in browser → Click phone icon → Select device

## ✅ Pre-Deployment Checklist

- [ ] Update API URL
- [ ] Test all pages
- [ ] Test auth flows
- [ ] Check mobile view
- [ ] Build successful: `pnpm build`
- [ ] No console errors

---

**Keep this handy while developing!** 🚀
