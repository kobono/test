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