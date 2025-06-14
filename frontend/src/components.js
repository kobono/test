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

const BusinessPrototypeSection = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Prototype</h1>
        <p className="text-gray-600">Transform your idea into a tangible blueprint ensuring a solid foundation for your startup journey.</p>
      </div>

      {/* Lean Canvas Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Lean Canvas</h2>
              <GeneratedBadge />
            </div>
            <p className="text-gray-600">A streamlined one-page business plan template that succinctly captures your startup's vision.</p>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            👁️ Details
          </button>
        </div>

        {/* Lean Canvas Grid */}
        <div className="grid grid-cols-5 gap-4 h-96">
          {/* Problem */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2 text-sm">B. Problem</h3>
            <div className="text-xs text-blue-800 space-y-1">
              <div>• Difficulty in making informed trading decisions for new investors</div>
              <div>• Lack of transparency and trust in financial markets</div>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-semibold text-green-900 mb-2 text-sm">D. Solution</h3>
            <div className="text-xs text-green-800 space-y-1">
              <div>• Real-time social feed for trading insights</div>
              <div>• Copy-trading feature that replicates top traders' actions</div>
            </div>
          </div>

          {/* Unique Value Proposition */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-900 mb-2 text-sm">E. Unique Value Proposition</h3>
            <div className="text-xs text-yellow-800">
              Trade smarter together. Access real-time insights and follow top traders' moves on a collaborative platform.
            </div>
          </div>

          {/* Unfair Advantage */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 mb-2 text-sm">J. Unfair Advantage</h3>
            <div className="text-xs text-purple-800">
              Proprietary algorithm that surfaces trending trades and insights
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h3 className="font-semibold text-orange-900 mb-2 text-sm">A. Customer Segments</h3>
            <div className="text-xs text-orange-800 space-y-1">
              <div>• Millennial Investors</div>
              <div>• Retirement Account Planners</div>
              <div>• Aspiring Full-time Traders</div>
              <div>• Financial Enthusiast Students</div>
            </div>
          </div>

          {/* Existing Alternatives */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">C. Existing Alternatives</h3>
            <div className="text-xs text-gray-700 space-y-1">
              <div>• eToro</div>
              <div>• ZuluTrade</div>
              <div>• CopyMe</div>
              <div>• NAGA</div>
              <div>• TradingView</div>
              <div>• PegTrade</div>
              <div>• Traditional</div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h3 className="font-semibold text-indigo-900 mb-2 text-sm">I. Key Metrics</h3>
            <div className="text-xs text-indigo-800 space-y-1">
              <div>• Number of active users</div>
              <div>• Volume of trades executed</div>
              <div>• User retention rates</div>
              <div>• Social engagement</div>
            </div>
          </div>

          {/* Channels */}
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h3 className="font-semibold text-pink-900 mb-2 text-sm">F. Channels</h3>
            <div className="text-xs text-pink-800 space-y-1">
              <div>• Mobile and desktop applications</div>
              <div>• Social media</div>
              <div>• Trading forums and communities</div>
              <div>• Financial blogs</div>
            </div>
          </div>

          {/* Early Adopters */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <h3 className="font-semibold text-teal-900 mb-2 text-sm">Early Adopters</h3>
            <div className="text-xs text-teal-800 space-y-1">
              <div>• Young traders savvy with social media</div>
              <div>• Investors seeking community</div>
            </div>
          </div>

          {/* High Level Concept */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-semibold text-red-900 mb-2 text-sm">High Level Concept</h3>
            <div className="text-xs text-red-800">
              Social network meets trading floor
            </div>
          </div>

          {/* Cost Structure */}
          <div className="bg-gray-100 border border-gray-300 rounded-lg p-4 col-span-2">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">H. Cost Structure</h3>
          </div>

          {/* Revenue Streams */}
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 col-span-3">
            <h3 className="font-semibold text-green-900 mb-2 text-sm">G. Revenue Streams</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const ValidationSection = () => {
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
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-medium text-sm">01</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Desirability</h4>
                      <p className="text-sm text-gray-600">Traders are interested in a social trading platform that allows them to connect, share insights, and collaborate with other traders.</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">High</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">Validation survey</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-medium text-sm">02</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Viability</h4>
                      <p className="text-sm text-gray-600">The commission model for mirroring trades on the platform is competitive and sustainable for the business.</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">High</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">Financial projection analysis</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600">Edit</button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 font-medium text-sm">03</div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Feasibility</h4>
                      <p className="text-sm text-gray-600">The technology infrastructure required to support real-time data feeds and trade execution can be built within budget constraints.</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">High</span>
                </td>
                <td className="py-4 px-4">
                  <span className="text-sm text-gray-600">Expert interview</span>
                </td>
                <td className="py-4 px-4">
                  <button className="text-gray-400 hover:text-gray-600">Edit</button>
                </td>
              </tr>
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
            <p className="text-sm text-gray-600 mb-4">Create a tailored questionnaire for customer discovery and problem exploration.</p>
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
            <p className="text-sm text-gray-600 mb-4">Develop a simple webpage to illustrate your value proposition.</p>
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

const StorytellingSection = () => {
  const [activeTab, setActiveTab] = useState('brand-wheel');

  const startupNames = [
    'TradeHive', 'EmpowerTrade', 'CollabFX', 'CommuniTrade', 'AscendTrades',
    'UnityBucks', 'TradePulse', 'Empowave', 'TradeSphere', 'CollaboraTrade',
    'CommunifyTrade', 'InnoTradix', 'TradeSynergy', 'EmpowerNet', 'TraderConnect'
  ];

  const [selectedName, setSelectedName] = useState('TradeHive');

  const BrandWheelTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Mission</h3>
            <p className="text-gray-700">Empower individuals to trade, connect, and learn from each other through a social trading platform, revolutionizing the way people engage in financial markets and investing.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Vision</h3>
            <p className="text-gray-700">To create a global community of traders and investors who collaborate, share knowledge, and drive financial empowerment for all.</p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Brand Values</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>Collaboration:</strong> Fostering a supportive community where traders can collaborate, learn from each other, and grow together.</p>
              <p><strong>Transparency:</strong> Providing open and transparent information to empower users to make informed decisions and build trust within the community.</p>
              <p><strong>Innovation:</strong> Constantly evolving and introducing innovative features to enhance the trading experience and provide cutting-edge tools for users.</p>
              <p><strong>Empowerment:</strong> Empowering individuals to take control of their financial futures through education, access to markets, and social engagement.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const StartupNamingTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        {startupNames.map((name, index) => (
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
        <p className="text-sm text-gray-600 italic mb-4">Certainly! Here's your elevator pitch crafted in Markdown format:</p>
        
        <div className="prose max-w-none text-gray-700 leading-relaxed">
          <p className="mb-4">
            <em>Did you know that traders and investors struggle to find a collaborative community to share knowledge and insights? This is a multi-billion dollar opportunity in the financial market industry in every corner of the world.</em>
          </p>
          
          <p className="mb-4">
            TradeHive is a social trading platform that connects global traders, enabling them to collaborate, learn from each other, and enhance their financial knowledge. Unlike other alternatives, TradeHive focuses on building a strong community-driven platform where users can interact, share tips, and empower each other in the world of trading and investing.
          </p>
          
          <p className="mb-4">
            Our team comprises experienced entrepreneurs and finance experts, and we generate revenue through subscription services and premium features. In essence, we are the "LinkedIn for traders," revolutionizing the way people engage in financial markets. Our vision
          </p>
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
// New Idea Form Component
const NewIdeaSection = ({ onIdeaCreated }) => {
  const [ideaText, setIdeaText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ideaText.trim()) return;

    setIsGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const newIdea = {
        name: ideaText.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''),
        description: ideaText,
        created: new Date().toISOString()
      };
      
      onIdeaCreated(newIdea);
      setIsGenerating(false);
    }, 3000);
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
              placeholder="e.g., A social platform for crypto traders to share insights and copy trades"
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
                Generating your startup validation plan...
              </div>
            ) : (
              '🚀 Generate Startup Plan'
            )}
          </button>
        </form>

        {isGenerating && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">AI is working on your idea...</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div>✓ Analyzing market opportunity</div>
              <div>✓ Identifying key hypotheses</div>
              <div>✓ Creating business model canvas</div>
              <div>⏳ Generating validation experiments</div>
              <div>⏳ Crafting brand positioning</div>
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

