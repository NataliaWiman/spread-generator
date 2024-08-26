"use client";

import { useCallback, useState } from "react";
import Spread from "./Spread";
import Toolbar from "./Toolbar";
import { CardProps } from "@/types";
import QuestionsList from "./QuestionsList";
import Image from "next/image";

const SpreadEditor = () => {
  const [spreadTitle, setSpreadTitle] = useState("");
  const [cards, setCards] = useState<CardProps[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [imageId, setImageId] = useState("");
  const [hideUi, setHideUi] = useState(false);

  const handleActiveCard = (id: number) => {
    setActiveCard(id);
  };

  const handleAddCard = (
    index: number,
    label: string,
    question: string,
    onEdit: () => void
  ) => {
    const newCard = { id: Date.now(), index, label, question, onEdit };
    setCards([...cards, newCard]);
  };

  const handleEditQuestion = (id: number, newQuestion: string) => {
    setCards(
      cards.map((card) =>
        card.id === id ? { ...card, question: newQuestion } : card
      )
    );
  };

  const handleRemoveCard = (id: number) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  const fetchNewImageId = useCallback(async () => {
    const response = await fetch("/images/images.json");
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.images.length);
    setImageId(data.images[randomIndex]);
  }, []);

  return (
    <div className="flex rounded-3xl shadow-xl bg-white max-h-[90vh] overflow-hidden resize-y">
      <div
        onClick={() => setHideUi(!hideUi)}
        className="fixed top-2 right-1 py-2 px-4 rounded-xl bg-slate-900 flex gap-2 text-sm text-white opacity-10 hover:opacity-100 transition-all cursor-pointer"
      >
        <span>UI</span>
        {hideUi ? (
          <Image
            width="18"
            height="18"
            src="images/eye-open.svg"
            alt="hide ui"
          />
        ) : (
          <Image
            width="18"
            height="18"
            src="images/eye-close.svg"
            alt="hide ui"
          />
        )}
      </div>
      <div className="relative w-[50vw] min-h-[85vh]">
        <div className="flex justify-center items-center w-full h-full resize-y overflow-auto">
          <Spread
            cards={cards}
            activeCard={activeCard}
            handleActiveCard={handleActiveCard}
            fetchNewImageId={fetchNewImageId}
            hideUi={hideUi}
          />
          <div className="spread-table" />
          <div className="absolute top-0 left-0 w-full h-full bg-black">
            <Image
              src={
                imageId
                  ? `https://picsum.photos/id/${imageId}/1200`
                  : "https://picsum.photos/1200"
              }
              alt="background"
              width="1200"
              height="1200"
              className="absolute top-0 left-0 opacity-60 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="w-[30vw]">
        <div className="flex flex-col gap-4 py-6 px-4 h-full">
          <input
            type="text"
            onChange={(e) => setSpreadTitle(e.target.value)}
            className="p-2 mx-4 font-title font-bold italic text-center text-2xl text-stone-600 rounded-xl ring-2 ring-white  hover:ring-slate-300 hover:bg-slate-100 focus:outline-none focus:bg-white focus:ring-4 focus:ring-slate-300 transition-all cursor-pointer focus:cursor-text"
            value={spreadTitle}
            placeholder="Spread title"
          />
          <QuestionsList
            activeCard={activeCard}
            cards={cards}
            onEditQuestion={handleEditQuestion}
            onRemoveCard={handleRemoveCard}
          />
          <Toolbar onAddCard={handleAddCard} hideUi={hideUi} />
        </div>
      </div>
    </div>
  );
};

export default SpreadEditor;
