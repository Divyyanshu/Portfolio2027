import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PageShell, Reveal, SectionTitle } from "../components/ui";
import PhoneMockup from "../components/PhoneMockup";
import ProjectCard from "../components/ProjectCard";
import { profile, stats, projects, achievements, testimonials, skills } from "../data";

function Typewriter({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(word.slice(0, text.length + 1));
          if (text.length + 1 === word.length) setTimeout(() => setDel(true), 1100);
        } else {
          setText(word.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((n) => n + 1);
          }
        }
      },
      del ? 40 : 85
    );
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="gradient-text">
      {text}
      <span className="ml-0.5 inline-block w-[2px] animate-pulse bg-neon align-middle" style={{ height: "0.9em" }} />
    </span>
  );
}

export default function Home() {
  const allSkills = skills.flatMap((g) => g.items);

  return (
    <PageShell>
      {/* HERO */}
      <section className="container-x relative grid min-h-[78vh] items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/70"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime" />
            Open to new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="font-display text-5xl font-bold leading-[1.05] sm:text-7xl"
          >
            Hi, I'm <br />
            <span className="gradient-text">{profile.name}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-5 h-9 font-display text-2xl font-semibold text-white/90 sm:text-3xl"
          >
            <Typewriter words={profile.roles} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 max-w-xl text-lg text-white/65"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link to="/projects" className="btn-primary">
              View my work →
            </Link>
            <Link to="/contact" className="btn-ghost">
              Get in touch
            </Link>
            <a href={profile.links.resume} className="btn-ghost" target="_blank" rel="noreferrer">
              Resume ↓
            </a>
          </motion.div>
        </div>

        <div className="relative hidden h-[460px] md:block">
          <PhoneMockup
            variant={projects[0].variant}
            accent={projects[0].accent}
            image={projects[0].screenshots?.[0]}
            label="Daksh"
            float
            className="absolute left-4 top-6 z-20 -rotate-6"
          />
          <PhoneMockup
            variant={projects[2].variant}
            accent={projects[2].accent}
            image={projects[2].screenshots?.[0]}
            className="absolute right-0 top-24 z-10 rotate-6 scale-95 opacity-90"
          />
        </div>
      </section>

      {/* STATS */}
      <section className="container-x mt-10">
        <div className="glass grid grid-cols-2 gap-6 rounded-3xl p-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} i={i} className="text-center">
              <div className="gradient-text font-display text-4xl font-bold sm:text-5xl">{s.value}</div>
              <div className="mt-1 text-sm text-white/55">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TECH MARQUEE */}
      <section className="mt-16 overflow-hidden border-y border-line py-5">
        <div className="flex w-max animate-marquee gap-4">
          {[...allSkills, ...allSkills].map((s, i) => (
            <span key={i} className="chip whitespace-nowrap !px-5 !py-2 !text-sm">
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="container-x mt-28">
        <SectionTitle
          eyebrow="Selected work"
          title="Apps I've shipped to the stores"
          sub="Four production apps, each with its own architecture and set of problems to solve."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} i={i}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link to="/projects" className="btn-ghost">
            See all projects →
          </Link>
        </Reveal>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="container-x mt-28">
        <SectionTitle eyebrow="Achievements" title="Problems solved under pressure" />
        <div className="grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.title} i={i}>
              <div className="glass h-full rounded-3xl p-7 transition hover:border-brand-400/50">
                <span className="chip !text-neon">{a.tag}</span>
                <h3 className="mt-4 font-display text-xl font-bold">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{a.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x mt-28">
        <SectionTitle eyebrow="Testimonials" title="What people say" />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} i={i}>
              <figure className="glass flex h-full flex-col rounded-3xl p-7">
                <div className="font-display text-5xl leading-none text-brand-400">“</div>
                <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-neon font-bold text-black">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-white/50">{t.role}</div>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x mt-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-brand-600/30 via-transparent to-neon/10 p-10 text-center sm:p-16">
            <h2 className="font-display text-3xl font-bold sm:text-5xl">Have an app idea or a role in mind?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/65">
              I'm open to full-time roles, startups and freelance mobile projects. Let's build something solid.
            </p>
            <Link to="/contact" className="btn-primary mt-8">
              Start a conversation →
            </Link>
          </div>
        </Reveal>
      </section>
    </PageShell>
  );
}
