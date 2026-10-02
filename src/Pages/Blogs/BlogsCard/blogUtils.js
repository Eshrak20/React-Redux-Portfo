/**
 * Remove HTML tags and return a short excerpt.
 */
export const getExcerpt = (html = "", limit = 120) => {
  if (!html) return "";

  const text = html
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&quot;/gi, '"')
      .replace(/&#39;/gi, "'")
      .replace(/\s+/g, " ")
      .trim();

  return text.length > limit
      ? `${text.slice(0, limit).trim()}...`
      : text;
};

/**
 * Format published date.
 * Example: Jul 2, 2026
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
  );
};

/**
 * Return blog title based on selected language.
 */
export const getBlogTitle = (
    blog,
    language = "bn",
) => {
  if (!blog) return "";

  return language === "bn"
      ? blog.title_bng || blog.title || ""
      : blog.title || "";
};

/**
 * Return blog summary/content based on selected language.
 */
export const getBlogContent = (
    blog,
    language = "bn",
) => {
  if (!blog) return "";

  return language === "bn"
      ? blog.summary_bng ||
      blog.content_bng ||
      blog.summary ||
      blog.content ||
      ""
      : blog.summary ||
      blog.content ||
      "";
};

/**
 * Return full blog article content.
 *
 * Unlike getBlogContent(), this does not prefer summary.
 * Use this for the blog detail page.
 */
export const getBlogArticleContent = (
    blog,
    language = "bn",
) => {
  if (!blog) return "";

  return language === "bn"
      ? blog.content_bng ||
      blog.content ||
      ""
      : blog.content || "";
};

/**
 * Return blog summary.
 */
export const getBlogSummary = (
    blog,
    language = "bn",
) => {
  if (!blog) return "";

  return language === "bn"
      ? blog.summary_bng ||
      blog.summary ||
      ""
      : blog.summary || "";
};

/**
 * Return category name.
 */
export const getCategoryName = (
    blog,
    language = "bn",
) => {
  if (!blog?.category) {
    return language === "bn"
        ? "বিভাগ নেই"
        : "Uncategorized";
  }

  return language === "bn"
      ? blog.category.name_bng ||
      blog.category.name ||
      ""
      : blog.category.name || "";
};

/**
 * Get featured image with fallback.
 */
export const getFeaturedImage = (blog) => {
  return (
      blog?.featured_image ||
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
  );
};