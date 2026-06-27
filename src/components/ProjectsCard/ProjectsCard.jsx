import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import Title from "@/components/Title/Title";
import {
  FaPlayCircle,
  FaExternalLinkAlt,
  FaCode,
  FaGithub,
  FaGlobe,
  FaCalendarAlt,
  FaTag,
  FaDatabase,
  FaServer,
  FaDesktop,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import CumButton from "@/components/CumButton/CumButton";

const ProjectsCard = ({ projects }) => {
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);
  const isHomePage = location.pathname === "/";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const renderProjectCard = (project) => (
    <motion.div
      className="relative bg-white dark:bg-gray-900 md:rounded-2xl rounded-md overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 flex flex-col h-full group"
      variants={cardVariants}
      whileHover="hover"
    >
      {/* Image Container */}
      <div className="relative h-44 sm:h-48 overflow-hidden shrink-0">
        <img
          src={
            project.banner ||
            "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
          }
          alt={project.project_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />

        {/* Status Badge */}
        <span
          className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full capitalize ${
            project.status === "completed"
              ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
              : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
          }`}
        >
          {project.status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col grow">
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <FaCode className="text-primary" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">
              {project.project_name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {project.category || "Web Application"}
            </p>
          </div>
        </div>

        {/* Tech Stack Preview */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.frontend_tech && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 whitespace-nowrap">
              {project.frontend_tech.split(",")[0]}
            </span>
          )}
          {project.backend_tech && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300 whitespace-nowrap">
              {project.backend_tech.split(",")[0]}
            </span>
          )}
          {project.database_tech && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-300 whitespace-nowrap">
              {project.database_tech.split(",")[0]}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed grow mb-5">
          {project.short_description}
        </p>

        {/* View Details Button Layout */}
        <div className="mt-auto pt-2">
          {isHomePage ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProject(project);
              }}
              className="w-full px-4 py-2 sm:py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>View Details</span>
              <IoSparkles className="opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </button>
          ) : (
            <Link
              to={`/projects/${project.id}`}
              className="block w-full px-4 py-2 sm:py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-medium transition-all duration-300 text-center"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    // Scaled padding down to py-16 to follow global alignment standards
    <section className="py-16 bg-background">
      {/* 
        --- GLOBAL STRUCTURE WRAPPER ALIGNMENT ---
        Replaced the custom max-w system to directly mirror HomeService, Tech, and HomeAbout widths 
      */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12">
        <div className="mb-10 md:mb-12">
          <Title name="MY Projects" />
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-center text-sm sm:text-base max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions delivered with
            excellence
          </p>
        </div>

        {/* Dynamic Multi-column Response Layout Engine */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {(isHomePage ? projects?.slice(0, 6) : projects)?.map((project) => (
            <div key={project.id} className="h-full">
              {isHomePage ? (
                <div
                  className="cursor-pointer h-full"
                  onClick={(e) => handleCardClick(project, e)}
                >
                  {renderProjectCard(project)}
                </div>
              ) : (
                <Link to={`/projects/${project.id}`} className="block h-full">
                  {renderProjectCard(project)}
                </Link>
              )}
            </div>
          ))}
        </motion.div>

        {/* View More Button Alignment Anchor */}
        {isHomePage && (
          <div className="text-center mt-10 md:mt-12">
            <CumButton path="/projects" title="View All Projects" />
          </div>
        )}
      </div>

      {/* Project Details Modal Content Overlay System */}
      <AnimatePresence>
        {isHomePage && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Box */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-4xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-gray-900 md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button Anchor */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 shadow transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Scrollable Container Box */}
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {/* Hero Banner Img Element */}
                <div className="relative h-48 sm:h-64 md:h-72 flex flex-col justify-end">
                  <img
                    src={
                      selectedProject.banner ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
                    }
                    alt={selectedProject.project_name}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="relative p-4 sm:p-6 z-10">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg hidden sm:block">
                        <FaCode className="text-white" size={20} />
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-snug truncate">
                          {selectedProject.project_name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 sm:mt-2">
                          <span
                            className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                              selectedProject.status === "completed"
                                ? "bg-emerald-500/20 text-emerald-100"
                                : "bg-amber-500/20 text-amber-100"
                            }`}
                          >
                            {selectedProject.status}
                          </span>
                          <span className="text-white/80 text-xs flex items-center gap-1.5">
                            <FaCalendarAlt size={11} />
                            {selectedProject.year || 2026}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Text Content Details */}
                <div className="p-5 sm:p-6 md:p-8">
                  {/* Tech Row Breakdown Stack */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                      <FaTag size={14} />
                      Technology Stack
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
                      {selectedProject.frontend_tech && (
                        <div className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <FaDesktop size={12} />
                            Frontend
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.frontend_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 text-xs rounded-md bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100/30"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.backend_tech && (
                        <div className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <FaServer size={12} />
                            Backend
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.backend_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 text-xs rounded-md bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100/30"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      {selectedProject.database_tech && (
                        <div className="space-y-1.5">
                          <h4 className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                            <FaDatabase size={12} />
                            Database
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedProject.database_tech
                              .split(",")
                              .map((tech, idx) => (
                                <span
                                  key={idx}
                                  className="px-2.5 py-1 text-xs rounded-md bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border border-purple-100/30"
                                >
                                  {tech.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Overview Context Paragraph Block */}
                  <div className="mb-6 sm:mb-8">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white mb-2.5 sm:mb-3">
                      Project Overview
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedProject.long_description ||
                        selectedProject.short_description}
                    </p>
                  </div>

                  {/* Operational Control Anchors */}
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-5 sm:pt-6">
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.live_url && (
                        <a
                          href={selectedProject.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-primary text-white text-sm rounded-lg font-medium hover:bg-primary/90 transition-colors"
                        >
                          <FaGlobe size={14} />
                          Visit Live Site
                        </a>
                      )}

                      {selectedProject.github_url && (
                        <a
                          href={selectedProject.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gray-800 dark:bg-gray-700 text-white text-sm rounded-lg font-medium hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
                        >
                          <FaGithub size={14} />
                          View Code
                        </a>
                      )}

                      <Link
                        to={`/projects/${selectedProject.id}`}
                        onClick={() => setSelectedProject(null)}
                        className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ml-auto md:ml-0"
                      >
                        <FaExternalLinkAlt size={12} />
                        View Full Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectsCard;
