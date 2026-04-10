import type { Dispatch, SetStateAction } from "react";

interface TermSelectorProps {
	selected: string;
	setSelected: Dispatch<SetStateAction<string>>;
}

const terms = ["Fall", "Winter", "Spring"];

const TermSelector = ({ selected, setSelected }: TermSelectorProps) => (
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
    </div>
);

export default TermSelector;