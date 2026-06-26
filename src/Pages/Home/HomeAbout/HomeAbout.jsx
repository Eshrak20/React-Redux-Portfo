import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Globe,
  ShieldCheck,
  Award,
  Rocket,
  Users,
  Code,
  Clock,
  Star,
  TrendingUp,
  ChevronRight,
} from "lucide-react";
import Title from "@/components/Title/Title";

/* =======================
   Section Title
======================= */
const SectionTitle = ({ title, subtitle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12 md:mb-16 lg:mb-24 text-center"
    >
      <div>
        <Title name="About Us" />
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          
          className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto mt-4 lg:mt-6"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

/* =======================
        Metric Card
======================= */
const MetricCard = ({ metric, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-col p-2 md:p-4 text-center md:text-left"
    >
      <span className="text-[10px] md:text-xs uppercase tracking-wide text-muted-foreground whitespace-nowrap">
        {metric.name}
      </span>

      {/* Responsive adjustments prevent huge numbers from clipping on mid-sized mobile screens */}
      <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mt-1 md:mt-2">
        {metric.value}
      </span>
    </motion.div>
  );
};

/* =======================
   Feature Card
======================= */
const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ x: 6 }}
      className="flex items-center gap-4 lg:gap-5 p-4 lg:p-5 md:rounded-2xl rounded-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 transition"
    >
      <div
        className={`p-2.5 lg:p-3 rounded-xl bg-linear-to-br ${feature.gradient} text-white shrink-0`}
      >
        {feature.icon}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-base lg:text-lg text-foreground truncate">{feature.title}</h4>
        <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2 md:line-clamp-none">{feature.description}</p>
      </div>

      <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground shrink-0" />
    </motion.div>
  );
};

/* =======================
   Home About Component
======================= */
const HomeAbout = ({ title, subtitle, description, image, metrics }) => {
  const enhancedMetrics =
    metrics?.map((item, index) => ({
      ...item,
      icon: [Users, Code, Clock, Star, TrendingUp][index % 5],
    })) || [];

  const getCountriesCount = () => {
    const found = enhancedMetrics.find((m) =>
      m.name?.toLowerCase().includes("country"),
    );
    return found?.value || "1+";
  };

  const features = [
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Global Reach",
      description: "Delivering solutions across international markets.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Trusted Partner",
      description: "Reliable solutions for enterprise and government.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Quality Assured",
      description: "Focused on performance, security, and scalability.",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
      </div>

      {/* --- STRUCTURE WRAPPER ---
        Replaced custom max-w system with standard responsive containers 
      */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12">
        <SectionTitle title={title} subtitle={subtitle} />

        {/* Switches to multi-column only at lg: (PC setup) to keep your desktop structure unmodified */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-16 items-start lg:-mt-20">
          
          {/* LEFT SIDE: Image, Badge and Metrics */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative pt-12 lg:pt-16"
          >
            {/* Height scales dynamically across layout steps to maintain visual harmony */}
            <div className="relative h-80 sm:h-105 md:h-125 lg:h-137.5 rounded-3xl overflow-hidden md:shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Export Badge */}
            <div className="absolute top-0 right-0 lg:-right-6">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-linear-to-br from-primary to-primary/80 flex flex-col items-center justify-center shadow-xl border-4 border-white">
                <Rocket className="w-5 h-5 md:w-7 md:h-7 text-white mb-0.5 md:mb-1" />
                <span className="text-[9px] md:text-xs text-white uppercase tracking-tight">
                  Exporting to
                </span>
                <span className="text-xl md:text-2xl font-bold text-white leading-none my-0.5">
                  {getCountriesCount()}
                </span>
                <span className="text-[9px] md:text-xs text-white uppercase tracking-tight">Countries</span>
              </div>
            </div>

            {/* Metrics Float Grid Container */}
            <div className="absolute -bottom-12 md:view-bottom-shift left-1/2 -translate-x-1/2 w-[95%]">
              <div className="bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl md:rounded-2xl rounded-md p-4 md:p-6 shadow-lg border border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {enhancedMetrics.slice(0, 4).map((metric, idx) => (
                    <MetricCard key={idx} metric={metric} index={idx} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Content description and feature lines */}
          <div className="flex flex-col space-y-6 lg:space-y-8 pt-16 lg:pt-12">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              Building digital solutions that drive real business value.
            </h3>

            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="grid gap-3 lg:gap-4">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} index={index} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;