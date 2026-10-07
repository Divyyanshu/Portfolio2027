import { PageShell, Reveal, SectionTitle } from "../components/ui";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data";

export default function Projects() {
  return (
    <PageShell>
      <section className="container-x">
        <SectionTitle
          eyebrow="Projects"
          title="Four apps. Live on the stores."
          sub="Open any project for the problem, my approach, key features and store links."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} i={i}>
              <ProjectCard p={p} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
