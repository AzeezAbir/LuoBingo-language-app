import { Box } from "@mui/material";
import Card from "./Card";
import { Word, Selection } from "../types";

interface CardColumnProps {
  data: Word[];
  field: "dkh" | "kan";
  onSelect: (id: string | number, side: "dkh" | "kan") => void;
  selection: Selection;
  matched: (string | number)[];
  wrongPair: (string | number)[];
  successPair: (string | number)[];
}

export default function CardColumn({
  data,
  field,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}: CardColumnProps) {
  return (
    <Box>
      {data.map((item) => (
        <Card
          key={item.id}
          text={item[field]}
          id={item.id}
          side={field}
          onSelect={onSelect}
          isActive={selection?.id === item.id && selection?.side === field}
          // Check if this card's ID is in the matched array
          isMatched={matched.includes(item.id)}
          isWrong={wrongPair && wrongPair.includes(item.id)}
          isSuccess={successPair && successPair.includes(item.id)}
        />
      ))}
    </Box>
  );
}
