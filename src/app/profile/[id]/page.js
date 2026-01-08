"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  CheckCircle,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Shield,
  Award,
  ThumbsUp,
  Briefcase,
  Clock,
  MessageCircle,
  Share2,
  Flag,
  Edit,
  Settings,
  LogOut,
  ChevronRight,
  ExternalLink,
  Filter,
  Grid,
  List,
} from "lucide-react";
import Link from "next/link";

// Mock user data
const mockUser = {
  id: 101,
  name: "Rajesh Kumar",
  type: "buyer", // buyer, seller, both
  verified: true,
  premium: true,
  rating: 4.8,
  totalReviews: 42,
  memberSince: "March 2022",
  responseRate: "95%",
  avgResponseTime: "10 minutes",
  completionRate: "98%",

  contact: {
    phone: "+91 98765 43210",
    email: "rajesh.k@example.com",
    showContact: true,
  },

  location: "Mumbai, Maharashtra",
  languages: ["Hindi", "English", "Marathi"],

  about: `Homeowner with 3 properties in Mumbai. Regular user of service platforms for maintenance needs. 
  I believe in fair pricing and quality work. Always provide clear requirements and timely payments.`,

  stats: {
    requirementsPosted: 12,
    requirementsCompleted: 11,
    activeRequirements: 1,
    providersContacted: 24,
    avgBudget: "₹2,500",
  },

  badges: [
    { name: "Verified User", icon: "✓", color: "blue" },
    { name: "Premium Member", icon: "👑", color: "yellow" },
    { name: "Fast Responder", icon: "⚡", color: "green" },
    { name: "Top Reviewer", icon: "⭐", color: "purple" },
  ],

  reviews: [
    {
      id: 1,
      reviewer: "Amit Sharma",
      reviewerType: "service_provider",
      rating: 5,
      date: "2 weeks ago",
      comment:
        "Very clear requirements and prompt payment. Great to work with!",
      project: "Plumbing Repair",
    },
    {
      id: 2,
      reviewer: "Priya Patel",
      reviewerType: "service_provider",
      rating: 4,
      date: "1 month ago",
      comment: "Good communication. Knew exactly what he wanted.",
      project: "Electrical Work",
    },
    {
      id: 3,
      reviewer: "Ravi Verma",
      reviewerType: "service_provider",
      rating: 5,
      date: "2 months ago",
      comment: "Professional and respectful. Would work again.",
      project: "Painting Service",
    },
  ],

  activeRequirements: [
    {
      id: 1,
      title: "Plumber Needed for Bathroom Repair",
      category: "Plumbing",
      budget: "₹2,000 - ₹3,000",
      location: "Mumbai, Andheri",
      posted: "2 hours ago",
      urgency: "high",
      responses: 5,
    },
    {
      id: 2,
      title: "AC Service for Office",
      category: "Electrical",
      budget: "₹1,500",
      location: "Mumbai, Lower Parel",
      posted: "2 days ago",
      urgency: "medium",
      responses: 3,
    },
  ],

  completedRequirements: [
    {
      id: 3,
      title: "Home Painting - 2BHK",
      category: "Painting",
      budget: "₹25,000",
      location: "Mumbai, Bandra",
      completed: "1 week ago",
      provider: "Ravi Verma",
      rating: 5,
    },
    {
      id: 4,
      title: "Furniture Assembly",
      category: "Carpentry",
      budget: "₹3,000",
      location: "Mumbai, Powai",
      completed: "2 weeks ago",
      provider: "Sanjay Mehta",
      rating: 4,
    },
  ],
};

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState(mockUser);
  const [activeTab, setActiveTab] = useState("requirements");
  const [showContact, setShowContact] = useState(false);
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  // In real app, fetch user data based on params.id
  useEffect(() => {
    // Fetch user data here
    // const fetchUser = async () => {
    //   const response = await fetch(`/api/users/${params.id}`);
    //   const data = await response.json();
    //   setUser(data);
    // };
    // fetchUser();
  }, [params.id]);

  const handleContactClick = () => {
    if (user.contact.showContact) {
      setShowContact(!showContact);
    } else {
      alert("This user has chosen to keep contact information private.");
    }
  };

  const handleCall = () => {
    window.open(`tel:${user.contact.phone}`);
  };

  const handleMessage = () => {
    // In real app, open chat with user
    router.push(`/messages?user=${user.id}`);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }
          />
        ))}
        <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center shadow-xl">
                <span className="text-4xl md:text-5xl font-bold text-blue-600">
                  {user.name.charAt(0)}
                </span>
              </div>
              {user.premium && (
                <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1">
                  <Award size={12} />
                  PREMIUM
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <h1 className="text-2xl md:text-3xl font-bold">{user.name}</h1>
                {user.verified && (
                  <div className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
                    <CheckCircle size={14} />
                    Verified
                  </div>
                )}
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  {user.type === "buyer"
                    ? "👨‍💼 Buyer"
                    : user.type === "seller"
                    ? "👷 Seller"
                    : "🤝 Buyer & Seller"}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  {renderStars(user.rating)}
                  <span className="text-blue-100">
                    ({user.totalReviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-200" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-200" />
                  Member since {user.memberSince}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleContactClick}
                  className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-2"
                >
                  <Phone size={18} />
                  {showContact ? "Hide Contact" : "Show Contact"}
                </button>
                <button
                  onClick={handleMessage}
                  className="px-6 py-2 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-900 transition-colors flex items-center gap-2"
                >
                  <MessageCircle size={18} />
                  Send Message
                </button>
                <button className="px-6 py-2 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2">
                  <Share2 size={18} />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                Contact Information
              </h3>

              {showContact && user.contact.showContact ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                    <p className="font-semibold text-lg">
                      {user.contact.phone}
                    </p>
                    <button
                      onClick={handleCall}
                      className="mt-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Click to call
                    </button>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Email Address</p>
                    <p className="font-semibold">{user.contact.email}</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      Please contact only for genuine service requirements.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <Phone size={32} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">
                    Contact information is private. Please use the platform's
                    messaging system.
                  </p>
                  <button
                    onClick={handleMessage}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </div>
              )}
            </div>

            {/* User Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-6">User Statistics</h3>

              <div className="space-y-5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Requirements Posted</span>
                  <span className="font-bold text-xl">
                    {user.stats.requirementsPosted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-bold text-xl text-green-600">
                    {user.stats.requirementsCompleted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Now</span>
                  <span className="font-bold text-xl text-blue-600">
                    {user.stats.activeRequirements}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Providers Contacted</span>
                  <span className="font-bold text-xl">
                    {user.stats.providersContacted}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Budget</span>
                  <span className="font-bold text-xl text-green-600">
                    {user.stats.avgBudget}
                  </span>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="mt-8 pt-6 border-t">
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Rate</span>
                    <span className="font-semibold text-green-600">
                      {user.responseRate}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: user.responseRate }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion Rate</span>
                    <span className="font-semibold text-green-600">
                      {user.completionRate}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: user.completionRate }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Award size={20} className="text-yellow-500" />
                Badges & Achievements
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {user.badges.map((badge) => (
                  <div
                    key={badge.name}
                    className={`p-3 rounded-lg text-center ${
                      badge.color === "blue"
                        ? "bg-blue-50 border border-blue-100"
                        : badge.color === "yellow"
                        ? "bg-yellow-50 border border-yellow-100"
                        : badge.color === "green"
                        ? "bg-green-50 border border-green-100"
                        : "bg-purple-50 border border-purple-100"
                    }`}
                  >
                    <div className="text-2xl mb-1">{badge.icon}</div>
                    <div className="text-sm font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {user.languages.map((language) => (
                  <span
                    key={language}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-semibold">
                  About {user.name.split(" ")[0]}
                </h2>
                <button
                  onClick={() => setShowFullAbout(!showFullAbout)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  {showFullAbout ? "Show less" : "Read more"}
                </button>
              </div>

              <p
                className={`text-gray-700 leading-relaxed ${
                  showFullAbout ? "" : "line-clamp-3"
                }`}
              >
                {user.about}
              </p>

              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  Avg. response: {user.avgResponseTime}
                </div>
                <div className="flex items-center gap-2">
                  <ThumbsUp size={16} />
                  {user.completionRate} completion rate
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
            <div className="bg-white rounded-2xl shadow-lg">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  {[
                    {
                      id: "requirements",
                      label: "Requirements",
                      count: user.activeRequirements.length,
                    },
                    {
                      id: "completed",
                      label: "Completed",
                      count: user.completedRequirements.length,
                    },
                    {
                      id: "reviews",
                      label: "Reviews",
                      count: user.reviews.length,
                    },
                    { id: "activity", label: "Activity", count: null },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 ${
                        activeTab === tab.id
                          ? "border-blue-600 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {tab.label}
                      {tab.count !== null && (
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            activeTab === tab.id
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {/* Requirements Tab */}
                {activeTab === "requirements" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">
                        Active Requirements
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded ${
                            viewMode === "grid"
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          <Grid size={20} />
                        </button>
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded ${
                            viewMode === "list"
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-600"
                          }`}
                        >
                          <List size={20} />
                        </button>
                      </div>
                    </div>

                    <div
                      className={`${
                        viewMode === "grid"
                          ? "grid md:grid-cols-2 gap-6"
                          : "space-y-4"
                      }`}
                    >
                      {user.activeRequirements.map((req) => (
                        <Link
                          key={req.id}
                          href={`/listing/${req.id}`}
                          className={`block p-5 border rounded-xl hover:border-blue-300 hover:shadow-md transition-all ${
                            viewMode === "list"
                              ? "flex items-center justify-between"
                              : ""
                          }`}
                        >
                          <div className={viewMode === "list" ? "flex-1" : ""}>
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  req.urgency === "high"
                                    ? "bg-red-100 text-red-700"
                                    : req.urgency === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-green-100 text-green-700"
                                }`}
                              >
                                {req.urgency.toUpperCase()}
                              </span>
                              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                                {req.category}
                              </span>
                            </div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              {req.title}
                            </h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {req.location}
                              </span>
                              <span>{req.posted}</span>
                              <span className="text-green-600 font-semibold">
                                {req.budget}
                              </span>
                            </div>
                          </div>
                          {viewMode === "list" && (
                            <div className="text-right ml-4">
                              <div className="text-sm text-gray-500">
                                {req.responses} responses
                              </div>
                              <ChevronRight className="text-gray-400 ml-2" />
                            </div>
                          )}
                        </Link>
                      ))}
                    </div>

                    {user.activeRequirements.length === 0 && (
                      <div className="text-center py-12">
                        <Briefcase
                          size={48}
                          className="text-gray-300 mx-auto mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          No Active Requirements
                        </h4>
                        <p className="text-gray-600 mb-6">
                          This user doesn't have any active requirements at the
                          moment.
                        </p>
                        <Link
                          href="/browse"
                          className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                        >
                          Browse Other Requirements
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Completed Tab */}
                {activeTab === "completed" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-6">
                      Completed Work
                    </h3>
                    <div className="space-y-4">
                      {user.completedRequirements.map((req) => (
                        <div
                          key={req.id}
                          className="p-5 border rounded-xl bg-gray-50"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold text-gray-900">
                              {req.title}
                            </h4>
                            <div className="flex items-center gap-1">
                              {renderStars(req.rating)}
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded">
                              {req.category}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin size={14} />
                              {req.location}
                            </span>
                            <span className="text-green-600 font-semibold">
                              {req.budget}
                            </span>
                            <span>Completed {req.completed}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">
                              Service Provider:{" "}
                            </span>
                            <span className="font-medium">{req.provider}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">
                        Reviews & Ratings
                      </h3>
                      <div className="text-3xl font-bold text-gray-900">
                        {user.rating.toFixed(1)}{" "}
                        <span className="text-lg text-gray-500">/ 5</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {user.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="pb-6 border-b last:border-0"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="font-semibold">
                                    {review.reviewer.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium">
                                    {review.reviewer}
                                  </div>
                                  <div className="text-sm text-gray-500 capitalize">
                                    {review.reviewerType.replace("_", " ")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-1 mb-1">
                                {renderStars(review.rating)}
                              </div>
                              <div className="text-sm text-gray-500">
                                {review.date}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="text-sm text-gray-600">
                            Project:{" "}
                            <span className="font-medium">
                              {review.project}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {user.reviews.length === 0 && (
                      <div className="text-center py-12">
                        <Star
                          size={48}
                          className="text-gray-300 mx-auto mb-4"
                        />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          No Reviews Yet
                        </h4>
                        <p className="text-gray-600">
                          Be the first to review this user!
                        </p>
                      </div>
                    )}

                    <div className="mt-8">
                      <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
                        View All {user.totalReviews} Reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-6">
                      Recent Activity
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          action: "Posted new requirement",
                          desc: "Plumber Needed for Bathroom Repair",
                          time: "2 hours ago",
                        },
                        {
                          action: "Marked requirement as completed",
                          desc: "Home Painting Service",
                          time: "1 week ago",
                        },
                        {
                          action: "Left review for provider",
                          desc: "Ravi Verma - 5 stars",
                          time: "1 week ago",
                        },
                        {
                          action: "Contacted service provider",
                          desc: "Amit Sharma - Electrician",
                          time: "2 weeks ago",
                        },
                        {
                          action: "Profile viewed by",
                          desc: "24 service providers this week",
                          time: "3 days ago",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {activity.action}
                            </div>
                            <div className="text-gray-600 text-sm mt-1">
                              {activity.desc}
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full shadow">
                  <Shield className="text-green-600" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Trust & Safety Verified
                  </h3>
                  <p className="text-gray-600 mb-4">
                    This user has completed identity verification and maintains
                    a high rating with {user.totalReviews} positive reviews.
                    Their response rate is {user.responseRate}
                    with an average response time of {user.avgResponseTime}.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-500" size={16} />
                      Identity Verified
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-500" size={16} />
                      Payment Verified
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="text-green-500" size={16} />
                      Platform Member
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Report/Edit Options */}
      <div className="max-w-7xl mx-auto px-4 py-8 border-t">
        <div className="flex justify-between items-center">
          <button className="flex items-center gap-2 text-gray-500 hover:text-red-600">
            <Flag size={16} />
            Report Profile
          </button>

          {/* Show edit options if it's the user's own profile */}
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
              <Edit size={16} />
              Edit Profile
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-blue-600">
              <Settings size={16} />
              Settings
            </button>
            <button className="flex items-center gap-2 text-gray-500 hover:text-red-600">
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
