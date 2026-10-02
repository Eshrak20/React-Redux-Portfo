import { useEffect, useMemo, useState } from "react";

import projectImg from "../../assets/BannerImages/mainB.jpg";

import ProjectsCard from "@/components/ProjectsCard/ProjectsCard";
import ProjectSkeletons from "@/components/skeletons/projectSkeletons";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";

import CommonBanner from "../../components/commonBanner/commonBanner";
import FilterSection from "./FilterSection/FilterSection";

const formatName = (value) =>
    value
        ?.replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

const Projects = () => {
    const [page, setPage] = useState(1);

    const [filters, setFilters] = useState({
        project_type: "",
        project_category: "",
        sort: "latest",
    });

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    /*
     * Reset pagination when filters change.
     */
    useEffect(() => {
        setPage(1);
    }, [
        filters.project_type,
        filters.project_category,
        filters.sort,
    ]);

    /*
     * Fetch projects from backend.
     */
    const {
        data,
        isLoading,
        isFetching,
    } = useGetAllProjectsQuery({
        page,
        per_page: 20,

        project_type:
            filters.project_type || undefined,

        project_category:
            filters.project_category || undefined,

        sort:
            filters.sort || undefined,
    });

    const projects = data?.data || [];
    const pagination = data?.meta;

    /*
     * Keep filter options independent from
     * the current paginated result.
     */
    const projectTypes = useMemo(
        () => [
            {
                id: "web",
                name: formatName("web"),
            },
            {
                id: "mobile",
                name: formatName("mobile"),
            },
            {
                id: "desktop",
                name: formatName("desktop"),
            },
            {
                id: "api",
                name: formatName("api"),
            },
        ],
        []
    );

    const projectCategories = useMemo(
        () => [
            {
                id: "frontend",
                name: formatName("frontend"),
            },
            {
                id: "backend",
                name: formatName("backend"),
            },
            {
                id: "fullstack",
                name: formatName("fullstack"),
            },
        ],
        []
    );

    if (isLoading) {
        return <ProjectSkeletons />;
    }

    return (
        <>
            <CommonBanner
                backgroundImage={projectImg}
                subtitle="MY Portfolio"
                title="Project"
                highlight="Showcase"
            />

            <div className="md:mx-14 xl:mx-64">
                <FilterSection
                    type="project"
                    filters={filters}
                    setFilters={setFilters}
                    projectTypes={projectTypes}
                    projectCategories={projectCategories}
                />

                <ProjectsCard
                    projects={projects}
                    pagination={pagination}
                    setPage={setPage}
                    isFetching={isFetching}
                />
            </div>
        </>
    );
};

export default Projects;