// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { useJsonQuery } from './utilities/fetch';

const App = () => {
  const [json, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading schedule data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading schedule data...</h1>;
  if (!json) return <h1>No schedule data found</h1>;

  // Type assertion for fetched schedule
  const schedule = json as { title: string; courses: Record<string, { term: string; number: string; meets: string; title: string }> };

  return (
    <div className="bg-[#bf77f6] min-h-screen">
      <header className="flex flex-col items-center text-white">
        <Banner title={schedule.title} />
      </header>
      <CourseList courses={schedule.courses} />
    </div>
  );
}

export default App;