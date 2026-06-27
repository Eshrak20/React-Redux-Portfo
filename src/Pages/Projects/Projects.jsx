import React, { useEffect, useMemo, useState } from "react";
import ProjectSkeletons from "@/components/skeletons/projectSkeletons";
import CommonBanner from "../../components/commonBanner/commonBanner";
import projectImg from "../../assets/BannerImages/mainB.jpg";
import FilterSection from "./FilterSection/FilterSection";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import ProjectsCard from "@/components/ProjectsCard/ProjectsCard";

const Projects = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Fetch all projects from your API
  const { data, isLoading } = useGetAllProjectsQuery();
  const projects = data?.data || [];

  // Static categories (replace with API data if you have it)
  const categoriesData = [
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile App" },
    { id: "game", name: "Game Development" },
  ];

  // Filters state
  const [filters, setFilters] = useState({
    status: "",
    category: "",
    sort: "latest",
  });

  // Filter logic
  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by status
    if (filters.status) {
      filtered = filtered.filter((p) => p.status === filters.status);
    }

    // Filter by category
    if (filters.category) {
      filtered = filtered.filter(
        (p) => p.project_category === filters.category,
      );
    }

    // Sort by date (assuming p.created_at exists)
    if (filters.sort === "latest") {
      filtered = filtered.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );
    } else if (filters.sort === "oldest") {
      filtered = filtered.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
    }

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
          filters={filters}
          setFilters={setFilters}
          categories={categoriesData}
        />

        <ProjectsCard projects={filteredProjects} />
      </div>
    </>
  );
};

export default Projects;
