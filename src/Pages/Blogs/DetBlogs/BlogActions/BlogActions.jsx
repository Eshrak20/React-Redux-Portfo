
import {
  Bookmark,
  Maximize2,
  Minimize2,
  Printer,
} from "lucide-react";

const BlogActions = ({
  isBookmarked,
  toggleBookmark,
  isFullscreen,
  toggleFullscreen,
  onPrint,
}) => {
  const buttonClass =
    "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary/40 hover:bg-primary/5 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  return (
    <div className="print-hidden">
      <div className="flex flex-nowrap items-center gap-1.5">
        {/* Bookmark */}
        <button
          type="button"
          onClick={toggleBookmark}
          aria-label={isBookmarked ? "Remove bookmark" : "Bookmark"}
          aria-pressed={isBookmarked}
          title={isBookmarked ? "Saved" : "Bookmark"}
          className={`${buttonClass} ${
            isBookmarked
              ? "border-primary/30 bg-primary/10 text-primary"
              : ""
          }`}
        >
          <Bookmark
            size={17}
            fill={isBookmarked ? "currentColor" : "none"}
          />
        </button>

        {/* Print */}
        <button
          type="button"
          onClick={onPrint || (() => window.print())}
          aria-label="Print or save as PDF"
          title="Print / Save PDF"
          className={buttonClass}
        >
          <Printer size={17} />
        </button>

        {/* Fullscreen */}
        <button
          type="button"
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
          aria-pressed={isFullscreen}
          className={buttonClass}
        >
          {isFullscreen ? (
            <Minimize2 size={17} />
          ) : (
            <Maximize2 size={17} />
          )}
        </button>
      </div>
    </div>
  );
};

export default BlogActions;
