import React from 'react';
import { CheckSquareIcon, BarChartIcon } from 'lucide-react';
import { UserProfile } from './UserProfile';
interface HeaderProps {
  activeTab: 'habits' | 'dashboard';
  setActiveTab: (tab: 'habits' | 'dashboard') => void;
}
export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab
}) => {
  return <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <CheckSquareIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">HabitTrackr</h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav className="flex space-x-2">
              <button onClick={() => setActiveTab('habits')} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'habits' ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className="flex items-center space-x-2">
                  <CheckSquareIcon className="h-4 w-4" />
                  <span>Habits</span>
                </div>
              </button>
              <button onClick={() => setActiveTab('dashboard')} className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 ring-2 ring-blue-100' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}>
                <div className="flex items-center space-x-2">
                  <BarChartIcon className="h-4 w-4" />
                  <span>Dashboard</span>
                </div>
              </button>
            </nav>
            <UserProfile />
          </div>
        </div>
      </div>
    </header>;
};