import { motion } from "framer-motion";

// Designed placeholder screens. Replace by adding `screenshots` in data.js.
function Bars({ accent }) {
  return (
    <div className="space-y-2.5">
      {[78, 54, 90, 40].map((w, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: accent, opacity: 0.4 + i * 0.15 }} />
          <div className="h-2 rounded-full bg-white/15" style={{ width: `${w}%` }} />
        </div>
      ))}
    </div>
  );
}

function ScreenBody({ variant, accent, label }) {
  if (variant === "chat") {
    return (
      <div className="flex h-full flex-col gap-2.5 p-3">
        <div className="max-w-[75%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[9px] text-white/80">
          Hey! Is the build ready?
        </div>
        <div
          className="ml-auto max-w-[75%] rounded-2xl rounded-br-sm px-3 py-2 text-[9px] text-black"
          style={{ background: accent }}
        >
          Yes - pushed to the store 🚀
        </div>
        <div className="max-w-[60%] rounded-2xl rounded-bl-sm bg-white/10 px-3 py-2 text-[9px] text-white/80">
          Sending the report PDF
        </div>
        <div className="ml-auto flex w-[55%] items-center gap-2 rounded-2xl rounded-br-sm bg-white/10 p-2">
          <div className="h-9 w-9 rounded-lg" style={{ background: `${accent}55` }} />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 rounded bg-white/30" />
            <div className="h-1.5 w-2/3 rounded bg-white/20" />
          </div>
        </div>
        <div className="mt-auto flex items-center gap-2 rounded-full bg-white/10 px-3 py-2">
          <div className="h-1.5 flex-1 rounded bg-white/20" />
          <div className="h-5 w-5 rounded-full" style={{ background: accent }} />
        </div>
      </div>
    );
  }
  if (variant === "qr") {
    return (
      <div className="flex h-full flex-col items-center gap-3 p-4">
        <div className="text-[10px] font-semibold text-white/80">Scan to verify</div>
        <div className="relative grid h-28 w-28 grid-cols-7 gap-[3px] rounded-xl bg-white p-2">
          {Array.from({ length: 49 }).map((_, i) => (
            <div
              key={i}
              className="rounded-[1px]"
              style={{ background: (i * 7 + (i % 5) * 3) % 3 === 0 ? "#111" : "transparent" }}
            />
          ))}
          <div
            className="absolute left-0 right-0 h-0.5 animate-pulse"
            style={{ background: accent, top: "50%", boxShadow: `0 0 12px ${accent}` }}
          />
        </div>
        <div className="w-full rounded-xl bg-white/10 p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-7 w-7 rounded-full" style={{ background: `${accent}88` }} />
            <div className="flex-1 space-y-1">
              <div className="h-1.5 w-3/4 rounded bg-white/40" />
              <div className="h-1.5 w-1/2 rounded bg-white/20" />
            </div>
          </div>
          <Bars accent={accent} />
        </div>
        <div className="mt-auto w-full rounded-full py-2 text-center text-[9px] font-semibold text-black" style={{ background: accent }}>
          Verified ✓
        </div>
      </div>
    );
  }
  if (variant === "form") {
    return (
      <div className="flex h-full flex-col gap-2.5 p-3">
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="h-1 flex-1 rounded-full" style={{ background: i < 3 ? accent : "rgba(255,255,255,0.15)" }} />
          ))}
        </div>
        <div className="text-[10px] font-semibold text-white/80">Step 3 - KPI</div>
        {["Sales target", "Service count", "Manpower"].map((l) => (
          <div key={l}>
            <div className="mb-1 text-[8px] text-white/50">{l}</div>
            <div className="h-7 rounded-lg border border-white/10 bg-white/[0.06]" />
          </div>
        ))}
        <div className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
          <div className="h-8 w-8 rounded" style={{ background: `${accent}66` }} />
          <div className="text-[8px] text-white/60">Saved offline - will sync</div>
        </div>
        <div className="mt-auto rounded-full py-2 text-center text-[9px] font-semibold text-black" style={{ background: accent }}>
          Next
        </div>
      </div>
    );
  }
  // dashboard (default)
  return (
    <div className="flex h-full flex-col gap-2.5 p-3">
      <div className="text-[10px] font-semibold text-white/80">{label || "Dashboard"}</div>
      <div className="grid grid-cols-2 gap-2">
        {["Total", "Pending", "Done", "Reports"].map((l, i) => (
          <div key={l} className="rounded-xl bg-white/10 p-2">
            <div className="text-[8px] text-white/50">{l}</div>
            <div className="text-sm font-bold" style={{ color: i % 2 ? "#fff" : accent }}>
              {[128, 24, 104, 12][i]}
            </div>
          </div>
        ))}
      </div>
      <div className="flex h-16 items-end gap-1.5 rounded-xl bg-white/10 p-2">
        {[40, 65, 50, 80, 60, 95, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: accent, opacity: 0.4 + i * 0.09 }} />
        ))}
      </div>
      <div className="rounded-xl bg-white/10 p-2">
        <Bars accent={accent} />
      </div>
    </div>
  );
}

export default function PhoneMockup({ variant, accent, image, label, className = "", float = false }) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: -1 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className={`${float ? "animate-float" : ""} ${className}`}
    >
      <div
        className="relative mx-auto w-[170px] rounded-[32px] border border-white/15 bg-[#0b0a14] p-2 shadow-2xl"
        style={{ boxShadow: `0 30px 80px -20px ${accent}66` }}
      >
        <div className="absolute left-1/2 top-3 z-10 h-3 w-14 -translate-x-1/2 rounded-full bg-black" />
        <div className="relative aspect-[9/19] overflow-hidden rounded-[24px] bg-gradient-to-b from-[#15122a] to-[#0a0914]">
          {image ? (
            <img src={image.src} alt={image.alt || ""} className="h-full w-full object-cover" loading="lazy" />
          ) : (
            <div className="h-full pt-6">
              <ScreenBody variant={variant} accent={accent} label={label} />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
