import React, { useMemo, useState } from "react";
import ProjectSkeletons from "@/components/skeletons/projectSkeletons";
import projectImg from "../../assets/BannerImages/mainB.jpg";
import FilterSection from "../Projects/FilterSection/FilterSection";
import CommonBanner from "@/components/commonBanner/commonBanner";
import BlogsCard from "./BlogsCard/BlogsCard";
import { useGetBlogsQuery } from "@/redux/api/blogApi";

const Blogs = () => {

  const { data, isLoading } = useGetBlogsQuery();
  const blogs = data?.data || [];

  const [filters, setFilters] = useState({
    status: "",
    category: "",
    sort: "latest",
  });

  /* -------------------------------
     Extract unique categories
  --------------------------------*/
  const categories = useMemo(() => {
    const map = new Map();
    blogs.forEach((b) => {
      if (b.category) {
        map.set(b.category.id, b.category.name);
      }
    });
    return Array.from(map, ([id, name]) => ({ id, name }));
  }, [blogs]);

  /* -------------------------------
     Filter + Sort blogs
  --------------------------------*/
  const filteredBlogs = useMemo(() => {
    let list = [...blogs];

    if (filters.status) {
      list = list.filter((b) => b.status === filters.status);
    }

    if (filters.category) {
      list = list.filter(
        (b) => b.category?.id === Number(filters.category)
      );
    }

    list.sort((a, b) => {
      if (filters.sort === "latest") {
        return new Date(b.published_at) - new Date(a.published_at);
      }
      return new Date(a.published_at) - new Date(b.published_at);
    });

    return list;
  }, [blogs, filters]);

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

      <FilterSection
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />

      {/* ✅ Pass FILTERED blogs */}
      <BlogsCard blogs={filteredBlogs} />
    </>
  );
};

export default Blogs;
