# Project Structure Guide

## Complete File Tree

```
ai-interview-pro/
│
├── src/
│   ├── pages/
│   │   ├── Landing.jsx              # Public landing page - hero, features, CTA
│   │   ├── Login.jsx                # Login form with email/password
│   │   ├── Register.jsx             # Registration form with validation
│   │   ├── Dashboard.jsx            # Main dashboard with stats & quick actions
│   │   ├── GenerateInterview.jsx    # Interview question generator form
│   │   └── History.jsx              # Interview history with stats
│   │
│   ├── components/
│   │   ├── Button.jsx               # Reusable button (variants: primary, secondary, ghost, accent)
│   │   ├── Input.jsx                # Reusable input field with label & error
│   │   ├── Card.jsx                 # Reusable card container with hover effects
│   │   ├── Sidebar.jsx              # Navigation sidebar with mobile menu
│   │   └── ThemeToggle.jsx          # Dark/light mode toggle button
│   │
│   ├── context/
│   │   ├── AuthContext.jsx          # Auth state (user, token, login/logout)
│   │   └── ThemeContext.jsx         # Theme state (isDark, toggleTheme)
│   │
│   ├── routes/
│   │   └── ProtectedRoute.jsx       # Wrapper for protected routes
│   │
│   ├── utils/
│   │   └── api.js                   # Axios instance with auth interceptors
│   │
│   ├── App.jsx                      # Main app with routes & providers
│   ├── main.jsx                     # React DOM render entry point
│   └── index.css                    # Global Tailwind styles
│
├── public/                          # Static assets
│   └── placeholder-*.*              # Placeholder images
│
├── index.html                       # HTML template
├── vite.config.js                   # Vite bundler config
├── tailwind.config.js               # Tailwind CSS config with theme
├── postcss.config.js                # PostCSS config
├── tsconfig.json                    # TypeScript config
├── package.json                     # Dependencies & scripts
├── README.md                        # This file
└── STRUCTURE.md                     # This file
```

## Component Hierarchy

```
App (with ThemeProvider & AuthProvider)
├── Router
├── Routes
│   ├── Landing (/)
│   │   └── Button, Card
│   │
│   ├── Register (/register)
│   │   └── Input, Button, Card
│   │
│   ├── Login (/login)
│   │   └── Input, Button, Card
│   │
│   └── ProtectedRoute
│       ├── Dashboard (/dashboard)
│       │   ├── Sidebar
│       │   ├── Card (stats)
│       │   ├── Button
│       │   └── Card (guides)
│       │
│       ├── GenerateInterview (/generate)
│       │   ├── Sidebar
│       │   ├── Input
│       │   ├── Select (dropdown)
│       │   ├── Button
│       │   └── Card (questions)
│       │
│       └── History (/history)
│           ├── Sidebar
│           ├── Card (interview items)
│           ├── Button
│           └── Card (stats)
```

## Data Flow

### Authentication Flow
```
Register Form
    ↓
  API POST /auth/register
    ↓
  Redirect to Login
    ↓
  Login Form
    ↓
  API POST /auth/login
    ↓
  AuthContext.login(user, token)
    ↓
  localStorage.setItem('token', token)
    ↓
  Redirect to Dashboard
```

### Protected Route Flow
```
ProtectedRoute Component
    ↓
  Check AuthContext.token
    ↓
  Token exists? → Render children
    ↓
  Token missing? → Redirect to /login
```

### API Request Flow
```
Component calls API method
    ↓
  Axios interceptor adds Authorization header
    ↓
  Bearer token from localStorage
    ↓
  API request sent
    ↓
  Response interceptor checks status
    ↓
  401 error? → Clear token & redirect to login
    ↓
  Return response/error
```

## File Purposes

### Pages

**Landing.jsx**
- Public homepage
- Hero section with gradient text
- Feature cards with icons
- CTA buttons to register/login
- Feature overview and benefits

**Login.jsx**
- Email and password inputs
- Form validation and error display
- API call to /auth/login
- Token storage and redirect
- Link to register page

**Register.jsx**
- Name, email, password inputs
- Password confirmation matching
- Form validation with error messages
- API call to /auth/register
- Success redirect to login

**Dashboard.jsx**
- Welcome message with user name
- Stats cards (interviews, practice time, success rate, improvement)
- Quick action cards linking to generate and history
- Getting started guide with 3 steps
- Sidebar navigation

**GenerateInterview.jsx**
- Job role text input
- Experience level dropdown (junior/intermediate/senior)
- Tech stack text input (comma-separated)
- Form validation
- API call to /interview/generate
- Display of generated questions with copy buttons
- Tips section for each question
- Loading spinner during generation
- Empty state when no questions

**History.jsx**
- Fetch user's interview history
- Display as list of cards
- Show job role, date, score, metrics
- Quick stats at bottom (total interviews, average score, unique roles)
- View button for detailed review (placeholder)
- Loading and error states
- Empty state with CTA to generate first interview

### Components

**Button.jsx**
- Variants: primary (gradient), secondary (border), ghost (text only), accent (pink gradient)
- Props: loading, disabled, fullWidth
- Loading state shows spinner
- Smooth hover animations
- Active scale-down effect

**Input.jsx**
- Label display
- Error message display
- Focus ring styling
- Error border highlighting
- Placeholder text
- All standard input attributes

**Card.jsx**
- Border with primary/10 opacity
- Shadow effect
- Hover shadow enhancement
- Border radius matching design
- Used for all container elements

**Sidebar.jsx**
- Desktop version: Fixed left sidebar
- Mobile version: Hamburger menu + slide-out drawer
- Navigation links (Dashboard, Generate, History)
- Logout button
- Theme toggle
- Logo and branding
- Active route highlighting

**ThemeToggle.jsx**
- Shows Sun icon in dark mode
- Shows Moon icon in light mode
- Updates ThemeContext
- Persists to localStorage

### Context

**AuthContext.jsx**
- State: user, token, loading, error
- Methods: login(), logout(), setAuthError(), clearError()
- Hydrates from localStorage on mount
- Provides useAuth() hook
- Tracks isAuthenticated boolean

**ThemeContext.jsx**
- State: isDark boolean
- Method: toggleTheme()
- Persists to localStorage
- Applies 'dark' class to <html>
- Provides useTheme() hook
- Checks system preference on mount

### Utilities

**api.js**
- Axios instance with baseURL
- Request interceptor adds Bearer token
- Response interceptor handles 401 errors
- Exports authAPI object (register, login)
- Exports interviewAPI object (generate, getHistory)

### Other

**App.jsx**
- ThemeProvider wrapper
- AuthProvider wrapper
- Router with all routes
- ProtectedRoute usage for auth pages

**main.jsx**
- React DOM render
- Mounts to #root element
- Renders App component

**index.css**
- Tailwind directives
- Global element resets
- Smooth scroll behavior
- Scrollbar styling
- Button/link transitions

## Styling System

### Tailwind Configuration
- Content paths: index.html, src/**/*.{js,jsx}
- Theme colors: primary, secondary, accent, background, foreground, muted, card
- Extended borderRadius: xl = 1rem
- Dark mode: class-based

### Color Usage
- **Text**: foreground (primary text), muted (secondary text)
- **Backgrounds**: background (page bg), card (component bg)
- **Buttons**: primary (main CTA), secondary (alt), accent (destructive/alert)
- **Borders**: primary/10 or primary/20 (low opacity)
- **Shadows**: shadow-lg with primary or black transparency

### Responsive Utilities
- md: breakpoint at 768px
- Used for sidebar layout, grid columns, text sizing
- Mobile first approach

## Key Implementation Details

### Form Validation
- Client-side validation before submission
- Error state tracking per field
- Error messages displayed below inputs
- Form doesn't submit if validation fails

### Loading States
- Button shows spinner and "Loading..." text
- Form disabled during submission
- API calls set loading state
- Error messages displayed after loading completes

### Error Handling
- API errors caught in try/catch
- Error message extracted from response.data.message
- Fallback error message if none provided
- Error cards displayed to user
- 401 errors auto-redirect to login via interceptor

### Theme Management
- On mount, checks localStorage for saved theme
- Falls back to system preference
- Toggle updates both Context state and localStorage
- 'dark' class applied to html element
- Tailwind handles dark mode styling

### Token Management
- Stored in localStorage as 'token'
- Added to all API requests automatically
- Cleared on logout
- Cleared on 401 response
- User info also stored for quick access

## Getting Started with Development

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit files in src/
   - Vite hot module replacement updates instantly

3. **Add New Page**
   - Create file in src/pages/
   - Import and add route in App.jsx

4. **Add New Component**
   - Create file in src/components/
   - Follow naming convention (PascalCase.jsx)

5. **Update Styles**
   - Use Tailwind utilities in className
   - Semantic color variables from config
   - Mobile-first responsive design

6. **Build for Production**
   ```bash
   npm run build
   ```

7. **Preview Build**
   ```bash
   npm run preview
   ```
