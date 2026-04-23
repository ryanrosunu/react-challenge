import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Course } from '../types/Course'

type CoursesMap = Record<string, Course>

interface CoursesContextValue {
  courses: CoursesMap
  setCourses: React.Dispatch<React.SetStateAction<CoursesMap>>
}

const CoursesContext = createContext<CoursesContextValue | null>(null)

export function CoursesProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<CoursesMap>({})

  return (
    <CoursesContext.Provider value={{ courses, setCourses }}>
      {children}
    </CoursesContext.Provider>
  )
}

export function useCourses() {
  const context = useContext(CoursesContext)

  if (!context) {
    throw new Error('useCourses must be used inside a CoursesProvider')
  }

  return context
}