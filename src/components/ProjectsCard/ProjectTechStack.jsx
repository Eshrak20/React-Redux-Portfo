// src/components/Projects/ProjectTechStack.jsx

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Layers3,
    Server,
} from "lucide-react";

import { fadeUpVariants } from "@/utils/projectAnimations";
import { getTechArray } from "@/utils/projectUtils";

const TechSection = ({
  title,
  icon: Icon,
  technologies,
  iconClass,
  badgeClass,
}) => {
  if (!technologies.length) return null;

  return (
    <div className="rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
      <div className="flex items-center gap-3 mb-5">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={20} />
        </div>

        <h3 className="text-lg font-semibold text-foreground">
          {title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {technologies.map((tech) => (
          <span
            key={tech}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:scale-105 ${badgeClass}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

const ProjectTechStack = ({ project }) => {
  if (!project) return null;

  const frontend = getTechArray(project.frontend_tech);
  const backend = getTechArray(project.backend_tech);
  const database = getTechArray(project.database_tech);
  const tools = getTechArray(project.tools);

  return (
    <motion.section
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm"
    >
      {/* Heading */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Layers3 size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Technology Stack
            </h2>

            <div className="mt-2 h-1 w-20 rounded-full bg-primary" />
          </div>
        </div>
      </div>

      {/* Stack Cards */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <TechSection
          title="Frontend"
          icon={Code2}
          technologies={frontend}
          iconClass="bg-blue-500/10 text-blue-600"
          badgeClass="bg-blue-500/10 text-blue-600"
        />

        <TechSection
          title="Backend"
          icon={Server}
          technologies={backend}
          iconClass="bg-emerald-500/10 text-emerald-600"
          badgeClass="bg-emerald-500/10 text-emerald-600"
        />

        <TechSection
          title="Database"
          icon={Database}
          technologies={database}
          iconClass="bg-purple-500/10 text-purple-600"
          badgeClass="bg-purple-500/10 text-purple-600"
        />

        {tools.length > 0 && (
          <TechSection
            title="Tools"
            icon={Layers3}
            technologies={tools}
            iconClass="bg-orange-500/10 text-orange-600"
            badgeClass="bg-orange-500/10 text-orange-600"
          />
        )}
      </div>
    </motion.section>
  );
};

export default ProjectTechStack;