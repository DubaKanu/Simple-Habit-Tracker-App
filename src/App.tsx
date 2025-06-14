import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HabitTracker } from './components/HabitTracker';
import { Dashboard } from './components/Dashboard';
import { Habit, HabitCompletion } from './types';
import { Auth } from './components/Auth';
import { AuthProvider, useAuth } from './contexts/AuthContext';
const AppContent = () => {
  const {
    user,
    isLoading
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'habits' | 'dashboard'>('habits');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  // Load initial mock data
  useEffect(() => {
    const initialHabits: Habit[] = [{
      id: '1',
      name: 'Morning Meditation',
      category: 'Wellness',
      targetFrequency: 7
    }, {
      id: '2',
      name: 'Read for 30 minutes',
      category: 'Learning',
      targetFrequency: 5
    }, {
      id: '3',
      name: 'Exercise',
      category: 'Fitness',
      targetFrequency: 4
    }, {
      id: '4',
      name: 'Drink 8 glasses of water',
      category: 'Health',
      targetFrequency: 7
    }];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    const initialCompletions: HabitCompletion[] = [{
      id: '1',
      habitId: '1',
      date: today.toISOString().split('T')[0]
    }, {
      id: '2',
      habitId: '2',
      date: today.toISOString().split('T')[0]
    }, {
      id: '3',
      habitId: '1',
      date: yesterday.toISOString().split('T')[0]
    }, {
      id: '4',
      habitId: '3',
      date: yesterday.toISOString().split('T')[0]
    }, {
      id: '5',
      habitId: '1',
      date: twoDaysAgo.toISOString().split('T')[0]
    }, {
      id: '6',
      habitId: '4',
      date: twoDaysAgo.toISOString().split('T')[0]
    }];
    setHabits(initialHabits);
    setCompletions(initialCompletions);
  }, []);
  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Math.random().toString(36).substr(2, 9)
    };
    setHabits([...habits, newHabit]);
  };
  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
    setCompletions(completions.filter(completion => completion.habitId !== id));
  };
  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
  };
  const toggleCompletion = (habitId: string, date: string) => {
    const existingCompletion = completions.find(c => c.habitId === habitId && c.date === date);
    if (existingCompletion) {
      // Remove completion if it exists
      setCompletions(completions.filter(c => c.id !== existingCompletion.id));
    } else {
      // Add new completion
      const newCompletion: HabitCompletion = {
        id: Math.random().toString(36).substr(2, 9),
        habitId,
        date
      };
      setCompletions([...completions, newCompletion]);
    }
  };
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>;
  }
  if (!user) {
    return <Auth />;
  }
  return <div className="flex flex-col min-h-screen bg-gray-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 container mx-auto px-4 py-8">
        {activeTab === 'habits' ? <HabitTracker habits={habits} completions={completions} onAddHabit={addHabit} onDeleteHabit={deleteHabit} onUpdateHabit={updateHabit} onToggleCompletion={toggleCompletion} /> : <Dashboard habits={habits} completions={completions} />}
      </main>
    </div>;
};
export function App() {
  return <AuthProvider>
      <AppContent />
    </AuthProvider>;
}