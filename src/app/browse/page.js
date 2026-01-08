'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  Star, 
  CheckCircle,
  Grid,
  List,
  ChevronDown,
  X
} from 'lucide-react';
import Link from 'next/link';

// Mock data - in real app, this would come from API
const mockRequirements = [
  {
    id: 1,
    title: "Plumber Needed for Bathroom Repair",
    category: "Plumbing",
    budget: "₹2,000 - ₹3,000",
    location: "Mumbai, Andheri West",
    posted: "2 hours ago",
    description: "Bathroom pipe leakage needs immediate fixing. Need experienced plumber.",
    urgency: "high",
    user: {
      name: "Rajesh Kumar",
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 2,
    title: "Math Tutor for Class 10 CBSE Student",
    category: "Tutoring",
    budget: "₹500/hour",
    location: "Delhi, Dwarka",
    posted: "5 hours ago",
    description: "Need experienced math tutor for CBSE Class 10 student. 3 times a week.",
    urgency: "medium",
    user: {
      name: "Priya Sharma",
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 3,
    title: "AC Repair Service - Split AC Not Cooling",
    category: "Electrical",
    budget: "₹1,500 fixed",
    location: "Bangalore, Koramangala",
    posted: "1 day ago",
    description: "Split AC not cooling properly. Need professional AC repair service.",
    urgency: "high",
    user: {
      name: "Amit Patel",
      verified: true,
      rating: 4.7
    }
  },
  {
    id: 4,
    title: "Home Deep Cleaning Service",
    category: "Cleaning",
    budget: "₹3,000 - ₹4,000",
    location: "Pune, Hinjewadi",
    posted: "1 day ago",
    description: "3BHK apartment needs deep cleaning before moving in.",
    urgency: "low",
    user: {
      name: "Sneha Verma",
      verified: false,
      rating: 4.5
    }
  },
  {
    id: 5,
    title: "Carpenter for Kitchen Cabinet Repair",
    category: "Carpentry",
    budget: "₹4,000 - ₹6,000",
    location: "Hyderabad, Gachibowli",
    posted: "2 days ago",
    description: "Kitchen cabinet doors need repair and polishing.",
    urgency: "medium",
    user: {
      name: "Ravi Teja",
      verified: true,
      rating: 4.6
    }
  },
  {
    id: 6,
    title: "Event Photographer for Wedding",
    category: "Photography",
    budget: "₹15,000/day",
    location: "Chennai, Adyar",
    posted: "2 days ago",
    description: "Need professional photographer for wedding ceremony.",
    urgency: "low",
    user: {
      name: "Karthik Nair",
      verified: true,
      rating: 4.9
    }
  },
  {
    id: 7,
    title: "Driver with Own Car for Daily Commute",
    category: "Driving",
    budget: "₹20,000/month",
    location: "Gurgaon, Sector 45",
    posted: "3 days ago",
    description: "Need driver with own car for office commute.",
    urgency: "medium",
    user: {
      name: "Neha Gupta",
      verified: true,
      rating: 4.8
    }
  },
  {
    id: 8,
    title: "Painter for 2BHK Flat Interior",
    category: "Painting",
    budget: "₹25,000 - ₹30,000",
    location: "Noida, Sector 62",
    posted: "3 days ago",
    description: "Complete interior painting for 2BHK flat.",
    urgency: "low",
    user: {
      name: "Vikram Singh",
      verified: false,
      rating: 4.4
    }
  }
];

const categories = [
  "All Categories",
  "Plumbing",
  "Electrical",
  "Cleaning",
  "Tutoring",
  "Delivery",
  "Repair",
  "Carpentry",
  "Painting",
  "Photography",
  "Driving",
  "Gardening",
  "Event Planning",
  "Catering"
];

const locations = [
  "All India",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur"
];

export default function BrowsePage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All India');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRequirements, setFilteredRequirements] = useState(mockRequirements);
  const [sortBy, setSortBy] = useState('recent');

  // Filter and sort requirements
  useEffect(() => {
    let filtered = [...mockRequirements];
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(req => 
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (selectedCategory !== 'All Categories') {
      filtered = filtered.filter(req => req.category === selectedCategory);
    }
    
    // Filter by location
    if (selectedLocation !== 'All India') {
      filtered = filtered.filter(req => req.location.includes(selectedLocation));
    }
    
    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => {
        // Mock sorting by ID (in real app would use timestamps)
        return b.id - a.id;
      });
    } else if (sortBy === 'budget_high') {
      filtered.sort((a, b) => {
        const getBudget = (budget) => parseInt(budget.replace(/[^0-9]/g, '')) || 0;
        return getBudget(b.budget) - getBudget(a.budget);
      });
    } else if (sortBy === 'budget_low') {
      filtered.sort((a, b) => {
        const getBudget = (budget) => parseInt(budget.replace(/[^0-9]/g, '')) || 0;
        return getBudget(a.budget) - getBudget(b.budget);
      });
    }
    
    setFilteredRequirements(filtered);
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedLocation('All India');
    setSearchQuery('');
    setSortBy('recent');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Find What You Need
          </h1>
          <p className="text-lg text-blue-100 mb-8">
            Browse requirements from buyers across India
          </p>
          
          {/* Main Search */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search for services, items, or requirements..."
                className="w-full pl-12 pr-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter size={18} />
              Filters
              {showFilters && <ChevronDown className="rotate-180" size={18} />}
              {!showFilters && <ChevronDown size={18} />}
            </button>
            
            <div className="hidden md:flex items-center gap-2 bg-white border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
              >
                <List size={20} />
              </button>
            </div>
            
            <div className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredRequirements.length}</span> requirements found
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="budget_high">Budget: High to Low</option>
              <option value="budget_low">Budget: Low to High</option>
            </select>
            
            <Link
              href="/post-requirement"
              className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Post Your Need
            </Link>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <X size={16} />
                Clear All
              </button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Category
                </label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Location
                </label>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        selectedLocation === location
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Active Filters */}
            {(selectedCategory !== 'All Categories' || selectedLocation !== 'All India') && (
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-gray-600 mb-3">Active Filters:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'All Categories' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Category: {selectedCategory}
                      <button onClick={() => setSelectedCategory('All Categories')}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                  {selectedLocation !== 'All India' && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                      Location: {selectedLocation}
                      <button onClick={() => setSelectedLocation('All India')}>
                        <X size={14} />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Requirements Grid/List */}
        {filteredRequirements.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No requirements found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search terms
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-6'
          }>
            {filteredRequirements.map((requirement) => (
              <div
                key={requirement.id}
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 overflow-hidden ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                {/* Urgency Indicator */}
                <div className={`h-2 ${
                  requirement.urgency === 'high' ? 'bg-red-500' :
                  requirement.urgency === 'medium' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}></div>
                
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {requirement.category}
                        </span>
                        {requirement.urgency === 'high' && (
                          <span className="text-xs font-semibold px-3 py-1 bg-red-100 text-red-700 rounded-full">
                            URGENT
                          </span>
                        )}
                      </div>
                      <Link href={`/listing/${requirement.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 mb-2">
                          {requirement.title}
                        </h3>
                      </Link>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">
                        {requirement.budget}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {requirement.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {requirement.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {requirement.posted}
                    </div>
                  </div>
                  
                  {/* User Info */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-gray-700">
                          {requirement.user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{requirement.user.name}</span>
                          {requirement.user.verified && (
                            <CheckCircle className="text-blue-500" size={14} />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="text-yellow-400" size={12} fill="currentColor" />
                          <span className="text-sm">{requirement.user.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link
                      href={`/listing/${requirement.id}`}
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Marketplace Stats</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-blue-600">1,234+</div>
              <div className="text-gray-600">Active Requirements</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-600">567+</div>
              <div className="text-gray-600">Service Providers</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-purple-600">89%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-yellow-600">24h</div>
              <div className="text-gray-600">Avg. Response Time</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have a specific need?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Post your requirement and get quotes from multiple service providers. 
            It's free and takes only 2 minutes.
          </p>
          <Link
            href="/post-requirement"
            className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Post Your Requirement
          </Link>
        </div>
      </div>
    </div>
  );
}