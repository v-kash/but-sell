export const dummyAds = [
  {
    id: 1,
    type: "buyer",
    title: "Looking for Office Space on Rent",
    description: "Need furnished office space near IT park.",
    contact: "nextgensolutions@gmail.com",
    location: { state: "Karnataka", city: "Bengaluru", pincode: "560102" },
    budget: "₹40,000 / month",
    images: ["/ads/ad1.jpg", "/ads/ad2.jpg"],
  },
  {
    id: 2,
    type: "employee",
    title: "Looking for Accounting Job",
    description: "B.Com graduate with 3 years experience.",
    contact: "9876543210",
    location: { state: "Maharashtra", city: "Pune", pincode: "411001" },
    images: ["/ads/ad2.jpg", "/ads/ad3.jpg"],
  },
  {
    id: 3,
    type: "employer",
    title: "Hiring React Developer",
    description: "React developer required, 2+ years experience.",
    contact: "hr@techsoft.com",
    location: { state: "Telangana", city: "Hyderabad", pincode: "500081" },
    images: ["/ads/ad3.jpg", "/ads/ad4.jpg"],
  },
  {
    id: 4,
    type: "service_provider",
    title: "AC Repair Services Available",
    description: "Professional AC repair & servicing.",
    contact: "9012345678",
    location: { state: "Delhi", city: "New Delhi", pincode: "110001" },
    images: ["/ads/ad1.jpg", "/ads/ad3.jpg"],
  },
  {
    id: 5,
    type: "seller",
    title: "Second Hand Bike for Sale",
    description: "Well maintained bike, single owner.",
    contact: "9988776655",
    location: { state: "Madhya Pradesh", city: "Indore", pincode: "452001" },
    budget: "₹38,000",
    images: ["/ads/ad4.jpg", "/ads/ad1.jpg"],
  },

  /* ================== MORE DATA ================== */

  {
    id: 6,
    type: "buyer",
    title: "Looking for 2BHK Flat",
    description: "2BHK flat required near metro station.",
    contact: "buyer1@gmail.com",
    location: { state: "Delhi", city: "Delhi", pincode: "110092" },
    budget: "₹25,000 / month",
    images: ["/ads/ad1.jpg"],
  },
  {
    id: 7,
    type: "seller",
    title: "Used Laptop for Sale",
    description: "Dell laptop, good condition.",
    contact: "9876001234",
    location: { state: "Gujarat", city: "Ahmedabad", pincode: "380015" },
    budget: "₹22,000",
    images: ["/ads/ad2.jpg"],
  },
  {
    id: 8,
    type: "service_provider",
    title: "Plumber Available",
    description: "24x7 plumbing services.",
    contact: "9000011111",
    location: { state: "Rajasthan", city: "Jaipur", pincode: "302019" },
    images: ["/ads/ad3.jpg"],
  },
  {
    id: 9,
    type: "employee",
    title: "Looking for Data Entry Job",
    description: "Fresher looking for part-time work.",
    contact: "dataentry@gmail.com",
    location: { state: "Uttar Pradesh", city: "Noida", pincode: "201301" },
    images: ["/ads/ad4.jpg"],
  },
  {
    id: 10,
    type: "employer",
    title: "Hiring Office Boy",
    description: "Office boy required full-time.",
    contact: "office@company.com",
    location: { state: "Maharashtra", city: "Mumbai", pincode: "400001" },
    images: ["/ads/ad1.jpg"],
  },

  /* ========= DUPLICATE PATTERN FOR TESTING ========= */

  ...Array.from({ length: 20 }).map((_, i) => ({
    id: 11 + i,
    type: ["buyer", "seller", "service_provider", "employee", "employer"][
      i % 5
    ],
    title: `Sample Ad Title ${i + 11}`,
    description: "This is dummy data for testing filters.",
    contact: i % 2 === 0 ? "9999999999" : "test@email.com",
    location: {
      state: ["Karnataka", "Maharashtra", "Delhi", "Gujarat", "Telangana"][
        i % 5
      ],
      city: "Test City",
      pincode: `${560000 + i}`,
    },
    budget: i % 2 === 0 ? `₹${10000 + i * 500}` : undefined,
    images: ["/ads/ad1.jpg", "/ads/ad2.jpg"],
  })),
];
