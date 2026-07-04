import ProjectsCard from "@/components/ProjectsCard/ProjectsCard";
import ProjectSkeletons from "@/components/skeletons/projectSkeletons";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useEffect, useMemo, useState } from "react";
import projectImg from "../../assets/BannerImages/mainB.jpg";
import CommonBanner from "../../components/commonBanner/commonBanner";
import FilterSection from "./FilterSection/FilterSection";

const formatName = (value) =>
  value
    ?.replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

const Projects = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const { data, isLoading } = useGetAllProjectsQuery();
  const projects = data?.data || [];

  const projectTypes = useMemo(() => {
    return [...new Set(projects.map((p) => p.project_type))]
      .filter(Boolean)
      .map((item) => ({
        id: item,
        name: formatName(item),
      }));
  }, [projects]);

  const projectCategories = useMemo(() => {
    return [...new Set(projects.map((p) => p.project_category))]
      .filter(Boolean)
      .map((item) => ({
        id: item,
        name: formatName(item),
      }));
  }, [projects]);

  const [filters, setFilters] = useState({
    type: "",
    category: "",
    sort: "latest",
  });

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (filters.type) {
      filtered = filtered.filter(
        (p) => p.project_type === filters.type
      );
    }

    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.project_category === filters.category
      );
    }

    filtered.sort((a, b) => {
      if (filters.sort === "latest") {
        return new Date(b.created_at) - new Date(a.created_at);
      }

      return new Date(a.created_at) - new Date(b.created_at);
    });

    return filtered;
  }, [projects, filters]);

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

        <ProjectsCard projects={filteredProjects} />
      </div>
    </>
  );
};

export default Projects;