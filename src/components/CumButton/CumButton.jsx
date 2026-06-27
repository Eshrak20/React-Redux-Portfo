import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const CumButton = ({ path, title, onClick, loading = false }) => {
  const ButtonContent = (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onClick}
      disabled={loading}
      className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-primary px-6 py-3 lg:px-10 lg:py-3 text-primary-foreground dark:hover:text-primary text shadow-lg shadow-primary/20 transition-all duration-300 disabled:opacity-50 "
    >
      {/* Text */}
      <span className="relative z-10 flex items-center gap-2 text-[16px] font-bold uppercase tracking-widest">
        {loading ? "Processing..." : title}

        <ArrowUpRight
          size={18}
          className={`transition-transform duration-300 ${
            loading
              ? "animate-pulse"
              : "group-hover:translate-x-1 group-hover:-translate-y-1"
          }`}
        />
      </span>

      {/* Hover Background */}
      <div className="absolute inset-0 -translate-y-full bg-foreground transition-transform duration-300 group-hover:translate-y-0" />
    </motion.button>
  );

  return (
    <motion.div
      className="mt-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5 }}
    >
      {path ? <Link to={path}>{ButtonContent}</Link> : ButtonContent}
    </motion.div>
  );
};

export default CumButton;