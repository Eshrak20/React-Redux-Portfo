import Title from "@/components/Title/Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import techData from "../../../../public/Json/TechData.json";
import "./tech.css";

const TechCard = ({ item, index }) => {
  return (
    <motion.div
      className="group flex min-w-0 flex-col items-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      transition={{ delay: Math.min(index * 0.015, 0.3), duration: 0.3 }}
    >
      <motion.div
        className="tech-card flex h-16 w-16 items-center justify-center rounded-md border border-white/10 bg-secondary/10 shadow-lg backdrop-blur-sm sm:h-20 sm:w-20 md:rounded-sm lg:h-28 lg:w-28"
        style={{
          backgroundColor: item.hexCode ? `${item.hexCode}18` : undefined,
          boxShadow: `0 10px 30px -10px ${item.hexCode || "#ffffff"}50`,
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: `0 0 32px ${item.hexCode || "#ffffff"}60`,
          zIndex: 10,
          opacity: 1,
        }}
      >
        <motion.img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="tech-logo h-8 w-8 object-contain sm:h-10 sm:w-10 lg:h-16 lg:w-16"
          whileHover={{ rotate: 8 }}
        />
      </motion.div>

      <span
        className="mt-2 max-w-full break-words text-center text-[10px] font-semibold tracking-wide sm:mt-3 sm:text-xs lg:mt-4 lg:text-sm"
        style={{ color: item.hexCode || "inherit" }}
      >
        {item.name}
      </span>
    </motion.div>
  );
};

const Tech = () => {
  const [selectedTech, setSelectedTech] = useState("All");
  const autoplay = useRef(null);
  if (!autoplay.current) {
    autoplay.current = Autoplay({
      delay: 2800,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    });
  }

  const allTechs = useMemo(
    () =>
      Object.entries(techData).flatMap(([category, items]) =>
        items.map((item) => ({ ...item, category })),
      ),
    [],
  );

  const categories = ["All", ...Object.keys(techData)];
  const visibleTechs =
    selectedTech === "All"
      ? allTechs
      : allTechs.filter((item) => item.category === selectedTech);

  const selectCategory = (category) => {
    autoplay.current?.stop();
    setSelectedTech(category);
  };

  return (
    <section className="relative overflow-hidden py-5 sm:py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="mb-8 sm:mb-10">
          <Title name="MY Technologies" />
        </div>

        <motion.div
          className="mx-auto mb-8 flex max-w-7xl flex-wrap justify-center gap-2 px-4 sm:mb-12 sm:gap-3 sm:px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          role="group"
          aria-label="Filter technologies by category"
        >
          {categories.map((category) => {
            const isSelected = selectedTech === category;

            return (
              <motion.button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                aria-pressed={isSelected}
                className={`relative min-h-11 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:py-3 ${
                  isSelected
                    ? "bg-secondary text-white shadow-md"
                    : "bg-primary/20 text-secondary hover:bg-primary hover:text-white dark:text-primary dark:hover:text-white"
                }`}
              >
                <span className="relative z-10">
                  {category === "MobileApp" ? "Mobile App" : category}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <div className="mb-12 lg:hidden">
          <Carousel
            plugins={[autoplay.current]}
            opts={{ align: "start", loop: true, skipSnaps: false }}
            className="mx-auto max-w-7xl"
            aria-label="Technology carousel"
          >
            <CarouselContent className="-ml-3 py-3">
              {visibleTechs.map((item, index) => (
                <CarouselItem
                  key={`${item.category}-${item.name}`}
                  className="basis-[28%] pl-2 min-[420px]:basis-1/4 sm:basis-1/5 md:basis-1/6"
                >
                  <TechCard item={item} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <p className="mt-3 text-center text-xs text-muted-foreground sm:hidden">
            Swipe to explore
          </p>
        </div>

        <div className="mx-auto mb-12 hidden max-w-6xl grid-cols-2 justify-items-center gap-x-2 gap-y-6 px-4 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-8 sm:px-6 md:grid-cols-4 lg:mb-20 lg:grid lg:grid-cols-5 xl:grid-cols-6">
          {visibleTechs.map((item, index) => {
            return (
              <TechCard
                key={`${item.category}-${item.name}`}
                item={item}
                index={index}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Tech;
