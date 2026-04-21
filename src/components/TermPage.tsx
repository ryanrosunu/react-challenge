import TermSelector from './TermSelector';
import CourseSelector from './CourseSelector';
import { useState } from 'react';
import { type Course } from '../types/Course';
import { getConflictingCourses } from '../utilities/conflicts';

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
    
    const handleTermSelect = (term: string) => {
        setSelected(term);
        setSelectedClasses([]);
    };
    
    const updatedCourses = Object.fromEntries(Object.entries(courses).map(([id, course]) => [id, { ...course, conflicts: [] }]));
    const filteredCourses = Object.fromEntries(Object.entries(updatedCourses).filter(([_, course]) => course.term === selected));
    const selectedIds = selectedClasses.map(s => s.id);
    const conflicts = getConflictingCourses(filteredCourses, selectedIds);
    const coursesWithConflicts = Object.fromEntries(Object.entries(filteredCourses).map(([id, course]) => [id, { ...course, conflicts: conflicts[id] || [] }]));

    return (
        <>
            <TermSelector
                selected={selected}
                setSelected={handleTermSelect}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedClasses={selectedClasses}
            />
            <CourseSelector
                courses={coursesWithConflicts}
                selectedClasses={selectedClasses}
                setSelectedClasses={setSelectedClasses}
            />
        </>
    );
};

export default TermPage;