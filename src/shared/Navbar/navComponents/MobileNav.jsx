import { AnimatePresence, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { navItems } from "../data/navItems";

export default function MobileNav({
  isOpen,
  setIsOpen,
  isNavItemActive,
  onBookCall,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-80 bg-transparent"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -8,
              scale: 0.96,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            className="
              fixed
              right-3
              top-24
              z-100
              w-56
              max-w-[calc(100vw-24px)]

              rounded-xl

              border
              border-gray-300

              bg-white

              p-2

              shadow-lg

              dark:border-gray-400
              dark:bg-slate-950/95

              sm:right-8
              lg:hidden
            "
          >
            <nav className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isNavItemActive(item);

                return (
                  <motion.div
                    key={item.path}
                    initial={{
                      opacity: 0,
                      x: 12,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.04,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 rounded-lg
                        px-3 py-3
                        text-sm
                        font-bold
                        transition-all duration-300

                        ${
                          isActive
                            ? "bg-primary text-white"
                            : "text-slate-900 hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10"
                        }
                      `}
                    >
                      <Icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  </motion.div>
                );
              })}

              {/* Book Call */}
              <motion.button
                initial={{
                  opacity: 0,
                  x: 12,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: navItems.length * 0.05,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={() => {
                  setIsOpen(false);
                  onBookCall();
                }}
                className="
                  mt-2
                  flex
                  items-center
                  justify-center
                  gap-2

                  rounded-lg

                  bg-primary

                  px-3
                  py-3

                  font-semibold

                  text-white

                  transition

                  hover:opacity-90

                  md:hidden
                "
              >
                Book a Call
              </motion.button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}