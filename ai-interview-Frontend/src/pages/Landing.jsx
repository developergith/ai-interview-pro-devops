import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Sparkles, TrendingUp, Book } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'AI Question Generator',
      description: 'Generate realistic interview questions tailored to your job role and experience level',
    },
    {
      icon: Book,
      title: 'Interview History',
      description: 'Keep track of all your interview sessions and review your progress over time',
    },
    {
      icon: TrendingUp,
      title: 'Smart Feedback',
      description: 'Get personalized feedback to improve your interview skills and performance',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
            <Zap size={24} className="text-white" />
          </div>
          <span className="font-bold text-xl">AI-Interview Pro</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost">Login</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Register</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          Ace Your Interviews with AI
        </h1>
        <p className="text-xl text-muted mb-10 max-w-2xl mx-auto">
          Get AI-powered interview questions, real-time feedback, and personalized coaching to land your dream job.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/register">
            <Button variant="primary" className="px-8 py-3 text-lg">
              Get Started Free
            </Button>
          </Link>
          <Button variant="secondary" className="px-8 py-3 text-lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-8 text-center hover:scale-105">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-secondary/20">
                      <Icon size={32} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Ace Your Interview?</h2>
        <p className="text-lg text-muted mb-8 max-w-xl mx-auto">
          Join thousands of job seekers who've successfully landed their dream roles with our AI-powered interview preparation.
        </p>
        <Link to="/register">
          <Button variant="primary" className="px-8 py-3 text-lg">
            Start Your Free Trial
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-primary/10 text-center text-muted">
        <p>&copy; 2024 AI-Interview Pro. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
