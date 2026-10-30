import { Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
    formatDate,
    getBlogContent,
    getBlogTitle,
    getCategoryName,
    getExcerpt,
    getFeaturedImage,
} from "./blogUtils";

const BlogCardUI = ({blog, language = "bn"}) => {
    const title = getBlogTitle(blog, language);
    const content = getExcerpt(getBlogContent(blog, language), 160);
    const category = getCategoryName(blog, "en");
    const image = getFeaturedImage(blog);
    const publishedDate = blog.published_at
        ? new Date(blog.published_at)
        : null;
    const hasValidPublishedDate = publishedDate &&
        !Number.isNaN(publishedDate.getTime());

    return (
        <article className="group h-full">
            <Link
                to={`/blogs/${blog.slug}`}
                className="flex h-full flex-col overflow-hidden border border-border bg-card transition-colors duration-200 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
                {/* Image */}
                <div className="aspect-[18/10] overflow-hidden bg-muted">
                    <img
                        src={image}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";
                        }}
                    />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                    {/* Date */}
                    {hasValidPublishedDate && (
                        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar aria-hidden="true" className="h-3.5 w-3.5"/>
                            <time dateTime={publishedDate.toISOString()}>
                                {formatDate(blog.published_at, "en")}
                            </time>
                        </div>
                    )}

                    {/* Title */}
                    <h3
                        lang={language === "bn" ? "bn" : "en"}
                        className={`mb-2 line-clamp-2 break-words text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl ${language === "bn" ? "font-bengali" : ""}`}
                    >
                        {title}
                    </h3>

                    {/* Summary */}
                    <p
                        lang={language === "bn" ? "bn" : "en"}
                        className={`mb-4 line-clamp-3 break-words text-sm leading-6 text-muted-foreground ${language === "bn" ? "font-bengali" : ""}`}
                    >
                        {content}
                    </p>

                    {/* Bottom */}
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
                            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                                Read Article
                                <ChevronRight aria-hidden="true" className="h-4 w-4"/>
                            </span>
                            <span className="max-w-full break-words border border-primary/20 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                {category}
                            </span>
                    </div>
                </div>
            </Link>
        </article>
    );
};

export default BlogCardUI;