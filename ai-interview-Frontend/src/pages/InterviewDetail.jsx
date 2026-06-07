import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Copy, Check, Eye, EyeOff, Loader2, Calendar, Briefcase, Layers } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Card from '../components/Card';
import Button from '../components/Button';
import { interviewAPI } from '../utils/api';

const InterviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({}); // { index: { answer, keyPoints, loading, visible } }
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchInterview = async () => {
      try {
        const res = await interviewAPI.getById(id);
        const data = res.data;
        setInterview(data);

        // Pre-load already saved answers
        const savedAnswers = {};
        data.answers?.forEach(a => {
          savedAnswers[a.questionIndex] = {
            answer: a.answer,
            keyPoints: a.keyPoints || [],
            loading: false,
            visible: false
          };
        });
        setAnswers(savedAnswers);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load interview details.');
      } finally {
        setLoading(false);
      }
    };
    fetchInterview();
  }, [id]);

  const toggleAnswer = async (questionIndex) => {
    if (answers[questionIndex] && !answers[questionIndex].loading) {
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: { ...prev[questionIndex], visible: !prev[questionIndex].visible }
      }));
      return;
    }

    setAnswers(prev => ({ ...prev, [questionIndex]: { loading: true, visible: true } }));
    try {
      const response = await interviewAPI.getAnswer(id, questionIndex);
      setAnswers(prev => ({
        ...prev,
        [questionIndex]: { ...response.data, loading: false, visible: true }
      }));
    } catch {
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

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (loading) return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted">Loading interview details...</p>
        </div>
      </main>
    </div>
  );

  if (error) return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 md:ml-64 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <Button variant="primary" onClick={() => navigate('/history')}>← Back to History</Button>
        </Card>
      </main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">

          {/* Back button */}
          <button onClick={() => navigate('/history')}
            className="flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={18} /> Back to History
          </button>

          {/* Interview Meta */}
          <Card className="p-6 mb-8 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{interview.role}</h1>
                <div className="flex flex-wrap items-center gap-4 text-muted text-sm">
                  <span className="flex items-center gap-1.5">
                    <Briefcase size={14} />
                    <span className="capitalize">{interview.experienceLevel} Level</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    {formatDate(interview.createdAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Layers size={14} />
                    {interview.questions?.length} Questions
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {interview.techStack?.map((tech, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          {/* Answer All button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Questions & Answers</h2>
            <p className="text-sm text-muted">
              {Object.values(answers).filter(a => !a.loading && a.answer).length} / {interview.questions?.length} answers loaded
            </p>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {interview.questions?.map((question, index) => (
              <Card key={index} className="p-6 transition-all">
                <div className="flex items-start justify-between gap-4">
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary/10 hover:bg-secondary/20 text-secondary text-sm font-medium transition-all whitespace-nowrap">
                      {answers[index]?.loading ? (
                        <><Loader2 size={16} className="animate-spin" /> Loading...</>
                      ) : answers[index]?.visible ? (
                        <><EyeOff size={16} /> Hide</>
                      ) : (
                        <><Eye size={16} /> {answers[index] ? 'Show' : 'Get'} Answer</>
                      )}
                    </button>
                  </div>
                </div>

                {/* Answer */}
                {answers[index]?.visible && (
                  <div className="mt-4 pt-4 border-t border-primary/10">
                    {answers[index]?.loading ? (
                      <div className="flex items-center gap-3 text-muted py-4">
                        <Loader2 size={20} className="animate-spin text-primary" />
                        <span>Generating AI answer...</span>
                      </div>
                    ) : (
                      <div>
                        <p className="text-sm font-semibold text-primary mb-2">📝 Answer:</p>
                        <p className="text-sm text-foreground/80 leading-relaxed mb-4">{answers[index].answer}</p>
                        {answers[index].keyPoints?.length > 0 && (
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <p className="text-sm font-semibold text-primary mb-2">🔑 Key Points:</p>
                            <ul className="space-y-1.5">
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

          <div className="mt-8 flex gap-4 justify-center">
            <Button variant="secondary" onClick={() => navigate('/history')}>← Back to History</Button>
            <Button variant="primary" onClick={() => navigate('/generate')}>+ New Interview</Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InterviewDetail;
