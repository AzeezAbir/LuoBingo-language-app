import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";
// @ts-expect-error - IDE type-resolution mismatch
export const Route = createFileRoute("/learn")({
  component: learn,
});

function learn() {
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <div className="rounded-2xl p-6">
        <h1 className="mb-2 text-2xl font-bold">Lessons Under Development</h1>
        <p className="mb-6 opacity-80">Check demo exercises.</p>
        <Link to="/pick">
          <Button variant="primary">Start</Button>
        </Link>
      </div>
    </div>
  );
}
