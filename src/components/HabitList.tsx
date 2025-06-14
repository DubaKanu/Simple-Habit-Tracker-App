import React, { useState, Fragment } from 'react';
import { Habit, HabitCompletion, getCategoryColor } from '../types';
import { HabitItem } from './HabitItem';
import { EditHabitForm } from './EditHabitForm';
import { CheckSquareIcon } from 'lucide-react';
interface HabitListProps {
  habits: Habit[];
  completions: HabitCompletion[];
  onDeleteHabit: (id: string) => void;
  onUpdateHabit: (habit: Habit) => void;
  onToggleCompletion: (habitId: string, date: string) => void;
}
export const HabitList: React.FC<HabitListProps> = ({
  habits,
  completions,
  onDeleteHabit,
  onUpdateHabit,
  onToggleCompletion
}) => {
  const [editingHabitId, setEditingHabitId] = useState<string | null>(null);
  // Get dates for the current week (last 7 days)
  const getDatesForWeek = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date);
    }
    return dates;
  };
  const weekDates = getDatesForWeek();
  const isHabitCompleted = (habitId: string, date: string) => {
    return completions.some(completion => completion.habitId === habitId && completion.date === date);
  };
  if (habits.length === 0) {
    return <div className="bg-white p-12 rounded-lg shadow-sm text-center">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckSquareIcon className="h-8 w-8 text-blue-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No habits yet
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          Start building better habits today. Click "Add Habit" to begin your
          journey.
        </p>
      </div>;
  }
  return <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                Habit
              </th>
              {weekDates.map(date => <th key={date.toISOString()} scope="col" className="px-2 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div>
                    {date.toLocaleDateString('en-US', {
                  weekday: 'short'
                })}
                  </div>
                  <div>{date.getDate()}</div>
                </th>)}
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {habits.map(habit => <Fragment key={habit.id}>
                {editingHabitId === habit.id ? <tr className="bg-blue-50/50">
                    <td colSpan={9} className="px-6 py-4">
                      <EditHabitForm habit={habit} onSave={updatedHabit => {
                  onUpdateHabit(updatedHabit);
                  setEditingHabitId(null);
                }} onCancel={() => setEditingHabitId(null)} />
                    </td>
                  </tr> : <HabitItem habit={habit} weekDates={weekDates} isCompleted={date => isHabitCompleted(habit.id, date.toISOString().split('T')[0])} onToggle={date => onToggleCompletion(habit.id, date.toISOString().split('T')[0])} onEdit={() => setEditingHabitId(habit.id)} onDelete={() => onDeleteHabit(habit.id)} />}
              </Fragment>)}
          </tbody>
        </table>
      </div>
    </div>;
};