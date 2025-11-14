import React, { useState, useEffect } from 'react';
import { BookOpen, CheckCircle, Clock, Award, TrendingUp } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  totalLessons: number;
  completedLessons: number;
  category: string;
  thumbnailUrl?: string;
  estimatedTime?: number; // in minutes
}

interface CourseProgressTrackerProps {
  courses: Course[];
  onCourseClick?: (courseId: string) => void;
}

const CourseProgressTracker: React.FC<CourseProgressTrackerProps> = ({
  courses,
  onCourseClick
}) => {
  const [sortBy, setSortBy] = useState<'progress' | 'recent'>('progress');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Calculate overall statistics
  const calculateStats = () => {
    const totalCourses = courses.length;
    const completedCourses = courses.filter(c => c.completedLessons === c.totalLessons).length;
    const inProgressCourses = courses.filter(c => c.completedLessons > 0 && c.completedLessons < c.totalLessons).length;
    const totalLessons = courses.reduce((sum, c) => sum + c.totalLessons, 0);
    const completedLessons = courses.reduce((sum, c) => sum + c.completedLessons, 0);
    const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      totalCourses,
      completedCourses,
      inProgressCourses,
      overallProgress
    };
  };

  const stats = calculateStats();

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))];

  // Filter and sort courses
  const getFilteredCourses = () => {
    let filtered = filterCategory === 'all' 
      ? courses 
      : courses.filter(c => c.category === filterCategory);

    if (sortBy === 'progress') {
      return filtered.sort((a, b) => {
        const progressA = (a.completedLessons / a.totalLessons) * 100;
        const progressB = (b.completedLessons / b.totalLessons) * 100;
        return progressB - progressA;
      });
    }
    
    return filtered;
  };

  const filteredCourses = getFilteredCourses();

  const getProgressPercentage = (course: Course) => {
    return Math.round((course.completedLessons / course.totalLessons) * 100);
  };

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage > 0) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          My Learning Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your courses and continue your learning journey
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={BookOpen}
          label="Total Courses"
          value={stats.totalCourses}
          color="blue"
        />
        <StatCard
          icon={TrendingUp}
          label="In Progress"
          value={stats.inProgressCourses}
          color="orange"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={stats.completedCourses}
          color="green"
        />
        <StatCard
          icon={Award}
          label="Overall Progress"
          value={`${stats.overallProgress}%`}
          color="purple"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="flex gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort by:
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'progress' | 'recent')}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="progress">Progress</option>
            <option value="recent">Recent</option>
          </select>
        </div>

        <div className="flex gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category:
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <BookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 dark:text-gray-400">
              No courses found. Start learning today!
            </p>
          </div>
        ) : (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseClick?.(course.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard: React.FC<{
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: 'blue' | 'orange' | 'green' | 'purple';
}> = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

// Course Card Component
const CourseCard: React.FC<{
  course: Course;
  onClick: () => void;
}> = ({ course, onClick }) => {
  const progress = Math.round((course.completedLessons / course.totalLessons) * 100);
  const isCompleted = progress === 100;

  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 50) return 'bg-blue-500';
    if (percentage > 0) return 'bg-orange-500';
    return 'bg-gray-300';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-10 h-10 text-white" />
        </div>

        {/* Course Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {course.title}
              </h3>
              <span className="inline-block px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded">
                {course.category}
              </span>
            </div>
            {isCompleted && (
              <Award className="w-6 h-6 text-green-500 flex-shrink-0 ml-2" />
            )}
          </div>

          {/* Progress Bar */}
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">
                {course.completedLessons} of {course.totalLessons} lessons
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${getProgressColor(progress)}`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Additional Info */}
          {course.estimatedTime && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{course.estimatedTime} minutes remaining</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgressTracker;