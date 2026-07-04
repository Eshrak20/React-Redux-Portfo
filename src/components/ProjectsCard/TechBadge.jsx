// src/components/Projects/TechBadge.jsx

import { motion } from "framer-motion";

const colorVariants = {
  primary:
    "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white",

  blue:
    "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-600 hover:text-white",

  emerald:
    "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 hover:bg-emerald-600 hover:text-white",

  purple:
    "bg-purple-500/10 text-purple-600 border-purple-500/20 hover:bg-purple-600 hover:text-white",

  orange:
    "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-600 hover:text-white",

  red:
    "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-600 hover:text-white",

  gray:
    "bg-muted text-muted-foreground border-border hover:bg-foreground hover:text-background",
};

const TechBadge = ({
  label,
  icon: Icon,
  color = "primary",
  className = "",
}) => {
  return (
    <motion.span
      whileHover={{
        scale: 1.08,
        y: -2,
      }}
      whileTap={{
        scale: 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 18,
      }}
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-sm
        font-medium
        transition-all
        duration-300
        cursor-default
        select-none
        ${colorVariants[color] || colorVariants.primary}
        ${className}
      `}
    >
      {Icon && <Icon size={15} />}

      <span>{label}</span>
    </motion.span>
  );
};

export default TechBadge;