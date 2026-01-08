import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-600 to-emerald-500 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-6 py-28 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Local Services <br className="hidden md:block" />
            Without the Hassle
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Post your requirement and let verified professionals reach out to
            you with the best offers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/post-requirement"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Post a Requirement
            </Link>
            <Link
              href="/browse"
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Browse Services
            </Link>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="flex bg-white rounded-xl shadow-xl overflow-hidden">
              <input
                type="text"
                placeholder="Search plumber, tutor, repair..."
                className="flex-1 px-5 py-4 text-slate-800 outline-none"
              />
              <button className="bg-indigo-600 px-6 text-white font-semibold hover:bg-indigo-700 transition">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "01",
                title: "Post Your Need",
                desc: "Tell us what you need with location & budget",
              },
              {
                step: "02",
                title: "Get Offers",
                desc: "Professionals send you quotes directly",
              },
              {
                step: "03",
                title: "Hire & Finish",
                desc: "Choose the best and get it done",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition"
              >
                <div className="text-indigo-600 font-bold text-5xl mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="py-20 px-6 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
            Popular Categories
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {[
              "Plumbing",
              "Electrical",
              "Cleaning",
              "Tutoring",
              "Repair",
              "Delivery",
              "Painting",
              "Carpentry",
              "Catering",
              "Driving",
              "Gardening",
              "Events",
            ].map((category) => (
              <div
                key={category}
                className="bg-white rounded-xl p-4 text-center font-medium text-slate-700 shadow-sm hover:shadow-md hover:text-indigo-600 cursor-pointer transition"
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RECENT REQUIREMENTS ================= */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Recent Requirements
            </h2>
            <Link
              href="/browse"
              className="text-indigo-600 font-semibold hover:underline"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Plumber Needed",
                desc: "Bathroom pipe leakage repair",
                location: "Mumbai, Andheri",
                time: "2h ago",
                price: "₹2,000 - ₹3,000",
                tag: "Plumbing",
              },
              {
                title: "Math Tutor",
                desc: "Class 10 CBSE home tutor",
                location: "Delhi, Dwarka",
                time: "5h ago",
                price: "₹500 / hour",
                tag: "Tutoring",
              },
              {
                title: "AC Repair",
                desc: "Split AC not cooling",
                location: "Bangalore",
                time: "1 day ago",
                price: "₹1,500 fixed",
                tag: "Electrical",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                </div>
                <p className="text-slate-600 mb-4">{item.desc}</p>
                <div className="text-sm text-slate-500 flex justify-between mb-4">
                  <span>📍 {item.location}</span>
                  <span>{item.time}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-600 font-bold">
                    {item.price}
                  </span>
                  <button className="text-indigo-600 font-semibold hover:underline">
                    Contact →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Post Your First Requirement?
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Get fast responses from trusted professionals near you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/post-requirement"
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition"
            >
              Post Requirement
            </Link>
            <Link
              href="/browse"
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Find Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
