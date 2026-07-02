import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence mode="wait">
        <motion.button
          initial={{
            opacity: 0,
            y: 30,
            scale: 0.85,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 30,
            scale: 0.85,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
            damping: 18,
          }}
          whileHover={{
            scale: 1.08,
            rotate: 2,
          }}
          whileTap={{
            scale: 0.92,
          }}
          onClick={handleScrollTop}
          aria-label="Scroll to top"
          className={cn(
            "fixed z-50 flex h-14 w-14 items-center justify-center rounded-full",
            "bottom-5 right-4 md:bottom-6 md:right-5",
            "bg-primary text-primary-foreground",
            "shadow-xl shadow-primary/25",
            "transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/40"
          )}
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowUp className="h-6 w-6" />
          </motion.div>

          <motion.span
            className="absolute inset-0 rounded-full border-2 border-current"
            animate={{
              scale: [1, 1.45],
              opacity: [0.45, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>
    </AnimatePresence>
  );
}