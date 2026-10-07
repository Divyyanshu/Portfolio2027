import { PageShell, Reveal, SectionTitle } from "../components/ui";
import { experience } from "../data";

export default function Experience() {
  return (
    <PageShell>
      <section className="container-x">
        <SectionTitle
          eyebrow="Experience"
          title="Where I've worked"
          sub="From Flutter apps to MERN projects to production React Native products."
        />

        <div className="relative space-y-8 pl-8 sm:pl-12">
          <div className="absolute bottom-0 left-[11px] top-2 w-px bg-gradient-to-b from-brand-400 via-neon/50 to-transparent sm:left-[19px]" />

          {experience.map((e, i) => (
            <Reveal key={e.company + e.period} i={i}>
              <div className="relative">
                <span
                  className={`absolute -left-[26px] top-6 h-3.5 w-3.5 rounded-full border-2 border-ink sm:-left-[38px] ${
                    i === 0 ? "bg-lime shadow-[0_0_14px_#c6ff3d]" : "bg-brand-400"
                  }`}
                />
                <div className="glass rounded-3xl p-6 transition hover:border-brand-400/40 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="font-display text-xl font-bold sm:text-2xl">{e.role}</h3>
                      <div className="text-brand-400">
                        {e.company} <span className="text-white/35">- {e.place}</span>
                      </div>
                    </div>
                    <span className="chip !text-neon">{e.period}</span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm leading-relaxed text-white/65">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {e.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
