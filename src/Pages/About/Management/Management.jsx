
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import TimelineCard from "./TimelineCard";

const Management = () => {
  const [managementData, setManagementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const controller = new AbortController();

    const fetchEducation = async () => {
      try {
        const response = await fetch("/Json/Management.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load education data");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid education data");
        }

        setManagementData(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Education data error:", error);
          setLoadError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchEducation();

    return () => controller.abort();
  }, []);

  return (
    <section
      aria-labelledby="management-mobile-heading"
      aria-busy={loading}
      className="
        relative mx-auto max-w-7xl
        overflow-hidden
        px-4 py-12
        sm:px-6 sm:py-14
        lg:hidden
      "
    >
      {/* Section Heading */}
      <motion.header
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 20 }
        }
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.5,
        }}
        className="mb-10 text-center sm:mb-12"
      >
        <p className="
          mb-3 text-[10px] font-bold
          uppercase tracking-[0.25em]
          text-primary sm:text-xs
        ">
          My Learning Journey
        </p>

        <h2
          id="management-mobile-heading"
          className="
            text-3xl font-bold tracking-tight
            text-foreground
            sm:text-4xl
          "
        >
          Education & Learning Journey
        </h2>

        <p className="
          mx-auto mt-3 max-w-md
          text-xs leading-relaxed
          text-muted-foreground
          sm:text-sm sm:leading-7
        ">
          Every step of my education, learning, and professional development.
        </p>

        <div className="
          mx-auto mt-5 h-1 w-12
          rounded-full bg-primary
        " />
      </motion.header>

      {/* Loading State */}
      {loading ? (
        <div
          role="status"
          className="flex justify-center py-12"
        >
          <span className="
            h-8 w-8 animate-spin rounded-full
            border-2 border-primary/20
            border-t-primary
          " />

          <span className="sr-only">
            Loading education history...
          </span>
        </div>
      ) : loadError ? (
        <p
          role="alert"
          className="
            mx-auto max-w-md
            rounded-xl border border-border
            bg-card px-5 py-6
            text-center text-sm
            text-muted-foreground
          "
        >
          Education history could not be loaded.
          Please try again later.
        </p>
      ) : managementData.length ? (

        /* Education Timeline */
        <div className="relative mx-auto max-w-3xl">

          {/* Timeline Line */}
          <div
            aria-hidden="true"
            className="
              absolute bottom-3 left-[11px] top-3
              w-[2px]
              bg-gradient-to-b
              from-transparent
              via-primary/40
              to-transparent

              sm:left-1/2
              sm:-translate-x-1/2
            "
          />

          {/* Timeline Items */}
          <div className="
            space-y-6
            sm:space-y-7
          ">
            {managementData.map((item, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${item.title}-${item.period || index}`}
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: 20,
                        }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.15,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.5,
                    ease: "easeOut",
                  }}
                  className="
                    relative grid
                    grid-cols-[24px_minmax(0,1fr)]
                    items-start
                    gap-x-3

                    sm:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)]
                    sm:gap-x-0
                  "
                >

                  {/* Timeline Marker */}
                  <div className="
                    relative z-10
                    col-start-1 row-start-1
                    flex justify-center
                    pt-1

                    sm:col-start-2
                  ">
                    <span className="
                      flex h-6 w-6
                      items-center justify-center

                      rounded-full
                      border-[4px]
                      border-background
                      bg-primary

                      shadow-[0_0_0_4px]
                      shadow-primary/10

                      sm:h-7 sm:w-7
                    ">
                      <span className="
                        h-1.5 w-1.5
                        rounded-full
                        bg-primary-foreground
                      " />
                    </span>
                  </div>

                  {/* Alternating Timeline Card */}
                  <div
                    className={`
                      col-start-2
                      row-start-1
                      min-w-0

                      ${
                        isLeft
                          ? "sm:col-start-1 sm:row-start-1 sm:pr-6"
                          : "sm:col-start-3 sm:row-start-1 sm:pl-6"
                      }
                    `}
                  >

                    {/* Period */}
                    <p className={`
                      mb-2.5
                      flex items-center gap-2

                      text-[10px]
                      font-bold uppercase
                      tracking-wider
                      text-primary

                      sm:mb-3
                      sm:text-xs

                      ${
                        isLeft
                          ? "sm:justify-end sm:text-right"
                          : "sm:justify-start sm:text-left"
                      }
                    `}>
                      <span className="
                        h-1.5 w-1.5
                        shrink-0 rounded-full
                        bg-primary

                        sm:hidden
                      " />

                      {item.period || "Education"}
                    </p>

                    {/* Reusable Card */}
                    <TimelineCard
                      item={item}
                      index={index}
                    />
                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Timeline End Decoration */}
          <div
            aria-hidden="true"
            className="
              absolute -bottom-1
              left-[6px]
              h-3 w-3
              rounded-full
              bg-primary/30

              sm:left-1/2
              sm:-translate-x-1/2
            "
          />

        </div>
      ) : (

        /* Empty State */
        <div className="
          rounded-xl
          border border-dashed
          border-border
          px-5 py-12
          text-center
        ">
          <p className="text-sm text-muted-foreground">
            No education information available.
          </p>
        </div>
      )}
    </section>
  );
};

export default Management;
