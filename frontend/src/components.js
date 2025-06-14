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

// AI Research Agent - Generates content based on startup idea
const generateStartupContent = (ideaText) => {
  const idea = ideaText.toLowerCase();
  
  // Extract key industry/domain from the idea
  const getIndustry = () => {
    if (idea.includes('food') || idea.includes('restaurant') || idea.includes('delivery')) return 'food_tech';
    if (idea.includes('fitness') || idea.includes('health') || idea.includes('wellness')) return 'health_tech';
    if (idea.includes('education') || idea.includes('learning') || idea.includes('course')) return 'ed_tech';
    if (idea.includes('finance') || idea.includes('payment') || idea.includes('banking')) return 'fin_tech';
    if (idea.includes('trade') || idea.includes('trading') || idea.includes('investment')) return 'trading';
    if (idea.includes('ai') || idea.includes('artificial intelligence') || idea.includes('machine learning')) return 'ai_tech';
    if (idea.includes('social') || idea.includes('community') || idea.includes('network')) return 'social_tech';
    if (idea.includes('ecommerce') || idea.includes('marketplace') || idea.includes('shopping')) return 'ecommerce';
    if (idea.includes('travel') || idea.includes('booking') || idea.includes('tourism')) return 'travel_tech';
    if (idea.includes('real estate') || idea.includes('property') || idea.includes('housing')) return 'prop_tech';
    return 'general_tech';
  };

  const industry = getIndustry();
  
  const industryData = {
    trading: {
      names: ['TradeHive', 'InvestorHub', 'TradingEdge', 'MarketMaster', 'FinanceFlow', 'TradePro', 'InvestLink', 'MarketMind', 'TradeSphere', 'CapitalConnect'],
      problems: ['Difficulty making informed trading decisions', 'Lack of transparency in financial markets', 'High barriers to entry for new investors'],
      solutions: ['Social trading platform', 'Real-time market insights', 'Copy-trading features'],
      customers: ['Millennial investors', 'Retirement planners', 'Day traders', 'Financial enthusiast students'],
      competitors: ['eToro', 'Robinhood', 'TradingView', 'Interactive Brokers', 'TD Ameritrade', 'ZuluTrade', 'CopyMe', 'NAGA'],
      valueProposition: 'Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.',
      channels: ['Mobile app', 'Financial blogs', 'Social media', 'Trading forums and communities'],
      revenue: ['Trading commissions', 'Premium subscriptions', 'Copy-trading fees', 'Advertisement revenue from financial services'],
      keyMetrics: ['Active traders', 'Trading volume', 'Platform assets', 'User retention rates', 'Social engagement'],
      hypotheses: [
        { type: 'Desirability', text: 'Traders want to share and copy successful trading strategies', criticality: 'High', method: 'Trading community survey' },
        { type: 'Viability', text: 'Users will pay for premium trading insights and tools', criticality: 'High', method: 'Freemium conversion test' },
        { type: 'Feasibility', text: 'Real-time data feeds can be integrated cost-effectively', criticality: 'High', method: 'Technical feasibility study' }
      ],
      mission: 'Democratize trading by creating a collaborative platform where investors can learn, share, and grow together.',
      vision: 'To build the largest community of transparent, collaborative traders who empower each other to achieve financial success.',
      values: ['Transparency: Open sharing of trading strategies and results', 'Education: Helping traders learn and improve', 'Community: Building supportive trading relationships'],
      elevatorPitch: `Did you know that traders and investors struggle to find a collaborative community to share knowledge and insights? This represents a significant opportunity in the financial markets industry.\n\nTradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge. Unlike other alternatives, we focus on building a strong community-driven platform where users can interact, share tips, and empower each other.\n\nOur team comprises experienced entrepreneurs and finance experts, and we generate revenue through subscription services and premium features. In essence, we are the "LinkedIn for traders," revolutionizing the way people engage in financial markets.`
    }
  };

  const defaultData = {
    names: ['StartupCo', 'InnovateTech', 'BusinessFlow', 'TechSolution', 'GrowthHub'],
    problems: ['Market inefficiencies', 'Customer pain points', 'Technology gaps'],
    solutions: ['Innovative platform', 'Technology solution', 'Service optimization'],
    customers: ['Target demographic', 'Business users', 'End consumers'],
    competitors: ['Industry leader 1', 'Industry leader 2', 'Emerging competitor'],
    valueProposition: 'Innovative solution that solves key market problems efficiently',
    channels: ['Digital marketing', 'Direct sales', 'Partnerships'],
    revenue: ['Subscription fees', 'Transaction fees', 'Premium services'],
    keyMetrics: ['User acquisition', 'Revenue growth', 'Customer satisfaction'],
    hypotheses: [
      { type: 'Desirability', text: 'Target customers have the problem we are solving', criticality: 'High', method: 'Customer interviews' },
      { type: 'Viability', text: 'Business model generates sustainable revenue', criticality: 'High', method: 'Financial modeling' },
      { type: 'Feasibility', text: 'Solution can be built with available technology', criticality: 'Medium', method: 'Technical validation' }
    ],
    mission: 'To solve important problems and create value for our customers through innovative solutions.',
    vision: 'To become a leading company that transforms how people interact with technology.',
    values: ['Innovation: Constantly pushing boundaries', 'Quality: Delivering excellent solutions', 'Impact: Making a meaningful difference'],
    elevatorPitch: 'Our startup addresses key market needs through innovative technology solutions that create value for customers and drive business growth.'
  };

  const data = industryData[industry] || defaultData;
  
  return {
    name: data.names[0],
    description: ideaText,
    industry: industry,
    leanCanvas: {
      problems: data.problems,
      solutions: data.solutions,
      customers: data.customers,
      competitors: data.competitors,
      valueProposition: data.valueProposition,
      channels: data.channels,
      revenue: data.revenue,
      keyMetrics: data.keyMetrics
    },
    hypotheses: data.hypotheses,
    storytelling: {
      names: data.names,
      mission: data.mission,
      vision: data.vision,
      values: data.values,
      elevatorPitch: data.elevatorPitch
    },
    created: new Date().toISOString()
  };
};

// Left Sidebar Component
const LeftSidebar = ({ currentSection, onSectionChange, onLogout, currentIdea, onNewIdea }) => {
  return (
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

      {/* New Idea Button */}
      <div className="p-4">
        <button
          onClick={() => onNewIdea()}
          className="w-full flex items-center px-4 py-3 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          <span className="mr-3">💡</span>
          <span className="font-medium">New Idea</span>
        </button>
      </div>

      {/* Your Ideas Section */}
      <div className="px-4">
        <h3 className="text-sm font-medium text-blue-300 mb-3">Your Ideas</h3>
        <button
          onClick={() => onSectionChange('startup-idea')}
          className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 mb-2 ${
            currentSection === 'startup-idea' ? 'bg-blue-800' : 'hover:bg-blue-800'
          }`}
        >
          <span className="mr-3">🌐</span>
          <div className="text-left flex-1">
            <div className="font-medium">{currentIdea.name}</div>
            <div className="text-xs text-blue-300">{currentIdea.description}</div>
          </div>
          <div className="ml-auto flex space-x-1">
            <button className="text-blue-300 hover:text-white">✏️</button>
            <button className="text-blue-300 hover:text-white">🗑️</button>
          </div>
        </button>
      </div>

      {/* More Section */}
      <div className="px-4 mt-6">
        <h3 className="text-sm font-medium text-blue-300 mb-3">More</h3>
        <div className="space-y-1">
          <button className="w-full flex items-center px-4 py-2 text-left text-blue-200 hover:text-white hover:bg-blue-800 rounded-lg transition-colors duration-200">
            <span className="mr-3">🖨️</span>
            <span>Print Selected Idea</span>
          </button>
          <button className="w-full flex items-center px-4 py-2 text-left text-blue-200 hover:text-white hover:bg-blue-800 rounded-lg transition-colors duration-200">
            <span className="mr-3">📚</span>
            <span>Resource Library</span>
          </button>
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
  );
};

// Right Sidebar Component
const RightSidebar = ({ currentSection }) => {
  const getNavigationItems = () => {
    switch (currentSection) {
      case 'startup-idea':
        return [
          'Your startup idea',
          'Business Prototype',
          'Lean Canvas',
          'Validation',
          'Critical Hypotheses',
          'Validation Experiments',
          'Storytelling Central',
          'Brand Wheel',
          'Startup Naming',
          'Elevator Pitch',
          'Connect Dashboard',
          'Mentors',
          'Investors & Accelerators',
          'Perks',
          'Service Providers'
        ];
      case 'business-prototype':
        return [
          'Your startup idea',
          'Business Prototype',
          'Lean Canvas'
        ];
      case 'validation':
        return [
          'Your startup idea',
          'Business Prototype',
          'Lean Canvas',
          'Validation',
          'Critical Hypotheses',
          'Validation Experiments'
        ];
      case 'storytelling':
        return [
          'Your startup idea',
          'Business Prototype',
          'Lean Canvas',
          'Validation',
          'Critical Hypotheses',
          'Validation Experiments',
          'Storytelling Central',
          'Brand Wheel',
          'Startup Naming',
          'Elevator Pitch'
        ];
      case 'connect-dashboard':
        return [
          'Your startup idea',
          'Business Prototype',
          'Lean Canvas',
          'Validation',
          'Critical Hypotheses',
          'Validation Experiments',
          'Storytelling Central',
          'Brand Wheel',
          'Startup Naming',
          'Elevator Pitch',
          'Connect Dashboard',
          'Mentors',
          'Investors & Accelerators',
          'Perks',
          'Service Providers'
        ];
      default:
        return [];
    }
  };

  if (currentSection === 'lean-canvas-details') {
    return null; // No right sidebar for lean canvas details
  }

  const navigationItems = getNavigationItems();

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-6">
      <div className="text-sm text-teal-600 font-medium mb-4">On this page</div>
      <nav className="space-y-2">
        {navigationItems.map((item, index) => (
          <a
            key={index}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className="block text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
  );
};

// New Idea Form Component
const NewIdeaSection = ({ onIdeaCreated }) => {
  const [ideaText, setIdeaText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);

  const generationSteps = [
    'Analyzing market opportunity...',
    'Identifying target customers...',
    'Researching competitors...',
    'Creating business model...',
    'Generating critical hypotheses...',
    'Developing brand strategy...',
    'Finalizing validation plan...'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    setIsGenerating(true);
    setGenerationStep(0);
    
    try {
      // Simulate AI processing with step-by-step updates
      const interval = setInterval(async () => {
        setGenerationStep(prev => {
          if (prev < generationSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            // Use backend API to generate comprehensive startup data
            generateIdeaFromBackend();
            return prev;
          }
        });
      }, 500);
    } catch (error) {
      console.error('Error generating idea:', error);
      setIsGenerating(false);
      // Fallback to local generation
      const newIdea = generateStartupContent(ideaText);
      onIdeaCreated(newIdea);
    }
  };

  const generateIdeaFromBackend = async () => {
    try {
      // Call backend API to generate startup content
      const generatedContent = await apiService.generateStartupContent(ideaText);
      
      // Create the new idea object
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
      console.error('Backend generation failed, using local fallback:', error);
      // Fallback to local generation
      const newIdea = generateStartupContent(ideaText);
      onIdeaCreated(newIdea);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Startup Idea</h1>
        <p className="text-gray-600">Describe your startup idea and let our AI Entrepreneur in Residence help you validate it.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="idea" className="block text-sm font-medium text-gray-700 mb-2">
              What's your startup idea?
            </label>
            <textarea
              id="idea"
              value={ideaText}
              onChange={(e) => setIdeaText(e.target.value)}
              placeholder="e.g., AI-powered fitness app that creates personalized workout plans"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 resize-none"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isGenerating || !ideaText.trim()}
            className={`w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
              isGenerating || !ideaText.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-teal-600 text-white hover:bg-teal-700'
            }`}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Generating your comprehensive startup plan...
              </div>
            ) : (
              '🚀 Generate Complete Startup Plan'
            )}
          </button>
        </form>

        {isGenerating && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-4">AI Research Agent is analyzing your idea...</h3>
            <div className="space-y-3">
              {generationSteps.map((step, index) => (
                <div key={index} className={`flex items-center text-sm ${
                  index <= generationStep ? 'text-blue-800' : 'text-blue-400'
                }`}>
                  {index < generationStep ? (
                    <span className="text-green-500 mr-2">✓</span>
                  ) : index === generationStep ? (
                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full mr-2"></div>
                  ) : (
                    <span className="text-gray-400 mr-2">○</span>
                  )}
                  {step}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Content Components
const StartupIdeaSection = ({ onNavigate, currentIdea }) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-bold text-gray-900">Your Startup Idea</h1>
          <GeneratedBadge />
        </div>
      </div>

      {/* Startup Idea Card */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{currentIdea.description}</h2>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Your AI Entrepreneur in Residence prepares a first draft of the below for your review:
          </div>
          <button className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            🚀 Unleash your Startup Idea
            <span className="ml-2 text-xs">in 2 mins</span>
          </button>
        </div>

        {/* Four Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Business Prototype */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('business-prototype')}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Prototype</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-teal-600">Lean Canvas →</span>
                <span className="ml-auto">Customer Segments</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-teal-600">Lean Canvas →</span>
                <span className="ml-auto">Existing Alternatives</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Lean Canvas</span>
              </div>
            </div>
          </div>

          {/* Validation */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('validation')}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Critical Hypotheses</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-teal-600">Experiments →</span>
                <span className="ml-auto">Customer Interview</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-teal-600">Experiments →</span>
                <span className="ml-auto">Landing Page</span>
              </div>
            </div>
          </div>

          {/* Storytelling Central */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('storytelling')}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Storytelling Central</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Brand Wheel</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Startup Naming</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Elevator Pitch</span>
              </div>
            </div>
          </div>

          {/* Connect Dashboard */}
          <div 
            className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            onClick={() => onNavigate('connect-dashboard')}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Connect Dashboard</h3>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-orange-500 mr-2">🔒</span>
                <span>Mentors</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-orange-500 mr-2">🔒</span>
                <span>Investors & Accelerators</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="text-green-500 mr-2">✓</span>
                <span>Perks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessPrototypeSection = ({ currentIdea }) => {
  const canvas = currentIdea?.leanCanvas || {
    problems: ['Difficulty making informed trading decisions', 'Lack of transparency in financial markets'],
    solutions: ['Social trading platform', 'Real-time market insights'],
    customers: ['Millennial investors', 'Retirement planners', 'Day traders', 'Financial enthusiast students'],
    competitors: ['eToro', 'Robinhood', 'TradingView', 'Interactive Brokers', 'ZuluTrade', 'CopyMe', 'NAGA'],
    valueProposition: 'Trade smarter together. Access real-time insights and follow top traders moves on a collaborative platform.',
    channels: ['Mobile app', 'Financial blogs', 'Social media', 'Trading forums'],
    revenue: ['Trading commissions', 'Premium subscriptions', 'Copy-trading fees'],
    keyMetrics: ['Active traders', 'Trading volume', 'Platform assets', 'User retention rates']
  };

  const navigate = (section) => {
    // Navigate to the lean canvas details section
    if (typeof onNavigate === 'function') {
      onNavigate(section);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Prototype</h1>
        <p className="text-gray-600">Transform your idea into a tangible blueprint ensuring a solid foundation for your startup journey.</p>
      </div>

      {/* Lean Canvas Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Lean Canvas</h2>
              <GeneratedBadge />
            </div>
            <p className="text-gray-600">A streamlined one-page business plan template that succinctly captures your startup's vision.</p>
          </div>
          <button 
            onClick={() => navigate('lean-canvas-details')}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            👁️ Details
          </button>
        </div>

        {/* Lean Canvas Grid - Matching Screen 10 Layout */}
        <div className="grid grid-cols-5 gap-4 h-80">
          {/* Customer Segments */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">A</div>
              <h3 className="font-semibold text-orange-900 text-sm">Customer Segments</h3>
            </div>
            <div className="text-xs text-orange-800 space-y-1">
              {canvas.customers.slice(0, 4).map((customer, index) => (
                <div key={index}>• {customer}</div>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">B</div>
              <h3 className="font-semibold text-blue-900 text-sm">Problem</h3>
            </div>
            <div className="text-xs text-blue-800 space-y-1">
              {canvas.problems.map((problem, index) => (
                <div key={index}>• {problem}</div>
              ))}
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">D</div>
              <h3 className="font-semibold text-green-900 text-sm">Solution</h3>
            </div>
            <div className="text-xs text-green-800 space-y-1">
              {canvas.solutions.map((solution, index) => (
                <div key={index}>• {solution}</div>
              ))}
            </div>
          </div>

          {/* Unique Value Proposition */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">E</div>
              <h3 className="font-semibold text-yellow-900 text-sm">Unique Value Proposition</h3>
            </div>
            <div className="text-xs text-yellow-800">
              {canvas.valueProposition}
            </div>
          </div>

          {/* Unfair Advantage */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">J</div>
              <h3 className="font-semibold text-purple-900 text-sm">Unfair Advantage</h3>
            </div>
            <div className="text-xs text-purple-800">
              Proprietary algorithm that surfaces trending trades and insights
            </div>
          </div>

          {/* Existing Alternatives */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">C</div>
              <h3 className="font-semibold text-gray-900 text-sm">Existing Alternatives</h3>
            </div>
            <div className="text-xs text-gray-700 space-y-1">
              {canvas.competitors.slice(0, 7).map((competitor, index) => (
                <div key={index}>• {competitor}</div>
              ))}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">I</div>
              <h3 className="font-semibold text-indigo-900 text-sm">Key Metrics</h3>
            </div>
            <div className="text-xs text-indigo-800 space-y-1">
              {canvas.keyMetrics.map((metric, index) => (
                <div key={index}>• {metric}</div>
              ))}
            </div>
          </div>

          {/* Channels */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">F</div>
              <h3 className="font-semibold text-pink-900 text-sm">Channels</h3>
            </div>
            <div className="text-xs text-pink-800 space-y-1">
              {canvas.channels.map((channel, index) => (
                <div key={index}>• {channel}</div>
              ))}
            </div>
          </div>

          {/* Early Adopters */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
            <h3 className="font-semibold text-teal-900 text-sm mb-2">Early Adopters</h3>
            <div className="text-xs text-teal-800">
              • Young traders savvy with social media
              • Investors seeking community
            </div>
          </div>

          {/* High Level Concept */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <h3 className="font-semibold text-red-900 text-sm mb-2">High Level Concept</h3>
            <div className="text-xs text-red-800">
              Social network meets trading floor
            </div>
          </div>

          {/* Cost Structure */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 col-span-2">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">H</div>
              <h3 className="font-semibold text-gray-900 text-sm">Cost Structure</h3>
            </div>
            <div className="text-xs text-gray-700 space-y-1">
              <div>• Development and maintenance of the platform</div>
              <div>• Marketing and user acquisition costs</div>
              <div>• Community management and customer support</div>
              <div>• Data security and legal compliance</div>
              <div>• Server and infrastructure costs</div>
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-3 col-span-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">G</div>
              <h3 className="font-semibold text-green-900 text-sm">Revenue Streams</h3>
            </div>
            <div className="text-xs text-green-800 space-y-1">
              <div>• Subscription fees for premium features</div>
              <div>• Commissions on trades executed through the platform</div>
              <div>• Advertisement revenue from financial services</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Detailed Lean Canvas Page
const LeanCanvasDetailsSection = ({ currentIdea }) => {
  const [activeSection, setActiveSection] = useState('customer-segments');
  
  const canvas = currentIdea?.leanCanvas || {
    problems: ['Problem identification needed', 'Market research required'],
    solutions: ['Solution development needed', 'Technical implementation required'],
    customers: ['Target customer analysis needed'],
    competitors: ['Competitive analysis required'],
    valueProposition: 'Value proposition to be defined',
    channels: ['Distribution channels to be identified'],
    revenue: ['Revenue model to be developed'],
    keyMetrics: ['Key metrics to be defined']
  };

  // Generate detailed customer personas based on the startup idea
  const generateCustomerPersonas = () => {
    if (currentIdea?.industry === 'trading') {
      return [
        {
          name: 'Millennial Investors',
          overview: 'Sophia, aged 25-35, is an urban professional living in San Francisco who has recently become interested in investing. She is tech-savvy, values social interactions, and wants to make informed investment decisions by learning from more experienced traders.',
          jobs: ['Finding reliable investment information', 'Engaging with a community of investors', 'Growing her portfolio through informed decisions'],
          pains: ['Overwhelming amount of investment data', 'Identifying trustworthy investment advice', 'Balancing time between learning about investments and her career']
        },
        {
          name: 'Retirement Replanners',
          overview: 'Bob, aged 45-60, is a middle-class individual from Charlotte, NC, concerned about his retirement savings due to economic uncertainty. He\'s looking for alternative ways to grow his nest egg and ensure a comfortable retirement.',
          jobs: ['Diversifying retirement investments', 'Learning about market trends and its benefits', 'Mitigating risks related to retirement funds', 'Staying updated on financial markets'],
          pains: ['Worry about the adequacy of retirement savings', 'Feeling out of touch with modern investment tools', 'Confusion over complex trading strategies']
        },
        {
          name: 'Aspiring Full-time Traders',
          overview: 'Miguel, aged 20-30, is an ambitious individual from Austin, Texas, who dreams of becoming a full-time trader. With some experience in stock trading, he is looking to sharpen his skills and build a personal brand around his trading strategy.',
          jobs: ['Mastering advanced trading techniques', 'Gaining a following on the platform', 'Networking with successful traders', 'Generating consistent profits from trading'],
          pains: ['Potentially unstable income', 'High competition for attention on the platform', 'Balancing risk and reward', 'Finding reliable market insights']
        },
        {
          name: 'Financial Enthusiast Students',
          overview: 'Emily, aged 18-24, is a college student from Boston, majoring in finance. She\'s enthusiastic about building her investment knowledge and looks for hands-on experience through practical platforms that can offer her a deeper understanding of the markets.',
          jobs: ['Acquiring real-world trading experience', 'Connecting with mentors and experts in finance', 'Managing a small budget effectively for investment'],
          pains: ['Limited capital to invest', 'Navigating through an abundance of information', 'Balancing studies with investment learning', 'Avoiding misinformation and scams']
        }
      ];
    }
    // Add other industries as needed
    return [
      {
        name: 'Primary Target Segment',
        overview: 'Description of the primary customer segment for this startup idea.',
        jobs: ['Key job to be done', 'Secondary important task'],
        pains: ['Main pain point', 'Secondary concern']
      }
    ];
  };

  const customerPersonas = generateCustomerPersonas();

  const sectionContent = {
    'customer-segments': {
      title: 'Customer Segments',
      subtitle: 'Identifies the specific market segment or audience who will most benefit from your product or service using the Jobs To Be Done framework.',
      guidance: 'Drill down to the core group of users who have the highest need for your solution and will get the most value out of it.',
      content: (
        <div className="space-y-8">
          {customerPersonas.map((persona, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 font-semibold">👤</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{persona.name}</h3>
                    <button className="text-teal-600 hover:text-teal-700 text-sm">Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Persona Overview</h4>
                      <p className="text-sm text-gray-600 italic">{persona.overview}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Customer Jobs</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {persona.jobs.map((job, jobIndex) => (
                          <li key={jobIndex}>• {job}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Customer Pains</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {persona.pains.map((pain, painIndex) => (
                          <li key={painIndex}>• {pain}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    'problem': {
      title: 'Problem',
      subtitle: 'Highlights the issue, challenge, or pain point your target customers experience.',
      guidance: 'Validate the problem through direct conversations with potential customers to ensure it\'s real, painful, and prevalent.',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            {canvas.problems.map((problem, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-blue-600 font-semibold">•</span>
                <span className="text-gray-700">{problem}</span>
                <button className="text-teal-600 hover:text-teal-700 text-sm ml-auto">Edit</button>
              </div>
            ))}
          </div>
        </div>
      )
    },
    'existing-alternatives': {
      title: 'Existing Alternatives',
      subtitle: 'Describes the current solutions your target customers use to solve their problem.',
      guidance: 'Identify existing competitors that address the same problem; understanding how they work will help differentiate your product.',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Direct Competitors</h3>
              <div className="space-y-2">
                {canvas.competitors.slice(0, 6).map((competitor, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <span className="text-gray-700 text-sm">• {competitor}</span>
                    <button className="text-teal-600 hover:text-teal-700 text-xs">Edit</button>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Indirect Competitors</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Traditional brokerage firms like Fidelity and Charles Schwab</div>
                <div>• Forex trading platforms like MetaTrader</div>
                <div>• Online investment courses and webinars</div>
                <div>• Financial news and analysis websites like Investing.com</div>
                <div>• Stock market simulators</div>
                <div>• Independent financial advisors and consultants</div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Alternative Solutions</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div>• Social media investment groups</div>
                <div>• Offline investment clubs</div>
                <div>• Personal network consultations</div>
                <div>• Do-it-yourself (DIY) investing using books and online resources</div>
                <div>• Investment podcasts and YouTube channels</div>
                <div>• Public forums like Reddit's r/investing</div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'solution': {
      title: 'Solution',
      subtitle: 'Presents your product or service that addresses the identified problem.',
      guidance: 'Aim for a solution that\'s 10x better than existing alternatives to make it worth the switch for your customers.',
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Features</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <span className="text-teal-600 font-semibold mt-1">•</span>
                <span className="text-gray-700">Real-time social feed for trading insights</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal-600 font-semibold mt-1">•</span>
                <span className="text-gray-700">Copy-trading feature that replicates top traders' actions</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal-600 font-semibold mt-1">•</span>
                <span className="text-gray-700">Community-driven content and educational resources</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-teal-600 font-semibold mt-1">•</span>
                <span className="text-gray-700">Performance analytics for self-improvement</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Potential Ways-to-Play</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Influencer-driven engagement</h4>
                <p className="text-sm text-gray-600">Leveraging financial influencers to drive platform engagement and credibility.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Tailored Educational Content</h4>
                <p className="text-sm text-gray-600">Providing customized educational content that helps users make more informed trading decisions.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Integration of Crypto Assets</h4>
                <p className="text-sm text-gray-600">Expanding the asset classes to include cryptocurrencies and tokens, catering to the interest in digital assets.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Behavioral Analytics for Matching</h4>
                <p className="text-sm text-gray-600">Using behavioral analytics to better match users with top-performing traders, improving the social aspect of trading.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Micro-investing Options</h4>
                <p className="text-sm text-gray-600">Offering micro-investing capabilities that allow users to mimic trades with smaller, incremental investments.</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Robust Risk Management Tools</h4>
                <p className="text-sm text-gray-600">Building in advanced risk management features for users to apply when engaging in social trading.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    'unique-value-proposition': {
      title: 'Unique Value Proposition',
      subtitle: 'A single, clear compelling message that states why you are different and worth buying.',
      guidance: 'Craft a compelling UVP that can be instantly understood; make sure it resonates emotionally with your target customers.',
      content: (
        <div className="space-y-6">
          <div className="text-center py-8">
            <p className="text-xl font-semibold text-gray-900 leading-relaxed">
              Trade smarter together. Access real-time insights and follow top traders' moves on a collaborative platform.
            </p>
          </div>
        </div>
      )
    },
    'channels': {
      title: 'Channels',
      subtitle: 'Specifies the methods you use to reach your target customers and deliver your value proposition.',
      guidance: 'Focus on those channels where you can reach the largest segment of your target customers at the lowest cost.',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Mobile and desktop applications</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Social media</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Trading forums and communities</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Financial blogs and influencers</span>
            </div>
          </div>
        </div>
      )
    },
    'revenue-streams': {
      title: 'Revenue Streams',
      subtitle: 'Delineates the different ways your business generates income from delivering value to your customers.',
      guidance: 'Explore and validate how your business can generate income, such as sales, subscriptions, or partnerships.',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Subscription fees for premium features</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Commissions on trades executed through the platform</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Advertisement revenue from financial services</span>
            </div>
          </div>
        </div>
      )
    },
    'cost-structure': {
      title: 'Cost Structure',
      subtitle: 'Enumerates all the costs incurred to deliver your value proposition and run the business.',
      guidance: 'Identify your main cost buckets, such as development and marketing costs; knowing these will assist you in budget planning.',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Development and maintenance of the platform</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Marketing and user acquisition costs</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Community management and customer support</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Data security and legal compliance</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Server and infrastructure costs</span>
            </div>
          </div>
        </div>
      )
    },
    'key-metrics': {
      title: 'Key Metrics',
      subtitle: 'Defines the essential indicators that measure the performance and progress of your business.',
      guidance: 'Identify and focus on a single key metric relevant to your startup stage whether that\'s user acquisition, retention or revenue.',
      content: (
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Number of active users</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Volume of trades executed</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">User retention rates</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Social engagement metrics (likes, comments, shares)</span>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <span className="text-teal-600 font-semibold mt-1">•</span>
              <span className="text-gray-700">Revenue growth</span>
            </div>
          </div>
        </div>
      )
    },
    'unfair-advantage': {
      title: 'Unfair Advantage',
      subtitle: 'Demonstrates something unique to your business that cannot be easily replicated or acquired by competitors.',
      guidance: 'Identify any proprietary tech or expertise your startup possesses. That being said, it\'s fine not to have one in the earliest stages.',
      content: (
        <div className="space-y-6">
          <div className="text-center py-8">
            <p className="text-lg font-medium text-gray-900">
              Proprietary algorithm that surfaces trending trades and insights
            </p>
          </div>
        </div>
      )
    }
  };

  const navigationItems = [
    { key: 'customer-segments', label: 'Target Customers', color: 'orange' },
    { key: 'problem', label: 'Problem', color: 'blue' },
    { key: 'existing-alternatives', label: 'Existing Alternatives', color: 'gray' },
    { key: 'solution', label: 'Solution', color: 'green' },
    { key: 'unique-value-proposition', label: 'Unique Value Proposition', color: 'yellow' },
    { key: 'channels', label: 'Channels', color: 'pink' },
    { key: 'revenue-streams', label: 'Revenue Streams', color: 'green' },
    { key: 'cost-structure', label: 'Cost Structure', color: 'gray' },
    { key: 'key-metrics', label: 'Key Metrics', color: 'indigo' },
    { key: 'unfair-advantage', label: 'Unfair Advantage', color: 'purple' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700">
      {/* Header */}
      <div className="bg-blue-900 text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center space-x-4 mb-4">
            <button 
              onClick={() => window.history.back()}
              className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
            >
              ←
            </button>
            <h1 className="text-3xl font-bold">Lean Canvas</h1>
          </div>
          <p className="text-blue-100 text-lg max-w-3xl">
            Craft your startup vision by distilling ideas into a single blueprint. Dive into problem-solving, value propositions, and market-fit on one dynamic canvas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto flex">
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow-lg">
            {/* Section Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                    activeSection === 'customer-segments' ? 'bg-orange-500' :
                    activeSection === 'problem' ? 'bg-blue-500' :
                    activeSection === 'existing-alternatives' ? 'bg-gray-500' :
                    activeSection === 'solution' ? 'bg-green-500' :
                    activeSection === 'unique-value-proposition' ? 'bg-yellow-500' :
                    activeSection === 'channels' ? 'bg-pink-500' :
                    activeSection === 'revenue-streams' ? 'bg-green-600' :
                    activeSection === 'cost-structure' ? 'bg-gray-600' :
                    activeSection === 'key-metrics' ? 'bg-indigo-500' :
                    activeSection === 'unfair-advantage' ? 'bg-purple-500' :
                    'bg-blue-500'
                  }`}>
                    {activeSection === 'customer-segments' ? 'A' :
                     activeSection === 'problem' ? 'B' :
                     activeSection === 'existing-alternatives' ? 'C' :
                     activeSection === 'solution' ? 'D' :
                     activeSection === 'unique-value-proposition' ? 'E' :
                     activeSection === 'channels' ? 'F' :
                     activeSection === 'revenue-streams' ? 'G' :
                     activeSection === 'cost-structure' ? 'H' :
                     activeSection === 'key-metrics' ? 'I' :
                     activeSection === 'unfair-advantage' ? 'J' : 'A'}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{sectionContent[activeSection]?.title}</h2>
                    <p className="text-gray-600 mt-1">{sectionContent[activeSection]?.subtitle}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  Edit
                </button>
              </div>
            </div>

            {/* Section Content */}
            <div className="p-6">
              {sectionContent[activeSection]?.content}
            </div>
          </div>
        </div>

        {/* Right Sidebar Navigation */}
        <div className="w-80 p-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-teal-600 font-medium mb-4 text-sm">On this page</h3>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key)}
                  className={`block w-full text-left text-sm transition-colors duration-200 ${
                    activeSection === item.key 
                      ? 'text-gray-900 font-medium' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Guidance Sidebar */}
          {sectionContent[activeSection]?.guidance && (
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-sm text-gray-700 italic leading-relaxed">
                {sectionContent[activeSection].guidance}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Additional sections simplified for brevity
const ValidationSection = ({ currentIdea }) => {
  const hypotheses = currentIdea?.hypotheses || [
    { type: 'Desirability', text: 'Target customers need this solution', criticality: 'High', method: 'Customer interviews' },
    { type: 'Viability', text: 'Business model is financially sustainable', criticality: 'High', method: 'Financial analysis' },
    { type: 'Feasibility', text: 'Solution is technically achievable', criticality: 'Medium', method: 'Technical validation' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation</h1>
        <p className="text-gray-600">Navigate your startup's viability by identifying critical hypotheses and conducting experiments.</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Critical Hypotheses</h2>
              <GeneratedBadge />
            </div>
            <p className="text-gray-600">Identify and prioritize the fundamental assumptions underpinning your business.</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            New
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Hypothesis</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Criticality</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Testing Method</th>
                <th className="w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {hypotheses.map((hypothesis, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-medium text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{hypothesis.type}</h4>
                        <p className="text-sm text-gray-600">{hypothesis.text}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                      hypothesis.criticality === 'High' ? 'bg-red-100 text-red-800' :
                      hypothesis.criticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {hypothesis.criticality}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{hypothesis.method}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gray-400 hover:text-gray-600">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StorytellingSection = ({ currentIdea }) => {
  const [activeTab, setActiveTab] = useState('brand-wheel');
  
  const storytelling = currentIdea?.storytelling || {
    names: ['StartupCo', 'InnovateTech', 'BusinessFlow', 'TechSolution', 'GrowthHub'],
    mission: 'To solve important problems and create value for our customers through innovative solutions.',
    vision: 'To become a leading company that transforms how people interact with technology.',
    values: ['Innovation: Constantly pushing boundaries', 'Quality: Delivering excellent solutions', 'Impact: Making a meaningful difference'],
    elevatorPitch: 'Our startup addresses key market needs through innovative technology solutions that create value for customers and drive business growth.'
  };

  const [selectedName, setSelectedName] = useState(storytelling.names[0]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Storytelling Central</h1>
        <p className="text-gray-600">Craft a compelling narrative for your brand, select your startup's name, and captivate audiences with an unforgettable pitch.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <button
          onClick={() => setActiveTab('brand-wheel')}
          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
            activeTab === 'brand-wheel' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              activeTab === 'brand-wheel' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>01</div>
            <GeneratedBadge />
          </div>
          <h3 className="font-semibold text-gray-900">Brand Wheel</h3>
          <p className="text-sm text-gray-600">Define your brand positioning.</p>
        </button>

        <button
          onClick={() => setActiveTab('startup-naming')}
          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
            activeTab === 'startup-naming' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              activeTab === 'startup-naming' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>02</div>
            <GeneratedBadge />
          </div>
          <h3 className="font-semibold text-gray-900">Startup Naming</h3>
          <p className="text-sm text-gray-600">Find a compelling name.</p>
        </button>

        <button
          onClick={() => setActiveTab('elevator-pitch')}
          className={`p-4 rounded-lg border text-left transition-all duration-200 ${
            activeTab === 'elevator-pitch' 
              ? 'border-teal-500 bg-teal-50' 
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              activeTab === 'elevator-pitch' ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-600'
            }`}>03</div>
            <GeneratedBadge />
          </div>
          <h3 className="font-semibold text-gray-900">Elevator Pitch</h3>
          <p className="text-sm text-gray-600">Craft your story.</p>
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'brand-wheel' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Mission</h3>
                  <p className="text-gray-700">{storytelling.mission}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Vision</h3>
                  <p className="text-gray-700">{storytelling.vision}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Brand Values</h3>
                  <div className="space-y-2 text-gray-700">
                    {storytelling.values.map((value, index) => (
                      <p key={index}><strong>{value.split(':')[0]}:</strong>{value.split(':')[1]}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'startup-naming' && (
          <div className="space-y-6">
            <div className="grid grid-cols-5 gap-4">
              {storytelling.names.map((name, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedName(name)}
                  className={`p-4 border rounded-lg text-center transition-all duration-200 ${
                    selectedName === name 
                      ? 'border-teal-500 bg-teal-50 text-teal-700' 
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">Selected Name:</span>
                <span className="text-xl font-semibold text-gray-900">{selectedName}</span>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'elevator-pitch' && (
          <div className="bg-gray-50 rounded-lg p-6">
            <p className="text-sm text-gray-600 italic mb-4">Here's your personalized elevator pitch:</p>
            <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
              {storytelling.elevatorPitch}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ConnectDashboardSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Progress in your validation journey to unlock a curated list of mentors, investors and potential partners.</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 text-center">
        <div className="text-6xl mb-4">🤝</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect Dashboard</h3>
        <p className="text-gray-600">Network with mentors, investors, and partners to accelerate your startup journey.</p>
      </div>
    </div>
  );
};

// Main Workspace Component
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
            competitors: ['eToro', 'Robinhood', 'TradingView', 'Interactive Brokers', 'ZuluTrade', 'CopyMe', 'NAGA'],
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
            elevatorPitch: `Did you know that traders and investors struggle to find a collaborative community to share knowledge and insights? This represents a significant opportunity in the financial markets industry.\n\nTradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge. Unlike other alternatives, we focus on building a strong community-driven platform where users can interact, share tips, and empower each other.\n\nOur team comprises experienced entrepreneurs and finance experts, and we generate revenue through subscription services and premium features. In essence, we are the "LinkedIn for traders," revolutionizing the way people engage in financial markets.`
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

  const handleIdeaSelect = async (ideaId) => {
    try {
      const idea = await apiService.getStartupIdea(ideaId);
      setCurrentIdea(idea);
      setCurrentSection('startup-idea');
    } catch (err) {
      console.error('Failed to load idea:', err);
      setError('Failed to load idea. Please try again.');
    }
  };

  const handleIdeaUpdate = async (updateData) => {
    if (!currentIdea || currentIdea.id === 'default') return;
    
    try {
      const updatedIdea = await apiService.updateStartupIdea(currentIdea.id, updateData);
      setCurrentIdea(updatedIdea);
      
      // Update in user ideas list
      setUserIdeas(prev => 
        prev.map(idea => idea.id === updatedIdea.id ? updatedIdea : idea)
      );
    } catch (err) {
      console.error('Failed to update idea:', err);
      setError('Failed to update idea. Please try again.');
    }
  };

  const handleIdeaDelete = async (ideaId) => {
    try {
      await apiService.deleteStartupIdea(ideaId);
      
      // Remove from local state
      setUserIdeas(prev => prev.filter(idea => idea.id !== ideaId));
      
      // If deleted idea was current, switch to first available idea
      if (currentIdea && currentIdea.id === ideaId) {
        const remainingIdeas = userIdeas.filter(idea => idea.id !== ideaId);
        if (remainingIdeas.length > 0) {
          setCurrentIdea(remainingIdeas[0]);
        } else {
          setCurrentSection('new-idea');
        }
      }
    } catch (err) {
      console.error('Failed to delete idea:', err);
      setError('Failed to delete idea. Please try again.');
    }
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

  // Show message if no current idea
  if (!currentIdea) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-gray-400 text-4xl mb-4">💡</div>
          <p className="text-gray-600 mb-4">No startup ideas yet. Create your first one!</p>
          <button 
            onClick={handleNewIdea}
            className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200"
          >
            🚀 Create New Idea
          </button>
        </div>
      </div>
    );

  const renderMainContent = () => {
    switch (currentSection) {
      case 'new-idea':
        return <NewIdeaSection onIdeaCreated={handleIdeaCreated} />;
      case 'startup-idea':
        return <StartupIdeaSection onNavigate={handleSectionChange} currentIdea={currentIdea} />;
      case 'business-prototype':
        return <BusinessPrototypeSection currentIdea={currentIdea} />;
      case 'lean-canvas-details':
        return <LeanCanvasDetailsSection currentIdea={currentIdea} />;
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
      <LeftSidebar 
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        onLogout={onLogout}
        currentIdea={currentIdea}
        onNewIdea={handleNewIdea}
      />
      
      <main className="flex-1 p-8">
        {renderMainContent()}
      </main>
      
      <RightSidebar currentSection={currentSection} />
    </div>
  );
};