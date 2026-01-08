"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  TrendingUp,
  DollarSign,
  MessageSquare,
  Star,
  Calendar,
  Bell,
  Users,
  Clock,
  Award,
  FileText,
  MapPin,
  CheckCircle,
} from "lucide-react";

export default function SellerDashboard() {
  const [activeProposals, setActiveProposals] = useState([
    {
      id: 1,
      requirement: "Plumber Needed for Bathroom Repair",
      client: "Rajesh Kumar",
      budget: "₹2,000 - ₹3,000",
      location: "Mumbai, Andheri",
      submitted: "1 hour ago",
      status: "pending",
    },
    {
      id: 2,
      requirement: "AC Service for Office",
      client: "Neha Gupta",
      budget: "₹1,500",
      location: "Mumbai, Lower Parel",
      submitted: "3 hours ago",
      status: "viewed",
    },
  ]);

  const [recentJobs, setRecentJobs] = useState([
    {
      id: 1,
      client: "Amit Patel",
      service: "Electrical Wiring",
      amount: "₹3,500",
      date: "Today",
      status: "in_progress",
    },
    {
      id: 2,
      client: "Priya Sharma",
      service: "Home Cleaning",
      amount: "₹2,800",
      date: "Yesterday",
      status: "completed",
    },
  ]);

  const sellerStats = {
    totalEarnings: "₹45,200",
    completedJobs: 28,
    activeProposals: 5,
    acceptanceRate: "85%",
    avgRating: 4.8,
    responseTime: "15 minutes",
  };

  const services = [
    { name: "Plumbing", jobs: 12, earnings: "₹18,500" },
    { name: "Electrical", jobs: 8, earnings: "₹14,200" },
    { name: "Cleaning", jobs: 5, earnings: "₹9,500" },
    { name: "Painting", jobs: 3, earnings: "₹3,000" },
  ];

  return (
    <div className="min-h-screen bg-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Seller Dashboard
              </h1>
              <p className="text-green-100">
                Find work, manage proposals, and grow your business
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-green-700 rounded-full">
                <Bell size={24} />
              </button>
              <Link
                href="/seller/profile-setup"
                className="px-6 py-2 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100"
              >
                Complete Profile
              </Link>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {sellerStats.totalEarnings}
              </div>
              <div className="text-sm text-green-100">Total Earnings</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {sellerStats.completedJobs}
              </div>
              <div className="text-sm text-green-100">Completed Jobs</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {sellerStats.activeProposals}
              </div>
              <div className="text-sm text-green-100">Active Proposals</div>
            </div>
            <div className="bg-white/10 p-4 rounded-xl">
              <div className="text-2xl font-bold">
                {sellerStats.avgRating}/5
              </div>
              <div className="text-sm text-green-100">Avg. Rating</div>
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
                <TrendingUp size={20} className="text-green-500" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/browse"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="text-green-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Find Work</div>
                    <div className="text-sm text-gray-600">
                      Browse requirements
                    </div>
                  </div>
                </Link>
                <Link
                  href="/seller/proposals"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">My Proposals</div>
                    <div className="text-sm text-gray-600">
                      Submitted proposals
                    </div>
                  </div>
                </Link>
                <Link
                  href="/seller/my-services"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">My Services</div>
                    <div className="text-sm text-gray-600">Manage services</div>
                  </div>
                </Link>
                <Link
                  href="/seller/profile-setup"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-200 transition-colors"
                >
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Award className="text-yellow-600" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">Profile Setup</div>
                    <div className="text-sm text-gray-600">
                      Complete profile
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Acceptance Rate</span>
                    <span className="font-semibold">
                      {sellerStats.acceptanceRate}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Avg. Response Time</span>
                    <span className="font-semibold">
                      {sellerStats.responseTime}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="text-center mb-3">
                    <div className="text-3xl font-bold text-green-600">
                      {sellerStats.avgRating}
                    </div>
                    <div className="flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className="text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-600">from 42 reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Services Breakdown</h3>
              <div className="space-y-4">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="flex justify-between items-center"
                  >
                    <span className="font-medium">{service.name}</span>
                    <div className="text-right">
                      <div className="font-semibold">{service.jobs} jobs</div>
                      <div className="text-sm text-green-600">
                        {service.earnings}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Active Proposals */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Active Proposals</h2>
                <Link
                  href="/seller/proposals"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {activeProposals.map((proposal) => (
                  <div
                    key={proposal.id}
                    className="p-4 border rounded-xl hover:border-green-300 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              proposal.status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : proposal.status === "viewed"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {proposal.status.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {proposal.requirement}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {proposal.client}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {proposal.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {proposal.budget}
                        </div>
                        <div className="text-sm text-gray-500">
                          Submitted {proposal.submitted}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/listing/${proposal.id}`}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                      >
                        View Requirement
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                        Message Client
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50">
                        Withdraw
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Jobs */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Recent Jobs</h2>
                <Link
                  href="/seller/my-services"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="p-4 border rounded-xl">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-semibold">
                            {job.client.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold">{job.client}</div>
                          <div className="text-sm text-gray-600">
                            {job.service}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {job.amount}
                        </div>
                        <div
                          className={`text-sm px-2 py-1 rounded-full ${
                            job.status === "completed"
                              ? "bg-green-100 text-green-700"
                              : job.status === "in_progress"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {job.status.replace("_", " ").toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <Calendar size={14} className="inline mr-1" />
                        {job.date}
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                          {job.status === "completed"
                            ? "Leave Review"
                            : "Update Status"}
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="text-blue-600" size={20} />
                Tips for Success
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Respond quickly to requirements (within 1 hour)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Complete your profile with portfolio images
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Ask for reviews after completing jobs
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle size={14} className="text-blue-600" />
                  </div>
                  <span className="text-gray-700">
                    Use professional photos of your work
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
