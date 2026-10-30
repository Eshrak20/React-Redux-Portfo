import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTopButton = ({ isVisible }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    type="button"
                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 30, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Scroll to top"
                    className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] right-4 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/25 transition-shadow duration-300 hover:shadow-2xl hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:right-5 lg:bottom-20"
                >
                    <ArrowUp aria-hidden="true" className="h-6 w-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default ScrollToTopButton;