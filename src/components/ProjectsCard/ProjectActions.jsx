// src/components/Projects/ProjectActions.jsx

import { motion } from "framer-motion";
import {
    ArrowLeft,
    ExternalLink,
    Github,
    Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

const buttonAnimation = {
  whileHover: {
    y: -3,
    scale: 1.02,
  },
  whileTap: {
    scale: 0.98,
  },
};

const ActionButton = ({
  href,
  to,
  icon: Icon,
  children,
  variant = "primary",
  external = false,
}) => {
  const classes = {
    primary:
      "bg-primary text-primary-foreground hover:opacity-90",

    secondary:
      "bg-card border border-border text-foreground hover:bg-muted",

    github:
      "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700",
  };

  const className = `
    inline-flex
    items-center
    justify-center
    gap-2
    rounded-xl
    px-5
    py-3
    font-medium
    transition-all
    duration-300
    shadow-sm
    ${classes[variant]}
  `;

  if (external) {
    return (
      <motion.a
        {...buttonAnimation}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        <Icon size={18} />
        <span>{children}</span>
      </motion.a>
    );
  }

  return (
    <motion.div {...buttonAnimation}>
      <Link to={to} className={className}>
        <Icon size={18} />
        <span>{children}</span>
      </Link>
    </motion.div>
  );
};

const ProjectActions = ({ project }) => {
  if (!project) return null;

  return (
    <section className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Project Links
        </h2>

        <div className="mt-2 h-1 w-20 rounded-full bg-primary" />
      </div>

      <div className="flex flex-wrap gap-4">
        {project.live_url && (
          <ActionButton
            href={project.live_url}
            external
            icon={Globe}
            variant="primary"
          >
            Live Demo
          </ActionButton>
        )}

        {project.github_url && (
          <ActionButton
            href={project.github_url}
            external
            icon={Github}
            variant="github"
          >
            Source Code
          </ActionButton>
        )}

        <ActionButton
          to="/projects"
          icon={ArrowLeft}
          variant="secondary"
        >
          Back to Projects
        </ActionButton>

        <motion.button
          {...buttonAnimation}
          onClick={() => window.open(window.location.href, "_blank")}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-5 py-3 font-medium text-foreground transition-all duration-300 hover:bg-muted"
        >
          <ExternalLink size={18} />
          Open in New Tab
        </motion.button>
      </div>
    </section>
  );
};

export default ProjectActions;