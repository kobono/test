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

// Navigation Component
const Navigation = ({ activeSection, onSectionChange, onLogout }) => {
  const menuItems = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'criticalHypotheses', name: 'Critical Hypotheses', icon: '🔬' },
    { id: 'experiments', name: 'Experiments', icon: '⚗️' },
    { id: 'insights', name: 'Insights', icon: '💡' },
    { id: 'reports', name: 'Reports', icon: '📋' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
      {/* Logo and Brand */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center mr-3">
            <svg 
              width="20" 
              height="20" 
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
          <span className="text-xl font-bold text-gray-900">zigzag</span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 rounded-full mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            title="Logout"
          >
            🚪
          </button>
        </div>
      </div>
    </div>
  );
};

// Metric Card Component
const MetricCard = ({ title, value, change, changeType = 'positive' }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className={`text-sm font-medium ${
        changeType === 'positive' ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </div>
    </div>
  </div>
);

// Chart Component (Mock)
const Chart = ({ title, type = 'line' }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    <div className="h-64 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-2">📈</div>
        <p className="text-gray-600">Interactive {type} chart</p>
        <p className="text-sm text-gray-500 mt-1">Data visualization would appear here</p>
      </div>
    </div>
  </div>
);

// Enhanced Hypothesis Card Component
const EnhancedHypothesisCard = ({ hypothesis, status, confidence, lastUpdated, category, priority }) => {
  const statusColors = {
    'active': 'bg-blue-100 text-blue-800',
    'validated': 'bg-green-100 text-green-800',
    'invalidated': 'bg-red-100 text-red-800',
    'pending': 'bg-yellow-100 text-yellow-800'
  };

  const priorityColors = {
    'critical': 'bg-red-100 text-red-800',
    'high': 'bg-orange-100 text-orange-800',
    'medium': 'bg-yellow-100 text-yellow-800',
    'low': 'bg-gray-100 text-gray-800'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
            <span className="text-xs text-gray-500">{category}</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3">{hypothesis}</h4>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
            <span className="text-sm text-gray-500">
              Confidence: <span className="font-medium">{confidence}%</span>
            </span>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Last updated</p>
          <p className="text-sm font-medium text-gray-900">{lastUpdated}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
            View Details
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Run Test
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Edit
          </button>
        </div>
        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${confidence}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Sections
const OverviewSection = () => {
  const mockMetrics = [
    { title: 'Active Hypotheses', value: '24', change: '+12%', changeType: 'positive' },
    { title: 'Validation Score', value: '8.2/10', change: '+0.4', changeType: 'positive' },
    { title: 'Market Fit Confidence', value: '73%', change: '+5%', changeType: 'positive' },
    { title: 'Days to Launch', value: '156', change: '-12', changeType: 'positive' }
  ];

  const recentActivity = [
    { type: 'hypothesis', title: 'New hypothesis created: "Users will pay $29/month"', time: '2 hours ago', status: 'active' },
    { type: 'experiment', title: 'Landing page A/B test completed', time: '4 hours ago', status: 'completed' },
    { type: 'insight', title: 'AI insight: Consider reducing price point', time: '1 day ago', status: 'insight' },
    { type: 'validation', title: 'Customer interview #12 completed', time: '2 days ago', status: 'completed' }
  ];

  const validationPhases = [
    { phase: 'Problem Validation', status: 'completed', progress: 100 },
    { phase: 'Solution Validation', status: 'active', progress: 67 },
    { phase: 'Market Validation', status: 'pending', progress: 25 },
    { phase: 'Business Model', status: 'pending', progress: 0 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Startup Validation Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your startup validation progress and key metrics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Validation Progress */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Validation Progress</h3>
          <div className="space-y-4">
            {validationPhases.map((phase, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full mr-3 ${
                    phase.status === 'completed' ? 'bg-green-500' :
                    phase.status === 'active' ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-700">{phase.phase}</span>
                </div>
                <span className="text-sm text-gray-500">{phase.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === 'completed' ? 'bg-green-500' :
                  activity.status === 'active' ? 'bg-blue-500' :
                  activity.status === 'insight' ? 'bg-purple-500' : 'bg-gray-400'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Validation Score Trend" type="line" />
        <Chart title="Hypothesis Status Distribution" type="pie" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Chart title="Weekly Experiments" type="bar" />
        <Chart title="Customer Feedback Score" type="gauge" />
        <Chart title="Market Confidence" type="area" />
      </div>
    </div>
  );
};

const CriticalHypothesesSection = () => {
  const mockHypotheses = [
    {
      hypothesis: "Small business owners will pay $29/month for automated social media scheduling",
      status: "active",
      confidence: 78,
      lastUpdated: "2 hours ago",
      category: "Pricing & Monetization",
      priority: "high"
    },
    {
      hypothesis: "Remote workers struggle with productivity tracking and need a simple solution",
      status: "validated",
      confidence: 92,
      lastUpdated: "1 day ago",
      category: "Problem Validation",
      priority: "critical"
    },
    {
      hypothesis: "Users prefer mobile-first interface over desktop for task management",
      status: "pending",
      confidence: 65,
      lastUpdated: "3 days ago",
      category: "Product Features",
      priority: "medium"
    },
    {
      hypothesis: "B2B customers require enterprise-level security features to adopt our solution",
      status: "invalidated",
      confidence: 23,
      lastUpdated: "1 week ago",
      category: "Market Requirements",
      priority: "low"
    },
    {
      hypothesis: "Freemium model will drive more user acquisition than paid-only model",
      status: "active",
      confidence: 84,
      lastUpdated: "5 hours ago",
      category: "Business Model",
      priority: "high"
    },
    {
      hypothesis: "Integration with Slack/Teams is essential for product adoption",
      status: "validated",
      confidence: 89,
      lastUpdated: "2 days ago",
      category: "Product Features",
      priority: "critical"
    }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const categories = ['all', 'Problem Validation', 'Product Features', 'Pricing & Monetization', 'Business Model', 'Market Requirements'];
  const priorities = ['all', 'critical', 'high', 'medium', 'low'];

  const filteredHypotheses = mockHypotheses.filter(h => {
    const categoryMatch = selectedCategory === 'all' || h.category === selectedCategory;
    const priorityMatch = selectedPriority === 'all' || h.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Critical Hypotheses</h1>
          <p className="text-gray-600 mt-2">Validate your key startup assumptions before investing time and money</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
          + New Hypothesis
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select 
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {priorities.map(pri => (
                <option key={pri} value={pri}>{pri === 'all' ? 'All Priorities' : pri.charAt(0).toUpperCase() + pri.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Hypothesis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHypotheses.map((hypothesis, index) => (
          <EnhancedHypothesisCard key={index} {...hypothesis} />
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-green-600">{mockHypotheses.filter(h => h.status === 'validated').length}</div>
          <div className="text-sm text-gray-600">Validated</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-blue-600">{mockHypotheses.filter(h => h.status === 'active').length}</div>
          <div className="text-sm text-gray-600">Active Testing</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-yellow-600">{mockHypotheses.filter(h => h.status === 'pending').length}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100 text-center">
          <div className="text-2xl font-bold text-red-600">{mockHypotheses.filter(h => h.status === 'invalidated').length}</div>
          <div className="text-sm text-gray-600">Invalidated</div>
        </div>
      </div>
    </div>
  );
};

const ExperimentsSection = () => {
  const [activeTab, setActiveTab] = useState('running');

  const mockExperiments = {
    running: [
      {
        id: 1,
        name: "Landing Page A/B Test - Pricing Sensitivity",
        type: "A/B Test",
        status: "running",
        progress: 67,
        participants: 1247,
        targetParticipants: 2000,
        startDate: "Nov 15, 2024",
        endDate: "Dec 15, 2024",
        hypothesis: "Users will convert 25% better with $19/month vs $29/month pricing",
        variants: ["Version A: $29/month", "Version B: $19/month"],
        currentResults: { conversionA: "3.2%", conversionB: "4.1%" }
      },
      {
        id: 2,
        name: "Customer Interview - Pain Point Validation",
        type: "Interview",
        status: "running",
        progress: 45,
        participants: 18,
        targetParticipants: 40,
        startDate: "Nov 20, 2024",
        endDate: "Dec 10, 2024",
        hypothesis: "Remote workers struggle with time tracking and need automated solution",
        variants: ["Structured Interview Protocol"],
        currentResults: { painPointConfirmed: "83%", willingToPay: "67%" }
      },
      {
        id: 3,
        name: "Feature Prototype Test - Mobile vs Desktop",
        type: "Prototype Test",
        status: "running",
        progress: 23,
        participants: 89,
        targetParticipants: 200,
        startDate: "Nov 25, 2024",
        endDate: "Dec 20, 2024",
        hypothesis: "Mobile-first interface will have higher engagement than desktop",
        variants: ["Mobile Interface", "Desktop Interface"],
        currentResults: { engagementMobile: "78%", engagementDesktop: "65%" }
      }
    ],
    completed: [
      {
        id: 4,
        name: "Market Size Survey - SMB Segment",
        type: "Survey",
        status: "completed",
        progress: 100,
        participants: 500,
        targetParticipants: 500,
        startDate: "Oct 1, 2024",
        endDate: "Nov 1, 2024",
        hypothesis: "SMBs with 10-50 employees are willing to pay for productivity tools",
        variants: ["Survey with 15 questions"],
        results: { marketSize: "2.3M companies", willingToPay: "42%", avgBudget: "$125/month" }
      },
      {
        id: 5,
        name: "Email Signup Form - Optimization",
        type: "A/B Test",
        status: "completed",
        progress: 100,
        participants: 3200,
        targetParticipants: 3000,
        startDate: "Oct 15, 2024",
        endDate: "Nov 10, 2024",
        hypothesis: "Single-field email form will outperform multi-field form",
        variants: ["Single Email Field", "Email + Name + Company"],
        results: { conversionSingle: "12.4%", conversionMulti: "8.7%", winner: "Single Field" }
      }
    ],
    planned: [
      {
        id: 6,
        name: "Freemium vs Paid Model Test",
        type: "Business Model Test",
        status: "planned",
        progress: 0,
        participants: 0,
        targetParticipants: 1000,
        startDate: "Dec 1, 2024",
        endDate: "Jan 15, 2025",
        hypothesis: "Freemium model will drive 3x more signups than paid-only model",
        variants: ["Freemium with 14-day trial", "Paid-only with demo"],
        currentResults: {}
      }
    ]
  };

  const ExperimentCard = ({ experiment }) => {
    const statusColors = {
      'running': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'planned': 'bg-gray-100 text-gray-800'
    };

    const typeIcons = {
      'A/B Test': '🔀',
      'Interview': '🎤',
      'Survey': '📋',
      'Prototype Test': '🎨',
      'Business Model Test': '💰'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{typeIcons[experiment.type]}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{experiment.name}</h3>
              <p className="text-sm text-gray-600">{experiment.type}</p>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[experiment.status]}`}>
            {experiment.status.charAt(0).toUpperCase() + experiment.status.slice(1)}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-700 mb-2"><strong>Hypothesis:</strong> {experiment.hypothesis}</p>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>{experiment.startDate} - {experiment.endDate}</span>
            <span>{experiment.participants}/{experiment.targetParticipants} participants</span>
          </div>
        </div>

        {experiment.progress > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-sm text-gray-600">{experiment.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${experiment.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {experiment.currentResults && Object.keys(experiment.currentResults).length > 0 && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Current Results:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(experiment.currentResults).map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                  <span className="font-medium ml-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {experiment.results && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Final Results:</p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {Object.entries(experiment.results).map(([key, value]) => (
                <div key={key}>
                  <span className="text-gray-600">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</span>
                  <span className="font-medium ml-1">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
            View Details
          </button>
          {experiment.status === 'running' && (
            <button className="px-3 py-1 text-sm text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
              Pause
            </button>
          )}
          {experiment.status === 'planned' && (
            <button className="px-3 py-1 text-sm text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
              Start
            </button>
          )}
          <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Edit
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Experiments</h1>
          <p className="text-gray-600 mt-2">Design and run experiments to validate your startup hypotheses</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
          + New Experiment
        </button>
      </div>

      {/* Experiment Type Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { type: 'A/B Test', icon: '🔀', desc: 'Compare two versions' },
          { type: 'Survey', icon: '📋', desc: 'Collect user feedback' },
          { type: 'Interview', icon: '🎤', desc: 'Deep user insights' },
          { type: 'Prototype', icon: '🎨', desc: 'Test new features' },
          { type: 'Landing Page', icon: '🌐', desc: 'Validate demand' }
        ].map((item, index) => (
          <button key={index} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 text-center">
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-medium text-gray-900 text-sm">{item.type}</div>
            <div className="text-xs text-gray-600">{item.desc}</div>
          </button>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { key: 'running', label: 'Running', count: mockExperiments.running.length },
            { key: 'completed', label: 'Completed', count: mockExperiments.completed.length },
            { key: 'planned', label: 'Planned', count: mockExperiments.planned.length }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.key
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Experiments List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockExperiments[activeTab].map((experiment) => (
          <ExperimentCard key={experiment.id} experiment={experiment} />
        ))}
      </div>
    </div>
  );
};

const InsightsSection = () => {
  const [selectedInsightType, setSelectedInsightType] = useState('all');

  const mockInsights = [
    {
      id: 1,
      type: 'market_opportunity',
      title: 'Underserved Market Segment Identified',
      description: 'Analysis shows 67% of SMBs (50-100 employees) lack integrated productivity solutions. This represents a $2.3B opportunity.',
      confidence: 94,
      impact: 'high',
      actionable: true,
      timestamp: '2 hours ago',
      source: 'Market Analysis AI',
      recommendations: [
        'Consider expanding product features for mid-market segment',
        'Develop enterprise-grade security features',
        'Create dedicated onboarding flow for larger teams'
      ]
    },
    {
      id: 2,
      type: 'user_behavior',
      title: 'Feature Usage Pattern Insight',
      description: 'Users who engage with the collaboration feature within first 7 days have 3.2x higher retention rate.',
      confidence: 87,
      impact: 'high',
      actionable: true,
      timestamp: '4 hours ago',
      source: 'Behavioral Analytics AI',
      recommendations: [
        'Highlight collaboration features in onboarding',
        'Send targeted emails promoting team features',
        'Add collaboration prompts in the first week experience'
      ]
    },
    {
      id: 3,
      type: 'pricing_optimization',
      title: 'Price Sensitivity Analysis',
      description: 'Current pricing may be 23% higher than optimal. Lowering to $19/month could increase conversions by 41%.',
      confidence: 76,
      impact: 'medium',
      actionable: true,
      timestamp: '1 day ago',
      source: 'Pricing AI',
      recommendations: [
        'Test $19/month price point with A/B experiment',
        'Consider value-based pricing tiers',
        'Add annual discount to improve LTV'
      ]
    },
    {
      id: 4,
      type: 'competitive_intelligence',
      title: 'Competitor Gap Analysis',
      description: 'Main competitors lack mobile-first design. 78% of your target market uses mobile devices for work.',
      confidence: 91,
      impact: 'high',
      actionable: true,
      timestamp: '2 days ago',
      source: 'Competitive Intelligence AI',
      recommendations: [
        'Prioritize mobile app development',
        'Emphasize mobile-first approach in marketing',
        'Create mobile-specific feature set'
      ]
    },
    {
      id: 5,
      type: 'customer_feedback',
      title: 'Support Ticket Sentiment Analysis',
      description: 'Negative sentiment around onboarding process increased 34% this month. Common issues: complexity and time required.',
      confidence: 89,
      impact: 'medium',
      actionable: true,
      timestamp: '3 days ago',
      source: 'Sentiment Analysis AI',
      recommendations: [
        'Simplify onboarding flow to 3 steps max',
        'Add progress indicators and time estimates',
        'Create quick setup option for basic users'
      ]
    },
    {
      id: 6,
      type: 'market_trends',
      title: 'Emerging Technology Trend',
      description: 'AI-powered automation is becoming a must-have feature. 89% of similar tools added AI features in the last 6 months.',
      confidence: 82,
      impact: 'medium',
      actionable: false,
      timestamp: '1 week ago',
      source: 'Trend Analysis AI',
      recommendations: [
        'Research AI integration opportunities',
        'Survey users about desired AI features',
        'Plan AI-powered features roadmap'
      ]
    }
  ];

  const insightTypes = [
    { key: 'all', label: 'All Insights', icon: '🔍' },
    { key: 'market_opportunity', label: 'Market Opportunities', icon: '📈' },
    { key: 'user_behavior', label: 'User Behavior', icon: '👥' },
    { key: 'pricing_optimization', label: 'Pricing', icon: '💰' },
    { key: 'competitive_intelligence', label: 'Competition', icon: '🎯' },
    { key: 'customer_feedback', label: 'Customer Feedback', icon: '💬' },
    { key: 'market_trends', label: 'Market Trends', icon: '📊' }
  ];

  const filteredInsights = selectedInsightType === 'all' 
    ? mockInsights 
    : mockInsights.filter(insight => insight.type === selectedInsightType);

  const InsightCard = ({ insight }) => {
    const impactColors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800'
    };

    const typeInfo = insightTypes.find(t => t.key === insight.type);

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{typeInfo?.icon}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
              <p className="text-sm text-gray-600">{typeInfo?.label}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${impactColors[insight.impact]}`}>
              {insight.impact.toUpperCase()} IMPACT
            </span>
            {insight.actionable && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                ACTIONABLE
              </span>
            )}
          </div>
        </div>

        <p className="text-gray-700 mb-4">{insight.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600">Confidence:</span>
              <span className="font-medium text-gray-900">{insight.confidence}%</span>
            </div>
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  insight.confidence >= 80 ? 'bg-green-500' :
                  insight.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${insight.confidence}%` }}
              ></div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">{insight.source}</p>
            <p className="text-xs text-gray-500">{insight.timestamp}</p>
          </div>
        </div>

        {insight.recommendations && insight.recommendations.length > 0 && (
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Recommended Actions:</p>
            <ul className="space-y-1">
              {insight.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start">
                  <span className="text-teal-500 mr-2">•</span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex space-x-2 mt-4">
          <button className="px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
            Create Hypothesis
          </button>
          <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            Run Experiment
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            Share Insight
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI-Powered Insights</h1>
          <p className="text-gray-600 mt-2">Get intelligent recommendations to accelerate your startup validation</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
            🤖 Generate New Insights
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            📊 Insight Report
          </button>
        </div>
      </div>

      {/* Insight Type Filter */}
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {insightTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setSelectedInsightType(type.key)}
              className={`p-3 rounded-lg text-center transition-all duration-200 ${
                selectedInsightType === type.key
                  ? 'bg-teal-100 text-teal-700 border-2 border-teal-300'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="text-lg mb-1">{type.icon}</div>
              <div className="text-xs font-medium">{type.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="text-2xl font-bold text-purple-600">{mockInsights.length}</div>
          <div className="text-sm text-gray-600">Total Insights</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="text-2xl font-bold text-green-600">{mockInsights.filter(i => i.actionable).length}</div>
          <div className="text-sm text-gray-600">Actionable</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="text-2xl font-bold text-red-600">{mockInsights.filter(i => i.impact === 'high').length}</div>
          <div className="text-sm text-gray-600">High Impact</div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-100">
          <div className="text-2xl font-bold text-blue-600">
            {Math.round(mockInsights.reduce((acc, i) => acc + i.confidence, 0) / mockInsights.length)}%
          </div>
          <div className="text-sm text-gray-600">Avg Confidence</div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredInsights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>
    </div>
  );
};

const ReportsSection = () => {
  const [selectedReport, setSelectedReport] = useState('validation-summary');

  const mockReports = [
    {
      id: 'validation-summary',
      title: 'Startup Validation Summary',
      description: 'Comprehensive overview of all validation activities and results',
      type: 'summary',
      lastGenerated: '2 hours ago',
      format: 'PDF',
      pages: 24,
      sections: ['Executive Summary', 'Problem Validation', 'Solution Validation', 'Market Analysis', 'Business Model', 'Recommendations']
    },
    {
      id: 'hypothesis-report',
      title: 'Critical Hypotheses Analysis',
      description: 'Detailed analysis of all hypotheses with validation status and confidence levels',
      type: 'analysis',
      lastGenerated: '1 day ago',
      format: 'PDF',
      pages: 18,
      sections: ['Hypothesis Overview', 'Validation Results', 'Confidence Analysis', 'Risk Assessment']
    },
    {
      id: 'experiment-results',
      title: 'Experiment Results Compilation',
      description: 'Complete results from all experiments including A/B tests, surveys, and interviews',
      type: 'results',
      lastGenerated: '3 days ago',
      format: 'PDF',
      pages: 32,
      sections: ['A/B Test Results', 'Survey Analysis', 'Interview Insights', 'Statistical Analysis']
    },
    {
      id: 'market-analysis',
      title: 'Market Opportunity Assessment',
      description: 'In-depth market analysis including size, competition, and positioning',
      type: 'market',
      lastGenerated: '1 week ago',
      format: 'PDF',
      pages: 28,
      sections: ['Market Size', 'Competitive Analysis', 'Customer Segments', 'Positioning Strategy']
    },
    {
      id: 'investor-deck',
      title: 'Investor Presentation Deck',
      description: 'Investor-ready presentation with validation data and market opportunity',
      type: 'presentation',
      lastGenerated: '5 days ago',
      format: 'PowerPoint',
      pages: 16,
      sections: ['Problem Statement', 'Solution', 'Market Opportunity', 'Validation Results', 'Business Model', 'Ask']
    }
  ];

  const reportTemplates = [
    { name: 'Weekly Validation Report', icon: '📅', description: 'Regular progress updates' },
    { name: 'Investor Update', icon: '💼', description: 'Stakeholder communication' },
    { name: 'Hypothesis Deep Dive', icon: '🔬', description: 'Detailed hypothesis analysis' },
    { name: 'Market Research Summary', icon: '📊', description: 'Market insights compilation' },
    { name: 'Experiment Results', icon: '⚗️', description: 'Test results and learnings' },
    { name: 'Customer Feedback Report', icon: '💬', description: 'User interview insights' }
  ];

  const validationMetrics = {
    problemValidation: { score: 8.2, status: 'validated', evidence: 'Strong' },
    solutionValidation: { score: 7.1, status: 'in-progress', evidence: 'Moderate' },
    marketValidation: { score: 6.8, status: 'in-progress', evidence: 'Moderate' },
    businessModel: { score: 5.4, status: 'needs-work', evidence: 'Weak' }
  };

  const ReportCard = ({ report }) => {
    const typeIcons = {
      'summary': '📋',
      'analysis': '🔍',
      'results': '📊',
      'market': '🎯',
      'presentation': '📽️'
    };

    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{typeIcons[report.type]}</span>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
              <p className="text-sm text-gray-600">{report.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Last generated</p>
            <p className="text-sm font-medium text-gray-900">{report.lastGenerated}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span>{report.format}</span>
            <span>•</span>
            <span>{report.pages} pages</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
              Ready
            </span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Sections:</p>
          <div className="flex flex-wrap gap-1">
            {report.sections.slice(0, 3).map((section, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {section}
              </span>
            ))}
            {report.sections.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                +{report.sections.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-200">
            📥 Download
          </button>
          <button className="px-3 py-1 text-sm text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            🔄 Regenerate
          </button>
          <button className="px-3 py-1 text-sm text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            📤 Share
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            ⚙️ Customize
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Validation Reports</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive reports for stakeholders and decision making</p>
        </div>
        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
          📝 Create Custom Report
        </button>
      </div>

      {/* Validation Score Overview */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Validation Score</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Object.entries(validationMetrics).map(([key, metric]) => (
            <div key={key} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-2">
                <svg className="w-20 h-20 transform -rotate-90">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#e5e7eb"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke={metric.score >= 8 ? "#10b981" : metric.score >= 6 ? "#f59e0b" : "#ef4444"}
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${metric.score * 20} 200`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900">{metric.score}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900 capitalize">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              </p>
              <p className="text-xs text-gray-600">{metric.evidence} Evidence</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Report Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template, index) => (
            <button
              key={index}
              className="p-4 border border-gray-200 rounded-lg hover:border-teal-300 hover:bg-teal-50 transition-all duration-200 text-left"
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{template.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{template.name}</p>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Reports</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockReports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>

      {/* Report Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Report Usage</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Downloads this month</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Shares</span>
              <span className="font-medium">23</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Custom reports</span>
              <span className="font-medium">8</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Sections</h4>
          <div className="space-y-2">
            {['Executive Summary', 'Market Analysis', 'Validation Results', 'Recommendations'].map((section, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{section}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-teal-500 rounded-full"
                      style={{ width: `${100 - index * 20}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{100 - index * 20}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Export Formats</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { format: 'PDF', count: 31, icon: '📄' },
              { format: 'PowerPoint', count: 12, icon: '📽️' },
              { format: 'Excel', count: 8, icon: '📊' },
              { format: 'Word', count: 4, icon: '📝' }
            ].map((item, index) => (
              <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{item.icon}</div>
                <div className="text-sm font-medium text-gray-900">{item.format}</div>
                <div className="text-xs text-gray-600">{item.count} exports</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = () => {
  const [activeSettingsTab, setActiveSettingsTab] = useState('account');

  const settingsTabs = [
    { key: 'account', label: 'Account', icon: '👤' },
    { key: 'team', label: 'Team & Access', icon: '👥' },
    { key: 'notifications', label: 'Notifications', icon: '🔔' },
    { key: 'integrations', label: 'Integrations', icon: '🔗' },
    { key: 'billing', label: 'Billing', icon: '💳' },
    { key: 'security', label: 'Security', icon: '🔒' }
  ];

  const AccountSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              type="text" 
              defaultValue="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input 
              type="email" 
              defaultValue="john@company.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
            <input 
              type="text" 
              defaultValue="Startup Inc."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option>Founder</option>
              <option>Co-founder</option>
              <option>Product Manager</option>
              <option>Marketing Manager</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Startup Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Startup Name</label>
            <input 
              type="text" 
              defaultValue="ProductivityApp"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option>SaaS</option>
              <option>E-commerce</option>
              <option>Fintech</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Stage</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option>Idea</option>
              <option>MVP</option>
              <option>Early Stage</option>
              <option>Growth</option>
              <option>Scale</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Team Size</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
              <option>1 person</option>
              <option>2-5 people</option>
              <option>6-10 people</option>
              <option>11-25 people</option>
              <option>25+ people</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const TeamSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            + Invite Member
          </button>
        </div>
        <div className="space-y-4">
          {[
            { name: 'John Doe', email: 'john@company.com', role: 'Owner', status: 'Active' },
            { name: 'Jane Smith', email: 'jane@company.com', role: 'Admin', status: 'Active' },
            { name: 'Mike Johnson', email: 'mike@company.com', role: 'Member', status: 'Pending' }
          ].map((member, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{member.role}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {member.status}
                </span>
                <button className="text-gray-400 hover:text-gray-600">⚙️</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const NotificationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {[
            { title: 'Experiment Completed', desc: 'When an A/B test or experiment finishes', enabled: true },
            { title: 'New Insights Available', desc: 'When AI generates new insights from your data', enabled: true },
            { title: 'Hypothesis Status Changes', desc: 'When a hypothesis is validated or invalidated', enabled: true },
            { title: 'Weekly Summary', desc: 'Weekly progress report of your validation activities', enabled: false },
            { title: 'Team Activity', desc: 'When team members add or update content', enabled: false }
          ].map((notification, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{notification.title}</p>
                <p className="text-sm text-gray-600">{notification.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const IntegrationSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Integrations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'Google Analytics', desc: 'Track website performance', icon: '📊', connected: true },
            { name: 'Slack', desc: 'Get notifications in Slack', icon: '💬', connected: false },
            { name: 'Typeform', desc: 'Import survey responses', icon: '📝', connected: false },
            { name: 'Intercom', desc: 'Sync customer feedback', icon: '🗨️', connected: true },
            { name: 'Stripe', desc: 'Track payment metrics', icon: '💳', connected: false },
            { name: 'Mixpanel', desc: 'Import user behavior data', icon: '📈', connected: false }
          ].map((integration, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{integration.icon}</span>
                <div>
                  <p className="font-medium text-gray-900">{integration.name}</p>
                  <p className="text-sm text-gray-600">{integration.desc}</p>
                </div>
              </div>
              <button className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                integration.connected 
                  ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                  : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
              }`}>
                {integration.connected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const BillingSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Plan</h3>
        <div className="flex items-center justify-between p-4 bg-teal-50 rounded-lg border border-teal-200">
          <div>
            <p className="font-medium text-gray-900">Pro Plan</p>
            <p className="text-sm text-gray-600">$49/month • Unlimited hypotheses & experiments</p>
          </div>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200">
            Manage Plan
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-sm text-gray-600">Active Hypotheses</p>
            <p className="text-xs text-gray-500">Unlimited available</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">8</p>
            <p className="text-sm text-gray-600">Running Experiments</p>
            <p className="text-xs text-gray-500">Unlimited available</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-sm text-gray-600">Team Members</p>
            <p className="text-xs text-gray-500">10 included</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Dec 1, 2024', amount: '$49.00', status: 'Paid', invoice: 'INV-001' },
            { date: 'Nov 1, 2024', amount: '$49.00', status: 'Paid', invoice: 'INV-002' },
            { date: 'Oct 1, 2024', amount: '$49.00', status: 'Paid', invoice: 'INV-003' }
          ].map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{bill.date}</p>
                <p className="text-sm text-gray-600">{bill.invoice}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">{bill.amount}</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  {bill.status}
                </span>
                <button className="text-teal-600 hover:text-teal-700 text-sm">Download</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication</p>
              <p className="text-sm text-gray-600">Extra security for your account</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              Enabled
            </span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Password</p>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Change Password
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Active Sessions</p>
              <p className="text-sm text-gray-600">2 active sessions</p>
            </div>
            <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200">
              Manage Sessions
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          <button className="w-full p-4 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <p className="font-medium text-gray-900">Export Your Data</p>
            <p className="text-sm text-gray-600">Download all your validation data and reports</p>
          </button>
          
          <button className="w-full p-4 text-left bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200">
            <p className="font-medium text-red-900">Delete Account</p>
            <p className="text-sm text-red-600">Permanently delete your account and all data</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveSettings = () => {
    switch (activeSettingsTab) {
      case 'account': return <AccountSettings />;
      case 'team': return <TeamSettings />;
      case 'notifications': return <NotificationSettings />;
      case 'integrations': return <IntegrationSettings />;
      case 'billing': return <BillingSettings />;
      case 'security': return <SecuritySettings />;
      default: return <AccountSettings />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">Manage your account and platform preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Navigation */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {settingsTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSettingsTab(tab.key)}
                className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                  activeSettingsTab === tab.key
                    ? 'bg-teal-50 text-teal-700 border-l-4 border-teal-500'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span className="mr-3 text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1">
          {renderActiveSettings()}
        </div>
      </div>
    </div>
  );
};

// Main Dashboard Component
export const Dashboard = ({ onLogout }) => {
  const [activeSection, setActiveSection] = useState('criticalHypotheses');
  const location = useLocation();

  // Update active section based on URL hash
  React.useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash && hash !== activeSection) {
      setActiveSection(hash);
    }
  }, [location.hash, activeSection]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />;
      case 'criticalHypotheses':
        return <CriticalHypothesesSection />;
      case 'experiments':
        return <ExperimentsSection />;
      case 'insights':
        return <InsightsSection />;
      case 'reports':
        return <ReportsSection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <CriticalHypothesesSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onLogout={onLogout}
      />
      <main className="flex-1 p-8">
        {renderActiveSection()}
      </main>
    </div>
  );
};