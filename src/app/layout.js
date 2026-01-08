import './globals.css'

export const metadata = {
  title: 'BuySellRS - Local Marketplace',
  description: 'Your local marketplace for buying, selling, renting, and services',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Simple Header */}
        <header className="sticky top-0 z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <h1 className="text-2xl font-bold text-gray-900">BuySellRS</h1>
              </div>
              
              <nav className="hidden md:flex space-x-8">
                <a href="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
                <a href="/browse" className="text-gray-700 hover:text-blue-600 font-medium">Browse</a>
                <a href="/post-requirement" className="text-gray-700 hover:text-blue-600 font-medium">Post Need</a>
              </nav>
              
              <div className="flex items-center space-x-4">
                <button className="text-gray-700 hover:text-blue-600 font-medium">
                  Login
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </header>

        {children}

        {/* Simple Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  <h2 className="text-2xl font-bold">BuySellRS</h2>
                </div>
                <p className="text-gray-400">
                  Connecting local buyers with trusted service providers
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="/" className="hover:text-white">Home</a></li>
                  <li><a href="/browse" className="hover:text-white">Browse Services</a></li>
                  <li><a href="/post-requirement" className="hover:text-white">Post Requirement</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Categories</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white">Services</a></li>
                  <li><a href="#" className="hover:text-white">Jobs</a></li>
                  <li><a href="#" className="hover:text-white">Rentals</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-gray-400 mb-2">support@buysellrs.com</p>
                <p className="text-gray-400">+91 98765 43210</p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
              <p>© 2024 BuySellRS. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}