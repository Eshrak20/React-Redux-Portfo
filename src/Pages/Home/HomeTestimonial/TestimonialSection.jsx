
import CumButton from "@/components/CumButton/CumButton";
import Title from "@/components/Title/Title";
import TestimonialCard from "./TestimonialCard";

import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
  User,
  X,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const TestimonialSection = ({ testimonial = [] }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const shouldReduceMotion = useReducedMotion();

  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef(null);
  const displayedTestimonials = isHomePage
    ? testimonial.slice(0, 4)
    : testimonial;

  const canSlide = displayedTestimonials.length > 1;

  // Reset slider when testimonial data changes.
  useEffect(() => {
    setActiveIndex(0);

    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: 0,
        behavior: "instant",
      });
    }
  }, [displayedTestimonials.length]);

  // Track the currently visible mobile card.
  const handleScroll = () => {
    const slider = sliderRef.current;

    if (!slider) return;

    const card = slider.querySelector("[data-testimonial-card]");

    if (!card) return;

    const cardWidth = card.getBoundingClientRect().width;
    const gap = 16;

    const index = Math.round(
      slider.scrollLeft / (cardWidth + gap)
    );

    setActiveIndex(
      Math.min(index, displayedTestimonials.length - 1)
    );
  };

  // Navigate mobile carousel.
  const navigateSlider = (direction) => {
    const slider = sliderRef.current;

    if (!slider) return;

    const nextIndex = Math.max(
      0,
      Math.min(
        activeIndex + direction,
        displayedTestimonials.length - 1
      )
    );

    const card = slider.querySelector("[data-testimonial-card]");

    if (!card) return;

    const gap = 16;
    const cardWidth = card.getBoundingClientRect().width;

    slider.scrollTo({
      left: nextIndex * (cardWidth + gap),
      behavior: shouldReduceMotion ? "instant" : "smooth",
    });

    setActiveIndex(nextIndex);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    const value = Math.min(5, Math.max(0, Number(rating) || 5));

    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < value
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        }`}
      />
    ));
  };

  // Close modal with Escape key.
  useEffect(() => {
    if (!selectedTestimonial) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedTestimonial(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTestimonial]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.97,
      y: 15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 220,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: 10,
      transition: { duration: 0.18 },
    },
  };

  return (
    <section className={isHomePage ? "bg-pink-50 dark:bg-background py-14 sm:py-16" : "py-16 sm:py-20"}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">

        {/* Section heading */}
        <div className="mb-9 text-center sm:mb-12">
          <Title name="What MY Clients Say" />
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden">

          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="
              -mx-4 flex snap-x snap-mandatory gap-4
              overflow-x-auto px-4 pb-5
              scroll-smooth
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            {displayedTestimonials.map((item) => (
              <div
                key={item.id}
                data-testimonial-card
                className="w-[86%] shrink-0 snap-center"
              >
                <TestimonialCard
                  item={item}
                  isHomePage={isHomePage}
                  onClick={() => setSelectedTestimonial(item)}
                />
              </div>
            ))}
          </div>

          {/* Mobile slider controls */}
          {canSlide && (
            <div className="mt-3 flex items-center justify-between px-1">

              <span className="text-xs text-gray-500 dark:text-gray-400">
                {activeIndex + 1} / {displayedTestimonials.length}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigateSlider(-1)}
                  disabled={activeIndex === 0}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:text-gray-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateSlider(1)}
                  disabled={activeIndex === displayedTestimonials.length - 1}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center border border-gray-200 text-gray-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-30 dark:border-gray-700 dark:text-gray-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Tablet and desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.1,
              },
            },
          }}
          className={`hidden md:grid md:grid-cols-2 ${
            isHomePage ? "xl:grid-cols-4" : "xl:grid-cols-3"
          } gap-5 lg:gap-6`}
        >
          {displayedTestimonials.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: {
                  opacity: 0,
                  y: shouldReduceMotion ? 0 : 20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: shouldReduceMotion ? 0 : 0.45,
                  },
                },
              }}
              whileHover={shouldReduceMotion ? undefined : { y: -5 }}
              className="h-full"
            >
              <TestimonialCard
                item={item}
                isHomePage={isHomePage}
                onClick={() => setSelectedTestimonial(item)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* View all */}
        {isHomePage && (
          <div className="mt-9 text-center sm:mt-12">
            <CumButton
              path="/testimonial"
              title="View All Testimonials"
            />
          </div>
        )}
      </div>

      {/* Testimonial modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5">

            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedTestimonial(null)}
            />

            {/* Modal */}
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              aria-labelledby="testimonial-modal-title"
              className="
                relative flex max-h-[90dvh] w-full max-w-2xl
                flex-col overflow-hidden
                rounded-xl bg-white shadow-2xl
                dark:bg-gray-900
              "
            >
              {/* Close */}
              <button
                type="button"
                onClick={() => setSelectedTestimonial(null)}
                aria-label="Close testimonial"
                className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Scrollable content */}
              <div className="overflow-y-auto p-5 sm:p-8">

                {/* Client information */}
                <div className="flex items-center gap-4 pr-10 sm:gap-5">
                  {selectedTestimonial.image ? (
                    <img
                      src={selectedTestimonial.image}
                      alt={selectedTestimonial.name || "Client"}
                      className="h-16 w-16 shrink-0 rounded-full border-2 border-primary/20 object-cover sm:h-20 sm:w-20"
                    />
                  ) : (
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10 sm:h-20 sm:w-20">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                  )}

                  <div className="min-w-0">
                    <h2
                      id="testimonial-modal-title"
                      className="truncate text-xl font-bold text-gray-900 dark:text-white sm:text-2xl"
                    >
                      {selectedTestimonial.name}
                    </h2>

                    {selectedTestimonial.company && (
                      <p className="mt-1 truncate text-sm text-gray-500 dark:text-gray-400 sm:text-base">
                        {selectedTestimonial.company}
                      </p>
                    )}

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-1">
                        {renderStars(selectedTestimonial.star)}
                      </div>

                      <span className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                        <Calendar className="h-3.5 w-3.5" />
                        {formatDate(selectedTestimonial.created_at)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Full testimonial */}
                <div className="relative mt-9 border-t border-gray-100 pt-7 dark:border-gray-800">
                  <Quote className="mb-4 h-8 w-8 text-primary/40" />

                  <blockquote className="text-base leading-8 text-gray-700 dark:text-gray-300 sm:text-lg">
                    {selectedTestimonial.description ||
                      selectedTestimonial.short_description}
                  </blockquote>
                </div>

                {/* Project details */}
                {selectedTestimonial.additional_info && (
                  <div className="mt-7">
                    <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">
                      Project Details
                    </h3>

                    <div className="grid grid-cols-2 gap-4">
                      {selectedTestimonial.project_type && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Project Type
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            {selectedTestimonial.project_type}
                          </p>
                        </div>
                      )}

                      {selectedTestimonial.duration && (
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Duration
                          </p>
                          <p className="mt-1 text-sm font-medium text-gray-900 dark:text-white">
                            {selectedTestimonial.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Results */}
                {selectedTestimonial.results && (
                  <div className="mt-7 border border-primary/10 bg-primary/5 p-5">
                    <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                      Results Achieved
                    </h3>

                    <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
                      {selectedTestimonial.results}
                    </p>
                  </div>
                )}

                {/* Footer actions */}
                <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 dark:border-gray-800 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => setSelectedTestimonial(null)}
                    className="flex-1 border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    Close
                  </button>

                  {selectedTestimonial.website && (
                    <a
                      href={selectedTestimonial.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-primary px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-primary/90"
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
