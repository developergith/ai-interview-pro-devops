import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../utils/api';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
  const navigate = useNavigate();
  const { login, setAuthError, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      const { user, token } = response.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setAuthError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <span className="font-bold text-2xl">AI-Interview Pro</span>
        </div>

        <Card className="p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted mb-8">Sign in to continue to your dashboard</p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3">
              <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg bg-background border border-primary/20 focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={loading}
              className="py-3"
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-muted mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Register here
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Login;
