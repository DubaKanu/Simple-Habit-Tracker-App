export interface Habit {
  id: string;
  name: string;
  category: string;
  targetFrequency: number;
}
export interface HabitCompletion {
  id: string;
  habitId: string;
  date: string;
}
export type CategoryColors = {
  [key: string]: string;
};
export const getCategoryColor = (category: string): string => {
  const colors: CategoryColors = {
    Wellness: 'bg-blue-500',
    Learning: 'bg-purple-500',
    Fitness: 'bg-green-500',
    Health: 'bg-teal-500',
    Work: 'bg-indigo-500',
    Social: 'bg-pink-500',
    Personal: 'bg-orange-500',
    Finance: 'bg-yellow-500'
  };
  return colors[category] || 'bg-gray-500';
};
export const getCategoryTextColor = (category: string): string => {
  const colors: CategoryColors = {
    Wellness: 'text-blue-500',
    Learning: 'text-purple-500',
    Fitness: 'text-green-500',
    Health: 'text-teal-500',
    Work: 'text-indigo-500',
    Social: 'text-pink-500',
    Personal: 'text-orange-500',
    Finance: 'text-yellow-500'
  };
  return colors[category] || 'text-gray-500';
};