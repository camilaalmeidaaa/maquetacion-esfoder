import { Target } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface NivelesPageProps {
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function NivelesPage({ items, onSave, onToggle }: NivelesPageProps) {
  return (
    <CrudTable
      title="Gestión de Niveles"
      subtitle="Define todas los niveles existentes"
      icon={<Target size={18} />}
      items={items}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
