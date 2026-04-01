import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const schedule = {
  title: "CS Courses for 2018-2019"
}

const App = () => {
  return (
      <header className="bg-[#bf77f6] min-h-screen flex flex-col items-center justify-center text-[calc(10px_+_2vmin)] text-white">
        <h1 className="text-4xl font-bold">
          {schedule.title}
        </h1>
      </header>
  );
};

export default App
