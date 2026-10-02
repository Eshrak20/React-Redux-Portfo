import {motion} from "framer-motion";
import {Calendar, ChevronRight} from "lucide-react";
import {Link} from "react-router-dom";

import {
    formatDate,
    getBlogContent,
    getBlogTitle,
    getCategoryName,
    getExcerpt,
    getFeaturedImage,
} from "./blogUtils";

const BlogCardUI = ({blog, language = "bn", index = 0}) => {
    const title = getBlogTitle(blog, language);
    const content = getExcerpt(getBlogContent(blog, language), 120);
    const category = getCategoryName(blog, language);
    const image = getFeaturedImage(blog);

    return (
        <motion.article
            initial={{opacity: 0, y: 25}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{
                once: true,
                margin: "0px 0px 150px 0px",
            }}
            transition={{
                duration: 0.45,
                delay: Math.min(index * 0.04, 0.2),
                ease: "easeOut",
            }}
            whileHover={{
                y: -6,
            }}
            className="group h-full"
        >
            <Link
                to={`/blogs/${blog.slug}`}
                className="block h-full rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-xl transition-all duration-300"
            >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80";
                        }}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"/>


                </div>

                {/* Content */}
                <div className="flex h-65 flex-col p-6">
                    {/* Date */}
                    <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-4 w-4"/>
                        <span>{formatDate(blog.published_at)}</span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
                        {title}
                    </h3>

                    {/* Summary */}
                    <p className="line-clamp-6 text-sm leading-7 text-muted-foreground">
                        {content}
                    </p>

                    {/* Bottom */}
                    <div className="mt-auto ">
                        <div className="flex items-center justify-between">
    <span className="inline-flex items-center gap-2 font-medium text-primary">
        {language === "bn" ? "আরও পড়ুন" : "Read Article"}
        <ChevronRight className="h-4 w-4"/>
    </span>

                            <span
                                className="rounded-full border border-border bg-background/90 px-3 py-1 text-xs font-semibold text-primary">
        {category}
    </span>
                        </div>

                    </div>
                </div>
            </Link>
        </motion.article>
    );
};

export default BlogCardUI;