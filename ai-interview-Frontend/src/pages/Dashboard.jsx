import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, History, Zap, TrendingUp } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      icon: Sparkles,
      title: 'Generate Interview',
      description: 'Create AI-powered interview questions tailored to your needs',
      path: '/generate',
      color: 'from-primary to-secondary',
    },
    {
      icon: History,
      title: 'View History',
      description: 'Review your past interviews and track your progress',
      path: '/history',
      color: 'from-secondary to-accent',
    },
  ];

  const stats = [
    { label: 'Total Interviews', value: '0', icon: Zap },
    { label: 'Questions Answered', value: '0', icon: Sparkles },
    { label: 'Avg. Score', value: '0%', icon: TrendingUp },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-64">
        {/* Mobile Top Padding */}
        <div className="md:hidden h-16" />

        <div className="p-4 md:p-8 max-w-6xl">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-lg text-muted">
              Ready to ace your next interview? Let's get started.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={index} to={action.path}>
                  <Card className="p-6 h-full hover:scale-105 cursor-pointer">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                    <p className="text-muted mb-4">{action.description}</p>
                    <Button variant="primary" className="w-full">
                      Get Started
                    </Button>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Your Progress</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-muted text-sm mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-primary/10">
                        <Icon size={24} className="text-primary" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Tips Section */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="text-xl font-bold mb-4">Interview Tips</h3>
            <ul className="space-y-2 text-muted">
              <li>• Practice regularly with different job roles and experience levels</li>
              <li>• Review your past interviews to identify areas for improvement</li>
              <li>• Take notes of difficult questions and how you answered them</li>
              <li>• Track your progress and celebrate your improvements</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
