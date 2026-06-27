import React from "react";
import { motion } from "framer-motion";
import {
  Globe,
  Layers,
  Database,
  Layout,
  Activity,
  ExternalLink,
  User,
  Code2,
  Sparkles,
  ArrowUpRight,
  Zap,
  Target,
  Award,
  Clock,
  Calendar,
  Users,
  FileText,
  Building,
  Mail,
  Phone,
  MapPin,
  Github,
  BookOpen,
} from "lucide-react";

const AboutDetProject = ({ project }) => {
  if (!project) return null;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const floatVariants = {
    initial: { y: 0 },
    float: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative max-w-7xl mx-auto pt-36 md:px-6 overflow-hidden  bg-transparent text-gray-900 dark:text-gray-100">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl" />
        {/* <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl" /> */}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start"
      >
        {/* Left: Interactive Image Banner with Enhanced Effects */}
        <motion.div variants={itemVariants} className="relative group">
          {/* Glow Effect */}
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute -inset-4 bg-linear-to-r from-primary/30 via-purple-500/20 to-blue-500/30 dark:from-primary/40 dark:via-purple-500/30 dark:to-blue-500/40 rounded-3xl blur-2xl"
          />

          {/* Main Image Container */}
          <motion.div
            whileHover={{
              scale: 1.02,
              rotateX: 2,
              rotateY: 2,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            className="relative overflow-hidden md:rounded-2xl rounded-md md:shadow-lg border border-gray-100/50 dark:border-gray-800/50 bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
          >
            {/* Shine Overlay */}
            <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent dark:via-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <img
              src={
                project.banner ||
                "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80"
              }
              alt={project.project_name}
              className="w-full md:h-137.5 object-fit transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Floating Badge */}
            {/* <motion.div
              variants={floatVariants}
              animate="float"
              className="absolute top-6 right-6 bg-linear-to-r from-primary to-blue-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg"
            >
              <span className="text-sm font-bold">FEATURED</span>
            </motion.div> */}
          </motion.div>
        </motion.div>

        {/* Right: Enhanced Project Details */}
        <div className="space-y-10">
          {/* Enhanced Header Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center gap-4">
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 text-primary dark:text-primary-foreground text-xs font-bold uppercase tracking-[0.2em]"
              >
                Case Study
              </motion.span>

              {/* Status Badge with Animation */}
              <motion.span
                animate={{
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                    "0 0 0 10px rgba(59, 130, 246, 0)",
                    "0 0 0 0 rgba(59, 130, 246, 0)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3,
                }}
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  project.status === "Completed"
                    ? "bg-green-500/10 text-green-600 dark:text-green-400"
                    : project.status === "In Progress"
                      ? "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                }`}
              >
                ● {project.status}
              </motion.span>
            </div>

            {/* Project Title with Gradient Highlight */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
              <span className="relative">
                <span className="relative z-10 pl-2 bg-clip-text text-transparent bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                  {project.project_name}
                </span>
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-linear-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-xl opacity-70"
                />
              </span>
              <span className="text-primary animate-pulse">.</span>
            </h1>

            {/* Highlighted Short Description */}
            {project.short_description && (
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-linear-to-b from-primary to-blue-500 rounded-full" />
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-light pl-2 md:pl-8 border-l-2 border-gray-100 dark:border-gray-800">
                  {project.short_description}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced Tech/Meta Grid - Glassmorphism with Hover Effects */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 gap-6 p-8 bg-white/80 dark:bg-gray-900/80 rounded-3xl border border-gray-100 dark:border-gray-800 backdrop-blur-sm shadow-lg"
          >
            <InfoItem
              icon={<Activity size={18} className="text-green-500" />}
              label="Status"
              value={project.status}
              highlight={project.status === "Completed"}
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

            {/* Additional Info Items */}
            {project.duration && (
              <InfoItem
                icon={<Clock size={18} className="text-yellow-500" />}
                label="Duration"
                value={project.duration}
              />
            )}
            {project.year && (
              <InfoItem
                icon={<Calendar size={18} className="text-pink-500" />}
                label="Year"
                value={project.year}
              />
            )}
            {project.team_size && (
              <InfoItem
                icon={<Users size={18} className="text-indigo-500" />}
                label="Team Size"
                value={project.team_size}
              />
            )}
          </motion.div>
        </div>
      </motion.div>


      {/* <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 mt-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {project.description && (
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-secondary rounded-full" />
              <div className="pl-8">
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2.5 rounded-xl "
                  >
                    <FileText size={22} className="text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Project Overview
                  </h3>
                </div>
                <div
                  className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert [&>p]:mb-5 [&>p]:leading-relaxed [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 dark:[&>h3]:text-white [&>h3]:mb-4 [&>h3]:mt-6 [&>ul]:space-y-2 [&>li]:flex [&>li]:items-start [&>li]:gap-3 [&>li>svg]:mt-1 [&>li>svg]:shrink-0"
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              </div>
            </motion.div>
          )}

          {(project.client_name ||
            project.client_company ||
            project.client_role ||
            project.client_email ||
            project.client_phone ||
            project.client_location) && (
            <motion.div variants={itemVariants} className="relative">
              <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-secondary rounded-full" />
              <div className="pl-8">
                <div className="flex items-center gap-3 mb-8">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2.5 rounded-xl"
                  >
                    <Building size={22} className="text-primary" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Client Information
                  </h3>
                </div>

                <div className="bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-xl">
                  <div className="bg-linear-to-r from-primary/90 to-primary/90 dark:from-secondary/80 dark:to-secondary/80 px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-sm">
                        <User size={22} className="text-white" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">
                          Client Details
                        </p>
                        <p className="text-white/70 dark:text-white/60 text-xs mt-0.5">
                          Contact & Business Information
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {project.client_name && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <User
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Full Name
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {project.client_name}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.client_company && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <Building
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Company
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {project.client_company}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.client_role && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <Award
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Role / Position
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {project.client_role}
                          </p>
                        </div>
                      </div>
                    )}

                    {project.client_email && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <Mail
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Email Address
                          </p>
                          <a
                            href={`mailto:${project.client_email}`}
                            className="text-primary dark:text-blue-400 hover:text-primary/80 dark:hover:text-blue-300 font-medium transition-colors"
                          >
                            {project.client_email}
                          </a>
                        </div>
                      </div>
                    )}

                    {project.client_phone && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <Phone
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Phone Number
                          </p>
                          <a
                            href={`tel:${project.client_phone}`}
                            className="text-gray-800 dark:text-gray-200 font-medium hover:text-primary dark:hover:text-blue-400 transition-colors"
                          >
                            {project.client_phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {project.client_location && (
                      <div className="flex items-start gap-4 p-5 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors group">
                        <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-primary/10 dark:group-hover:bg-primary/20 transition-colors">
                          <MapPin
                            size={18}
                            className="text-gray-600 dark:text-gray-400 group-hover:text-primary"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1">
                            Location
                          </p>
                          <p className="text-gray-800 dark:text-gray-200 font-medium">
                            {project.client_location}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div> */}

      
      {/* <motion.div
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 pt-12 mt-8 border-t border-gray-100/50 dark:border-gray-800/50"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            {project.live_url && (
              <motion.a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-md md:rounded-xl bg-primary px-10 py-5 font-bold text-primary-foreground shadow-lg transition-all duration-300 hover:shadow-primary/30"
              >
                <motion.div
                  animate={{
                    x: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute inset-0 bg-linear-to-r from-transparent via-primary-foreground/10 to-transparent"
                />

                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  className="absolute inset-0 rounded-md md:rounded-xl bg-primary opacity-20"
                />

                <span className="relative z-10 flex items-center gap-2">
                  Live Project
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <ExternalLink size={20} />
                  </motion.span>
                </span>

                <motion.div
                  initial={{ x: -10, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                  className="relative z-10 ml-2"
                >
                  <ArrowUpRight size={20} />
                </motion.div>
              </motion.a>
            )}

            {project.github_url && (
              <motion.a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex-1 sm:flex-none justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Code2
                  size={20}
                  className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="relative z-10">View Code</span>
                <Github
                  size={18}
                  className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2.5 group-hover:translate-x-0"
                />
              </motion.a>
            )}

            {project.documentation_url && (
              <motion.a
                href={project.documentation_url}
                target="_blank"
                rel="noreferrer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex-1 sm:flex-none justify-center overflow-hidden"
              >
                <div className="absolute inset-0 bg-linear-to-r from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <BookOpen
                  size={20}
                  className="relative z-10 group-hover:rotate-12 transition-transform duration-300"
                />
                <span className="relative z-10">Documentation</span>
                <ArrowUpRight
                  size={18}
                  className="relative z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2.5 group-hover:translate-x-0"
                />
              </motion.a>
            )}
          </div>

          {(project.github_url || project.documentation_url) && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sm text-gray-400 dark:text-gray-500 flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              All resources are publicly available
            </motion.div>
          )}
        </div>
      </motion.div> */}
    </section>
  );
};

const InfoItem = ({ icon, label, value, highlight = false }) => {
  if (!value) return null;

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: { type: "spring", stiffness: 300 },
      }}
      className="relative group cursor-pointer"
    >
      <div className="absolute -inset-2 bg-linear-to-r from-transparent via-primary/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative p-4 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 group-hover:border-primary/20 dark:group-hover:border-primary/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 rounded-lg bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm"
          >
            {icon}
          </motion.div>
          <p className="text-xs uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">
            {label}
          </p>
        </div>
        <p
          className={`text-base font-bold ${
            highlight
              ? "text-transparent bg-clip-text bg-linear-to-r from-green-500 to-emerald-600"
              : "text-gray-800 dark:text-gray-200"
          }`}
        >
          {value}
        </p>

        {/* Hover Line Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </motion.div>
  );
};

export default AboutDetProject;
