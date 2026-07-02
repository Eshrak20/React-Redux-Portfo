import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import BookCallButton from "./BookCallButton";
import ThemeToggle from "./ThemeToggle";

export default function NavbarActions({ isDarkMode, onThemeToggle, isOpen, setIsOpen, phoneNumber }) {
  return (
    <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:ml-5 xl:ml-7">
      <ThemeToggle isDarkMode={isDarkMode} onClick={onThemeToggle} />
      <BookCallButton phoneNumber={phoneNumber} />

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle Mobile Menu"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 text-primary transition-all duration-300 hover:bg-primary/15 dark:border dark:border-gray-400 dark:bg-transparent dark:text-white dark:hover:bg-white dark:hover:text-primary sm:h-11 sm:w-11 lg:hidden"
      >
        {isOpen ? <X size={18} /> : <Menu size={18} />}
        {!isOpen && (
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary dark:bg-white"
          />
        )}
      </motion.button>
    </div>
  );
}