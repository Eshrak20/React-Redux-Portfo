import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const ImagesDetProject = ({ project_gallery = [] }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (!project_gallery || project_gallery.length === 0) return null;

  const slides = project_gallery.map((src) => ({ src }));

  return (
    <div className="max-w-7xl mx-auto pb-24">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 rounded-xl bg-primary/10 dark:bg-primary/20">
          <FileText size={24} className="text-primary" />
        </div>
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
          Project Images
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6">
        {project_gallery.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-200 dark:bg-gray-800 cursor-pointer aspect-[4/3]"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            <img
              src={img}
              alt={`Gallery image ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
      />
    </div>
  );
};

export default ImagesDetProject;
