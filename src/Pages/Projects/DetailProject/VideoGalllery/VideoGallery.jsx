import { Play, Video } from "lucide-react";
import { useState } from "react";

const VideoGallery = ({ videoId, title = "Project walkthrough" }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoId) return null;

  const normalizedId =
    String(videoId).match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|live\/|watch\?v=))([\w-]{11})/)?.[1] ??
    String(videoId).trim();
  const isValidVideoId = /^[\w-]{11}$/.test(normalizedId);

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-5 flex items-center gap-3 sm:mb-7">
        <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
          <Video aria-hidden="true" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Project walkthrough
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Watch a quick overview of the project.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl overflow-hidden border border-border bg-black">
        {!isValidVideoId ? (
          <div className="flex aspect-video items-center justify-center px-6 text-center text-sm text-white/80">
            This project video is unavailable.
          </div>
        ) : isPlaying ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${normalizedId}?autoplay=1&playsinline=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="aspect-video w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${title}`}
            className="group relative block aspect-video w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          >
            <img
              src={`https://img.youtube.com/vi/${normalizedId}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover opacity-80 transition-opacity duration-200 group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg sm:h-16 sm:w-16">
                <Play aria-hidden="true" className="ml-1 h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" />
              </span>
            </span>
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 pb-4 pt-10 text-sm font-semibold text-white sm:px-6 sm:pb-5">
              {title}
            </span>
          </button>
        )}
      </div>
    </section>
  );
};

export default VideoGallery;
