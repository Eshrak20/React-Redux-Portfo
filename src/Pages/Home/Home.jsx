import HomeBlogsSkeleton from "@/components/skeletons/HomeBlogsSkeleton";
import HomeProjectsSkeleton from "@/components/skeletons/HomeProjectsSkeleton";
import HomeServiceSkeleton from "@/components/skeletons/HomeServiceSkeleton";
import HomeTestimonialSkeleton from "@/components/skeletons/HomeTestimonialSkeleton";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { useGetServiceQuery } from "@/redux/api/homeApi";
import { useGetAllProjectsQuery } from "@/redux/api/projectApi";
import { useGetTestimonialQuery } from "@/redux/api/testimonialApi";
import { useEffect } from "react";
import BlogsCard from "../Blogs/BlogsCard/BlogsCard";
import HomeBanner from "./HomeBanner/HomeBanner";
import HomeClients from "./HomeClients/HomeClients";
import HomeProjects from "./HomeProjects/HomeProjects";
import HomeService from "./HomeService/HomeService";
import TestimonialSection from "./HomeTestimonial/TestimonialSection";
import Tech from "./Tech/Tech";

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
    <div className="w-full">
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
        <HomeProjects projects={projectsData.data} />
      )}
      <Tech />
      {blogLoading || !blogsData?.data ? (
        <HomeBlogsSkeleton />
      ) : (
        <BlogsCard blogs={blogsData.data} />
      )}

      {/* TESTIMONIAL */}
      {testimonialLoading || !testimonialData?.data ? (
        <HomeTestimonialSkeleton />
      ) : (
        <>
          <HomeClients testimonial={testimonialData.data} />
        </>
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
