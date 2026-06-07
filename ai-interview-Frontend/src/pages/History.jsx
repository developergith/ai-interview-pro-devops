import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, Calendar, Briefcase, AlertCircle, Search } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { interviewAPI } from '../utils/api';

const History = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => { fetchHistory(); }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await interviewAPI.getHistory();
      setInterviews(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load interview history. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this interview?')) return;
    setDeletingId(id);
    try {
      await interviewAPI.deleteInterview(id);
      setInterviews(prev => prev.filter(i => i._id !== id));
    } catch (err) {
      alert('Failed to delete interview. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  };

  const filtered = interviews.filter(i =>
    i.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.techStack?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 overflow-auto md:ml-64">
        <div className="md:hidden h-16" />
        <div className="p-4 md:p-8 max-w-6xl">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Interview History</h1>
              <p className="text-muted">Review your past interviews and explore AI-powered answers</p>
            </div>
            <Button variant="primary" onClick={() => navigate('/generate')}>+ New Interview</Button>
          </div>

          {/* Search */}
          {!loading && interviews.length > 0 && (
            <div className="relative mb-6">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input type="text" placeholder="Search by role or tech stack..."
                value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-card border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-muted text-lg">Loading your interview history...</p>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <Card className="p-6 mb-8 bg-red-500/10 border-red-500/30">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-red-400 mb-1">Error</p>
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              </div>
              <Button variant="secondary" className="mt-4" onClick={fetchHistory}>Try Again</Button>
            </Card>
          )}

          {/* Interviews List */}
          {!loading && filtered.length > 0 && (
            <div className="space-y-4">
              {filtered.map((interview) => (
                <Card key={interview._id}
                  className="p-6 hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => navigate(`/interview/${interview._id}`)}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase size={20} className="text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">{interview.role}</h3>
                          <p className="text-muted text-sm capitalize">{interview.experienceLevel} Level • {interview.questions?.length || 0} Questions</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-muted text-sm mb-3">
                        <Calendar size={14} />
                        <span>{formatDate(interview.createdAt)}</span>
                      </div>

                      {/* Tech Stack */}
                      {interview.techStack?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {interview.techStack.map((tech, idx) => (
                            <span key={idx} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 md:flex-col md:items-end">
                      <Button variant="primary" className="flex items-center gap-2 text-sm"
                        onClick={(e) => { e.stopPropagation(); navigate(`/interview/${interview._id}`); }}>
                        <Eye size={16} /> View Details
                      </Button>
                      <Button variant="ghost"
                        className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 text-sm"
                        loading={deletingId === interview._id}
                        onClick={(e) => handleDelete(interview._id, e)}>
                        <Trash2 size={16} /> Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && interviews.length === 0 && (
            <Card className="p-12 text-center">
              <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4">
                <Calendar size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">No interviews yet</h3>
              <p className="text-muted mb-6">Start by generating interview questions and exploring AI answers</p>
              <Button variant="primary" onClick={() => navigate('/generate')}>
                Generate Your First Interview
              </Button>
            </Card>
          )}

          {/* No search results */}
          {!loading && interviews.length > 0 && filtered.length === 0 && (
            <Card className="p-12 text-center">
              <Search size={40} className="mx-auto mb-4 text-muted" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-muted">Try a different search term</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
