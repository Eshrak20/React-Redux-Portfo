import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Title from "@/components/Title/Title";

import BlogCardUI from "./BlogCardUI";
import LanguageToggle from "./LanguageToggle";

const BlogsCard = ({ blogs = [] }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Default Language
  const [language, setLanguage] = useState("bn");

  // Show only first 6 blogs on Home page
  const displayedBlogs = isHomePage ? blogs.slice(0, 6) : blogs;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Title name="My Writes" />
        </div>
        <LanguageToggle language={language} onChange={setLanguage} />

        {/* View All */}
        {isHomePage && (
          <div className="flex justify-end mb-8">
            <Link
              to="/blogs"
              className="inline-flex items-center gap-2 text-primary font-medium transition-all hover:gap-3"
            >
              {language === "bn" ? "সব ব্লগ দেখুন" : "View All Blogs"}

              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        {displayedBlogs.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
            {displayedBlogs.map((blog, index) => (
              <BlogCardUI
                key={blog.id}
                blog={blog}
                language={language}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-dashed rounded-2xl">
            <h3 className="text-xl font-semibold text-foreground">
              {language === "bn"
                ? "এখনো কোনো ব্লগ প্রকাশ করা হয়নি"
                : "No Blogs Available"}
            </h3>

            <p className="mt-2 text-muted-foreground">
              {language === "bn"
                ? "শীঘ্রই নতুন ব্লগ প্রকাশ করা হবে।"
                : "New articles will be published soon."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsCard;
