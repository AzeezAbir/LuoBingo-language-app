import { Grid2 } from "@mui/material";
import CardColumn from "./cardColumn";

// 1. Accept leftData and rightData instead of generic 'data'
export default function Cont({
  leftData,
  rightData,
  onSelect,
  selection,
  matched,
}) {
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
        />
      </Grid2>
    </Grid2>
  );
}
