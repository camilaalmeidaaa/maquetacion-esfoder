import { Target } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface LogrosPageProps {
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function EnfoquesPage({ items, onSave, onToggle }: LogrosPageProps) {
  return (
    <CrudTable
      title="Gestión de Logros"
      subtitle=""
      icon={<Target size={18} />}
      items={items}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
