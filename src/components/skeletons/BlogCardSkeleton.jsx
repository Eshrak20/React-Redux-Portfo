const BlogCardSkeleton = () => {
    return (
        <article className="h-full">
            <div className="flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-sm p-6">
                {/* Loading Spinner */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-sm font-medium text-muted-foreground">Loading blog...</p>
                </div>
            </div>
        </article>
    );
};

export default BlogCardSkeleton;