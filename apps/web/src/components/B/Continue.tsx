import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

interface CotinueProps {
  variant?: "default" | "primary" | "secondary";
}

export default function Continue({ variant = "secondary" }: CotinueProps) {
  const navigate = useNavigate();

  return (
    <Button
      variant={variant}
      onClick={() => navigate({ to: "/" })}
      className="w-full mt-4 animate-in fade-in zoom-in-95 duration-250"
    >
      Continue
    </Button>
  );
}
