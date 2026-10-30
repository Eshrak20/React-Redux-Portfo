const BlogAuthorPanel = ({
    authorName,
    authorImage,
    designation,
    authorBio,
    facebookUrl,
    linkedInUrl,
    portfolioUrl,
    portfolioLogo,
}) => (
    <>
        <div className="mb-4 flex items-center gap-3">
            <img
                src={authorImage || portfolioLogo}
                alt={authorImage ? authorName : `${authorName} logo`}
                className="h-14 w-14 rounded-full border border-border bg-slate-950 object-cover p-1"
                onError={(event) => {
                    event.currentTarget.src = portfolioLogo;
                }}
            />
            <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                    About the author
                </p>
                <h2 className="mt-1 truncate font-bold text-foreground">
                    {authorName}
                </h2>
            </div>
        </div>
        {designation && (
            <p className="mb-3 text-sm text-muted-foreground">{designation}</p>
        )}
        <p className="text-sm leading-6 text-muted-foreground">
            {authorBio || "I write about technology, software, and thoughtful digital experiences."}
        </p>
        <div className="mt-5 grid gap-2">
            <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-10 items-center justify-center rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
                Follow on Facebook
            </a>
            {linkedInUrl && (
                <a
                    href={linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                    Connect on LinkedIn
                </a>
            )}
            <a
                href={portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
                Visit my portfolio
            </a>
        </div>
    </>
);

export default BlogAuthorPanel;
