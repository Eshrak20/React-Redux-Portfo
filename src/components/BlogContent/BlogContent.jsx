import RichContent from "../RichContent/RichContent";

const BlogContent = ({content = "", language = "en", className = ""}) => {
    if (!content) return null;

    return (
        <div className="w-full min-w-0 overflow-x-auto px-4 md:px-0">
            <RichContent
                content={content}
                lang={language === "bn" ? "bn" : "en"}
                dir="auto"
                className={`blog-article-content
                    ${language === "bn" ? "font-bengali" : ""}
                    ${className}
                    min-w-0 break-words text-base leading-8 sm:text-[1.0625rem] sm:leading-8
                    [&_p]:my-5 [&_p]:text-muted-foreground
                    [&_h1]:my-7 [&_h1]:break-words [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:leading-tight [&_h1]:text-foreground sm:[&_h1]:text-3xl
                    [&_h2]:my-6 [&_h2]:break-words [&_h2]:text-xl [&_h2]:font-bold [&_h2]:leading-snug [&_h2]:text-foreground sm:[&_h2]:text-2xl
                    [&_h3]:my-5 [&_h3]:break-words [&_h3]:text-lg [&_h3]:font-bold [&_h3]:leading-snug [&_h3]:text-foreground sm:[&_h3]:text-xl
                    [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:ps-6
                    [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:ps-6
                    [&_li]:ps-1 [&_li]:text-muted-foreground [&_li]:leading-8
                    [&_strong]:font-bold [&_strong]:text-foreground
                    [&_em]:italic [&_u]:underline [&_s]:line-through
                    [&_a]:break-words [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:opacity-80
                    [&_blockquote]:my-6 [&_blockquote]:border-s-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/50 [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:italic sm:[&_blockquote]:px-6
                    [&_table]:my-6 [&_table]:min-w-[36rem] [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
                    [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_th]:text-start [&_th]:font-semibold [&_th]:text-foreground
                    [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:align-top
                    [&_td_p]:my-0 [&_th_p]:my-0
                    [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre [&_pre]: [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4
                    [&_pre_code]:block [&_pre_code]:whitespace-pre [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-foreground
                    [&_code]:break-words [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5
                    [&_img]:mx-auto [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full [&_img]:
                    [&_sub]:text-xs [&_sup]:text-xs
                `}
            />
        </div>
    );
};

export default BlogContent;
