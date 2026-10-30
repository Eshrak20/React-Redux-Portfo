import { motion } from "framer-motion";
import { FolderKanban, Sparkles } from "lucide-react";
import Pagination from "@/components/Pagination/Pagination";
import { containerVariants } from "@/utils/projectAnimations";
import ProjectCard from "./ProjectCard";

const ProjectsCard = ({
  projects = [],
  pagination,
  setPage,
  isFetching = false,
}) => (
  <section className="bg-background px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <header className="mb-9 border-b border-border pb-6 sm:mb-12 sm:flex sm:items-end sm:justify-between sm:gap-8">
        <div className="max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
            <Sparkles aria-hidden="true" size={15} />
            The portfolio
          </p>
          <h2 className="text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Projects &amp; products
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Explore selected work across web, mobile, and full-stack
            development.
          </p>
        </div>
        <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3.5 py-2 text-xs font-semibold text-muted-foreground sm:mt-0">
          <FolderKanban aria-hidden="true" size={15} />
          {pagination?.total ?? projects.length} projects
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px 100px 0px" }}
        className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
      >
        {projects.length ? (
          projects.map((project) => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))
        ) : (
          <div className="col-span-full rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
            <h3 className="text-xl font-bold text-foreground">
              No projects found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Try changing your filters to see more work.
            </p>
          </div>
        )}
      </motion.div>

      {pagination && setPage && (
        <div className="mt-10 sm:mt-12">
          <Pagination
            pagination={pagination}
            setPage={setPage}
            isFetching={isFetching}
            label="projects"
          />
        </div>
      )}
    </div>
  </section>
);

export default ProjectsCard;
