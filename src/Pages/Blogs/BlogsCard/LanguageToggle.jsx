import { motion } from "framer-motion";
import { Languages } from "lucide-react";

const LanguageToggle = ({ language, onChange }) => {
  const isBn = language === "bn";

  return (
    <div className="flex items-center gap-4">
      {/* Icon with subtle pulse animation */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-background border shadow-sm text-primary"
      >
        <Languages className="w-5 h-5" />
      </motion.div>

      {/* Filament-style Toggle Container */}
      <div className="relative flex items-center p-1  rounded-full">
        {/* The Sliding Pill - Now with primary background and white text */}
        <motion.div
          className="absolute h-[calc(100%-4px)] w-[calc(50%-2px)] bg-primary rounded-full shadow-md z-0"
          initial={false}
          animate={{ x: isBn ? 0 : "calc(100% - 2px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />

        {/* Buttons */}
        <button
          onClick={() => onChange("bn")}
          className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
            isBn ? "text-white" : "text-primary hover:text-primary/80"
          }`}
        >
          বাংলা
        </button>

        <button
          onClick={() => onChange("en")}
          className={`relative px-6 py-2 text-sm font-medium transition-colors duration-300 z-10 ${
            !isBn ? "text-white" : "text-primary hover:text-primary/80"
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;