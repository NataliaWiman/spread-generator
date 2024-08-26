import { CardProps } from "@/types";

type SingleCardProps = CardProps & { index: number; cardSize: number };

const Card = ({
  id,
  label,
  question,
  onEdit,
  index,
  cardSize,
}: SingleCardProps) => {
  return (
    <div className="group relative flex justify-center items-center w-full h-full bg-[#ffffff9d] rounded-2xl shadow-md hover:opacity-80">
      <div className="font-semibold text-5xl text-stone-800 font-title">
        {index}
      </div>
    </div>
  );
};

export default Card;
