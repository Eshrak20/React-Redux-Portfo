
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import ProjectCard from "@/components/ProjectsCard/ProjectCard";

const ProjectCarousel = ({ projects = [] }) => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const shouldReduceMotion = useReducedMotion();

    const handleScroll = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector("[data-project-card]");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 20;

        const index = Math.round(
            slider.scrollLeft / (cardWidth + gap)
        );

        setActiveIndex(
            Math.min(index, projects.length - 1)
        );
    };

    const navigate = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector("[data-project-card]");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 20;

        const nextIndex = Math.max(
            0,
            Math.min(activeIndex + direction, projects.length - 1)
        );

        slider.scrollTo({
            left: nextIndex * (cardWidth + gap),
            behavior: shouldReduceMotion ? "instant" : "smooth",
        });

        setActiveIndex(nextIndex);
    };

    const goToSlide = (index) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelectorAll("[data-project-card]")[index];
        if (!card) return;

        slider.scrollTo({
            left: card.offsetLeft - slider.offsetLeft,
            behavior: shouldReduceMotion ? "instant" : "smooth",
        });

        setActiveIndex(index);
    };

    return (
        <div className="relative">

            {/* Mobile Slider */}
            <div
                ref={sliderRef}
                onScroll={handleScroll}
                className="
                    -mx-5 flex snap-x snap-mandatory gap-5
                    overflow-x-auto px-5 pb-5
                    scroll-smooth
                    [scrollbar-width:none]
                    [&::-webkit-scrollbar]:hidden
                    md:hidden
                "
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id || project.slug}
                        data-project-card
                        initial={{
                            opacity: 0,
                            y: shouldReduceMotion ? 0 : 20,
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                            duration: shouldReduceMotion ? 0 : 0.4,
                            delay: shouldReduceMotion ? 0 : index * 0.05,
                        }}
                        className="
                            w-[86%] shrink-0 snap-center
                            min-[480px]:w-[78%]
                        "
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </div>

            {/* Mobile Controls */}
            {projects.length > 1 && (
                <div className="mt-4 flex items-center justify-between md:hidden">

                    <div className="flex items-center gap-2">
                        {projects.map((project, index) => (
                            <button
                                key={project.id || project.slug}
                                type="button"
                                onClick={() => goToSlide(index)}
                                aria-label={`Go to project ${index + 1}`}
                                aria-current={activeIndex === index}
                                className={`
                                    h-1.5 rounded-full transition-all duration-300
                                    ${
                                        activeIndex === index
                                            ? "w-8 bg-primary"
                                            : "w-2 bg-border hover:bg-primary/50"
                                    }
                                `}
                            />
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="mr-1 text-xs tabular-nums text-muted-foreground">
                            {String(activeIndex + 1).padStart(2, "0")} /{" "}
                            {String(projects.length).padStart(2, "0")}
                        </span>

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            disabled={activeIndex === 0}
                            aria-label="Previous project"
                            className="
                                flex h-10 w-10 items-center justify-center
                                border border-border text-foreground
                                transition-all hover:border-primary hover:text-primary
                                disabled:cursor-not-allowed disabled:opacity-30
                            "
                        >
                            <ChevronLeft size={18} />
                        </button>

                        <button
                            type="button"
                            onClick={() => navigate(1)}
                            disabled={activeIndex === projects.length - 1}
                            aria-label="Next project"
                            className="
                                flex h-10 w-10 items-center justify-center
                                border border-border text-foreground
                                transition-all hover:border-primary hover:text-primary
                                disabled:cursor-not-allowed disabled:opacity-30
                            "
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            )}

            {/* Tablet and Desktop Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: shouldReduceMotion ? 0 : 0.1,
                        },
                    },
                }}
                className="hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3"
            >
                {projects.map((project) => (
                    <motion.div
                        key={project.id || project.slug}
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 20,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: shouldReduceMotion ? 0 : 0.4,
                                },
                            },
                        }}
                        className="h-full"
                    >
                        <ProjectCard project={project} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default ProjectCarousel;
