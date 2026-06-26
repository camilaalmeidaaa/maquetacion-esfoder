import { Target } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface EnfoquesPageProps {
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function EnfoquesPage({ items, onSave, onToggle }: EnfoquesPageProps) {
  return (
    <CrudTable
      title="Gestión de Enfoques"
      subtitle="Define el enfoque formativo, competitivo o recreativo"
      icon={<Target size={18} />}
      items={items}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
