import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navItems";

const DesktopNav = ({
    navWrapRef,
    navItemRefs,
    activePill,
    isNavItemActive,
}) => (
    <nav
        ref={navWrapRef}
        aria-label="Primary navigation"
        className="relative hidden items-center gap-1 rounded-full p-1 lg:flex"
    >
        <motion.span
            animate={{
                x: activePill.left,
                width: activePill.width,
                opacity: activePill.opacity,
            }}
            transition={{type: "spring", stiffness: 300, damping: 6}}
            className="pointer-events-none absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-primary dark:bg-white"
        />
        {navItems.map((item, index) => {
            const active = isNavItemActive(item);
            return (
                <div
                    key={item.path}
                    ref={(element) => {
                        navItemRefs.current[index] = element;
                    }}
                    className="relative z-10"
                >
                    <NavLink
                        to={item.path}
                        aria-current={active ? "page" : undefined}
                        className={`relative block rounded-full px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-200 xl:px-4 xl:text-[13px] ${
                            active
                                ? "text-white dark:text-primary"
                                : "text-primary hover:bg-primary hover:text-white dark:text-white dark:hover:bg-gray-200 dark:hover:text-primary"
                        }`}
                    >
                        {item.label}
                    </NavLink>
                </div>
            );
        })}
    </nav>
);

export default DesktopNav;
