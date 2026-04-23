
import type { Course } from '../types/Course';
import { Link } from '@tanstack/react-router';

interface CourseCardProps {
    id: string;
    course: Course;
    selected: boolean;
    isSelectable: boolean;
    onClick: () => void;
}

const CourseCard = ({ id, course, selected, isSelectable, onClick }: CourseCardProps) => (
    <button
        type="button"
        onClick={onClick}
        disabled={!isSelectable && !selected}
        aria-pressed={selected}
        className={`m-2 flex min-w-60 flex-1 overflow-hidden rounded border shadow-lg text-left transition 
            ${selected ? 'border-emerald-300 bg-emerald-800/30 ring-2 ring-emerald-300' : 'border-gray-300 bg-transparent'}
            ${course.conflicts.length > 0 && !selected ? 'opacity-50 border-red-500 bg-red-100/20' : ''}
            ${!isSelectable && !selected ? 'cursor-not-allowed' : 'cursor-pointer'}`}
    >
        <div className="m-2 w-full flex flex-col">
            <div className="mb-2 font-bold flex items-start">
                {course.term} CS {course.number}
                <Link
                    to="/edit/$courseId"
                    params={{ courseId: id }}
                    className="ml-auto px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={(e) => e.stopPropagation()}
                >
                    Edit
                </Link>
            </div>
            <div className="mb-6">
                {course.title}
            </div>
            <div className="mt-auto border-t border-gray-300 pt-2 text-xl">
                {course.meets}
            </div>
        </div>
    </button>
);

export default CourseCard;