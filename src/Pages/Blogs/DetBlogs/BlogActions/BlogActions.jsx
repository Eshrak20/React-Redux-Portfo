import { Bookmark, Maximize2, Minimize2, Printer } from "lucide-react";
import { generatePDF } from "./GeneratePDF";


const BlogActions = ({
  blog,
  isBookmarked,
  toggleBookmark,
  isFullscreen,
  toggleFullscreen,
}) => {
  const handleDownloadPDF = async () => {
    try {
      await generatePDF(blog);
    } catch (error) {
      console.error("PDF generation failed:", error);
    }
  };

  return (
    <div className="mt-10 space-y-6">
      {/* SOCIAL SHARE */}
      {/* <SocialShareButtons
        title={blog?.title_bng || blog?.title}
        url={typeof window !== "undefined" ? window.location.href : ""}
      /> */}

      {/* ACTION BUTTONS */}
      <div className="flex flex-wrap gap-3">
        {/* Bookmark */}
        <button
          onClick={toggleBookmark}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
            isBookmarked
              ? "bg-primary/10 text-primary"
              : "bg-slate-100 dark:bg-slate-900"
          }`}
        >
          <Bookmark size={16} />
          Bookmark
        </button>

        {/* TODO: PDF Download */}
        {/* <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-primary hover:text-white transition"
        >
          <Download size={16} />
          PDF
        </button> */}

        {/* Print */}
        <button
          onClick={() => window.print()}
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-primary hover:text-white transition"
        >
          <Printer size={16} />
          Print
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          className="px-4 py-2 rounded-lg flex items-center gap-2 bg-slate-100 dark:bg-slate-900 hover:bg-primary hover:text-white transition"
        >
          {isFullscreen ? (
            <>
              <Minimize2 size={16} />
              Exit
            </>
          ) : (
            <>
              <Maximize2 size={16} />
              Fullscreen
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default BlogActions;