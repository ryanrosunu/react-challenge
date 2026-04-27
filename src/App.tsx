import Banner from './components/Banner';
import TermPage from './components/TermPage';
import { type Course } from './types/Course';
import { useEffect } from 'react';
import { useCourses } from './context/CoursesContext';
import { useDataQuery } from './utilities/firebase';

const App = () => {
  const [json, isLoading, error] = useDataQuery('/');

  const { courses, setCourses } = useCourses();

  const catalog = json as { title: string; courses: Record<string, Course> } | null;

  useEffect(() => {
    if (catalog) {
      setCourses(catalog.courses);
    }
  }, [catalog, setCourses]);

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!catalog) return <h1>No schedule data found</h1>;

  return (
    <div className="bg-[#bf77f6] min-h-screen">
      <header className="flex flex-col items-center text-white">
        <Banner title={catalog.title} />
      </header>
      <TermPage courses={courses} />
    </div>
  );
};

export default App;