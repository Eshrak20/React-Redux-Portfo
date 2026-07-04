// src/components/Projects/ProjectCard.jsx

import { motion } from "framer-motion";
import {
    ArrowRight,
    CalendarDays,
    Code2,
    FolderKanban,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
    cardVariants,
    imageVariants,
} from "@/utils/projectAnimations";

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

  const frontend = getFirstTech(project.frontend_tech);
  const backend = getFirstTech(project.backend_tech);
  const database = getFirstTech(project.database_tech);

  return (
    <motion.article
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      className="group h-full overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="flex h-full flex-col"
      >
        {/* ================= Banner ================= */}

        <div className="relative overflow-hidden">
          <motion.img
            variants={imageVariants}
            src={getProjectImage(project)}
            alt={project.project_name}
            className="h-60 w-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
            }}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {/* Status */}
          <span
            className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md ${getStatusClasses(
              project.status
            )}`}
          >
            {project.status}
          </span>

          {/* Category */}
          <div className="absolute bottom-4 left-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur-md">
              <FolderKanban size={15} />
              {getProjectCategory(project)}
            </div>
          </div>
        </div>

        {/* ================= Content ================= */}

        <div className="flex flex-1 flex-col p-6">
          {/* Title */}

          <h3 className="line-clamp-1 text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
            {project.project_name}
          </h3>

          {/* Year */}

          {project.year && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={15} />
              <span>{project.year}</span>
            </div>
          )}

          {/* Description */}

          <p className="mt-4 line-clamp-3 flex-1 leading-7 text-muted-foreground">
            {getProjectDescription(project)}
          </p>

          {/* Tech Stack */}

          <div className="mt-6 flex flex-wrap gap-2">
            {frontend && (
              <TechBadge
                label={frontend}
                color="blue"
              />
            )}

            {backend && (
              <TechBadge
                label={backend}
                color="emerald"
              />
            )}

            {database && (
              <TechBadge
                label={database}
                color="purple"
              />
            )}

            {!frontend && !backend && !database && (
              <TechBadge
                icon={Code2}
                label="Technology"
                color="primary"
              />
            )}
          </div>

          {/* Divider */}

          <div className="my-6 h-px bg-border" />

          {/* Footer */}

          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              View Project
            </span>

            <motion.div
              whileHover={{ x: 6 }}
              transition={{
                type: "spring",
                stiffness: 300,
              }}
              className="rounded-full bg-primary/10 p-2 text-primary"
            >
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default ProjectCard;