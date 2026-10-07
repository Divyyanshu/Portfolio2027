import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";

export default function ProjectCard({ p, index = 0 }) {
  const shot = p.screenshots?.[0];
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 220, damping: 20 }}>
      <Link
        to={`/projects/${p.slug}`}
        className="glass group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition hover:border-white/20 sm:flex-row sm:items-center sm:gap-6"
      >
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-20 blur-3xl transition group-hover:opacity-40"
          style={{ background: p.accent }}
        />
        <div className="relative z-10 flex-1">
          <div className="mb-2 font-mono text-xs" style={{ color: p.accent }}>
            0{index + 1} - {p.type}
          </div>
          <h3 className="font-display text-2xl font-bold">{p.name}</h3>
          <p className="mt-2 text-sm text-white/60">{p.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.stack.slice(0, 4).map((s) => (
              <span key={s} className="chip">
                {s}
              </span>
            ))}
          </div>
          <div className="mt-5 text-sm font-semibold text-white/80 transition group-hover:translate-x-1">
            View case study →
          </div>
        </div>
        <div className="relative z-10 mx-auto mt-6 scale-90 sm:mt-0">
          <PhoneMockup variant={p.variant} accent={p.accent} image={shot} label={p.name} />
        </div>
      </Link>
    </motion.div>
  );
}
