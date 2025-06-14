import React from 'react';
import { Habit, getCategoryColor } from '../types';
import { CheckIcon, PencilIcon, TrashIcon } from 'lucide-react';
interface HabitItemProps {
  habit: Habit;
  weekDates: Date[];
  isCompleted: (date: Date) => boolean;
  onToggle: (date: Date) => void;
  onEdit: () => void;
  onDelete: () => void;
}
export const HabitItem: React.FC<HabitItemProps> = ({
  habit,
  weekDates,
  isCompleted,
  onToggle,
  onEdit,
  onDelete
}) => {
  return <tr className="group hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-3 w-3 rounded-full mr-3 transition-transform group-hover:scale-110" style={{
          backgroundColor: getCategoryColor(habit.category).replace('bg-', '')
        }}></div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {habit.name}
            </div>
            <div className="text-xs text-gray-500">
              {habit.category} • {habit.targetFrequency}x per week
            </div>
          </div>
        </div>
      </td>
      {weekDates.map(date => {
      const completed = isCompleted(date);
      const isToday = new Date().toDateString() === date.toDateString();
      const isPast = date < new Date(new Date().setHours(0, 0, 0, 0));
      return <td key={date.toISOString()} className="px-2 py-4 whitespace-nowrap text-center">
            <button onClick={() => onToggle(date)} disabled={!isPast && !isToday} className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 ${completed ? `${getCategoryColor(habit.category)} text-white shadow-sm` : isPast || isToday ? 'bg-gray-100 hover:bg-gray-200 text-gray-400' : 'bg-gray-50 text-gray-300 cursor-not-allowed opacity-50'}`}>
              {completed && <CheckIcon className="w-5 h-5" />}
            </button>
          </td>;
    })}
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
            <PencilIcon className="w-4 h-4" />
          </button>
          <button onClick={onDelete} className="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>;
};