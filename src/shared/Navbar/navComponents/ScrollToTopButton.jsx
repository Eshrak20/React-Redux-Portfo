import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = ({ isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="
  fixed
  bottom-[calc(4.25rem+env(safe-area-inset-bottom))]
  right-3
  z-[90]
  flex h-9 w-9 items-center justify-center
  rounded-full
  bg-primary text-primary-foreground
  shadow-lg shadow-primary/20
  transition-shadow duration-300
  hover:shadow-xl hover:shadow-primary/30
  focus-visible:outline-none
  focus-visible:ring-2 focus-visible:ring-primary
  focus-visible:ring-offset-2
  sm:right-5 sm:h-11 sm:w-11
  md:h-12 md:w-12
  lg:bottom-20
"
        >
          <ArrowUp aria-hidden="true" className="h-4 w-4 sm:h-5 sm:w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
