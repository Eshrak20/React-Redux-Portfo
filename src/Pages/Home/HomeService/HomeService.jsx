import React from "react";
import { motion } from "framer-motion";
import {
  faCode,
  faMobileScreenButton,
  faBullhorn,
  faBrain,
  faPenNib,
  faLightbulb,
  faBuilding,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Title from "@/components/Title/Title";

const HomeService = ({ services }) => {
  // Helper to assign icons based on title keywords
  const getServiceIcon = (title) => {
    const t = title?.toLowerCase() || "";
    if (t.includes("web")) return faCode;
    if (t.includes("app") || t.includes("mobile")) return faMobileScreenButton;
    if (t.includes("marketing") || t.includes("digital")) return faBullhorn;
    if (t.includes("ai") || t.includes("intelligence")) return faBrain;
    if (
      t.includes("ui") ||
      t.includes("ux") ||
      t.includes("design")
    )
      return faPenNib;
    if (
      t.includes("real estate") ||
      t.includes("property") ||
      t.includes("building")
    )
      return faBuilding;
    if (t.includes("home") || t.includes("house")) return faHome;
    return faLightbulb; // Fallback icon
  };

  // Sort services by position before rendering
  const sortedServices = services
    ? [...services].sort((a, b) => (a.position || 0) - (b.position || 0))
    : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "backOut" },
    },
  };

  return (
    // Scaled responsive vertical padding to feel natural on mobile while keeping native desktop spacing
    <section className="py-16 md:py-20 lg:py-24 bg-background">
      {/* 
        --- STRUCTURE WRAPPER ---
        Replaced rigid custom max-w limits with global fluid adaptive containers 
      */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12 mb-14">

        {/* Section Header Wrapper */}
        <div className="mb-12 md:mb-16">
          <Title name="MY Services" />
        </div>

        {/* 
          Grid Layout Breakdown Layer:
          - Stays 1 column on small/base mobile to keep structural integrity
          - Splits into 2 columns on tablet/laptop screens (`sm:` and `md:`)
          - Lands back onto your crisp 4-column design seamlessly on large viewports (`lg:`)
        */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {sortedServices.map((service) => (
           <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
              }}
              /* 
                Responsive card internal padding balances long service titles on tight laptop grids 
                (p-6 on mobile/tablet -> matches your deep native p-10 on desktop screens)
              */
              className="group flex flex-col items-center justify-center p-6 sm:p-8 lg:p-10 bg-gray-50 dark:bg-[#6094FF1A] border border-gray-200 md:rounded-2xl rounded-md transition-colors duration-300 hover:border-primary/50"
            >
              {/* Icon Graphic Block Container */}
              <div className="mb-5 lg:mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-colors" />
                <div className="relative w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center bg-white md:rounded-2xl rounded-md border border-primary/30 group-hover:border-primary transition-all duration-300 shadow-sm">
                  <FontAwesomeIcon
                    icon={getServiceIcon(service.title)}
                    className="text-2xl lg:text-3xl text-primary group-hover:scale-110 transition-transform"
                  />
                </div>
              </div>

              {/* Service Dynamic Title Component */}
              <h3 className="text-lg lg:text-xl font-bold text-primary text-center group-hover:text-black dark:group-hover:text-white transition-colors line-clamp-2 md:line-clamp-none">
                {service.title || "Innovation Lab"}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeService;