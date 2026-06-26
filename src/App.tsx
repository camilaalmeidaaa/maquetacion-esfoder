import { useState } from "react";
import { Toaster } from "sonner";
import MainLayout from "./components/templates/MainLayout";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import ProgramasPage from "./pages/Programas/ProgramasPage";
import DeportesPage from "./pages/Deportes/DeportesPage";
import EnfoquesPage from "./pages/Enfoques/EnfoquesPage";
import ModalidadesPage from "./pages/Modalidades/ModalidadesPage";
import InstructoresPage from "./pages/Instructores/InstructoresPage";
import EtapasPage from "./pages/Etapas/EtapasPage";
import NivelesPage from "./pages/Niveles/NivelesPage";
import GruposPage from "./pages/Grupos/GruposPage";
import MatriculasPage from "./pages/Matriculas/MatriculasPage";
import LineaDeportivaPage from "./pages/Linea/LineaDeportivaPage";
import CursosPage from "./pages/Cursos/CursosPage";
import LogrosPage from "./pages/Logros/LogrosPage";
import TematicasPage from "./pages/Tematicas/TematicasPage";


import { useCrud } from "./hooks/useCrud";
import { seedProgramas, seedDeportes, seedEnfoques, seedEtapas, seedNiveles , seedLogros, seedTematicas} from "./services/seedData";
import { BREADCRUMBS } from "./constants/navigation";
import type { Section } from "./types";

export default function App() {
  const [section, setSection] = useState<Section>("dashboard");
  const [globalSearch, setGlobalSearch] = useState("");

  const programas = useCrud(seedProgramas, "Programa");
  const deportes = useCrud(seedDeportes, "Deporte");
  const enfoques = useCrud(seedEnfoques, "Enfoque");
  const etapas = useCrud(seedEtapas, "Etapas");
  const niveles = useCrud(seedNiveles, "Niveles");
  const logros = useCrud(seedLogros, "Logros");
  const tematicas = useCrud(seedTematicas, "Tematicas");



  const handleNav = (s: Section) => {
    setSection(s);
    setGlobalSearch("");
  };

  const renderPage = () => {
    switch (section) {
      case "dashboard":
        return <DashboardPage />;
      case "programas":
        return <ProgramasPage {...programas} />;
      case "deportes":
        return (
          <DeportesPage
            items={deportes.items}
            onSave={deportes.onSave}
            onToggle={deportes.onToggle}
            programas={programas.items}
          />
        );
      case "enfoques":
        return <EnfoquesPage {...enfoques} />;
      case "modalidades":
        return (
          <ModalidadesPage
            deportes={deportes.items}
            programas={programas.items}
          />
        );
      case "instructores":
        return <InstructoresPage />;

      case "etapas":
        return <EtapasPage {...etapas} />;
      case "niveles":
        return <NivelesPage {...niveles} />;
      case "logros":
        return <LogrosPage {...logros} />;

      case "tematicas":
        return <LogrosPage {...tematicas} />;

      case "grupos":
        return <GruposPage />;
      case "matriculas":
        return <MatriculasPage />;
      case "linea":
        return <LineaDeportivaPage />;

      case "cursos":
        return <CursosPage />;
      
      default:
        return <DashboardPage />;
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        toastOptions={{
          style: { borderRadius: "12px", fontSize: "13px" },
        }}
      />

      <MainLayout
        section={section}
        onSectionChange={handleNav}
        breadcrumbs={BREADCRUMBS[section]}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
      >
        {renderPage()}
      </MainLayout>
    </>
  );
}
