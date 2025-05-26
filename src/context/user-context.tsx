'use client'

import { currentUser } from "@/services/user";
import { User } from "@/types/user";
import React, { createContext, useContext, useEffect, useState } from "react";


interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      
      if (!token) {
        return;
      }
      
      try {
        const userData = await currentUser();
        
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
