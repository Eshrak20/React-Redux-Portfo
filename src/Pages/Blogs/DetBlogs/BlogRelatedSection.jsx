import BlogCardUI from "../BlogsCard/BlogCardUI";

const BlogRelatedSection = ({blogs, language}) => {
    if (!blogs.length) return null;

    return (
        <section
            aria-labelledby="related-blogs-title"
            className="border-t border-border bg-slate-50/80 py-12 dark:bg-slate-900/40 sm:py-16"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-7">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                        Keep exploring
                    </p>
                    <h2
                        id="related-blogs-title"
                        className="text-2xl font-bold text-foreground sm:text-3xl"
                    >
                        Recommended articles
                    </h2>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {blogs.map((blog, index) => (
                        <BlogCardUI
                            key={blog.id || blog.slug}
                            blog={blog}
                            language={language}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogRelatedSection;
