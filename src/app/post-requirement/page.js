"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Upload,
  MapPin,
  Calendar,
  CheckCircle,
} from "lucide-react";

export default function PostRequirementPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    contactType: "email",
    email: "",
    phone: "",
    userType: "buyer",
    name: "",
    address: "",
    district: "",
    state: "",
    allIndia: false,
    pincode: "",

    // Step 2
    title: "",
    category: "",
    pincodeLocation: "",
    budget: "",
    description: "",
    detailedDescription: "",
    images: [],
    validity: "3",
  });

  const categories = [
    "Plumbing",
    "Electrical",
    "Cleaning",
    "Tutoring",
    "Delivery",
    "Repair",
    "Carpentry",
    "Painting",
    "Event Planning",
    "Catering",
    "Driving",
    "Gardening",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNext = () => {
    if (step === 1) {
      // Basic validation for step 1
      if (!formData.name || !formData.phone) {
        alert("Please fill in required fields");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, submit to API
    console.log("Form submitted:", formData);

    // Show success and redirect
    alert("Requirement posted successfully!");
    router.push("/browse");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post Your Requirement
          </h1>
          <p className="text-gray-600">
            Tell us what you need and connect with the right service providers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10"></div>
          <div
            className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: step === 1 ? "0%" : step === 2 ? "50%" : "100%" }}
          ></div>

          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={`
                w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold
                ${step >= stepNumber ? "bg-blue-600" : "bg-gray-300"}
                transition-all duration-300
              `}
              >
                {step > stepNumber ? <CheckCircle size={20} /> : stepNumber}
              </div>
              <span className="mt-2 text-sm font-medium">
                {stepNumber === 1 && "Contact Info"}
                {stepNumber === 2 && "Requirement"}
                {stepNumber === 3 && "Review"}
              </span>
            </div>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
        >
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Step 1: Contact Information
              </h2>

              {/* Contact Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Email OR Phone Number *
                </label>
                <div className="flex space-x-4 mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, contactType: "email" }))
                    }
                    className={`px-4 py-2 rounded-lg ${
                      formData.contactType === "email"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, contactType: "phone" }))
                    }
                    className={`px-4 py-2 rounded-lg ${
                      formData.contactType === "phone"
                        ? "bg-blue-100 text-blue-700 border border-blue-300"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    Phone
                  </button>
                </div>

                {formData.contactType === "email" ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                ) : (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                )}
              </div>

              {/* User Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  I am *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, userType: "buyer" }))
                    }
                    className={`p-4 rounded-lg border-2 ${
                      formData.userType === "buyer"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="text-lg font-semibold">Buyer</div>
                    <div className="text-sm text-gray-600">
                      Looking to buy/service
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, userType: "seller" }))
                    }
                    className={`p-4 rounded-lg border-2 ${
                      formData.userType === "seller"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="text-lg font-semibold">Seller</div>
                    <div className="text-sm text-gray-600">
                      Offering services
                    </div>
                  </button>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name OR Business Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your name or business name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Address */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    District *
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    placeholder="Enter district"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* State and Pincode */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Enter state"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="Enter pincode"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* All India Checkbox */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="allIndia"
                  name="allIndia"
                  checked={formData.allIndia}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-blue-600 rounded"
                />
                <label htmlFor="allIndia" className="ml-2 text-gray-700">
                  All India (Service needed anywhere in India)
                </label>
              </div>

              {/* Next Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition-colors flex items-center justify-center"
                >
                  Next Step
                  <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Step 2: Requirement Details
              </h2>

              {/* Requirement Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you need? *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Need plumber for bathroom repair"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Where is this needed? *
                </label>
                <input
                  type="text"
                  name="pincodeLocation"
                  value={formData.pincodeLocation}
                  onChange={handleInputChange}
                  placeholder="Enter pincode or city name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Cost / Budget (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    placeholder="Enter estimated budget"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brief Description (Max 50 words)
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of what you need..."
                  rows="3"
                  maxLength="500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.description.length}/500 characters
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Description / Notes (Max 500 words)
                </label>
                <textarea
                  name="detailedDescription"
                  value={formData.detailedDescription}
                  onChange={handleInputChange}
                  placeholder="Write detailed description or notes..."
                  rows="5"
                  maxLength="5000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
                <div className="text-right text-sm text-gray-500 mt-1">
                  {formData.detailedDescription.length}/5000 characters
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <Upload className="mx-auto text-gray-400 mb-3" size={32} />
                  <p className="text-gray-600 mb-2">
                    Drag & drop images here or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    JPG, PNG up to 5MB each
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    id="imageUpload"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 cursor-pointer"
                  >
                    Choose Files
                  </label>
                </div>
              </div>

              {/* Validity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Validity of this post will be
                </label>
                <div className="flex space-x-4">
                  {["3", "7", "15", "30"].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, validity: days }))
                      }
                      className={`px-6 py-3 rounded-lg border ${
                        formData.validity === days
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300"
                      }`}
                    >
                      {days} days
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center"
                >
                  Review & Post
                  <ChevronRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Step 3: Review & Submit
              </h2>

              {/* Review Card */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">
                  Review Your Requirement
                </h3>

                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Posted by</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">
                        {formData.contactType === "email"
                          ? formData.email
                          : formData.phone}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-gray-500">Requirement</p>
                    <p className="font-semibold text-lg">{formData.title}</p>
                    <p className="text-gray-600 mt-1">{formData.description}</p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {formData.pincodeLocation || formData.district}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Budget</p>
                      <p className="font-medium text-green-600">
                        {formData.budget ? `₹${formData.budget}` : "Flexible"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Valid for</p>
                      <p className="font-medium">{formData.validity} days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 mr-3"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the Terms of Service and confirm that the
                    information provided is accurate. I understand that service
                    providers may contact me regarding this requirement.
                  </label>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex justify-between pt-6">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Edit Details
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center"
                >
                  <CheckCircle className="mr-2" size={20} />
                  Post Requirement
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>Tip:</strong> Be specific about your requirement to get
            better quotes. Include details like timing, specific needs, and any
            special requirements.
          </p>
        </div>
      </div>
    </div>
  );
}
