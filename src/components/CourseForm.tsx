
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { Course } from '../types/Course';

interface CourseFormProps {
	course: Course;
}

const CourseForm = ({ course }: CourseFormProps) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState(course?.title || '');
	const [meets, setMeets] = useState(course?.meets || '');

	const handleCancel = () => {
		navigate({ to: '/' });
	};

	const handleSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();
		// Do nothing for now
	};

	return (
		<form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
			<h2 className="text-2xl font-bold mb-4">Edit Course</h2>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Title</label>
				<input
					type="text"
					className="w-full border rounded px-3 py-2"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>
			</div>
			<div className="mb-4">
				<label className="block mb-1 font-semibold">Meeting Times</label>
				<input
					type="text"
					className="w-full border rounded px-3 py-2"
					value={meets}
					onChange={e => setMeets(e.target.value)}
				/>
			</div>
			<div className="flex gap-2">
				<button
					type="button"
					className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
					onClick={handleCancel}
				>
					Cancel
				</button>
			</div>
		</form>
	);
};

export default CourseForm;
