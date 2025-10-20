# Course Progress Tracker

A React/TypeScript component for Skill-Bridge that helps learners track their course progress, view statistics, and manage their learning journey.

## 📋 Description

The `CourseProgressTracker` component provides a comprehensive dashboard for learners to monitor their progress across multiple courses. It displays overall statistics, individual course progress, and allows filtering and sorting for better organization.

## ✨ Features

- 📊 **Overall Statistics**: View total courses, in-progress, completed, and overall progress
- 📈 **Progress Visualization**: Color-coded progress bars for each course
- 🏆 **Completion Badges**: Award icons for completed courses
- 🔍 **Filtering**: Filter courses by category
- 📋 **Sorting**: Sort by progress or recent activity
- 🎨 **Dark Mode Support**: Seamless light/dark theme integration
- 📱 **Responsive Design**: Works on all screen sizes
- ⏱️ **Time Tracking**: Shows estimated time remaining

## 🚀 Usage

### Basic Implementation

```tsx
import CourseProgressTracker from '@/components/CourseProgressTracker';

function Dashboard() {
  const courses = [
    {
      id: '1',
      title: 'Introduction to React',
      totalLessons: 20,
      completedLessons: 15,
      category: 'Web Development',
      estimatedTime: 150
    },
    {
      id: '2',
      title: 'Python for Beginners',
      totalLessons: 30,
      completedLessons: 30,
      category: 'Programming',
      estimatedTime: 0
    }
  ];

  return (
    <CourseProgressTracker
      courses={courses}
      onCourseClick={(courseId) => {
        // Navigate to course details
        console.log('Course clicked:', courseId);
      }}
    />
  );
}
```

### With Navigation

```tsx
<CourseProgressTracker
  courses={userCourses}
  onCourseClick={(courseId) => {
    router.push(`/course/${courseId}`);
  }}
/>
```

## 📦 Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `courses` | `Course[]` | Yes | Array of course objects with progress data |
| `onCourseClick` | `(courseId: string) => void` | No | Callback when a course card is clicked |

### Course Object Structure

```typescript
interface Course {
  id: string;                // Unique course identifier
  title: string;             // Course title
  totalLessons: number;      // Total number of lessons
  completedLessons: number;  // Number of completed lessons
  category: string;          // Course category
  thumbnailUrl?: string;     // Optional thumbnail URL
  estimatedTime?: number;    // Estimated time remaining (minutes)
}
```

## 🎨 UI Components

### Statistics Cards (4 Cards)
1. **Total Courses** - Blue icon, shows total enrolled courses
2. **In Progress** - Orange icon, shows active courses
3. **Completed** - Green icon, shows finished courses
4. **Overall Progress** - Purple icon, shows percentage completion

### Filters Section
- **Sort by**: Progress or Recent
- **Category**: Filter by course category

### Course Cards
Each card displays:
- Course thumbnail/icon
- Course title
- Category badge
- Progress bar with percentage
- Completed/Total lessons count
- Estimated time remaining
- Completion award (for finished courses)

## 📸 Visual Layout

```
┌─────────────────────────────────────────────┐
│ My Learning Progress                        │
│ Track your courses and continue learning    │
├─────────────────────────────────────────────┤
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│ │📚 10 │ │📈 5  │ │✅ 3  │ │🏆75%│        │
│ │Total │ │Prog. │ │Done  │ │Prog.│        │
│ └──────┘ └──────┘ └──────┘ └──────┘        │
├─────────────────────────────────────────────┤
│ Sort: [Progress ▼] Category: [All ▼]       │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ 📚 Introduction to React                │ │
│ │ [Web Development]              🏆       │ │
│ │ 15 of 20 lessons               75%     │ │
│ │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░░            │ │
│ │ ⏱️ 150 minutes remaining                │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

## 🎯 Features Breakdown

### Progress Calculation
- Automatically calculates percentage: `(completedLessons / totalLessons) * 100`
- Color-coded progress bars:
  - Green: 100% (Completed)
  - Blue: 50-99% (Good progress)
  - Orange: 1-49% (Getting started)
  - Gray: 0% (Not started)

### Statistics Calculation
- **Total Courses**: Count of all courses
- **In Progress**: Courses with 0 < progress < 100%
- **Completed**: Courses with 100% progress
- **Overall Progress**: Total completed lessons / Total lessons

### Filtering & Sorting
- **Category Filter**: Shows only courses from selected category
- **Progress Sort**: Orders by completion percentage (high to low)
- **Recent Sort**: Shows most recently accessed courses first

## 🎨 Styling

### Color Scheme
- **Blue**: `bg-blue-500` - Primary progress color
- **Orange**: `bg-orange-500` - In-progress indicator
- **Green**: `bg-green-500` - Completion color
- **Purple**: `bg-purple-500` - Overall stats

### Dark Mode
- Automatic theme detection
- Dark backgrounds: `dark:bg-gray-800`
- Dark text: `dark:text-white`
- Dark borders: `dark:border-gray-700`

## 🔧 Technical Details

### Dependencies
- React
- TypeScript
- Tailwind CSS
- Lucide React icons (BookOpen, CheckCircle, Clock, Award, TrendingUp)

### State Management
- Local state for sorting and filtering
- Props-based course data
- Calculated statistics (no persistent state)

### Performance
- Efficient filtering and sorting
- Minimal re-renders
- Optimized calculations

## 📱 Integration Example

```tsx
// In your dashboard or home page
import { useState, useEffect } from 'react';
import CourseProgressTracker from '@/components/CourseProgressTracker';

export default function DashboardPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch user's enrolled courses
    fetchUserCourses().then(setCourses);
  }, []);

  const handleCourseClick = (courseId) => {
    // Navigate to course player
    window.location.href = `/course/${courseId}`;
  };

  return (
    <div className="container mx-auto">
      <CourseProgressTracker
        courses={courses}
        onCourseClick={handleCourseClick}
      />
    </div>
  );
}
```

## 💡 Use Cases

- **Student Dashboard**: Main learning progress overview
- **Profile Page**: Show user's learning achievements
- **Progress Reports**: Generate progress summaries
- **Motivation Tool**: Visual progress encourages completion
- **Course Management**: Easily resume in-progress courses

## 🔄 Future Enhancements

Potential additions:
- Time-based analytics (weekly/monthly progress)
- Streak tracking
- Learning goals and targets
- Export progress report (PDF)
- Social sharing of achievements
- Course recommendations based on progress
- Gamification badges
- Progress comparison with peers

## 👨‍💻 Author

**Ashvin**
- GitHub: [@ashvin2005](https://github.com/ashvin2005)
- LinkedIn: [ashvin-tiwari](https://linkedin.com/in/ashvin-tiwari)

## 🎃 Hacktoberfest 2025

Created as part of Hacktoberfest 2025 contributions to Skill-Bridge.

## 📄 License

MIT License - Same as Skill-Bridge project

---

Made with ❤️ for the Skill-Bridge community