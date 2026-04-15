import TermSelector from './TermSelector';
import CourseSelector from './CourseSelector';
import { useState } from 'react';
import { type Course } from '../types/Course';

interface TermPageProps {
  courses: Record<string, Course>;
}

export interface SelectedClass {
  id: string;
  course: Course;
}

const TermPage = ({ courses }: TermPageProps) => {
    const [selected, setSelected] = useState('Fall');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClasses, setSelectedClasses] = useState<SelectedClass[]>([]);
    const filteredCourses = Object.fromEntries(Object.entries(courses).filter(([_, course]) => course.term === selected));

    return (
        <>
            <TermSelector
                selected={selected}
                setSelected={setSelected}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedClasses={selectedClasses}
            />
            <CourseSelector
                courses={filteredCourses}
                selectedClasses={selectedClasses}
                setSelectedClasses={setSelectedClasses}
            />
        </>
    );
};

export default TermPage;