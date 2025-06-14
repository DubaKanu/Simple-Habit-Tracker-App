import React from 'react';
import { Habit, HabitCompletion, getCategoryColor, getCategoryTextColor } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { TrophyIcon, CalendarIcon, FlameIcon } from 'lucide-react';
interface DashboardProps {
  habits: Habit[];
  completions: HabitCompletion[];
}
export const Dashboard: React.FC<DashboardProps> = ({
  habits,
  completions
}) => {
  // Get dates for the last 7 days
  const getLast7Days = () => {
    const dates = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };
  const last7Days = getLast7Days();
  // Calculate completion data for the chart
  const completionData = last7Days.map(date => {
    const dayCompletions = completions.filter(c => c.date === date);
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      }),
      completed: dayCompletions.length,
      total: habits.length
    };
  });
  // Calculate category stats
  const categoryStats = habits.reduce((acc, habit) => {
    if (!acc[habit.category]) {
      acc[habit.category] = {
        category: habit.category,
        habitCount: 0,
        completionCount: 0,
        targetCount: 0,
        color: getCategoryColor(habit.category).replace('bg-', '')
      };
    }
    acc[habit.category].habitCount += 1;
    acc[habit.category].targetCount += habit.targetFrequency;
    // Count completions for this habit in the last 7 days
    const habitCompletions = completions.filter(c => c.habitId === habit.id && last7Days.includes(c.date));
    acc[habit.category].completionCount += habitCompletions.length;
    return acc;
  }, {} as Record<string, {
    category: string;
    habitCount: number;
    completionCount: number;
    targetCount: number;
    color: string;
  }>);
  const categoryData = Object.values(categoryStats);
  // Calculate streaks
  const calculateStreaks = () => {
    // Group completions by habit
    const habitCompletions: Record<string, string[]> = {};
    habits.forEach(habit => {
      habitCompletions[habit.id] = completions.filter(c => c.habitId === habit.id).map(c => c.date).sort();
    });
    // Calculate current streak for each habit
    const streaks = habits.map(habit => {
      const dates = habitCompletions[habit.id] || [];
      let currentStreak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      // Check if today is completed
      const todayStr = today.toISOString().split('T')[0];
      const hasTodayCompleted = dates.includes(todayStr);
      // Count days backward from today/yesterday
      let checkDate = hasTodayCompleted ? today : new Date(today);
      if (!hasTodayCompleted) {
        checkDate.setDate(checkDate.getDate() - 1);
      }
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        if (dates.includes(dateStr)) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
      return {
        habitId: habit.id,
        name: habit.name,
        category: habit.category,
        currentStreak
      };
    });
    return streaks;
  };
  const streaks = calculateStreaks();
  const topStreak = [...streaks].sort((a, b) => b.currentStreak - a.currentStreak)[0];
  // Calculate weekly progress
  const weeklyProgress = habits.map(habit => {
    const habitCompletions = completions.filter(c => c.habitId === habit.id && last7Days.includes(c.date));
    return {
      habitId: habit.id,
      name: habit.name,
      category: habit.category,
      completed: habitCompletions.length,
      target: habit.targetFrequency,
      progress: habit.targetFrequency > 0 ? Math.min(100, habitCompletions.length / habit.targetFrequency * 100) : 0
    };
  });
  // Calculate overall completion rate
  const totalCompletions = completions.filter(c => last7Days.includes(c.date)).length;
  const totalPossibleCompletions = habits.length * 7;
  const overallCompletionRate = totalPossibleCompletions > 0 ? Math.round(totalCompletions / totalPossibleCompletions * 100) : 0;
  const getMotivationalQuote = () => {
    const quotes = ['Habits are the compound interest of self-improvement.', 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.', 'Small daily improvements over time lead to stunning results.', 'The only way to build a habit is to show up every day.', 'Success is the product of daily habits—not once-in-a-lifetime transformations.'];
    return quotes[Math.floor(Math.random() * quotes.length)];
  };
  return <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Your Dashboard</h2>
        <div className="text-sm text-gray-500">Last 7 days</div>
      </div>
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-6 rounded-lg shadow-sm">
        <p className="text-blue-700 italic text-lg">
          "{getMotivationalQuote()}"
        </p>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Overall Completion */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Overall Completion
            </h3>
            <div className="bg-blue-50 p-2 rounded-lg">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-gray-900">
              {overallCompletionRate}%
            </div>
            <p className="text-sm text-gray-500 mt-1">Last 7 days</p>
          </div>
          <div className="mt-6 w-full bg-gray-100 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" style={{
            width: `${overallCompletionRate}%`
          }}></div>
          </div>
        </div>
        {/* Top Streak */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Top Streak</h3>
            <div className="bg-orange-50 p-2 rounded-lg">
              <FlameIcon className="h-5 w-5 text-orange-500" />
            </div>
          </div>
          {topStreak ? <div className="mt-4">
              <div className="text-4xl font-bold text-gray-900">
                {topStreak.currentStreak}
                <span className="text-lg font-medium text-gray-500 ml-1">
                  days
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{topStreak.name}</p>
            </div> : <div className="mt-4">
              <div className="text-4xl font-bold text-gray-900">
                0
                <span className="text-lg font-medium text-gray-500 ml-1">
                  days
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">No streaks yet</p>
            </div>}
        </div>
        {/* Weekly Target */}
        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Weekly Target</h3>
            <div className="bg-yellow-50 p-2 rounded-lg">
              <TrophyIcon className="h-5 w-5 text-yellow-500" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-4xl font-bold text-gray-900">
              {totalCompletions}
              <span className="text-lg font-medium text-gray-500">
                /{habits.reduce((sum, habit) => sum + habit.targetFrequency, 0)}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Habits completed this week
            </p>
          </div>
        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Daily Completion Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Daily Completions
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={completionData}>
                <XAxis dataKey="date" tick={{
                fontSize: 12
              }} tickFormatter={value => value.split(' ')[0]} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Category Breakdown */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Category Breakdown
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="completionCount" nameKey="category">
                  {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Weekly Progress */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Weekly Progress</h3>
        </div>
        <ul className="divide-y divide-gray-200">
          {weeklyProgress.map(item => <li key={item.habitId} className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`h-3 w-3 rounded-full mr-3 ${getCategoryColor(item.category)}`}></div>
                  <span className="text-sm font-medium text-gray-900">
                    {item.name}
                  </span>
                </div>
                <span className={`text-sm font-medium ${getCategoryTextColor(item.category)}`}>
                  {item.completed} / {item.target}
                </span>
              </div>
              <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className={`${getCategoryColor(item.category)} transition-all duration-500`} style={{
              width: `${item.progress}%`,
              height: '0.375rem'
            }}></div>
              </div>
            </li>)}
        </ul>
      </div>
    </div>;
};