import React, { useState } from 'react';
import { Habit, HabitCompletion } from '../types';
import { HabitList } from './HabitList';
import { AddHabitForm } from './AddHabitForm';
import { PlusIcon } from 'lucide-react';
interface HabitTrackerProps {
  habits: Habit[];
  completions: HabitCompletion[];
  onAddHabit: (habit: Omit<Habit, 'id'>) => void;
  onDeleteHabit: (id: string) => void;
  onUpdateHabit: (habit: Habit) => void;
  onToggleCompletion: (habitId: string, date: string) => void;
}
export const HabitTracker: React.FC<HabitTrackerProps> = ({
  habits,
  completions,
  onAddHabit,
  onDeleteHabit,
  onUpdateHabit,
  onToggleCompletion
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Habits</h2>
        <button onClick={() => setShowAddForm(!showAddForm)} className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${showAddForm ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {showAddForm ? 'Cancel' : 'Add Habit'}
        </button>
      </div>
      {showAddForm && <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <AddHabitForm onAddHabit={habit => {
        onAddHabit(habit);
        setShowAddForm(false);
      }} />
        </div>}
      <HabitList habits={habits} completions={completions} onDeleteHabit={onDeleteHabit} onUpdateHabit={onUpdateHabit} onToggleCompletion={onToggleCompletion} />
    </div>;
};