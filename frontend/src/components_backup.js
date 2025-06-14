import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

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

// Generated Badge Component
const GeneratedBadge = () => (
  <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
    Generated
  </span>
);

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
    problems: ['Problem identification needed', 'Market research required'],
    solutions: ['Solution development needed', 'Technical implementation required'],
    customers: ['Target customer analysis needed'],
    competitors: ['Competitive analysis required'],
    valueProposition: 'Value proposition to be defined',
    channels: ['Distribution channels to be identified'],
    revenue: ['Revenue model to be developed'],
    keyMetrics: ['Key metrics to be defined']
  };

  const navigate = (section) => {
    // This will be handled by the parent component
    window.location.hash = section;
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

        {/* Lean Canvas Grid - Compact Overview */}
        <div className="grid grid-cols-5 gap-4 h-80">
          {/* Customer Segments */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">A</div>
              <h3 className="font-semibold text-orange-900 text-sm">Customer Segments</h3>
            </div>
            <div className="text-xs text-orange-800 space-y-1">
              {canvas.customers.slice(0, 2).map((customer, index) => (
                <div key={index}>• {customer}</div>
              ))}
              {canvas.customers.length > 2 && <div className="text-orange-600">+{canvas.customers.length - 2} more</div>}
            </div>
          </div>

          {/* Problem */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">B</div>
              <h3 className="font-semibold text-blue-900 text-sm">Problem</h3>
            </div>
            <div className="text-xs text-blue-800 space-y-1">
              {canvas.problems.slice(0, 2).map((problem, index) => (
                <div key={index}>• {problem}</div>
              ))}
              {canvas.problems.length > 2 && <div className="text-blue-600">+{canvas.problems.length - 2} more</div>}
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">D</div>
              <h3 className="font-semibold text-green-900 text-sm">Solution</h3>
            </div>
            <div className="text-xs text-green-800 space-y-1">
              {canvas.solutions.slice(0, 2).map((solution, index) => (
                <div key={index}>• {solution}</div>
              ))}
              {canvas.solutions.length > 2 && <div className="text-green-600">+{canvas.solutions.length - 2} more</div>}
            </div>
          </div>

          {/* Unique Value Proposition */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">E</div>
              <h3 className="font-semibold text-yellow-900 text-sm">Unique Value Prop...</h3>
            </div>
            <div className="text-xs text-yellow-800">
              {canvas.valueProposition.length > 60 ? 
                `${canvas.valueProposition.substring(0, 60)}...` : 
                canvas.valueProposition
              }
            </div>
          </div>

          {/* Unfair Advantage */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">J</div>
              <h3 className="font-semibold text-purple-900 text-sm">Unfair Advantage</h3>
            </div>
            <div className="text-xs text-purple-800">
              Proprietary technology and first-mover advantage
            </div>
          </div>

          {/* Existing Alternatives */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">C</div>
              <h3 className="font-semibold text-gray-900 text-sm">Existing Alternatives</h3>
            </div>
            <div className="text-xs text-gray-700 space-y-1">
              {canvas.competitors.slice(0, 3).map((competitor, index) => (
                <div key={index}>• {competitor}</div>
              ))}
              {canvas.competitors.length > 3 && <div className="text-gray-600">+{canvas.competitors.length - 3} more</div>}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">I</div>
              <h3 className="font-semibold text-indigo-900 text-sm">Key Metrics</h3>
            </div>
            <div className="text-xs text-indigo-800 space-y-1">
              {canvas.keyMetrics.slice(0, 2).map((metric, index) => (
                <div key={index}>• {metric}</div>
              ))}
              {canvas.keyMetrics.length > 2 && <div className="text-indigo-600">+{canvas.keyMetrics.length - 2} more</div>}
            </div>
          </div>

          {/* Channels */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">F</div>
              <h3 className="font-semibold text-pink-900 text-sm">Channels</h3>
            </div>
            <div className="text-xs text-pink-800 space-y-1">
              {canvas.channels.slice(0, 2).map((channel, index) => (
                <div key={index}>• {channel}</div>
              ))}
              {canvas.channels.length > 2 && <div className="text-pink-600">+{canvas.channels.length - 2} more</div>}
            </div>
          </div>

          {/* High Level Concept */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">H</div>
              <h3 className="font-semibold text-red-900 text-sm">High Level Concept</h3>
            </div>
            <div className="text-xs text-red-800">
              {currentIdea?.description || 'Innovative solution for market needs'}
            </div>
          </div>

          {/* Early Adopters */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
            <div className="flex items-center mb-2">
              <h3 className="font-semibold text-teal-900 text-sm">Early Adopters</h3>
            </div>
            <div className="text-xs text-teal-800">
              {canvas.customers[0]} who are actively seeking solutions
            </div>
          </div>

          {/* Cost Structure */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-3 col-span-2">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">H</div>
              <h3 className="font-semibold text-gray-900 text-sm">Cost Structure</h3>
            </div>
            <div className="text-xs text-gray-700">
              • Technology development and maintenance
              • Customer acquisition costs
              • Operational expenses
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-3 col-span-3">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">G</div>
              <h3 className="font-semibold text-green-900 text-sm">Revenue Streams</h3>
            </div>
            <div className="text-xs text-green-800 space-y-1">
              {canvas.revenue.map((revenue, index) => (
                <span key={index}>• {revenue} </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValidationSection = ({ currentIdea }) => {
  const hypotheses = currentIdea?.hypotheses || [
    { type: 'Desirability', text: 'Target customers need this solution', criticality: 'High', method: 'Customer interviews' },
    { type: 'Viability', text: 'Business model is financially sustainable', criticality: 'High', method: 'Financial analysis' },
    { type: 'Feasibility', text: 'Solution is technically achievable', criticality: 'Medium', method: 'Technical validation' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Validation</h1>
        <p className="text-gray-600">Navigate your startup's viability by identifying critical hypotheses and conducting experiments, ensuring you meet market needs.</p>
      </div>

      {/* Critical Hypotheses */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Critical Hypotheses</h2>
              <GeneratedBadge />
            </div>
            <p className="text-gray-600">Identify and prioritize the fundamental assumptions underpinning your business, setting the stage for essential validation tests.</p>
          </div>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
            New
          </button>
        </div>

        {/* Hypotheses Table */}
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

      {/* Validation Experiments */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Validation Experiments</h2>
          <p className="text-gray-600">Design and execute strategic tests to validate or refute your startup's hypotheses, ensuring data-driven decisions in your entrepreneurial journey.</p>
        </div>

        {/* Experiment Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Customer Interview */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">🎤</span>
              <div>
                <h3 className="font-semibold text-gray-900">Customer Interview</h3>
                <GeneratedBadge />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Create a tailored questionnaire for customer discovery and problem exploration specific to {currentIdea?.description || 'your startup idea'}.</p>
            <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
              👁️ Details
            </button>
          </div>

          {/* Landing Page */}
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <span className="text-2xl">🌐</span>
              <div>
                <h3 className="font-semibold text-gray-900">Landing Page</h3>
                <GeneratedBadge />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Develop a simple webpage to test market demand and collect early user interest for your concept.</p>
            <button className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
              ✏️ Details
            </button>
          </div>

          {/* Create New Experiment */}
          <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <span className="text-4xl text-gray-400 mb-4">📋</span>
            <h3 className="font-medium text-gray-700 mb-2">Create a new Experiment</h3>
            <p className="text-sm text-gray-500">(Coming soon)</p>
          </div>
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

  const BrandWheelTab = () => (
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
  );

  const StartupNamingTab = () => (
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
          <button className="text-teal-600 hover:text-teal-700">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex justify-center">
        <div className="w-96 h-2 bg-gray-200 rounded-full">
          <div className="w-full h-2 bg-teal-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );

  const ElevatorPitchTab = () => (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <p className="text-sm text-gray-600 italic mb-4">Here's your personalized elevator pitch:</p>
        
        <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
          {storytelling.elevatorPitch}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Storytelling Central</h1>
        <p className="text-gray-600">Craft a compelling narrative for your brand, select your startup's name, and captivate audiences with an unforgettable pitch.</p>
      </div>

      {/* Tab Navigation */}
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

      {/* Tab Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        {activeTab === 'brand-wheel' && <BrandWheelTab />}
        {activeTab === 'startup-naming' && <StartupNamingTab />}
        {activeTab === 'elevator-pitch' && <ElevatorPitchTab />}
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
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Drill down to the core group of users who have the highest need for your solution and will get the most value out of it.</strong>
            </p>
          </div>
        </div>
      )
    },
    'problem': {
      title: 'Problem',
      subtitle: 'Highlights the issue, challenge, or pain point your target customers experience.',
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
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Validate the problem through direct conversations with potential customers to ensure it's real, painful, and prevalent.</strong>
            </p>
          </div>
        </div>
      )
    },
    'existing-alternatives': {
      title: 'Existing Alternatives',
      subtitle: 'Describes the current solutions your target customers use to solve their problem.',
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
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Identify existing competitors that address the same problem; understanding how they work will help differentiate your product.</strong>
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
                  <div className={`w-12 h-12 bg-${sectionContent[activeSection]?.color || 'blue'}-500 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
                    A
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{sectionContent[activeSection]?.title}</h2>
                    <p className="text-gray-600 mt-1">{sectionContent[activeSection]?.subtitle}</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  New
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
          <div className="bg-white rounded-lg shadow-lg p-6">
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
        </div>
      </div>
    </div>
  );
};

const ConnectDashboardSection = () => {
  const mentors = [
    {
      name: 'Jenny Lawton',
      title: 'Executive VP @',
      company: 'Roister',
      expertise: 'Business Leadership',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Khaled Nasr',
      title: 'GP @ Interwest',
      company: 'Partners',
      expertise: 'Investment',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Georges Khoury',
      title: 'Software Engineer',
      company: '(Ex Uber)',
      expertise: 'Product Management',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Mira Murati',
      title: 'CTO @ OpenAI',
      company: '',
      expertise: 'AI',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Scott Ford',
      title: 'Partner @ Zigzag',
      company: '',
      expertise: 'Operations',
      image: '/api/placeholder/120/120'
    }
  ];

  const investors = [
    { name: 'Techstars', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Berkeley Skydeck', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'SparkLabs', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Band of Angels', type: 'Angel Network', logo: '/api/placeholder/120/120' },
    { name: 'Y Combinator', type: 'Accelerator', logo: '/api/placeholder/120/120' }
  ];

  const perks = [
    {
      name: 'Carta',
      category: 'Equity Management',
      benefit: 'Start for Free',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Dropbox',
      category: 'Cloud Storage',
      benefit: 'Up to 50% Discount',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Google for Startups',
      category: 'Cloud Services',
      benefit: 'Up to $200,000',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Notion',
      category: 'Knowledge Management',
      benefit: '6 Months Free',
      logo: '/api/placeholder/120/60'
    }
  ];

  const ComingSoonBadge = () => (
    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
      🔒 Coming Soon
    </span>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Progress in your validation journey to unlock a curated list of mentors, investors and potential partners tailored to your startup idea.</p>
      </div>

      {/* Connect with Relevant Mentors */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Mentors</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Harness industry wisdom for strategic navigation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl font-semibold" style={{display: 'none'}}>
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{mentor.name}</h3>
              <p className="text-xs text-gray-600">{mentor.title}</p>
              <p className="text-xs text-gray-600">{mentor.company}</p>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {mentor.expertise}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect with Relevant Investors & Accelerators */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Investors & Accelerators</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Secure funding, networks, and growth catalysts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {investors.map((investor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center overflow-hidden">
                <img 
                  src={investor.logo} 
                  alt={investor.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold text-center p-2" style={{display: 'none'}}>
                  {investor.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{investor.name}</h3>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {investor.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Relevant Perks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Relevant Perks</h2>
          <p className="text-gray-600">Capitalize on cost-saving opportunities and benefits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {perks.map((perk, index) => (
            <div key={index} className="text-center border border-gray-200 rounded-lg p-4">
              <div className="w-20 h-12 bg-white mx-auto mb-3 flex items-center justify-center overflow-hidden border border-gray-100 rounded">
                <img 
                  src={perk.logo} 
                  alt={perk.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold text-center" style={{display: 'none'}}>
                  {perk.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{perk.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{perk.category}</p>
              <div className="text-xs">
                {perk.benefit.includes('Free') ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : perk.benefit.includes('Discount') ? (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {/* Click Here for More */}
          <div className="text-center border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 text-sm">+</span>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Click Here for More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
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
    food_tech: {
      names: ['FoodieHub', 'TasteCraft', 'CulinaryConnect', 'FlavorFlow', 'MealMaster', 'DishDash', 'NutriLink', 'FreshDelivery', 'CraveCure', 'KitchenKonnect'],
      problems: ['High delivery costs and long wait times', 'Limited healthy food options', 'Food waste in restaurants'],
      solutions: ['AI-powered delivery optimization', 'Personalized nutrition recommendations', 'Smart inventory management'],
      customers: ['Busy professionals', 'Health-conscious consumers', 'College students'],
      competitors: ['DoorDash', 'Uber Eats', 'Grubhub', 'HelloFresh', 'Blue Apron'],
      valueProps: 'Fresh, healthy meals delivered faster and cheaper through AI optimization',
      channels: ['Mobile app', 'Social media marketing', 'Restaurant partnerships'],
      revenue: ['Commission from restaurants', 'Delivery fees', 'Premium subscriptions'],
      keyMetrics: ['Order frequency', 'Customer lifetime value', 'Average order value'],
      hypotheses: [
        { type: 'Desirability', text: 'Customers want faster food delivery with healthier options', criticality: 'High', method: 'Customer survey' },
        { type: 'Viability', text: 'Restaurants will pay 15% commission for optimized delivery', criticality: 'High', method: 'Partner interviews' },
        { type: 'Feasibility', text: 'AI routing can reduce delivery time by 30%', criticality: 'Medium', method: 'Technical prototype' }
      ],
      mission: 'Revolutionize food delivery by making healthy, fresh meals accessible to everyone through intelligent technology.',
      vision: 'To become the leading platform that connects food lovers with quality restaurants while promoting sustainable eating habits.',
      values: ['Quality: Ensuring fresh, high-quality food delivery', 'Sustainability: Reducing food waste and environmental impact', 'Innovation: Using AI to optimize the entire food delivery experience']
    },
    health_tech: {
      names: ['HealthSync', 'WellnessWave', 'FitTracker', 'VitalBoost', 'MediConnect', 'HealthHub', 'WellBeing', 'FitnessFusion', 'HealthMate', 'VitalityVault'],
      problems: ['Lack of personalized health tracking', 'Expensive healthcare consultations', 'Poor medication adherence'],
      solutions: ['AI-powered health monitoring', 'Telemedicine platform', 'Smart medication reminders'],
      customers: ['Health-conscious individuals', 'Chronic disease patients', 'Fitness enthusiasts'],
      competitors: ['MyFitnessPal', 'Fitbit', 'Teladoc', 'Headspace', 'Calm'],
      valueProps: 'Personalized health insights and affordable healthcare access through technology',
      channels: ['Health apps', 'Doctor partnerships', 'Fitness centers'],
      revenue: ['Subscription fees', 'Consultation commissions', 'Premium features'],
      keyMetrics: ['Daily active users', 'Health improvement scores', 'User retention'],
      hypotheses: [
        { type: 'Desirability', text: 'Users want personalized health recommendations based on their data', criticality: 'High', method: 'User interviews' },
        { type: 'Viability', text: 'People will pay $20/month for AI health coaching', criticality: 'High', method: 'Pricing survey' },
        { type: 'Feasibility', text: 'Wearable integration can provide accurate health insights', criticality: 'Medium', method: 'Technical validation' }
      ],
      mission: 'Empower individuals to take control of their health through personalized, AI-driven insights and accessible healthcare solutions.',
      vision: 'To create a world where everyone has access to personalized healthcare and wellness guidance.',
      values: ['Privacy: Protecting sensitive health data', 'Accessibility: Making healthcare affordable for all', 'Innovation: Using technology to improve health outcomes']
    },
    trading: {
      names: ['TradeHive', 'InvestorHub', 'TradingEdge', 'MarketMaster', 'FinanceFlow', 'TradePro', 'InvestLink', 'MarketMind', 'TradeSphere', 'CapitalConnect'],
      problems: ['Difficulty making informed trading decisions', 'Lack of transparency in financial markets', 'High barriers to entry for new investors'],
      solutions: ['Social trading platform', 'Real-time market insights', 'Copy-trading features'],
      customers: ['Millennial investors', 'Retirement planners', 'Day traders'],
      competitors: ['eToro', 'Robinhood', 'TradingView', 'Interactive Brokers', 'TD Ameritrade'],
      valueProps: 'Democratic trading through social collaboration and expert insights',
      channels: ['Mobile app', 'Financial blogs', 'Social media'],
      revenue: ['Trading commissions', 'Premium subscriptions', 'Copy-trading fees'],
      keyMetrics: ['Active traders', 'Trading volume', 'Platform assets'],
      hypotheses: [
        { type: 'Desirability', text: 'Traders want to share and copy successful trading strategies', criticality: 'High', method: 'Trading community survey' },
        { type: 'Viability', text: 'Users will pay for premium trading insights and tools', criticality: 'High', method: 'Freemium conversion test' },
        { type: 'Feasibility', text: 'Real-time data feeds can be integrated cost-effectively', criticality: 'High', method: 'Technical feasibility study' }
      ],
      mission: 'Democratize trading by creating a collaborative platform where investors can learn, share, and grow together.',
      vision: 'To build the largest community of transparent, collaborative traders who empower each other to achieve financial success.',
      values: ['Transparency: Open sharing of trading strategies and results', 'Education: Helping traders learn and improve', 'Community: Building supportive trading relationships']
    },
    ai_tech: {
      names: ['AI-Boost', 'SmartTech', 'IntelliFlow', 'CogniCorp', 'BrainWave', 'NeuralNet', 'AIVantage', 'SmartCore', 'IntelliSuite', 'AInnova'],
      problems: ['Complex AI implementation for businesses', 'Lack of AI expertise', 'High costs of AI development'],
      solutions: ['No-code AI platform', 'AI consulting services', 'Pre-built AI models'],
      customers: ['Small businesses', 'Enterprise companies', 'Developers'],
      competitors: ['OpenAI', 'Google AI', 'Microsoft Azure AI', 'Amazon AWS AI', 'IBM Watson'],
      valueProps: 'Accessible AI solutions that any business can implement without technical expertise',
      channels: ['Enterprise sales', 'Developer communities', 'Tech conferences'],
      revenue: ['Software licensing', 'Consulting fees', 'API usage fees'],
      keyMetrics: ['API calls per month', 'Customer acquisition cost', 'Revenue per user'],
      hypotheses: [
        { type: 'Desirability', text: 'Small businesses want easy-to-use AI tools without hiring specialists', criticality: 'High', method: 'Business owner interviews' },
        { type: 'Viability', text: 'Companies will pay $500/month for no-code AI solutions', criticality: 'High', method: 'Pricing validation' },
        { type: 'Feasibility', text: 'Pre-built models can solve 80% of common business problems', criticality: 'Medium', method: 'Technical assessment' }
      ],
      mission: 'Make artificial intelligence accessible to every business, regardless of technical expertise or budget.',
      vision: 'To democratize AI and enable every organization to harness the power of intelligent automation.',
      values: ['Accessibility: Making AI simple for everyone', 'Innovation: Pushing the boundaries of what AI can do', 'Ethics: Responsible AI development and deployment']
    }
  };

  const defaultData = {
    names: ['StartupCo', 'InnovateTech', 'BusinessFlow', 'TechSolution', 'GrowthHub', 'ScaleUp', 'VentureX', 'LaunchPad', 'NextGen', 'FutureNow'],
    problems: ['Market inefficiencies', 'Customer pain points', 'Technology gaps'],
    solutions: ['Innovative platform', 'Technology solution', 'Service optimization'],
    customers: ['Target demographic', 'Business users', 'End consumers'],
    competitors: ['Industry leader 1', 'Industry leader 2', 'Emerging competitor'],
    valueProps: 'Innovative solution that solves key market problems efficiently',
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
    values: ['Innovation: Constantly pushing boundaries', 'Quality: Delivering excellent solutions', 'Impact: Making a meaningful difference']
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
      valueProposition: data.valueProps,
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
      elevatorPitch: `Did you know that ${data.problems[0].toLowerCase()}? This represents a significant opportunity in the ${industry.replace('_', ' ')} industry.

${data.names[0]} is ${ideaText} that ${data.solutions[0].toLowerCase()}. Unlike existing alternatives, we focus on ${data.valueProps.toLowerCase()}.

Our team has deep expertise in this space, and we generate revenue through ${data.revenue[0].toLowerCase()}. In essence, we are revolutionizing how ${data.customers[0].toLowerCase()} interact with this market. Our vision is ${data.vision.toLowerCase()}`
    },
    created: new Date().toISOString()
  };
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
    
    // Simulate AI processing with step-by-step updates
    const interval = setInterval(() => {
      setGenerationStep(prev => {
        if (prev < generationSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Generate comprehensive startup data
          const newIdea = generateStartupContent(ideaText);
          onIdeaCreated(newIdea);
          setIsGenerating(false);
          return prev;
        }
      });
    }, 500);
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

// Main Workspace Component
export const ZigZagWorkspace = ({ onLogout }) => {
  const [currentSection, setCurrentSection] = useState('startup-idea');
  const [currentIdea, setCurrentIdea] = useState({
    name: 'TradeHive',
    description: 'social trading platform'
  });

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleNewIdea = () => {
    setCurrentSection('new-idea');
  };

  const handleIdeaCreated = (newIdea) => {
    setCurrentIdea(newIdea);
    setCurrentSection('startup-idea');
  };

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

const ConnectDashboardSection = () => {
  const mentors = [
    {
      name: 'Jenny Lawton',
      title: 'Executive VP @',
      company: 'Roister',
      expertise: 'Business Leadership',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Khaled Nasr',
      title: 'GP @ Interwest',
      company: 'Partners',
      expertise: 'Investment',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Georges Khoury',
      title: 'Software Engineer',
      company: '(Ex Uber)',
      expertise: 'Product Management',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Mira Murati',
      title: 'CTO @ OpenAI',
      company: '',
      expertise: 'AI',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Scott Ford',
      title: 'Partner @ Zigzag',
      company: '',
      expertise: 'Operations',
      image: '/api/placeholder/120/120'
    }
  ];

  const investors = [
    { name: 'Techstars', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Berkeley Skydeck', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'SparkLabs', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Band of Angels', type: 'Angel Network', logo: '/api/placeholder/120/120' },
    { name: 'Y Combinator', type: 'Accelerator', logo: '/api/placeholder/120/120' }
  ];

  const perks = [
    {
      name: 'Carta',
      category: 'Equity Management',
      benefit: 'Start for Free',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Dropbox',
      category: 'Cloud Storage',
      benefit: 'Up to 50% Discount',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Google for Startups',
      category: 'Cloud Services',
      benefit: 'Up to $200,000',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Notion',
      category: 'Knowledge Management',
      benefit: '6 Months Free',
      logo: '/api/placeholder/120/60'
    }
  ];

  const ComingSoonBadge = () => (
    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
      🔒 Coming Soon
    </span>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Progress in your validation journey to unlock a curated list of mentors, investors and potential partners tailored to your startup idea.</p>
      </div>

      {/* Connect with Relevant Mentors */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Mentors</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Harness industry wisdom for strategic navigation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl font-semibold" style={{display: 'none'}}>
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{mentor.name}</h3>
              <p className="text-xs text-gray-600">{mentor.title}</p>
              <p className="text-xs text-gray-600">{mentor.company}</p>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {mentor.expertise}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect with Relevant Investors & Accelerators */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Investors & Accelerators</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Secure funding, networks, and growth catalysts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {investors.map((investor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center overflow-hidden">
                <img 
                  src={investor.logo} 
                  alt={investor.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold text-center p-2" style={{display: 'none'}}>
                  {investor.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{investor.name}</h3>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {investor.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Relevant Perks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Relevant Perks</h2>
          <p className="text-gray-600">Capitalize on cost-saving opportunities and benefits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {perks.map((perk, index) => (
            <div key={index} className="text-center border border-gray-200 rounded-lg p-4">
              <div className="w-20 h-12 bg-white mx-auto mb-3 flex items-center justify-center overflow-hidden border border-gray-100 rounded">
                <img 
                  src={perk.logo} 
                  alt={perk.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold text-center" style={{display: 'none'}}>
                  {perk.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{perk.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{perk.category}</p>
              <div className="text-xs">
                {perk.benefit.includes('Free') ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : perk.benefit.includes('Discount') ? (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {/* Click Here for More */}
          <div className="text-center border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 text-sm">+</span>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Click Here for More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const ConnectDashboardSection = () => {
  const mentors = [
    {
      name: 'Jenny Lawton',
      title: 'Executive VP @',
      company: 'Roister',
      expertise: 'Business Leadership',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Khaled Nasr',
      title: 'GP @ Interwest',
      company: 'Partners',
      expertise: 'Investment',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Georges Khoury',
      title: 'Software Engineer',
      company: '(Ex Uber)',
      expertise: 'Product Management',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Mira Murati',
      title: 'CTO @ OpenAI',
      company: '',
      expertise: 'AI',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Scott Ford',
      title: 'Partner @ Zigzag',
      company: '',
      expertise: 'Operations',
      image: '/api/placeholder/120/120'
    }
  ];

  const investors = [
    { name: 'Techstars', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Berkeley Skydeck', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'SparkLabs', type: 'Accelerator', logo: '/api/placeholder/120/120' },
    { name: 'Band of Angels', type: 'Angel Network', logo: '/api/placeholder/120/120' },
    { name: 'Y Combinator', type: 'Accelerator', logo: '/api/placeholder/120/120' }
  ];

  const perks = [
    {
      name: 'Carta',
      category: 'Equity Management',
      benefit: 'Start for Free',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Dropbox',
      category: 'Cloud Storage',
      benefit: 'Up to 50% Discount',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Google for Startups',
      category: 'Cloud Services',
      benefit: 'Up to $200,000',
      logo: '/api/placeholder/120/60'
    },
    {
      name: 'Notion',
      category: 'Knowledge Management',
      benefit: '6 Months Free',
      logo: '/api/placeholder/120/60'
    }
  ];

  const ComingSoonBadge = () => (
    <span className="inline-flex items-center px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
      🔒 Coming Soon
    </span>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect Dashboard</h1>
        <p className="text-gray-600">Progress in your validation journey to unlock a curated list of mentors, investors and potential partners tailored to your startup idea.</p>
      </div>

      {/* Connect with Relevant Mentors */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Mentors</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Harness industry wisdom for strategic navigation.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {mentors.map((mentor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xl font-semibold" style={{display: 'none'}}>
                  {mentor.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{mentor.name}</h3>
              <p className="text-xs text-gray-600">{mentor.title}</p>
              <p className="text-xs text-gray-600">{mentor.company}</p>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {mentor.expertise}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Connect with Relevant Investors & Accelerators */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Connect with Relevant Investors & Accelerators</h2>
              <ComingSoonBadge />
            </div>
            <p className="text-gray-600">Secure funding, networks, and growth catalysts.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {investors.map((investor, index) => (
            <div key={index} className="text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg mx-auto mb-3 flex items-center justify-center overflow-hidden">
                <img 
                  src={investor.logo} 
                  alt={investor.name}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-semibold text-center p-2" style={{display: 'none'}}>
                  {investor.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">{investor.name}</h3>
              <div className="mt-2">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                  {investor.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Access Relevant Perks */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Relevant Perks</h2>
          <p className="text-gray-600">Capitalize on cost-saving opportunities and benefits.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {perks.map((perk, index) => (
            <div key={index} className="text-center border border-gray-200 rounded-lg p-4">
              <div className="w-20 h-12 bg-white mx-auto mb-3 flex items-center justify-center overflow-hidden border border-gray-100 rounded">
                <img 
                  src={perk.logo} 
                  alt={perk.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-semibold text-center" style={{display: 'none'}}>
                  {perk.name}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{perk.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{perk.category}</p>
              <div className="text-xs">
                {perk.benefit.includes('Free') ? (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : perk.benefit.includes('Discount') ? (
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full font-medium">
                    {perk.benefit}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {/* Click Here for More */}
          <div className="text-center border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 text-sm">+</span>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
              Click Here for More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

