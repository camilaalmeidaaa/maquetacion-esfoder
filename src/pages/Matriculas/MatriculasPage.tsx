import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, X, Filter, ClipboardCheck, UserPlus, Clock, XCircle, ClipboardList, Eye } from "lucide-react";
import SectionHeader from "../../components/molecules/SectionHeader";
import { Modal, ModalField, ModalInput, ModalSelect, BtnPrimary, BtnGhost } from "../../components/molecules/Modal";
import { SkeletonKPI, SkeletonRow } from "../../components/molecules/Skeleton";
import { Pagination } from "../../components/molecules/Pagination";
import { Tooltip } from "../../components/atoms/Tooltip";

interface Matricula {
  id: number;
  codigo: string;
  documento: string;
  participante: string;
  edad: number;
  telefono: string;
  programa: string;
  deporte: string;
  modalidad: string;
  grupo: string;
  etapa: string;
  nivel: string;
  fechaMatricula: string;
  valorPagado: number;
  fechaPago: string;
  estadoPago: "Pagado" | "Pendiente" | "Parcial";
  comprobante: string;
  estado: "Inscrito" | "Matriculado" | "Pendiente" | "Cancelado";
}

const INICIAL: Matricula[] = [
  { id: 1,  codigo: "MAT-001", documento: "1001", participante: "Laura García",     edad: 9,  telefono: "310-111-0001", programa: "PRO ACUÁTICO",   deporte: "Natación",  modalidad: "Natación Infantil",   grupo: "G-01", etapa: "Inicial",    nivel: "1", fechaMatricula: "2026-06-01", valorPagado: 120000, fechaPago: "2026-06-01", estadoPago: "Pagado",   comprobante: "", estado: "Matriculado" },
  { id: 2,  codigo: "MAT-002", documento: "1002", participante: "Carlos Ruiz",      edad: 12, telefono: "315-222-0002", programa: "PRO RUEDAS",     deporte: "Patinaje",  modalidad: "Patinaje Recreativo",grupo: "G-03", etapa: "Básica",     nivel: "1", fechaMatricula: "2026-06-02", valorPagado: 95000,  fechaPago: "2026-06-02", estadoPago: "Pagado",   comprobante: "", estado: "Inscrito" },
  { id: 3,  codigo: "MAT-003", documento: "1003", participante: "Ana Martínez",     edad: 14, telefono: "300-333-0003", programa: "PRO CONJUNTO",   deporte: "Fútbol",    modalidad: "Fútbol Formativo",   grupo: "G-02", etapa: "Formativa",  nivel: "2", fechaMatricula: "2026-06-03", valorPagado: 110000, fechaPago: "2026-06-03", estadoPago: "Pagado",   comprobante: "", estado: "Matriculado" },
  { id: 4,  codigo: "MAT-004", documento: "1004", participante: "Diego López",      edad: 16, telefono: "320-444-0004", programa: "PRO RAQUETAS",   deporte: "Tenis",     modalidad: "Tenis Competitivo",  grupo: "G-04", etapa: "Competitiva",nivel: "3", fechaMatricula: "2026-06-04", valorPagado: 0,      fechaPago: "",           estadoPago: "Pendiente",comprobante: "", estado: "Pendiente" },
  { id: 5,  codigo: "MAT-005", documento: "1005", participante: "Sofía Torres",     edad: 10, telefono: "312-555-0005", programa: "PRO ACUÁTICO",   deporte: "Natación",  modalidad: "Natación Avanzada",  grupo: "G-01", etapa: "Intermedia", nivel: "2", fechaMatricula: "2026-06-05", valorPagado: 120000, fechaPago: "2026-06-05", estadoPago: "Pagado",   comprobante: "", estado: "Matriculado" },
  { id: 6,  codigo: "MAT-006", documento: "1006", participante: "Mateo Jiménez",    edad: 11, telefono: "317-666-0006", programa: "PRO CONJUNTO",   deporte: "Fútbol",    modalidad: "Fútbol Formativo",   grupo: "G-02", etapa: "Formativa",  nivel: "2", fechaMatricula: "2026-06-06", valorPagado: 0,      fechaPago: "",           estadoPago: "Pendiente",comprobante: "", estado: "Cancelado" },
  { id: 7,  codigo: "MAT-007", documento: "1007", participante: "Isabella Ramírez", edad: 8,  telefono: "304-777-0007", programa: "PRO RUEDAS",     deporte: "Patinaje",  modalidad: "Patinaje Recreativo",grupo: "G-03", etapa: "Básica",     nivel: "1", fechaMatricula: "2026-06-07", valorPagado: 47500,  fechaPago: "2026-06-07", estadoPago: "Parcial",  comprobante: "", estado: "Inscrito" },
  { id: 8,  codigo: "MAT-008", documento: "1008", participante: "Samuel Peña",      edad: 13, telefono: "311-888-0008", programa: "PRO ACT FÍSICA", deporte: "Atletismo", modalidad: "Atletismo",          grupo: "G-05", etapa: "Inicial",    nivel: "1", fechaMatricula: "2026-06-08", valorPagado: 85000,  fechaPago: "2026-06-08", estadoPago: "Pagado",   comprobante: "", estado: "Matriculado" },
  { id: 9,  codigo: "MAT-009", documento: "1009", participante: "Valentina Cruz",   edad: 9,  telefono: "300-999-0009", programa: "PRO ACUÁTICO",   deporte: "Natación",  modalidad: "Natación Infantil",  grupo: "G-01", etapa: "Inicial",    nivel: "1", fechaMatricula: "2026-06-08", valorPagado: 0,      fechaPago: "",           estadoPago: "Pendiente",comprobante: "", estado: "Pendiente" },
  { id: 10, codigo: "MAT-010", documento: "1010", participante: "Emilio Sánchez",   edad: 15, telefono: "320-010-0010", programa: "PRO RAQUETAS",   deporte: "Tenis",     modalidad: "Tenis Competitivo",  grupo: "G-04", etapa: "Avanzada",   nivel: "4", fechaMatricula: "2026-06-09", valorPagado: 150000, fechaPago: "2026-06-09", estadoPago: "Pagado",   comprobante: "", estado: "Matriculado" },
];

const ESTADO_CFG = {
  Matriculado: { bg: "#dcfce7", text: "#15803d", border: "#bbf7d0", icon: ClipboardCheck },
  Inscrito:    { bg: "#dbeafe", text: "#1d4ed8", border: "#bfdbfe", icon: UserPlus },
  Pendiente:   { bg: "#fef9c3", text: "#a16207", border: "#fef08a", icon: Clock },
  Cancelado:   { bg: "#fee2e2", text: "#dc2626", border: "#fecaca", icon: XCircle },
};
const ESTADOS = ["Inscrito", "Matriculado", "Pendiente", "Cancelado"] as const;
const PROGRAMAS = ["PRO ACUÁTICO","PRO RUEDAS","PRO CONJUNTO","PRO RAQUETAS","PRO ACT FÍSICA","PRO ARTES MARCIALES","PRO INDIVIDUAL"];
const PAGE_SIZE = 7;

function fmt(n: number) { return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(n); }

export default function Matriculas() {
  const [items, setItems]           = useState<Matricula[]>(INICIAL);
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState<string>("all");
  const [progFilter, setProg]       = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage]             = useState(1);
  const [modal, setModal]           = useState(false);
  const [form, setForm]             = useState<Partial<Matricula>>({});
  const [detailM, setDetailM]       = useState<Matricula | null>(null);
  const [loading, setLoading]       = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 1000); return () => clearTimeout(t); }, []);

  const filtered = items.filter((i) => {
    const q = search.toLowerCase();
    const matchQ = i.participante.toLowerCase().includes(q) || i.codigo.toLowerCase().includes(q) || i.documento.includes(q) || i.programa.toLowerCase().includes(q);
    const matchS = statusFilter === "all" || i.estado === statusFilter;
    const matchP = progFilter === "all" || i.programa === progFilter;
    return matchQ && matchS && matchP;
  });
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSave = () => {
    const n = items.length + 1;
    setItems((p) => [...p, {
      id: Date.now(), codigo: `MAT-${String(n).padStart(3, "0")}`,
      documento: form.documento || "", participante: form.participante || "",
      edad: form.edad || 10, telefono: form.telefono || "",
      programa: form.programa || "", deporte: form.deporte || "",
      modalidad: form.modalidad || "", grupo: form.grupo || "",
      etapa: form.etapa || "", nivel: form.nivel || "1",
      fechaMatricula: form.fechaMatricula || new Date().toISOString().split("T")[0],
      valorPagado: form.valorPagado || 0, fechaPago: form.fechaPago || "",
      estadoPago: form.estadoPago || "Pendiente", comprobante: "",
      estado: form.estado || "Inscrito",
    }]);
    setModal(false);
  };

  return (
    <div className="space-y-6">
      <SectionHeader icon={<ClipboardList size={22} />} title="Gestión de Matrículas" subtitle="Administra inscripciones, pagos y seguimiento de participantes" />

      {/* KPI tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <SkeletonKPI key={i} />)
          : ESTADOS.map((estado, i) => {
              const cfg = ESTADO_CFG[estado];
              const Icon = cfg.icon;
              const count = items.filter((x) => x.estado === estado).length;
              const active = statusFilter === estado;
              return (
                <motion.button key={estado} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                  onClick={() => { setStatus(active ? "all" : estado); setPage(1); }}
                  className="text-left bg-white rounded-2xl p-4 border transition-all hover:shadow-md"
                  style={{ borderColor: active ? cfg.border : "var(--border)", boxShadow: active ? `0 0 0 2px ${cfg.border}` : undefined }}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: cfg.bg }}>
                      <Icon size={14} style={{ color: cfg.text }} />
                    </div>
                    {active && <div className="w-2 h-2 rounded-full" style={{ background: cfg.text }} />}
                  </div>
                  <p className="text-2xl font-bold text-foreground">{count}</p>
                  <p className="text-xs font-semibold mt-0.5" style={{ color: cfg.text }}>{estado}s</p>
                </motion.button>
              );
            })}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Buscar por participante, código, documento o programa…" className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground" />
        </div>
        <button onClick={() => setShowFilters((p) => !p)} className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-border bg-white text-muted-foreground hover:bg-muted transition-colors">
          <Filter size={13} /> Filtros {(statusFilter !== "all" || progFilter !== "all") && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--lime)" }} />}
        </button>
        <Tooltip label="Registrar nueva matrícula">
          <button onClick={() => { setForm({ estado: "Inscrito", estadoPago: "Pendiente" }); setModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold hover:brightness-95 active:scale-95 transition-all shadow-sm whitespace-nowrap"
            style={{ background: "var(--lime)" }}>
            <Plus size={14} strokeWidth={2.5} /> Nueva Matrícula
          </button>
        </Tooltip>
      </div>

      {/* Filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="bg-white rounded-2xl border border-border p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Estado</label>
                <select value={statusFilter} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl outline-none">
                  <option value="all">Todos</option>
                  {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">Programa</label>
                <select value={progFilter} onChange={(e) => { setProg(e.target.value); setPage(1); }} className="w-full px-3 py-2 text-sm bg-muted border border-border rounded-xl outline-none">
                  <option value="all">Todos</option>
                  {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button onClick={() => { setStatus("all"); setProg("all"); setSearch(""); }} className="px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
                  Limpiar filtros
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-xs text-muted-foreground">{filtered.length} matrículas encontradas</p>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {["Código","Documento","Participante","Programa","Deporte","Grupo","Etapa","Niv.","Fecha","Valor Pdo.","Estado",""].map((h) => (
                  <th key={h} className="text-left px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={12} />)
                : (
                  <AnimatePresence mode="popLayout">
                    {paginated.length > 0
                      ? paginated.map((m, i) => {
                          const cfg = ESTADO_CFG[m.estado];
                          return (
                            <motion.tr key={m.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.04 }} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                              <td className="px-3 py-3 text-[10px] font-mono text-muted-foreground whitespace-nowrap">{m.codigo}</td>
                              <td className="px-3 py-3 text-[10px] font-mono text-muted-foreground">{m.documento}</td>
                              <td className="px-3 py-3 text-sm font-semibold text-foreground whitespace-nowrap">{m.participante}</td>
                              <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{m.programa}</td>
                              <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{m.deporte}</td>
                              <td className="px-3 py-3"><span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted">{m.grupo}</span></td>
                              <td className="px-3 py-3 text-xs text-muted-foreground whitespace-nowrap">{m.etapa}</td>
                              <td className="px-3 py-3 text-xs text-center text-muted-foreground">{m.nivel}</td>
                              <td className="px-3 py-3 text-[10px] font-mono text-muted-foreground whitespace-nowrap">{m.fechaMatricula}</td>
                              <td className="px-3 py-3 text-xs font-semibold text-foreground whitespace-nowrap">{m.valorPagado > 0 ? fmt(m.valorPagado) : "—"}</td>
                              <td className="px-3 py-3">
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap"
                                  style={{ background: cfg.bg, color: cfg.text, borderColor: cfg.border }}>
                                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cfg.text }} />{m.estado}
                                </span>
                              </td>
                              <td className="px-3 py-3">
                                <Tooltip label="Ver detalle">
                                  <button onClick={() => setDetailM(m)} className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                                    <Eye size={12} />
                                  </button>
                                </Tooltip>
                              </td>
                            </motion.tr>
                          );
                        })
                      : (
                        <tr><td colSpan={12} className="px-5 py-12 text-center text-sm text-muted-foreground">Sin matrículas con los filtros seleccionados</td></tr>
                      )}
                  </AnimatePresence>
                )}
            </tbody>
          </table>
        </div>
        <Pagination page={page} total={filtered.length} pageSize={PAGE_SIZE} onChange={setPage} />
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {detailM && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13,15,20,0.5)" }} onClick={(e) => e.target === e.currentTarget && setDetailM(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col">
              {/* Header */}
              <div className="px-5 py-4 border-b border-border flex items-center justify-between" style={{ background: "linear-gradient(135deg, var(--lime-dim), var(--yellow-dim, rgba(255,213,79,0.08)))" }}>
                <div>
                  <p className="text-[10px] font-mono text-muted-foreground">{detailM.codigo}</p>
                  <h2 className="text-base font-bold text-foreground mt-0.5">{detailM.participante}</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border"
                    style={{ background: ESTADO_CFG[detailM.estado].bg, color: ESTADO_CFG[detailM.estado].text, borderColor: ESTADO_CFG[detailM.estado].border }}>
                    {detailM.estado}
                  </span>
                  <button onClick={() => setDetailM(null)} className="p-1.5 rounded-lg hover:bg-white/60 text-muted-foreground transition-colors"><X size={14} /></button>
                </div>
              </div>

              <div className="overflow-y-auto p-5 space-y-5">
                {/* Personal */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Información Personal</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { l: "Documento", v: detailM.documento },
                      { l: "Edad", v: `${detailM.edad} años` },
                      { l: "Teléfono", v: detailM.telefono },
                    ].map(({ l, v }) => (
                      <div key={l} className="bg-muted/40 rounded-xl p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{l}</p>
                        <p className="text-sm font-semibold text-foreground">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deportiva */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Información Deportiva</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { l: "Programa", v: detailM.programa },
                      { l: "Deporte", v: detailM.deporte },
                      { l: "Modalidad", v: detailM.modalidad },
                      { l: "Grupo", v: detailM.grupo },
                      { l: "Etapa", v: detailM.etapa },
                      { l: "Nivel", v: detailM.nivel },
                    ].map(({ l, v }) => (
                      <div key={l} className="bg-muted/40 rounded-xl p-3">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">{l}</p>
                        <p className="text-sm font-semibold text-foreground">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financiera */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Información Financiera</h3>
                  <div className="bg-muted/40 rounded-xl p-4 grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Valor Pagado</p>
                      <p className="text-base font-bold text-foreground">{detailM.valorPagado > 0 ? fmt(detailM.valorPagado) : "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Fecha Pago</p>
                      <p className="text-sm font-semibold text-foreground">{detailM.fechaPago || "—"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-0.5">Estado</p>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold"
                        style={detailM.estadoPago === "Pagado" ? { background: "#dcfce7", color: "#15803d" } : detailM.estadoPago === "Parcial" ? { background: "#fef9c3", color: "#a16207" } : { background: "#fee2e2", color: "#dc2626" }}>
                        {detailM.estadoPago}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comprobante placeholder */}
                <div>
                  <h3 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-3">Comprobante de Pago</h3>
                  <div className="border-2 border-dashed border-border rounded-xl p-6 text-center">
                    <p className="text-sm text-muted-foreground">{detailM.comprobante ? "Ver comprobante" : "Sin comprobante adjunto"}</p>
                  </div>
                </div>

                <button onClick={() => setDetailM(null)} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-muted hover:bg-border text-muted-foreground transition-colors">
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form Modal ── */}
      <Modal open={modal} onClose={() => setModal(false)} title="Nueva Matrícula" subtitle="Registro de participante en el programa deportivo"
        footer={<><BtnGhost onClick={() => setModal(false)}>Cancelar</BtnGhost><BtnPrimary onClick={handleSave}>Registrar matrícula</BtnPrimary></>}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Documento"><ModalInput value={form.documento || ""} onChange={(e) => setForm((p) => ({ ...p, documento: e.target.value }))} placeholder="100000001" /></ModalField>
            <ModalField label="Edad"><ModalInput type="number" value={form.edad || ""} onChange={(e) => setForm((p) => ({ ...p, edad: Number(e.target.value) }))} placeholder="10" /></ModalField>
          </div>
          <ModalField label="Nombre del participante"><ModalInput value={form.participante || ""} onChange={(e) => setForm((p) => ({ ...p, participante: e.target.value }))} placeholder="Nombre completo" /></ModalField>
          <ModalField label="Teléfono"><ModalInput value={form.telefono || ""} onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))} placeholder="310-000-0000" /></ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Programa">
              <ModalSelect value={form.programa || ""} onChange={(e) => setForm((p) => ({ ...p, programa: e.target.value }))}>
                <option value="">Seleccionar…</option>
                {PROGRAMAS.map((p) => <option key={p} value={p}>{p}</option>)}
              </ModalSelect>
            </ModalField>
            <ModalField label="Deporte"><ModalInput value={form.deporte || ""} onChange={(e) => setForm((p) => ({ ...p, deporte: e.target.value }))} placeholder="Natación" /></ModalField>
            <ModalField label="Modalidad"><ModalInput value={form.modalidad || ""} onChange={(e) => setForm((p) => ({ ...p, modalidad: e.target.value }))} placeholder="Natación Infantil" /></ModalField>
            <ModalField label="Grupo"><ModalInput value={form.grupo || ""} onChange={(e) => setForm((p) => ({ ...p, grupo: e.target.value }))} placeholder="G-01" /></ModalField>
            <ModalField label="Etapa"><ModalInput value={form.etapa || ""} onChange={(e) => setForm((p) => ({ ...p, etapa: e.target.value }))} placeholder="Inicial" /></ModalField>
            <ModalField label="Nivel"><ModalInput value={form.nivel || ""} onChange={(e) => setForm((p) => ({ ...p, nivel: e.target.value }))} placeholder="1" /></ModalField>
            <ModalField label="Fecha Matrícula"><ModalInput type="date" value={form.fechaMatricula || ""} onChange={(e) => setForm((p) => ({ ...p, fechaMatricula: e.target.value }))} /></ModalField>
            <ModalField label="Estado">
              <ModalSelect value={form.estado || "Inscrito"} onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as Matricula["estado"] }))}>
                {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
              </ModalSelect>
            </ModalField>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Valor Pagado"><ModalInput type="number" value={form.valorPagado || ""} onChange={(e) => setForm((p) => ({ ...p, valorPagado: Number(e.target.value) }))} placeholder="120000" /></ModalField>
            <ModalField label="Estado Pago">
              <ModalSelect value={form.estadoPago || "Pendiente"} onChange={(e) => setForm((p) => ({ ...p, estadoPago: e.target.value as "Pagado" | "Pendiente" | "Parcial" }))}>
                <option value="Pagado">Pagado</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Parcial">Parcial</option>
              </ModalSelect>
            </ModalField>
          </div>
        </div>
      </Modal>
    </div>
  );
}
