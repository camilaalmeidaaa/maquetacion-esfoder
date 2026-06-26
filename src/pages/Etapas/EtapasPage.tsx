import { Target } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface EtapasPageProps {
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function EtapasPage({ items, onSave, onToggle }: EtapasPageProps) {
  return (
    <CrudTable
      title="Gestión de Etapas"
      subtitle="Define todas las etapas existenttes"
      icon={<Target size={18} />}
      items={items}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
