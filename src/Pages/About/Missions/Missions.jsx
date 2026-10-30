import Title from "@/components/Title/Title";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Missions = ({ about, aboutLoading }) => {
  const sectionRef = useRef(null);
  const isVisible = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-background py-14 sm:py-16 lg:py-24"
      aria-busy={aboutLoading}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-secondary/10 blur-3xl sm:h-96 sm:w-96" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6">
        <div className="hidden  md:flex mb-8 sm:mb-12">
          <Title name="MY Purpose" />
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            The principles that guide my work and the direction I’m building toward.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8">
          {/* Mission Card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 sm:p-7 lg:p-9"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-2xl transition-colors duration-300 group-hover:bg-primary/15" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 shadow-md shadow-primary/20 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-primary-foreground sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  MY Mission
                </h3>
              </div>

              {aboutLoading ? (
                <div className="space-y-3 py-2" aria-hidden="true">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              ) : (
                <div
                  className="prose prose-sm max-w-none leading-relaxed text-card-foreground/85 dark:prose-invert sm:prose-base prose-p:my-0 prose-p:leading-7 prose-strong:text-primary prose-headings:text-foreground prose-a:text-primary"
                  dangerouslySetInnerHTML={{ __html: about?.mission || "" }}
                />
              )}
            </div>
          </motion.article>

          {/* Vision Card */}
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-secondary/40 hover:shadow-xl hover:shadow-secondary/5 sm:p-7 lg:p-9"
          >
            <div className="pointer-events-none absolute -left-12 -top-12 h-36 w-36 rounded-full bg-secondary/10 blur-2xl transition-colors duration-300 group-hover:bg-secondary/15" />

            <div className="relative">
              <div className="mb-5 flex items-center gap-3 sm:mb-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-secondary/80 shadow-md shadow-secondary/20 sm:h-12 sm:w-12">
                  <svg
                    className="h-5 w-5 text-secondary-foreground sm:h-6 sm:w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                  MY Vision
                </h3>
              </div>

              {aboutLoading ? (
                <div className="space-y-3 py-2" aria-hidden="true">
                  <div className="h-4 w-full animate-pulse rounded bg-muted" />
                  <div className="h-4 w-11/12 animate-pulse rounded bg-muted" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              ) : (
                <div
                  className="prose prose-sm max-w-none leading-relaxed text-card-foreground/85 dark:prose-invert sm:prose-base prose-p:my-0 prose-p:leading-7 prose-strong:text-secondary prose-headings:text-foreground prose-a:text-secondary"
                  dangerouslySetInnerHTML={{ __html: about?.vission || "" }}
                />
              )}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default Missions;
