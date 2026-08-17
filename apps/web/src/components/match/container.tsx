import CardColumn from "./cardColumn";
import "./match.css";

export interface Word {
  id: number | string;
  kan: string;
  dkh: string;
  wrd?: string;
  description?: string;
  alt_words?: string[];
}

export interface Selection {
  id: number | string | null;
  side: "dkh" | "kan" | null;
}

interface ContProps {
  leftData: Word[];
  rightData: Word[];
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  selection: Selection;
  matched: (string | number)[];
  wrongPair: (string | number)[];
  successPair: (string | number)[];
}

export default function Cont({
  leftData,
  rightData,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}: ContProps) {
  return (
    <div className="grid grid-cols-2 gap-4 p-1 md:gap-8 md:p-4 w-full match-container">
      {/* Column 1: Dakhni Words */}
      <div>
        <CardColumn
          data={leftData}
          field="dkh"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </div>

      {/* Column 2: Kannada Words */}
      <div>
        <CardColumn
          data={rightData}
          field="kan"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </div>
    </div>
  );
}
