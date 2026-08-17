import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "../components/Header";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <>
      <Header />
      <main className="demo-center">
        <Link to="/learn">Get Started</Link>
      </main>
    </>
  );
}
