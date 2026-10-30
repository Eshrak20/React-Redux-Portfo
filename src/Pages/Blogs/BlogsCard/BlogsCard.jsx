import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Pagination from "@/components/Pagination/Pagination";

import BlogCarousel from "./BlogCarousel";
import LanguageToggle from "./LanguageToggle";

const BlogsCard = ({ blogs = [], pagination, setPage, isFetching }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [language, setLanguage] = useState("bn");

  // Show only first 6 blogs on homepage.
  const displayedBlogs = isHomePage ? blogs.slice(0, 6) : blogs;

  return (
    <section
      className={
        isHomePage
          ? "bg-pink-50 dark:bg-background overflow-hidden  pb-12 pt-3 sm:py-14 lg:py-16"
          : "bg-background overflow-hidden dark:bg-background pb-12 pt-3 sm:py-14 lg:py-16"
      }
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top Controls */}
        <div className="mb-6 flex items-center justify-between gap-3">
          {/* Language Toggle */}
          <LanguageToggle language={language} onChange={setLanguage} />

          {/* View All */}
          {isHomePage && (
            <Link
              to="/blogs"
              className="
        group inline-flex shrink-0 items-center gap-1.5
        rounded-full border border-primary/20
        bg-primary/5 px-3 py-2
        text-xs sm:text-sm font-semibold text-primary
        transition-all duration-300
        hover:border-primary hover:bg-primary hover:text-white
      "
            >
              {language === "bn" ? "সব ব্লগ দেখুন" : "View All Blogs"}

              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        {/* Loading */}
        {isFetching && !isHomePage && (
          <div
            role="status"
            className="py-5 text-center text-sm text-muted-foreground"
          >
            {language === "bn" ? "ব্লগ লোড হচ্ছে..." : "Loading blogs..."}
          </div>
        )}

        {/* Blog Content */}
        {displayedBlogs.length > 0 ? (
          <div aria-busy={isFetching && !isHomePage} className="mt-5">
            <BlogCarousel blogs={displayedBlogs} language={language} />
          </div>
        ) : (
          <div className="rounded-sm border border-dashed border-border px-4 py-16 text-center sm:py-24">
            <h3 className="text-xl font-semibold text-foreground">
              {language === "bn"
                ? "এখনো কোনো ব্লগ প্রকাশ করা হয়নি"
                : "No Blogs Available"}
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              {language === "bn"
                ? "শীঘ্রই নতুন ব্লগ প্রকাশ করা হবে।"
                : "New articles will be published soon."}
            </p>
          </div>
        )}

        {/* Pagination */}
        {!isHomePage && (
          <Pagination
            pagination={pagination}
            setPage={setPage}
            isFetching={isFetching}
            label="blogs"
          />
        )}
      </div>
    </section>
  );
};

export default BlogsCard;
