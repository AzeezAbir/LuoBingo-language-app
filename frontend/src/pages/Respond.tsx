import { Box, Typography } from "@mui/material";
import ProgBar from "../components/ProgBar";
import Bubble from "../components/translate/bubble";
export default function Respond() {
  return (
    <>
      <ProgBar />
      <Bubble />
      <Box className="card">
        <Typography>Respond</Typography>
      </Box>
    </>
  );
}
