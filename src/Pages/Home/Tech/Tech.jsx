import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import techData from "../../../../public/Json/TechData.json";
import "./tech.css";
import Title from "@/components/Title/Title";

const Tech = () => {
  const [selectedTech, setSelectedTech] = useState("Frontend");
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [selectedTech]);

  useEffect(() => {
    Object.values(techData)
      .flat()
      .forEach((item) => {
        const img = new Image();
        img.src = item.image;
      });
  }, []);

  // Standardized spacing fallback math targeting mobile slider tracking layouts
  const calculateTotalWidth = (techArray) => techArray.length * (112 + 48);

  return (
    // Balanced top/bottom wrapper block to seamlessly flow across standard mobile and desktop layers
    <section className="relative overflow-hidden py-12 md:py-16 lg:py-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title */}
        <div className="mb-8 md:mb-12">
          <Title name="MY Technologies" />
        </div>

        {/* Filter buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 p-4 mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {Object.keys(techData).map((tech) => (
            <motion.button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={`
                relative px-4 py-2.5 md:px-8 md:py-3
                rounded-full text-xs md:text-sm font-medium
                transition-all duration-300
                ${
                  selectedTech === tech
                    ? "text-white bg-secondary shadow-md"
                    : "text-secondary dark:text-primary bg-primary/20 hover:bg-red-500 hover:text-white dark:hover:text-white" 
                }
              `}
            >
              <span className="relative z-10">{tech}</span>

              {selectedTech === tech && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-linear-to-r from-secondary to-secondary/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Marquee (Mobile & Laptop Viewports) */}
        <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden lg:hidden mb-12 md:mb-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="flex items-center justify-center w-full h-full py-6">
              <motion.div
                key={animationKey}
                className="flex gap-6 items-center"
                animate={{
                  x: [
                    "0%",
                    `-${calculateTotalWidth(techData[selectedTech])}px`,
                  ],
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    duration: 30, // Optimized speed to look smoother across smaller viewport intervals
                    ease: "linear",
                  },
                }}
              >
                {[...techData[selectedTech], ...techData[selectedTech]].map(
                  (item, index) => (
                    <motion.div
                      key={`${item.name}-${index}`}
                      className="flex flex-col items-center px-2 shrink-0 min-w-28"
                      whileHover={{ scale: 1.15, zIndex: 10 }}
                    >
                      <motion.div
                        className="w-24 h-24 sm:w-28 sm:h-28 md:rounded-2xl rounded-md flex items-center justify-center shadow-xl"
                        style={{
                          backgroundColor: item.hexCode
                            ? `${item.hexCode}22` // Adjusted alpha breakdown slightly for cleaner backdrop contrast on mobile devices
                            : "#ffffff22",
                          boxShadow: `0 0 20px ${item.hexCode || "#ffffff"}40`,
                        }}
                      >
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                          loading="lazy"
                        />
                      </motion.div>

                      <span
                        className="mt-3 text-xs sm:text-sm font-semibold text-center tracking-wide"
                        style={{ color: item.hexCode || "inherit" }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* --- NATIVE LARGE SCREEN GRID ---
            Kept exactly identical to your design configuration so your PC view rules stay pristine.
        */}
        <div className="hidden lg:flex mb-20 flex-wrap justify-center gap-y-10 gap-x-6 md:gap-x-8 max-w-7xl mx-auto px-6">
          {techData[selectedTech].map((item, index) => (
            <motion.div
              key={`${item.name}-${index}`}
              className="flex flex-col items-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className="tech-card w-24 h-24 md:w-28 md:h-28 flex items-center justify-center md:rounded-2xl rounded-md shadow-lg bg-secondary/10 backdrop-blur-sm border border-white/5"
                style={{
                  boxShadow: `0 10px 30px -10px ${item.hexCode || "#ffffff"}50`,
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: `0 0 40px ${item.hexCode || "#ffffff"}60`,
                  zIndex: 10,
                }}
              >
                <motion.img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="tech-logo w-12 h-12 md:w-16 md:h-16 object-contain"
                  whileHover={{ rotate: 10 }}
                />
              </motion.div>

              <span
                className="mt-4 font-semibold tracking-wide text-center"
                style={{ color: item.hexCode || "inherit" }}
              >
                {item.name}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Tech;