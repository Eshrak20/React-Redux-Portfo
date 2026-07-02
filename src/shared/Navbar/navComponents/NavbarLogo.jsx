import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

export default function NavbarLogo({
  logo,
  alt = "Logo",
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative group min-w-0 shrink-0"
    >
      <NavLink
        to="/"
        className="relative block"
      >
        <div
          className="
            relative
            flex
            h-13
            w-39
            items-center
            py-2

            md:h-18
            md:w-42.5

            lg:h-20
            lg:w-50
          "
        >
          <img
            src={logo}
            alt={alt}
            className="
              h-full
              w-full
              object-contain

              transition-transform
              duration-300

              group-hover:scale-[1.02]
            "
          />
        </div>
      </NavLink>
    </motion.div>
  );
}