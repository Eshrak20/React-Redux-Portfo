
import { useEffect, useMemo, useState } from "react";

import projectImg from "../../assets/BannerImages/mainB.jpg";

import CommonBanner from "@/components/commonBanner/commonBanner";
import FilterSection from "../Projects/FilterSection/FilterSection";
import BlogsCard from "./BlogsCard/BlogsCard";

import BlogCardSkeleton from "@/components/skeletons/BlogCardSkeleton.jsx";
import { useGetBlogsQuery } from "@/redux/api/blogApi";

const Blogs = () => {
  const [perPage, setPerPage] = useState(() =>
    window.matchMedia("(min-width: 768px)").matches ? 18 : 6
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Responsive per-page count
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleScreenChange = (event) => {
      setPerPage(event.matches ? 18 : 6);
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, []);

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    sort: "latest",
  });

  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useGetBlogsQuery({
    page,
    perPage,
    status: filters.status,
    category: filters.category,
    sort: filters.sort,
  });

  const blogs = data?.data || [];
  const pagination = data?.meta;

  const categories = useMemo(() => {
    const map = new Map();

    blogs.forEach((blog) => {
      if (blog.category) {
        map.set(blog.category.id, blog.category.name);
      }
    });

    return Array.from(map, ([id, name]) => ({
      id,
      name,
    }));
  }, [blogs]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  if (isLoading) {
    return <BlogCardSkeleton />;
  }

  return (
    <>
      <div className="hidden md:flex">
        <CommonBanner
          backgroundImage={projectImg}
          subtitle="MY Insights"
          title="Blog"
          highlight="Articles"
        />
      </div>

      <div className="md:mx-14 xl:mx-64">
        <FilterSection
          filters={filters}
          setFilters={handleFiltersChange}
          categories={categories}
        />

        <BlogsCard
          blogs={blogs}
          pagination={pagination}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
        />
      </div>
    </>
  );
};

export default Blogs;
