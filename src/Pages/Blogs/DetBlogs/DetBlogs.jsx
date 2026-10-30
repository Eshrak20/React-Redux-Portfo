
import {
    getBlogArticleContent,
    getBlogSummary,
    getBlogTitle,
    getExcerpt,
} from "@/Pages/Blogs/BlogsCard/blogUtils.js";
import portfolioLogo from "@/assets/title/eg2.png";
import BlogContent from "@/components/BlogContent/BlogContent.jsx";
import { useGetAboutQuery } from "@/redux/api/aboutApi";
import { useGetBlogsQuery } from "@/redux/api/blogApi";
import { useGetSocialLinksQuery } from "@/redux/api/homeApi";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import BlogAuthorPanel from "./BlogAuthorPanel";
import BlogBanner from "./BlogBanner";
import BlogDetailToolbar from "./BlogDetailToolbar";
import BlogMobileShare from "./BlogMobileShare";
import { BlogPrintAuthor, BlogPrintHeader } from "./BlogPrintSections";
import BlogRelatedSection from "./BlogRelatedSection";
import SocialShareButtons from "./SocialShareButtons";

const DetBlogs = ({ blog, language = "bn", onLanguageChange }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const articleBodyRef = useRef(null);

    const isBangla = language === "bn";

    const content = getBlogArticleContent(blog, language);
    const summary = getBlogSummary(blog, language);
    const title = getBlogTitle(blog, language);

    const hasEnglishVersion = Boolean(
        blog?.content?.trim() &&
        blog.content.replace(/<[^>]*>/g, "").trim(),
    );

    const { data: blogsResponse } = useGetBlogsQuery({
        page: 1,
        perPage: 18,
        sort: "latest",
    });

    const { data: aboutResponse } = useGetAboutQuery();
    const { data: socialResponse } = useGetSocialLinksQuery();

    const about = aboutResponse?.data?.[0];
    const socialLinks = socialResponse?.data || [];

    const authorName = blog?.staff?.name || "Eshrak G";
    const portfolioUrl = "https://e.veringroup.com";

    const facebookUrl =
        blog?.staff?.facebook_url ||
        socialLinks.find((link) =>
            /facebook/i.test(
                `${link.name || ""} ${link.platform || ""} ${link.icon || ""}`,
            ),
        )?.url ||
        "https://www.facebook.com/eshrakg62";

    const linkedInUrl =
        blog?.staff?.linkedin_url ||
        socialLinks.find((link) =>
            /linkedin/i.test(
                `${link.name || ""} ${link.platform || ""} ${link.icon || ""}`,
            ),
        )?.url;

    const authorBio = getExcerpt(
        about?.who_we_are || about?.description || "",
        180,
    );

    const relatedBlogs = useMemo(() => {
        const candidates = (blogsResponse?.data || []).filter(
            (item) =>
                item.slug !== blog?.slug &&
                String(item.id) !== String(blog?.id),
        );

        for (let index = candidates.length - 1; index > 0; index -= 1) {
            const randomIndex = Math.floor(Math.random() * (index + 1));

            [candidates[index], candidates[randomIndex]] = [
                candidates[randomIndex],
                candidates[index],
            ];
        }

        return candidates.slice(0, 4);
    }, [blogsResponse?.data, blog?.id, blog?.slug]);

    const toggleBookmark = () => {
        const list = JSON.parse(
            localStorage.getItem("bookmarkedBlogs") || "[]",
        );

        if (isBookmarked) {
            const updated = list.filter((id) => id !== blog?.id);

            localStorage.setItem(
                "bookmarkedBlogs",
                JSON.stringify(updated),
            );

            setIsBookmarked(false);
        } else {
            localStorage.setItem(
                "bookmarkedBlogs",
                JSON.stringify([...list, blog?.id]),
            );

            setIsBookmarked(true);
        }
    };

    useEffect(() => {
        const list = JSON.parse(
            localStorage.getItem("bookmarkedBlogs") || "[]",
        );

        setIsBookmarked(list.includes(blog?.id));
    }, [blog?.id]);

    const toggleFullscreen = () => {
        const fullscreenAction = document.fullscreenElement
            ? document.exitFullscreen
            : articleBodyRef.current?.requestFullscreen;

        if (!fullscreenAction) {
            console.error(
                "Fullscreen mode is not supported by this browser.",
            );
            return;
        }

        fullscreenAction
            .call(
                document.fullscreenElement
                    ? document
                    : articleBodyRef.current,
            )
            .catch((error) => {
                console.error("Could not change fullscreen mode.", error);
            });
    };

    const printArticle = () => window.print();

    useEffect(() => {
        const updateFullscreen = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };

        document.addEventListener("fullscreenchange", updateFullscreen);

        return () => {
            document.removeEventListener(
                "fullscreenchange",
                updateFullscreen,
            );
        };
    }, []);

    if (!blog) return null;

    return (
        <div className="bg-slate-100/80 dark:bg-slate-950">
            <section className="pb-10 pt-24 sm:pb-16 sm:pt-28">
                <article
                    className={`blog-print-area mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 py-5 sm:px-6 sm:py-8 lg:grid-cols-[3.5rem_minmax(0,48rem)] lg:justify-center lg:gap-6 lg:px-8 xl:grid-cols-[17rem_minmax(0,48rem)_3.5rem] xl:gap-7 ${
                        isFullscreen
                            ? "max-w-7xl lg:grid-cols-[3.5rem_minmax(0,54rem)] xl:grid-cols-[17rem_minmax(0,54rem)_3.5rem]"
                            : ""
                    }`}
                >
                    {/* Left Sidebar: Author Details */}
                    <aside
                        className={`print-hidden hidden xl:col-start-1 xl:row-span-2 xl:block ${
                            isFullscreen ? "" : ""
                        }`}
                    >
                        <div className="sticky top-24 space-y-5">
                            {!isFullscreen && (
                                <BlogDetailToolbar
                                    language={language}
                                    onLanguageChange={onLanguageChange}
                                    hasEnglishVersion={hasEnglishVersion}
                                    isBookmarked={isBookmarked}
                                    toggleBookmark={toggleBookmark}
                                    isFullscreen={isFullscreen}
                                    toggleFullscreen={toggleFullscreen}
                                    onPrint={printArticle}
                                />
                            )}

                            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                                <BlogAuthorPanel
                                    authorName={authorName}
                                    authorImage={blog?.staff?.image}
                                    designation={blog?.staff?.designation}
                                    authorBio={authorBio}
                                    facebookUrl={facebookUrl}
                                    linkedInUrl={linkedInUrl}
                                    portfolioUrl={portfolioUrl}
                                    portfolioLogo={portfolioLogo}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Blog Banner: Main Content Column */}
                    <div className="min-w-0 lg:col-start-2 lg:row-start-1 xl:col-start-2 xl:row-start-1">
                        <BlogBanner blog={blog} language={language} />
                    </div>

                    {/* Right Sidebar: Social Share */}
                    <aside
                        aria-label="Share this article"
                        className="print-hidden hidden lg:col-start-1 lg:row-start-2 lg:block xl:col-start-3 xl:row-start-1 xl:row-span-2"
                    >
                        <div className="sticky top-28 flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-2 shadow-sm">
                            <span className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl]">
                                Share
                            </span>

                            <SocialShareButtons
                                title={title}
                                summary={summary}
                                url={window.location.href}
                                vertical
                            />
                        </div>
                    </aside>

                    {/* Main Article Content */}
                    <motion.div
                        ref={articleBodyRef}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8 lg:col-start-2 lg:row-start-2 lg:p-10 xl:col-start-2 xl:row-start-2 ${
                            isFullscreen ? "blog-reader-fullscreen" : ""
                        }`}
                    >
                        <BlogPrintHeader
                            title={title}
                            language={language}
                        />

                        <h1
                            lang={isBangla ? "bn" : "en"}
                            className={`print-hidden sr-only xl:hidden ${
                                isBangla ? "font-bengali" : ""
                            }`}
                        >
                            {title}
                        </h1>

                        {isFullscreen && (
                            <h2
                                className={`print-hidden mb-7 break-words text-3xl font-bold leading-tight text-foreground sm:text-4xl ${
                                    isBangla ? "font-bengali" : ""
                                }`}
                            >
                                {title}
                            </h2>
                        )}

                        <div
                            aria-hidden="true"
                            className="print-only blog-print-watermark"
                        >
                            <span>Eshrak G · e.veringroup.com</span>
                        </div>

                        <div
                            className={`print-hidden ${
                                isFullscreen ? "xl:block" : "xl:hidden"
                            }`}
                        >
                            <BlogDetailToolbar
                                language={language}
                                onLanguageChange={onLanguageChange}
                                hasEnglishVersion={hasEnglishVersion}
                                isBookmarked={isBookmarked}
                                toggleBookmark={toggleBookmark}
                                isFullscreen={isFullscreen}
                                toggleFullscreen={toggleFullscreen}
                                onPrint={printArticle}
                            />
                        </div>

                        <BlogContent
                            content={content}
                            language={language}
                            className="blog-article-content"
                        />

                        {summary && (
                            <aside className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-7 dark:bg-primary/10">
                                <h2 className="mb-2 text-sm font-semibold text-primary">
                                    Summary
                                </h2>

                                <BlogContent
                                    content={summary}
                                    language={language}
                                    className="blog-summary-content [&_p]:my-2 [&_p]:text-sm [&_p]:leading-6 [&_li]:text-sm [&_li]:leading-6"
                                />
                            </aside>
                        )}

                        {blog.tags?.length > 0 && (
                            <ul
                                aria-label="Article topics"
                                className="mt-8 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-800"
                            >
                                {blog.tags.map((tag, index) => (
                                    <li
                                        key={`${tag}-${index}`}
                                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300"
                                    >
                                        #{tag}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <BlogPrintAuthor
                            authorName={authorName}
                            socialLinks={socialLinks}
                        />
                    </motion.div>

                    {/* Author Details: Mobile and Tablet */}
                    <aside className="print-hidden rounded-2xl border border-border bg-card p-5 shadow-sm xl:hidden lg:col-span-2">
                        <BlogAuthorPanel
                            authorName={authorName}
                            authorImage={blog?.staff?.image}
                            designation={blog?.staff?.designation}
                            authorBio={authorBio}
                            facebookUrl={facebookUrl}
                            linkedInUrl={linkedInUrl}
                            portfolioUrl={portfolioUrl}
                            portfolioLogo={portfolioLogo}
                        />
                    </aside>
                </article>
            </section>

            <BlogRelatedSection
                blogs={relatedBlogs}
                language={language}
            />

            <BlogMobileShare
                title={title}
                summary={summary}
            />
        </div>
    );
};

export default DetBlogs;
