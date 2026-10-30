
import Title from "@/components/Title/Title";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TypeEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index++;
      setDisplayedText(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayedText}
      <span className="animate-pulse text-primary">|</span>
    </span>
  );
};

const Missions = ({ about, aboutLoading }) => {
  return (
    <section
      className="bg-background py-12 sm:py-16 lg:pb-14"
      aria-busy={aboutLoading}
    >
      <div className="container mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="hidden mb-8 text-center sm:mb-12">
          <Title name="MY Purpose" />

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            The principles that guide my work and the direction I'm building toward.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">

          {/* Mission */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-card p-5 sm:p-7 lg:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl text-primary">01.</span>

              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                My Mission
              </h3>
            </div>

            {aboutLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none leading-7 text-muted-foreground dark:prose-invert sm:prose-base prose-p:my-0 prose-strong:text-primary prose-headings:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{
                  __html: about?.mission || "",
                }}
              />
            )}
          </motion.article>

          {/* Vision */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="border border-border bg-card p-5 sm:p-7 lg:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-2xl text-secondary">02.</span>

              <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                My Vision
              </h3>
            </div>

            {aboutLoading ? (
              <div className="space-y-3 animate-pulse">
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-5/6 rounded bg-muted" />
                <div className="h-4 w-3/4 rounded bg-muted" />
              </div>
            ) : (
              <div
                className="prose prose-sm max-w-none leading-7 text-muted-foreground dark:prose-invert sm:prose-base prose-p:my-0 prose-strong:text-secondary prose-headings:text-foreground prose-a:text-secondary"
                dangerouslySetInnerHTML={{
                  __html: about?.vission || "",
                }}
              />
            )}
          </motion.article>

        </div>
      </div>
    </section>
  );
};

export default Missions;
