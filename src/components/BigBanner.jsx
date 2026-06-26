import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const BigBanner = ({ images = [], loading = false }) => {
  const containerRef = useRef(null);
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 30,
    restDelta: 0.001
  });

  /* ------------------ Parallax & Animation Logic ------------------ */
  
  // 1. Reveal effect: The image box grows and rounds out
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.3],
    ["inset(12% 8% 12% 8% round 40px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  // 2. Parallax: Background images scale down slowly
  const imageScale = useTransform(smoothProgress, [0, 1], [1.3, 1.1]);
  
  // 3. Parallax: Text moves faster than the scroll (Floating effect)
  const textY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="w-full h-full bg-neutral-200 animate-pulse flex items-center justify-center">
      <div className="space-y-4 w-1/2">
        <div className="h-4 bg-neutral-300 rounded w-1/4 mx-auto" />
        <div className="h-12 bg-neutral-300 rounded w-full" />
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="relative w-full h-[250vh] bg-[#0a0a0a]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div
          style={{ clipPath, willChange: "clip-path" }}
          className="relative w-full h-full overflow-hidden bg-white md:shadow-2xl"
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              <Carousel
                plugins={[autoplay.current]}
                opts={{ loop: true, duration: 50 }}
                className="w-full h-full"
              >
                <CarouselContent className="ml-0 h-full">
                  {images.map((img, index) => (
                    <CarouselItem key={index} className="pl-0 h-full">
                      <div className="relative w-full h-full overflow-hidden">
                        <motion.img
                          style={{ scale: imageScale }}
                          src={img.url || img}
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        {/* Glassy Overlay linear */}
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/60 backdrop-brightness-90" />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Floating Content Layer (Parallax Text) */}
              <motion.div 
                style={{ y: textY, opacity }}
                className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6"
              >
                <h2 className="text-white/70 text-xs md:text-sm font-bold tracking-[0.5em] uppercase mb-4">
                  Experience Luxury
                </h2>
                <h1 className="text-white text-5xl md:text-8xl font-light tracking-tighter max-w-4xl">
                  Refined <span className="italic font-serif text-white/80">Architecture</span>
                </h1>
              </motion.div>

              {/* Top Right Floating Badge */}
              <div className="absolute top-12 right-12 z-40">
                <div className="px-4 py-2 border border-white/20 bg-white/10 backdrop-blur-xl rounded-full">
                  <span className="text-white text-[10px] font-bold tracking-widest uppercase">
                    New Collection 2026
                  </span>
                </div>
              </div>

              {/* Bottom Navigation / Progress Bar */}
              <div className="absolute bottom-12 left-12 right-12 z-40 flex items-end justify-between">
                <div className="flex items-center gap-6">
                  <div className="h-[2px] w-32 bg-white/20 relative overflow-hidden">
                    <motion.div 
                      className="absolute inset-0 bg-white origin-left"
                      style={{ scaleX: smoothProgress }}
                    />
                  </div>
                  <span className="text-white/50 text-[10px] font-medium tracking-widest">
                    SCROLL TO REVEAL
                  </span>
                </div>
                
                {/* Minimalist Counter */}
                <div className="hidden md:block">
                  <p className="text-white/20 text-6xl font-light italic">01</p>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default BigBanner;