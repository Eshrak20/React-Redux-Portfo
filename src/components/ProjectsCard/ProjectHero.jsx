// src/components/Projects/ProjectHero.jsx

import {
    getProjectCategory,
    getProjectImage,
    getStatusClasses,
} from "@/utils/projectUtils";
import { motion } from "framer-motion";
import { CalendarDays, FolderKanban } from "lucide-react";

const ProjectHero = ({ project }) => {
  if (!project) return null;

  return (
    <motion.section
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-xl"
    >
      {/* Banner */}
      <div className="relative h-[260px] sm:h-[340px] lg:h-[460px] overflow-hidden">
        <img
          src={getProjectImage(project)}
          alt={project.project_name}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Content */}
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {/* Status */}
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize backdrop-blur-md ${getStatusClasses(
                  project.status
                )}`}
              >
                {project.status}
              </span>

              {/* Title */}
              <h1 className="mt-4 text-3xl font-bold leading-tight text-white md:text-5xl">
                {project.project_name}
              </h1>

              {/* Meta */}
              <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <FolderKanban size={18} />
                  <span>{getProjectCategory(project)}</span>
                </div>

                {project.year && (
                  <div className="flex items-center gap-2">
                    <CalendarDays size={18} />
                    <span>{project.year}</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              {project.short_description && (
                <p className="mt-6 max-w-3xl text-base leading-7 text-white/80 md:text-lg">
                  {project.short_description}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProjectHero;