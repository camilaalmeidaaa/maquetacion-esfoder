export interface CrudItem {
  id: number;
  codigo: string;
  nombre: string;
  estado: "Activo" | "Inactivo";
  programaIds?: number[];
}

export type CrudSortKey = "codigo" | "nombre" | "estado";
