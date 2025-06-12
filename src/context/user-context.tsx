'use client'

import { currentUser } from "@/services/user";
import { User } from "@/types/user";
import { deleteCookie, getCookie } from "@/utils/cookie";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => void;
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
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    const token = getCookie("access_token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const userData = await currentUser();
      setUser(userData);
    } catch (error) {
      console.log(error);
      setUser(null);
      deleteCookie("access_token");
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  const logout = () => {
    setIsLoading(true);
    setUser(null);
    deleteCookie("access_token");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
    setIsLoading(false);
    router.push("/sign-in");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated: !!user && !isLoading,
    refreshUser,
    logout
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};