import { motion } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Reveal({ children, i = 0, className = "" }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={i}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({ eyebrow, title, sub }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <div className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-neon">{eyebrow}</div>
      <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-white/60">{sub}</p>}
    </Reveal>
  );
}

export function PageShell({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="relative z-10 pt-28"
    >
      {children}
    </motion.main>
  );
}
