import { createContext, useContext, useState, ReactNode } from 'react';

type UserType = 'caregiver' | 'mother' | 'buyer' | null;

export interface UserProfile {
  firstName: string;
  phone: string;
  district: string;
  children: number;
}

interface UserContextType {
  userType: UserType;
  setUserType: (type: UserType) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  return (
    <UserContext.Provider value={{ userType, setUserType, userProfile, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
