import { createContext, useContext, useState, ReactNode } from 'react';

export interface AuthUser {
  email: string;
  password: string;
  firstName?: string;
  district?: string;
  children?: number;
  phone?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => boolean;
  signup: (user: AuthUser) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simple localStorage-based auth for demo
    const stored = localStorage.getItem(`user_${email}`);
    if (stored) {
      const userData = JSON.parse(stored);
      if (userData.password === password) {
        setIsLoggedIn(true);
        setUser(userData);
        return true;
      }
    }
    return false;
  };

  const signup = (userData: AuthUser): boolean => {
    const existing = localStorage.getItem(`user_${userData.email}`);
    if (existing) {
      return false; // Email already exists
    }
    localStorage.setItem(`user_${userData.email}`, JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
