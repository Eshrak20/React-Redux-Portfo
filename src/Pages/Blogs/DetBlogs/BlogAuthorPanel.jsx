
import { getRandomAuthorNote } from "@/data/authorNotes";
import {
    ChevronDown,
    ChevronUp,
    Shuffle,
} from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const BlogAuthorPanel = ({
    authorName,
    authorImage,
    designation,
    authorBio,
    facebookUrl,
    linkedInUrl,
    portfolioUrl,
    portfolioLogo,
}) => {
    const [randomNote, setRandomNote] = useState(() =>
        getRandomAuthorNote()
    );

    const [showFullBio, setShowFullBio] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);

    const profileImage = authorImage || portfolioLogo;

    const handleAnotherNote = () => {
        setRandomNote((currentNote) =>
            getRandomAuthorNote(currentNote)
        );
    };

    return (
        <>
       
{/* Author Information */}
<div className="mb-5 flex items-center gap-4">
    <button
        type="button"
        onClick={() => setImageOpen(true)}
        aria-label={`View ${authorName}'s profile image`}
        className="author-avatar group relative h-[76px] w-[76px] shrink-0 rounded-[42%_58%_55%_45%/48%_42%_58%_52%] border border-primary/30 bg-primary/5 p-1 shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
        <span className="absolute inset-[-4px] rounded-[42%_58%_55%_45%/48%_42%_58%_52%] border border-dashed border-primary/30 transition-colors duration-300 group-hover:border-primary/70" />

        <img
            src={profileImage}
            alt={`${authorName} profile`}
            loading="lazy"
            decoding="async"
            className="h-full w-full rounded-[inherit] object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = portfolioLogo;
            }}
        />

        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-card bg-primary" />
    </button>

    <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            About the author
        </p>

        <h2 className="mt-1 truncate font-bold text-foreground">
            {authorName}
        </h2>

        {designation && (
            <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                {designation}
            </p>
        )}
    </div>
</div>


            {designation && (
                <p className="mb-3 text-sm text-muted-foreground">
                    {designation}
                </p>
            )}

            {/* Random Author Note */}
            <div className="rounded-lg border border-border bg-muted/30 p-3">
                <p className="text-sm leading-6 text-muted-foreground">
                    {randomNote}
                </p>

                <button
                    type="button"
                    onClick={handleAnotherNote}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                    <Shuffle size={13} />
                    Show another note
                </button>
            </div>

            {/* Full Author Bio */}
            {authorBio && (
                <div className="mt-3">
                    <button
                        type="button"
                        onClick={() => setShowFullBio((prev) => !prev)}
                        aria-expanded={showFullBio}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        {showFullBio ? (
                            <>
                                Read less
                                <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                Read full bio
                                <ChevronDown size={16} />
                            </>
                        )}
                    </button>

                    {showFullBio && (
                        <div className="mt-3 border-l-2 border-primary/30 pl-3">
                            <p className="whitespace-pre-line text-sm leading-6 text-muted-foreground">
                                {authorBio}
                            </p>
                        </div>
                    )}
                </div>
            )}

            {/* Social Links */}
            <div className="mt-5 grid gap-2">
                {facebookUrl && (
                    <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center justify-center bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Follow on Facebook
                    </a>
                )}

                {linkedInUrl && (
                    <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center justify-center border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                        Connect on LinkedIn
                    </a>
                )}

                {portfolioUrl && (
                    <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Visit my About page
                    </a>
                )}
            </div>

            {/* Permanent Author Image Lightbox */}
            <Lightbox
                open={imageOpen}
                close={() => setImageOpen(false)}
                slides={[
                    {
                        src: profileImage,
                        alt: `${authorName} profile image`,
                    },
                ]}
                plugins={[Zoom]}
                carousel={{
                    finite: true,
                }}
                controller={{
                    closeOnBackdropClick: true,
                }}
            />
        </>
    );
};

export default BlogAuthorPanel;
