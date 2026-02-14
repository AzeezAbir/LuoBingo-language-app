import { Box } from "@mui/material";
import Card from "./card";

export default function CardColumn({
  data,
  field,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}) {
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
          // 4. New: Check if this card's ID is in the matched array
          isMatched={matched.includes(item.id)}
          isWrong={wrongPair && wrongPair.includes(item.id)}
          isSuccess={successPair && successPair.includes(item.id)}
        />
      ))}
    </Box>
  );
}
