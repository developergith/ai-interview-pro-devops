# AI-Interview Pro - Production-Ready SaaS Frontend

A modern, fully-featured React + Vite frontend for an AI-powered interview preparation SaaS application. Built with clean code patterns, responsive design, and comprehensive authentication.

## 🎯 Quick Start

### Prerequisites
- Node.js 16+ and npm/pnpm
- Backend API running at `http://localhost:5000/api`

### Installation & Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Build optimized bundle
pnpm build

# Preview production build
pnpm preview
```

## 📋 Project Overview

**AI-Interview Pro** is a complete SaaS frontend that helps job seekers prepare for interviews using AI-generated questions, progress tracking, and smart feedback. The project is production-ready with proper error handling, loading states, and responsive design.

### Key Features

✅ **Authentication System**
- User registration with validation
- JWT-based login
- Automatic session persistence
- Protected routes with auth guards

✅ **Interview Generation**
- AI-powered question generation
- Job role customization
- Experience level selection
- Tech stack filtering
- Copy-to-clipboard functionality

✅ **Progress Tracking**
- Interview history with dates
- Performance scores
- Question statistics
- Tech stack tags

✅ **Modern UI/UX**
- Dark/Light theme support
- Fully responsive design
- Smooth animations
- Loading spinners & states
- Comprehensive error handling

✅ **Developer Experience**
- Clean component architecture
- Reusable components (Button, Card, Input)
- Context API for state management
- Axios with request/response interceptors
- Proper TypeScript support

## 📁 Complete File Structure

```
src/
├── pages/
│   ├── Landing.jsx              # Public landing page
│   ├── Login.jsx                # User login
│   ├── Register.jsx             # User registration
│   ├── Dashboard.jsx            # Main dashboard
│   ├── GenerateInterview.jsx    # Question generator
│   └── History.jsx              # Interview history
│
├── components/
│   ├── Button.jsx               # Reusable button (primary, secondary, ghost, accent)
│   ├── Card.jsx                 # Reusable card container
│   ├── Input.jsx                # Form input with validation
│   ├── Sidebar.jsx              # Navigation sidebar (responsive)
│   └── ThemeToggle.jsx          # Dark/Light mode toggle
│
├── context/
│   ├── AuthContext.jsx          # Auth state & login/logout logic
│   └── ThemeContext.jsx         # Theme state management
│
├── routes/
│   └── ProtectedRoute.jsx       # Auth-protected route wrapper
│
├── utils/
│   └── api.js                   # Axios client with interceptors
│
├── App.jsx                      # Main app with routing
├── main.jsx                     # React entry point
└── index.css                    # Tailwind CSS & globals
```

## 🔧 Core Technologies

| Technology | Purpose |
|-----------|---------|
| **React 18.3** | UI framework |
| **Vite 5.0** | Lightning-fast build tool |
| **Tailwind CSS 3.3** | Utility-first CSS |
| **React Router 6.20** | Client-side routing |
| **Axios 1.6** | HTTP client |
| **Lucide React 0.292** | Icon library |

## 🛠️ Configuration

### API Configuration
Update the API base URL in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Theme Colors
Customize colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',      // Indigo
  secondary: '#8b5cf6',    // Purple
  accent: '#ec4899',       // Pink
  background: '#0f172a',   // Dark
  foreground: '#f1f5f9',   // Light
  muted: '#64748b',        // Gray
  card: '#1e293b',         // Card bg
}
```

## 🔐 Authentication Flow

### Registration
```
1. User fills registration form (name, email, password)
2. Submit → POST /auth/register
3. Backend validates & creates user
4. Redirect to login page
```

### Login
```
1. User enters email & password
2. Submit → POST /auth/login
3. Backend returns JWT token
4. Token stored in localStorage
5. Redirect to dashboard
```

### Protected Routes
```
1. User accesses /dashboard, /generate, or /history
2. ProtectedRoute checks for token
3. If no token → Redirect to /login
4. If token exists → Load protected page
```

### API Requests
```javascript
// All requests automatically include token
axios.post('/interview/generate', data, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
```

## 📊 API Endpoints Expected

### Authentication
```
POST /auth/register
Body: { name, email, password }
Response: { userId, email, name }

POST /auth/login
Body: { email, password }
Response: { user: { id, name, email }, token: "jwt..." }
```

### Interview Management
```
POST /interview/generate
Headers: Authorization: Bearer {token}
Body: { jobRole, experienceLevel, techStack }
Response: { questions: [...] }

GET /interview/history
Headers: Authorization: Bearer {token}
Response: { interviews: [...] }
```

## 🎨 Component API

### Button Component
```jsx
<Button 
  variant="primary"      // primary, secondary, ghost, accent
  loading={false}        // Shows spinner
  fullWidth={false}      // Stretch to full width
  disabled={false}       // Disable button
  onClick={handler}
>
  Click me
</Button>
```

### Input Component
```jsx
<Input
  label="Email"
  name="email"
  type="email"
  placeholder="you@example.com"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}   // Error message
/>
```

### Card Component
```jsx
<Card className="p-6">
  Content goes here
</Card>
```

## 🔄 State Management

### Auth Context
```javascript
const { 
  user,              // Current user object
  token,             // JWT token
  isAuthenticated,   // Boolean
  login,             // Login function
  logout,            // Logout function
  error,             // Auth error
  setAuthError       // Set error
} = useAuth();
```

### Theme Context
```javascript
const { 
  isDark,            // Boolean
  toggleTheme        // Toggle function
} = useTheme();
```

## 📱 Responsive Design

- **Mobile**: Full-width, mobile menu toggle
- **Tablet (md: 768px)**: Desktop sidebar visible
- **Desktop (lg: 1024px)**: Full layout with all features

All pages are optimized for touch and pointer interactions.

## 🚀 Performance Optimizations

- ✅ Code splitting with React Router
- ✅ Lazy loading of routes
- ✅ Optimized re-renders with React hooks
- ✅ CSS purging with Tailwind
- ✅ Minified production bundle

## 🔒 Security Features

- JWT token authentication
- HttpOnly cookie support (can be added)
- Request interceptors for auth headers
- Error messages that don't expose sensitive data
- Input validation on client & server
- Protected routes with auth guards
- Automatic logout on 401 responses

## 📝 Form Validation

Register form includes:
- Name validation (required)
- Email validation (format check)
- Password validation (min 6 chars)
- Password confirmation match
- Server-side error handling

Login form includes:
- Email/password required
- Error messages from backend
- Invalid credentials handling

Interview form includes:
- Job role validation
- Experience level selection
- Optional tech stack field
- Form reset after submission

## 🎯 Usage Examples

### Creating a New Page
```jsx
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';

const NewPage = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-8">
        {/* Content here */}
      </main>
    </div>
  );
};
```

### Using the API
```javascript
import { authAPI, interviewAPI } from '../utils/api';

// Register
await authAPI.register({ name, email, password });

// Login
const { data } = await authAPI.login({ email, password });
login(data.user, data.token);

// Generate questions
const { data } = await interviewAPI.generate({
  jobRole, experienceLevel, techStack
});

// Get history
const { data } = await interviewAPI.getHistory();
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.js
server: {
  port: 3001,
}
```

### API Connection Issues
- Verify backend is running on port 5000
- Check CORS settings on backend
- Update API_BASE_URL in src/utils/api.js

### Authentication Not Working
- Clear localStorage: `localStorage.clear()`
- Check browser console for errors
- Verify backend returns proper JWT format
- Check Authorization header format

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [React Router](https://reactrouter.com)
- [Axios Documentation](https://axios-http.com)

## 🤝 Contributing

This is a template project. To customize:

1. **Update colors**: Edit `tailwind.config.js`
2. **Add features**: Create new components and pages
3. **Modify API**: Update endpoints in `src/utils/api.js`
4. **Extend auth**: Add OAuth or additional providers

## 📄 License

This project is provided as-is for educational and commercial use.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the PROJECT_STRUCTURE.md file
3. Inspect browser console for errors
4. Verify backend API is running

---

**Built with ❤️ using React, Vite, and Tailwind CSS**

Happy coding! 🚀
