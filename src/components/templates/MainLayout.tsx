import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import Sidebar from "../organisms/Sidebar";
import AppHeader from "../organisms/AppHeader";
import AppFooter from "../organisms/AppFooter";
import type { Section } from "../../types";

interface MainLayoutProps {
  section: Section;
  onSectionChange: (section: Section) => void;
  breadcrumbs: string[];
  globalSearch: string;
  onGlobalSearchChange: (value: string) => void;
  children: ReactNode;
}

export default function MainLayout({
  section,
  onSectionChange,
  breadcrumbs,
  globalSearch,
  onGlobalSearchChange,
  children,
}: MainLayoutProps) {
  return (
    <div
      className="min-h-screen flex bg-background"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Sidebar active={section} onChange={onSectionChange} />

      <div className="flex-1 flex flex-col min-h-screen w-full min-w-0"
      >
        <AppHeader
          breadcrumbs={breadcrumbs}
          globalSearch={globalSearch}
          onGlobalSearchChange={onGlobalSearchChange}
        />

        <main className="flex-1 p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        <AppFooter />
      </div>
    </div>
  );
}
