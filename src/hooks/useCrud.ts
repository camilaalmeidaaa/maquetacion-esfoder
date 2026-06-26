import { useState } from "react";
import { toast } from "sonner";
import type { CrudItem } from "../types";

export function useCrud(initial: CrudItem[], entityName: string) {
  const [items, setItems] = useState<CrudItem[]>(initial);

  const onSave = (item: Partial<CrudItem>) => {
    setItems((prev) => {
      if (item.id) {
        toast.success(`${entityName} actualizado`);
        return prev.map((i) =>
          i.id === item.id ? ({ ...i, ...item } as CrudItem) : i,
        );
      }
      toast.success(`${entityName} creado`);
      return [
        ...prev,
        {
          id: Date.now(),
          codigo: item.codigo || "",
          nombre: item.nombre || "",
          estado: item.estado || "Activo",
          ...(item.programaIds !== undefined ? { programaIds: item.programaIds } : {}),
        },
      ];
    });
  };

  const onToggle = (id: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const next = i.estado === "Activo" ? "Inactivo" : "Activo";
        toast.success(`Estado → ${next}`);
        return { ...i, estado: next };
      }),
    );
  };

  return { items, onSave, onToggle };
}
