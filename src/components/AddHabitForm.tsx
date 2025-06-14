import React, { useState } from 'react';
import { Habit } from '../types';
interface AddHabitFormProps {
  onAddHabit: (habit: Omit<Habit, 'id'>) => void;
}
export const AddHabitForm: React.FC<AddHabitFormProps> = ({
  onAddHabit
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Wellness');
  const [targetFrequency, setTargetFrequency] = useState(3);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddHabit({
        name: name.trim(),
        category,
        targetFrequency
      });
      // Reset form
      setName('');
      setCategory('Wellness');
      setTargetFrequency(3);
    }
  };
  const categories = ['Wellness', 'Learning', 'Fitness', 'Health', 'Work', 'Social', 'Personal', 'Finance'];
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Habit Name
        </label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., Morning Meditation" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            {categories.map(cat => <option key={cat} value={cat}>
                {cat}
              </option>)}
          </select>
        </div>
        <div>
          <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
            Target Frequency (per week)
          </label>
          <input type="number" id="frequency" min="1" max="7" value={targetFrequency} onChange={e => setTargetFrequency(parseInt(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      <div>
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Add Habit
        </button>
      </div>
    </form>;
};