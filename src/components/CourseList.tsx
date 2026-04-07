interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

interface CourseListProps {
  courses: Record<string, Course>;
}

const CourseList = ({ courses }: CourseListProps) => (
  <div className="mt-6 flex flex-wrap text-lg text-white">
    {Object.entries(courses).map(([id, course]) => (
      <div key={id} className="m-2 flex flex-1 min-w-[250px] rounded border border-gray-300 overflow-hidden shadow-lg">
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
      </div>
    ))}
  </div>
);

export default CourseList;