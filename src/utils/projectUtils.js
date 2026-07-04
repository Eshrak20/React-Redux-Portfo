// src/utils/projectUtils.js

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80";

/**
 * Returns the project banner or fallback image.
 */
export const getProjectImage = (project) => {
  return project?.banner || FALLBACK_IMAGE;
};

/**
 * Returns the category label.
 */
export const getProjectCategory = (project) => {
  return (
    project?.project_category ||
    project?.category ||
    project?.project_type ||
    "Web Application"
  );
};

/**
 * Returns the first technology from a comma-separated list.
 */
export const getFirstTech = (tech) => {
  if (!tech) return null;

  return tech.split(",")[0].trim();
};

/**
 * Converts comma-separated technologies into an array.
 */
export const getTechArray = (tech) => {
  if (!tech) return [];

  return tech
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

/**
 * Returns status badge classes.
 */
export const getStatusClasses = (status) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300";

    case "in progress":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300";

    case "pending":
      return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

    default:
      return "bg-primary/10 text-primary";
  }
};

/**
 * Returns project description.
 */
export const getProjectDescription = (project) => {
  return (
    project?.short_description ||
    project?.long_description ||
    "No description available."
  );
};

/**
 * Checks whether a URL is valid.
 */
export const hasValidUrl = (url) => {
  return Boolean(url && url.trim() !== "");
};