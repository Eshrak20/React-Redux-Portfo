const BlogCardSkeleton = () => (
    <section
        aria-label="Loading blogs"
        aria-busy="true"
        className="container mx-auto px-4 py-10 sm:px-6 lg:px-8"
    >
        <span className="sr-only">Loading blogs...</span>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({length: 6}, (_, index) => (
                <article
                    key={index}
                    aria-hidden="true"
                    className="overflow-hidden rounded-sm border border-border bg-card shadow-sm"
                >
                    <div className="aspect-video animate-pulse bg-muted" />
                    <div className="space-y-4 p-5 sm:p-6">
                        <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                        <div className="h-6 w-4/5 animate-pulse rounded bg-muted" />
                        <div className="space-y-2">
                            <div className="h-3 w-full animate-pulse rounded bg-muted" />
                            <div className="h-3 w-full animate-pulse rounded bg-muted" />
                            <div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
                        </div>
                        <div className="flex justify-between pt-2">
                            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                            <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
                        </div>
                    </div>
                </article>
            ))}
        </div>
    </section>
);

export default BlogCardSkeleton;
