import {
  getFirstTech,
  getProjectCategory,
  getProjectDescription,
  getProjectImage,
  getStatusClasses,
} from "@/utils/projectUtils";
import { ArrowUpRight, CalendarDays, Code2, ExternalLink, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";
import TechBadge from "./TechBadge";

const ProjectCard = ({ project }) => {
  if (!project) return null;

  const technologies = [
    getFirstTech(project.frontend_tech),
    getFirstTech(project.backend_tech),
    getFirstTech(project.database_tech),
  ].filter(Boolean);

  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-colors duration-200 hover:border-primary focus-within:border-primary">
      <Link
        to={`/projects/${project.slug}`}
        className="flex flex-1 flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-label={`View ${project.project_name} project`}
      >
        <div className="aspect-[18/10] overflow-hidden bg-muted">
          <img
            src={getProjectImage(project)}
            alt={`${project.project_name} project preview`}
            loading="lazy"
            decoding="async"
            className="block h-full w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.visibility = "hidden";
            }}
          />
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 border border-primary/20 bg-primary/5 px-2 py-1 font-medium text-primary">
              <FolderKanban aria-hidden="true" size={13} />
              {getProjectCategory(project)}
            </span>
            {project.status && (
              <span className={`px-2 py-1 font-medium ${getStatusClasses(project.status)}`}>
                {project.status}
              </span>
            )}
          </div>

          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 break-words text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
              {project.project_name}
            </h3>
            {project.year && (
              <span className="inline-flex shrink-0 items-center gap-1.5 pt-1 text-xs font-medium text-muted-foreground">
                <CalendarDays aria-hidden="true" size={14} />
                {project.year}
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-3 flex-1 text-sm leading-6 text-muted-foreground">
            {getProjectDescription(project)}
          </p>

          <div className="mt-4 flex min-h-6 flex-wrap gap-1.5">
            {technologies.length ? (
              technologies.map((technology, index) => (
                <TechBadge
                  key={`${technology}-${index}`}
                  label={technology}
                  className="px-2 py-0.5 text-[11px]"
                />
              ))
            ) : (
              <TechBadge
                icon={Code2}
                label="Software project"
                className="px-2 py-0.5 text-[11px]"
              />
            )}
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm font-semibold text-primary">
              Explore case study
            </span>
            <ArrowUpRight aria-hidden="true" size={17} className="text-primary" />
          </div>
        </div>
      </Link>

      {project.live_url && (
        <a
          href={project.live_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mb-4 inline-flex w-fit items-center gap-2 border border-border px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mx-5 sm:mb-5"
        >
          <ExternalLink aria-hidden="true" size={14} />
          Live preview
        </a>
      )}
    </article>
  );
};

export default ProjectCard;
