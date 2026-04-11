import TermSelector from './TermSelector';
import CourseSelector from './CourseSelector';
import { useState } from 'react';
import { type Course } from '../types/Course';

interface TermPageProps {
  courses: Record<string, Course>;
}

const TermPage = ({ courses }: TermPageProps) => {
    const [selected, setSelected] = useState('Fall');
    const filteredCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === selected));

    return (
        <>
            <TermSelector selected={selected} setSelected={setSelected}/>
            <CourseSelector courses={filteredCourses} />
        </>
    );
};

export default TermPage;