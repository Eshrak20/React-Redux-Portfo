// src/utils/projectAnimations.js

/**
 * Parent grid animation
 *
 * Controls the reveal timing of all project cards.
 */
export const containerVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/**
 * Project card animation
 *
 * Lightweight entrance animation using opacity + transform.
 */
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },

  hover: {
    y: -6,
    scale: 1.01,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },

  tap: {
    scale: 0.98,
  },
};

/**
 * Project image hover animation
 */
export const imageVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Button / arrow hover animation
 */
export const buttonVariants = {
  initial: {
    x: 0,
  },

  hover: {
    x: 4,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};

/**
 * Badge animation
 */
export const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};

/**
 * Reusable fade-up animation
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
      duration: 0.4,
      ease: "easeOut",
    },
  },
};