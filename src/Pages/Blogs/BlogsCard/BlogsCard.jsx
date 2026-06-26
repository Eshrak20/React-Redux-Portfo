import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Title from "@/components/Title/Title";
import { ChevronRight, Calendar, X } from "lucide-react";

const BlogsCard = ({ blogs = [] }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getExcerpt = (html, limit = 100) => {
    if (!html) return "";
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleBlogClick = (blog) => {
    if (isHomePage) {
      setSelectedBlog(blog);
      setShowModal(true);
      document.body.style.overflow = "hidden";
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedBlog(null);
    document.body.style.overflow = "auto";
  };

  const displayedBlogs = isHomePage ? blogs.slice(0, 6) : blogs;

  return (
    <>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div className="flex-1">
              <Title name="MY Blogs" />
            </div>
          </div>
          <div className="flex justify-end mb-9 -mt-5">
            {isHomePage && (
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors text-sm sm:text-base"
              >
                View All Blogs
                <ChevronRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {displayedBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => handleBlogClick(blog)}
                className="
                  bg-card
                  text-card-foreground
                  md:rounded-2xl rounded-md
                  shadow-lg
                  overflow-hidden
                  border border-border
                  hover:shadow-xl
                  transition-all duration-300
                  cursor-pointer
                  flex flex-col h-full
                "
              >
                {/* Image */}
                <div className="relative overflow-hidden aspect-video shrink-0">
                  <img
                    src={blog.featured_image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 rounded-full">
                    <Calendar className="w-3 h-3 text-primary" />
                    <span className="text-xs font-medium text-foreground">
                      {formatDate(blog.published_at)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col grow">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {blog.category?.name || "Uncategorized"}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <div
                    className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-3 leading-relaxed grow"
                    dangerouslySetInnerHTML={{
                      __html: getExcerpt(
                        blog.content || blog.summary,
                        120
                      ),
                    }}
                  />

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isHomePage) handleBlogClick(blog);
                        else window.location.href = `/blogs/${blog.slug}`;
                      }}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm group"
                    >
                      Read {isHomePage ? "Preview" : "Full Blog"}
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {isHomePage && blogs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm sm:text-base">
                No blogs available at the moment.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {showModal && selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="
                relative
                bg-background
                text-foreground
                md:rounded-2xl rounded-md
                max-w-4xl w-full
                max-h-[90vh]
                overflow-hidden
                shadow-2xl
                flex flex-col
                border border-border
              "
            >
              {/* Header */}
              <div className="bg-background border-b border-border p-5 sm:p-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full mb-2">
                    {selectedBlog.category?.name || "Uncategorized"}
                  </span>

                  <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                    {selectedBlog.title}
                  </h2>

                  <p className="text-muted-foreground text-xs sm:text-sm mt-1 flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selectedBlog.published_at)}
                  </p>
                </div>

                <button
                  onClick={closeModal}
                  className="text-muted-foreground hover:text-foreground p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="overflow-y-auto flex-1 p-5 sm:p-6 prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                <img
                  src={selectedBlog.featured_image}
                  alt={selectedBlog.title}
                  className="w-full h-auto max-h-95 object-cover rounded-xl mb-6"
                />

                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedBlog.content || selectedBlog.summary,
                  }}
                />
              </div>

              {/* Footer */}
              <div className="bg-background border-t border-border p-4 sm:p-6 flex justify-between">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-border text-foreground rounded-lg hover:bg-muted text-sm"
                >
                  Close
                </button>

                <Link
                  to={`/blogs/${selectedBlog.slug}`}
                  onClick={closeModal}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 text-sm"
                >
                  Read Full Article
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BlogsCard;