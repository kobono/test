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
  const handleLogin = () => {
    console.log('Login button clicked!');
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
              <path d="M8 24L16 8L24 24L20 16L12 16L8 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
            </svg>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome</h1>
          <p className="text-gray-600">Log in to zigzag</p>
        </div>

        <div className="space-y-3">
          <button onClick={handleLogin} className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button onClick={handleLogin} className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
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
  <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
    Generated
  </span>
);

// ZigZag Workspace Component
export const ZigZagWorkspace = ({ onLogout }) => {
  const [currentSection, setCurrentSection] = useState('startup-idea');
  const [currentIdea, setCurrentIdea] = useState(null);
  const [userIdeas, setUserIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUserIdeas();
  }, []);

  const loadUserIdeas = async () => {
    try {
      setLoading(true);
      const ideas = await apiService.getStartupIdeas();
      setUserIdeas(ideas);
      
      if (ideas.length > 0) {
        setCurrentIdea(ideas[0]);
      } else {
        // Default TradeHive idea matching the screenshots
        setCurrentIdea({
          id: 'default',
          name: 'TradeHive',
          description: 'social trading platform',
          industry: 'trading',
          leanCanvas: {
            problems: [
              'Difficulty in making informed trading decisions',
              'Lack of transparency and trust in financial markets'
            ],
            solutions: [
              'Real-time social feed for trading insights',
              'Copy-trading feature that replicates top traders\' actions'
            ],
            customers: [
              'Millennial Investors',
              'Retirement Planners', 
              'Aspiring Full-time Traders',
              'Financial Enthusiast Students'
            ],
            competitors: [
              'eToro',
              'ZuluTrade', 
              'CopyMe',
              'NAGA',
              'TradingView',
              'PeopTrade',
              'Traditional'
            ],
            valueProposition: 'Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.',
            channels: [
              'Mobile and desktop applications',
              'Social media',
              'Trading forums and communities',
              'Financial blogs'
            ],
            revenue: [
              'Trading commissions',
              'Premium subscriptions', 
              'Copy-trading fees'
            ],
            keyMetrics: [
              'Number of active users',
              'Volume of trades executed',
              'User retention rates',
              'Social'
            ]
          },
          hypotheses: [
            {
              type: 'Desirability',
              text: 'Traders are interested in a social trading platform that allows them to connect, share insights, and collaborate with other traders.',
              criticality: 'High',
              method: 'Validation survey'
            },
            {
              type: 'Viability', 
              text: 'The commission model for mirroring trades on the platform is competitive and sustainable for the business.',
              criticality: 'High',
              method: 'Financial projection analysis'
            },
            {
              type: 'Feasibility',
              text: 'The technology infrastructure required to support real-time data feeds and trade execution can be built within budget constraints.',
              criticality: 'High', 
              method: 'Expert interview'
            }
          ],
          storytelling: {
            mission: 'Empower individuals to trade, connect, and learn from each other through a social trading platform, revolutionizing the way people engage in financial markets and investing.',
            vision: 'To create a global community of traders and investors who collaborate, share knowledge, and drive financial empowerment for all.',
            values: [
              'Collaboration: Fostering a supportive community where traders can collaborate, learn from each other, and grow together.',
              'Transparency: Providing open and transparent information to empower users to make informed decisions and build trust within the community.',
              'Innovation: Constantly evolving and introducing innovative features to enhance the trading experience and provide cutting-edge tools for users.',
              'Empowerment: Empowering individuals to take control of their financial futures through education, access to markets, and social engagement.'
            ],
            names: ['TradeHive', 'InvestorHub', 'TradingEdge', 'MarketMaster', 'FinanceFlow']
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

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleNewIdea = () => {
    setCurrentSection('new-idea');
  };

  const handleIdeaCreated = async (newIdea) => {
    try {
      const savedIdea = await apiService.createStartupIdea({
        name: newIdea.name,
        description: newIdea.description,
        industry: newIdea.industry,
        leanCanvas: newIdea.leanCanvas,
        hypotheses: newIdea.hypotheses,
        storytelling: newIdea.storytelling
      });
      
      setCurrentIdea(savedIdea);
      setUserIdeas(prev => [savedIdea, ...prev]);
      setCurrentSection('startup-idea');
    } catch (err) {
      console.error('Failed to save new idea:', err);
      setCurrentIdea(newIdea);
      setCurrentSection('startup-idea');
    }
  };

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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-blue-900 text-white min-h-screen flex flex-col">
        {/* Logo */}
        <div className="p-4 border-b border-blue-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center mr-3">
              <svg width="16" height="16" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
                <path d="M8 24L16 8L24 24L20 16L12 16L8 24Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="currentColor"/>
              </svg>
            </div>
            <span className="text-lg font-bold">zigzag</span>
          </div>
        </div>

        {/* New Idea Button */}
        <div className="p-4">
          <button
            onClick={handleNewIdea}
            className="w-full flex items-center px-4 py-3 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <span className="mr-3">💡</span>
            <span className="font-medium">New Idea</span>
          </button>
        </div>

        {/* Your Ideas Section */}
        <div className="px-4 flex-1">
          <h3 className="text-sm font-medium text-blue-300 mb-3">Your Ideas</h3>
          {currentIdea && (
            <div className="flex items-center px-4 py-3 bg-blue-800 rounded-lg mb-4">
              <span className="mr-3">🌐</span>
              <div className="text-left flex-1 min-w-0">
                <div className="font-medium truncate">{currentIdea.name}</div>
                <div className="text-xs text-blue-300 truncate">{currentIdea.description}</div>
              </div>
              <div className="ml-auto flex space-x-1">
                <button className="text-blue-300 hover:text-white p-1">✏️</button>
                <button className="text-blue-300 hover:text-red-300 p-1">🗑️</button>
              </div>
            </div>
          )}
        </div>

        {/* More Section */}
        <div className="px-4 pb-4">
          <h3 className="text-sm font-medium text-blue-300 mb-3">More</h3>
          <button className="w-full flex items-center px-4 py-3 text-blue-300 hover:bg-blue-800 rounded-lg transition-colors duration-200">
            <span className="mr-3">📄</span>
            <span className="text-sm">Print Selected Idea</span>
          </button>
          <button className="w-full flex items-center px-4 py-3 text-blue-300 hover:bg-blue-800 rounded-lg transition-colors duration-200 mt-2">
            <span className="mr-3">📚</span>
            <span className="text-sm">Resource Library</span>
          </button>
        </div>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-blue-800">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-400 rounded-full mr-3"></div>
            <div className="flex-1">
              <div className="text-sm font-medium">CTO Sea Sands Dubai</div>
            </div>
            <button onClick={onLogout} className="text-blue-300 hover:text-white" title="Logout">🚪</button>
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
          <button 
            onClick={() => handleSectionChange('startup-idea')}
            className={`block w-full text-left text-sm transition-colors duration-200 ${
              currentSection === 'startup-idea' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Your startup idea
          </button>
          <button 
            onClick={() => handleSectionChange('business-prototype')}
            className={`block w-full text-left text-sm transition-colors duration-200 ${
              currentSection === 'business-prototype' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Business Prototype
          </button>
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-500">Lean Canvas</div>
          </div>
          <button 
            onClick={() => handleSectionChange('validation')}
            className={`block w-full text-left text-sm transition-colors duration-200 ${
              currentSection === 'validation' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Validation
          </button>
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-500">Critical Hypotheses</div>
            <div className="text-xs text-gray-500">Validation Experiments</div>
          </div>
          <button 
            onClick={() => handleSectionChange('storytelling')}
            className={`block w-full text-left text-sm transition-colors duration-200 ${
              currentSection === 'storytelling' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Storytelling Central
          </button>
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-500">Brand Wheel</div>
            <div className="text-xs text-gray-500">Startup Naming</div>
            <div className="text-xs text-gray-500">Elevator Pitch</div>
          </div>
          <button 
            onClick={() => handleSectionChange('connect-dashboard')}
            className={`block w-full text-left text-sm transition-colors duration-200 ${
              currentSection === 'connect-dashboard' ? 'text-teal-600 font-medium' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Connect Dashboard
          </button>
          <div className="ml-4 space-y-1">
            <div className="text-xs text-gray-500">Mentors</div>
            <div className="text-xs text-gray-500">Investors & Accelerators</div>
            <div className="text-xs text-gray-500">Perks</div>
            <div className="text-xs text-gray-500">Service Providers</div>
          </div>
        </nav>
      </div>
    </div>
  );
};

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
// StartupIdeaSection - Main dashboard matching screenshot 1
const StartupIdeaSection = ({ onNavigate, currentIdea }) => {
  if (!currentIdea) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Startup Idea</h1>
          <GeneratedBadge />
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => onNavigate('business-prototype')}
            className="flex items-center px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            <span className="mr-2">🚀</span>
            Unleash your Startup Idea
            <span className="ml-2 text-sm bg-teal-700 px-2 py-1 rounded">in 2 mins</span>
          </button>
        </div>
      </div>

      {/* Startup Idea Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">{currentIdea.description}</h2>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-gray-600">
            Your AI Entrepreneur in Residence prepares a first draft of the below for your review:
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Business Prototype */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('business-prototype')}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Business Prototype</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-teal-600 font-medium">Lean Canvas →</span>
                <span className="ml-auto text-gray-500">Customer Segments</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-teal-600 font-medium">Lean Canvas →</span>
                <span className="ml-auto text-gray-500">Existing Alternatives</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="font-medium">Lean Canvas</span>
              </div>
            </div>
          </div>

          {/* Validation */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('validation')}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Validation</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="font-medium">Critical Hypotheses</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-teal-600 font-medium">Experiments →</span>
                <span className="ml-auto text-gray-500">Customer Interview</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="text-teal-600 font-medium">Experiments →</span>
                <span className="ml-auto text-gray-500">Landing Page</span>
              </div>
            </div>
          </div>

          {/* Storytelling Central */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('storytelling')}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Storytelling Central</h3>
            <div className="space-y-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="font-medium">Brand Wheel</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="font-medium">Startup Naming</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-3">✓</span>
                <span className="font-medium">Elevator Pitch</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Business Prototype Section - Matching screenshot 2
const BusinessPrototypeSection = ({ currentIdea }) => {
  if (!currentIdea || !currentIdea.leanCanvas) return null;

  const leanCanvas = currentIdea.leanCanvas;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Prototype</h1>
        <p className="text-gray-600">Transform your idea into a tangible blueprint ensuring a solid foundation for your startup journey.</p>
      </div>

      {/* Lean Canvas */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Lean Canvas</h2>
            <GeneratedBadge />
            <p className="text-gray-600 text-sm mt-2">A streamlined one-page business plan template that succinctly captures your startup's vision.</p>
          </div>
          <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            <span className="mr-2">👁️</span>
            Details
          </button>
        </div>

        {/* Lean Canvas Grid */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {/* Top Row */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-3 text-sm">B. Problem</h3>
            <div className="space-y-2">
              {leanCanvas.problems?.map((problem, index) => (
                <div key={index} className="text-xs text-blue-800">• {problem}</div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-3 text-sm">D. Solution</h3>
            <div className="space-y-2">
              {leanCanvas.solutions?.map((solution, index) => (
                <div key={index} className="text-xs text-green-800">• {solution}</div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-3 text-sm">E. Unique Value Proposition</h3>
            <div className="text-xs text-purple-800 font-medium mb-2">Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.</div>
          </div>

          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-3 text-sm">J. Unfair Advantage</h3>
            <div className="text-xs text-orange-800">Proprietary algorithm that surfaces trending trades and insights</div>
          </div>

          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-3 text-sm">A. Customer Segments</h3>
            <div className="space-y-1">
              {leanCanvas.customers?.map((customer, index) => (
                <div key={index} className="text-xs text-red-800">• {customer}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {/* Bottom Row */}
          <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-4">
            <h3 className="font-semibold text-teal-900 mb-3 text-sm">C. Existing Alternatives</h3>
            <div className="space-y-1">
              {leanCanvas.competitors?.map((competitor, index) => (
                <div key={index} className="text-xs text-teal-800">• {competitor}</div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-3 text-sm">I. Key Metrics</h3>
            <div className="space-y-1">
              {leanCanvas.keyMetrics?.map((metric, index) => (
                <div key={index} className="text-xs text-yellow-800">• {metric}</div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">F. Channels</h3>
            <div className="text-xs text-gray-700 font-medium mb-2">High Level Concept</div>
            <div className="text-xs text-gray-600">Social network meets trading floor</div>
            <div className="space-y-1 mt-2">
              {leanCanvas.channels?.map((channel, index) => (
                <div key={index} className="text-xs text-gray-700">• {channel}</div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-3 text-sm">Early Adopters</h3>
            <div className="space-y-1">
              <div className="text-xs text-indigo-800">• Young traders savvy with social media</div>
              <div className="text-xs text-indigo-800">• Investors</div>
            </div>
          </div>

          <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4">
            <h3 className="font-semibold text-pink-900 mb-3 text-sm">H. Cost Structure</h3>
            <div className="space-y-1">
              <div className="text-xs text-pink-800">• Platform development</div>
              <div className="text-xs text-pink-800">• Data feeds</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 mt-4">
          <div className="col-span-2"></div>
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-4">
            <h3 className="font-semibold text-emerald-900 mb-3 text-sm">G. Revenue Streams</h3>
            <div className="space-y-1">
              {leanCanvas.revenue?.map((revenue, index) => (
                <div key={index} className="text-xs text-emerald-800">• {revenue}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Validation Section - Matching screenshots 3 & 4
const ValidationSection = ({ currentIdea }) => {
  if (!currentIdea || !currentIdea.hypotheses) return null;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation</h1>
        <p className="text-gray-600">Navigate your startup's viability by identifying critical hypotheses and conducting experiments, ensuring you meet market needs.</p>
      </div>

      {/* Critical Hypotheses */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Critical Hypotheses</h2>
            <GeneratedBadge />
            <p className="text-gray-600 text-sm mt-2">Identify and prioritize the fundamental assumptions underpinning your business, setting the stage for essential validation tests.</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 font-medium text-gray-700">Hypothesis</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700">Criticality</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700">Testing Method</th>
                <th className="text-left py-4 px-4 font-medium text-gray-700"></th>
              </tr>
            </thead>
            <tbody>
              {currentIdea.hypotheses.map((hypothesis, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-6 px-4">
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center text-sm font-medium ${
                        hypothesis.type === 'Desirability' ? 'bg-green-100 text-green-800' :
                        hypothesis.type === 'Viability' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 mb-1">{hypothesis.type}</div>
                        <div className="text-sm text-gray-600">{hypothesis.text}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      hypothesis.criticality === 'High' ? 'bg-red-100 text-red-800' :
                      hypothesis.criticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {hypothesis.criticality}
                    </span>
                  </td>
                  <td className="py-6 px-4 text-sm text-gray-700">{hypothesis.method}</td>
                  <td className="py-6 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Validation Experiments */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Validation Experiments</h2>
          <p className="text-gray-600 text-sm">Design and execute strategic tests to validate or refute your startup's hypotheses, ensuring data-driven decisions in your entrepreneurial journey.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Customer Interview */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                🎤
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Customer Interview</h3>
                <GeneratedBadge />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Create a tailored questionnaire for customer discovery and problem exploration.</p>
            <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm">
              <span className="mr-2">👁️</span>
              Details
            </button>
          </div>

          {/* Landing Page */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                🌐
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Landing Page</h3>
                <GeneratedBadge />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Develop a simple webpage to illustrate your value proposition.</p>
            <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 text-sm">
              <span className="mr-2">✏️</span>
              Details
            </button>
          </div>

          {/* Create New Experiment */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              📧
            </div>
            <h3 className="font-medium text-gray-600 mb-1">Create a new</h3>
            <p className="text-sm text-gray-500 mb-3">Experiment</p>
            <p className="text-xs text-gray-400">(Coming soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Storytelling Section - Matching screenshots exactly
const StorytellingSection = ({ currentIdea }) => {
  const [activeTab, setActiveTab] = useState('startup-naming'); // Default to tab 02 as shown in screenshot
  
  if (!currentIdea || !currentIdea.storytelling) return null;

  const storytelling = currentIdea.storytelling;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brand-wheel':
        return (
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Mission</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{storytelling.mission}</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vision</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-700 leading-relaxed">{storytelling.vision}</p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Brand Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {storytelling.values?.map((value, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'startup-naming':
        return (
          <div className="p-8">
            {/* Name Grid */}
            <div className="grid grid-cols-5 gap-4 mb-8">
              {['TradeHive', 'EmpowerTrade', 'CollabFX', 'CommuniTrade', 'AscendTrades'].map((name, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="font-medium text-gray-900">{name}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-5 gap-4 mb-8">
              {['UnityBucks', 'TradePulse', 'Empowave', 'TradeSphere', 'CollaboraTrade'].map((name, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="font-medium text-gray-900">{name}</div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-5 gap-4 mb-8">
              {['CommunityTrade', 'InnoTradix', 'TradeSynergy', 'EmpowerNet', 'TraderConnect'].map((name, index) => (
                <div key={index} className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="font-medium text-gray-900">{name}</div>
                </div>
              ))}
            </div>

            {/* Selected Name */}
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-lg font-medium text-gray-700 mr-4">Selected Name:</span>
                <span className="text-xl font-semibold text-gray-900">TradeHive</span>
                <button className="ml-3 text-teal-600 hover:text-teal-700">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center">
                <div className="w-64 bg-gray-200 rounded-full h-2 mr-4">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
              </div>
            </div>
          </div>
        );
      
      case 'elevator-pitch':
        return (
          <div className="p-8">
            <div className="mb-6">
              <p className="text-gray-600 italic mb-4">Certainly! Here's your elevator pitch crafted in Markdown format:</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Did you know that traders and investors struggle to find a collaborative community to share knowledge and insights?</strong> This is a multi-billion dollar opportunity in the financial market industry in every corner of the world.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  TradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge. Unlike other alternatives, TradeHive focuses on building a strong community-driven platform where users can interact, share tips, and empower each other in the world of trading and investing.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Our team comprises experienced entrepreneurs and finance experts, and we generate revenue through subscription services and premium features. In essence, we are the "LinkedIn for traders," revolutionizing the way people engage in financial markets. Our vision...
                </p>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Storytelling Central</h1>
        <p className="text-gray-600">Craft a compelling narrative for your brand, select your startup's name, and captivate audiences with an unforgettable pitch.</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex">
            <button 
              onClick={() => setActiveTab('brand-wheel')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'brand-wheel' 
                  ? 'border-b-2 border-teal-500 text-teal-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`mr-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeTab === 'brand-wheel' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
                }`}>01</span>
                Brand Wheel
              </div>
              <div className="text-xs text-gray-500 mt-1">Define your brand positioning.</div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Generated
                </span>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('startup-naming')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'startup-naming' 
                  ? 'border-b-2 border-teal-500 text-teal-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`mr-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeTab === 'startup-naming' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
                }`}>02</span>
                Startup Naming
              </div>
              <div className="text-xs text-gray-500 mt-1">Find a compelling name.</div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Generated
                </span>
              </div>
            </button>
            
            <button 
              onClick={() => setActiveTab('elevator-pitch')}
              className={`px-6 py-4 font-medium text-sm ${
                activeTab === 'elevator-pitch' 
                  ? 'border-b-2 border-teal-500 text-teal-600' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center">
                <span className={`mr-2 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  activeTab === 'elevator-pitch' ? 'bg-teal-100 text-teal-600' : 'bg-gray-100 text-gray-500'
                }`}>03</span>
                Elevator Pitch
              </div>
              <div className="text-xs text-gray-500 mt-1">Craft your story.</div>
              <div className="mt-1">
                <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Generated
                </span>
              </div>
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

// Connect Dashboard Section - Matching screenshots exactly
const ConnectDashboardSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Progress in your validation journey to unlock a curated list of mentors, investors and potential partners tailored to your startup idea.</p>
      </div>

      {/* Connect with Relevant Mentors */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Mentors</h2>
          <span className="ml-3 px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">🔒 Coming Soon</span>
        </div>
        <p className="text-gray-600 mb-8">Harness industry wisdom for strategic navigation.</p>

        {/* Mentor Profiles */}
        <div className="grid grid-cols-5 gap-6">
          {[
            {
              name: 'Jenny Lawton',
              role: 'Executive VP @',
              company: 'Roister',
              category: 'Business Leadership',
              avatar: '👩‍💼'
            },
            {
              name: 'Khaled Nasr',
              role: 'GP @ Interwest',
              company: 'Partners',
              category: 'Investment',
              avatar: '👨‍💼'
            },
            {
              name: 'Georges Khoury',
              role: 'Software Engineer',
              company: '(Ex: Uber)',
              category: 'Product Management',
              avatar: '👨‍💻'
            },
            {
              name: 'Mira Murali',
              role: 'CTO @ OpenAI',
              company: '',
              category: 'AI',
              avatar: '👩‍💻'
            },
            {
              name: 'Scott Ford',
              role: 'Partner @ Zigzag',
              company: '',
              category: 'Operations',
              avatar: '👨‍💼'
            }
          ].map((mentor, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                {mentor.avatar}
              </div>
              <h3 className="font-medium text-gray-900 text-sm">{mentor.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{mentor.role}</p>
              <p className="text-xs text-gray-600 mb-2">{mentor.company}</p>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {mentor.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Connect with Relevant Investors & Accelerators */}
      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Investors & Accelerators</h2>
          <span className="ml-3 px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">🔒 Coming Soon</span>
        </div>
        <p className="text-gray-600 mb-8">Secure funding, networks, and growth catalysts.</p>

        {/* Investor Logos */}
        <div className="grid grid-cols-5 gap-8 mb-12">
          {[
            { name: 'Techstars', type: 'Accelerator', logo: '⭐' },
            { name: 'Berkeley SkyDeck', type: 'Accelerator', logo: '🏛️' },
            { name: 'SparkLabs', type: 'Accelerator', logo: '⚡' },
            { name: 'Band of Angels', type: 'Angel Network', logo: '👼' },
            { name: 'Y Combinator', type: 'Accelerator', logo: '🅱️' }
          ].map((investor, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl">
                {investor.logo}
              </div>
              <h3 className="font-medium text-gray-900 text-sm mb-1">{investor.name}</h3>
              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {investor.type}
              </span>
            </div>
          ))}
        </div>

        {/* Access Relevant Perks */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Relevant Perks</h2>
          <p className="text-gray-600 mb-8">Capitalize on cost-saving opportunities and benefits.</p>

          {/* Perks Grid */}
          <div className="grid grid-cols-4 gap-8">
            {[
              {
                name: 'Carta',
                service: 'Equity Management',
                offer: 'Start for Free',
                logo: '📊'
              },
              {
                name: 'Dropbox',
                service: 'Cloud Storage',
                offer: 'Up to 50% Discount',
                logo: '📦'
              },
              {
                name: 'Google for Startups',
                service: 'Cloud Services',
                offer: 'Up to $200,000',
                logo: '🌐'
              },
              {
                name: 'Notion',
                service: 'Knowledge Management',
                offer: '6 Months Free',
                logo: '📝'
              }
            ].map((perk, index) => (
              <div key={index} className="text-center border border-gray-200 rounded-lg p-6">
                <div className="w-12 h-12 bg-gray-100 rounded mx-auto mb-4 flex items-center justify-center text-xl">
                  {perk.logo}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{perk.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{perk.service}</p>
                <div className="text-sm font-medium text-teal-600">{perk.offer}</div>
              </div>
            ))}
          </div>

          {/* Click Here for More */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Click Here for More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
