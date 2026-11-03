import { Images } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/counter.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/styles.css";

const ImagesDetProject = ({ project_gallery = [] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!project_gallery?.length) return null;

  const slides = project_gallery.map((src, imageIndex) => ({
    src,
    alt: `Project screenshot ${imageIndex + 1}`,
    title: `Project screenshot ${imageIndex + 1}`,
    description: `${imageIndex + 1} of ${project_gallery.length}`,
  }));

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-5 flex items-center gap-3 sm:mb-7">
        <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
          <Images aria-hidden="true" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Project gallery
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Swipe to explore, or select an image to view it larger.
          </p>
        </div>
      </div>

      <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:thin] sm:mx-0 sm:gap-4 sm:px-0 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 lg:grid-cols-3">
        {project_gallery.map((image, imageIndex) => (
          <button
            key={`${image}-${imageIndex}`}
            type="button"
            onClick={() => {
              setIndex(imageIndex);
              setOpen(true);
            }}
            aria-label={`View project image ${imageIndex + 1}`}
            className="group relative aspect-[4/3] w-[84vw] shrink-0 snap-center overflow-hidden border border-border bg-muted text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:w-[60vw] md:w-auto"
          >
            <img
              src={image}
              alt={`${imageIndex + 1} of ${project_gallery.length} project screenshots`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Counter, Thumbnails, Captions]}
        zoom={{ maxZoomPixelRatio: 3, zoomInMultiplier: 2 }}
        thumbnails={{ showToggle: true }}
      />
    </section>
  );
};

export default ImagesDetProject;
