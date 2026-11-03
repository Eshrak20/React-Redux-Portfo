import { getProjectImage } from "@/utils/projectUtils";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

const getYouTubeId = (value) =>
  String(value ?? "").match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|live\/|watch\?v=))([\w-]{11})/,
  )?.[1] ??
  (/^[\w-]{11}$/.test(String(value ?? "").trim())
    ? String(value).trim()
    : "");

const ProjectHeroMedia = ({ project }) => {
  const gallery =
    project.gallery_images?.length > 0
      ? project.gallery_images
      : [getProjectImage(project)];
  const videoId = getYouTubeId(project.project_video);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);
  const [isPaused, setIsPaused] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (videoId || gallery.length < 2 || isPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % gallery.length);
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [gallery.length, isPaused, videoId]);

  const goToImage = (direction) => {
    setActiveIndex(
      (index) => (index + direction + gallery.length) % gallery.length,
    );
  };

  const showVideoPoster = Boolean(videoId);

  return (
    <div
      className="relative aspect-[16/10] max-h-[38rem] touch-pan-y overflow-hidden bg-black sm:aspect-[2/1]"
      onTouchStart={
        !videoId && gallery.length > 1
          ? (event) => {
              event.currentTarget.dataset.touchStartX = String(
                event.touches[0].clientX,
              );
            }
          : undefined
      }
      onTouchEnd={
        !videoId && gallery.length > 1
          ? (event) => {
              const touchStartX = Number(
                event.currentTarget.dataset.touchStartX,
              );
              const difference =
                event.changedTouches[0].clientX - touchStartX;

              if (Math.abs(difference) > 40) {
                goToImage(difference < 0 ? 1 : -1);
              }
            }
          : undefined
      }
    >
      {videoId && playVideo ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&playsinline=1&rel=0`}
          title={`${project.project_name} project video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <>
          {/* Video poster layer (only when a video exists) */}
          {showVideoPoster && (
            <img
              src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
              alt={`${project.project_name} project preview`}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getProjectImage(project);
              }}
            />
          )}

          {/* Gallery cross-fade stack (only when no video) */}
          {!showVideoPoster &&
            gallery.map((src, index) => (
              <img
                key={`${src}-${index}`}
                src={src}
                alt={
                  index === activeIndex
                    ? `${project.project_name} project preview${
                        gallery.length > 1
                          ? ` ${activeIndex + 1} of ${gallery.length}`
                          : ""
                      }`
                    : ""
                }
                aria-hidden={index !== activeIndex}
                fetchPriority={index === 0 ? "high" : "low"}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

          {videoId ? (
            <button
              type="button"
              onClick={() => setPlayVideo(true)}
              aria-label={`Play ${project.project_name} project video`}
              className="absolute inset-0 flex items-center justify-center bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg sm:h-20 sm:w-20">
                <Play
                  aria-hidden="true"
                  className="ml-1 h-7 w-7 sm:h-8 sm:w-8"
                  fill="currentColor"
                />
              </span>
              <span className="absolute bottom-4 left-4 text-sm font-semibold text-white sm:bottom-6 sm:left-6">
                Play project video
              </span>
            </button>
          ) : gallery.length > 1 ? (
            <>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-3 pb-3 pt-10 sm:px-5 sm:pb-5">
                <button
                  type="button"
                  onClick={() => goToImage(-1)}
                  aria-label="Previous project image"
                  className="flex h-10 w-10 items-center justify-center border border-white/50 bg-black/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </button>
                <span className="text-sm font-medium text-white">
                  {activeIndex + 1} / {gallery.length}
                </span>
                <button
                  type="button"
                  onClick={() => setIsPaused((paused) => !paused)}
                  aria-label={
                    isPaused
                      ? "Resume image slideshow"
                      : "Pause image slideshow"
                  }
                  className="flex h-10 w-10 items-center justify-center border border-white/50 bg-black/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  {isPaused ? (
                    <Play aria-hidden="true" size={18} />
                  ) : (
                    <Pause aria-hidden="true" size={18} />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => goToImage(1)}
                  aria-label="Next project image"
                  className="flex h-10 w-10 items-center justify-center border border-white/50 bg-black/30 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </button>
              </div>
            </>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ProjectHeroMedia;