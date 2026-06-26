import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  Search,
  X,
  Users,
  MapPin,
  Clock,
  UsersRound,
} from "lucide-react";
import SectionHeader from "../../components/molecules/SectionHeader";
import {
  Modal,
  ModalField,
  ModalInput,
  ModalSelect,
  BtnPrimary,
  BtnGhost,
} from "../../components/molecules/Modal";
import { SkeletonCard } from "../../components/molecules/Skeleton";
import { Tooltip } from "../../components/atoms/Tooltip";

interface Integrante {
  documento: string;
  nombre: string;
  edad: number;
  estado: "Activo" | "Inactivo";
}

interface Horario {
  dia: string;
  horaInicio: string;
  horaFin: string;
}

interface Grupo {
  id: number;
  codigo: string;
  nombre: string;
  programa: string;
  deporte: string;
  instructor: string;
  etapa: string;
  nivel: string;
  cupos: number;
  matriculados: number;
  estado: "Activo" | "Inactivo";
  escenario: string;
  escenarioFoto: string;
  escenarioUbicacion: string;
  horarios: Horario[];
  integrantes: Integrante[];
}

const INITIAL: Grupo[] = [
  {
    id: 1,
    codigo: "G-01",
    nombre: "Natación Inicial A",
    programa: "PRO ACUÁTICO",
    deporte: "Natación",
    instructor: "Alejandro Gómez",
    etapa: "Inicial",
    nivel: "1",
    cupos: 15,
    matriculados: 12,
    estado: "Activo",
    escenario: "Piscina Olímpica Comfacauca",
    escenarioFoto:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=600&h=300&fit=crop&auto=format",
    escenarioUbicacion: "Cll 4 # 5-20, Popayán",
    horarios: [
      { dia: "Lunes", horaInicio: "07:00", horaFin: "09:00" },
      {
        dia: "Miércoles",
        horaInicio: "07:00",
        horaFin: "09:00",
      },
    ],
    integrantes: [
      {
        documento: "1001",
        nombre: "Laura García",
        edad: 9,
        estado: "Activo",
      },
      {
        documento: "1002",
        nombre: "Carlos Ruiz",
        edad: 10,
        estado: "Activo",
      },
      {
        documento: "1003",
        nombre: "Ana Pérez",
        edad: 8,
        estado: "Activo",
      },
    ],
  },
  {
    id: 2,
    codigo: "G-02",
    nombre: "Fútbol Sub-12",
    programa: "PRO CONJUNTO",
    deporte: "Fútbol",
    instructor: "Sebastián Castro",
    etapa: "Formativa",
    nivel: "2",
    cupos: 20,
    matriculados: 18,
    estado: "Activo",
    escenario: "Cancha Sintética El Estadio",
    escenarioFoto:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=600&h=300&fit=crop&auto=format",
    escenarioUbicacion: "Av. Panamericana km 2, Popayán",
    horarios: [
      { dia: "Martes", horaInicio: "15:00", horaFin: "17:00" },
      { dia: "Jueves", horaInicio: "15:00", horaFin: "17:00" },
      { dia: "Sábado", horaInicio: "09:00", horaFin: "11:00" },
    ],
    integrantes: [
      {
        documento: "2001",
        nombre: "Mateo Jiménez",
        edad: 11,
        estado: "Activo",
      },
      {
        documento: "2002",
        nombre: "Samuel Peña",
        edad: 12,
        estado: "Activo",
      },
      {
        documento: "2003",
        nombre: "Emilio Sánchez",
        edad: 11,
        estado: "Activo",
      },
    ],
  },
  {
    id: 3,
    codigo: "G-03",
    nombre: "Patinaje Recreativo",
    programa: "PRO RUEDAS",
    deporte: "Patinaje",
    instructor: "María Fernanda López",
    etapa: "Básica",
    nivel: "1",
    cupos: 12,
    matriculados: 9,
    estado: "Activo",
    escenario: "Pista de Patinaje Comfacauca",
    escenarioFoto:
      "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=600&h=300&fit=crop&auto=format",
    escenarioUbicacion: "Cra 9 # 8-35, Popayán",
    horarios: [
      { dia: "Lunes", horaInicio: "16:00", horaFin: "18:00" },
      { dia: "Viernes", horaInicio: "16:00", horaFin: "18:00" },
    ],
    integrantes: [
      {
        documento: "3001",
        nombre: "Isabella Ramírez",
        edad: 7,
        estado: "Activo",
      },
      {
        documento: "3002",
        nombre: "Valentina Cruz",
        edad: 8,
        estado: "Activo",
      },
    ],
  },
  {
    id: 4,
    codigo: "G-04",
    nombre: "Tenis Avanzado",
    programa: "PRO RAQUETAS",
    deporte: "Tenis",
    instructor: "Andrés Vargas",
    etapa: "Competitiva",
    nivel: "3",
    cupos: 8,
    matriculados: 6,
    estado: "Activo",
    escenario: "Cancha de Tenis Club Campestre",
    escenarioFoto:
      "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=600&h=300&fit=crop&auto=format",
    escenarioUbicacion: "Club Campestre, km 3 vía Timbío",
    horarios: [
      {
        dia: "Miércoles",
        horaInicio: "17:00",
        horaFin: "19:00",
      },
      { dia: "Sábado", horaInicio: "08:00", horaFin: "10:00" },
    ],
    integrantes: [
      {
        documento: "4001",
        nombre: "Diego López",
        edad: 14,
        estado: "Activo",
      },
      {
        documento: "4002",
        nombre: "Sofía Torres",
        edad: 15,
        estado: "Activo",
      },
    ],
  },
  {
    id: 5,
    codigo: "G-05",
    nombre: "Atletismo Base",
    programa: "PRO ACT FÍSICA",
    deporte: "Atletismo",
    instructor: "Jorge Herrera",
    etapa: "Inicial",
    nivel: "1",
    cupos: 18,
    matriculados: 14,
    estado: "Activo",
    escenario: "Pista Atlética Municipal",
    escenarioFoto:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop&auto=format",
    escenarioUbicacion: "Estadio Municipal, Cll 10 # 15-40",
    horarios: [
      { dia: "Martes", horaInicio: "06:00", horaFin: "08:00" },
      { dia: "Jueves", horaInicio: "06:00", horaFin: "08:00" },
    ],
    integrantes: [
      {
        documento: "5001",
        nombre: "Camilo Reyes",
        edad: 13,
        estado: "Activo",
      },
      {
        documento: "5002",
        nombre: "Lucía Mora",
        edad: 12,
        estado: "Activo",
      },
    ],
  },
];

const PROGRAMA_COLORS: Record<
  string,
  { bg: string; color: string }
> = {
  "PRO ACUÁTICO": {
    bg: "rgba(96,165,250,0.12)",
    color: "#1d4ed8",
  },
  "PRO CONJUNTO": {
    bg: "rgba(183,255,74,0.12)",
    color: "#2d5a00",
  },
  "PRO RUEDAS": {
    bg: "rgba(251,113,133,0.12)",
    color: "#9f1239",
  },
  "PRO RAQUETAS": {
    bg: "rgba(129,140,248,0.12)",
    color: "#3730a3",
  },
  "PRO ACT FÍSICA": {
    bg: "rgba(255,213,79,0.12)",
    color: "#854d0e",
  },
  "PRO ARTES MARCIALES": {
    bg: "rgba(52,211,153,0.12)",
    color: "#065f46",
  },
  "PRO INDIVIDUAL": {
    bg: "rgba(251,146,60,0.12)",
    color: "#9a3412",
  },
};

const EMPTY_FORM: Partial<Grupo> = {
  estado: "Activo",
  cupos: 15,
  matriculados: 0,
  horarios: [],
  integrantes: [],
};

export default function Grupos() {
  const [items, setItems] = useState<Grupo[]>(INITIAL);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [detailGrupo, setDetailGrupo] = useState<Grupo | null>(
    null,
  );
  const [formModal, setFormModal] = useState(false);
  const [form, setForm] = useState<Partial<Grupo>>(EMPTY_FORM);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = items.filter(
    (i) =>
      i.nombre.toLowerCase().includes(search.toLowerCase()) ||
      i.codigo.toLowerCase().includes(search.toLowerCase()) ||
      i.instructor
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      i.programa.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSave = () => {
    if (form.id)
      setItems((p) =>
        p.map((i) =>
          i.id === form.id ? ({ ...i, ...form } as Grupo) : i,
        ),
      );
    else
      setItems((p) => [
        ...p,
        {
          id: Date.now(),
          codigo: `G-${String(p.length + 1).padStart(2, "0")}`,
          nombre: form.nombre || "",
          programa: form.programa || "",
          deporte: form.deporte || "",
          instructor: form.instructor || "",
          etapa: form.etapa || "",
          nivel: form.nivel || "1",
          cupos: form.cupos || 15,
          matriculados: 0,
          estado: form.estado || "Activo",
          escenario: form.escenario || "",
          escenarioFoto: "",
          escenarioUbicacion: "",
          horarios: [],
          integrantes: [],
        },
      ]);
    setFormModal(false);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        icon={<UsersRound size={22} />}
        title="Gestión de Grupos"
        subtitle="Administra los grupos deportivos, horarios y escenarios"
      />

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar grupo, instructor o programa…"
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/20 placeholder:text-muted-foreground"
          />
        </div>
        <Tooltip label="Crear nuevo grupo">
          <button
            onClick={() => {
              setForm(EMPTY_FORM);
              setFormModal(true);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold hover:brightness-95 active:scale-95 transition-all shadow-sm whitespace-nowrap"
            style={{ background: "var(--lime)" }}
          >
            <Plus size={14} strokeWidth={2.5} /> Nuevo Grupo
          </button>
        </Tooltip>
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} grupos ·{" "}
        {items.reduce((a, b) => a + b.matriculados, 0)}{" "}
        participantes activos
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((grupo, i) => {
              const pc = PROGRAMA_COLORS[grupo.programa] || {
                bg: "#f0f2f5",
                color: "#374151",
              };
              const pct = Math.round(
                (grupo.matriculados / grupo.cupos) * 100,
              );
              const barColor =
                pct >= 90
                  ? "#ef4444"
                  : pct >= 70
                    ? "#FFD54F"
                    : "#B7FF4A";
              return (
                <motion.div
                  key={grupo.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setDetailGrupo(grupo)}
                  className="bg-white rounded-2xl border border-border overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 hover:border-ring/20 transition-all duration-200"
                >
                  {/* Escenario photo */}
                  <div className="relative h-36 bg-muted overflow-hidden">
                    {grupo.escenarioFoto ? (
                      <img
                        src={grupo.escenarioFoto}
                        alt={grupo.escenario}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <UsersRound
                          size={32}
                          className="text-muted-foreground/30"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                      <span className="text-[10px] font-mono font-bold text-white/80">
                        {grupo.codigo}
                      </span>
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                        style={
                          grupo.estado === "Activo"
                            ? {
                                background:
                                  "rgba(183,255,74,0.9)",
                                color: "#1a3c00",
                              }
                            : {
                                background: "rgba(0,0,0,0.5)",
                                color: "#ddd",
                              }
                        }
                      >
                        {grupo.estado}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-foreground mb-2">
                      {grupo.nombre}
                    </h3>
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[11px] font-semibold px-1.5 py-0.5 rounded-lg"
                          style={{
                            background: pc.bg,
                            color: pc.color,
                          }}
                        >
                          {grupo.programa}
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          · {grupo.deporte}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users size={10} /> {grupo.instructor}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Etapa:{" "}
                        <span className="font-medium text-foreground">
                          {grupo.etapa}
                        </span>{" "}
                        · Nivel:{" "}
                        <span className="font-medium text-foreground">
                          {grupo.nivel}
                        </span>
                      </p>
                    </div>

                    {/* Capacity bar */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] text-muted-foreground">
                          Ocupación
                        </span>
                        <span
                          className="text-[11px] font-semibold"
                          style={{ color: barColor }}
                        >
                          {grupo.matriculados}/{grupo.cupos}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{
                            delay: i * 0.06 + 0.3,
                            duration: 0.5,
                          }}
                          className="h-full rounded-full"
                          style={{ background: barColor }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {detailGrupo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(13,15,20,0.5)" }}
            onClick={(e) =>
              e.target === e.currentTarget &&
              setDetailGrupo(null)
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{
                type: "spring",
                stiffness: 360,
                damping: 30,
              }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
              style={{
                boxShadow: "0 24px 64px rgba(0,0,0,0.18)",
              }}
            >
              {/* Photo header */}
              <div className="relative h-44 flex-shrink-0 bg-muted">
                {detailGrupo.escenarioFoto && (
                  <img
                    src={detailGrupo.escenarioFoto}
                    alt={detailGrupo.escenario}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={() => setDetailGrupo(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X size={14} />
                </button>
                <div className="absolute bottom-4 left-5">
                  <p className="text-[11px] font-mono text-white/60 mb-0.5">
                    {detailGrupo.codigo}
                  </p>
                  <h2 className="text-xl font-bold text-white">
                    {detailGrupo.nombre}
                  </h2>
                  <p className="text-sm text-white/70">
                    {detailGrupo.programa} ·{" "}
                    {detailGrupo.deporte}
                  </p>
                </div>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto p-5 space-y-5">
                {/* Info general */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                    Información General
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      {
                        label: "Instructor",
                        value: detailGrupo.instructor,
                      },
                      {
                        label: "Etapa",
                        value: detailGrupo.etapa,
                      },
                      {
                        label: "Nivel",
                        value: detailGrupo.nivel,
                      },
                      {
                        label: "Cupos",
                        value: String(detailGrupo.cupos),
                      },
                      {
                        label: "Matriculados",
                        value: String(detailGrupo.matriculados),
                      },
                      {
                        label: "Estado",
                        value: detailGrupo.estado,
                      },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-muted/40 rounded-xl p-3"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
                          {label}
                        </p>
                        <p className="text-sm font-semibold text-foreground">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Horarios */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Clock size={12} /> Horarios
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {detailGrupo.horarios.map((h, i) => (
                      <span
                        key={i}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border"
                        style={{
                          background: "var(--lime-dim)",
                          borderColor: "var(--lime-border)",
                          color: "#2d5a00",
                        }}
                      >
                        <Clock size={10} />
                        {h.dia} · {h.horaInicio}–{h.horaFin}
                      </span>
                    ))}
                    {detailGrupo.horarios.length === 0 && (
                      <p className="text-xs text-muted-foreground">
                        Sin horario asignado
                      </p>
                    )}
                  </div>
                </div>
                {/* Integrantes */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <Users size={12} /> Integrantes (
                    {detailGrupo.integrantes.length})
                  </h3>
                  <div className="bg-muted/30 rounded-xl overflow-hidden">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          {[
                            "Documento",
                            "Nombre",
                            "Edad",
                            "Estado",
                          ].map((h) => (
                            <th
                              key={h}
                              className="text-left px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {detailGrupo.integrantes.map((int) => (
                          <tr
                            key={int.documento}
                            className="border-b border-border/40 hover:bg-white transition-colors"
                          >
                            <td className="px-3 py-2.5 text-xs font-mono text-muted-foreground">
                              {int.documento}
                            </td>
                            <td className="px-3 py-2.5 text-sm font-medium text-foreground">
                              {int.nombre}
                            </td>
                            <td className="px-3 py-2.5 text-sm text-muted-foreground">
                              {int.edad} años
                            </td>
                            <td className="px-3 py-2.5">
                              <span
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold"
                                style={
                                  int.estado === "Activo"
                                    ? {
                                        background: "#dcfce7",
                                        color: "#15803d",
                                      }
                                    : {
                                        background: "#f3f4f6",
                                        color: "#6b7280",
                                      }
                                }
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    background:
                                      int.estado === "Activo"
                                        ? "#15803d"
                                        : "#9ca3af",
                                  }}
                                />
                                {int.estado}
                              </span>
                            </td>
                          </tr>
                        ))}
                        {detailGrupo.integrantes.length ===
                          0 && (
                          <tr>
                            <td
                              colSpan={4}
                              className="px-3 py-6 text-center text-xs text-muted-foreground"
                            >
                              Sin integrantes registrados
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                {/* Escenario */}
                
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-1.5">
                    <MapPin size={12} /> Espacio Deportivo
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-border">
                  
                    <div className="p-3 bg-white">
                      <p className="text-sm font-semibold text-foreground">
                        {detailGrupo.escenario}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MapPin size={10} />
                        {detailGrupo.escenarioUbicacion}
                      </p>
                    </div>
                  </div>
                  
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setDetailGrupo(null);
                      setForm({ ...detailGrupo });
                      setFormModal(true);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold hover:brightness-95 transition-all"
                    style={{ background: "var(--lime)" }}
                  >
                    Editar Grupo
                  </button>
                  <button
                    onClick={() => setDetailGrupo(null)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-muted hover:bg-border text-muted-foreground transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Form Modal ── */}
      <Modal
        open={formModal}
        onClose={() => setFormModal(false)}
        title={form.id ? "Editar Grupo" : "Nuevo Grupo"}
        subtitle="Configuración del grupo deportivo"
        footer={
          <>
            <BtnGhost onClick={() => setFormModal(false)}>
              Cancelar
            </BtnGhost>
            <BtnPrimary onClick={handleSave}>
              Guardar
            </BtnPrimary>
          </>
        }
      >
        <div className="space-y-4">
          <ModalField label="Nombre del grupo">
            <ModalInput
              value={form.nombre || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  nombre: e.target.value,
                }))
              }
              placeholder="Natación Inicial A"
            />
          </ModalField>
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Programa">
              <ModalSelect
                value={form.programa || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    programa: e.target.value,
                  }))
                }
              >
                <option value="">Seleccionar…</option>
                {[
                  "PRO ACUÁTICO",
                  "PRO RUEDAS",
                  "PRO CONJUNTO",
                  "PRO RAQUETAS",
                  "PRO ACT FÍSICA",
                  "PRO ARTES MARCIALES",
                  "PRO INDIVIDUAL",
                ].map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </ModalSelect>
            </ModalField>
            <ModalField label="Deporte">
              <ModalInput
                value={form.deporte || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    deporte: e.target.value,
                  }))
                }
                placeholder="Natación"
              />
            </ModalField>
            <ModalField label="Etapa">
              <ModalInput
                value={form.etapa || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    etapa: e.target.value,
                  }))
                }
                placeholder="Inicial"
              />
            </ModalField>
            <ModalField label="Nivel">
              <ModalInput
                value={form.nivel || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    nivel: e.target.value,
                  }))
                }
                placeholder="1"
              />
            </ModalField>
            <ModalField label="Cupos">
              <ModalInput
                type="number"
                value={form.cupos || ""}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    cupos: Number(e.target.value),
                  }))
                }
                placeholder="15"
              />
            </ModalField>
            <ModalField label="Estado">
              <ModalSelect
                value={form.estado || "Activo"}
                onChange={(e) =>
                  setForm((p) => ({
                    ...p,
                    estado: e.target.value as
                      | "Activo"
                      | "Inactivo",
                  }))
                }
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </ModalSelect>
            </ModalField>
          </div>
          <ModalField label="Instructor">
            <ModalInput
              value={form.instructor || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  instructor: e.target.value,
                }))
              }
              placeholder="Nombre del instructor"
            />
          </ModalField>
          <ModalField label="Escenario deportivo">
            <ModalInput
              value={form.escenario || ""}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  escenario: e.target.value,
                }))
              }
              placeholder="Piscina Olímpica Comfacauca"
            />
          </ModalField>
        </div>
      </Modal>
    </div>
  );
}