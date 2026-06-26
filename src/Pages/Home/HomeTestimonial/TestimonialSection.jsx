import React, { useState } from "react";
import Title from "@/components/Title/Title";
import { Star, Quote, User, Calendar, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import CumButton from "@/components/CumButton/CumButton";

const TestimonialSection = ({ testimonial }) => {
  const location = useLocation();
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  
  const isHomePage = location.pathname === "/";
  const displayedTestimonials = isHomePage ? testimonial?.slice(0, 4) : testimonial;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5 
      },
    },
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={18}
        className={`${
          i < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  return (
    <section className={`${isHomePage ? 'py-16' : 'py-20'} bg-linear-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950`}>
      {/* GLOBAL STRUCTURE WRAPPER ALIGNMENT */}
      <div className="container md:container lg:container mx-auto md:mx-auto lg:mx-auto px-6 md:px-8 lg:px-12">
        
        <div className="text-center mb-12">
          <Title name="What MY Clients Say" />
          <p className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
            Trusted feedback from businesses we've partnered with to drive their success
          </p>
        </div>

        {/* Stats Banner (Only on Home Page) */}
        {isHomePage && (
          <div className="mb-12">
            <div className="bg-linear-to-r from-primary/10 to-secondary/10 md:rounded-2xl rounded-md p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">98%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Client Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">150+</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Projects Delivered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">4.9</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">95%</div>
                  <div className="text-gray-600 dark:text-gray-400 text-sm">Repeat Business</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Testimonial Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className={`grid grid-cols-1 md:grid-cols-2 ${isHomePage ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}
        >
          {displayedTestimonials?.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => isHomePage && setSelectedTestimonial(item)}
              className={`bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 hover:border-primary/30 transition-all duration-300 cursor-pointer ${isHomePage ? 'h-full' : ''}`}
            >
              <div className="p-6 h-full flex flex-col">
                {/* Header with Client Info */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="relative">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-primary/20"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg truncate">
                      {item.name}
                    </h3>
                    {item.company && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 truncate">
                        {item.company}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 dark:text-gray-400 text-xs">
                        {formatDate(item.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary/30" />
                </div>

                {/* Testimonial Content */}
                <div className="flex-1 mb-6">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm line-clamp-4">
                    {item.short_description}
                  </p>
                  
                  {/* Read More Indicator (Only for Home Page) */}
                  {isHomePage && item.long_description && (
                    <div className="mt-3">
                      <span className="inline-flex items-center text-primary text-sm font-medium">
                        Read more <ChevronRight className="w-4 h-4 ml-1" />
                      </span>
                    </div>
                  )}
                </div>

                {/* Rating and Actions */}
                <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {renderStars(item.star || 5)}
                    </div>
                    {!isHomePage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTestimonial(item);
                        }}
                        className="text-sm text-primary hover:text-primary/80 font-medium"
                      >
                        View Full
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button (Only on Home Page) */}
        {isHomePage && (
          <div className="text-center mt-12">
            <CumButton path="/testimonial" title="View All Testimonials"/>
          </div>
        )}
      </div>

      {/* Testimonial Detail Modal System */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            />

            {/* Modal Shell */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] bg-white dark:bg-gray-900 md:rounded-2xl rounded-md md:shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button Anchor */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 transition-colors shadow"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Scrollable Shell Block */}
              <div className="overflow-y-auto flex-1 p-5 sm:p-8 custom-scrollbar">
                {/* Client Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                  <div className="relative shrink-0">
                    {selectedTestimonial.image ? (
                      <img
                        src={selectedTestimonial.image}
                        alt={selectedTestimonial.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border-3 border-primary/20"
                      />
                    ) : (
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">
                      {selectedTestimonial.name}
                    </h2>
                    {selectedTestimonial.company && (
                      <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg mt-0.5 truncate">
                        {selectedTestimonial.company}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2.5">
                      <div className="flex items-center gap-1 text-amber-500">
                        {renderStars(selectedTestimonial.star || 5)}
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-xs sm:text-sm">
                        <Calendar className="w-4 h-4" />
                        {formatDate(selectedTestimonial.created_at)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Content */}
                <div className="relative mb-6 sm:mb-8 pt-4">
                  <Quote className="absolute left-0 -top-1 w-8 h-8 text-primary/10" />
                  <blockquote className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed pl-6 italic">
                    "{selectedTestimonial.long_description || selectedTestimonial.short_description}"
                  </blockquote>
                </div>

                {/* Additional Metadata Details */}
                {selectedTestimonial.additional_info && (
                  <div className="mb-6 sm:mb-8">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
                      Project Details
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedTestimonial.project_type && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Project Type</span>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            {selectedTestimonial.project_type}
                          </p>
                        </div>
                      )}
                      {selectedTestimonial.duration && (
                        <div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">Duration</span>
                          <p className="text-sm text-gray-900 dark:text-white font-medium">
                            {selectedTestimonial.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Metrics / Outcome Results */}
                {selectedTestimonial.results && (
                  <div className="bg-primary/5 rounded-xl p-5 mb-6 sm:mb-8">
                    <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                      Results Achieved
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {selectedTestimonial.results}
                    </p>
                  </div>
                )}

                {/* Action Controls Footer */}
                <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-gray-100 dark:border-gray-800 mt-auto">
                  <button
                    onClick={() => setSelectedTestimonial(null)}
                    className="w-full sm:flex-1 order-2 sm:order-1 px-5 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                  >
                    Close
                  </button>
                  {selectedTestimonial.website && (
                    <a
                      href={selectedTestimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:flex-1 order-1 sm:order-2 px-5 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors text-center text-sm"
                    >
                      Visit Client Website
                    </a>
                  )}
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TestimonialSection;