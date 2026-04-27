import TermSelector from './TermSelector';
import CourseSelector from './CourseSelector';
import { useState } from 'react';
import { type Course } from '../types/Course';
import { getConflictingCourses } from '../utilities/conflicts';
import { useCourses } from '../context/CoursesContext';

interface TermPageProps {
  courses: Record<string, Course>;
}

const TermPage = ({ courses }: TermPageProps) => {
    const [selected, setSelected] = useState('Fall');
    const [modalOpen, setModalOpen] = useState(false);

    // Use selectedClasses from context
    const { selectedClasses } = useCourses();

    const handleTermSelect = (term: string) => {
        setSelected(term);
        // No need to reset selected classes, just switch view
    };

    // Remove setSelectedClassesByTerm and related logic

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
            />
        </>
    );
};

export default TermPage;
