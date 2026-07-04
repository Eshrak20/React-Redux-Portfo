import Title from "@/components/Title/Title";
import { useEffect, useRef, useState } from "react";

const Missions = ({ about, aboutLoading }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [missionTyped, setMissionTyped] = useState("");
  const [visionTyped, setVisionTyped] = useState("");
  const sectionRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const missionText = about?.mission || "";
  const visionText = about?.vission || "";

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Typing effect for mission
  useEffect(() => {
    if (
      !isVisible ||
      !missionText ||
      missionTyped.length === missionText?.length
    )
      return;

    const timeout = setTimeout(() => {
      setMissionTyped(missionText.substring(0, missionTyped.length + 1));
    }, 20);

    return () => clearTimeout(timeout);
  }, [isVisible, missionText, missionTyped]);

  // Typing effect for vision
  useEffect(() => {
    if (!isVisible || !visionText || visionTyped.length === visionText?.length)
      return;

    const timeout = setTimeout(() => {
      setVisionTyped(visionText.substring(0, visionTyped.length + 1));
    }, 20);

    return () => clearTimeout(timeout);
  }, [isVisible, visionText, visionTyped]);

  // Reset typed content when about changes
  useEffect(() => {
    setMissionTyped("");
    setVisionTyped("");
  }, [about]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-linear(to right, #ffffff 1px, transparent 1px),
                             linear-linear(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            transform: "perspective(500px) rotateX(60deg)",
            transformOrigin: "center top",
          }}
        ></div>
      </div>

      <div className="container relative mx-auto md:px-6">
        {/* Section header */}
        <Title name="MY Purpose" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 relative">
          {/* Mission Card */}
          <div
            ref={missionRef}
            className={`
              relative group 
              backdrop-blur-sm bg-card/90 border border-border 
              md:rounded-3xl 
              p-6 md:p-10 overflow-hidden
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-10"
              }
              hover:border-primary/50 hover:md:shadow-2xl hover:shadow-primary/20
              transform hover:-translate-y-2
            `}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 -translate-x-10 -translate-y-10 bg-primary/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 translate-x-10 translate-y-10 bg-accent/20 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 md:p-3 bg-gradient-to-br from-primary to-primary/80 rounded-xl shadow-lg">
                  <svg
                    className="w-6 h-6 text-primary-foreground"
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

                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  MY Mission
                </h3>
              </div>

              <div
                className="
                              prose prose-sm md:prose-lg
                              dark:prose-invert
                              max-w-none
                              min-h-[80px] md:min-h-[120px]
                              prose-p:text-card-foreground/90
                              prose-strong:text-primary
                              prose-headings:text-card-foreground
                              prose-a:text-primary
                            "
                dangerouslySetInnerHTML={{
                  __html: about?.mission || "",
                }}
              />

              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (missionTyped.length / about?.mission?.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {Math.round(
                    (missionTyped.length / about?.mission?.length) * 100,
                  )}
                  %
                </span>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div
            ref={visionRef}
            className={`
              relative group 
              backdrop-blur-sm bg-card/90 border border-border 
              md:rounded-3xl p-6 md:p-10 overflow-hidden
              transition-all duration-700 ease-out
              ${
                isVisible
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 translate-y-10"
              }
              hover:border-secondary/50 hover:md:shadow-2xl hover:shadow-secondary/20
              transform hover:-translate-y-2
            `}
            style={{
              animationDelay: "0.4s",
            }}
          >
            {/* Card glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-secondary/20 via-transparent to-accent/20 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>

            {/* Corner accents */}
            <div className="absolute top-0 right-0 w-20 h-20 translate-x-10 -translate-y-10 bg-secondary/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 -translate-x-10 translate-y-10 bg-accent/20 rounded-full blur-xl"></div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="p-2 md:p-3 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl shadow-lg">
                  <svg
                    className="w-6 h-6 text-secondary-foreground"
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
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent">
                  MY Vision
                </h3>
              </div>

              <div
                className="
                          prose prose-sm md:prose-lg
                          dark:prose-invert
                          max-w-none
                          min-h-[80px] md:min-h-[146px]
                          prose-p:text-card-foreground/90
                          prose-strong:text-secondary
                          prose-headings:text-card-foreground
                          prose-a:text-secondary
                        "
                dangerouslySetInnerHTML={{
                  __html: about?.vission || "",
                }}
              />

              {/* Progress indicator */}
              <div className="mt-6 flex items-center gap-2">
                <div className="h-1 flex-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-secondary/80 rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        (visionTyped.length / about?.vission?.length) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {Math.round(
                    (visionTyped.length / about?.vission?.length) * 100,
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Missions;
