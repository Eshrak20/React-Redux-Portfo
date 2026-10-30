import { AnimatePresence, motion } from "framer-motion";
import { Ellipsis, FolderOpen, Home, Newspaper, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navItems";
import BookCallButton from "./BookCallButton";

const primaryItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/projects", label: "Projects", icon: FolderOpen },
  { path: "/blogs", label: "Blogs", icon: Newspaper },
];

const MobileNav = ({ isVisible, isNavItemActive, phoneNumber }) => {
  const [moreOpen, setMoreOpen] = useState(false);

  const moreItems = navItems.filter(
    (item) => !primaryItems.some((primary) => primary.path === item.path),
  );

  return (
    <>
      <AnimatePresence>
        {moreOpen && (
          <motion.button
            type="button"
            aria-label="Close more navigation"
            onClick={() => setMoreOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] bg-slate-950/20 backdrop-blur-[2px] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.nav
        aria-label="Mobile app navigation"
        initial={false}
        animate={
          isVisible
            ? {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                },
              }
            : {
                y: "120%",
                opacity: 0,
                transition: {
                  duration: 0.3,
                  ease: [0.4, 0, 1, 1],
                },
              }
        }
        className="fixed inset-x-0 bottom-0 z-100  lg:hidden"
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
      >
        {/* More menu */}
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="absolute inset-x-3 bottom-[calc(100%+0.5rem)] border border-border/70 bg-background/95 p-2 shadow-xl backdrop-blur-xl"
            >
              {moreItems.map((item) => {
                const Icon = item.icon;
                const active = isNavItemActive(item);

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMoreOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center gap-3  px-3 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={18} aria-hidden="true" />
                    {item.label}
                  </NavLink>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation bar */}
        <div className="site-mobile-bar-inner mx-auto flex h-14 max-w-md items-center justify-around rounded-sm  bg-background/95 px-1 backdrop-blur-2xl">
          {primaryItems.slice(0, 2).map((item) => {
            const Icon = item.icon;
            const active = isNavItemActive(item);

            return (
              <NavLink
                key={item.path}
                to={item.path}
                aria-current={active ? "page" : undefined}
                className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="text-[9px] font-semibold">{item.label}</span>
              </NavLink>
            );
          })}

          <BookCallButton phoneNumber={phoneNumber} variant="mobile" />

          <NavLink
            to="/blogs"
            aria-current={isNavItemActive(primaryItems[2]) ? "page" : undefined}
            className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
              isNavItemActive(primaryItems[2])
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Newspaper size={18} aria-hidden="true" />
            <span className="text-[9px] font-semibold">Blogs</span>
          </NavLink>

          <button
            type="button"
            aria-expanded={moreOpen}
            aria-label={moreOpen ? "Close more navigation" : "More navigation"}
            onClick={() => setMoreOpen((open) => !open)}
            className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-0.5 transition-colors ${
              moreOpen || moreItems.some(isNavItemActive)
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            {moreOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Ellipsis size={18} aria-hidden="true" />
            )}
            <span className="text-[9px] font-semibold">More</span>
          </button>
        </div>
      </motion.nav>
    </>
  );
};

export default MobileNav;
