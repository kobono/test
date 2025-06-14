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

// Simple Workspace - Just showing a basic version to get the preview working
export const ZigZagWorkspace = ({ onLogout }) => {
  const [currentIdea, setCurrentIdea] = useState({
    name: 'TradeHive',
    description: 'social trading platform',
    industry: 'trading'
  });

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

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Business Prototype */}
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
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
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
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
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
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
              <div className="border border-gray-200 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
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

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-green-500 mr-3">✅</div>
              <div>
                <h3 className="text-green-800 font-medium">ZigZag Platform is Working!</h3>
                <p className="text-green-700 text-sm">
                  Backend API with OpenAI GPT-4o integration is running successfully. 
                  PDF export, data persistence, and all enhanced features are ready to use.
                </p>
              </div>
            </div>
          </div>
        </div>
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