import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";
import React from "react";
import { useParams } from "react-router-dom";

import AboutDetProject from "./AboutDetProject";
import GalleryDetProject from "./GalleryDetProject";
import VideoGallery from "./VideoGalllery/VideoGallery";
import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";

const DetailProject = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const { id } = useParams();
  const { data, isLoading, isError } = useGetDetailProjectsQuery(id);

  if (isLoading) return <CommonBannerSkeleton />;
  if (isError) return <p className="text-center py-20">Something went wrong</p>;

  const project = data?.data;

  return (
    <section className="container mx-auto md:px-6 space-y-24">
      {/* About */}
      <AboutDetProject project={project} />

      {/* Gallery */}
      <GalleryDetProject project_gallery={project.gallery_images} />

      {/* Video (single) */}
      {project.project_video && (
        <VideoGallery videoId={project.project_video} />
      )}
    </section>
  );
};

export default DetailProject;
