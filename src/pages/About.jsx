import { PageShell, Reveal, SectionTitle } from "../components/ui";
import {
  profile,
  skills,
  education,
  certifications,
  achievements,
} from "../data";
import profileImage from "../assests/image/profilepink.png";

export default function About() {
  return (
    <PageShell>
      <section className="container-x">
        <SectionTitle
          eyebrow="About me"
          title="Mobile engineer who owns the outcome"
        />

        <div className="grid items-start gap-10 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="glass relative overflow-hidden rounded-3xl p-3">
              {/* REPLACE this block with <img src="/me.jpg" className="w-full rounded-2xl" /> */}
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl">
                <img
                  src={profileImage}
                  alt="DT Profile"
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <div className="font-display text-xl font-bold">
                  {profile.name}
                </div>
                <div className="text-sm text-white/55">{profile.role}</div>
                <div className="mt-1 text-sm text-white/40">
                  {profile.location}
                </div>
              </div>
            </div>
          </Reveal>

          <div className="space-y-5 text-white/70">
            {profile.about.map((p, i) => (
              <Reveal key={i} i={i}>
                <p className="text-lg leading-relaxed">{p}</p>
              </Reveal>
            ))}
            <Reveal i={3}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={profile.links.resume}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Download resume ↓
                </a>
                <a
                  href={profile.links.linkedin}
                  className="btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={profile.links.github}
                  className="btn-ghost"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="container-x mt-28">
        <SectionTitle eyebrow="Toolbox" title="Skills & technologies" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} i={i}>
              <div className="glass h-full rounded-3xl p-6">
                <div className="mb-4 font-display text-lg font-semibold text-brand-400">
                  {g.group}
                </div>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="container-x mt-28">
        <SectionTitle eyebrow="Highlights" title="Moments I'm proud of" />
        <div className="space-y-4">
          {achievements.map((a, i) => (
            <Reveal key={a.title} i={i}>
              <div className="glass flex flex-col gap-3 rounded-3xl p-6 sm:flex-row sm:items-start sm:gap-6">
                <span className="chip w-fit !text-lime">{a.tag}</span>
                <div>
                  <h3 className="font-display text-lg font-bold">{a.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">
                    {a.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section className="container-x mt-28">
        <SectionTitle eyebrow="Education" title="Background" />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="glass rounded-3xl p-7">
              <div className="font-mono text-xs text-neon">
                {education.period}
              </div>
              <h3 className="mt-2 font-display text-xl font-bold">
                {education.degree}
              </h3>
              <p className="mt-1 text-sm text-white/60">{education.school}</p>
              <p className="text-sm text-white/40">{education.place}</p>
            </div>
          </Reveal>
          <Reveal i={1}>
            <div className="glass h-full rounded-3xl p-7">
              <div className="mb-3 font-mono text-xs text-neon">
                Certifications
              </div>
              <ul className="space-y-2 text-sm text-white/70">
                {certifications.map((c) => (
                  <li key={c} className="flex gap-2">
                    <span className="text-lime">✓</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
