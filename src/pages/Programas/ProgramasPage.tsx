import { Layers } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface ProgramasPageProps {
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function ProgramasPage({ items, onSave, onToggle }: ProgramasPageProps) {
  return (
    <CrudTable
      title="Gestión de Programas"
      subtitle="Administra los programas deportivos institucionales"
      icon={<Layers size={18} />}
      items={items}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
