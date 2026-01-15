import "./globals.css";

export const metadata = { title: "BuySellRS" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-20">
        {" "}
        {/* Add padding-top to body */}
        <header className="fixed top-0 left-0 right-0 bg-[#7b2c2c] text-white px-6 py-4 flex justify-between items-center z-50 w-full shadow-md">
          <h2 className="text-xl font-semibold">BuySellRS</h2>
        </header>
        {children}
      </body>
    </html>
  );
}
