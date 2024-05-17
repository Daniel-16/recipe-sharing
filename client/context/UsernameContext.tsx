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
  const [username, setUsername] = useState<string | any>("");
  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleSetUsername = (value: string) => {
    localStorage.setItem("username", value);
    setUsername(value);
  };

  return (
    <UserNameContext.Provider
      value={{ username, setUsername: handleSetUsername }}
    >
      {children}
    </UserNameContext.Provider>
  );
};

export { UserNameContext, UsernameProvider };
