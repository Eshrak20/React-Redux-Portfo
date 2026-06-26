import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CommonBanner = ({
  backgroundImage,
  subtitle,
  title,
  highlight,
  height = "50vh",
}) => {
  const { scrollY } = useScroll();

  // Subtle parallax effect
  const scale = useTransform(scrollY, [0, 800], [1, 1.03]);

  return (
    <div
      className="relative w-full overflow-hidden bg-black"
      style={{ height }}
    >
      {/* Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url("${backgroundImage}")` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/40 to-black/70" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        {subtitle && (
          <span className="mb-3 uppercase tracking-[0.3em] text-xs md:text-sm text-gray-300">
            {subtitle}
          </span>
        )}

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
          {title}
          {highlight && (
            <>
              <br />
              <span className="font-serif italic">{highlight}</span>
            </>
          )}
        </h1>
      </div>
    </div>
  );
};

export default CommonBanner;