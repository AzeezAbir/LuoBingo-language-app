import { Grid2 } from "@mui/material";
import CardColumn from "./cardColumn";
import { Word, Selection } from "../types";

interface ContProps {
  leftData: Word[];
  rightData: Word[];
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  selection: Selection;
  matched: (string | number)[];
  wrongPair: (string | number)[];
  successPair: (string | number)[];
}

// 1. Accept leftData and rightData instead of generic 'data'
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
    <Grid2 container spacing={4} sx={{ p: 2 }}>
      {/* Column 1: Dakhni Words (Uses Left Data) */}
      <Grid2 size={6}>
        <CardColumn
          data={leftData} // <--- Pass left shuffled list
          field="dkh"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </Grid2>

      {/* Column 2: Kannada Words (Uses Right Data) */}
      <Grid2 size={6}>
        <CardColumn
          data={rightData} // <--- Pass right shuffled list
          field="kan"
          onSelect={onSelect}
          selection={selection}
          matched={matched}
          wrongPair={wrongPair}
          successPair={successPair}
        />
      </Grid2>
    </Grid2>
  );
}
