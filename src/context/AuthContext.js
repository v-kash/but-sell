"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // ✅ STORE USER
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      if (data.user) {
        setUser(data.user);        // ✅ save full user
        setLoggedIn(true);
      } else {
        setUser(null);
        setLoggedIn(false);
      }
    } catch {
      setUser(null);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,          // ✅ expose user
        loggedIn,
        setLoggedIn,
        setUser,       // ✅ needed on logout
        loading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
