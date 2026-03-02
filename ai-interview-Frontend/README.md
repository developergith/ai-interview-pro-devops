# AI-Interview Pro - Frontend

A production-ready React/Vite SaaS frontend for AI-powered interview preparation. Features modern design, dark/light mode toggle, fully responsive layout, and JWT authentication.

## 🚀 Features

- **Modern SaaS Design** - Clean, professional UI with gradient accents and smooth animations
- **Dark/Light Mode** - Theme toggle with localStorage persistence
- **JWT Authentication** - Secure token-based auth with localStorage storage
- **Fully Responsive** - Mobile-first design that works on all devices
- **Protected Routes** - Authenticated pages with automatic redirect
- **Interview Question Generation** - AI-powered form with live results
- **Interview History** - Track and review past interview sessions
- **Beautiful Components** - Reusable UI components with consistent styling

## 📁 Project Structure

```
ai-interview-pro/
├── src/
│   ├── pages/
│   │   ├── Landing.jsx          # Public landing page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Main dashboard (protected)
│   │   ├── GenerateInterview.jsx # Interview generator (protected)
│   │   └── History.jsx           # Interview history (protected)
│   ├── components/
│   │   ├── Button.jsx            # Reusable button component
│   │   ├── Input.jsx             # Reusable input component
│   │   ├── Card.jsx              # Reusable card component
│   │   ├── Sidebar.jsx           # Navigation sidebar
│   │   └── ThemeToggle.jsx       # Dark/light mode toggle
│   ├── context/
│   │   ├── AuthContext.jsx       # Auth state management
│   │   └── ThemeContext.jsx      # Theme state management
│   ├── routes/
│   │   └── ProtectedRoute.jsx    # Route protection wrapper
│   ├── utils/
│   │   └── api.js                # Axios instance with interceptors
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   └── index.css                 # Global styles
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration
├── tailwind.config.js            # Tailwind CSS config
├── postcss.config.js             # PostCSS config
└── package.json
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool & dev server
- **React Router v6** - Routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful SVG icons
- **Context API** - State management

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs on `http://localhost:3000` by default.

## 🔐 Environment Setup

The app expects a backend API running at `http://localhost:5000/api`. The Vite config includes a proxy for development:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true,
  }
}
```

## 🎨 Color System

The design uses a cohesive 4-color palette:

- **Primary** - `#6366f1` (Indigo) - Main brand color
- **Secondary** - `#8b5cf6` (Purple) - Accent complement
- **Accent** - `#ec4899` (Pink) - Call-to-action highlight
- **Background** - `#0f172a` (Dark Blue) - Base dark theme
- **Foreground** - `#f1f5f9` (Slate) - Text on dark
- **Card** - `#1e293b` (Slate) - Card backgrounds
- **Muted** - `#64748b` (Slate) - Secondary text

All components use Tailwind utilities with these semantic color variables.

## 🔄 API Integration

The app integrates with a REST API with these endpoints:

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login (returns JWT token)

### Interviews
- `POST /interview/generate` - Generate interview questions
- `GET /interview/history` - Fetch user's interview history

All API requests automatically include the JWT token in the `Authorization: Bearer <token>` header via Axios interceptors.

## 📄 Component Documentation

### Button Component
```jsx
<Button 
  variant="primary" // primary, secondary, ghost, accent
  fullWidth={true}
  loading={false}
  disabled={false}
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
  error="Error message"
  onChange={handleChange}
/>
```

### Card Component
```jsx
<Card className="p-8">
  Content here
</Card>
```

## 🔐 Authentication Flow

1. **Registration** - User submits form → API creates account → Redirects to login
2. **Login** - User submits credentials → API returns JWT token → Token stored in localStorage
3. **Protected Routes** - Routes check for token → If no token, redirect to login
4. **API Calls** - Token automatically added to request headers
5. **Logout** - Token cleared from localStorage → User redirected to login

## 🎭 Theme Management

The theme system uses React Context and localStorage:

1. On app load, checks localStorage for saved theme preference
2. Falls back to system preference (`prefers-color-scheme`)
3. Theme toggle updates both state and localStorage
4. `dark` class added to `<html>` element for Tailwind dark mode

```jsx
const { isDark, toggleTheme } = useTheme();
```

## 📱 Responsive Design

- **Mobile** - Single column, hamburger menu, full-width cards
- **Tablet** - Two columns, visible sidebar begins
- **Desktop** - Three+ columns, fixed sidebar, optimal spacing

Breakpoints via Tailwind: `sm`, `md`, `lg`, `xl`, `2xl`

## ✨ Key Features Explained

### Landing Page
- Hero section with gradient text
- Feature cards highlighting key benefits
- CTA buttons linking to auth pages
- Professional footer

### Dashboard
- Welcome message with user's name
- Stats cards showing usage metrics
- Quick action cards for main features
- Getting started guide with numbered steps

### Generate Interview Page
- Form with job role, experience level, and tech stack inputs
- Real-time question generation with loading spinner
- Copy-to-clipboard functionality for each question
- Tips section for each question
- Empty state when no questions generated

### History Page
- List of all past interviews with scores
- Date, role, and performance metrics
- View button for detailed review (placeholder)
- Summary statistics at bottom
- Empty state with CTA to generate first interview

## 🚀 Deployment

The app is production-ready and can be deployed to:

- **Vercel** - Optimized for Next.js but works with Vite
- **Netlify** - Drag-and-drop deployment
- **GitHub Pages** - Static hosting
- **Any static host** - Build files in `dist/` folder

Build command: `npm run build`
Output directory: `dist/`

## 🔗 API Response Examples

### Login Response
```json
{
  "user": {
    "id": "user123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### Generate Interview Response
```json
{
  "questions": [
    {
      "text": "Tell me about your experience with React",
      "tips": "Highlight real projects and lessons learned"
    }
  ]
}
```

### History Response
```json
{
  "interviews": [
    {
      "id": "interview123",
      "jobRole": "Frontend Developer",
      "experienceLevel": "intermediate",
      "date": "2024-01-15T10:30:00Z",
      "score": 85,
      "questionsCount": 5,
      "duration": 20
    }
  ]
}
```

## 🎯 Development Tips

### Adding New Pages
1. Create file in `src/pages/YourPage.jsx`
2. Import and add route in `src/App.jsx`
3. Wrap in `<ProtectedRoute>` if protected

### Creating New Components
1. Create file in `src/components/YourComponent.jsx`
2. Use existing components as templates
3. Use Tailwind utilities for styling
4. Export as default

### Modifying Styles
1. Update `src/index.css` for global styles
2. Update `tailwind.config.js` for theme changes
3. Use inline Tailwind classes in components
4. Leverage semantic color variables

### Testing API Integration
1. Start backend on `http://localhost:5000`
2. Check network tab in DevTools
3. Verify request headers include `Authorization: Bearer <token>`
4. Check response status codes and error messages

## 📝 Notes

- All forms include client-side validation
- API errors are displayed to users in error cards
- Loading states show spinners during async operations
- Smooth animations via Tailwind transitions
- Mobile menu auto-closes when navigation item clicked
- Theme preference persists across sessions

## 🐛 Troubleshooting

**API requests failing**
- Ensure backend is running on `http://localhost:5000`
- Check CORS configuration on backend
- Verify token is in localStorage after login

**Styles not applying**
- Ensure Tailwind CSS is properly compiled
- Check `tailwind.config.js` content paths
- Clear browser cache and rebuild

**Theme not working**
- Ensure `ThemeProvider` wraps the app
- Check browser console for errors
- Verify localStorage is enabled

## 📄 License

Built for AI-Interview Pro SaaS platform.
