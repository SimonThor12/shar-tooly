// AuthContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  currentUserId: string;
  login: (userId: string) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the AuthProvider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUserId, setCurrentUserId] = useState("");

  // Define login and logout functions
  const login = (userId: string) => {
    setIsLoggedIn(true);
    setCurrentUserId(userId);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUserId("");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for easy access to the context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
