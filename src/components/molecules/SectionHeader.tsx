import { ReactNode } from "react";
import { motion } from "motion/react";

interface SectionHeaderProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
}

export default function SectionHeader({
  icon,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex flex-col items-center text-center mb-8"
    >
      {/* Gradient icon badge */}

      <motion.h1
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="text-2xl font-bold tracking-tight text-foreground"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        className="text-sm text-muted-foreground mt-1.5 max-w-md"
      >
        {subtitle}
      </motion.p>

      {/* Decorative underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.22, duration: 0.4 }}
        className="mt-3 h-0.5 w-16 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, #B7FF4A, #FFD54F)",
        }}
      />
    </motion.div>
  );
}