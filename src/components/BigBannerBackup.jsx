import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=1920&auto=format&fit=crop"
];

const BigBannerBackup = ({ images = [], loading = false }) => {
  const containerRef = useRef(null);

  const displayImages = loading ? DEFAULT_IMAGES : (images.length > 0 ? images : DEFAULT_IMAGES);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  /* ------------------ Responsive Scroll Animations ------------------ */
  
  // On Mobile, we want less 'inset' so the image stays visible
  // Desktop: 15% side inset | Mobile: 5% side inset
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.45],
    [
      "inset(10% 5% 10% 5% round 20px)", // Mobile-friendly starting state
      "inset(0% 0% 0% 0% round 0px)"
    ]
  );

  // We switch values for desktop using a media query approach in the transform would be complex,
  // so we use CSS to handle the container's responsive scaling.
  const imageScale = useTransform(smoothProgress, [0, 1], [1.2, 1.05]);

  return (
    <div ref={containerRef} className="relative w-full h-[140vh] md:h-[180vh] bg-neutral-50">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ 
            clipPath: clipPath,
            willChange: "clip-path"
          }}
          // The lg: clipPath override in CSS if you want to be specific for desktop
          className="relative w-full h-full overflow-hidden bg-white md:shadow-2xl"
        >
          <Carousel
            plugins={[autoplay.current]}
            opts={{ 
              loop: true,
              duration: 45, 
            }}
            className="w-full h-full"
          >
            <CarouselContent className="ml-0 h-full">
              {displayImages.map((img, index) => (
                <CarouselItem key={index} className="pl-0 h-full">
                  <div className="relative w-full h-full overflow-hidden">
                    <motion.img
                      style={{ scale: imageScale }}
                      src={img.url || img}
                      alt={`Slide ${index + 1}`}
                      // Use h-[100dvh] for better mobile viewport handling
                      className="w-full h-[100dvh] object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/40" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Bottom Indicator Section - Optimized for Mobile */}
          <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-40 flex items-center gap-3 md:gap-4">
            <div className="h-[1px] md:h-0.5 w-16 md:w-24 bg-white/30 overflow-hidden">
              <motion.div 
                className="h-full bg-white origin-left"
                style={{ scaleX: smoothProgress }}
              />
            </div>
            <span className="text-white text-[8px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-widest uppercase">
              Scroll to Explore
            </span>
          </div>

          {/* Floating Branding or Badge (Optional for extra "Nice" feel) */}
          <div className="absolute top-8 right-6 md:top-12 md:right-12 z-40">
             <span className="text-white/60 text-[8px] md:text-[10px] font-medium border border-white/20 px-3 py-1 rounded-full backdrop-blur-md">
               PREMIUM REALTY
             </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BigBannerBackup;