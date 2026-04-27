import CourseCard from './CourseCard';
import { type Course } from '../types/Course';
import { useCourses } from '../context/CoursesContext';

interface CourseSelectorProps {
  courses: Record<string, Course>;
}

const CourseSelector = ({ courses }: CourseSelectorProps) => {
  const { selectedClasses, setSelectedClasses } = useCourses();

  const toggleSchedule = (id: string, course: Course) => {
    const isSelected = selectedClasses.some(selectedClass => selectedClass.id === id);
    if (isSelected) {
      // Allow unselecting
      setSelectedClasses(current => current.filter(selectedClass => selectedClass.id !== id));
    } else {
      // Only select if no conflicts
      if (course.conflicts.length === 0) {
        setSelectedClasses(current => [...current, { id, course }]);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 w-svw">
      <h2 className="text-xl text-white px-4">Selected classes</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 px-4 text-lg text-white">
        { 
          Object.entries(courses).map(([id, course]) => {
            const isSelected = selectedClasses.some(selectedClass => selectedClass.id === id);
            const isSelectable = !isSelected && course.conflicts.length === 0;
            return (
              <CourseCard
                key={id}
                id={id}
                course={course}
                selected={isSelected}
                isSelectable={isSelectable}
                onClick={() => toggleSchedule(id, course)}
              />
            );
          })
        }
      </div>
    </div>
  )
};

export default CourseSelector;