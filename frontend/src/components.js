import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// API Configuration
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Functions
const apiService = {
  // Startup Ideas API
  createStartupIdea: async (ideaData) => {
    const response = await api.post('/startup-ideas', ideaData);
    return response.data;
  },
  
  getStartupIdeas: async (userId = null) => {
    const params = userId ? { userId } : {};
    const response = await api.get('/startup-ideas', { params });
    return response.data;
  },
  
  getStartupIdea: async (ideaId) => {
    const response = await api.get(`/startup-ideas/${ideaId}`);
    return response.data;
  },
  
  updateStartupIdea: async (ideaId, updateData) => {
    const response = await api.put(`/startup-ideas/${ideaId}`, updateData);
    return response.data;
  },
  
  deleteStartupIdea: async (ideaId) => {
    const response = await api.delete(`/startup-ideas/${ideaId}`);
    return response.data;
  },
  
  generateStartupContent: async (description) => {
    const response = await api.post('/generate-startup-content', { description });
    return response.data;
  }
};

// Login Page Component
export const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path 
                d="M8 24L16 8L24 24L20 16L12 16L8 24Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Log in to zigzag</p>
        </div>

        {/* Auth Buttons */}
        <div className="space-y-3">
          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button 
            onClick={onLogin}
            className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#00BCF2" d="M0 0h11.377v11.372H0z"/>
              <path fill="#00BCF2" d="M12.623 0H24v11.372H12.623z"/>
              <path fill="#00BCF2" d="M0 12.623h11.377V24H0z"/>
              <path fill="#FFBA08" d="M12.623 12.623H24V24H12.623z"/>
            </svg>
            Continue with Microsoft Account
          </button>
        </div>
      </div>
    </div>
  );
};

// Generated Badge Component
const GeneratedBadge = () => (
  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
    Generated
  </span>
);

// Simple Workspace with Enhanced Features
export const ZigZagWorkspace = ({ onLogout }) => {
  const [currentSection, setCurrentSection] = useState('startup-idea');
  const [currentIdea, setCurrentIdea] = useState(null);
  const [userIdeas, setUserIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user ideas on component mount
  useEffect(() => {
    loadUserIdeas();
  }, []);

  const loadUserIdeas = async () => {
    try {
      setLoading(true);
      const ideas = await apiService.getStartupIdeas();
      setUserIdeas(ideas);
      
      // Set the first idea as current if available, otherwise use default
      if (ideas.length > 0) {
        setCurrentIdea(ideas[0]);
      } else {
        // Default idea for new users
        setCurrentIdea({
          id: 'default',
          name: 'TradeHive',
          description: 'social trading platform',
          industry: 'trading',
          leanCanvas: {
            problems: ['Difficulty making informed trading decisions', 'Lack of transparency in financial markets'],
            solutions: ['Social trading platform', 'Real-time market insights'],
            customers: ['Millennial investors', 'Retirement planners', 'Day traders', 'Financial enthusiast students'],
            competitors: ['eToro', 'Robinhood', 'TradingView', 'Interactive Brokers'],
            valueProposition: 'Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.',
            channels: ['Mobile app', 'Financial blogs', 'Social media', 'Trading forums'],
            revenue: ['Trading commissions', 'Premium subscriptions', 'Copy-trading fees'],
            keyMetrics: ['Active traders', 'Trading volume', 'Platform assets', 'User retention rates']
          },
          hypotheses: [
            { type: 'Desirability', text: 'Traders want to share and copy successful trading strategies', criticality: 'High', method: 'Trading community survey' },
            { type: 'Viability', text: 'Users will pay for premium trading insights and tools', criticality: 'High', method: 'Freemium conversion test' },
            { type: 'Feasibility', text: 'Real-time data feeds can be integrated cost-effectively', criticality: 'High', method: 'Technical feasibility study' }
          ],
          storytelling: {
            names: ['TradeHive', 'InvestorHub', 'TradingEdge', 'MarketMaster', 'FinanceFlow'],
            mission: 'Democratize trading by creating a collaborative platform where investors can learn, share, and grow together.',
            vision: 'To build the largest community of transparent, collaborative traders who empower each other to achieve financial success.',
            values: ['Transparency: Open sharing of trading strategies and results', 'Education: Helping traders learn and improve', 'Community: Building supportive trading relationships'],
            elevatorPitch: 'TradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge.'
          }
        });
      }
    } catch (err) {
      console.error('Failed to load user ideas:', err);
      setError('Failed to load ideas. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewIdea = () => {
    setCurrentSection('new-idea');
  };

  const handleIdeaCreated = async (newIdea) => {
    try {
      // Save the new idea to the backend
      const savedIdea = await apiService.createStartupIdea({
        name: newIdea.name,
        description: newIdea.description,
        industry: newIdea.industry,
        leanCanvas: newIdea.leanCanvas,
        hypotheses: newIdea.hypotheses,
        storytelling: newIdea.storytelling
      });
      
      // Update local state
      setCurrentIdea(savedIdea);
      setUserIdeas(prev => [savedIdea, ...prev]);
      setCurrentSection('startup-idea');
    } catch (err) {
      console.error('Failed to save new idea:', err);
      setError('Failed to save idea. Please try again.');
      // Still update local state for now
      setCurrentIdea(newIdea);
      setCurrentSection('startup-idea');
    }
  };

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your startup ideas...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              loadUserIdeas();
            }}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const renderMainContent = () => {
    switch (currentSection) {
      case 'new-idea':
        return <NewIdeaSection onIdeaCreated={handleIdeaCreated} />;
      case 'business-prototype':
        return <BusinessPrototypeSection currentIdea={currentIdea} />;
      case 'validation':
        return <ValidationSection currentIdea={currentIdea} />;
      case 'storytelling':
        return <StorytellingSection currentIdea={currentIdea} />;
      case 'connect-dashboard':
        return <ConnectDashboardSection />;
      default:
        return <StartupIdeaSection onNavigate={handleSectionChange} currentIdea={currentIdea} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path 
                  d="M8 24L16 8L24 24L20 16L12 16L8 24Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="text-lg font-bold">zigzag</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <button className="w-full flex items-center px-4 py-3 bg-blue-800 rounded-lg transition-colors duration-200">
            <span className="mr-3">💡</span>
            <span className="font-medium">New Idea</span>
          </button>
        </div>

        {/* Your Ideas Section */}
        <div className="px-4">
          <h3 className="text-sm font-medium text-blue-300 mb-3">Your Ideas</h3>
          <div className="flex items-center px-4 py-3 bg-blue-800 rounded-lg">
            <span className="mr-3">🌐</span>
            <div className="text-left flex-1">
              <div className="font-medium">{currentIdea.name}</div>
              <div className="text-xs text-blue-300">{currentIdea.description}</div>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-blue-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">CTO Sea Sands Dubai</div>
            </div>
            <button
              onClick={onLogout}
              className="text-blue-300 hover:text-white"
              title="Logout"
            >
              🚪
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        {renderMainContent()}
      </main>
      
      {/* Right Sidebar */}
      <div className="w-64 bg-gray-50 border-l border-gray-200 p-6">
        <div className="text-sm text-teal-600 font-medium mb-4">On this page</div>
        <nav className="space-y-2">
          <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Your startup idea
          </a>
          <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Business Prototype
          </a>
          <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Validation
          </a>
          <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Storytelling Central
          </a>
          <a href="#" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
            Connect Dashboard
          </a>
        </nav>
      </div>
    </div>
  );
};
// Additional Components for Enhanced Functionality

// New Idea Creation Section
const NewIdeaSection = ({ onIdeaCreated }) => {
  const [ideaText, setIdeaText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  
  const generationSteps = [
    'Analyzing your idea...',
    'Detecting industry patterns...',
    'Generating customer insights...',
    'Creating business model...',
    'Developing validation hypotheses...',
    'Crafting storytelling elements...',
    'Finalizing comprehensive plan...'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    setIsGenerating(true);
    setGenerationStep(0);
    
    try {
      const interval = setInterval(async () => {
        setGenerationStep(prev => {
          if (prev < generationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            generateIdeaFromBackend();
            return prev;
          }
        });
      }, 800);
    } catch (error) {
      console.error('Error generating idea:', error);
      setIsGenerating(false);
    }
  };

  const generateIdeaFromBackend = async () => {
    try {
      const generatedContent = await apiService.generateStartupContent(ideaText);
      
      const newIdea = {
        name: generatedContent.name,
        description: ideaText,
        industry: generatedContent.industry,
        leanCanvas: generatedContent.leanCanvas,
        hypotheses: generatedContent.hypotheses,
        storytelling: generatedContent.storytelling,
        created: new Date().toISOString()
      };
      
      onIdeaCreated(newIdea);
    } catch (error) {
      console.error('Backend generation failed:', error);
      const newIdea = {
        name: 'New Startup Idea',
        description: ideaText,
        industry: 'general_tech',
        leanCanvas: {
          problems: ['Market inefficiency', 'Customer pain points'],
          solutions: ['Innovative platform', 'Technology solution'],
          customers: ['Target demographic', 'Business users'],
          competitors: ['Industry leader 1', 'Industry leader 2'],
          valueProposition: 'Innovative solution that solves key market problems',
          channels: ['Digital marketing', 'Direct sales'],
          revenue: ['Subscription fees', 'Transaction fees'],
          keyMetrics: ['User acquisition', 'Revenue growth']
        },
        hypotheses: [
          { type: 'Desirability', text: 'Customers have the problem we are solving', criticality: 'High', method: 'Customer interviews' }
        ],
        storytelling: {
          names: ['StartupCo', 'InnovateTech'],
          mission: 'To solve important problems with innovative solutions',
          vision: 'To become a leading company in our industry',
          values: ['Innovation', 'Quality', 'Impact'],
          elevatorPitch: 'Our startup addresses key market needs through innovative technology solutions.'
        },
        created: new Date().toISOString()
      };
      onIdeaCreated(newIdea);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🚀 Create Your Startup Idea</h1>
        <p className="text-xl text-gray-600 mb-8">
          Describe your startup idea and let our AI generate a comprehensive business plan in minutes
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
              Describe your startup idea
            </label>
            <textarea
              id="idea"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="e.g., A social trading platform that allows retail investors to follow and copy the trades of experienced traders in real-time..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              rows={6}
              disabled={isGenerating}
            />
          </div>

          <button
            type="submit"
            disabled={!ideaText.trim() || isGenerating}
            className="w-full flex items-center justify-center px-6 py-4 bg-teal-600 text-white text-lg font-medium rounded-lg hover:bg-teal-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isGenerating ? (
              <div className="flex items-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                <span>Generating Your Business Plan...</span>
              </div>
            ) : (
              <>
                <span>🎯 Generate Business Plan</span>
                <span className="ml-2 text-sm opacity-75">(~2 minutes)</span>
              </>
            )}
          </button>
        </form>
      </div>

      {isGenerating && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <div className="animate-spin w-6 h-6 border-2 border-teal-500 border-t-transparent rounded-full mr-3"></div>
            <h3 className="text-lg font-semibold text-gray-900">AI is working on your idea...</h3>
          </div>
          
          <div className="space-y-3">
            {generationSteps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center text-xs font-medium ${
                  index < generationStep ? 'bg-green-500 text-white' :
                  index === generationStep ? 'bg-teal-500 text-white animate-pulse' :
                  'bg-gray-200 text-gray-500'
                }`}>
                  {index < generationStep ? '✓' : index + 1}
                </div>
                <span className={`${
                  index <= generationStep ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${((generationStep + 1) / generationSteps.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 text-center">
              {Math.round(((generationStep + 1) / generationSteps.length) * 100)}% complete
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Business Prototype Section
const BusinessPrototypeSection = ({ currentIdea }) => {
  if (!currentIdea || !currentIdea.leanCanvas) return null;

  const leanCanvas = currentIdea.leanCanvas;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Prototype</h1>
        <p className="text-gray-600">Transform your idea into a tangible blueprint ensuring a solid foundation for your startup journey.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-3">A. Problems</h3>
            <div className="space-y-2">
              {leanCanvas.problems.map((problem, index) => (
                <div key={index} className="text-sm text-red-800">{problem}</div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3">B. Solutions</h3>
            <div className="space-y-2">
              {leanCanvas.solutions.map((solution, index) => (
                <div key={index} className="text-sm text-green-800">{solution}</div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3">C. Value Proposition</h3>
            <div className="text-sm text-purple-800">{leanCanvas.valueProposition}</div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3">D. Customer Segments</h3>
            <div className="space-y-2">
              {leanCanvas.customers.map((customer, index) => (
                <div key={index} className="text-sm text-blue-800">{customer}</div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-3">E. Channels</h3>
            <div className="space-y-2">
              {leanCanvas.channels.map((channel, index) => (
                <div key={index} className="text-sm text-yellow-800">{channel}</div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h3 className="font-semibold text-teal-900 mb-3">F. Revenue Streams</h3>
            <div className="space-y-2">
              {leanCanvas.revenue.map((revenue, index) => (
                <div key={index} className="text-sm text-teal-800">{revenue}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validation Section
const ValidationSection = ({ currentIdea }) => {
  if (!currentIdea || !currentIdea.hypotheses) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation</h1>
        <p className="text-gray-600">Critical hypotheses that need validation to ensure your startup success.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Critical Hypotheses</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hypothesis</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Criticality</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Method</th>
              </tr>
            </thead>
            <tbody>
              {currentIdea.hypotheses.map((hypothesis, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hypothesis.type === 'Desirability' ? 'bg-green-100 text-green-800' :
                      hypothesis.type === 'Viability' ? 'bg-blue-100 text-blue-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {hypothesis.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-700">{hypothesis.text}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      hypothesis.criticality === 'High' ? 'bg-red-100 text-red-800' :
                      hypothesis.criticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {hypothesis.criticality}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{hypothesis.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Storytelling Section
const StorytellingSection = ({ currentIdea }) => {
  if (!currentIdea || !currentIdea.storytelling) return null;

  const storytelling = currentIdea.storytelling;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Storytelling Central</h1>
        <p className="text-gray-600">Craft compelling narratives that resonate with your audience.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Startup Names</h3>
          <div className="grid grid-cols-2 gap-3">
            {storytelling.names.map((name, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg text-center font-medium">
                {name}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Mission & Vision</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Mission</h4>
              <p className="text-sm text-gray-600">{storytelling.mission}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Vision</h4>
              <p className="text-sm text-gray-600">{storytelling.vision}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Core Values</h3>
          <div className="space-y-3">
            {storytelling.values.map((value, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <p className="text-sm text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Elevator Pitch</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">{storytelling.elevatorPitch}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Connect Dashboard Section
const ConnectDashboardSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Connect with mentors, investors, and access exclusive startup perks.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold">Mentors</h3>
            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Coming Soon</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Connect with experienced entrepreneurs and industry experts.</p>
          <button disabled className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
            🔒 Unlock Mentorship
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold">Investors & Accelerators</h3>
            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">Coming Soon</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Get discovered by investors and accelerator programs.</p>
          <button disabled className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
            🔒 Access Funding
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold">Startup Perks</h3>
            <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Available</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">Access exclusive deals and credits for startup tools.</p>
          <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            🎁 View Perks
          </button>
        </div>
      </div>
    </div>
  );
};
