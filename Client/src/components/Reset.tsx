import { Button } from "@mui/material";

interface ResetProps {
  onRestart: () => void;
}

export default function Reset({ onRestart }: ResetProps) {
  return (
    <Button onClick={onRestart} variant="contained" className="reset">
      Restart
    </Button>
  );
}
