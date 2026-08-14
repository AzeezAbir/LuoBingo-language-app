import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

export default function Close({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="close transition-colors">
      <X className="w-6 h-6" strokeWidth={2.5} color="var(--color-slate-dark) " />
    </Link>
  );
}
