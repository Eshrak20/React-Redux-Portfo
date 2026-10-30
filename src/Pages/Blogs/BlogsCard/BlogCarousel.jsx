
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

import BlogCardUI from "./BlogCardUI";

const BlogCarousel = ({ blogs = [], language = "bn" }) => {
    const sliderRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const shouldReduceMotion = useReducedMotion();

    const handleScroll = () => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector("[data-blog-card]");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 16;

        const index = Math.round(
            slider.scrollLeft / (cardWidth + gap)
        );

        setActiveIndex(
            Math.min(index, blogs.length - 1)
        );
    };

    const navigate = (direction) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const card = slider.querySelector("[data-blog-card]");
        if (!card) return;

        const cardWidth = card.getBoundingClientRect().width;
        const gap = 16;

        const nextIndex = Math.max(
            0,
            Math.min(activeIndex + direction, blogs.length - 1)
        );

        slider.scrollTo({
            left: nextIndex * (cardWidth + gap),
            behavior: shouldReduceMotion ? "instant" : "smooth",
        });

        setActiveIndex(nextIndex);
    };

    return (
        <>
            {/* Mobile Carousel */}
            <div className="md:hidden">

                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="
                        -mx-4 flex snap-x snap-mandatory gap-4
                        overflow-x-auto px-4 pb-5
                        [scrollbar-width:none]
                        [&::-webkit-scrollbar]:hidden
                    "
                >
                    {blogs.map((blog, index) => (
                        <motion.div
                            key={blog.id || blog.slug}
                            data-blog-card
                            initial={{
                                opacity: 0,
                                y: shouldReduceMotion ? 0 : 15,
                            }}
                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}
                            viewport={{ once: true }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 0.4,
                                delay: shouldReduceMotion ? 0 : index * 0.04,
                            }}
                            className="
                                w-[86%] shrink-0 snap-center
                                min-[480px]:w-[80%]
                            "
                        >
                            <BlogCardUI
                                blog={blog}
                                language={language}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Carousel Controls */}
                {blogs.length > 1 && (
                    <div className="mt-3 flex items-center justify-between px-1">

                        <div className="flex items-center gap-2">
                            {blogs.map((blog, index) => (
                                <button
                                    key={blog.id || blog.slug}
                                    type="button"
                                    onClick={() => {
                                        const slider = sliderRef.current;
                                        const card = slider?.querySelectorAll(
                                            "[data-blog-card]"
                                        )[index];

                                        if (!card) return;

                                        slider.scrollTo({
                                            left: card.offsetLeft - slider.offsetLeft,
                                            behavior: shouldReduceMotion
                                                ? "instant"
                                                : "smooth",
                                        });

                                        setActiveIndex(index);
                                    }}
                                    aria-label={`Go to blog ${index + 1}`}
                                    aria-current={activeIndex === index}
                                    className={`
                                        h-1.5 rounded-full transition-all duration-300
                                        ${
                                            activeIndex === index
                                                ? "w-7 bg-primary"
                                                : "w-1.5 bg-gray-300 dark:bg-gray-600"
                                        }
                                    `}
                                />
                            ))}
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="mr-1 text-xs text-muted-foreground">
                                {activeIndex + 1} / {blogs.length}
                            </span>

                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                disabled={activeIndex === 0}
                                aria-label="Previous blog"
                                className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition hover:border-primary hover:text-primary disabled:opacity-30"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(1)}
                                disabled={activeIndex === blogs.length - 1}
                                aria-label="Next blog"
                                className="flex h-9 w-9 items-center justify-center border border-border text-foreground transition hover:border-primary hover:text-primary disabled:opacity-30"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Tablet and Desktop Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: shouldReduceMotion ? 0 : 0.08,
                        },
                    },
                }}
                className="hidden gap-5 md:grid md:grid-cols-2 xl:grid-cols-3 lg:gap-6"
            >
                {blogs.map((blog) => (
                    <motion.div
                        key={blog.id || blog.slug}
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
                        <BlogCardUI
                            blog={blog}
                            language={language}
                        />
                    </motion.div>
                ))}
            </motion.div>
        </>
    );
};

export default BlogCarousel;
