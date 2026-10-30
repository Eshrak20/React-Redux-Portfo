
import CumButton from "@/components/CumButton/CumButton";
import Title from "@/components/Title/Title";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaExternalLinkAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaSchool,
  FaUniversity,
} from "react-icons/fa";
import { SiCodeforces, SiLaravel } from "react-icons/si";

const icons = {
  FaUniversity,
  FaSchool,
  FaGraduationCap,
  FaLaptopCode,
  SiLaravel,
  SiCodeforces,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const Management = () => {
  const [managementData, setManagementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;

    fetch("/Json/Management.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load education data");
        }

        return res.json();
      })
      .then((data) => {
        if (isMounted) {
          setManagementData(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Education data error:", err);

        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="my-24 px-4 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
        <p className="mt-4 text-sm text-muted-foreground">
          Loading education...
        </p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto my-3 md:my-20 max-w-7xl px-4 sm:my-24 sm:px-6 lg:px-8">
      <Title name="Education & Learning Journey" />

      <div className="relative mt-12 flex items-start gap-8 lg:mt-16">
        {/* Desktop Side Label */}
        <div className="sticky top-32 hidden shrink-0 -rotate-90 lg:mt-28 lg:block">
          <CumButton title="Always Learning" />
        </div>

        {/* Education Cards */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="grid w-full grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6"
        >
          {managementData.map((item, index) => {
            const Icon = icons[item.icon] || FaUniversity;

            return (
              <motion.article
                key={`${item.title}-${index}`}
                variants={shouldReduceMotion ? {} : cardVariants}
                whileHover={
                  shouldReduceMotion
                    ? undefined
                    : {
                        y: -4,
                      }
                }
                className="group relative isolate overflow-hidden border border-border/70 bg-card p-5 transition-colors duration-300 hover:border-primary/40 sm:p-6 lg:p-7 lg:shadow-sm lg:hover:shadow-lg"
              >
                {/* Subtle top accent */}
                <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

                {/* Background Decoration */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/[0.04] blur-3xl transition-colors duration-300 group-hover:bg-primary/[0.09]" />

                <div className="relative flex items-start justify-between gap-4">
                  {/* Icon */}
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-primary/15 bg-primary/10 text-2xl text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white sm:h-14 sm:w-14 sm:text-3xl">
                    <Icon />
                  </div>

                  {/* External Link */}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${item.title}`}
                      className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors duration-200 hover:border-primary hover:bg-primary hover:text-white"
                    >
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}
                </div>

                <div className="relative mt-6">
                  {/* Learning Path Label */}
                  <div className="mb-3 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-primary" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
                      Learning Journey
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold leading-snug text-card-foreground transition-colors duration-200 group-hover:text-primary sm:text-xl">
                    {item.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-7 text-muted-foreground sm:text-base">
                    {item.subtitle}
                  </p>

                  {/* Status */}
                  {item.status && (
                    <div className="mt-6 flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping bg-primary/40" />
                        <span className="relative inline-flex h-2 w-2 bg-primary" />
                      </span>

                      <span className="border border-primary/15 bg-primary/5 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary sm:text-xs">
                        {item.status}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Number */}
                <span className="pointer-events-none absolute bottom-3 right-5 text-5xl font-black tracking-tighter text-foreground/[0.035] sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {!managementData.length && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No education information available.
        </p>
      )}
    </section>
  );
};

export default Management;
