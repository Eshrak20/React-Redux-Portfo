import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import CumButton from "@/components/CumButton/CumButton";
import Pagination from "@/components/Pagination/Pagination";
import Title from "@/components/Title/Title";

import { containerVariants } from "@/utils/projectAnimations";

import ProjectCard from "./ProjectCard";

const ProjectsCard = ({
                          projects = [],
                          pagination,
                          setPage,
                          isFetching = false,
                      }) => {
    const location = useLocation();

    const isHomePage = location.pathname === "/";

    const displayProjects = isHomePage
        ? projects.slice(0, 6)
        : projects;

    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-6 md:px-8 lg:px-12">

                {/* ================= Header ================= */}

                <div className="mb-14 text-center">
                    <Title name="My Works" />
                </div>

                {/* ================= Projects Grid ================= */}

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{
                        once: true,
                        margin: "0px 0px 150px 0px",
                    }}
                    className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3"
                >
                    {displayProjects.length > 0 ? (
                        displayProjects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                            />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center">
                            <h3 className="text-2xl font-semibold text-foreground">
                                No Projects Found
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                Projects will appear here once they are available.
                            </p>
                        </div>
                    )}
                </motion.div>

                {/* ================= Pagination ================= */}

                {!isHomePage && pagination && (
                    <Pagination
                        pagination={pagination}
                        setPage={setPage}
                        isFetching={isFetching}
                        label="projects"
                    />
                )}

                {/* ================= View All ================= */}

                {isHomePage && projects.length > 6 && (
                    <div className="mt-16 flex justify-center">
                        <CumButton
                            path="/projects"
                            title="View All Projects"
                        />
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProjectsCard;