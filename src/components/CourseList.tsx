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
  <div className="mt-6 text-left text-lg text-white">
    {Object.entries(courses).map(([id, course]) => (
      <div key={id} className="mb-4">
        <div className="font-semibold">
          {course.term} CS {course.number}: {course.title}
        </div>
        <div>{course.meets}</div>
      </div>
    ))}
  </div>
);

export default CourseList;