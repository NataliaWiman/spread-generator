export interface CardProps {
  index: number;
  id: number;
  label: string;
  question: string;
  onEdit: (id: number) => void;
}

export interface QuestionsListProps {
  cards: CardProps[];
  activeCard: number | null;
  onEditQuestion: (id: number, question: string) => void;
  onRemoveCard: (id: number) => void;
}
