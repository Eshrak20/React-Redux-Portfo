import React from "react";
import { motion } from "framer-motion";

const MainTestimonial = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const renderStars = (rating) =>
    [...Array(5)].map((_, i) => (
      <span
        key={i}
        className={`text-lg sm:text-xl ${
          i < rating ? "text-amber-400" : "text-gray-200"
        }`}
      >
        ★
      </span>
    ));

  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
      {/* Background Blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 w-72 h-72 sm:w-[40%] sm:h-[40%] bg-blue-50/60 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 sm:w-[40%] sm:h-[40%] bg-purple-50/60 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
            Voices of{" "}
            <span className="italic font-light text-primary">Excellence</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-14"
        >
          {data.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className={`
                relative group bg-white border border-gray-100
                p-6 sm:p-8 md:p-14
                md:rounded-2xl rounded-md md:rounded-[2rem]
                shadow-[0_15px_40px_rgba(0,0,0,0.05)]
                hover:shadow-[0_35px_70px_rgba(0,0,0,0.1)]
                transition-all duration-500
                ${index % 3 === 0 ? "md:col-span-2 lg:col-span-1" : ""}
              `}
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-1 md:-left-6 sm:-top-6 sm:-left-6 w-10 h-10 sm:w-16 sm:h-16 bg-primary rounded-md  sm:md:rounded-2xl rounded-md flex items-center justify-center shadow-xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <span className="text-white text-3xl sm:text-4xl font-serif">“</span>
              </div>

              <div className="flex flex-col h-full justify-between">
                <div>
                  {/* Stars */}
                  <div className="flex gap-1 mb-6 md:mb-8">
                    {renderStars(item.star)}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-lg sm:text-xl md:text-3xl font-light text-gray-800 leading-snug italic mb-8 md:mb-10">
                    {item.description}
                  </blockquote>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 sm:gap-6 mt-auto">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 border-2 border-gray-100 p-1"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 sm:ring-4 ring-gray-900/5 group-hover:ring-gray-900/10 transition-all" />
                  </div>

                  <div>
                    <h4 className="text-sm sm:text-base md:text-xl font-bold text-gray-900 uppercase tracking-widest">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium">
                      {item.short_description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative SVG */}
              <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H14.017C13.4647 8 13.017 8.44772 13.017 9V15C13.017 17.2091 14.8079 19 17.017 19H17.017" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MainTestimonial;
