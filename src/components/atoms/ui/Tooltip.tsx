import { ReactNode } from "react";

interface TooltipProps {
  label: string;
  children: ReactNode;
}

export function Tooltip({ label, children }: TooltipProps) {
  return (
    <div className="tooltip-container">
      {children}
      <span className="tooltip">{label}</span>
    </div>
  );
}
