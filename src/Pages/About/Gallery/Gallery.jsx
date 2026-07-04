import Title from "@/components/Title/Title";
import { motion } from "framer-motion";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/plugins/captions.css";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const Gallery = ({ galleryImageData = [] }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleImageClick = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Animations
  const floatingVariants = {
    initial: { scale: 1, y: 0 },
    float: { scale: [1, 1.02, 1], y: [0, -10, 0], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } }
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden text-white">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <Title name="MY Memory" />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[280px]"
        >
          {galleryImageData.map((item, index) => {
            const isLarge = index % 5 === 0;
            const isTall = index % 7 === 0;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                animate={isHovered ? "float" : "initial"}
                variants={floatingVariants}
                className={`group relative cursor-pointer overflow-hidden rounded-3xl ${isLarge ? "md:col-span-2 md:row-span-2" : ""} ${isTall ? "md:row-span-2" : ""}`}
                onClick={() => handleImageClick(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <img
                  src={item.image}
                  alt={item.title || "Gallery Image"}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-white text-2xl font-bold">{item.title || "Timeless Frame"}</h3>
                  <p className="text-gray-300 text-sm uppercase tracking-widest mt-2">{item.place || "Gallery"}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={galleryImageData.map((img) => ({
          src: img.image,
          title: img.title,
          description: img.place
        }))}
        plugins={[Zoom, Captions, Thumbnails]}
      />
    </section>
  );
};

export default Gallery;