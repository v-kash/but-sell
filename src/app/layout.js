// app/layout.js
import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "@/components/Header";
import "./globals.css";

export const metadata = { title: "BuySellRS" };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="pt-20">
        <GoogleOAuthProvider
          clientId={process.env.GOOGLE_CLIENT_ID}
        >
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
