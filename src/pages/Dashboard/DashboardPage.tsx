import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Layers,
  Dumbbell,
  Shuffle,
  Users,
  UsersRound,
  ClipboardList,
  ArrowUpRight,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  LabelList,
  AreaChart,
  Area,
} from "recharts";
import { SkeletonKPI, SkeletonRow } from "../../components/molecules/Skeleton";

// ── Data ────────────────────────────────────────────────────
const kpis = [
  {
    label: "Total Programas",
    value: 7,
    icon: Layers,
    color: "#B7FF4A",
    bg: "rgba(183,255,74,0.10)",
    trend: "+2",
  },
  {
    label: "Total Deportes",
    value: 8,
    icon: Dumbbell,
    color: "#818cf8",
    bg: "rgba(129,140,248,0.10)",
    trend: "+1",
  },
  {
    label: "Total Modalidades",
    value: 12,
    icon: Shuffle,
    color: "#fb7185",
    bg: "rgba(251,113,133,0.10)",
    trend: "+3",
  },
  {
    label: "Total Instructores",
    value: 18,
    icon: Users,
    color: "#34d399",
    bg: "rgba(52,211,153,0.10)",
    trend: "+4",
  },
  {
    label: "Total Grupos",
    value: 24,
    icon: UsersRound,
    color: "#FFD54F",
    bg: "rgba(255,213,79,0.10)",
    trend: "+6",
  },
  {
    label: "Total Matrículas",
    value: 312,
    icon: ClipboardList,
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.10)",
    trend: "+48",
  },
];

// Chart 1 – donut
const donutData = [
  { name: "Monitor", value: 6 },
  { name: "Contratista I", value: 5 },
  { name: "Contratista II", value: 4 },
  { name: "Entrenador", value: 3 },
];
const DONUT_COLORS = [
  "#B7FF4A",
  "#FFD54F",
  "#818cf8",
  "#fb7185",
];

// Chart 2 – line
const lineData = [
  { mes: "Ene", m: 38 },
  { mes: "Feb", m: 52 },
  { mes: "Mar", m: 61 },
  { mes: "Abr", m: 45 },
  { mes: "May", m: 74 },
  { mes: "Jun", m: 68 },
  { mes: "Jul", m: 82 },
  { mes: "Ago", m: 91 },
  { mes: "Sep", m: 76 },
  { mes: "Oct", m: 88 },
  { mes: "Nov", m: 95 },
  { mes: "Dic", m: 110 },
];

// Chart 3 – horizontal bars
const hBarData = [
  { programa: "PRO ACUÁTICO", i: 78 },
  { programa: "PRO RUEDAS", i: 54 },
  { programa: "PRO CONJUNTO", i: 42 },
  { programa: "PRO RAQUETAS", i: 31 },
  { programa: "PRO ACT FÍSICA", i: 28 },
  { programa: "PRO ARTES MARCIALES", i: 19 },
  { programa: "PRO INDIVIDUAL", i: 14 },
];

// Chart 4 – area
const areaData = [
  { mes: "Ene", r: 4800000, p: 3200000 },
  { mes: "Feb", r: 6200000, p: 5000000 },
  { mes: "Mar", r: 7800000, p: 6400000 },
  { mes: "Abr", r: 5500000, p: 4800000 },
  { mes: "May", r: 9200000, p: 7500000 },
  { mes: "Jun", r: 8600000, p: 7100000 },
];

// Recent matrículas
const recentMat = [
  {
    codigo: "MAT-312",
    participante: "Laura García",
    programa: "PRO ACUÁTICO",
    grupo: "G-01",
    fecha: "2026-06-09",
    estado: "Matriculado",
  },
  {
    codigo: "MAT-311",
    participante: "Carlos Ruiz",
    programa: "PRO RUEDAS",
    grupo: "G-03",
    fecha: "2026-06-08",
    estado: "Inscrito",
  },
];

const ESTADO_CFG: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  Matriculado: {
    bg: "#dcfce7",
    text: "#15803d",
    border: "#bbf7d0",
  },
  Inscrito: {
    bg: "#dbeafe",
    text: "#1d4ed8",
    border: "#bfdbfe",
  },
  Pendiente: {
    bg: "#fef9c3",
    text: "#a16207",
    border: "#fef08a",
  },
  Cancelado: {
    bg: "#fee2e2",
    text: "#dc2626",
    border: "#fecaca",
  },
};

// ── Custom tooltip ───────────────────────────────────────────
function ChartTip({
  active,
  payload,
  label,
  prefix = "",
  suffix = "",
}: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white rounded-xl shadow-xl border border-border px-3 py-2.5 text-xs">
      <p className="font-semibold text-foreground mb-1">
        {label}
      </p>
      {payload.map((p: any, i: number) => (
        <p
          key={i}
          style={{ color: p.color }}
          className="font-medium"
        >
          {p.name}: {prefix}
          {typeof p.value === "number" && p.value > 100000
            ? `$${(p.value / 1000000).toFixed(1)}M`
            : p.value}
          {suffix}
        </p>
      ))}
    </div>
  );
}

// ── Chart card wrapper ───────────────────────────────────────
function ChartCard({
  title,
  badge,
  children,
  delay = 0,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-white rounded-2xl p-5 border border-border hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-foreground">
          {title}
        </h3>
        {badge && <span className="lime-pill">{badge}</span>}
      </div>
      {children}
    </motion.div>
  );
}

// ── Component ────────────────────────────────────────────────
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="space-y-7">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center pt-2"
      >
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-3 border"
          style={{
            background: "var(--lime-dim)",
            borderColor: "var(--lime-border)",
            color: "#2d5a00",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
          Panel Activo — Junio 2026
        </div>
        <h1
          className="text-3xl font-bold text-foreground tracking-tight"
          style={{ letterSpacing: "-0.025em" }}
        >
          Bienvenido, Coordinador Deportivo
        </h1>
      </motion.div>

      {/* KPI grid — 6 cards, 3 cols */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <SkeletonKPI key={i} />
            ))
          : kpis.map((k, i) => {
              const Icon = k.icon;
              return (
                <motion.div
                  key={k.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.28,
                  }}
                  className="bg-white rounded-2xl p-4 border border-border hover:border-ring/30 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-default group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="p-2 rounded-xl"
                      style={{ background: k.bg }}
                    >
                      <Icon
                        size={15}
                        style={{ color: k.color }}
                      />
                    </div>
                    <div
                      className="flex items-center gap-1 text-[10px] font-semibold"
                      style={{ color: k.color }}
                    >
                      <TrendingUp size={10} />
                      {k.trend}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground tracking-tight">
                    {k.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {k.label}
                  </p>
                  <div className="mt-2.5 h-0.5 rounded-full w-full overflow-hidden bg-muted">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (k.value / (kpis.reduce((a, b) => Math.max(a, b.value), 0) || 1)) * 100)}%`,
                      }}
                      transition={{
                        delay: i * 0.05 + 0.4,
                        duration: 0.5,
                      }}
                      className="h-full rounded-full"
                      style={{ background: k.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
      </div>

      {/* Charts — 2×2 grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1 – Donut: instructores por perfil */}
        <ChartCard
          title="Instructores por Perfil"
          badge="18 total"
          delay={0.25}
        >
          <p className="text-xs text-muted-foreground mb-3">
            Distribución por tipo de contratación
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={58}
                outerRadius={82}
                dataKey="value"
                paddingAngle={3}
                strokeWidth={0}
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={DONUT_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTip />} />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 2 – Line: matrículas por mes */}
        <ChartCard
          title="Matriculados por Mes"
          badge="2026"
          delay={0.3}
        >
          <p className="text-xs text-muted-foreground mb-3">
            Tendencia anual de inscripciones
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={lineData} margin={{ left: -24 }}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f2f5"
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<ChartTip suffix=" mat." />} />
              <Line
                dataKey="m"
                name="Matrículas"
                stroke="#f25f8d"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#ec3c80", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#f25f8d" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 3 – Horizontal bars: inscritos por programa */}
        <ChartCard
          title="Inscritos por Programa"
          badge="7 programas"
          delay={0.35}
        >
          <p className="text-xs text-muted-foreground mb-3">
            Cantidad de participantes por programa activo
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <BarChart
              data={hBarData}
              layout="vertical"
              margin={{ left: 0, right: 28 }}
            >
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="programa"
                tick={{ fontSize: 9.5, fill: "#6b7280" }}
                axisLine={false}
                tickLine={false}
                width={110}
              />
              <Tooltip
                content={<ChartTip suffix=" inscritos" />}
              />
              <Bar
                dataKey="i"
                name="Inscritos"
                fill="#B7FF4A"
                radius={[0, 6, 6, 0]}
                barSize={14}
              >
                <LabelList
                  dataKey="i"
                  position="right"
                  style={{ fontSize: 10, fill: "#6b7280" }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Chart 4 – Area: dinero entrante */}
        <ChartCard
          title="Dinero Entrante por Mes"
          badge="2026"
          delay={0.4}
        >
          <p className="text-xs text-muted-foreground mb-3">
            Recaudo real vs. proyectado mensual
          </p>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={areaData} margin={{ left: -10 }}>
              <defs>
                <linearGradient
                  id="gradReal"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#B7FF4A"
                    stopOpacity={0.25}
                  />
                  <stop
                    offset="95%"
                    stopColor="#B7FF4A"
                    stopOpacity={0}
                  />
                </linearGradient>
                <linearGradient
                  id="gradProy"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#FFD54F"
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor="#FFD54F"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f0f2f5"
                vertical={false}
              />
              <XAxis
                dataKey="mes"
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 9, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) =>
                  `$${(v / 1e6).toFixed(1)}M`
                }
              />
              <Tooltip content={<ChartTip />} />
              <Area
                dataKey="r"
                name="Recaudo"
                stroke="#B7FF4A"
                strokeWidth={2}
                fill="url(#gradReal)"
                dot={false}
              />
              <Area
                dataKey="p"
                name="Proyectado"
                stroke="#FFD54F"
                strokeWidth={2}
                fill="url(#gradProy)"
                strokeDasharray="4 3"
                dot={false}
              />
              <Legend
                iconType="circle"
                iconSize={7}
                wrapperStyle={{
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Recent table */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl border border-border overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Últimas Matrículas Registradas
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Actividad reciente del sistema
            </p>
          </div>
          <span className="lime-pill flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-lime-500 animate-pulse" />
            En vivo
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                {[
                  "Código",
                  "Participante",
                  "Programa",
                  "Grupo",
                  "Fecha",
                  "Estado",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonRow key={i} cols={6} />
                  ))
                : recentMat.map((m, i) => {
                    const cfg =
                      ESTADO_CFG[m.estado] ||
                      ESTADO_CFG.Pendiente;
                    return (
                      <motion.tr
                        key={m.codigo}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.55 + i * 0.05 }}
                        className="border-b border-border/60 hover:bg-muted/30 transition-colors"
                      >
                        <td className="px-5 py-3 text-[11px] font-mono text-muted-foreground">
                          {m.codigo}
                        </td>
                        <td className="px-5 py-3 text-sm font-semibold text-foreground">
                          {m.participante}
                        </td>
                        <td className="px-5 py-3 text-xs font-medium text-muted-foreground">
                          {m.programa}
                        </td>
                        <td className="px-5 py-3">
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                            {m.grupo}
                          </span>
                        </td>
                        <td className="px-5 py-3 text-[11px] font-mono text-muted-foreground">
                          {m.fecha}
                        </td>
                        <td className="px-5 py-3">
                          <span
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
                            style={{
                              background: cfg.bg,
                              color: cfg.text,
                              borderColor: cfg.border,
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ background: cfg.text }}
                            />
                            {m.estado}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}