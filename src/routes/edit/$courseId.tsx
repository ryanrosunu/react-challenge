import { createFileRoute } from '@tanstack/react-router'
import CourseForm from '../../components/CourseForm'
import { useCourses } from '../../context/CoursesContext'

function EditCourseRoute() {
  const { courseId } = Route.useParams()
  const { courses } = useCourses()

  const course = courses[courseId]

  if (!course) return <h1>Course not found</h1>

  return <CourseForm course={course} />
}

export const Route = createFileRoute('/edit/$courseId')({
  component: EditCourseRoute,
})