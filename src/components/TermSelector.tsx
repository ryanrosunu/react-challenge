import type { Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import type { SelectedClass } from "../context/CoursesContext";

interface TermSelectorProps {
	selected: string;
	setSelected: (term: string) => void;
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
	selectedClasses: SelectedClass[];
}

const terms = ["Fall", "Winter", "Spring", "Summer"];

const PlanModal = ({ selectedClasses }: { selectedClasses: SelectedClass[] }) => (
  <div className="text-gray-900">
    <h2 className="mb-4 text-xl font-semibold">Course Plan</h2>

    {selectedClasses.length === 0 ? (
      <div className="space-y-2">
        <p>No courses selected yet.</p>
        <p className="text-sm text-gray-600">
          Select courses by clicking the course cards on the page. Your chosen classes
          will appear here with their numbers, titles, and meeting times.
        </p>
      </div>
    ) : (
      <ul className="max-h-64 space-y-3 overflow-auto rounded border border-gray-300 p-3">
        {selectedClasses.map(({ id, course }) => (
          <li key={`schedule-${id}`} className="border-b border-gray-200 pb-2 last:border-b-0 last:pb-0">
            <div className="font-medium">
              {course.term} CS {course.number}: {course.title}
            </div>
            <div className="text-sm text-gray-600">{course.meets}</div>
          </li>
        ))}
      </ul>
    )}
  </div>
);


const TermSelector = ({ selected, setSelected, modalOpen, setModalOpen, selectedClasses }: TermSelectorProps) => (
	<div className="flex justify-center gap-2 my-4">
		{terms.map(term => (
			<button
				key={term}
				className={`px-4 py-2 rounded ${selected === term ? "bg-purple-700 text-white" : "bg-white text-purple-700 border border-purple-700"}`}
				onClick={() => setSelected(term)}
			>
				{term}
			</button>
		))}
		<button 
			className={`px-4 py-2 rounded bg-purple-700 text-white`}
			onClick={() => setModalOpen(true)}
		>
			Course Plan
		</button>

		<Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
			<PlanModal selectedClasses={selectedClasses}/>
		</Modal>
    </div>
);

export default TermSelector;
