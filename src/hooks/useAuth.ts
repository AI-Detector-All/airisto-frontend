import { useUser } from "@/context/user-context";
import { User } from "@/types/user";

interface AuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => void;
  login: (token: string) => void;
  getTokenUsage: () => {
    used: number;
    total: number;
    percentage: number;
  };
  refreshUserData: () => Promise<void>;
}

export const useAuth = (): AuthReturn => {
  const { user, isLoading, logout, isAuthenticated, refreshUser } = useUser();


  const login = (token: string) => {
    localStorage.setItem("access_token", token);
  };

  const getTokenUsage = () => {
    if (!user) return { used: 0, total: 0, percentage: 0 };
    
    const used = user.usedAnalysesThisMonth;
    const total = user.remainToken + user.usedAnalysesThisMonth;
    const percentage = total > 0 ? (used / total) * 100 : 0;
    
    // if (user.corporate) {
    //   const corporateUsed = user.corporate.totalUsedAnalyses;
    //   const corporateTotal = user.corporate.subscription?.maxTotalAnalyses;
    //   const corporatePercentage = corporateTotal && corporateTotal > 0 ? (corporateUsed / corporateTotal) * 100 : 0;
    // }

    return { used, total, percentage,  };
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
    getTokenUsage,
    refreshUserData
  };
};