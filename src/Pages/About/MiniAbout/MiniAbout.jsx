
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MiniAbout = ({ about, metrics = [] }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.2,
  });

  const [animatedValues, setAnimatedValues] = useState({});
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } =
      currentTarget.getBoundingClientRect();

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
      className="
        relative overflow-hidden
        py-10 sm:py-14
        lg:py-14 xl:py-20 2xl:py-24
      "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/5 dark:bg-primary/10 rounded-full blur-[100px]" />

        <div className="absolute bottom-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-slate-200/40 dark:bg-primary/5 rounded-full blur-[110px]" />
      </div>

      <div
        className="
          container mx-auto relative
          px-4 sm:px-6 lg:px-7 xl:px-8 2xl:px-10
        "
      >
        <div
          className="
            grid items-center
            grid-cols-1
            gap-9 sm:gap-12
            lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
            lg:gap-7 xl:gap-10 2xl:gap-16
          "
        >
          {/* IMAGE SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            style={{ perspective: 1000 }}
            className="
              relative flex items-center justify-center
              w-full mx-auto
              max-w-[380px]
              sm:max-w-[420px]
              lg:max-w-none
              lg:w-full
            "
          >
            {/* Decorative Ring */}
            <div
              className="
                absolute w-[85%] aspect-square
                rounded-full border border-primary/10
                rotate-12 scale-105
              "
            />

            <motion.div
              animate={{
                rotateY: mousePos.x * 8,
                rotateX: -mousePos.y * 8,
              }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              className="
                relative isolate overflow-hidden
                w-[85%] sm:w-[78%]
                lg:w-full
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

            {/* Decorative Dots */}
            <div className="absolute top-[12%] right-[12%] w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-primary/80 shadow-lg shadow-primary/30" />

            <div className="absolute bottom-[12%] left-[10%] w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-primary/50" />
          </motion.div>

          {/* CONTENT SECTION */}
          <div
            className="
              flex flex-col min-w-0
              space-y-4 sm:space-y-6
              lg:space-y-4
              xl:space-y-6
              2xl:space-y-7
            "
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div
                className="
                  mb-3 lg:mb-2.5 xl:mb-4
                  flex items-center gap-3
                "
              >
                <span className="h-0.5 w-7 sm:w-8 bg-primary rounded-full" />

                <span
                  className="
                    text-primary font-bold uppercase
                    tracking-[0.2em]
                    text-[10px] sm:text-xs
                    lg:text-[10px] xl:text-xs 2xl:text-sm
                  "
                >
                  My Journey
                </span>
              </div>

              <h2
                className="
                  font-bold tracking-tight
                  text-slate-900 dark:text-white
                  leading-[1.2]
                  text-[26px]
                  md:text-xl
                  lg:text-xl
                  2xl:text-4xl
                "
              >
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
                prose max-w-none min-w-0
                prose-p:leading-relaxed
                prose-strong:text-slate-900
                dark:prose-strong:text-white
                prose-a:text-primary
                prose-headings:text-slate-900
                dark:prose-headings:text-white
                prose-p:text-slate-600
                dark:prose-p:text-slate-300
                prose-sm
                sm:prose-base
                lg:prose-[0.8rem]
                xl:prose-base
                2xl:prose-lg
                dark:prose-invert

                [&_p]:!my-2
                lg:[&_p]:!my-1.5
                xl:[&_p]:!my-2.5

                [&_h2]:!text-xl
                lg:[&_h2]:!text-base
                xl:[&_h2]:!text-xl

                [&_h3]:!text-lg
                lg:[&_h3]:!text-sm
                xl:[&_h3]:!text-lg

                [&_ul]:!my-2
                [&_ol]:!my-2
                [&_li]:!my-1
              "
              dangerouslySetInnerHTML={{
                __html: about?.data?.[0]?.who_we_are || "",
              }}
            />

            {/* Metrics */}
            <div
              className="
                grid grid-cols-2
                gap-3 sm:gap-4
                lg:gap-2.5
                xl:gap-4
                2xl:gap-5
                pt-1
              "
            >
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
                    p-3 sm:p-5
                    lg:p-3
                    xl:p-4
                    2xl:p-6
                    rounded-xl sm:rounded-2xl
                    2xl:rounded-3xl
                    group
                    transition-all duration-300
                    hover:bg-primary dark:hover:bg-primary
                    hover:-translate-y-1
                    hover:shadow-lg hover:shadow-primary/10
                  "
                >
                  <h3
                    className="
                      font-bold
                      text-xl sm:text-3xl
                      lg:text-2xl
                      xl:text-3xl
                      2xl:text-2xl
                      text-slate-900
                      transition-colors
                      group-hover:text-white
                      dark:text-white
                    "
                  >
                    {animatedValues[item.id] || 0}

                    <span className="text-primary group-hover:text-white/80">
                      +
                    </span>
                  </h3>

                  <p
                    className="
                      font-semibold uppercase tracking-wider
                      text-[9px] sm:text-xs
                      lg:text-[9px]
                      xl:text-xs
                      2xl:text-sm
                      text-slate-500
                      transition-colors
                      group-hover:text-white/80
                      dark:text-slate-400
                    "
                  >
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
