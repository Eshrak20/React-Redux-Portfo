import { motion } from "framer-motion";
import {
  Activity,
  Code2,
  Database,
  FileText,
  Globe,
  Layers,
  Layout,
} from "lucide-react";
import GalleryDetProject from "./GalleryDetProject";

const AboutDetProject = ({ project }) => {
  if (!project) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative max-w-7xl mx-auto pt-32 px-6  bg-transparent text-gray-900 dark:text-gray-100">
      {/* Top Section: Image & Meta Data */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        // 12-column grid layout
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left: Gallery (7/12 = ~61%) */}
        <div className="lg:col-span-7 w-full min-w-0">
          <GalleryDetProject project_gallery={project.gallery_images} />
        </div>

        {/* Right: Project Details (5/12 = ~38%) */}
        <div className="lg:col-span-5 w-full flex flex-col space-y-8">
          <motion.div variants={itemVariants} className="space-y-4">
            <h1 className="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
              {project.project_name}
              <span className="text-primary">.</span>
            </h1>
            {project.short_description && (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.short_description}
              </p>
            )}
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <InfoItem
              icon={<Activity size={18} className="text-green-500" />}
              label="Status"
              value={project.status}
            />
            <InfoItem
              icon={<Layout size={18} className="text-purple-500" />}
              label="Type"
              value={project.project_type}
            />
            <InfoItem
              icon={<Layers size={18} className="text-orange-500" />}
              label="Category"
              value={project.project_category}
            />
            <InfoItem
              icon={<Code2 size={18} className="text-blue-500" />}
              label="Frontend"
              value={project.frontend_tech}
            />
            <InfoItem
              icon={<Database size={18} className="text-red-500" />}
              label="Backend"
              value={project.backend_tech}
            />
            <InfoItem
              icon={<Globe size={18} className="text-cyan-500" />}
              label="Database"
              value={project.database_tech}
            />
          </motion.div>
        </div>
      </motion.div>
      {/* Bottom Section: Project Overview */}
      {project.description && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative z-10 mt-24 max-w-4xl"
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
                <FileText size={24} className="text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Project Overview
              </h3>
            </div>

            <div
              className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert 
                [&>p]:mb-6 [&>p]:leading-relaxed 
                [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:text-gray-900 dark:[&>h3]:text-white [&>h3]:mb-4 [&>h3]:mt-8 
                [&>ul]:space-y-3 [&>ul]:my-6 [&>li]:flex [&>li]:items-start [&>li]:gap-3"
              dangerouslySetInnerHTML={{ __html: project.description }}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// Simplified but elegant InfoItem component
const InfoItem = ({ icon, label, value, highlight = false }) => {
  if (!value) return null;

  return (
    <div className="group relative p-4 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition-all duration-300 hover:shadow-md dark:hover:shadow-none hover:-translate-y-1">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          {icon}
        </div>
        <p className="text-[10px] sm:text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
          {label}
        </p>
      </div>
      <p
        className={`text-sm sm:text-base font-bold truncate ${
          highlight
            ? "text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600"
            : "text-gray-900 dark:text-gray-100"
        }`}
        title={value}
      >
        {value}
      </p>
    </div>
  );
};

export default AboutDetProject;
