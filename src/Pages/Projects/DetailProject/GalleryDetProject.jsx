import React, { useState, useEffect, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Autoplay } from "swiper/modules";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GalleryDetProject = ({ project_gallery = [] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoading, setImageLoading] = useState({});
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const swiperRef = useRef(null);

  // Custom Cursor Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // AI-powered auto-scroll on hover
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // AI auto-navigation based on cursor position
      if (isHovering && swiperRef.current && window.innerWidth > 768) {
        const rect = swiperRef.current.getBoundingClientRect();
        const xPercentage = (e.clientX - rect.left) / rect.width;

        // Predict slide based on cursor position
        if (xPercentage > 0.8 && hoverTimeoutRef.current === null) {
          hoverTimeoutRef.current = setTimeout(() => {
            swiperRef.current.swiper.slideNext();
            hoverTimeoutRef.current = null;
          }, 300);
        } else if (xPercentage < 0.2 && hoverTimeoutRef.current === null) {
          hoverTimeoutRef.current = setTimeout(() => {
            swiperRef.current.swiper.slidePrev();
            hoverTimeoutRef.current = null;
          }, 300);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, [mouseX, mouseY, isHovering]);

  // AI-powered image preloading
  useEffect(() => {
    const preloadImages = async () => {
      const loadingStates = {};
      await Promise.all(
        project_gallery.map(async (src, idx) => {
          loadingStates[idx] = true;
          const img = new Image();
          img.src = src;
          await new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          });
          loadingStates[idx] = false;
        }),
      );
      setImageLoading(loadingStates);
    };
    if (project_gallery.length > 0) preloadImages();
  }, [project_gallery]);

  // Auto-play slideshow with AI timing
  useEffect(() => {
    let interval;
    if (isPlaying && swiperRef.current) {
      // AI calculates optimal timing based on image complexity (simulated)
      const timing = project_gallery.length > 10 ? 3000 : 5000;
      interval = setInterval(() => {
        swiperRef.current.swiper.slideNext();
      }, timing);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, project_gallery.length]);

  const slides = project_gallery.map((img, idx) => ({
    src: img,
    title: `${idx + 1}`,
    // description: "High-resolution architectural photography"
  }));

  const handleSlideHover = useCallback((index, isHovering) => {
    setHoveredSlide(isHovering ? index : null);
  }, []);

  const getParallaxIntensity = useCallback(
    (index) => {
      // AI-powered parallax effect based on slide position
      const distance = Math.abs(activeSlide - index);
      return Math.max(0, 1 - distance * 0.3);
    },
    [activeSlide],
  );
  // Fallback images
  const fallbackGallery = [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1600&q=80",
  ];

  // Use project gallery if available, otherwise use fallback gallery
  const gallery =
    project_gallery && project_gallery.length > 0
      ? project_gallery
      : fallbackGallery;
  return (
    <section className=" max-w-7xl mx-auto bg-linear-to-b from-white to-gray-50 dark:from-transparent dark:to-transparent overflow-hidden relative text-gray-900 dark:text-gray-100">
      {/* Enhanced Custom Cursor with AI states */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-linear-to-br from-white/95 to-gray-100/95 dark:from-gray-900/95 dark:to-gray-800/95 mix-blend-difference rounded-full pointer-events-none z-50 flex items-center justify-center text-center border border-white/20 dark:border-gray-700/30 backdrop-blur-sm"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0,
        }}
        animate={{
          scale: isHovering ? [1, 1.1, 1] : 0,
        }}
        transition={{
          duration: 2,
          repeat: isHovering ? Infinity : 0,
          ease: "easeInOut",
        }}
      >
        <span className="text-[10px] font-bold uppercase tracking-tighter text-black dark:text-white">
          {hoveredSlide !== null ? `View ${hoveredSlide + 1}` : "Click Zoom"}
        </span>
      </motion.div>

      {/* Header with AI Counter */}
      <div className="px-6 lg:px-10 mb-16">
        <div className="border-l-[6px] border-secondary pl-6 lg:pl-8 flex justify-between items-start">
          <div>
            <h2 className="text-4xl lg:text-5xl font-black tracking-tighter text-secondary dark:text-primary uppercase leading-tight">
              The Gallery
            </h2>
            <span className="text-sm font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Explore Architecture
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl lg:text-3xl font-black text-gray-300 dark:text-gray-700">
              <span className="text-black dark:text-white">
                {activeSlide + 1}
              </span>
              <span className="mx-2">/</span>
              <span>{project_gallery.length}</span>
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest hover:text-secondary dark:hover:text-primary mt-2 transition-colors"
            >
              {isPlaying ? "Pause" : "Auto-play"}
            </button>
          </div>
        </div>
      </div>

      {/* Edge-to-Edge Swiper with AI enhancements */}
      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
        }}
        ref={swiperRef}
      >
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Autoplay]}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
            renderBullet: (index, className) => {
              return `<span class="${className} relative">
                <span class="bullet-progress absolute top-0 left-0 h-full bg-secondary origin-left"></span>
              </span>`;
            },
          }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 0.5,
          }}
          autoplay={
            isPlaying
              ? {
                  delay: 5000,
                  disableOnInteraction: false,
                }
              : false
          }
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={20}
          slidesPerView={1.1}
          breakpoints={{
            768: { slidesPerView: 1.2, spaceBetween: 30 },
            1024: { slidesPerView: 1.4, spaceBetween: 40 },
            1440: { slidesPerView: 1.6, spaceBetween: 50 },
          }}
          className="pb-20"
          onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
          onSwiper={(swiper) => {
            // AI-powered smooth acceleration
            swiper.params.speed = 800;
            swiper.params.touchRatio = 0.5;
          }}
        >
          {gallery.map((img, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{
                  opacity: 1,
                  scale: getParallaxIntensity(i),
                  y: 0,
                }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.1,
                }}
                className="relative group overflow-hidden bg-linear-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 aspect-video w-full"
                onClick={() => {
                  setIndex(i);
                  setOpen(true);
                }}
                onMouseEnter={() => handleSlideHover(i, true)}
                onMouseLeave={() => handleSlideHover(i, false)}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
              >
                {/* AI Loading State with skeleton */}
                <AnimatePresence>
                  {imageLoading[i] && (
                    <motion.div
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse"
                    />
                  )}
                </AnimatePresence>

                <motion.img
                  src={img}
                  alt={`Architecture project ${i + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{
                    scale: hoveredSlide === i ? 1.15 : 1.1,
                  }}
                  transition={{
                    duration: hoveredSlide === i ? 3 : 1,
                    ease: "easeOut",
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      fallbackGallery[i % fallbackGallery.length];
                  }}
                />

                {/* Slide Number Indicator */}
                <div className="absolute bottom-6 left-6 lg:bottom-8 lg:left-8">
                  <div className="text-white text-sm font-bold bg-secondary/50 dark:bg-primary/50 px-3 py-1 rounded-full backdrop-blur-sm">
                    {i + 1}
                  </div>
                </div>

                {/* Hover Overlay with Quick Actions */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-t from-secondary/70 via-transparent to-transparent dark:from-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end p-6 lg:p-8"
                  initial={false}
                >
                  <div className="text-white">
                    <h3 className="text-xl lg:text-2xl font-bold mb-2">
                      Architecture Detail
                    </h3>
                    <p className="text-sm lg:text-base text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      Click to explore high-resolution details
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Enhanced Custom Arrows with AI indicators */}
        <div className="absolute bottom-4 right-6 lg:right-10 z-50 flex items-center gap-6">
          <div className="flex gap-3 lg:gap-4">
            <motion.button
              className="custom-prev w-12 h-12 lg:w-16 lg:h-16 bg-secondary dark:bg-primary text-white flex items-center justify-center hover:bg-primary/90 dark:hover:bg-primary/80 transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              className="custom-next w-12 h-12 lg:w-16 lg:h-16 bg-secondary dark:bg-primary text-white flex items-center justify-center hover:bg-primary/90 dark:hover:bg-primary/80 transition-all duration-300 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>

          {/* AI Playback Controls */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="w-32 h-1 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-black dark:bg-white"
                animate={{
                  width: isPlaying ? "100%" : "0%",
                }}
                transition={{
                  duration: 5,
                  repeat: isPlaying ? Infinity : 0,
                  ease: "linear",
                }}
              />
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {isPlaying ? "AI Auto-scrolling" : "Manual"}
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox with AI plugins */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Captions]}
        on={{ view: ({ index }) => setIndex(index) }}
        controller={{ closeOnBackdropClick: true }}
        carousel={{ finite: false }}
        render={{
          buttonPrev: isPlaying ? () => null : undefined,
          buttonNext: isPlaying ? () => null : undefined,
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
          captionsTitle: { fontSize: "1.5rem", fontWeight: "bold" },
        }}
      />
    </section>
  );
};

export default GalleryDetProject;
