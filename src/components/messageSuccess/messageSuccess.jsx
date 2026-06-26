import { useEffect } from "react";
import Lottie from "lottie-react";
import { motion, AnimatePresence } from "framer-motion"; // Added for smooth fade-in
import successAnimation from "@/assets/lottie/contact us.json";

export default function MessageSuccess({ show, onClose }) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Extended slightly to let the animation finish

    return () => clearTimeout(timer);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          // Fade in the overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
        >
          <motion.div
            // Pop in the card
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            className="relative overflow-hidden bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:shadow-2xl text-center max-w-sm w-full mx-4"
          >
            {/* Ambient Glow behind the animation */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -z-10" />

            <div className="w-48 mx-auto">
              <Lottie 
                animationData={successAnimation} 
                loop={false} 
                style={{ filter: 'drop-shadow(0px 4px 10px rgba(0,0,0,0.1))' }}
              />
            </div>

            <div className="mt-2 space-y-2">
              <h3 className="text-2xl font-bold bg-linear-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Sent Successfully!
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                We'll get back to you shortly.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}