import { useNavigate } from '@tanstack/react-router';
import { useForm, type SubmitErrorHandler, type SubmitHandler } from 'react-hook-form';
import CourseFormField from './CourseFormField';
import type { Course } from '../types/Course';
import { courseEditResolver, type CourseEditSchema } from '../types/courseEdit';
import { ref, update } from 'firebase/database';
import { database } from '../utilities/firebase';

interface CourseFormProps {
	course: Course;
	courseId: string;
}

const CourseForm = ({ course, courseId }: CourseFormProps) => {
	const navigate = useNavigate();

		const {
			register,
			handleSubmit,
			watch,
			formState: { errors, isSubmitting, isDirty},
	} = useForm<CourseEditSchema>({
		defaultValues: {
			title: course?.title ?? '',
			term: course?.term ?? 'Fall',
			number: course?.number ?? '',
			meets: course?.meets ?? '',
		},
		mode: 'onChange',
		resolver: courseEditResolver,
	});

	void watch();

	const handleCancel = () => {
		navigate({ to: '/' });
	};

	// const onSubmit: SubmitHandler<CourseEditSchema> = async (data) => {
	// 	update(ref(database, `courses${}`), {
	// 		title: data.title,
	// 		term: data.term,
	// 		number: data.number,
	// 		meets: data.meets
	// 	});
	// };


	const onSubmit: SubmitHandler<CourseEditSchema> = async (data) => {
		if (!isDirty) {
			alert('No changes were made.');
			console.log("wow")
			return;
		}

		try {
			await update(ref(database, `courses/${courseId}`), {
				title: data.title,
				term: data.term,
				number: data.number,
				meets: data.meets,
			});

			alert('Course saved successfully!');
			navigate({ to: '/' });
		} catch (error) {
			console.error('Error saving course:', error);
			alert('There was an error saving the course.');
		}
	};

	const onError: SubmitErrorHandler<CourseEditSchema> = () => {
		alert('Please fix the form errors before submitting.');
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit, onError)}
			className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow"
		>
			<h2 className="text-2xl font-bold mb-4">Edit Course</h2>

			<CourseFormField
				name="title"
				label="Title"
				errors={errors}
				register={register}
			/>

			<CourseFormField
				name="term"
				label="Term"
				errors={errors}
				register={register}
			/>

			<CourseFormField
				name="number"
				label="Course Number"
				errors={errors}
				register={register}
			/>

			<CourseFormField
				name="meets"
				label="Meeting Times"
				errors={errors}
				register={register}
				placeholder="MWF 12:00-13:20"
			/>

			<div className="flex gap-2">
				<button
					type="button"
					className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
					onClick={handleCancel}
				>
					Cancel
				</button>

				<button
					type="submit"
					className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
					disabled={isSubmitting}
				>
					Save
				</button>
			</div>
		</form>
	);
};

export default CourseForm;
