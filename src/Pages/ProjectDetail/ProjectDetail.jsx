import React from "react";
import { useParams } from "react-router-dom";
import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";

const ProjectDetail = () => {
  const { id } = useParams();

  const {
    data: project,
    isLoading,
    isError,
  } = useGetDetailProjectsQuery(id, {
    skip: !id,
  });
console.log(project);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading project...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load project details
      </div>
    );
  }

  if (!project) return null;

  return (
    <section className="max-w-425 mx-auto px-4 py-44">
      {/* Banner */}
      {project.banner && (
        <div className="mb-10 md:rounded-2xl rounded-md overflow-hidden shadow-lg">
          <img
            src={project.banner}
            alt={project.project_name}
            className="w-full h-[400px] object-cover"
          />
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {project.project_name}
      </h1>

      {/* Meta Info */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
        <span>Type: {project.project_type}</span>
        <span>Category: {project.project_category}</span>
        <span>Status: {project.status}</span>
      </div>

      {/* Short Description */}
      <p className="text-lg text-gray-700 mb-10">{project.short_description}</p>

      {/* Description (HTML) */}
      <div
        className="prose max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: project.description }}
      />

      {/* Tech Stack */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <InfoCard title="Frontend" value={project.frontend_tech} />
        <InfoCard title="Backend" value={project.backend_tech} />
        <InfoCard title="Database" value={project.database_tech} />
      </div>

      {/* Gallery */}
      {project.gallery_images?.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-6">Gallery</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {project.gallery_images.map((img, index) => (
              <img
                key={index}
                src={`${import.meta.env ? import.meta.env.VITE_API_BASE_URL : process.env.REACT_APP_API_BASE_URL}/storage/${img}`}
                alt={`Gallery ${index + 1}`}
                className="rounded-xl shadow-md object-cover"
              />
            ))}
          </div>
        </>
      )}

      {/* Links */}
      <div className="flex gap-4 mt-12">
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-black text-white"
          >
            Live Site
          </a>
        )}

        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl border"
          >
            GitHub
          </a>
        )}
      </div>
    </section>
  );
};

export default ProjectDetail;

/* Reusable card */
const InfoCard = ({ title, value }) => (
  <div className="p-6 border md:rounded-2xl rounded-md bg-white shadow-sm">
    <h3 className="font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{value || "—"}</p>
  </div>
);
