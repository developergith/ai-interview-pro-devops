# AI-Interview Pro - Project Structure

A production-ready SaaS frontend for interview preparation using React, Vite, and Tailwind CSS.

## 📁 Directory Structure

```
ai-interview-pro/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          # Landing page with hero & features
│   │   ├── Login.jsx            # User login page
│   │   ├── Register.jsx         # User registration page
│   │   ├── Dashboard.jsx        # Main dashboard with quick actions
│   │   ├── GenerateInterview.jsx # Interview question generator
│   │   └── History.jsx          # Interview history & progress tracking
│   │
│   ├── components/
│   │   ├── Button.jsx           # Reusable button component with variants
│   │   ├── Card.jsx             # Reusable card component
│   │   ├── Input.jsx            # Form input component with error handling
│   │   └── Sidebar.jsx          # Navigation sidebar (desktop & mobile)
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # Authentication state management
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx   # Protected route wrapper for auth
│   │
│   ├── utils/
│   │   └── api.js               # API client with axios & interceptors
│   │
│   ├── App.jsx                  # Main app with routing setup
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global Tailwind styles
│
├── index.html                   # HTML entry point
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS theme configuration
├── package.json                 # Dependencies & scripts
└── PROJECT_STRUCTURE.md         # This file
```

## 🚀 Features

### Authentication System
- User registration with email validation
- JWT token-based login
- Token stored in localStorage
- Automatic token refresh on API calls
- Protected routes with auth guards

### Pages

#### Landing Page
- Hero section with compelling headline
- Features showcase (AI Generator, History, Smart Feedback)
- Call-to-action buttons
- Responsive design for all devices

#### Authentication Pages
- **Register**: Full form validation, password confirmation, API error handling
- **Login**: Email & password fields, credentials validation, error messaging

#### Dashboard
- Welcome message with user name
- Quick action cards (Generate Interview, View History)
- Progress statistics (Total Interviews, Questions Answered, Avg Score)
- Interview tips section
- Responsive grid layout

#### Generate Interview Page
- Job role input
- Experience level dropdown (Junior, Intermediate, Senior)
- Tech stack field (comma-separated)
- AI-powered question generation with loading state
- Copy-to-clipboard functionality for each question
- Error handling and empty states

#### Interview History Page
- List of all past interviews
- Job role, date, and experience level display
- Tech stack tags
- Performance score display
- View details & delete actions
- Loading and error states

### Technical Features

**State Management**
- React Context API for authentication
- useState for form handling and UI state
- localStorage persistence for JWT tokens

**API Integration**
- Axios with base URL configuration
- Request interceptors for JWT headers
- Response interceptors for error handling (401 redirects)
- Clean API client with named exports

**UI/UX**
- Dark/Light mode ready (configurable in tailwind.config.js)
- Smooth animations and transitions
- Loading spinners and states
- Error messages with icons
- Empty states with helpful messaging
- Mobile-first responsive design

**Styling**
- Tailwind CSS utility classes
- Custom color scheme (primary, secondary, accent)
- Gradient effects on buttons
- Consistent spacing and shadows
- Rounded corners (rounded-xl)

## 🔧 Configuration

### API Base URL
Update in `src/utils/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Theme Colors
Customize in `tailwind.config.js`:
```javascript
colors: {
  primary: '#6366f1',      // Indigo
  secondary: '#8b5cf6',    // Purple
  accent: '#ec4899',       // Pink
  background: '#0f172a',   // Dark blue
  foreground: '#f1f5f9',   // Light gray
  muted: '#64748b',        // Slate gray
  card: '#1e293b',         // Card background
}
```

## 📦 Dependencies

- **React**: ^18.3.1 - UI framework
- **React Router DOM**: ^6.20.1 - Client-side routing
- **Axios**: ^1.6.2 - HTTP client
- **Lucide React**: ^0.292.0 - Icon library
- **Vite**: ^5.0.8 - Build tool
- **Tailwind CSS**: ^3.3.6 - CSS framework

## 🎯 API Endpoints (Expected)

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT token)

### Interview Management
- `POST /interview/generate` - Generate interview questions
  - Headers: `Authorization: Bearer {token}`
  - Body: `{ jobRole, experienceLevel, techStack }`
- `GET /interview/history` - Fetch interview history
  - Headers: `Authorization: Bearer {token}`

## 🚀 Getting Started

### Installation
```bash
npm install
# or
pnpm install
```

### Development
```bash
npm run dev
# or
pnpm dev
```
Server runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
# or
pnpm build
```

### Preview Production Build
```bash
npm run preview
# or
pnpm preview
```

## 🔐 Authentication Flow

1. User registers → POST `/auth/register` → Redirects to login
2. User logs in → POST `/auth/login` → Returns JWT token
3. Token stored in localStorage
4. On page refresh, token is loaded from localStorage
5. All API requests include token in header: `Authorization: Bearer {token}`
6. If token expires (401), user is redirected to login
7. User logout → Clear token and localStorage → Redirect to login

## 🎨 Component Patterns

### Button Component
```jsx
<Button variant="primary" fullWidth loading={isLoading}>
  Submit
</Button>
```
Variants: `primary`, `secondary`, `ghost`, `accent`

### Input Component
```jsx
<Input
  label="Email"
  name="email"
  type="email"
  error={errors.email}
  onChange={handleChange}
/>
```

### Card Component
```jsx
<Card className="p-6">
  Content goes here
</Card>
```

### Protected Routes
```jsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: 
  - `md:` = 768px (tablets and above)
  - `lg:` = 1024px (desktop and above)
- **Sidebar**: Hidden on mobile, visible on desktop
- **Navigation**: Mobile menu toggle on small screens

## 🔒 Security Considerations

- JWT tokens stored in localStorage (consider httpOnly cookies for production)
- XSS protection through React's built-in escaping
- CSRF protection through Bearer token authentication
- Input validation on both client and server
- Error messages don't expose sensitive information

## 📝 Development Notes

- All pages are mobile-responsive
- Components are reusable and follow DRY principles
- API calls use interceptors for consistent error handling
- Loading states prevent duplicate submissions
- Form validation provides instant user feedback
- No external UI libraries (except Lucide icons)
- Production-ready error handling

## 🎯 Next Steps

1. Connect to backend API at `http://localhost:5000/api`
2. Customize theme colors in `tailwind.config.js`
3. Add more features (feedback analysis, performance metrics)
4. Implement user preferences/settings
5. Add email verification flow
6. Implement password reset functionality
7. Add analytics tracking

---

**Built with React, Vite, Tailwind CSS, and Axios**
