interface StatusBadgeProps {
  estado: "Activo" | "Inactivo";
}

export default function StatusBadge({ estado }: StatusBadgeProps) {
  const isActive = estado === "Activo";

  return (
    <span
      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
      style={
        isActive
          ? { background: "#dcfce7", color: "#15803d", borderColor: "#bbf7d0" }
          : { background: "#f3f4f6", color: "#6b7280", borderColor: "#e5e7eb" }
      }
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ background: isActive ? "#15803d" : "#9ca3af" }}
      />
      {estado}
    </span>
  );
}
