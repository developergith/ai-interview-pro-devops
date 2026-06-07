import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Sparkles, Eye, EyeOff, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { interviewAPI } from '../utils/api';

const GenerateInterview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [interviewData, setInterviewData] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [answers, setAnswers] = useState({}); // { questionIndex: { answer, keyPoints, loading } }
  const [formData, setFormData] = useState({
    jobRole: '',
    experienceLevel: 'intermediate',
    techStack: '',
  });
  const [formErrors, setFormErrors] = useState({});

  const experienceLevels = [
    { value: 'junior', label: 'Junior (0-2 years)' },
    { value: 'intermediate', label: 'Intermediate (2-5 years)' },
    { value: 'senior', label: 'Senior (5+ years)' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.jobRole.trim()) newErrors.jobRole = 'Job role is required';
    if (!formData.techStack.trim()) newErrors.techStack = 'Tech stack is required';
    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setInterviewData(null);
    setAnswers({});
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await interviewAPI.generate({
        role: formData.jobRole,
        experienceLevel: formData.experienceLevel,
        techStack: formData.techStack.split(',').map(tech => tech.trim())
      });
      setInterviewData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate interview questions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleAnswer = async (questionIndex) => {
    // If answer already loaded, toggle visibility
    if (answers[questionIndex]) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: { ...prev[questionIndex], visible: !prev[questionIndex].visible }
      }));
      return;
    }

    // Fetch answer from API
    setAnswers(prev => ({ ...prev, [questionIndex]: { loading: true, visible: true } }));
    try {
      const response = await interviewAPI.getAnswer(interviewData._id, questionIndex);
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: {
          ...response.data,
          loading: false,
          visible: true
        }
      }));
    } catch (err) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: {
          answer: 'Failed to load answer. Please try again.',
          keyPoints: [],
          loading: false,
          visible: true,
          error: true
        }
      }));
    }
  };

  const questions = interviewData?.questions || [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="md:ml-64 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Generate Interview</h1>
            <p className="text-lg text-muted">Create AI-powered interview questions with detailed answers</p>
          </div>

          {/* Form */}
          <Card className="p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Job Role" name="jobRole" type="text"
                  placeholder="e.g., Frontend Developer, Data Scientist"
                  value={formData.jobRole} onChange={handleChange} error={formErrors.jobRole} />
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Experience Level</label>
                  <select name="experienceLevel" value={formData.experienceLevel} onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300">
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>{level.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Input label="Tech Stack (comma separated)" name="techStack" type="text"
                placeholder="e.g., React, Node.js, MongoDB, AWS"
                value={formData.techStack} onChange={handleChange} error={formErrors.techStack} />
              <Button variant="primary" type="submit" loading={loading} fullWidth className="py-3 text-lg">
                <Sparkles size={20} className="mr-2" />
                {loading ? 'Generating...' : 'Generate Questions'}
              </Button>
            </form>
          </Card>

          {error && (
            <Card className="p-6 mb-8 border-red-500/30 bg-red-500/10">
              <p className="text-red-400">{error}</p>
            </Card>
          )}

          {/* Questions */}
          {questions.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Sparkles size={28} className="text-primary" />
                  Generated Questions ({questions.length})
                </h2>
                <Button variant="secondary" onClick={() => navigate(`/interview/${interviewData._id}`)}>
                  View Full Details
                </Button>
              </div>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={index} className="p-6 transition-all">
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-lg font-semibold flex items-start gap-3 flex-1">
                        <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </span>
                        <span className="pt-0.5">{question}</span>
                      </h3>
                      <div className="flex gap-2 flex-shrink-0">
                        <button onClick={() => copyToClipboard(question, index)}
                          className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all" title="Copy">
                          {copiedId === index ? <Check size={18} /> : <Copy size={18} />}
                        </button>
                        <button onClick={() => toggleAnswer(index)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-medium transition-all">
                          {answers[index]?.loading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : answers[index]?.visible ? (
                            <><EyeOff size={16} /> Hide Answer</>
                          ) : (
                            <><Eye size={16} /> View Answer</>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Answer Section */}
                    {answers[index]?.visible && (
                      <div className="mt-4 pt-4 border-t border-primary/10">
                        {answers[index]?.loading ? (
                          <div className="flex items-center gap-3 text-muted py-4">
                            <Loader2 size={20} className="animate-spin text-primary" />
                            <span>Generating AI answer...</span>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-3">
                              <p className="text-sm font-semibold text-primary mb-2">📝 Answer:</p>
                              <p className="text-sm text-foreground/80 leading-relaxed">{answers[index].answer}</p>
                            </div>
                            {answers[index].keyPoints?.length > 0 && (
                              <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <p className="text-sm font-semibold text-primary mb-2">🔑 Key Points:</p>
                                <ul className="space-y-1">
                                  {answers[index].keyPoints.map((point, pi) => (
                                    <li key={pi} className="text-sm text-muted flex items-start gap-2">
                                      <span className="text-primary mt-0.5">•</span>
                                      <span>{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-muted mb-4">All questions saved! You can review them anytime from History.</p>
                <Button variant="primary" onClick={() => navigate('/history')}>
                  View History
                </Button>
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading && questions.length === 0 && !error && (
            <Card className="p-12 text-center">
              <Sparkles size={48} className="mx-auto mb-4 text-primary/40" />
              <h3 className="text-xl font-semibold mb-2">No questions generated yet</h3>
              <p className="text-muted">Fill in the form above and click "Generate Questions" to get started!</p>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default GenerateInterview;
