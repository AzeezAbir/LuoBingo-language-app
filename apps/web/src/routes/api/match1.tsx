import { createFileRoute } from "@tanstack/react-router";
import { handleGetMatch1 } from "@luobingo/shared/api/handlers";

export const Route = createFileRoute("/api/match1")({
  server: {
    handlers: {
      GET: handleGetMatch1
    }
  }
});
