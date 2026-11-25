import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (emailOrUser: string | User, password?: string | boolean) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Demo user
const DEMO_USER: User = {
  id: 'demo-user-1',
  name: 'Linh Nguyen',
  email: 'linh@example.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
  phone: '0901 234 567',
  addresses: [
    {
      id: 'addr-1',
      fullName: 'Linh Nguyen',
      phone: '0901 234 567',
      address: '123 Nguyen Hue Street',
      city: 'Ho Chi Minh City',
      district: 'District 1',
      ward: 'Ben Nghe Ward',
      isDefault: true,
    },
  ],
  orders: [],
  savedDesigns: [],
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('plantify_user');
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (emailOrUser: string | User, _password?: string | boolean): Promise<boolean> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setIsLoading(false);

    if (typeof emailOrUser !== 'string') {
      setUser(emailOrUser);
      localStorage.setItem('plantify_user', JSON.stringify(emailOrUser));
      return true;
    }

    const email = emailOrUser;
    const loggedInUser: User = {
      ...DEMO_USER,
      email,
      name: email.split('@')[0] || DEMO_USER.name,
    };
    setUser(loggedInUser);
    localStorage.setItem('plantify_user', JSON.stringify(loggedInUser));
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);

      const newUser: User = {
        ...DEMO_USER,
        id: `user-${Date.now()}`,
        name,
        email,
        avatar: undefined,
        addresses: [],
        orders: [],
        savedDesigns: [],
      };
      setUser(newUser);
      localStorage.setItem('plantify_user', JSON.stringify(newUser));
      return true;
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('plantify_user');
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem('plantify_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: user !== null,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updateUser: updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
