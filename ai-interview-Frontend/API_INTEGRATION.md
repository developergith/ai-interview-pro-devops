# API Integration Guide

## Base Configuration

**Base URL**: `http://localhost:5000/api`

**Headers**: 
- `Content-Type: application/json`
- `Authorization: Bearer <jwt_token>` (added automatically)

**Authentication**: JWT token stored in localStorage after login

## API Endpoints

### Authentication Endpoints

#### POST /auth/register
Register a new user account.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200)**:
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (400)**:
```json
{
  "message": "Email already registered"
}
```

**Implementation**:
```jsx
import { authAPI } from '../utils/api';

const response = await authAPI.register({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

const { user, token } = response.data;
login(user, token); // AuthContext method
```

---

#### POST /auth/login
Authenticate user and receive JWT token.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200)**:
```json
{
  "user": {
    "id": "user_123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response (401)**:
```json
{
  "message": "Invalid email or password"
}
```

**Implementation**:
```jsx
import { authAPI } from '../utils/api';

const response = await authAPI.login({
  email: 'john@example.com',
  password: 'password123'
});

const { user, token } = response.data;
login(user, token); // AuthContext method
localStorage.setItem('token', token);
```

---

### Interview Endpoints

#### POST /interview/generate
Generate AI interview questions based on job role and experience.

**Request Body**:
```json
{
  "jobRole": "Frontend Developer",
  "experienceLevel": "intermediate",
  "techStack": "React, Node.js, PostgreSQL, Docker"
}
```

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Success Response (200)**:
```json
{
  "questions": [
    {
      "id": "q_1",
      "text": "Describe your experience with React hooks. What are their benefits?",
      "tips": "Focus on specific use cases like useState, useEffect, useContext. Mention performance benefits."
    },
    {
      "id": "q_2",
      "text": "How do you handle state management in large React applications?",
      "tips": "Mention Context API, Redux, or other solutions. Explain why you chose your approach."
    },
    {
      "id": "q_3",
      "text": "Tell me about a challenging frontend problem you solved.",
      "tips": "Use STAR method (Situation, Task, Action, Result). Be specific with technical details."
    },
    {
      "id": "q_4",
      "text": "How do you optimize React component performance?",
      "tips": "Discuss React.memo, useMemo, useCallback, code splitting, and lazy loading."
    },
    {
      "id": "q_5",
      "text": "Explain your experience with Node.js and building REST APIs.",
      "tips": "Discuss Express, middleware, authentication, database integration, and error handling."
    }
  ],
  "jobRole": "Frontend Developer",
  "experienceLevel": "intermediate",
  "generatedAt": "2024-01-15T10:30:00Z"
}
```

**Error Response (400)**:
```json
{
  "message": "Job role is required"
}
```

**Error Response (401)**:
```json
{
  "message": "Unauthorized - invalid token"
}
```

**Implementation**:
```jsx
import { interviewAPI } from '../utils/api';

try {
  const response = await interviewAPI.generate({
    jobRole: 'Frontend Developer',
    experienceLevel: 'intermediate',
    techStack: 'React, Node.js, PostgreSQL'
  });

  const { questions } = response.data;
  setQuestions(questions);
} catch (err) {
  const errorMsg = err.response?.data?.message || 'Failed to generate questions';
  setError(errorMsg);
}
```

---

#### GET /interview/history
Fetch all past interview sessions for the authenticated user.

**Request Headers**:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters** (optional):
```
?limit=10&offset=0&sortBy=date&order=desc
```

**Success Response (200)**:
```json
{
  "interviews": [
    {
      "id": "interview_1",
      "jobRole": "Frontend Developer",
      "experienceLevel": "intermediate",
      "techStack": "React, Node.js, PostgreSQL",
      "date": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-15T10:30:00Z",
      "score": 82,
      "questionsCount": 5,
      "duration": 25,
      "improvement": 5,
      "questions": [
        {
          "id": "q_1",
          "text": "Describe your experience with React hooks...",
          "userAnswer": "I've used hooks extensively...",
          "score": 85
        }
      ]
    },
    {
      "id": "interview_2",
      "jobRole": "Backend Developer",
      "experienceLevel": "senior",
      "date": "2024-01-14T14:00:00Z",
      "score": 90,
      "questionsCount": 6,
      "duration": 30,
      "improvement": 8
    }
  ],
  "total": 2,
  "limit": 10,
  "offset": 0
}
```

**Error Response (401)**:
```json
{
  "message": "Unauthorized - invalid token"
}
```

**Implementation**:
```jsx
import { interviewAPI } from '../utils/api';

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await interviewAPI.getHistory();
      const { interviews } = response.data;
      setHistory(interviews);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch history';
      setError(errorMsg);
    }
  };

  fetchHistory();
}, []);
```

---

## Error Handling

### Common Error Codes

| Code | Message | Handling |
|------|---------|----------|
| 400 | Bad Request | Check request body validation |
| 401 | Unauthorized | Token invalid/expired - redirect to login |
| 403 | Forbidden | User lacks permission |
| 404 | Not Found | Resource doesn't exist |
| 500 | Server Error | Retry or show generic error |

### Error Response Format

All errors return JSON with this format:
```json
{
  "message": "Human-readable error message",
  "error": "error_code",
  "details": "Additional details (optional)"
}
```

### Handling 401 Errors

The Axios interceptor automatically handles 401 errors:

```javascript
// In api.js
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth state
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## Request/Response Examples

### Complete Login Flow

**1. Register User**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_456",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**2. Login User**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "jane@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "user": {
    "id": "user_456",
    "name": "Jane Smith",
    "email": "jane@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Complete Interview Generation Flow

**1. Generate Questions**
```bash
POST http://localhost:5000/api/interview/generate
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

{
  "jobRole": "Frontend Developer",
  "experienceLevel": "intermediate",
  "techStack": "React, TypeScript, Tailwind CSS"
}
```

**Response:**
```json
{
  "questions": [
    {
      "text": "What is the virtual DOM and how does React use it?",
      "tips": "Explain reconciliation process, key prop importance, and performance implications"
    },
    {
      "text": "How would you handle form validation in a React application?",
      "tips": "Discuss libraries like react-hook-form or formik, or custom validation"
    }
  ]
}
```

**2. Fetch Interview History**
```bash
GET http://localhost:5000/api/interview/history
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response:**
```json
{
  "interviews": [
    {
      "jobRole": "Frontend Developer",
      "date": "2024-01-15T10:30:00Z",
      "score": 82,
      "questionsCount": 5
    }
  ],
  "total": 1
}
```

---

## Authentication Token Details

### JWT Token Structure

Tokens are JWT (JSON Web Tokens) with 3 parts:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJpZCI6InVzZXJfMTIzIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNjczNzc2MjAwfQ.
signature
```

**Parts:**
1. **Header**: Algorithm and token type
2. **Payload**: User data and metadata
3. **Signature**: Cryptographic signature

### Token Expiration

Tokens may expire after a certain period (e.g., 24 hours). When expired:
- API returns 401 Unauthorized
- Interceptor clears token and redirects to login
- User must re-login to get new token

### Token Storage

**Secure Storage**: Stored in localStorage as `'token'`

```javascript
// Save after login
localStorage.setItem('token', jwtToken);

// Use in requests (automatic via interceptor)
Authorization: Bearer <token>

// Clear on logout
localStorage.removeItem('token');
```

---

## Testing API Integration

### Using curl

**Register:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"pass123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"pass123"}'
```

**Generate Questions:**
```bash
curl -X POST http://localhost:5000/api/interview/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"jobRole":"Frontend Developer","experienceLevel":"intermediate","techStack":"React"}'
```

### Using Postman

1. Create collection "AI-Interview Pro"
2. Add environment variable: `baseUrl` = `http://localhost:5000/api`
3. Add auth token variable after login
4. Create requests with proper headers and body

---

## Troubleshooting

### "Unauthorized - invalid token"
- Token may have expired
- Token might be malformed
- Verify token exists in localStorage
- Try logging in again

### "CORS Error"
- Backend must have CORS enabled
- Check backend configuration
- Ensure credentials are passed if needed

### "Network Error - Cannot reach server"
- Backend not running
- Wrong API URL in vite.config.js
- Check firewall/network issues
- Verify backend is on port 5000

### Questions not generating
- Check job role field is not empty
- Verify experience level is valid
- Check techStack field is filled
- Look for error message in response
- Verify token is valid

---

## API Response Caching

The current implementation doesn't cache responses. For production, consider:

1. **Browser Cache**: Set Cache-Control headers on GET requests
2. **Application Cache**: Implement React Query or SWR
3. **localStorage Cache**: Store history locally after fetching

Example with SWR (recommended):
```jsx
import useSWR from 'swr';

const { data, error, isLoading } = useSWR('/interview/history', fetcher);
```

---

## Rate Limiting

The API may have rate limits. If you receive:
```json
{
  "message": "Rate limit exceeded",
  "retryAfter": 60
}
```

Wait the specified seconds before retrying.

---

## Future Enhancements

Consider these additions to the API integration:

1. **Pagination**: Add limit/offset to history endpoint
2. **Filters**: Filter history by date range, role, score
3. **Sorting**: Sort by date, score, or role
4. **Retry Logic**: Automatic retry with exponential backoff
5. **Offline Support**: Service workers for offline functionality
6. **WebSockets**: Real-time notifications for question generation
7. **Analytics**: Track user behavior and interview performance

