'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Star,
  CheckCircle,
  Phone,
  MessageCircle,
  Share2,
  Flag,
  ArrowLeft,
  User,
  Shield,
  Clock,
  DollarSign,
  Image as ImageIcon
} from 'lucide-react';
import Link from 'next/link';

// Mock data - In real app, fetch from API based on ID
const mockListing = {
  id: 1,
  title: "Plumber Needed for Bathroom Repair - Urgent",
  category: "Plumbing",
  budget: "₹2,000 - ₹3,000",
  location: "Mumbai, Andheri West",
  exactLocation: "Near Infinity Mall, Andheri West, Mumbai - 400053",
  posted: "2 hours ago",
  description: "Bathroom pipe leakage needs immediate fixing. Water is leaking from the main pipe near the washbasin.",
  detailedDescription: `**Urgent Requirement:** Bathroom pipe leakage needs professional plumbing service.

**Problem Details:**
- Main water pipe near washbasin is leaking
- Water leakage is causing dampness on the wall
- Need to fix it before it causes more damage

**Specific Requirements:**
- Must have experience in residential plumbing
- Should bring all necessary tools
- Need completion today itself
- Must provide 30-day warranty for the repair

**Additional Notes:**
The bathroom is on the 3rd floor of an apartment building. Please bring your own tools. I'm available from 10 AM to 6 PM today.`,
  images: [
    { id: 1, url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop" },
    { id: 2, url: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w-400&h=300&fit=crop" },
    { id: 3, url: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w-400&h=300&fit=crop" }
  ],
  validity: "3 days remaining",
  urgency: "high",
  status: "open",
  user: {
    id: 101,
    name: "Rajesh Kumar",
    verified: true,
    rating: 4.8,
    totalReviews: 42,
    memberSince: "2022",
    responseRate: "95%",
    avgResponseTime: "10 minutes",
    phone: "+91 98765 43210",
    email: "rajesh.k@example.com",
    address: "Mumbai, Maharashtra",
    about: "Homeowner with 3 properties. Regular user of service platforms for maintenance needs."
  },
  similarListings: [
    {
      id: 2,
      title: "Bathroom Pipe Installation",
      category: "Plumbing",
      budget: "₹3,500",
      location: "Mumbai, Bandra",
      posted: "5 hours ago"
    },
    {
      id: 3,
      title: "Kitchen Sink Replacement",
      category: "Plumbing",
      budget: "₹2,500 - ₹3,000",
      location: "Mumbai, Dadar",
      posted: "1 day ago"
    },
    {
      id: 4,
      title: "Water Tank Cleaning Service",
      category: "Cleaning",
      budget: "₹1,800",
      location: "Mumbai, Vile Parle",
      posted: "2 days ago"
    }
  ]
};

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState(mockListing);
  const [activeImage, setActiveImage] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [reportModal, setReportModal] = useState(false);

  // In real app, fetch data based on params.id
  useEffect(() => {
    // Fetch listing data here
    // const fetchListing = async () => {
    //   const response = await fetch(`/api/listings/${params.id}`);
    //   const data = await response.json();
    //   setListing(data);
    // };
    // fetchListing();
  }, [params.id]);

  const handleContactClick = () => {
    setShowContact(true);
    // In real app, this might track the contact click
    console.log('Contact info requested for listing:', listing.id);
  };

  const handleCall = () => {
    window.open(`tel:${listing.user.phone}`);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in your requirement: ${listing.title}`;
    window.open(`https://wa.me/${listing.user.phone.replace('+', '')}?text=${encodeURIComponent(message)}`);
  };

  const handleShare = async () => {
    const shareData = {
      title: listing.title,
      text: listing.description,
      url: window.location.href,
    };
    
    try {
      await navigator.share(shareData);
    } catch (err) {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    // In real app, save to user's favorites
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft size={20} />
            Back to Browse
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      listing.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      listing.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {listing.urgency === 'high' ? 'URGENT' : 'STANDARD'}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                      {listing.category}
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                      {listing.status.toUpperCase()}
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                    {listing.title}
                  </h1>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {listing.budget}
                  </div>
                  <div className="text-sm text-gray-500">
                    Negotiable
                  </div>
                </div>
              </div>

              {/* Location & Time */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-blue-500" />
                  <span>{listing.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-blue-500" />
                  <span>Posted {listing.posted}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-blue-500" />
                  <span>{listing.validity}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mb-8">
                <button
                  onClick={handleContactClick}
                  className="flex-1 min-w-[200px] bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={20} />
                  {showContact ? 'Show Contact' : 'Contact Now'}
                </button>
                <button
                  onClick={handleWhatsApp}
                  className="flex-1 min-w-[200px] bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  {isSaved ? '✓ Saved' : 'Save'}
                </button>
                <button
                  onClick={handleShare}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </button>
              </div>

              {/* Contact Info Modal */}
              {showContact && (
                <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Phone Number</p>
                      <p className="text-lg font-semibold">{listing.user.phone}</p>
                      <button
                        onClick={handleCall}
                        className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Click to call
                      </button>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <p className="text-lg font-semibold">{listing.user.email}</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      ⚠️ For your safety: Always verify service provider credentials before sharing personal details.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Image Gallery */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <ImageIcon size={20} className="text-blue-500" />
                Photos
              </h2>
              
              {/* Main Image */}
              <div className="mb-4">
                <div className="relative h-64 md:h-96 bg-gray-100 rounded-xl overflow-hidden">
                  {listing.images && listing.images.length > 0 ? (
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${listing.images[activeImage].url})` }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={48} />
                    </div>
                  )}
                </div>
              </div>
              
              {/* Thumbnails */}
              {listing.images && listing.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {listing.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setActiveImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        activeImage === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                    >
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${image.url})` }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Detailed Description</h2>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {listing.description}
                </p>
                
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-4">Complete Requirement Details:</h3>
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {listing.detailedDescription}
                  </div>
                </div>
              </div>
              
              {/* Requirements List */}
              <div className="mt-8">
                <h3 className="font-semibold text-gray-900 mb-4">What I'm looking for:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span>Must have professional plumbing experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span>Should bring all necessary tools and equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span>Need completion within today</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      ✓
                    </div>
                    <span>30-day warranty for the repair work</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Posted By */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <User size={20} className="text-blue-500" />
                Posted By
              </h2>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {listing.user.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold">{listing.user.name}</h3>
                    {listing.user.verified && (
                      <CheckCircle className="text-blue-500" size={18} />
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="text-yellow-400" size={16} fill="currentColor" />
                    <span>{listing.user.rating} ({listing.user.totalReviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">{listing.user.memberSince}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Rate</span>
                  <span className="font-medium text-green-600">{listing.user.responseRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Response Time</span>
                  <span className="font-medium">{listing.user.avgResponseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Location</span>
                  <span className="font-medium">{listing.user.address}</span>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                View Full Profile
              </button>
            </div>

            {/* Safety Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="font-semibold text-blue-900">Safety Tips</h3>
                  <p className="text-sm text-blue-800 mt-1">Stay safe while transacting</p>
                </div>
              </div>
              
              <ul className="space-y-3 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    ℹ️
                  </div>
                  <span>Meet in public places or with company</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    💰
                  </div>
                  <span>Avoid upfront payments without service</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    🔍
                  </div>
                  <span>Check service provider credentials</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    📞
                  </div>
                  <span>Use platform chat for initial communication</span>
                </li>
              </ul>
            </div>

            {/* Similar Listings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Similar Requirements</h2>
              
              <div className="space-y-4">
                {listing.similarListings.map((similar) => (
                  <Link 
                    key={similar.id}
                    href={`/listing/${similar.id}`}
                    className="block p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {similar.category}
                      </span>
                      <span className="text-xs text-gray-500">{similar.posted}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                      {similar.title}
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin size={14} />
                        {similar.location}
                      </span>
                      <span className="font-semibold text-green-600 text-sm">
                        {similar.budget}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
              
              <Link
                href="/browse"
                className="block w-full mt-6 py-3 text-center border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                View All Requirements
              </Link>
            </div>

            {/* Report Button */}
            <button
              onClick={() => setReportModal(true)}
              className="flex items-center gap-2 text-gray-500 hover:text-red-600 text-sm"
            >
              <Flag size={16} />
              Report this listing
            </button>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      {reportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Report This Listing</h3>
            <p className="text-gray-600 mb-6">
              Please select the reason for reporting this listing:
            </p>
            
            <div className="space-y-3 mb-6">
              {[
                'Spam or scam',
                'Inappropriate content',
                'Wrong category',
                'Fake contact information',
                'Already resolved',
                'Other'
              ].map((reason) => (
                <label key={reason} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input type="radio" name="reportReason" className="text-blue-600" />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setReportModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setReportModal(false);
                  alert('Thank you for reporting. We will review this listing.');
                }}
                className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Bottom CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
        <div className="flex gap-3">
          <button
            onClick={handleContactClick}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-lg"
          >
            {showContact ? 'Contact Shown' : 'Contact'}
          </button>
          <button
            onClick={handleWhatsApp}
            className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-lg"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}