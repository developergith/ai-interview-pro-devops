import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, History, Zap, TrendingUp, Plus, ChevronRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { interviewAPI } from '../utils/api';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalInterviews: 0, totalQuestionsAnswered: 0, avgScore: 0 });
  const [recentInterviews, setRecentInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, historyRes] = await Promise.all([
          interviewAPI.getStats(),
          interviewAPI.getHistory()
        ]);
        setStats(statsRes.data);
        setRecentInterviews((historyRes.data || []).slice(0, 3));
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Interviews', value: stats.totalInterviews, icon: Zap, color: 'from-primary to-secondary' },
    { label: 'Questions Explored', value: stats.totalQuestionsAnswered, icon: Sparkles, color: 'from-secondary to-accent' },
    { label: 'Avg. Score', value: `${stats.avgScore}%`, icon: TrendingUp, color: 'from-accent to-primary' },
  ];

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto md:ml-64">
        <div className="md:hidden h-16" />
        <div className="p-4 md:p-8 max-w-6xl">

          {/* Welcome */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
            </h1>
            <p className="text-lg text-muted">Ready to ace your next interview? Let's get started.</p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {statCards.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card key={i} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">
                        {loading ? <span className="w-12 h-8 bg-primary/10 rounded animate-pulse inline-block" /> : stat.value}
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon size={24} className="text-white" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <Link to="/generate">
              <Card className="p-6 h-full hover:scale-105 cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center mb-4">
                  <Plus size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">New Interview</h3>
                <p className="text-muted mb-4">Generate AI-powered questions tailored to your role</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  Get Started <ChevronRight size={16} className="ml-1" />
                </div>
              </Card>
            </Link>
            <Link to="/history">
              <Card className="p-6 h-full hover:scale-105 cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-secondary to-accent flex items-center justify-center mb-4">
                  <History size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">View History</h3>
                <p className="text-muted mb-4">Review past interviews and explore AI answers</p>
                <div className="flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  View All <ChevronRight size={16} className="ml-1" />
                </div>
              </Card>
            </Link>
          </div>

          {/* Recent Interviews */}
          {!loading && recentInterviews.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">Recent Interviews</h2>
                <Link to="/history" className="text-primary text-sm hover:underline">View all →</Link>
              </div>
              <div className="space-y-3">
                {recentInterviews.map((interview) => (
                  <Card key={interview._id} className="p-4 flex items-center justify-between hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => navigate(`/interview/${interview._id}`)}>
                    <div>
                      <p className="font-semibold">{interview.role}</p>
                      <p className="text-sm text-muted">{interview.experienceLevel} • {interview.questions?.length || 0} questions</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-wrap gap-1">
                        {interview.techStack?.slice(0, 2).map((t, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">{t}</span>
                        ))}
                      </div>
                      <ChevronRight size={18} className="text-muted" />
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <Card className="p-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <h3 className="text-xl font-bold mb-4">💡 Interview Tips</h3>
            <ul className="space-y-2 text-muted">
              <li>• Practice regularly with different job roles and experience levels</li>
              <li>• Click "View Answer" on any question to get AI-powered detailed answers</li>
              <li>• Review your past interviews to identify areas for improvement</li>
              <li>• Take notes on key points from AI answers to remember them better</li>
            </ul>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
