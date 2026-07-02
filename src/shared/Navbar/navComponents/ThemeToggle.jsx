import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({
  isDarkMode,
  onClick,
  className = "",
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-label="Toggle Theme"
      className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center

        rounded-full

        border
        border-primary/30

        bg-transparent

        text-primary

        transition-all
        duration-300

        hover:border-primary
        hover:bg-primary
        hover:text-white

        dark:border-gray-400
        dark:text-white
        dark:hover:border-gray-400
        dark:hover:bg-white
        dark:hover:text-primary

        sm:h-11
        sm:w-11

        ${className}
      `}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{
              opacity: 0,
              rotate: -45,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: 45,
              scale: 0.8,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{
              opacity: 0,
              rotate: 45,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              rotate: -45,
              scale: 0.8,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}