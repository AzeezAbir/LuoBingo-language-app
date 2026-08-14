import { Button } from "./ui/button"

export default function Wrong({ text, onClick }: { text?: string; onClick?: () => void }) {
  return (
    <Button
      variant="destructive"
      onClick={onClick}
      className="w-full mt-4"
    >
      {text || "try again"}
    </Button>
  )
}
