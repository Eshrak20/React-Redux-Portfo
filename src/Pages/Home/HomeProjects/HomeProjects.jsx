
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import ProjectCarousel from "./ProjectCarousel";

const HomeProjects = ({ projects = [] }) => {
    const featuredProjects = projects.slice(0, 6);

    return (
        <section
            id="projects"
            className="overflow-hidden  bg-pink-50 dark:bg-background px-5 pt-3 pb-16 sm:px-8 sm:py-20 lg:px-10"
        >
            <div className="mx-auto max-w-7xl">

                {/* Section Header */}
                <div className="
                    mb-9 flex flex-col gap-5 border-b border-border pb-7
                    sm:mb-10 sm:flex-row sm:items-end sm:justify-between
                ">
                    <div className="max-w-2xl">
                        <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                            My Work
                        </span>

                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Projects that solve
                            <span className="text-primary">
                                {" "}real problems.
                            </span>
                        </h2>

                        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
                            A selection of useful products and experiments
                            built with thoughtful engineering.
                        </p>
                    </div>

                    <Link
                        to="/projects"
                        className="
                            group inline-flex min-h-10 shrink-0 items-center
                            gap-2 self-start border border-primary px-4
                            text-sm font-semibold text-primary
                            transition-all duration-300
                            hover:bg-primary hover:text-primary-foreground
                            focus-visible:outline-none focus-visible:ring-2
                            focus-visible:ring-primary sm:self-auto
                        "
                    >
                        View all projects

                        <ArrowUpRight
                            aria-hidden="true"
                            size={17}
                            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                    </Link>
                </div>

                {/* Projects */}
                {featuredProjects.length > 0 ? (
                    <ProjectCarousel projects={featuredProjects} />
                ) : (
                    <p className="
                        border border-dashed border-border bg-background
                        px-6 py-10 text-center text-sm text-muted-foreground
                    ">
                        Projects will appear here once they are available.
                    </p>
                )}
            </div>
        </section>
    );
};

export default HomeProjects;
