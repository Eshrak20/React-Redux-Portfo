import { motion } from "framer-motion";
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

const BlogCardUI = ({ blog, language = "bn", index = 0 }) => {
  const title = getBlogTitle(blog, language);
  const content = getExcerpt(getBlogContent(blog, language), 120);
  const category = getCategoryName(blog, language);
  const image = getFeaturedImage(blog);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.08,
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

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Category */}
          <span className="absolute left-4 top-4 rounded-full bg-background/90 backdrop-blur px-3 py-1 text-xs font-semibold text-primary border border-border">
            {category}
          </span>
        </div>

        {/* Content */}
        <div className="flex h-[260px] flex-col p-6">
          {/* Date */}
          <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(blog.published_at)}</span>
          </div>

          {/* Title */}
          <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary">
            {title}
          </h3>

          {/* Summary */}
          <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
            {content}
          </p>

          {/* Bottom */}
          <div className="mt-auto pt-6">
            <span className="inline-flex items-center gap-2 font-medium text-primary transition-all duration-300 group-hover:gap-3">
              {language === "bn" ? "আরও পড়ুন" : "Read Article"}

              <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCardUI;