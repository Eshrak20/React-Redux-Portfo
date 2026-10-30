import ProjectCard from "@/components/ProjectsCard/ProjectCard";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HomeProjects = ({ projects = [] }) => {
  const reduceMotion = useReducedMotion();
  const featuredProjects = projects.slice(0, 6);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-muted/40 px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="pointer-events-none absolute -right-36 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles aria-hidden="true" size={15} />
              Selected work
            </p>
            <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Built to solve
              <span className="text-primary"> real problems.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              A selection of products and experiments shaped around useful
              experiences, thoughtful engineering, and the details that make
              software feel right.
            </p>
          </div>

          <Link
            to="/projects"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:self-auto"
          >
            View all projects
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {featuredProjects.length ? (
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -80px 0px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
          >
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id || project.slug} project={project} />
            ))}
          </motion.div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-background/70 px-6 py-12 text-center text-muted-foreground">
            Projects will appear here once they are available.
          </p>
        )}
      </div>
    </section>
  );
};

export default HomeProjects;
