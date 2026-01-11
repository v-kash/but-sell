import "./globals.css";

export const metadata = { title: "BuySellRS" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-[#7b2c2c] text-white px-6 py-3 flex justify-between items-center">
          <h2 className="text-xl font-semibold">BuySellRS</h2>
          <a href="/login" className="border px-3 py-1 rounded">
            Log In
          </a>
        </header>
        {children}
      </body>
    </html>
  );
}
