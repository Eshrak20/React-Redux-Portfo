import React, { useEffect, useMemo, useState } from "react";

import ProjectSkeletons from "@/components/skeletons/projectSkeletons";
import projectImg from "../../assets/BannerImages/mainB.jpg";

import FilterSection from "../Projects/FilterSection/FilterSection";
import CommonBanner from "@/components/commonBanner/commonBanner";
import BlogsCard from "./BlogsCard/BlogsCard";

import { useGetBlogsQuery } from "@/redux/api/blogApi";

const Blogs = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    sort: "latest",
  });

  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
  } = useGetBlogsQuery({
    page,
    perPage: 20,
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
        map.set(
            blog.category.id,
            blog.category.name
        );
      }
    });

    return Array.from(map, ([id, name]) => ({
      id,
      name,
    }));
  }, [blogs]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);

    // Always return to first page
    // when a filter changes.
    setPage(1);
  };

  if (isLoading) {
    return <ProjectSkeletons />;
  }

  return (
      <>
        <CommonBanner
            backgroundImage={projectImg}
            subtitle="MY Insights"
            title="Blog"
            highlight="Articles"
        />

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