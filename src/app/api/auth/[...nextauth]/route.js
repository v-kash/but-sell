import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {
        const res = await fetch("http://localhost:8000/api/google-login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Backend error:", data);
          return false;
        }

        // attach backend token to user
        user.backendToken = data.access;  // your JWT
        user.refreshToken = data.refresh;

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.backendToken = user.backendToken;
        token.refreshToken = user.refreshToken;
        token.email = user.email;
      }
      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken;
      session.refreshToken = token.refreshToken;
      session.user.email = token.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
