
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Pagination from "@/components/Pagination/Pagination";

import BlogCarousel from "./BlogCarousel";
import LanguageToggle from "./LanguageToggle";

const BlogsCard = ({
    blogs = [],
    pagination,
    setPage,
    isFetching,
}) => {
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const [language, setLanguage] = useState("bn");

    // Show only first 6 blogs on homepage.
    const displayedBlogs = isHomePage
        ? blogs.slice(0, 6)
        : blogs;

    return (
        <section className="overflow-hidden bg-background pb-12 pt-3 sm:py-14 lg:py-16">
            <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="mb-8 text-center sm:mb-10">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                        {language === "bn" ? "আমার লেখা" : "My Writes"}
                    </h2>

                    <div className="mx-auto h-1.5 w-20 rounded-full bg-primary sm:w-24" />
                </div>

                {/* Language Toggle */}
                <div className="mb-7 flex justify-center">
                    <LanguageToggle
                        language={language}
                        onChange={setLanguage}
                    />
                </div>

                {/* View All */}
                {isHomePage && (
                    <div className="mb-6 flex justify-end">
                        <Link
                            to="/blogs"
                            className="
                                inline-flex items-center gap-2
                                text-sm font-medium text-primary
                                transition-all duration-300
                                hover:gap-3
                            "
                        >
                            {language === "bn"
                                ? "সব ব্লগ দেখুন"
                                : "View All Blogs"}

                            <ChevronRight className="h-4 w-4" />
                        </Link>
                    </div>
                )}

                {/* Loading */}
                {isFetching && !isHomePage && (
                    <div
                        role="status"
                        className="py-5 text-center text-sm text-muted-foreground"
                    >
                        {language === "bn"
                            ? "ব্লগ লোড হচ্ছে..."
                            : "Loading blogs..."}
                    </div>
                )}

                {/* Blog Content */}
                {displayedBlogs.length > 0 ? (
                    <div
                        aria-busy={isFetching && !isHomePage}
                        className="mt-5"
                    >
                        <BlogCarousel
                            blogs={displayedBlogs}
                            language={language}
                        />
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
