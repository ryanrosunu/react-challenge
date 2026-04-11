import { useState } from 'react';
import CourseCard from './CourseCard';
import { type Course } from '../types/Course';

interface CourseSelectorProps {
  courses: Record<string, Course>;
}

interface SelectedClass {
  id: string;
  course: Course;
}

const CourseSelector = ({courses}: CourseSelectorProps) => {
  const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);

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
      <ul className="mx-4 my-3 h-24 overflow-auto rounded border border-gray-300 bg-white/10 p-3 text-white">
        {selectedClasses.map(({ id, course }) => (
          <li key={`schedule-${id}`}>{course.term} CS {course.number}: {course.title}</li>
        ))}
      </ul>

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