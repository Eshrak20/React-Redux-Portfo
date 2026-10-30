import { useGetDetailBlogsQuery } from "@/redux/api/blogApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBlogArticleContent,
  getBlogSummary,
  getBlogTitle,
  getExcerpt,
} from "@/Pages/Blogs/BlogsCard/blogUtils.js";
import DetBlogs from "./DetBlogs";

const MainBlog = () => {
  const [language, setLanguage] = useState("bn");

  const { slug } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setLanguage("bn");
  }, [slug]);

  const {
    data: response,
    isLoading,
    isError,
    isFetching,
  } = useGetDetailBlogsQuery(slug, {
    skip: !slug,
  });

  const blog = response?.data;

  useEffect(() => {
    if (!blog) return undefined;

    const previousTitle = document.title;
    const title = getBlogTitle(blog, language);
    const articleText =
      getBlogSummary(blog, language) ||
      getBlogArticleContent(blog, language);
    const descriptionText = getExcerpt(articleText, 180) || title;
    const metaDefinitions = [
      ["name", "description", descriptionText],
      ["property", "og:title", title],
      ["property", "og:description", descriptionText],
      ["property", "og:type", "article"],
      ["property", "og:url", window.location.href],
      ["property", "og:image", blog.featured_image || ""],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", descriptionText],
      ["name", "twitter:image", blog.featured_image || ""],
    ];
    const previousMeta = metaDefinitions.map(([attribute, name]) => {
      const selector = `meta[${attribute}="${name}"]`;
      let element = document.head.querySelector(selector);
      const created = !element;

      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      return {
        element,
        created,
        content: element.content,
      };
    });

    document.title = title || previousTitle;
    metaDefinitions.forEach(([, , content], index) => {
      previousMeta[index].element.content = content;
    });

    return () => {
      document.title = previousTitle;
      previousMeta.forEach(({element, created, content}) => {
        if (created) element.remove();
        else element.content = content;
      });
    };
  }, [blog, language]);

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
      <DetBlogs
        blog={blog}
        language={language}
        onLanguageChange={setLanguage}
      />
      
      {/* <BlogPublisher blog={blog} /> */}
    </main>
  );
};

export default MainBlog;
