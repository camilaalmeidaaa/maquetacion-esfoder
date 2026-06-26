import { Dumbbell } from "lucide-react";
import CrudTable from "../../components/organisms/CrudTable";
import type { CrudItem } from "../../types";

interface DeportesPageProps {
  items: CrudItem[];
  programas: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
}

export default function DeportesPage({
  items,
  programas,
  onSave,
  onToggle,
}: DeportesPageProps) {
  return (
    <CrudTable
      title="Gestión de Deportes"
      subtitle="Administra las disciplinas deportivas disponibles"
      icon={<Dumbbell size={18} />}
      items={items}
      programas={programas}
      onSave={onSave}
      onToggle={onToggle}
    />
  );
}
