export const BlogPrintHeader = ({title, language}) => (
    <header className="print-only blog-print-header">
        <h1 lang={language === "bn" ? "bn" : "en"}>{title}</h1>
    </header>
);

export const BlogPrintAuthor = ({authorName, socialLinks}) => (
    <section className="print-only blog-print-author">
        <h2>{authorName}</h2>
        <div className="blog-print-author-links">
            {socialLinks.filter((link) => link.url).map((link) => (
                <a
                    key={link.id || link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {link.name || link.platform || link.url}
                </a>
            ))}
        </div>
    </section>
);
