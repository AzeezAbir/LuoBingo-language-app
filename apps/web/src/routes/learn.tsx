import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Button } from "../components/ui/button";

export const Route = createFileRoute("/learn")({
  component: learn,
});

function learn() {
  return (
    <div className="flex flex-col items-center p-8 text-center">
      <div className="rounded-2xl p-6">
        <h1 className="mb-2 text-2xl font-bold">Lessons Under Development</h1>
        <p className="mb-6 opacity-80">Check demo exercises.</p>
        <div className="flex flex-col justify-center gap-4">
          <Link to="/demo">
            <Button variant="primary">Start</Button>
          </Link>

          <Link to="/buttons">
            <Button variant="secondary">Buttons page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
