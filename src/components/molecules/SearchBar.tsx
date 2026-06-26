import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  iconSize?: number;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Buscar…",
  className = "w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground",
  iconSize = 13,
}: SearchBarProps) {
  return (
    <div className="relative flex-1">
      <Search
        size={iconSize}
        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
}
