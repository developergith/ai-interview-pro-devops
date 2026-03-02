import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Button from '../components/Button';
import Input from '../components/Input';
import Card from '../components/Card';
import { interviewAPI } from '../utils/api';

const GenerateInterview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [questions, setQuestions] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
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

    if (!formData.jobRole.trim()) {
      newErrors.jobRole = 'Job role is required';
    }

    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
    }

    setFormErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setQuestions([]);

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await interviewAPI.generate({
        role: formData.jobRole,
        experienceLevel: formData.experienceLevel,
        techStack: formData.techStack
          .split(",")
          .map((tech) => tech.trim())
      })


      setQuestions(response.data.questions || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Failed to generate interview questions. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />

      {/* Main Content */}
      <main className="md:ml-64 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Generate Interview Questions</h1>
            <p className="text-lg text-muted">Create AI-powered interview questions tailored to your target role</p>
          </div>

          {/* Form Card */}
          <Card className="p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Job Role"
                  name="jobRole"
                  type="text"
                  placeholder="e.g., Frontend Developer, Data Scientist"
                  value={formData.jobRole}
                  onChange={handleChange}
                  error={formErrors.jobRole}
                />

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Experience Level
                  </label>
                  <select
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-card border border-primary/20 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.value} value={level.value}>
                        {level.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Input
                label="Tech Stack (comma separated)"
                name="techStack"
                type="text"
                placeholder="e.g., React, Node.js, PostgreSQL, AWS"
                value={formData.techStack}
                onChange={handleChange}
                error={formErrors.techStack}
              />

              <Button
                variant="primary"
                type="submit"
                loading={loading}
                fullWidth
                className="py-3 text-lg"
              >
                <Sparkles size={20} className="mr-2" />
                Generate Questions
              </Button>
            </form>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="p-6 mb-8 border-accent/50 bg-accent/10">
              <p className="text-accent">{error}</p>
            </Card>
          )}

          {/* Questions Display */}
          {questions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Sparkles size={28} className="text-primary" />
                Generated Questions ({questions.length})
              </h2>

              <div className="space-y-4">
                {questions.map((question, index) => (
                  <Card key={index} className="p-6 group hover:shadow-lg transition-all">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 flex items-start gap-3">
                          <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </span>
                          <span className="pt-0.5">{question.text || question}</span>
                        </h3>
                      </div>
                      <button
                        onClick={() => copyToClipboard(question.text || question, index)}
                        className="flex-shrink-0 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-all"
                        title="Copy question"
                      >
                        {copiedId === index ? (
                          <Check size={20} />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>

                    {question.tips && (
                      <div className="pl-11 pt-2 border-t border-primary/10 mt-4">
                        <p className="text-sm text-muted mb-2 font-medium">💡 Tips for answering:</p>
                        <p className="text-sm text-muted">{question.tips}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 rounded-xl bg-primary/5 border border-primary/20 text-center">
                <p className="text-muted mb-4">Ready to practice answering these questions?</p>
                <Button variant="primary">
                  Start Practicing
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
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
