"use client";
import { ReactNode, createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface UsernameContextData {
  username: string;
  setUsername: (value: string) => void;
}

interface UsernameProviderProps {
  children: ReactNode;
}

const UserNameContext = createContext<UsernameContextData>({
  username: "",
  setUsername: () => {},
});

const UsernameProvider = ({ children }: UsernameProviderProps) => {
  const [username, setUsername] = useState<string | any>("");
  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    const getCookies = Cookies.get("currentUser");
    if (auth == "true") {
      setUsername(localStorage.getItem("username"));
    } else {
      localStorage.removeItem("username");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("username", username);
  }, [username]);

  return (
    <UserNameContext.Provider value={{ username, setUsername }}>
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UsernameProvider };
