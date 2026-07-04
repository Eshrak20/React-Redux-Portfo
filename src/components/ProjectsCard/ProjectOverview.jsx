// src/components/Projects/ProjectOverview.jsx

import { fadeUpVariants } from "@/utils/projectAnimations";
import { getProjectDescription } from "@/utils/projectUtils";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

const ProjectOverview = ({ project }) => {
  if (!project) return null;

  return (
    <motion.section
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm"
    >
      {/* Heading */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <FileText size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Project Overview
          </h2>

          <div className="mt-2 h-1 w-20 rounded-full bg-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="space-y-5 text-muted-foreground leading-8 text-[16px]">
        {getProjectDescription(project)
          .split("\n")
          .filter(Boolean)
          .map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
      </div>
    </motion.section>
  );
};

export default ProjectOverview;