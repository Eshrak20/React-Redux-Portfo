import React from "react";
import { useParams } from "react-router-dom";
import BlogBanner from "./BlogBanner";
import DetBlogs from "./DetBlogs";
import BlogPublisher from "./BlogPublisher";
import { useGetDetailBlogsQuery } from "@/redux/api/blogApi";

const MainBlog = () => {
  const { slug } = useParams();

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useGetDetailBlogsQuery(slug, {
    skip: !slug,
  });

  const blog = response?.data;

  // 🔥 Loading state (better UX)
  if (isLoading || isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-300">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          Loading blog...
        </div>
      </div>
    );
  }

  // ❌ Error state
  if (isError || !blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Blog not found
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            The content you’re looking for doesn’t exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <BlogBanner blog={blog} />
      <DetBlogs blog={blog} />
      <BlogPublisher blog={blog} />
    </main>
  );
};

export default MainBlog;