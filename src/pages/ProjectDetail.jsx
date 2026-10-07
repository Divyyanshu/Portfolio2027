import { Link, useParams, Navigate } from "react-router-dom";
import { PageShell, Reveal } from "../components/ui";
import PhoneMockup from "../components/PhoneMockup";
import { projects } from "../data";

function StoreLink({ href, children, primary }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" className={primary ? "btn-primary" : "btn-ghost"}>
      {children}
    </a>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return <Navigate to="/projects" replace />;

  const p = projects[idx];
  const next = projects[(idx + 1) % projects.length];

  // Always show 3 screens: real screenshots first, designed placeholders after.
  const variants = [p.variant, "dashboard", "form"];
  const screens = [0, 1, 2].map((i) => ({
    image: p.screenshots?.[i],
    variant: i === 0 ? p.variant : variants[i],
  }));

  return (
    <PageShell>
      <section className="container-x">
        <Link to="/projects" className="text-sm text-white/50 hover:text-white">
          ← All projects
        </Link>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: p.accent }}>
              {p.type}
            </div>
            <h1 className="mt-3 font-display text-5xl font-bold sm:text-7xl">{p.name}</h1>
            <p className="mt-5 max-w-xl text-lg text-white/65">{p.summary}</p>

            <div className="mt-6 grid max-w-md grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-white/40">Client</div>
                <div>{p.client}</div>
              </div>
              <div>
                <div className="text-white/40">Timeline</div>
                <div>{p.period}</div>
              </div>
              <div>
                <div className="text-white/40">Published</div>
                <div>{p.published}</div>
              </div>
              <div>
                <div className="text-white/40">Role</div>
                <div>Mobile developer</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <StoreLink href={p.links.playStore} primary>
                Google Play ↗
              </StoreLink>
              <StoreLink href={p.links.appStore}>App Store ↗</StoreLink>
              <StoreLink href={p.links.demo}>Website ↗</StoreLink>
            </div>
          </div>

          <div className="relative mx-auto h-[340px] w-full max-w-sm sm:h-[400px]">
            <div
              className="absolute inset-0 rounded-full opacity-25 blur-3xl"
              style={{ background: p.accent }}
            />
            <PhoneMockup
              variant={p.variant}
              accent={p.accent}
              image={p.screenshots?.[0]}
              label={p.name}
              float
              className="absolute left-1/2 top-0 -translate-x-1/2"
            />
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section className="container-x mt-24">
        <Reveal>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">App screens</h2>
        </Reveal>
        <Reveal i={1}>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {screens.map((s, i) => (
              <PhoneMockup key={i} variant={s.variant} accent={p.accent} image={s.image} label={p.name} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* CASE STUDY */}
      <section className="container-x mt-24 grid gap-6 md:grid-cols-2">
        <Reveal>
          <div className="glass h-full rounded-3xl p-7">
            <div className="mb-2 font-mono text-xs text-neon">The problem</div>
            <p className="leading-relaxed text-white/70">{p.problem}</p>
          </div>
        </Reveal>
        <Reveal i={1}>
          <div className="glass h-full rounded-3xl p-7">
            <div className="mb-2 font-mono text-xs text-lime">What I built</div>
            <p className="leading-relaxed text-white/70">{p.solution}</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x mt-6 grid gap-6 md:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <div className="glass h-full rounded-3xl p-7">
            <div className="mb-4 font-mono text-xs text-brand-400">Key features</div>
            <ul className="space-y-3 text-white/70">
              {p.features.map((f) => (
                <li key={f} className="flex gap-3">
                  <span style={{ color: p.accent }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal i={1}>
          <div className="glass h-full rounded-3xl p-7">
            <div className="mb-4 font-mono text-xs text-brand-400">Tech stack</div>
            <div className="flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* NEXT */}
      <section className="container-x mt-20">
        <Reveal>
          <Link
            to={`/projects/${next.slug}`}
            className="glass group flex items-center justify-between rounded-3xl p-7 transition hover:border-white/25"
          >
            <div>
              <div className="text-xs text-white/40">Next project</div>
              <div className="font-display text-2xl font-bold sm:text-3xl">{next.name}</div>
            </div>
            <span className="text-3xl transition group-hover:translate-x-2">→</span>
          </Link>
        </Reveal>
      </section>
    </PageShell>
  );
}
