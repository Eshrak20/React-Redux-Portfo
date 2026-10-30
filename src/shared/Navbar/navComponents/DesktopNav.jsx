
import { motion, MotionConfig } from "framer-motion";
import { memo } from "react";
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
        className="
            relative hidden items-center gap-1
            rounded-full border border-border/60
            bg-background/70 p-1
            shadow-sm shadow-black/[0.03]
            backdrop-blur-xl
            lg:flex
        "
    >
        <MotionConfig reducedMotion="user">
            {/* Active navigation indicator */}
            <motion.span
                aria-hidden="true"
                initial={false}
                animate={{
                    x: activePill.left,
                    width: activePill.width,
                    opacity: activePill.opacity,
                }}
                transition={{
                    type: "spring",
                    stiffness: 420,
                    damping: 36,
                    mass: 0.7,
                }}
                className="
                    pointer-events-none absolute left-0 top-1
                    h-[calc(100%-8px)]
                    rounded-full
                    bg-primary
                    shadow-md shadow-primary/20
                    dark:bg-white dark:shadow-white/10
                    will-change-[transform,width]
                "
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
                            className={`
                                group relative flex items-center
                                justify-center whitespace-nowrap
                                rounded-full px-3.5 py-2
                                text-[11px] font-bold uppercase
                                tracking-[0.09em]
                                transition-colors duration-200
                                xl:px-4 xl:text-xs
                                2xl:px-5

                                ${
                                    active
                                        ? "text-white dark:text-primary"
                                        : "text-foreground/65 hover:text-primary dark:text-white/70 dark:hover:text-white"
                                }
                            `}
                        >
                            <span className="relative">
                                {item.label}
                            </span>
                        </NavLink>
                    </div>
                );
            })}
        </MotionConfig>
    </nav>
);

export default memo(DesktopNav);
