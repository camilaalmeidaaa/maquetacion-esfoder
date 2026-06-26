import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Pencil, Power, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { SkeletonRow } from "../molecules/Skeleton";
import { Pagination } from "../molecules/Pagination";
import { Tooltip } from "../atoms/Tooltip";
import { Modal, ModalField, ModalInput, ModalSelect, BtnPrimary, BtnGhost } from "../molecules/Modal";
import SectionHeader from "../molecules/SectionHeader";
import SearchBar from "../molecules/SearchBar";
import FilterPills from "../molecules/FilterPills";
import StatusBadge from "../molecules/StatusBadge";
import ProgramBadge from "../molecules/ProgramBadge";
import type { CrudItem, CrudSortKey } from "../../types";

export type { CrudItem };

interface CrudTableProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  items: CrudItem[];
  onSave: (item: Partial<CrudItem>) => void;
  onToggle: (id: number) => void;
  programas?: CrudItem[];
}

const PAGE_SIZE = 6;

export default function CrudTable({ title, subtitle, icon, items, onSave, onToggle, programas }: CrudTableProps) {
  const [search, setSearch]           = useState("");
  const [statusFilter, setStatus]     = useState<string>("all");
  const [sortKey, setSortKey]         = useState<CrudSortKey>("codigo");
  const [sortDir, setSortDir]         = useState<"asc" | "desc">("asc");
  const [page, setPage]               = useState(1);
  const [modal, setModal]             = useState(false);
  const [form, setForm]               = useState<Partial<CrudItem>>({});
  const [loading, setLoading]         = useState(true);

  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, [title]);

  const filtered = items
    .filter((i) => {
      const q = search.toLowerCase();
      const matchQ = i.nombre.toLowerCase().includes(q) || i.codigo.toLowerCase().includes(q);
      const matchS = statusFilter === "all" || i.estado === statusFilter;
      return matchQ && matchS;
    })
    .sort((a, b) => {
      const va = a[sortKey]; const vb = b[sortKey];
      const cmp = String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleSort = (key: CrudSortKey) => {
    if (sortKey === key) setSortDir((d) => d === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const SortIcon = ({ col }: { col: CrudSortKey }) => {
    if (sortKey !== col) return <ArrowUpDown size={11} className="opacity-30" />;
    return sortDir === "asc" ? <ArrowUp size={11} style={{ color: "var(--lime)" }} /> : <ArrowDown size={11} style={{ color: "var(--lime)" }} />;
  };

  const colCount = programas ? 6 : 5;

  const getProgramaNames = (ids: number[] = []) =>
    ids.map((id) => programas?.find((p) => p.id === id)?.nombre).filter(Boolean) as string[];

  const togglePrograma = (programaId: number) => {
    setForm((prev) => {
      const ids = prev.programaIds || [];
      const next = ids.includes(programaId)
        ? ids.filter((id) => id !== programaId)
        : [...ids, programaId];
      return { ...prev, programaIds: next };
    });
  };

  const handleSave = () => { onSave(form); setModal(false); };

  return (
    <div className="space-y-5">
      <SectionHeader icon={icon} title={title} subtitle={subtitle} />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          value={search}
          onChange={(value) => { setSearch(value); setPage(1); }}
          placeholder={`Buscar en ${title.toLowerCase()}…`}
        />

        <FilterPills
          options={[
            { value: "all", label: "Todos" },
            { value: "Activo", label: "Activo" },
            { value: "Inactivo", label: "Inactivo" },
          ]}
          value={statusFilter}
          onChange={(value) => { setStatus(value); setPage(1); }}
        />

        <Tooltip label={`Crear nuevo registro en ${title}`}>
          <button onClick={() => { setForm({ estado: "Activo", programaIds: [] }); setModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all hover:brightness-95 active:scale-95 shadow-sm whitespace-nowrap"
            style={{ background: "var(--lime)" }}>
            <Plus size={14} strokeWidth={2.5} /> Nuevo
          </button>
        </Tooltip>
      </div>

      <p className="text-xs text-muted-foreground">{filtered.length} registro{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}</p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground w-10">#</th>
                {(["codigo", "nombre", "estado"] as CrudSortKey[]).map((col) => (
                  <th key={col} onClick={() => toggleSort(col)}
                    className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:text-foreground transition-colors select-none">
                    <span className="flex items-center gap-1.5">
                      {col === "codigo" ? "Código" : col === "nombre" ? "Nombre" : "Estado"}
                      <SortIcon col={col} />
                    </span>
                  </th>
                ))}
                {programas && (
                  <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Programas
                  </th>
                )}
                <th className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={colCount} />)
                : paginated.length > 0
                  ? (
                    <AnimatePresence mode="popLayout">
                      {paginated.map((item, i) => (
                        <motion.tr key={item.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }}
                          className="border-b border-border/60 hover:bg-muted/30 transition-colors group">
                          <td className="px-5 py-3.5 text-xs font-mono text-muted-foreground">{(page - 1) * PAGE_SIZE + i + 1}</td>
                          <td className="px-5 py-3.5">
                            <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-lg bg-muted text-muted-foreground">{item.codigo}</span>
                          </td>
                          <td className="px-5 py-3.5 text-sm font-semibold text-foreground">{item.nombre}</td>
                          <td className="px-5 py-3.5">
                            <StatusBadge estado={item.estado} />
                          </td>
                          {programas && (
                            <td className="px-5 py-3.5">
                              <div className="flex flex-wrap gap-1 max-w-[220px]">
                                {getProgramaNames(item.programaIds).length > 0
                                  ? getProgramaNames(item.programaIds).map((prog) => (
                                      <ProgramBadge key={prog} nombre={prog} />
                                    ))
                                  : <span className="text-[11px] text-muted-foreground italic">Sin programas</span>}
                              </div>
                            </td>
                          )}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1.5 ">
                              <Tooltip label="Editar">
                                <button onClick={() => { setForm({ ...item }); setModal(true); }} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                  <Pencil size={13} />
                                </button>
                              </Tooltip>
                              <Tooltip label={item.estado === "Activo" ? "Inactivar" : "Activar"}>
                                <button onClick={() => onToggle(item.id)} className="p-1.5 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted">
                                  <Power size={13} />
                                </button>
                              </Tooltip>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  )
                  : (
                    <tr>
                      <td colSpan={colCount} className="px-5 py-14 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-10 h-10 rounded-2xl bg-muted flex items-center justify-center">{icon}</div>
                          <p className="text-sm font-medium text-foreground">Sin resultados</p>
                          <p className="text-xs text-muted-foreground">Ajusta el filtro o crea un nuevo registro</p>
                        </div>
                      </td>
                    </tr>
                  )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>

      {/* Modal */}
      <Modal open={modal} onClose={() => setModal(false)}
        title={form.id ? `Editar — ${form.nombre || ""}` : "Nuevo registro"}
        subtitle={title}
        footer={<><BtnGhost onClick={() => setModal(false)}>Cancelar</BtnGhost><BtnPrimary onClick={handleSave}>Guardar cambios</BtnPrimary></>}>
        <div className="space-y-4">
          <ModalField label="Código">
            <ModalInput value={form.codigo || ""} onChange={(e) => setForm((p) => ({ ...p, codigo: e.target.value }))} placeholder="Ej. PRG-001" />
          </ModalField>
          <ModalField label="Nombre">
            <ModalInput value={form.nombre || ""} onChange={(e) => setForm((p) => ({ ...p, nombre: e.target.value }))} placeholder="Nombre descriptivo" />
          </ModalField>
          <ModalField label="Estado">
            <ModalSelect value={form.estado || "Activo"} onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as "Activo" | "Inactivo" }))}>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </ModalSelect>
          </ModalField>
          {programas && (
            <ModalField label="Programas">
              <p className="text-[11px] text-muted-foreground -mt-1 mb-1.5">
                Selecciona uno o varios programas a los que pertenece este deporte
              </p>
              <div className="space-y-1 max-h-44 overflow-y-auto border border-border rounded-xl p-2 bg-muted/30">
                {programas.map((p) => {
                  const selected = (form.programaIds || []).includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePrograma(p.id)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all hover:bg-white"
                      style={selected ? { background: "var(--lime-dim)", border: "1px solid var(--lime-border)" } : undefined}
                    >
                      <span
                        className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors"
                        style={selected
                          ? { background: "var(--lime)", borderColor: "var(--lime)" }
                          : { background: "#fff", borderColor: "var(--border)" }}
                      >
                        {selected && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="#0d0f14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="text-sm font-medium text-foreground flex-1 min-w-0 truncate">{p.nombre}</span>
                      <span className="text-[10px] text-muted-foreground flex-shrink-0">{p.codigo}</span>
                    </button>
                  );
                })}
                {programas.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-3">No hay programas disponibles</p>
                )}
              </div>
            </ModalField>
          )}
        </div>
      </Modal>
    </div>
  );
}
