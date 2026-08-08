import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/buttons")({
  component: RouteComponent,
});

// show added or removed code lines in agy

function RouteComponent() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1>Buttons</h1>
      <div className="p-4 space-y-4 flex flex-col max-w-[200px] gap-4 items-center justify-center">
        <Button variant="default">Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Primary Outline</Button>
        <Button variant="disabled">disabled</Button>
        <Button variant="link">Link</Button>
        <Button variant="premium">Premium</Button>
        <Button variant="card">Card</Button>
      </div>
    </div>
  );
}
