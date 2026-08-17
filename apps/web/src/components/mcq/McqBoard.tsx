import Card from "../B/Card";

interface McqBoardProps {
  question: string;
  options: string[];
  selectedCard: string | null;
  isCorrect: boolean | null;
  isValidating: boolean;
  onSelectCard: (opt: string) => void;
}

export default function McqBoard({
  question,
  options,
  selectedCard,
  isCorrect,
  isValidating,
  onSelectCard,
}: McqBoardProps) {
  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="text-center md:text-left mt-2 mb-2 w-full font-sans">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
          Select the correct translation
        </h2>
        <h3 className="text-lg md:text-xl font-medium text-gray-300 mt-1 mb-4 font-sans">
          {question}
        </h3>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center gap-2 md:gap-4 my-auto">
        {options.map((opt: string) => {
          const isSelected = selectedCard === opt;
          const isSuccess = isSelected && isCorrect === true;
          const isWrong = isSelected && isCorrect === false;
          const isDisabled = isCorrect === true || isWrong || isValidating;

          return (
            <Card
              key={opt}
              id={opt}
              isSelected={isSelected}
              disabled={isDisabled}
              isWrong={isWrong}
              isSuccess={isSuccess}
              onClick={(val) => {
                if (!isCorrect && !isValidating) {
                  onSelectCard(val);
                }
              }}
              text={opt}
            />
          );
        })}
      </div>
    </div>
  );
}
