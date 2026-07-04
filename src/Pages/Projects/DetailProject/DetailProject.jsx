import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";
import { useParams } from "react-router-dom";

import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";
import AboutDetProject from "./AboutDetProject";
import ImagesDetProject from "./ImagesDetProject";
import VideoGallery from "./VideoGalllery/VideoGallery";

const DetailProject = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const { slug } = useParams();
  const { data, isLoading, isError } = useGetDetailProjectsQuery(slug, {
    skip: !slug,
  });

  if (isLoading) return <CommonBannerSkeleton />;
  if (isError) return <p className="text-center py-20">Something went wrong</p>;

  const project = data?.data;

  return (
    <section className="container mx-auto md:px-6 space-y-24">
      {/* About */}
      <AboutDetProject project={project} />
      <ImagesDetProject project_gallery={project.gallery_images} />

      {/* Gallery */}

      {/* Video (single) */}
      {project.project_video && (
        <VideoGallery videoId={project.project_video} />
      )}
    </section>
  );
};

export default DetailProject;
