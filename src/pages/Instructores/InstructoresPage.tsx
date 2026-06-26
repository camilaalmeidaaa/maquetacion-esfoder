import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Search, X, Upload, Star, Phone, Mail, MapPin, Calendar, ChevronsUpDown } from "lucide-react";
import SectionHeader from "../../components/molecules/SectionHeader";
import { Modal, ModalField, ModalInput, ModalSelect, BtnPrimary, BtnGhost } from "../../components/molecules/Modal";
import { SkeletonCard } from "../../components/molecules/Skeleton";
import { Tooltip } from "../../components/atoms/Tooltip";
import { Users } from "lucide-react";

type Perfil = "Monitor" | "Contratista I" | "Contratista II" | "Entrenador";

interface Instructor {
  id: number;
  codigo: string;
  tipoDoc: string;
  documento: string;
  nombres: string;
  apellidos: string;
  fechaNac: string;
  edad: number;
  perfil: Perfil;
  correo: string;
  telefono: string;
  direccion: string;
  sexo: string;
  discapacidad: string;
  evaluador: boolean;
  estado: "Activo" | "Inactivo";
  foto: string;
}

const FOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face&auto=format",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face&auto=format",
];

const INITIAL: Instructor[] = [
  { id: 1, codigo: "INS-001", tipoDoc: "CC", documento: "1023456789", nombres: "Alejandro", apellidos: "Gómez Vargas", fechaNac: "1990-03-15", edad: 36, perfil: "Entrenador", correo: "agomez@esfoder.co", telefono: "310-555-0101", direccion: "Cll 5 # 8-20, Popayán", sexo: "M", discapacidad: "Ninguna", evaluador: true,  estado: "Activo",   foto: FOTOS[0] },
  { id: 2, codigo: "INS-002", tipoDoc: "CC", documento: "1098765432", nombres: "María Fernanda", apellidos: "López Paz", fechaNac: "1994-07-22", edad: 31, perfil: "Monitor", correo: "mlopez@esfoder.co", telefono: "315-555-0202", direccion: "Cra 7 # 12-34, Popayán", sexo: "F", discapacidad: "Ninguna", evaluador: false, estado: "Activo",   foto: FOTOS[1] },
  { id: 3, codigo: "INS-003", tipoDoc: "CC", documento: "1011223344", nombres: "Jorge", apellidos: "Herrera Silva", fechaNac: "1988-11-08", edad: 37, perfil: "Contratista I", correo: "jherrera@esfoder.co", telefono: "300-555-0303", direccion: "Cll 9 # 5-14, Popayán", sexo: "M", discapacidad: "Ninguna", evaluador: true,  estado: "Activo",   foto: FOTOS[2] },
  { id: 4, codigo: "INS-004", tipoDoc: "CC", documento: "1044556677", nombres: "Valentina", apellidos: "Ríos Castro", fechaNac: "1996-02-14", edad: 30, perfil: "Contratista II", correo: "vrios@esfoder.co", telefono: "320-555-0404", direccion: "Av 8 # 3-56, Popayán", sexo: "F", discapacidad: "Ninguna", evaluador: false, estado: "Activo",   foto: FOTOS[3] },
  { id: 5, codigo: "INS-005", tipoDoc: "CC", documento: "1055667788", nombres: "Sebastián", apellidos: "Castro Muñoz", fechaNac: "1992-09-30", edad: 33, perfil: "Entrenador", correo: "scastro@esfoder.co", telefono: "312-555-0505", direccion: "Cll 14 # 9-22, Popayán", sexo: "M", discapacidad: "Ninguna", evaluador: false, estado: "Activo",   foto: FOTOS[4] },
  { id: 6, codigo: "INS-006", tipoDoc: "CC", documento: "1066778899", nombres: "Daniela", apellidos: "Morales López", fechaNac: "1998-05-18", edad: 28, perfil: "Monitor", correo: "dmorales@esfoder.co", telefono: "317-555-0606", direccion: "Cra 3 # 7-44, Popayán", sexo: "F", discapacidad: "Ninguna", evaluador: false, estado: "Inactivo",  foto: FOTOS[5] },
];

const PERFIL_STYLE: Record<Perfil, { bg: string; color: string; border: string }> = {
  "Monitor":        { bg: "rgba(129,140,248,0.12)", color: "#3730a3", border: "rgba(129,140,248,0.3)" },
  "Contratista I":  { bg: "rgba(255,213,79,0.14)",  color: "#854d0e", border: "rgba(255,213,79,0.35)" },
  "Contratista II": { bg: "rgba(251,113,133,0.12)", color: "#9f1239", border: "rgba(251,113,133,0.3)" },
  "Entrenador":     { bg: "rgba(183,255,74,0.12)",  color: "#2d5a00", border: "rgba(183,255,74,0.35)" },
};

const EMPTY_FORM: Partial<Instructor> = {
  estado: "Activo", perfil: "Monitor", tipoDoc: "CC",
  sexo: "M", discapacidad: "Ninguna", evaluador: false, edad: 25,
};

export default function Instructores() {
  const [items, setItems]           = useState<Instructor[]>(INITIAL);
  const [search, setSearch]         = useState("");
  const [perfilFilter, setPerfilFilter] = useState<string>("all");
  const [loading, setLoading]       = useState(true);
  const [detailInst, setDetailInst] = useState<Instructor | null>(null);
  const [formModal, setFormModal]   = useState(false);
  const [form, setForm]             = useState<Partial<Instructor>>(EMPTY_FORM);
  const fileRef                     = useRef<HTMLInputElement>(null);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

  const PERFILES: Perfil[] = ["Monitor", "Contratista I", "Contratista II", "Entrenador"];

  const filtered = items.filter((i) => {
    const q = search.toLowerCase();
    const matchQ = `${i.nombres} ${i.apellidos}`.toLowerCase().includes(q) || i.documento.includes(q) || i.perfil.toLowerCase().includes(q);
    const matchP = perfilFilter === "all" || i.perfil === perfilFilter;
    return matchQ && matchP;
  });

  const handleSave = () => {
    if (form.id) {
      setItems((p) => p.map((i) => i.id === form.id ? { ...i, ...form } as Instructor : i));
    } else {
      setItems((p) => [...p, {
        id: Date.now(), codigo: `INS-${String(p.length + 1).padStart(3, "0")}`,
        tipoDoc: form.tipoDoc || "CC", documento: form.documento || "",
        nombres: form.nombres || "", apellidos: form.apellidos || "",
        fechaNac: form.fechaNac || "", edad: form.edad || 25,
        perfil: form.perfil || "Monitor", correo: form.correo || "",
        telefono: form.telefono || "", direccion: form.direccion || "",
        sexo: form.sexo || "M", discapacidad: form.discapacidad || "Ninguna",
        evaluador: form.evaluador || false, estado: form.estado || "Activo",
        foto: form.foto || FOTOS[Math.floor(Math.random() * FOTOS.length)],
      }]);
    }
    setFormModal(false);
  };

  const handleFoto = (file: File) => {
    const url = URL.createObjectURL(file);
    setForm((p) => ({ ...p, foto: url }));
  };

  return (
    <div className="space-y-6">
      <SectionHeader icon={<Users size={22} />} title="Gestión de Instructores" subtitle="Gestiona el talento humano deportivo de la escuela" />

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar instructor…" className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground" />
        </div>

        {/* Perfil filter pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {["all", ...PERFILES].map((p) => (
            <button key={p} onClick={() => setPerfilFilter(p)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
              style={perfilFilter === p ? { background: "var(--lime)", color: "#0d0f14" } : { background: "#f0f2f5", color: "#6c7585" }}>
              {p === "all" ? "Todos" : p}
            </button>
          ))}
        </div>

        <Tooltip label="Registrar nuevo instructor">
          <button onClick={() => { setForm(EMPTY_FORM); setFormModal(true); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all hover:brightness-95 active:scale-95 shadow-sm whitespace-nowrap"
            style={{ background: "var(--lime)" }}>
            <Plus size={14} strokeWidth={2.5} /> Nuevo Instructor
          </button>
        </Tooltip>
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">{filtered.length} instructor{filtered.length !== 1 ? "es" : ""} encontrados</p>

      {/* Card Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : (
            <AnimatePresence mode="popLayout">
              {filtered.map((inst, i) => {
                const s = PERFIL_STYLE[inst.perfil];
                return (
                  <motion.div
                    key={inst.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ delay: i * 0.06 }}
                    onClick={() => setDetailInst(inst)}
                    className="bg-white rounded-2xl border border-border overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 hover:border-ring/20 transition-all duration-200"
                  >
                    {/* Photo area */}
                    <div className="relative h-44 bg-muted overflow-hidden">
                      <img src={inst.foto} alt={`${inst.nombres} ${inst.apellidos}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                      {/* Status badge */}
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={inst.estado === "Activo" ? { background: "rgba(183,255,74,0.9)", color: "#1a3c00" } : { background: "rgba(0,0,0,0.5)", color: "#ddd" }}>
                          {inst.estado}
                        </span>
                      </div>

                      {/* Evaluador badge */}
                      {inst.evaluador && (
                        <div className="absolute top-3 left-3">
                          <Tooltip label="Instructor Evaluador">
                            <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,213,79,0.9)", color: "#854d0e" }}>
                              <Star size={9} fill="currentColor" /> Evaluador
                            </span>
                          </Tooltip>
                        </div>
                      )}

                      {/* Name overlay */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-sm font-bold text-white leading-tight">{inst.nombres} {inst.apellidos}</p>
                        <p className="text-[10px] text-white/70 mt-0.5">{inst.edad} años · {inst.documento}</p>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border" style={{ background: s.bg, color: s.color, borderColor: s.border }}>
                          {inst.perfil}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">{inst.codigo}</span>
                      </div>
                      <div className="mt-3 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Phone size={10} className="flex-shrink-0" />{inst.telefono}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground truncate">
                          <Mail size={10} className="flex-shrink-0" />{inst.correo}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}

        {!loading && filtered.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-muted">
              <Users size={22} className="text-muted-foreground" />
            </div>
            <p className="text-sm font-semibold text-foreground">Sin resultados</p>
            <p className="text-xs text-muted-foreground">Ajusta el filtro o el término de búsqueda</p>
          </div>
        )}
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {detailInst && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(13,15,20,0.5)" }} onClick={(e) => e.target === e.currentTarget && setDetailInst(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.96, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ type: "spring", stiffness: 360, damping: 30 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
              style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
              {/* Header photo */}
              <div className="relative h-48 bg-muted flex-shrink-0">
                <img src={detailInst.foto} alt={detailInst.nombres} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <button onClick={() => setDetailInst(null)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"><X size={14} /></button>
                <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ ...PERFIL_STYLE[detailInst.perfil], background: PERFIL_STYLE[detailInst.perfil].bg }}>
                        {detailInst.perfil}
                      </span>
                      {detailInst.evaluador && <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(255,213,79,0.9)", color: "#854d0e" }}><Star size={8} fill="currentColor" /> Evaluador</span>}
                    </div>
                    <h2 className="text-xl font-bold text-white">{detailInst.nombres} {detailInst.apellidos}</h2>
                    <p className="text-sm text-white/70">{detailInst.codigo} · {detailInst.edad} años</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full" style={detailInst.estado === "Activo" ? { background: "rgba(183,255,74,0.9)", color: "#1a3c00" } : { background: "rgba(0,0,0,0.5)", color: "#ddd" }}>
                    {detailInst.estado}
                  </span>
                </div>
              </div>
              {/* Details grid */}
              <div className="overflow-y-auto p-5">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    { label: "Tipo Documento", value: detailInst.tipoDoc },
                    { label: "Número Documento", value: detailInst.documento },
                    { label: "Fecha Nacimiento", value: detailInst.fechaNac },
                    { label: "Sexo", value: detailInst.sexo === "M" ? "Masculino" : "Femenino" },
                    { label: "Correo Electrónico", value: detailInst.correo },
                    { label: "Teléfono", value: detailInst.telefono },
                    { label: "Discapacidad", value: detailInst.discapacidad },
                    { label: "Categoría / Perfil", value: detailInst.perfil },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-muted/40 rounded-xl p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    </div>
                  ))}
                  <div className="col-span-2 bg-muted/40 rounded-xl p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">Dirección</p>
                    <p className="text-sm font-medium text-foreground">{detailInst.direccion}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-5">
                  <button onClick={() => { setDetailInst(null); setForm({ ...detailInst }); setFormModal(true); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold hover:brightness-95 transition-all" style={{ background: "var(--lime)" }}>
                    Editar Instructor
                  </button>
                  <button onClick={() => setDetailInst(null)} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-muted hover:bg-border text-muted-foreground transition-colors">
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form Modal ── */}
      <Modal open={formModal} onClose={() => setFormModal(false)} title={form.id ? "Editar Instructor" : "Nuevo Instructor"} subtitle="Información del instructor o formador" size="lg"
        footer={<><BtnGhost onClick={() => setFormModal(false)}>Cancelar</BtnGhost><BtnPrimary onClick={handleSave}>Guardar</BtnPrimary></>}>
        <div className="space-y-4">
          {/* Foto upload */}
          <ModalField label="Fotografía">
            <div onClick={() => fileRef.current?.click()} className="relative flex items-center gap-4 p-3 border border-dashed border-border rounded-xl cursor-pointer hover:border-ring hover:bg-muted/30 transition-all">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFoto(f); }} />
              {form.foto
                ? <img src={form.foto} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" alt="preview" />
                : <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center flex-shrink-0"><Upload size={18} className="text-muted-foreground" /></div>}
              <div>
                <p className="text-sm font-medium text-foreground">Subir fotografía</p>
                <p className="text-xs text-muted-foreground">PNG, JPG · máx. 5MB</p>
              </div>
            </div>
          </ModalField>

          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Nombres"><ModalInput value={form.nombres || ""} onChange={(e) => setForm((p) => ({ ...p, nombres: e.target.value }))} placeholder="Nombre(s)" /></ModalField>
            <ModalField label="Apellidos"><ModalInput value={form.apellidos || ""} onChange={(e) => setForm((p) => ({ ...p, apellidos: e.target.value }))} placeholder="Apellido(s)" /></ModalField>
            <ModalField label="Tipo Doc">
              <ModalSelect value={form.tipoDoc || "CC"} onChange={(e) => setForm((p) => ({ ...p, tipoDoc: e.target.value }))}>
                <option value="CC">Cédula de Ciudadanía</option>
                <option value="CE">Cédula de Extranjería</option>
                <option value="PA">Pasaporte</option>
              </ModalSelect>
            </ModalField>
            <ModalField label="Número Doc"><ModalInput value={form.documento || ""} onChange={(e) => setForm((p) => ({ ...p, documento: e.target.value }))} placeholder="1023456789" /></ModalField>
            <ModalField label="Fecha Nacimiento"><ModalInput type="date" value={form.fechaNac || ""} onChange={(e) => setForm((p) => ({ ...p, fechaNac: e.target.value }))} /></ModalField>
            <ModalField label="Sexo">
              <ModalSelect value={form.sexo || "M"} onChange={(e) => setForm((p) => ({ ...p, sexo: e.target.value }))}>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </ModalSelect>
            </ModalField>
            <ModalField label="Perfil">
              <ModalSelect value={form.perfil || "Monitor"} onChange={(e) => setForm((p) => ({ ...p, perfil: e.target.value as Perfil }))}>
                {(["Monitor", "Contratista I", "Contratista II", "Entrenador"] as Perfil[]).map((p) => <option key={p} value={p}>{p}</option>)}
              </ModalSelect>
            </ModalField>
            <ModalField label="Estado">
              <ModalSelect value={form.estado || "Activo"} onChange={(e) => setForm((p) => ({ ...p, estado: e.target.value as "Activo" | "Inactivo" }))}>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </ModalSelect>
            </ModalField>
          </div>
          <ModalField label="Correo electrónico"><ModalInput type="email" value={form.correo || ""} onChange={(e) => setForm((p) => ({ ...p, correo: e.target.value }))} placeholder="nombre@esfoder.co" /></ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Teléfono"><ModalInput value={form.telefono || ""} onChange={(e) => setForm((p) => ({ ...p, telefono: e.target.value }))} placeholder="310-000-0000" /></ModalField>
            <ModalField label="Discapacidad"><ModalInput value={form.discapacidad || ""} onChange={(e) => setForm((p) => ({ ...p, discapacidad: e.target.value }))} placeholder="Ninguna" /></ModalField>
          </div>
          <ModalField label="Dirección"><ModalInput value={form.direccion || ""} onChange={(e) => setForm((p) => ({ ...p, direccion: e.target.value }))} placeholder="Cll 5 # 8-20, Popayán" /></ModalField>
          <ModalField label="Evaluador">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <div onClick={() => setForm((p) => ({ ...p, evaluador: !p.evaluador }))}
                className="w-10 h-6 rounded-full transition-all flex-shrink-0 relative"
                style={{ background: form.evaluador ? "var(--lime)" : "var(--switch-background)" }}>
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{ left: form.evaluador ? "18px" : "2px" }} />
              </div>
              <span className="text-sm text-foreground">{form.evaluador ? "Sí, es evaluador" : "No es evaluador"}</span>
            </label>
          </ModalField>
        </div>
      </Modal>
    </div>
  );
}
