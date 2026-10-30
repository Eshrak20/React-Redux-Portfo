import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarDays,
  Code2,
  ExternalLink,
  FolderKanban,
} from "lucide-react";
import { Link } from "react-router-dom";
import { cardVariants, imageVariants } from "@/utils/projectAnimations";
import {
  getFirstTech,
  getProjectCategory,
  getProjectDescription,
  getProjectImage,
  getStatusClasses,
} from "@/utils/projectUtils";
import TechBadge from "./TechBadge";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const technologies = [
    getFirstTech(project.frontend_tech),
    getFirstTech(project.backend_tech),
    getFirstTech(project.database_tech),
  ].filter(Boolean);

  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-slate-950/5 dark:hover:shadow-black/20 sm:rounded-3xl"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-label={`View ${project.project_name} project`}
      >
        <div className="relative isolate aspect-[16/10] overflow-hidden bg-muted">
          <motion.img
            variants={imageVariants}
            src={getProjectImage(project)}
            alt={`${project.project_name} project preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />

          <div className="absolute left-4 top-4 flex max-w-[70%] items-center gap-2 rounded-full border border-white/15 bg-slate-950/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            <FolderKanban aria-hidden="true" size={14} />
            <span className="truncate">{getProjectCategory(project)}</span>
          </div>
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md ${getStatusClasses(
              project.status,
            )}`}
          >
            {project.status || "Project"}
          </span>

          <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md transition-colors group-hover:bg-primary">
              <ArrowUpRight aria-hidden="true" size={19} />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="line-clamp-1 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {project.project_name}
            </h3>
            {project.year && (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <CalendarDays aria-hidden="true" size={14} />
                {project.year}
              </span>
            )}
          </div>

          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
            {getProjectDescription(project)}
          </p>

          <div className="mt-5 flex min-h-7 flex-wrap gap-2">
            {technologies.length ? (
              technologies.map((technology, index) => (
                <TechBadge
                  key={`${technology}-${index}`}
                  label={technology}
                  color={["blue", "emerald", "purple"][index]}
                  className="px-2.5 py-1 text-xs"
                />
              ))
            ) : (
              <TechBadge
                icon={Code2}
                label="Software project"
                color="primary"
                className="px-2.5 py-1 text-xs"
              />
            )}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
            <span className="text-sm font-semibold text-primary">
              Explore case study
            </span>
            <ArrowUpRight
              aria-hidden="true"
              size={17}
              className="text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </div>
        </div>
      </Link>

      {project.live_url && (
        <a
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-5 mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mx-6 sm:mb-6"
        >
          <ExternalLink aria-hidden="true" size={14} />
          Live preview
        </a>
      )}
    </motion.article>
  );
};

export default ProjectCard;
