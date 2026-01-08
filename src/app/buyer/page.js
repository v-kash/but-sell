'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Clock,
  CheckCircle,
  MessageSquare,
  Star,
  TrendingUp,
  Calendar,
  Bell,
  FileText,
  Users,
  DollarSign,
  MapPin
} from 'lucide-react';

export default function BuyerDashboard() {
  const [activeRequirements, setActiveRequirements] = useState([
    {
      id: 1,
      title: "Plumber Needed for Bathroom Repair",
      category: "Plumbing",
      budget: "₹2,000 - ₹3,000",
      location: "Mumbai, Andheri",
      posted: "2 hours ago",
      responses: 5,
      urgency: "high"
    },
    {
      id: 2,
      title: "AC Service for Office",
      category: "Electrical",
      budget: "₹1,500",
      location: "Mumbai, Lower Parel",
      posted: "2 days ago",
      responses: 3,
      urgency: "medium"
    }
  ]);

  const [recentProposals, setRecentProposals] = useState([
    {
      id: 1,
      provider: "Amit Sharma",
      service: "Plumbing Repair",
      quote: "₹2,500",
      time: "1 hour ago",
      rating: 4.9
    },
    {
      id: 2,
      provider: "Raj Electrician",
      service: "AC Service",
      quote: "₹1,200",
      time: "3 hours ago",
      rating: 4.7
    }
  ]);

  const buyerStats = {
    totalRequirements: 12,
    completed: 8,
    active: 2,
    pending: 2,
    avgResponseTime: "2 hours",
    moneySaved: "₹5,400",
    providersContacted: 24
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">Buyer Dashboard</h1>
              <p className="text-blue-100">Welcome back! Manage your requirements and find service providers</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-blue-700 rounded-full">
                <Bell size={24} />
              </button>
              <Link
                href="/post-requirement"
                className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100"
              >
                + Post New Requirement
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">{buyerStats.totalRequirements}</div>
              <div className="text-sm text-blue-100">Total Requirements</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">{buyerStats.completed}</div>
              <div className="text-sm text-blue-100">Completed</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">{buyerStats.active}</div>
              <div className="text-sm text-blue-100">Active</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">₹{buyerStats.moneySaved}</div>
              <div className="text-sm text-blue-100">Estimated Savings</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Quick Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-blue-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/post-requirement"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Post New Requirement</div>
                    <div className="text-sm text-gray-600">Get quotes from providers</div>
                  </div>
                </Link>
                <Link
                  href="/buyer/my-requirements"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">My Requirements</div>
                    <div className="text-sm text-gray-600">View all your posts</div>
                  </div>
                </Link>
                <Link
                  href="/buyer/saved-providers"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Saved Providers</div>
                    <div className="text-sm text-gray-600">Your favorite providers</div>
                  </div>
                </Link>
                <Link
                  href="/browse"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Search className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Find Providers</div>
                    <div className="text-sm text-gray-600">Browse service providers</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Stats Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Your Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Rate</span>
                    <span className="font-semibold">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Response Time</span>
                    <span className="font-semibold">{buyerStats.avgResponseTime}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{buyerStats.completed}</div>
                      <div className="text-sm text-gray-600">Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{buyerStats.active}</div>
                      <div className="text-sm text-gray-600">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{buyerStats.providersContacted}</div>
                      <div className="text-sm text-gray-600">Providers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Requirements */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Active Requirements</h2>
                <Link href="/buyer/my-requirements" className="text-blue-600 hover:text-blue-800 font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {activeRequirements.map((req) => (
                  <div key={req.id} className="p-4 border rounded-xl hover:border-blue-300 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            req.urgency === 'high' ? 'bg-red-100 text-red-700' :
                            req.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {req.urgency.toUpperCase()}
                          </span>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {req.category}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">{req.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {req.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={14} />
                            {req.posted}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{req.budget}</div>
                        <div className="text-sm text-gray-500">{req.responses} responses</div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/listing/${req.id}`}
                        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                      >
                        View Details
                      </Link>
                      <Link
                        href={`/listing/${req.id}`}
                        className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50"
                      >
                        Manage Responses
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Proposals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Proposals</h2>
                <Link href="/buyer/my-requirements" className="text-blue-600 hover:text-blue-800 font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentProposals.map((proposal) => (
                  <div key={proposal.id} className="p-4 border rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-semibold">{proposal.provider.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-semibold">{proposal.provider}</div>
                          <div className="text-sm text-gray-600">{proposal.service}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{proposal.quote}</div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-yellow-400 fill-current" />
                          <span className="text-sm">{proposal.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        Received {proposal.time}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                          Accept
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Tips for Buyers
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Be specific about your requirements to get accurate quotes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Check provider ratings and reviews before hiring</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-green-600" />
                  </div>
                  <span className="text-gray-700">Use platform messaging for secure communication</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}