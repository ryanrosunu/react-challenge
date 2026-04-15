import CourseCard from './CourseCard';
import { type Course } from '../types/Course';
import type { Dispatch, SetStateAction } from 'react';
import type { SelectedClass } from './TermPage';

interface CourseSelectorProps {
  courses: Record<string, Course>;
  selectedClasses: SelectedClass[];
  setSelectedClasses: Dispatch<SetStateAction<SelectedClass[]>>;
}

const CourseSelector = ({courses, selectedClasses, setSelectedClasses}: CourseSelectorProps) => {

  const toggleSchedule = (id: string, course: Course) => {
    setSelectedClasses(current => (
      current.some(selectedClass => selectedClass.id === id)
        ? current.filter(selectedClass => selectedClass.id !== id)
        : [...current, { id, course }]
    ));
  };

  return (
    <div className="container mx-auto px-4 w-svw">
      <h2 className="text-xl text-white px-4">Selected classes</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 px-4 text-lg text-white">
        { 
          Object.entries(courses).map(([id, course]) => (
            <CourseCard
              key={id}
              id={id}
              course={course}
              selected={selectedClasses.some(selectedClass => selectedClass.id === id)}
              onClick={() => toggleSchedule(id, course)}
            />
          ))
        }
      </div>
    </div>
  )
};

export default CourseSelector;