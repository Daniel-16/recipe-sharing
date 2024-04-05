"use client";
import { ReactNode, createContext, useState, useEffect } from "react";

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
  const [username, setUsername] = useState<string>("");
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
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
