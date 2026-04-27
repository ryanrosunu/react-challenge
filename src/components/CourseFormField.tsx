import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { CourseEditSchema } from '../types/courseEdit';

interface CourseFormFieldProps {
	name: keyof CourseEditSchema;
	label: string;
	errors: FieldErrors<CourseEditSchema>;
	register: UseFormRegister<CourseEditSchema>;
	placeholder?: string;
}

const CourseFormField = ({
	name,
	label,
	errors,
	register,
	placeholder,
}: CourseFormFieldProps) => {
	const errorMessage = errors[name]?.message;

	return (
		<div className="mb-4">
			<label className="block mb-1 font-semibold" htmlFor={name}>
				{label}
			</label>
			<input
				id={name}
				type="text"
				className="w-full border rounded px-3 py-2"
				placeholder={placeholder}
				{...register(name)}
			/>
			{errorMessage && <p className="mt-1 text-sm text-red-600">{errorMessage}</p>}
		</div>
	);
};

export default CourseFormField;
