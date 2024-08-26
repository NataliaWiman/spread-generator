"use client";

import { motion, Reorder, useDragControls } from "framer-motion";
import Card from "./Card";
import { CardProps } from "@/types";
import { useRef, useState } from "react";
import Image from "next/image";

interface SpreadProps {
  cards: CardProps[];
  activeCard: number | null;
  hideUi: boolean;
  handleActiveCard: (id: number) => void;
  fetchNewImageId: () => void;
}

const Spread = ({
  cards,
  activeCard,
  handleActiveCard,
  fetchNewImageId,
  hideUi,
}: SpreadProps) => {
  const [openDial, setOpenDial] = useState(false);
  const [cardSize, setCardSize] = useState(1);
  const [showGrid, setShowGrid] = useState(false);
  const constraintsRef = useRef(null);
  const dragControls = useDragControls();
  const cardRefs = useRef<HTMLDivElement[]>([]);

  const handleReset = () => {
    cardRefs.current.forEach((cardRef) => {
      if (cardRef) {
        cardRef.style.transform = "translateX(0) translateY(0)";
      }
    });
  };

  return (
    <div
      ref={constraintsRef}
      className="w-full h-full"
      onPointerDown={(event) => dragControls.start(event)}
    >
      <div
        className={`absolute start-3 top-3 flex items-center gap-4 z-20 ${
          hideUi ? "opacity-0" : "opacity-40 hover:opacity-100"
        }`}
        onMouseOver={() => {
          setOpenDial(true);
        }}
        onMouseLeave={() => {
          setOpenDial(false);
        }}
      >
        <div className="p-2 z-20">
          <button
            type="button"
            data-dial-toggle="speed-dial-menu-default"
            aria-controls="speed-dial-menu-default"
            aria-expanded="false"
            className="flex items-center justify-center bg-white rounded-full w-11 h-11"
          >
            <Image
              width="24"
              height="24"
              src="images/gear.svg"
              alt="speed dial"
            />
            <span className="sr-only">Open actions menu</span>
          </button>
        </div>

        {openDial && (
          <>
            <div className="absolute top-0 left-0 w-[110%] h-full rounded-full bg-[#00000038] z-0" />
            <div className="flex items-start gap-4 transition-opacity z-10">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className="flex flex-col justify-center items-center gap-1 opacity-60 hover:opacity-100 max-w-14"
              >
                <Image
                  width="24"
                  height="24"
                  src="images/grid.svg"
                  alt="grid"
                />
                <span className="text-xs text-center text-white whitespace-nowrap">
                  Toggle grid
                </span>
              </button>
              <button
                onClick={() => setCardSize(cardSize + 0.25)}
                className="flex flex-col justify-center items-center gap-1 opacity-60 hover:opacity-100 max-w-14"
              >
                <Image
                  width="24"
                  height="24"
                  src="images/plus.svg"
                  alt="increase"
                />
                <span className="text-xs text-center text-white whitespace-nowrap">
                  Increase
                </span>
              </button>
              <button
                onClick={() => setCardSize(cardSize - 0.25)}
                className="flex flex-col justify-center items-center gap-1 opacity-60 hover:opacity-100 max-w-14"
              >
                <Image
                  width="24"
                  height="24"
                  src="images/minus.svg"
                  alt="decrease"
                />
                <span className="text-xs text-center text-white whitespace-nowrap">
                  Decrease
                </span>
              </button>
              <button
                onClick={handleReset}
                className="flex flex-col justify-center items-center gap-1 opacity-60 hover:opacity-100 max-w-14"
              >
                <Image
                  width="24"
                  height="24"
                  src="images/reset.svg"
                  alt="reset"
                />
                <span className="text-xs text-center text-white whitespace-nowrap">
                  Reset
                </span>
              </button>
              <button
                onClick={fetchNewImageId}
                className="flex flex-col justify-center items-center gap-1 opacity-60 hover:opacity-100 max-w-14"
              >
                <Image
                  width="24"
                  height="24"
                  src="images/image.svg"
                  alt="reset"
                />
                <span className="text-xs text-center text-white whitespace-nowrap">
                  New image
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {showGrid && (
        <>
          <div className="absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:24px_24px] z-10 opacity-10" />
          <div className="absolute-h-center h-full w-[2px] bg-white opacity-20 z-10" />
          <div className="absolute-v-center h-[2px] w-full bg-white opacity-20 z-10" />
        </>
      )}
      {cards.map((card, index) => {
        return (
          card && (
            <motion.div
              ref={(el) => {
                if (el) {
                  cardRefs.current[index] = el;
                }
              }}
              drag
              dragConstraints={constraintsRef}
              dragControls={dragControls}
              dragElastic={0}
              dragMomentum={false}
              onMouseOver={() => handleActiveCard(card.id)}
              onMouseLeave={() => handleActiveCard(0)}
              dragTransition={{
                power: 0,
                modifyTarget: (target) => Math.round(target / 12) * 12,
              }}
              key={card.id}
              className={`absolute cursor-pointer z-10 ${
                activeCard === card.id ? "active" : ""
              }`}
              style={{
                height: 180 * cardSize,
                width: 120 * cardSize,
                top:
                  card.index <= 6
                    ? "0"
                    : card.index <= 12
                    ? 180
                    : card.index <= 18
                    ? 180 * 2
                    : 180 * 3,
                left:
                  card.index <= 6
                    ? 120 * (card.index - 1)
                    : card.index <= 12
                    ? 120 * (card.index - 7)
                    : card.index <= 18
                    ? 120 * (card.index - 13)
                    : 120 * (card.index - 19),
              }}
            >
              <Card {...card} cardSize={cardSize} />
            </motion.div>
          )
        );
      })}
    </div>
  );
};

export default Spread;
