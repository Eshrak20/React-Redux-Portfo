
import {
    CalendarDays,
    Clock3,
    UserRound,
} from "lucide-react";

import {
    getBlogArticleContent,
    getBlogTitle,
    getCategoryName,
} from "@/Pages/Blogs/BlogsCard/blogUtils.js";

const FALLBACK_IMAGE =
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";

const BlogBanner = ({
    blog,
    language = "bn",
    className = "",
}) => {
    if (!blog) return null;

    const isBangla = language === "bn";

    const title = getBlogTitle(blog, language);
    const content = getBlogArticleContent(blog, language);

    const wordCount =
        content
            .replace(/<[^>]*>/g, " ")
            .match(/[\p{L}\p{N}]+/gu)?.length || 0;

    const readingTime = Math.max(
        1,
        Math.ceil(wordCount / 200),
    );

    const publishedDate = blog.published_at
        ? new Date(blog.published_at)
        : null;

    const formattedDate =
        publishedDate && !Number.isNaN(publishedDate.getTime())
            ? publishedDate.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
              })
            : null;

    const category = getCategoryName(blog, "en");

    return (
        <section
            aria-label="Article heading"
            className={`group mb-5 overflow-hidden rounded-sm border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg ${className}`}
        >
            {/* Large Featured Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary">
                <img
                    src={blog.featured_image || FALLBACK_IMAGE}
                    alt={title || "Blog featured image"}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onError={(event) => {
                        if (event.currentTarget.src !== FALLBACK_IMAGE) {
                            event.currentTarget.src = FALLBACK_IMAGE;
                        }
                    }}
                    className="h-full w-full object-fit transition-transform duration-700 ease-out group-hover:scale-95"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 to-transparent" />
            </div>

            {/* Blog Information */}
            <div className="space-y-3 px-4 py-4 sm:px-6 sm:py-5">
                {category && (
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {category}
                    </span>
                )}

                <h1
                    lang={isBangla ? "bn" : "en"}
                    className={`line-clamp-2 break-words text-base font-bold leading-snug tracking-tight text-foreground sm:text-lg ${
                        isBangla ? "font-bengali" : ""
                    }`}
                >
                    {title}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3 text-xs text-muted-foreground">
                    {formattedDate && (
                        <time
                            dateTime={publishedDate.toISOString()}
                            className="inline-flex items-center gap-1.5"
                        >
                            <CalendarDays
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-primary"
                            />
                            {formattedDate}
                        </time>
                    )}

                    {wordCount > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                            <Clock3
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-primary"
                            />
                            {readingTime} min read
                        </span>
                    )}

                    {blog.staff?.name && (
                        <span className="inline-flex items-center gap-1.5">
                            <UserRound
                                aria-hidden="true"
                                className="h-3.5 w-3.5 shrink-0 text-primary"
                            />
                            <span className="max-w-[180px] truncate">
                                {blog.staff.name}
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogBanner;
