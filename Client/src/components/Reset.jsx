import Cont from "./container";
import { useState } from "react";
import { Button } from "@mui/material";

export default function Reset({ onRestart }) {
  return (
    <Button onClick={onRestart} variant="contained" className="reset">
      Restart
    </Button>
  );
}
