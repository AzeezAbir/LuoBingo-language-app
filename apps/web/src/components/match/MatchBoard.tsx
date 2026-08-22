import { useMatchBoard, type Word } from "@luobingo/shared";
import ContMatch from "./container";

interface MatchBoardProps {
  words: Word[];
  onCorrect: () => void;
}

export default function MatchBoard({ words, onCorrect }: MatchBoardProps) {
  const {
    columns,
    selection,
    matched,
    wrongPair,
    successPair,
    handleSelect,
  } = useMatchBoard({ words, onCorrect });

  return (
    <div className="w-full flex-1 flex flex-col">
      <div className="text-center md:text-left mt-2 mb-4 w-full">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-wide font-sans mb-1">
          Tap the matching pairs
        </h2>
      </div>
      <div className="w-full flex-1 flex flex-col justify-center my-auto">
        <ContMatch
          leftData={columns.left}
          rightData={columns.right}
          onSelect={handleSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </div>
    </div>
  );
}

