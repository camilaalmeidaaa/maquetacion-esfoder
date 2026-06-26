import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Pencil,
  Plus,
  Image as ImgIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  ChevronDown,
  Check,
} from "lucide-react";
import { SkeletonCard } from "../../components/molecules/Skeleton";
import {
  Modal,
  ModalField,
  ModalInput,
  ModalSelect,
  ModalTextarea,
  BtnPrimary,
  BtnGhost,
} from "../../components/molecules/Modal";
import ProgramBadge from "../../components/molecules/ProgramBadge";

interface Deporte {
  id: number;
  codigo: string;
  nombre: string;
  estado: string;
  programaIds?: number[];
}

interface Programa {
  id: number;
  codigo: string;
  nombre: string;
  estado: string;
}

interface ModalidadesProps {
  deportes?: Deporte[];
  programas?: Programa[];
}

interface Modalidad {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  estado: "Activo" | "Inactivo";
  imagen: string;
  deporteId?: number;
}

const DEFAULT_PROGRAMAS: Programa[] = [
  { id: 1, codigo: "PRG-001", nombre: "PRO ACUÁTICO", estado: "Activo" },
  { id: 2, codigo: "PRG-002", nombre: "PRO RUEDAS", estado: "Activo" },
  { id: 3, codigo: "PRG-003", nombre: "PRO CONJUNTO", estado: "Activo" },
  { id: 4, codigo: "PRG-004", nombre: "PRO RAQUETAS", estado: "Activo" },
  { id: 5, codigo: "PRG-005", nombre: "PRO ACT FÍSICA", estado: "Activo" },
  { id: 6, codigo: "PRG-006", nombre: "PRO ARTES MARCIALES", estado: "Activo" },
  { id: 7, codigo: "PRG-007", nombre: "PRO INDIVIDUAL", estado: "Inactivo" },
];

const DEFAULT_DEPORTES: Deporte[] = [
  { id: 1, codigo: "DEP-001", nombre: "Natación", estado: "Activo", programaIds: [1] },
  { id: 2, codigo: "DEP-002", nombre: "Fútbol", estado: "Activo", programaIds: [3] },
  { id: 3, codigo: "DEP-003", nombre: "Tenis", estado: "Activo", programaIds: [4] },
  { id: 4, codigo: "DEP-004", nombre: "Atletismo", estado: "Activo", programaIds: [7, 5] },
  { id: 5, codigo: "DEP-005", nombre: "Baloncesto", estado: "Inactivo", programaIds: [3] },
  { id: 6, codigo: "DEP-006", nombre: "Patinaje", estado: "Activo", programaIds: [2] },
  { id: 7, codigo: "DEP-007", nombre: "Artes Marciales", estado: "Activo", programaIds: [6] },
  { id: 8, codigo: "DEP-008", nombre: "Voleibol", estado: "Activo", programaIds: [3] },
];

const SPORT_IMAGES = [
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=480&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1560090995-01632a28895b?w=480&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=480&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?w=480&h=300&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1595435742656-5272d0b3fa82?w=480&h=300&fit=crop&auto=format",
];

const INITIAL: Modalidad[] = [
  {
    id: 1,
    codigo: "MOD-001",
    nombre: "Natación Clásica",
    descripcion:
      "Programa acuático para niños de 4 a 10 años. Aprenden técnicas básicas en un ambiente seguro y divertido.",
    estado: "Activo",
    imagen: SPORT_IMAGES[0],
    deporteId: 1,
  },
  {
    id: 2,
    codigo: "MOD-002",
    nombre: "Natación aletas",
    descripcion:
      "Perfeccionamiento de estilos: crol, pecho, espalda y mariposa para competencias.",
    estado: "Activo",
    imagen: SPORT_IMAGES[1],
    deporteId: 1,
  },
  {
    id: 3,
    codigo: "MOD-003",
    nombre: "Fútbol Delanteros",
    descripcion:
      "Desarrollo de habilidades técnicas, tácticas y valores deportivos en edades tempranas.",
    estado: "Activo",
    imagen: SPORT_IMAGES[2],
    deporteId: 2,
  },
  {
    id: 4,
    codigo: "MOD-004",
    nombre: "Patinaje Recreativo",
    descripcion:
      "Modalidad recreativa de patinaje artístico y en línea para todas las edades.",
    estado: "Activo",
    imagen: SPORT_IMAGES[3],
    deporteId: 6,
  },
  {
    id: 5,
    codigo: "MOD-005",
    nombre: "Tenis  de mesa",
    descripcion:
      "Preparación intensiva para torneos regionales y ligas de tenis de campo.",
    estado: "Activo",
    imagen: SPORT_IMAGES[4],
    deporteId: 3,
  },
];

const getSportPrograms = (deporte: Deporte, programas: Programa[]): string[] => {
  if (deporte.programaIds?.length) {
    return deporte.programaIds
      .map((id) => programas.find((p) => p.id === id)?.nombre)
      .filter(Boolean) as string[];
  }
  return [];
};

const PAGE_SIZE = 6;

export default function Modalidades({ deportes = DEFAULT_DEPORTES, programas = DEFAULT_PROGRAMAS }: ModalidadesProps) {
  const [items, setItems] = useState<Modalidad[]>(INITIAL);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<Partial<Modalidad>>({});
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  // Filtros y búsqueda
  const [search, setSearch] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<"Todos" | "Activo" | "Inactivo">("Todos");
  const [deporteFilter, setDeporteFilter] = useState<number | "Todos">("Todos");

  // Select interactivo personalizado
  const [selectOpen, setSelectOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  // Cerrar select al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setSelectOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtrado de items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.nombre.toLowerCase().includes(search.toLowerCase()) ||
      item.codigo.toLowerCase().includes(search.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(search.toLowerCase());

    const matchesEstado = estadoFilter === "Todos" || item.estado === estadoFilter;
    const matchesDeporte = deporteFilter === "Todos" || item.deporteId === deporteFilter;

    return matchesSearch && matchesEstado && matchesDeporte;
  });

  const totalPages = Math.max(1, Math.ceil((filteredItems.length + 1) / PAGE_SIZE));

  // Ajustar página si el filtrado reduce drásticamente los resultados
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [filteredItems.length, totalPages, page]);

  const allCards = [...filteredItems, { id: -1 } as any];
  const paged = allCards.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  const openCreate = () => {
    setEditing({
      estado: "Activo",
      deporteId: deportes.length > 0 ? deportes[0].id : undefined
    });
    setModal(true);
    setSelectOpen(false);
  };

  const openEdit = (item: Modalidad) => {
    setEditing({ ...item });
    setModal(true);
    setSelectOpen(false);
  };

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setEditing((p) => ({ ...p, imagen: url }));
  };

  const handleSave = () => {
    if (editing.id) {
      setItems((p) =>
        p.map((i) =>
          i.id === editing.id
            ? ({ ...i, ...editing } as Modalidad)
            : i,
        ),
      );
    } else {
      setItems((p) => [
        ...p,
        {
          id: Date.now(),
          codigo: editing.codigo || `MOD-00${p.length + 1}`,
          nombre: editing.nombre || "Nueva Modalidad",
          descripcion: editing.descripcion || "",
          estado: editing.estado || "Activo",
          imagen:
            editing.imagen ||
            `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=480&h=300&fit=crop&auto=format`,
          deporteId: editing.deporteId,
        },
      ]);
    }
    setModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground tracking-tight">
            Gestión de Modalidades
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {filteredItems.length === items.length
              ? `${items.length} modalidades`
              : `${filteredItems.length} de ${items.length} modalidades`} · página {page} de {totalPages}
          </p>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="px-2 text-xs text-muted-foreground font-medium">
              {page}/{totalPages}
            </span>
            <button
              onClick={() =>
                setPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={page === totalPages}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:bg-muted disabled:opacity-30 transition-colors"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        )}
      </div>

      {/* Barra de buscar y Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 items-center bg-muted/20 p-3 rounded-2xl border border-border/50 shadow-sm">
        {/* Barra de buscar */}
        <div className="relative w-full sm:flex-1">
          <Search
            size={13}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/70"
          />
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Buscar modalidad por nombre, código o descripción..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/15 placeholder:text-muted-foreground/60 transition-all font-medium text-foreground"
          />
        </div>

        {/* Filtros */}
        <div className="flex w-full sm:w-auto gap-3 items-center">
          {/* Filtro Deporte */}
          <div className="relative flex-1 sm:w-48">
            <select
              value={deporteFilter}
              onChange={(e) => {
                const val = e.target.value;
                setDeporteFilter(val === "Todos" ? "Todos" : Number(val));
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/15 cursor-pointer transition-all text-foreground/80"
            >
              <option value="Todos">🎯 Todos los deportes</option>
              {deportes.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro Estado */}
          <div className="relative flex-shrink-0 w-36">
            <select
              value={estadoFilter}
              onChange={(e) => {
                setEstadoFilter(e.target.value as "Todos" | "Activo" | "Inactivo");
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs font-semibold bg-white border border-border rounded-xl outline-none focus:border-ring focus:ring-2 focus:ring-ring/15 cursor-pointer transition-all text-foreground/80"
            >
              <option value="Todos">💡 Todos los estados</option>
              <option value="Activo">🟢 Activos</option>
              <option value="Inactivo">🔴 Inactivos</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          : paged.map((item, i) => {
              if (item.id === -1) {
                return (
                  <motion.button
                    key="add-card"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={openCreate}
                    className="flex flex-col items-center justify-center gap-3 rounded-2xl border-2 bg-white min-h-[220px] transition-all hover:border-ring/50 hover:bg-muted/30 group"
                    style={{
                      borderStyle: "dashed",
                      borderColor: "var(--border)",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors"
                      style={{
                        background: "var(--lime-dim)",
                        border: "1px solid var(--lime-border)",
                      }}
                    >
                      <Plus
                        size={20}
                        style={{ color: "#3a7500" }}
                      />
                    </motion.div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-foreground">
                        Nueva Modalidad
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Haz clic para agregar
                      </p>
                    </div>
                  </motion.button>
                );
              }
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg hover:border-border transition-all duration-200"
                >
                  <div className="relative h-36 bg-muted">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between">
                      <span
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                        style={{
                          background: "rgba(0,0,0,0.5)",
                          color: "#fff",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        {item.codigo}
                      </span>
                      <span
                        className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                        style={
                          item.estado === "Activo"
                            ? {
                                background:
                                  "rgba(183,255,74,0.85)",
                                color: "#1a3c00",
                              }
                            : {
                                background: "rgba(0,0,0,0.5)",
                                color: "#ccc",
                                backdropFilter: "blur(4px)",
                              }
                        }
                      >
                        {item.estado}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Badges de los Programas (derivados del deporte) */}
                    {(() => {
                      const sport = deportes.find((d) => d.id === item.deporteId);
                      if (!sport) return null;
                      const programs = getSportPrograms(sport, programas);
                      return (
                        <div className="mb-2.5 flex flex-wrap gap-1">
                          {/* Badge de Deporte */}
                          <span
                            className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider border border-border/40 whitespace-nowrap"
                          >
                            🏃 {sport.nombre}
                          </span>
                          
                          {/* Badges de Programas */}
                          {programs.map((prog) => (
                              <ProgramBadge key={prog} nombre={prog} />
                            ))}
                        </div>
                      );
                    })()}

                    <h3 className="text-sm font-bold text-foreground mb-1">
                      {item.nombre}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.descripcion}
                    </p>
                    <button
                      onClick={() => openEdit(item)}
                      className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors group-hover:text-foreground"
                    >
                      <Pencil size={11} />
                      Editar modalidad
                    </button>
                  </div>
                </motion.div>
              );
            })}
      </div>

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={
          editing.id ? "Editar Modalidad" : "Nueva Modalidad"
        }
        subtitle="Complete todos los campos requeridos"
        size="lg"
        footer={
          <>
            <BtnGhost onClick={() => setModal(false)}>
              Cancelar
            </BtnGhost>
            <BtnPrimary onClick={handleSave}>
              Guardar modalidad
            </BtnPrimary>
          </>
        }
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <ModalField label="Código">
              <ModalInput
                value={editing.codigo || ""}
                onChange={(e) =>
                  setEditing((p) => ({
                    ...p,
                    codigo: e.target.value,
                  }))
                }
                placeholder="MOD-001"
              />
            </ModalField>
            <ModalField label="Estado">
              <ModalSelect
                value={editing.estado || "Activo"}
                onChange={(e) =>
                  setEditing((p) => ({
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
          <ModalField label="Nombre">
            <ModalInput
              value={editing.nombre || ""}
              onChange={(e) =>
                setEditing((p) => ({
                  ...p,
                  nombre: e.target.value,
                }))
              }
              placeholder="Nombre de la modalidad"
            />
          </ModalField>

          <ModalField label="Deporte Perteneciente">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setSelectOpen(!selectOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm bg-muted border border-border rounded-xl outline-none transition-all hover:bg-muted/70 focus:border-ring focus:bg-white focus:ring-2 focus:ring-ring/20 text-left font-medium"
              >
                <span className="text-foreground truncate pr-4">
                  {editing.deporteId
                    ? deportes.find((d) => d.id === editing.deporteId)?.nombre || "Seleccionar Deporte"
                    : "Seleccionar Deporte"}
                </span>
                <ChevronDown
                  size={14}
                  className={`text-muted-foreground transition-transform duration-200 flex-shrink-0 ${
                    selectOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {selectOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute z-50 w-full mt-1.5 bg-white border border-border rounded-xl shadow-xl max-h-48 overflow-y-auto p-1.5 space-y-0.5"
                    style={{
                      boxShadow: "0 10px 30px -5px rgba(0,0,0,0.12), 0 8px 15px -6px rgba(0,0,0,0.08)",
                    }}
                  >
                    {deportes.map((d) => {
                      const isSelected = editing.deporteId === d.id;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => {
                            setEditing((p) => ({ ...p, deporteId: d.id }));
                            setSelectOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-all text-left group/item ${
                            isSelected
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "hover:bg-muted text-foreground/80 hover:text-foreground font-medium"
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{
                                backgroundColor: d.estado === "Activo"
                                  ? (isSelected ? "#fff" : "var(--lime)")
                                  : "#9ca3af",
                              }}
                            />
                            <span className="truncate">{d.nombre}</span>
                            <span className={`text-[9px] flex-shrink-0 ${
                              isSelected ? "text-primary-foreground/75" : "text-muted-foreground/60"
                            }`}>
                              ({d.codigo})
                            </span>
                          </div>
                          {isSelected && <Check size={12} className="flex-shrink-0" />}
                        </button>
                      );
                    })}
                    {deportes.length === 0 && (
                      <div className="py-4 text-center text-xs text-muted-foreground">
                        No hay deportes creados
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ModalField>

          <ModalField label="Descripción">
            <ModalTextarea
              value={editing.descripcion || ""}
              onChange={(e) =>
                setEditing((p) => ({
                  ...p,
                  descripcion: e.target.value,
                }))
              }
              rows={3}
              placeholder="Describe los objetivos y características de esta modalidad..."
            />
          </ModalField>
          <ModalField label="Imagen">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files[0];
                if (f) handleFile(f);
              }}
              onClick={() => fileRef.current?.click()}
              className="relative rounded-xl border-2 border-dashed cursor-pointer transition-all overflow-hidden"
              style={{
                borderColor: dragOver
                  ? "var(--lime)"
                  : "var(--border)",
                background: dragOver
                  ? "var(--lime-dim)"
                  : "var(--muted)",
              }}
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                }}
              />
              {editing.imagen ? (
                <div className="relative">
                  <img
                    src={editing.imagen}
                    alt="preview"
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-xs font-semibold">
                      Cambiar imagen
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <ImgIcon
                    size={22}
                    className="text-muted-foreground"
                  />
                  <div className="text-center">
                    <p className="text-xs font-medium text-foreground">
                      Arrastra o haz clic para subir
                    </p>
                    <p className="text-[11px] text-muted-foreground">
                      PNG, JPG hasta 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </ModalField>
        </div>
      </Modal>
    </div>
  );
}