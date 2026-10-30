
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MiniAbout = ({ about, metrics = [] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const [animatedValues, setAnimatedValues] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();

    setMousePos({
      x: (clientX - left) / width - 0.5,
      y: (clientY - top) / height - 0.5,
    });
  };

  useEffect(() => {
    if (!isInView || !metrics.length) return;

    const intervals = [];

    metrics.forEach((metric) => {
      const targetValue = parseInt(
        String(metric.value).replace(/[^0-9]/g, "")
      );

      if (isNaN(targetValue)) return;

      let start = 0;
      const duration = 2000;
      const increment = targetValue / (duration / 16);

      const counter = setInterval(() => {
        start += increment;

        if (start >= targetValue) {
          start = targetValue;
          clearInterval(counter);
        }

        setAnimatedValues((prev) => ({
          ...prev,
          [metric.id]: Math.floor(start).toLocaleString(),
        }));
      }, 16);

      intervals.push(counter);
    });

    return () => intervals.forEach(clearInterval);
  }, [isInView, metrics]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-12 sm:py-16 md:py-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-slate-200/40 dark:bg-primary/5 rounded-full blur-[110px]" />
      </div>

      <div className="container mx-auto relative px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-16 items-center">

          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: 1000 }}
            className="relative flex justify-center items-center"
          >
            {/* Decorative Ring */}
            <div className="absolute w-[85%] aspect-square rounded-full border border-primary/10 rotate-12 scale-105" />

            <motion.div
              animate={{
                rotateY: mousePos.x * 8,
                rotateX: -mousePos.y * 8,
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="
                relative isolate overflow-hidden
                w-[85%] sm:w-[75%] lg:w-full
                aspect-square
                rounded-[42%_58%_55%_45%/48%_42%_58%_52%]
                shadow-xl sm:shadow-2xl
                border-[5px] sm:border-[7px]
                border-white dark:border-slate-900
              "
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  x: [0, -5, 0],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              >
                <img
                  src={about?.data?.[0]?.banner}
                  alt="Corporate Banner"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Floating Decorative Dot */}
            <div className="absolute top-[12%] right-[12%] w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary/80 shadow-lg shadow-primary/30" />

            <div className="absolute bottom-[12%] left-[10%] w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary/50" />
          </motion.div>

          {/* CONTENT SECTION */}
          <div className="flex flex-col space-y-5 sm:space-y-7 md:space-y-8">

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="h-0.5 w-7 sm:w-8 bg-primary rounded-full" />
                <span className="text-primary font-bold tracking-[0.2em] text-[10px] sm:text-xs md:text-sm uppercase">
                  My Journey
                </span>
              </div>

              <h2 className="text-[27px] sm:text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-[1.2] tracking-tight">
                Curious Mind <br className="hidden sm:block" />
                <span className="text-primary underline decoration-slate-200 dark:decoration-slate-700 underline-offset-[6px] sm:underline-offset-8">
                  Debugging Real-World
                </span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="
                prose prose-sm sm:prose-base md:prose-lg
                dark:prose-invert max-w-none
                prose-p:text-slate-600 dark:prose-p:text-slate-300
                prose-p:leading-relaxed
                prose-strong:text-slate-900 dark:prose-strong:text-white
                prose-a:text-primary
                prose-headings:text-slate-900 dark:prose-headings:text-white
              "
              dangerouslySetInnerHTML={{
                __html: about?.data?.[0]?.who_we_are || "",
              }}
            />

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 sm:pt-2">
              {metrics.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="
                    relative overflow-hidden
                    bg-slate-50 dark:bg-slate-900/80
                    border border-slate-100 dark:border-slate-800
                    p-3.5 sm:p-5 md:p-6
                    rounded-2xl sm:rounded-3xl
                    group
                    transition-all duration-300
                    hover:bg-primary dark:hover:bg-primary
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-primary/10
                  "
                >
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-white transition-colors">
                    {animatedValues[item.id] || 0}
                    <span className="text-primary group-hover:text-white/80">+</span>
                  </h3>

                  <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs md:text-sm uppercase font-semibold tracking-wider group-hover:text-white/80 transition-colors">
                    {item.name}
                  </p>

                  <div className="absolute -right-4 -bottom-5 w-16 h-16 rounded-full bg-primary/5 group-hover:bg-white/10 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MiniAbout;
