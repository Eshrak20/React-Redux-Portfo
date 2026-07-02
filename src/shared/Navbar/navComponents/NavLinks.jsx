import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navItems";

export default function NavLinks({
  navItemRefs,
  isNavItemActive,
}) {
  return (
    <>
      {navItems.map((item, index) => {
        const isActive = isNavItemActive(item);

        return (
          <motion.div
            key={item.path}
            ref={(el) => {
              navItemRefs.current[index] = el;
            }}
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.06,
            }}
            className="relative z-10"
          >
            <NavLink
              to={item.path}
              className={`
                relative block
                rounded-full
                px-3.5
                py-2

                text-xs
                font-bold
                uppercase
                tracking-wide

                transition-all
                duration-300

                xl:px-4
                xl:text-[13px]

                2xl:text-sm

                ${
                  isActive
                    ? "text-white dark:text-primary"
                    : `
                      text-primary
                      hover:bg-primary
                      hover:text-white

                      dark:text-white
                      dark:hover:bg-gray-200
                      dark:hover:text-primary
                    `
                }
              `}
            >
              {item.label}
            </NavLink>
          </motion.div>
        );
      })}
    </>
  );
}