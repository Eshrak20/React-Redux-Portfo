import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Bookmark,
  Printer,
  Maximize2,
  Minimize2,
  ChevronRight,
  Globe,
} from "lucide-react";

const DetBlogs = ({ blog }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeHeading, setActiveHeading] = useState(null);
  const [language, setLanguage] = useState("bangla");

  const getContent = () =>
    language === "bangla"
      ? blog?.content_bng || blog?.content || ""
      : blog?.content || "";

  const getSummary = () =>
    language === "bangla"
      ? blog?.summary_bng || blog?.summary || ""
      : blog?.summary || "";

  const getTitle = () =>
    language === "bangla"
      ? blog?.title_bng || blog?.title || ""
      : blog?.title || "";

  const hasEng = blog?.content && blog.content.trim() !== "<p></p>";

  const formattedContent = getContent()
    .replace(/<p>/g, '<p class="mb-6 text-slate-700 dark:text-slate-300">')
    .replace(/<li>/g, '<li class="mb-2 text-slate-700 dark:text-slate-300">')
    .replace(
      /<h([1-6])>/g,
      (_, h) =>
        `<h${h} class="mt-6 mb-3 text-slate-900 dark:text-white font-bold">`,
    )
    .replace(
      /<strong>/g,
      '<strong class="font-bold text-slate-900 dark:text-white">',
    )
    .replace(
      /<a /g,
      '<a class="text-primary hover:opacity-80 underline transition" ',
    );

  const toggleBookmark = () => {
    const list = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "[]");

    if (isBookmarked) {
      const updated = list.filter((id) => id !== blog?.id);
      localStorage.setItem("bookmarkedBlogs", JSON.stringify(updated));
      setIsBookmarked(false);
    } else {
      localStorage.setItem(
        "bookmarkedBlogs",
        JSON.stringify([...list, blog?.id]),
      );
      setIsBookmarked(true);
    }
  };

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("bookmarkedBlogs") || "[]");
    setIsBookmarked(list.includes(blog?.id));
  }, [blog?.id]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  if (!blog) return null;

  return (
    <>
      {/* MAIN */}
      <section
        className={`max-w-7xl mx-auto px-7 md:px-44 py-12 md:py-16 bg-white dark:bg-slate-950 ${
          isFullscreen ? "max-w-full px-6" : ""
        }`}
      >
        <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {/* TITLE */}
          <h1 className="text-xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            {getTitle()}
          </h1>

          {/* CONTENT */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: formattedContent }}
          />

          {/* SUMMARY */}
          {getSummary() && (
            <div className="mt-10 p-6 rounded-xl bg-primary/10 dark:bg-slate-900 border border-primary/10 dark:border-slate-800">
              <h3 className="font-semibold text-primary dark:text-primary mb-3">
                {language === "english" ? "Summary" : "সারাংশ"}
              </h3>
              <div
                className="text-primary text-[10px] md:text-lg dark:text-slate-300"
                dangerouslySetInnerHTML={{ __html: getSummary() }}
              />
            </div>
          )}

          {/* TAGS */}
          {blog?.tags?.length > 0 && (
            <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
              {blog.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* ACTION BAR */}
          <div className="mt-10 flex flex-wrap gap-3">
            {/* <button
              onClick={() => navigator.share?.({ url: location.href })}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg"
            >
              <Share2 size={16} />
            </button> */}

            <button
              onClick={toggleBookmark}
              className={`px-4 py-2 rounded-lg ${
                isBookmarked
                  ? "bg-primary/10 text-primary"
                  : "bg-slate-100 dark:bg-slate-900"
              }`}
            >
              <Bookmark size={16} />
            </button>

            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg"
            >
              <Printer size={16} />
            </button>

            <button
              onClick={toggleFullscreen}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-lg"
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </motion.article>
      </section>

      {/* FLOATING LANGUAGE SWITCH */}
      {hasEng && (
        <div className="fixed top-30 right-94 z-40">
          <button
            onClick={() =>
              setLanguage(language === "english" ? "bangla" : "english")
            }
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow"
          >
            <Globe size={16} className="text-primary" />
            <span className="text-sm text-slate-700 dark:text-white">
              {language === "english" ? "বাংলা" : "EN"}
            </span>
          </button>
        </div>
      )}
    </>
  );
};

export default DetBlogs;
