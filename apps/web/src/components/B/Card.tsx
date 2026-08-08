import { Button } from "../ui/button";

interface CardProps {
  text: string;
  className?: string;
}

export default function Card({ text, className }: CardProps) {
  return <Button variant="card" className={className}>{text}</Button>;
}
