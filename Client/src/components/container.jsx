import { Grid2 } from "@mui/material";
import CardColumn from "./cardColumn";

// 1. Accept leftData and rightData instead of generic 'data'
export default function Cont({
  leftData,
  rightData,
  onSelect,
  selection,
  matched,
  wrongPair,
  successPair,
}) {
  // Helper function to decide the background color
  const getCardColor = (id, side) => {
    if (wrongPair && wrongPair.includes(id)) return "#ff4b4b"; // RED for wrong
    if (matched && matched.includes(id)) return "#58CC02"; // GREEN for match
    if (selection.id === id && selection.side === side) return "#ddf4ff"; // LIGHT BLUE for selected
    return "#ffffff"; // WHITE for default
  };

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
