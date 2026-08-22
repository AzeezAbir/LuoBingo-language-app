import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { X } from "lucide-react-native";

export default function Close({ href = "/" }: { href?: string }) {
  return (
    <Link href={href as any} asChild>
      <TouchableOpacity className="p-2 transition-colors">
        <X size={28} strokeWidth={2.5} color="#64748b" className="dark:text-slate-400" />
      </TouchableOpacity>
    </Link>
  );
}
