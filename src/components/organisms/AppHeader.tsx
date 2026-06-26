import { Search, Bell, HelpCircle } from "lucide-react";
import Breadcrumb from "../molecules/Breadcrumb";
import { Tooltip } from "../atoms/Tooltip";

interface AppHeaderProps {
  breadcrumbs: string[];
  globalSearch: string;
  onGlobalSearchChange: (value: string) => void;
}

export default function AppHeader({
  breadcrumbs,
  globalSearch,
  onGlobalSearchChange,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 h-[52px] flex items-center justify-between px-6 border-b border-border bg-white/80 backdrop-blur-md gap-4">
      <Breadcrumb items={breadcrumbs} />

      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative hidden md:block">
          <Search
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            value={globalSearch}
            onChange={(e) => onGlobalSearchChange(e.target.value)}
            placeholder="Buscar en ESFODERTech…"
            className="w-44 pl-8 pr-3 py-1.5 text-xs bg-muted border border-border rounded-lg outline-none transition-all focus:border-ring focus:w-60 focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground"
          />
        </div>

        <Tooltip label="Notificaciones">
          <button className="relative p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <Bell size={15} />
            <span
              className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--lime)" }}
            />
          </button>
        </Tooltip>

        <Tooltip label="Ayuda">
          <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <HelpCircle size={15} />
          </button>
        </Tooltip>

        <div className="flex items-center gap-2 pl-2 border-l border-border ml-1">
          <div className="text-right hidden sm:block leading-tight">
            <p className="text-[11px] font-semibold text-foreground">Coordinador</p>
            <p className="text-[10px] text-muted-foreground">Deportivo</p>
          </div>
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold cursor-pointer hover:brightness-90 transition-all"
            style={{ background: "var(--lime)", color: "#0d0f14" }}
          >
            CD
          </div>
        </div>
      </div>
    </header>
  );
}
