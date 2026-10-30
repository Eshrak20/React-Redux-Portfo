import { Languages } from "lucide-react";
import BlogActions from "./BlogActions/BlogActions";

const BlogDetailToolbar = ({
    language,
    onLanguageChange,
    hasEnglishVersion,
    isBookmarked,
    toggleBookmark,
    isFullscreen,
    toggleFullscreen,
    onPrint,
}) => (
    <div className="mb-7 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-background/95 p-2 shadow-sm sm:p-3">
        {hasEnglishVersion ? (
            <div className="flex items-center gap-1.5 shrink-0">
                <Languages aria-hidden="true" className="h-4 w-4 text-primary" />

                <div
                    role="group"
                    aria-label="Choose article language"
                    className="inline-flex rounded-full border border-border bg-muted/70 p-0.5"
                >
                    {["bn", "en"].map((option) => (
                        <button
                            key={option}
                            type="button"
                            aria-pressed={language === option}
                            onClick={() => onLanguageChange(option)}
                            className={`min-h-8 rounded-full px-2.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                language === option
                                    ? "bg-primary text-white shadow-sm"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {option === "bn" ? "বাংলা" : "English"}
                        </button>
                    ))}
                </div>
            </div>
        ) : <span />}

        <div className="shrink-0">
            <BlogActions
                isBookmarked={isBookmarked}
                toggleBookmark={toggleBookmark}
                isFullscreen={isFullscreen}
                toggleFullscreen={toggleFullscreen}
                onPrint={onPrint}
            />
        </div>
    </div>
);

export default BlogDetailToolbar;