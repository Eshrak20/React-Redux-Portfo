import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const AnimatedBackground = () => (
  <>
    <motion.span
      animate={{
        scale: [1, 1.08, 1],
        opacity: [0.28, 0.42, 0.28],
      }}
      transition={{
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-none absolute inset-0 rounded-full
        bg-primary/10
        group-hover:bg-white/15
        dark:bg-white/10
      "
    />

    <motion.span
      animate={{
        scale: [1, 1.16, 1],
        opacity: [0.2, 0.34, 0.2],
      }}
      transition={{
        duration: 2.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="
        pointer-events-none absolute -inset-1 rounded-full
        border border-primary/25
        group-hover:border-white/35
        dark:border-white/30
      "
    />
  </>
);

const AnimatedIconWrapper = ({ children }) => (
  <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
    <AnimatedBackground />
    {children}
  </span>
);

export const CallSignalIcon = ({ iconSize = 17 }) => {
  return (
    <AnimatedIconWrapper>
      <motion.span
        animate={{
          y: [0, -1, 0],
          rotate: [0, -4, 4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-10 flex h-4.5 w-4.5 items-center justify-center
          text-primary transition-colors duration-300
          group-hover:text-white
          dark:text-white
        "
      >
        <Phone size={iconSize} />
      </motion.span>
    </AnimatedIconWrapper>
  );
};

export const MailSignalIcon = ({ iconSize = 17 }) => {
  return (
    <AnimatedIconWrapper>
      <motion.span
        animate={{
          y: [0, -1, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-10 flex h-4.5 w-4.5 items-center justify-center
          text-primary transition-colors duration-300
          group-hover:text-white
          dark:text-white
        "
      >
        <Mail size={iconSize} />
      </motion.span>
    </AnimatedIconWrapper>
  );
};