import { useMemo } from "react";

const RichContent = ({
                         content = "",
                         className = "",
                         lang,
                         dir,
                     }) => {
    const contentWithScrollableTables = useMemo(() => {
        const template = document.createElement("template");
        template.innerHTML = content;

        template.content.querySelectorAll("table").forEach((table) => {
            const wrapper = document.createElement("div");
            wrapper.className =
                "my-6 max-w-full overflow-x-auto overscroll-x-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary";
            wrapper.setAttribute("role", "region");
            wrapper.setAttribute("aria-label", "Scrollable table");
            wrapper.tabIndex = 0;
            table.parentNode.insertBefore(wrapper, table);
            wrapper.appendChild(table);
        });

        return template.innerHTML;
    }, [content]);

    if (!content) return null;

    return (
        <div
            lang={lang}
            dir={dir}
            className={`
              max-w-none min-w-0 text-base leading-relaxed [overflow-wrap:anywhere]
              [&_p]:my-3 [&_p]:text-base [&_p]:leading-7 [&_p]:text-muted-foreground
              [&_h1]:my-6 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground
              [&_h2]:my-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground
              [&_h3]:my-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground
              [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
              [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6
              [&_li]:leading-7 [&_li]:text-muted-foreground
              [&_strong]:font-bold [&_strong]:text-foreground
              [&_em]:italic [&_u]:underline [&_s]:line-through
              [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4
              [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary
              [&_blockquote]:bg-muted/50 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic
              [&_table]:my-6 [&_table]:min-w-[600px] [&_table]:w-full [&_table]:border-collapse [&_table]:text-sm
              [&_th]:border [&_th]:border-border [&_th]:bg-muted [&_th]:p-3 [&_th]:text-left
              [&_th]:font-semibold [&_th]:text-foreground
              [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:align-top
              [&_td_p]:my-0 [&_th_p]:my-0
              [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:whitespace-pre
              [&_pre]:border [&_pre]:border-border [&_pre]:bg-muted [&_pre]:p-4
              [&_pre_code]:block [&_pre_code]:whitespace-pre [&_pre_code]:bg-transparent
              [&_pre_code]:p-0 [&_pre_code]:text-foreground
              [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5
              [&_img]:mx-auto [&_img]:my-6 [&_img]:h-auto [&_img]:max-w-full
              [&_sub]:text-xs [&_sup]:text-xs
              ${className}
            `}
            dangerouslySetInnerHTML={{
                __html: contentWithScrollableTables,
            }}
        />
    );
};

export default RichContent;