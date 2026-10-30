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
    <div className="mb-7 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border/80 bg-background/95 p-2 shadow-sm backdrop-blur-sm sm:p-3">
        {hasEnglishVersion ? (
            <div className="flex items-center gap-2 shrink-0">
                <Languages aria-hidden="true" className="h-4 w-4 text-primary" />

                <div
                    role="group"
                    aria-label="Choose article language"
                    className="relative inline-flex items-center rounded-full border border-border bg-muted/60 p-1 shadow-inner"
                >
                    {/* Animated Sliding Background Indicator */}
                    <div
                        aria-hidden="true"
                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-primary transition-all duration-300 ease-out shadow-sm ${
                            language === "bn" ? "left-1" : "left-[calc(50%+2px)]"
                        }`}
                    />

                    {[
                        { id: "bn", label: "বাংলা" },
                        { id: "en", label: "English" },
                    ].map((option) => (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={language === option.id}
                            onClick={() => onLanguageChange(option.id)}
                            className={`relative z-10 flex min-h-8 w-20 items-center justify-center rounded-full text-xs font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                                language === option.id
                                    ? "text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {option.label}
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