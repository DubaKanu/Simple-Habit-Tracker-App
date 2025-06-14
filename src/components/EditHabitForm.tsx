import React, { useState } from 'react';
import { Habit } from '../types';
interface EditHabitFormProps {
  habit: Habit;
  onSave: (habit: Habit) => void;
  onCancel: () => void;
}
export const EditHabitForm: React.FC<EditHabitFormProps> = ({
  habit,
  onSave,
  onCancel
}) => {
  const [name, setName] = useState(habit.name);
  const [category, setCategory] = useState(habit.category);
  const [targetFrequency, setTargetFrequency] = useState(habit.targetFrequency);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({
        ...habit,
        name: name.trim(),
        category,
        targetFrequency
      });
    }
  };
  const categories = ['Wellness', 'Learning', 'Fitness', 'Health', 'Work', 'Social', 'Personal', 'Finance'];
  return <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="edit-name" className="block text-sm font-medium text-gray-700">
          Habit Name
        </label>
        <input type="text" id="edit-name" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="edit-category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select id="edit-category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            {categories.map(cat => <option key={cat} value={cat}>
                {cat}
              </option>)}
          </select>
        </div>
        <div>
          <label htmlFor="edit-frequency" className="block text-sm font-medium text-gray-700">
            Target Frequency (per week)
          </label>
          <input type="number" id="edit-frequency" min="1" max="7" value={targetFrequency} onChange={e => setTargetFrequency(parseInt(e.target.value))} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      <div className="flex space-x-3">
        <button type="submit" className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Save Changes
        </button>
        <button type="button" onClick={onCancel} className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
      </div>
    </form>;
};