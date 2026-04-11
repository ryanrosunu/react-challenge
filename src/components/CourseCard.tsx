import type { Course } from '../types/Course';

interface CourseCardProps {
    id: string;
    course: Course;
    selected: boolean;
    onClick: () => void;
}

const CourseCard = ({ id, course, selected, onClick }: CourseCardProps) => (
    <button
        type="button"
        onClick={onClick}
        aria-pressed={selected}
        className={`m-2 flex min-w-60 flex-1 overflow-hidden rounded border shadow-lg text-left transition ${selected ? 'border-emerald-300 bg-emerald-800/30 ring-2 ring-emerald-300' : 'border-gray-300 bg-transparent'}`}
    >
        <div className="m-2 w-full flex flex-col">
            <div className="mb-2 font-bold">
                {course.term} CS {course.number}
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