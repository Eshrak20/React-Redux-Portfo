import { useGetSocialLinksQuery } from "@/redux/api/homeApi";
import { motion } from "framer-motion";
import * as FaIcons from "react-icons/fa";

const SocialIcons = ({
  className = "",
  buttonClassName = "",
  iconSize = 20,
}) => {
  const { data, isLoading, isError } = useGetSocialLinksQuery();

  const socialLinks = data?.data ?? [];
  if (isLoading || isError || !socialLinks.length) {
    return null;
  }

  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {socialLinks.map((link) => {
        const Icon =
          FaIcons[link.icon] || FaIcons.FaGlobe;

        return (
          <motion.a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name ?? link.platform}
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-card text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-lg ${buttonClassName}`}
          >
            <Icon size={iconSize} />
          </motion.a>
        );
      })}
    </div>
  );
};

export default SocialIcons;