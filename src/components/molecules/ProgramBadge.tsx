import { PROGRAMA_COLORS, DEFAULT_PROGRAMA_STYLE } from "../../utils/programaColors";

interface ProgramBadgeProps {
  nombre: string;
}

export default function ProgramBadge({ nombre }: ProgramBadgeProps) {
  const style = PROGRAMA_COLORS[nombre] || DEFAULT_PROGRAMA_STYLE;

  return (
    <span
      className="text-[9px] font-bold px-1.5 py-0.5 rounded border tracking-wide whitespace-nowrap"
      style={{ background: style.bg, color: style.color, borderColor: style.border }}
    >
      {nombre}
    </span>
  );
}
