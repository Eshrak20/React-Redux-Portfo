import { useEffect } from "react";
import { useGetDetailProjectsQuery } from "@/redux/api/projectApi";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { useGetSocialLinksQuery } from "@/redux/api/homeApi";
import { useParams } from "react-router-dom";

import CommonBannerSkeleton from "@/components/skeletons/commonBannerSkeleton";
import BlogMobileShare from "@/Pages/Blogs/DetBlogs/BlogMobileShare";
import AboutDetProject from "./AboutDetProject";
import ImagesDetProject from "./ImagesDetProject";
import RecommendedProjects from "./RecommendedProjects";

const DetailProject = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetDetailProjectsQuery(slug, {
    skip: !slug,
  });
  const { data: aboutResponse } = useGetAboutQuery();
  const { data: socialResponse } = useGetSocialLinksQuery();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (isLoading) return <CommonBannerSkeleton />;
  if (isError) {
    return (
      <p role="alert" className="px-4 py-20 text-center text-muted-foreground">
        We couldn’t load this project. Please try again.
      </p>
    );
  }

  const project = data?.data;
  if (!project) {
    return (
      <p className="px-4 py-20 text-center text-muted-foreground">
        This project could not be found.
      </p>
    );
  }

  return (
    <div className="pb-10">
      <AboutDetProject
        project={project}
        about={aboutResponse?.data?.[0]}
        socialLinks={socialResponse?.data || []}
      />
      <ImagesDetProject project_gallery={project.gallery_images} />
      <BlogMobileShare
        title={project.project_name}
        summary={project.short_description || project.description || ""}
        contentType="project"
      />
      <RecommendedProjects currentProject={project} />
    </div>
  );
};

export default DetailProject;
