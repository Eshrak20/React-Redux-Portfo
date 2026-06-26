import React from "react";
import { motion } from "framer-motion";

const ChairmanSpeech = ({ data }) => {
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { delay: 0.5, staggerChildren: 0.02 },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 overflow-hidden">
      <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-20">

        {/* LEFT: TEXT */}
        <div className="w-full md:w-3/5 z-10">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">
              Leadership Message
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight">
              {data?.name}
            </h2>
          </motion.div>

          {/* QUOTE */}
          <div className="relative">
            <span className="absolute -top-6 sm:-top-10 -left-4 sm:-left-8 text-5xl sm:text-7xl md:text-8xl font-serif text-gray-100 select-none">
              “
            </span>

            <motion.div
              variants={sentence}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-base sm:text-lg md:text-2xl font-light text-gray-600 leading-relaxed italic"
            >
              {data?.description?.split("").map((char, index) => (
                <motion.span key={char + "-" + index} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* SIGNATURE */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-gray-100 flex items-center gap-4 sm:gap-6"
          >
            {data?.signature ? (
              <img
                src={data.signature}
                alt="Signature"
                className="h-12 sm:h-16 object-contain"
              />
            ) : (
              <div className="h-1 bg-primary w-10 sm:w-12" />
            )}
            <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
              Chairman of the Board
            </p>
          </motion.div>
        </div>

        {/* RIGHT: IMAGE */}
        <div className="w-full md:w-2/5 relative">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="relative z-10 group"
          >
            {/* Floating Image */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-xl sm:md:rounded-2xl rounded-md overflow-hidden md:shadow-2xl border-4 sm:border-8 border-white"
            >
              <img
                src={data?.image}
                alt={data?.name}
                className="w-full h-[260px] sm:h-[360px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* DECORATIONS */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 sm:-top-10 -right-6 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-blue-50 rounded-full -z-10 opacity-60"
            />
            <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 h-20 sm:w-32 sm:h-32 bg-gray-100 rounded-lg -z-10 rotate-12" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ChairmanSpeech;
