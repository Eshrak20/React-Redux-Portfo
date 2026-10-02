const RichContent = ({
                         content = "",
                         className = "",
                     }) => {
    if (!content) return null;

    return (
        <div
            className={`
        max-w-none
                    text-base
                    leading-relaxed

                    [&_p]:my-3
                    [&_p]:text-muted-foreground
                    [&_p]:text-base
                    [&_p]:leading-7

                    [&_h1]:my-6
                    [&_h1]:text-3xl
                    [&_h1]:font-bold
                    [&_h1]:text-foreground

                    [&_h2]:my-5
                    [&_h2]:text-2xl
                    [&_h2]:font-bold
                    [&_h2]:text-foreground

                    [&_h3]:my-4
                    [&_h3]:text-xl
                    [&_h3]:font-bold
                    [&_h3]:text-foreground

                    [&_ul]:my-4
                    [&_ul]:list-disc
                    [&_ul]:pl-6
                    [&_ul]:space-y-2

                    [&_ol]:my-4
                    [&_ol]:list-decimal
                    [&_ol]:pl-6
                    [&_ol]:space-y-2

                    [&_li]:text-muted-foreground
                    [&_li]:leading-7

                    [&_strong]:font-bold
                    [&_strong]:text-foreground

                    [&_em]:italic
                    [&_u]:underline
                    [&_s]:line-through

                    [&_a]:text-primary
                    [&_a]:underline
                    [&_a]:underline-offset-4

                    [&_blockquote]:my-6
                    [&_blockquote]:border-l-4
                    [&_blockquote]:border-primary
                    [&_blockquote]:bg-muted/50
                    [&_blockquote]:px-5
                    [&_blockquote]:py-3
                    [&_blockquote]:italic

                    [&_table]:my-6
                    [&_table]:min-w-[600px]
                    [&_table]:w-full
                    [&_table]:border-collapse
                    [&_table]:text-sm

                    [&_th]:border
                    [&_th]:border-border
                    [&_th]:bg-muted
                    [&_th]:p-3
                    [&_th]:text-left
                    [&_th]:font-semibold
                    [&_th]:text-foreground

                    [&_td]:border
                    [&_td]:border-border
                    [&_td]:p-3
                    [&_td]:align-top

                    [&_td_p]:my-0
                    [&_th_p]:my-0

                    [&_pre]:my-6
                    [&_pre]:overflow-x-auto
                    [&_pre]:whitespace-pre
                    [&_pre]:rounded-xl
                    [&_pre]:border
                    [&_pre]:border-border
                    [&_pre]:bg-muted
                    [&_pre]:p-4

                    [&_pre_code]:block
                    [&_pre_code]:whitespace-pre
                    [&_pre_code]:bg-transparent
                    [&_pre_code]:p-0
                    [&_pre_code]:text-foreground

                    [&_code]:rounded
                    [&_code]:bg-muted
                    [&_code]:px-1.5
                    [&_code]:py-0.5

                    [&_img]:mx-auto
                    [&_img]:my-6
                    [&_img]:max-w-full
                    [&_img]:rounded-xl

                    [&_sub]:text-xs
                    [&_sup]:text-xs
                "

        ${className}
      `}
            dangerouslySetInnerHTML={{
                __html: content,
            }}
        />
    );
};

export default RichContent;