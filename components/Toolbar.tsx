import { useState } from "react";
import Image from "next/image";

interface ToolbarProps {
  hideUi: boolean;
  onAddCard: (
    index: number,
    label: string,
    question: string,
    onEdit: () => void
  ) => void;
}

const Toolbar = ({ onAddCard, hideUi }: ToolbarProps) => {
  const [label, setLabel] = useState("New Card"); // Default label for a new card
  const [index, setIndex] = useState(1); // Starts from 0, increment after adding a card
  const [question, setQuestion] = useState(""); // Input for the question

  // Function to handle adding a card
  const handleAddCard = () => {
    if (question) {
      onAddCard(index, label, question, onEdit);
      setLabel("New Card"); // Reset label
      setIndex(index + 1); // Increment index for the next card
      setQuestion(""); // Reset question
    }
  };

  // Placeholder function for editing, needs actual implementation or passing from parent
  function onEdit(): void {
    console.log("Edit function needs implementation.");
  }

  return (
    <div
      className={`toolbar flex gap-2 px-4 mt-auto ${hideUi ? "hidden" : ""}`}
    >
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="Enter card label"
        className="hidden border border-gray-300 p-2 rounded"
      />
      <div className="w-full relative">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter a question"
          onKeyDown={(e) => (e.key === "Enter" ? handleAddCard() : null)}
          className="w-full py-3 px-4 pr-20 rounded-xl font-title text-md leading-6 text-slate-600 ring-2 ring-slate-300 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:bg-white focus:ring-4 focus:ring-slate-300 transition-all"
        />
        <button
          onClick={handleAddCard}
          type="button"
          className="absolute top-0 right-0 h-full flex-shrink flex justify-center items-center gap-2 text-white bg-slate-400 hover:bg-slate-500 focus:outline-none focus:bg-slate-500 font-medium rounded-e-xl text-sm px-5 py-2.5 text-center"
        >
          <Image
            width="24"
            height="24"
            src="images/send.svg"
            alt="add question"
          />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
