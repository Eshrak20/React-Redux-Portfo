import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Title from "@/components/Title/Title";
import {
  FaPlayCircle,
  FaExternalLinkAlt,
  FaStar,
  FaCode,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import CumButton from "@/components/CumButton/CumButton";

const HomeProjects = ({ projects }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.9,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      },
    },
    hover: {
      y: -15,
      scale: 1.03,
      rotateY: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 20,
        duration: 0.3,
      },
    },
    tap: {
      scale: 0.96,
      rotateY: 0,
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.15,
      rotate: 1,
      transition: {
        duration: 0.7,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const glowVariants = {
    hover: {
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Enhanced tech badge styling with gradient effects
  const getTechColorClasses = (type) => {
    switch (type) {
      case "frontend":
        return "bg-gradient-to-r from-primary via-primary/90 to-primary text-primary-foreground shadow-primary/30";
      case "backend":
        return "bg-gradient-to-r from-secondary via-secondary/90 to-secondary text-secondary-foreground shadow-secondary/30";
      case "database":
        return "bg-gradient-to-r from-accent via-accent/90 to-accent text-accent-foreground shadow-accent/30";
      default:
        return "bg-gradient-to-r from-muted to-muted/80 text-muted-foreground border border-border/50";
    }
  };

  return (
    <section className="py-16 px-5 max-w-425 mx-auto relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full " />
      </div>

      <Title name="MY Projects" />
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {projects?.slice(0, 8).map((project, index) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            className="block relative group"
          >
            {/* Glow effect behind card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20 rounded-0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              variants={glowVariants}
              whileHover="hover"
            />

            {/* Animated border gradient */}
            <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-r from-primary via-transparent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <motion.div
              className="relative bg-gradient-to-b from-card via-card/95 to-card/90 rounded-3xl md:shadow-2xl overflow-hidden border border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col h-full group/card"
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              style={{
                perspective: 1000,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Padded Image Container with gradient overlay */}
              <div className="pt-6 px-6 relative">
                <div className="relative h-52 overflow-hidden rounded-sm">
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/20 via-transparent to-transparent z-10" />

                  {/* Image with enhanced hover effect */}
                  <motion.div
                    className="relative w-full h-full"
                    variants={imageVariants}
                    whileHover="hover"
                  >
                    <img
                      src={project.banner}
                      alt={project.project_name}
                      className="w-full h-full object-cover"
                    />

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover/card:translate-x-[100%] transition-transform duration-1000" />
                  </motion.div>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 flex flex-col flex-grow">
                {/* Title & Status Row */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-primary/10 rounded-lg">
                      <FaCode className="text-primary" size={14} />
                    </div>
                    <h3 className="text-lg font-bold capitalize truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      {project.project_name}
                    </h3>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider shrink-0 shadow-lg  ${
                      project.status === "completed"
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                        : "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.frontend_tech && (
                    <motion.span
                      className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg ${getTechColorClasses("frontend")} backdrop-blur-sm`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {project.frontend_tech}
                    </motion.span>
                  )}
                  {project.backend_tech && (
                    <motion.span
                      className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg ${getTechColorClasses("backend")} backdrop-blur-sm`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {project.backend_tech}
                    </motion.span>
                  )}
                  {project.database_tech && (
                    <motion.span
                      className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-lg ${getTechColorClasses("database")} backdrop-blur-sm`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {project.database_tech}
                    </motion.span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed flex-grow mb-6">
                  {project.short_description}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    {project.project_video && (
                      <motion.a
                        href={project.project_video}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl transition-all duration-300 group/btn"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(var(--primary), 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaPlayCircle size={16} />
                        <span className="text-sm font-medium">Demo</span>
                      </motion.a>
                    )}
                    {project.live_url && (
                      <motion.a
                        href={project.live_url}
                        target="_blank"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/10 hover:bg-secondary/20 text-secondary rounded-xl transition-all duration-300 group/btn"
                        whileHover={{
                          scale: 1.05,
                          backgroundColor: "rgba(var(--secondary), 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FaExternalLinkAlt size={14} />
                        <span className="text-sm font-medium">Live</span>
                      </motion.a>
                    )}
                  </div>

                  {/* Sparkle icon for hover effect */}
                  <motion.div
                    className="opacity-0 group-hover/card:opacity-100"
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <IoSparkles className="text-primary" size={20} />
                  </motion.div>
                </div>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-primary rounded-full"
                    initial={{
                      opacity: 0,
                      x: Math.random() * 100 - 50,
                      y: Math.random() * 100 - 50,
                    }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      y: [0, -100],
                      x: [0, Math.random() * 40 - 20],
                    }}
                    transition={{
                      duration: 1.5,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 3,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* View More Button */}
      <CumButton path="/projects" title="View All Projects" />
    </section>
  );
};

export default HomeProjects;
