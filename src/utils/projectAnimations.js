// src/utils/projectAnimations.js

/**
 * Parent grid animation
 */
export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

/**
 * Project card animation
 */
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 16,
    },
  },

  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 22,
    },
  },

  tap: {
    scale: 0.98,
  },
};

/**
 * Image animation
 */
export const imageVariants = {
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

/**
 * Button animation
 */
export const buttonVariants = {
  initial: {
    x: 0,
  },

  hover: {
    x: 4,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Badge animation
 */
export const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2,
      duration: 0.3,
    },
  },
};

/**
 * Fade-up animation
 */
export const fadeUpVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};