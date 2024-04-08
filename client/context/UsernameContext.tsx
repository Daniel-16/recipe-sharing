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
  // useEffect(() => {
  //   localStorage.getItem("isAuthenticated");
  //   const getCookies = Cookies.get("currentUser");
  //   if (getCookies) {
  //     setUsername(username);
  //   }
  //   // localStorage.removeItem("username");
  // }, [username]);

  // useEffect(() => {
  //   localStorage.setItem("username", username);
  // }, [username]);
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
