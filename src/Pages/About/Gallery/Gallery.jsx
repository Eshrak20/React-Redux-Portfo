import Title from "@/components/Title/Title";
import { motion } from "framer-motion";
import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ galleryImageData = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!galleryImageData.length) return null;

  const slides = galleryImageData.map((img) => ({
    src: img.image,
    title: img.title,
    description: img.place,
  }));

  return (
    <section className="relative py-2 md:pt-32 overflow-hidden text-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <Title name="MY Memory" />
        </div>

        {/* Original Desktop Layout */}
        <motion.div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 auto-rows-[150px] sm:auto-rows-[190px] md:auto-rows-[220px] lg:auto-rows-[280px]">
          {galleryImageData.map((item, index) => {
            const isLarge = index % 5 === 0;
            const isTall = index % 7 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: Math.min(index * 0.05, 0.3),
                }}
                onClick={() => handleImageClick(index)}
                className={`
                  group relative cursor-pointer overflow-hidden
                  col-span-1 row-span-1
                  ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                  ${isTall ? "md:row-span-2" : ""}

                  rounded-none
                  md:rounded-3xl

                  md:shadow-md
                  md:shadow-black/10
                  md:transition-all
                  md:duration-500
                  md:hover:shadow-xl
                  md:hover:shadow-black/30
                  md:hover:-translate-y-1
                `}
              >
                <img
                  src={item.image}
                  alt={item.title || "Gallery Image"}
                  loading="lazy"
                  decoding="async"
                  className="
                    w-full h-full object-cover
                    transition-none
                    md:transition-transform
                    md:duration-700
                    md:group-hover:scale-110
                  "
                />

                {/* Original Desktop Overlay */}
                <div
                  className="
                    absolute inset-0
                    flex flex-col justify-end
                    p-3 md:p-8
                    bg-gradient-to-t
                    from-black/80 via-black/10 to-transparent
                    opacity-100 md:opacity-0
                    md:group-hover:opacity-100
                    transition-opacity duration-500
                  "
                >
                  <h3 className="text-white text-sm md:text-2xl font-bold line-clamp-2">
                    {item.title || "Timeless Frame"}
                  </h3>

                  <p className="text-gray-300 text-[10px] md:text-sm uppercase tracking-widest mt-1 md:mt-2">
                    {item.place || "Gallery"}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All */}
        <div className="flex justify-center mt-8 md:mt-12">
          <button
            type="button"
            onClick={() => handleImageClick(0)}
            className="
    px-6 py-3
    bg-primary text-primary-foreground
    hover:bg-primary/90
    transition-colors duration-300
    rounded-md text-sm font-medium
  "
          >
            View All Memories ({galleryImageData.length})
          </button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        plugins={[Zoom, Captions, Thumbnails]}
      />
    </section>
  );
};

export default Gallery;
