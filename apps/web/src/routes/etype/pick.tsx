import Card from "../../components/B/Card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/etype/pick")({
  component: pick,
});

function pick() {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-5">
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground text-center tracking-wide font-sans mb-5">
        What does &quot;kato&quot; mean?
      </h2>
      </div>
      <Card text="Kon" />
      <Card text="Kan" />
      <Card text="Kya" />
    </div>
  );
}
