"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const createGuestSession = async () => {
      try {
        // Check if token already exists
        const existingToken = localStorage.getItem("token");

        if (existingToken) {
          setToken(existingToken);
          return;
        }

        // Create new guest session
        const response = await fetch(
          "https://backend-velora-production.up.railway.app/api/auth/guest",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );


        if (!response.ok) {
          throw new Error("Failed to create guest session");
        }

        const data = await response.json();

        if (!data.token) {
          throw new Error("Token not returned");
        }

        // Save token
        localStorage.setItem("token", data.token);

        // Update context
        setToken(data.token);
      } catch (error) {
        console.error("Guest session error:", error);
      } finally {
        setLoading(false);
      }
    };

    createGuestSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}