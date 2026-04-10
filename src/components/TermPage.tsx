import CourseList from './CourseList';
import TermSelector from './TermSelector';
import { useState } from 'react';

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface TermPageProps {
  courses: Record<string, Course>;
}

const TermPage = ({ courses }: TermPageProps) => {
    const [selected, setSelected] = useState('Fall');
    const filteredCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === selected));

    return (
        <>
            <TermSelector selected={selected} setSelected={setSelected}/>
            <CourseList courses={filteredCourses} />
        </>
    );
};
    

export default TermPage;