import ProjectCard from "@/components/ProjectsCard/ProjectCard";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useMemo } from "react";

const RecommendedProjects = ({ currentProject }) => {
  const { data, isError } = useGetAllProjectsQuery({
    page: 1,
    per_page: 12,
    sort: "latest",
  });

  const recommendations = useMemo(() => {
    const candidates = (data?.data || []).filter(
      (project) =>
        (!currentProject?.slug || project.slug !== currentProject.slug) &&
        (currentProject?.id == null ||
          String(project.id) !== String(currentProject.id)),
    );

    for (let index = candidates.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [candidates[index], candidates[randomIndex]] = [
        candidates[randomIndex],
        candidates[index],
      ];
    }

    const count = Math.min(
      candidates.length,
      3 + Math.floor(Math.random() * 3),
    );
    return candidates.slice(0, count);
  }, [currentProject?.id, currentProject?.slug, data?.data]);

  if (isError) {
    return (
      <p role="status" className="mx-auto max-w-7xl px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        Recommended projects are temporarily unavailable.
      </p>
    );
  }

  if (!recommendations.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-6 flex flex-col gap-2 border-b border-border pb-5 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Keep exploring
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Recommended projects
          </h2>
        </div>
        <p className="text-sm text-muted-foreground">
          A few more projects you may find interesting.
        </p>
      </div>
      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((project) => (
          <ProjectCard key={project.id || project.slug} project={project} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedProjects;
