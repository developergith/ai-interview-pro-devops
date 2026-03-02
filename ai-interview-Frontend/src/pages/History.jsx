import React, { useEffect, useState } from 'react';
import { Eye, Trash2, Calendar, Briefcase, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { interviewAPI } from '../utils/api';

const History = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await interviewAPI.getHistory();
      setInterviews(response.data.interviews || []);
      setError(null);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        'Failed to load interview history. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 overflow-auto md:ml-64">
        {/* Mobile Top Padding */}
        <div className="md:hidden h-16" />

        <div className="p-4 md:p-8 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Interview History</h1>
            <p className="text-muted">
              Review your past interviews and track your progress
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted text-lg">Loading your interview history...</p>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <Card className="p-6 mb-8 bg-red-500/10 border-red-500/30">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400 mb-1">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={fetchHistory}
              >
                Try Again
              </Button>
            </Card>
          )}

          {/* Interviews List */}
          {!loading && interviews.length > 0 && (
            <div className="space-y-4">
              {interviews.map((interview) => (
                <Card
                  key={interview.id}
                  className="p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    {/* Interview Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{interview.jobRole}</h3>
                          <p className="text-muted text-sm capitalize">
                            {interview.experienceLevel} Level
                          </p>
                        </div>
                      </div>

                      {/* Interview Details */}
                      <div className="flex flex-wrap gap-6 mt-4">
                        <div className="flex items-center gap-2 text-muted text-sm">
                          <Calendar size={16} />
                          <span>{formatDate(interview.createdAt)}</span>
                        </div>
                        {interview.score && (
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                              <span className="font-bold text-white">{interview.score}%</span>
                            </div>
                          </div>
                        )}
                        {interview.questionsAnswered && (
                          <div className="flex items-center gap-2 text-muted text-sm">
                            <span>
                              {interview.questionsAnswered} / {interview.totalQuestions} Questions
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Tech Stack */}
                      {interview.techStack && (
                        <div className="mt-4">
                          <p className="text-muted text-sm mb-2">Tech Stack:</p>
                          <div className="flex flex-wrap gap-2">
                            {interview.techStack.split(',').map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                              >
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 md:flex-col">
                      <Button
                        variant="primary"
                        className="flex items-center gap-2 text-sm"
                      >
                        <Eye size={16} />
                        <span className="hidden sm:inline">View Details</span>
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 text-sm"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && interviews.length === 0 && !error && (
            <Card className="p-12 text-center">
              <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                <Calendar size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No interviews yet</h3>
              <p className="text-muted mb-6">
                Start by generating interview questions and tracking your progress
              </p>
              <Button variant="primary">
                Generate Your First Interview
              </Button>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
