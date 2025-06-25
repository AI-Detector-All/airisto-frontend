import { useUser } from "@/context/user-context";
import { User } from "@/types/user";

interface AuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
  refreshUserData: () => Promise<void>;
}

export const useAuth = (): AuthReturn => {
  const { user, isLoading, logout, isAuthenticated, refreshUser } = useUser();

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
  };


  const refreshUserData = async () => {
    await refreshUser();
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    logout,
    login,
    refreshUserData
  };
};