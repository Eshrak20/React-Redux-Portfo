import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const CommonBanner = ({
  subtitle,
  title,
  highlight,
  height = "50vh",
}) => {
  const { scrollY } = useScroll();

  const scale = useTransform(scrollY, [0, 800], [1, 1.03]);

  return (
    <div
      className="relative w-full overflow-hidden bg-background"
      style={{ height }}
    >
      {/* Background */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        {/* Light Mode */}
        <div
          className="block dark:hidden h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/75 to-white/90" />
        </div>

        {/* Dark Mode */}
        <div
          className="hidden dark:block h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1920&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/75" />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        {subtitle && (
          <span className="mb-3 text-xs uppercase tracking-[0.3em] text-gray-600 dark:text-gray-300 md:text-sm">
            {subtitle}
          </span>
        )}

        <h1 className="text-4xl font-light leading-tight tracking-tight text-black dark:text-white md:text-6xl lg:text-7xl">
          {title}
          {highlight && (
            <>
              <br />
              <span className="font-serif italic text-primary">
                {highlight}
              </span>
            </>
          )}
        </h1>
      </div>
    </div>
  );
};

export default CommonBanner;