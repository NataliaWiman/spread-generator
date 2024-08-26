import { useState } from "react";
import Image from "next/image";
import { QuestionsListProps } from "@/types";

const QuestionsList = ({
  cards,
  onEditQuestion,
  activeCard,
  onRemoveCard,
}: QuestionsListProps) => {
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editedQuestion, setEditedQuestion] = useState("");

  const handleCancelEdit = () => {
    setEditingCardId(null);
  };

  return (
    cards.length > 0 && (
      <div className="flex flex-col gap-2 p-2 max-h-full overflow-auto">
        {cards.map((card) => (
          <div
            key={card.id}
            className={` ${
              activeCard === card.id ? "bg-slate-200" : ""
            } group flex items-center rounded-xl bg-transparent hover:bg-slate-200 transition-all cursor-pointer`}
          >
            {editingCardId === card.id ? (
              <div className="relative w-full">
                <span className="absolute top-4 left-4 font-title font-bold text-4xl leading-6 text-slate-400">
                  {card.index}
                </span>
                <input
                  type="text"
                  autoFocus
                  className="flex-1 w-full py-4 px-4 pr-20 pl-14 rounded-xl font-title text-lg leading-6 text-slate-600 outline-none ring-4 ring-slate-300"
                  value={editedQuestion}
                  onBlur={handleCancelEdit}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onEditQuestion(card.id, editedQuestion);
                      setEditingCardId(null);
                    }
                  }}
                />
              </div>
            ) : (
              <div className="group relative w-full">
                <p
                  onClick={() => {
                    setEditingCardId(card.id);
                    setEditedQuestion(card.question);
                  }}
                  className="flex w-full items-center gap-5 py-4 px-0 pr-9 text-stone-600"
                >
                  <span className="inline-block pl-4 font-title font-bold text-4xl leading-6 text-slate-400">
                    {card.index}
                  </span>
                  <span className="font-title text-xl italic leading-6">
                    {card.question}
                  </span>
                </p>
                <div className="opacity-0 group-hover:opacity-50">
                  <button
                    onClick={() => onRemoveCard(card.id)}
                    className="absolute top-0 right-0 h-full w-12 flex justify-center items-center opacity-50 hover:opacity-100 transition-all"
                  >
                    <Image
                      width="24"
                      height="24"
                      src="images/trash.svg"
                      alt="delete"
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  );
};

export default QuestionsList;
