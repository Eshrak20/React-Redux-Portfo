import { useGetSettingsDataQuery } from "@/redux/api/homeApi";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrivacyTerms = () => {
  const { pathname } = useLocation();
  const { data, isLoading, isError } = useGetSettingsDataQuery();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // Fixed array index
  const pageIndex = pathname === "/privacy-policy" ? 1 : 2;

  const settings = data?.data?.[pageIndex] ?? {};

  const title = settings.seo_title || settings.site_name || "Page";
  const description = settings.seo_description || "";

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="h-64 animate-pulse rounded-3xl bg-muted" />

          <div className="mt-10 space-y-4 rounded-3xl border border-border bg-card p-8">
            <div className="h-8 w-64 animate-pulse rounded bg-muted" />
            <div className="h-5 w-full animate-pulse rounded bg-muted" />
            <div className="h-5 w-11/12 animate-pulse rounded bg-muted" />
            <div className="h-5 w-10/12 animate-pulse rounded bg-muted" />
            <div className="h-5 w-full animate-pulse rounded bg-muted" />
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Failed to load page</h2>

          <p className="mt-3 text-muted-foreground">Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b bg-primary/5 dark:bg-primary/10">
        <div className="absolute inset-0 opacity-70 dark:opacity-30">
          <svg
            className="h-full w-full"
            viewBox="0 0 1440 180"
            preserveAspectRatio="none"
          >
            <path
              d="M0,90 C90,70 140,120 230,90 C300,65 330,110 420,80 C520,45 610,70 700,95 C780,120 850,55 940,70 C1030,85 1070,35 1160,60 C1250,85 1320,55 1440,75 L1440,180 L0,180 Z"
              className="fill-primary/15 dark:fill-primary/20"
            />

            <path
              d="M0,130 C130,110 210,155 340,118 C460,85 560,125 680,130 C820,135 910,85 1040,105 C1170,125 1260,95 1440,120 L1440,180 L0,180 Z"
              className="fill-primary/10 dark:fill-primary/15"
            />
          </svg>
        </div>

        <div className="relative mx-auto mt-24 max-w-7xl px-4 py-16">
          <h1
            className="text-3xl font-extrabold tracking-tight text-primary md:text-5xl"
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />

          <p className="mt-5 max-w-3xl text-base leading-8 text-muted-foreground">
            {pathname === "/privacy-policy"
              ? "Your privacy matters. This page explains how your information is collected, used, stored, and protected while using this website."
              : "These Terms & Conditions explain the rules and responsibilities that apply when using this website and its content."}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-sm"
        >
          <div
            className="
              legal-content
              text-base
              leading-8
              text-foreground

              [&>h1]:mt-10
              [&>h1]:mb-5
              [&>h1]:text-4xl
              [&>h1]:font-bold

              [&>h2]:mt-10
              [&>h2]:mb-5
              [&>h2]:text-3xl
              [&>h2]:font-bold
              [&>h2]:text-primary

              [&>h3]:mt-8
              [&>h3]:mb-4
              [&>h3]:text-2xl
              [&>h3]:font-semibold

              [&>h4]:mt-6
              [&>h4]:mb-3
              [&>h4]:text-xl
              [&>h4]:font-semibold

              [&>p]:my-5
              [&>p]:leading-8
              [&>p]:text-muted-foreground

              [&>ul]:my-5
              [&>ul]:ml-6
              [&>ul]:list-disc
              [&>ul]:space-y-3

              [&>ol]:my-5
              [&>ol]:ml-6
              [&>ol]:list-decimal
              [&>ol]:space-y-3

              [&>li]:leading-8

              [&>hr]:my-10
              [&>hr]:border-border

              [&_strong]:font-bold
              [&_em]:italic

              [&_a]:text-primary
              [&_a]:underline
              [&_a:hover]:opacity-80

              [&_blockquote]:my-6
              [&_blockquote]:border-l-4
              [&_blockquote]:border-primary
              [&_blockquote]:pl-5
              [&_blockquote]:italic
            "
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </motion.div>
      </section>
    </main>
  );
};

export default PrivacyTerms;
