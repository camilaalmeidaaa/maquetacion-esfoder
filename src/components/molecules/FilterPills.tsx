interface FilterPillsProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterPills({ options, value, onChange }: FilterPillsProps) {
  return (
    <div className="flex items-center gap-1.5">
      {options.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange(option.value)}
          className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          style={
            value === option.value
              ? { background: "var(--lime)", color: "#0d0f14" }
              : { background: "#f0f2f5", color: "#6c7585" }
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
