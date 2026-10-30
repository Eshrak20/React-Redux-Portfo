
import { Calendar, ChevronRight, Quote, Star, User } from "lucide-react";

const TestimonialCard = ({
  item,
  isHomePage,
  onClick,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "Date unavailable";

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) return "Date unavailable";

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const rating = Math.min(5, Math.max(0, Number(item.star) || 5));

  return (
    <article
      onClick={onClick}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick?.();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`
        group relative flex h-full min-h-[340px] flex-col
        overflow-hidden border border-gray-100 bg-white
        p-5 sm:p-6
        dark:border-gray-700 dark:bg-gray-800
        transition-all duration-300
        hover:border-primary/30 hover:shadow-xl
        ${onClick ? "cursor-pointer" : ""}
      `}
    >
      {/* Decorative quote */}
      <Quote className="absolute -right-3 -top-3 h-20 w-20 text-primary/[0.06] transition-transform duration-500 group-hover:rotate-12" />

      {/* Client information */}
      <div className="relative flex items-center gap-3.5">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name || "Client"}
            loading="lazy"
            className="h-14 w-14 shrink-0 rounded-full border-2 border-primary/20 object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <User className="h-7 w-7 text-primary" />
          </div>
        )}

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-semibold text-gray-900 dark:text-white">
            {item.name}
          </h3>

          {item.company && (
            <p className="mt-0.5 truncate text-sm text-gray-500 dark:text-gray-400">
              {item.company}
            </p>
          )}

          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(item.created_at)}
          </div>
        </div>
      </div>

      {/* Quote */}
      <div className="relative mt-7 flex flex-1 flex-col">
        <Quote className="mb-3 h-7 w-7 text-primary/50" />

        <p className="line-clamp-5 text-sm leading-7 text-gray-600 dark:text-gray-300">
          {item.short_description}
        </p>

        {isHomePage && item.long_description && (
          <span className="mt-3 inline-flex items-center text-sm font-medium text-primary">
            Read more
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
      </div>

      {/* Rating */}
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-700">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={`h-4 w-4 ${
                index < rating
                  ? "fill-amber-400 text-amber-400"
                  : "fill-gray-200 text-gray-200 dark:fill-gray-600 dark:text-gray-600"
              }`}
            />
          ))}
        </div>

        {!isHomePage && (
          <span className="text-sm font-medium text-primary">
            View Full
          </span>
        )}
      </div>
    </article>
  );
};

export default TestimonialCard;
