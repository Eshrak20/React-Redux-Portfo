import HomeBanner from "./HomeBanner/HomeBanner";
import { useGetServiceQuery } from "@/redux/api/homeApi";
import HomeService from "./HomeService/HomeService";
import HomeServiceSkeleton from "@/components/skeletons/HomeServiceSkeleton";
import Tech from "./Tech/Tech";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import HomeProjectsSkeleton from "@/components/skeletons/HomeProjectsSkeleton";
import HomeTestimonialSkeleton from "@/components/skeletons/HomeTestimonialSkeleton";
import HomeClients from "./HomeClients/HomeClients";
import ProjectsCard from "@/components/ProjectsCard/ProjectsCard";
import TestimonialSection from "./HomeTestimonial/TestimonialSection";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import BlogsCard from "../Blogs/BlogsCard/BlogsCard";
import HomeBlogsSkeleton from "@/components/skeletons/HomeBlogsSkeleton";
import { useEffect } from "react";

const Home = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const { data: homeService, isLoading: homeServiceLoading } =
    useGetServiceQuery();

  const { data: projectsData, isLoading: projectsLoading } =
    useGetAllProjectsQuery();

  const { data: testimonialData, isLoading: testimonialLoading } =
    useGetTestimonialQuery();

  const { data: blogsData, isLoading: blogLoading } = useGetBlogsQuery();

  return (
    <div className="md:mx-14 xl:mx-72">
      <HomeBanner />

      {/* SERVICES */}
      {homeServiceLoading || !homeService?.data ? (
        <HomeServiceSkeleton />
      ) : (
        <HomeService services={homeService.data} />
      )}

      {/* PROJECTS */}
      {projectsLoading || !projectsData?.data ? (
        <HomeProjectsSkeleton />
      ) : (
        <ProjectsCard projects={projectsData.data} />
      )}
      <Tech />

      {/* TESTIMONIAL */}
      {testimonialLoading || !testimonialData?.data ? (
        <HomeTestimonialSkeleton />
      ) : (
        <>
          <HomeClients testimonial={testimonialData.data} />
        </>
      )}

      {blogLoading || !blogsData?.data ? (
        <HomeBlogsSkeleton />
      ) : (
        <BlogsCard blogs={blogsData.data} />
      )}
      {testimonialLoading || !testimonialData?.data ? (
        <HomeTestimonialSkeleton />
      ) : (
        <>
          <TestimonialSection testimonial={testimonialData.data} />
        </>
      )}
    </div>
  );
};

export default Home;
