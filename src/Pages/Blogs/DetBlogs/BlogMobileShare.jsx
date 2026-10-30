import {Share2, X} from "lucide-react";
import {useState} from "react";
import SocialShareButtons from "./SocialShareButtons";

const BlogMobileShare = ({title, summary}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="print-hidden fixed bottom-5 left-4 z-50 lg:hidden">
            {isOpen && (
                <div
                    id="mobile-article-share"
                    className="mb-3 rounded-2xl border border-border bg-background p-3 shadow-xl"
                >
                    <SocialShareButtons
                        title={title}
                        summary={summary}
                        url={window.location.href}
                        grid
                    />
                </div>
            )}
            <button
                type="button"
                aria-label={isOpen ? "Close share options" : "Share this article"}
                aria-expanded={isOpen}
                aria-controls="mobile-article-share"
                onClick={() => setIsOpen((open) => !open)}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                {isOpen ? (
                    <X aria-hidden="true" className="h-5 w-5" />
                ) : (
                    <Share2 aria-hidden="true" className="h-5 w-5" />
                )}
            </button>
        </div>
    );
};

export default BlogMobileShare;
