import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  email: string;
  name: string;
  joinedDate: string;
}
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Mock validation
    if (password.length < 6) {
      throw new Error('Invalid credentials');
    }
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const register = async (email: string, name: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };
  return <AuthContext.Provider value={{
    user,
    login,
    register,
    logout,
    isLoading
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};