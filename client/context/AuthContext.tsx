"use client";
import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

interface AuthContextData {
  isAuthenticated: string;
  setIsAuthenticated: (value: string) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: "",
  setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<string>("");
  useEffect(() => {
    localStorage.getItem("isAuthenticated");
    const getCookies = Cookies.get("currentUser");
    if (getCookies) {
      setIsAuthenticated("true");
    }
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
  }, []);

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
