import type { CrudItem } from "../types";

export const seedProgramas: CrudItem[] = [
  { id: 1, codigo: "PRG-001", nombre: "PRO ACUÁTICO", estado: "Activo" },
  { id: 2, codigo: "PRG-002", nombre: "PRO RUEDAS", estado: "Activo" },
  { id: 3, codigo: "PRG-003", nombre: "PRO CONJUNTO", estado: "Activo" },
  { id: 4, codigo: "PRG-004", nombre: "PRO RAQUETAS", estado: "Activo" },
  { id: 5, codigo: "PRG-005", nombre: "PRO ACT FÍSICA", estado: "Activo" },
  { id: 6, codigo: "PRG-006", nombre: "PRO ARTES MARCIALES", estado: "Activo" },
  { id: 7, codigo: "PRG-007", nombre: "PRO INDIVIDUAL", estado: "Inactivo" },
];

export const seedDeportes: CrudItem[] = [
  { id: 1, codigo: "DEP-001", nombre: "Natación", estado: "Activo", programaIds: [1] },
  { id: 2, codigo: "DEP-002", nombre: "Fútbol", estado: "Activo", programaIds: [3] },
  { id: 3, codigo: "DEP-003", nombre: "Tenis", estado: "Activo", programaIds: [4] },
  { id: 4, codigo: "DEP-004", nombre: "Atletismo", estado: "Activo", programaIds: [7, 5] },
  { id: 5, codigo: "DEP-005", nombre: "Baloncesto", estado: "Inactivo", programaIds: [3] },
  { id: 6, codigo: "DEP-006", nombre: "Patinaje", estado: "Activo", programaIds: [2] },
  { id: 7, codigo: "DEP-007", nombre: "Artes Marciales", estado: "Activo", programaIds: [6] },
  { id: 8, codigo: "DEP-008", nombre: "Voleibol", estado: "Activo", programaIds: [3] },
];

export const seedEnfoques: CrudItem[] = [
  { id: 1, codigo: "ENF-001", nombre: "Formativo", estado: "Activo" },
  { id: 2, codigo: "ENF-002", nombre: "Competitivo", estado: "Activo" },
  { id: 3, codigo: "ENF-003", nombre: "Recreativo", estado: "Activo" },
];

export const seedEtapas: CrudItem[] = [
  { id: 1, codigo: "ETP-001", nombre: "Natacion de mantenimiento", estado: "Activo" },
  { id: 2, codigo: "ETP-002", nombre: "Natacion para la salud", estado: "Activo" },
  { id: 3, codigo: "ETP-003", nombre: "Madres cesantes natacion 1", estado: "Activo" },
  { id: 4, codigo: "ETP-004", nombre: "Madres cesantes natacion 2", estado: "Activo" },
  { id: 5, codigo: "ETP-005", nombre: "Estimulacion acuatica", estado: "Activo" },
  { id: 6, codigo: "ETP-006", nombre: "Iniciación acuatica", estado: "Activo" },
  { id: 7, codigo: "ETP-007", nombre: "Fundamentación acuatica", estado: "Activo" },
  { id: 8, codigo: "ETP-008", nombre: "Perfeccionamiento acuatico", estado: "Activo" },
  { id: 9, codigo: "ETP-009", nombre: "Irradiación acuatica", estado: "Activo" },
];

export const seedNiveles: CrudItem[] = [
  { id: 1, codigo: "NIV-001", nombre: "Adaptación y técnica acuática", estado: "Activo" },
  { id: 2, codigo: "NIV-002", nombre: "Desarrollo técnico acuático", estado: "Activo" },
  { id: 3, codigo: "NIV-003", nombre: "Mantenimiento y condición física acuática", estado: "Activo" },
  { id: 4, codigo: "NIV-004", nombre: "Adaptación acuática saludable", estado: "Activo" },
  { id: 5, codigo: "NIV-005", nombre: "Fortalecimiento acuático", estado: "Activo" },
  { id: 6, codigo: "NIV-006", nombre: "Bienestar acuático", estado: "Activo" },
  { id: 7, codigo: "NIV-007", nombre: "Movimiento acuático activo", estado: "Activo" },
  { id: 8, codigo: "NIV-008", nombre: "Acondicionamiento prenatal", estado: "Activo" },
  { id: 9, codigo: "NIV-009", nombre: "Movilidad y bienestar prenatal", estado: "Activo" },
  { id: 10, codigo: "NIV-010", nombre: "Ambientación inicial", estado: "Activo" },
  { id: 11, codigo: "NIV-011", nombre: "Afianzamiento y flotabilidad", estado: "Activo" },
  { id: 12, codigo: "NIV-012", nombre: "Movilidad y autonomía", estado: "Activo" },
  { id: 13, codigo: "NIV-013", nombre: "Globalidad y transición", estado: "Activo" },
  { id: 14, codigo: "NIV-014", nombre: "Explorando el agua", estado: "Activo" },
  { id: 15, codigo: "NIV-015", nombre: "Buceadores adaptados", estado: "Activo" },
  { id: 16, codigo: "NIV-016", nombre: "Flotación, desplazamiento y autonomía en el agua", estado: "Activo" },
  { id: 17, codigo: "NIV-017", nombre: "Impulsos y estilo libre", estado: "Activo" },
  { id: 18, codigo: "NIV-018", nombre: "Primeras espaldas", estado: "Activo" },
  { id: 19, codigo: "NIV-019", nombre: "Ranas acuáticas", estado: "Activo" },
  { id: 20, codigo: "NIV-020", nombre: "Tríada y transición", estado: "Activo" },
  { id: 21, codigo: "NIV-021", nombre: "Ambientación y familiarización", estado: "Activo" },
  { id: 22, codigo: "NIV-022", nombre: "Respiración, flotación y saltos al agua", estado: "Activo" },
  { id: 23, codigo: "NIV-023", nombre: "Libre básico", estado: "Activo" },
  { id: 24, codigo: "NIV-024", nombre: "Espalda básico", estado: "Activo" },
  { id: 25, codigo: "NIV-025", nombre: "Libre técnico", estado: "Activo" },
  { id: 26, codigo: "NIV-026", nombre: "Espalda técnico y salidas", estado: "Activo" },
  { id: 27, codigo: "NIV-027", nombre: "Pecho básico", estado: "Activo" },
  { id: 28, codigo: "NIV-028", nombre: "Mariposa básico", estado: "Activo" },
  { id: 29, codigo: "NIV-029", nombre: "Pecho y mariposa técnicos, vueltas y salidas", estado: "Activo" },
  { id: 30, codigo: "NIV-030", nombre: "Perfeccionamiento libre y espalda", estado: "Activo" },
  { id: 31, codigo: "NIV-031", nombre: "Perfeccionamiento pecho y mariposa", estado: "Activo" },
  { id: 32, codigo: "NIV-032", nombre: "Perfeccionamiento salidas y vueltas olímpicas", estado: "Activo" },
  { id: 33, codigo: "NIV-033", nombre: "Orientación y transición deportiva (triatlón, acuatlón, aletas, clásica)", estado: "Activo" },
];


export const seedTematicas: CrudItem[] = [

{id:1, codigo:"TEM-001", nombre:"Adaptación al medio acuático",estado:"Activo"},

{
id:2,
codigo:"TEM-002",
nombre:"Respiración acuática",
estado:"Activo"
},

{
id:3,
codigo:"TEM-003",
nombre:"Flotación",
estado:"Activo"
},

{
id:4,
codigo:"TEM-004",
nombre:"Desplazamientos básicos",
estado:"Activo"
},

{
id:5,
codigo:"TEM-005",
nombre:"Propulsión y patada",
estado:"Activo"
},

{
id:6,
codigo:"TEM-006",
nombre:"Coordinación motriz acuática",
estado:"Activo"
},

{
id:7,
codigo:"TEM-007",
nombre:"Seguridad y confianza en el agua",
estado:"Activo"
},

{
id:8,
codigo:"TEM-008",
nombre:"Estilos de natación",
estado:"Activo"
},

{
id:9,
codigo:"TEM-009",
nombre:"Técnica de crol",
estado:"Activo"
},

{
id:10,
codigo:"TEM-010",
nombre:"Técnica espalda",
estado:"Activo"
},

{
id:11,
codigo:"TEM-011",
nombre:"Técnica pecho",
estado:"Activo"
},

{
id:12,
codigo:"TEM-012",
nombre:"Resistencia acuática",
estado:"Activo"
}

];


export const seedLogros: CrudItem[] = [

{
id:1,
codigo:"LOG-001",
nombre:"Ingresa al agua con seguridad",
estado:"Activo"
},


{
id:2,
codigo:"LOG-002",
nombre:"Controla la respiración dentro del agua",
estado:"Activo"
},


{
id:3,
codigo:"LOG-003",
nombre:"Realiza flotación ventral y dorsal",
estado:"Activo"
},


{
id:4,
codigo:"LOG-004",
nombre:"Mantiene posición horizontal en el agua",
estado:"Activo"
},


{
id:5,
codigo:"LOG-005",
nombre:"Realiza desplazamientos con apoyo",
estado:"Activo"
},


{
id:6,
codigo:"LOG-006",
nombre:"Realiza desplazamientos independientes",
estado:"Activo"
},


{
id:7,
codigo:"LOG-007",
nombre:"Coordina movimientos de brazos y piernas",
estado:"Activo"
},


{
id:8,
codigo:"LOG-008",
nombre:"Ejecuta patada básica de crol",
estado:"Activo"
},


{
id:9,
codigo:"LOG-009",
nombre:"Realiza técnica básica de espalda",
estado:"Activo"
},


{
id:10,
codigo:"LOG-010",
nombre:"Ejecuta respiración lateral en estilo libre",
estado:"Activo"
},


{
id:11,
codigo:"LOG-011",
nombre:"Mejora resistencia durante la práctica acuática",
estado:"Activo"
},


{
id:12,
codigo:"LOG-012",
nombre:"Realiza estilos básicos de natación",
estado:"Activo"
}

];