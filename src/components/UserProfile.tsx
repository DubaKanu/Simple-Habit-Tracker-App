import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOutIcon, UserIcon } from 'lucide-react';
export const UserProfile: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  if (!user) return null;
  return <div className="relative group">
      <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
        <div className="bg-gray-100 p-2 rounded-full">
          <UserIcon className="h-5 w-5" />
        </div>
        <span className="text-sm font-medium">{user.name}</span>
      </button>
      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <button onClick={logout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          <LogOutIcon className="h-4 w-4 mr-2" />
          Sign out
        </button>
      </div>
    </div>;
};