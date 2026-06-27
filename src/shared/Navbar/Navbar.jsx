import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { NavLink, useLocation, useMatch } from "react-router-dom";
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE, GMAIL_BODY, GMAIL_SUBJECT, COMPANY_EMAIL } from "@/data/emailGreating";

import {
  Phone,
  X,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Menu,
  Moon,
  Sun,
  Home,
  Info,
  FolderOpen,
  MessageSquare,
  Mail,
  Newspaper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import logoL from "@/assets/title/eg1.png";
import logoD from "@/assets/title/eg2.png";
import { FaWhatsapp } from "react-icons/fa";
const navItems = [
  { label: "Home", path: "/", icon: Home },
  { label: "About", path: "/about", icon: Info },
  { label: "Projects", path: "/projects", icon: FolderOpen },
  { label: "Testimonial", path: "/testimonial", icon: MessageSquare },
  { label: "Contact", path: "/contact", icon: Mail },
  { label: "Blogs", path: "/blogs", icon: Newspaper },
];

const platformIcons = {
  instagram: <Instagram size={18} />,
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  whatsapp: <Phone size={18} />,
};





const CallSignalIcon = ({ iconSize = 17 }) => {
  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <motion.span
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.28, 0.42, 0.28],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute inset-0 rounded-full
          bg-primary/10
          group-hover:bg-white/15
          dark:bg-white/10
        "
      />

      <motion.span
        animate={{
          scale: [1, 1.16, 1],
          opacity: [0.2, 0.34, 0.2],
        }}
        transition={{
          duration: 2.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute -inset-1 rounded-full
          border border-primary/25
          group-hover:border-white/35
          dark:border-white/30
        "
      />

      <motion.span
        animate={{
          y: [0, -1, 0],
          rotate: [0, -4, 4, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-10 flex h-4.5 w-4.5 items-center justify-center
          text-primary transition-colors duration-300
          group-hover:text-white
          dark:text-white
        "
      >
        <Phone size={iconSize} />
      </motion.span>
    </span>
  );
};

const MailSignalIcon = ({ iconSize = 17 }) => {
  return (
    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
      <motion.span
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.28, 0.42, 0.28],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none absolute inset-0 rounded-full
          bg-primary/10
          group-hover:bg-white/15
          dark:bg-white/10
        "
      />

      <motion.span
        animate={{
          y: [0, -1, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          relative z-10 flex h-4.5 w-4.5 items-center justify-center
          text-primary transition-colors duration-300
          group-hover:text-white
          dark:text-white
        "
      >
        <Mail size={iconSize} />
      </motion.span>
    </span>
  );
};

const ThemeToggleButton = ({ isDarkMode, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      aria-label="Toggle dark and light mode"
      className="
        flex h-10 w-10 shrink-0 items-center justify-center rounded-full
        border border-primary/30 bg-transparent text-primary
        transition-all duration-300 hover:border-primary
        hover:bg-primary hover:text-white
        dark:border-gray-400 dark:text-white dark:hover:border-gray-400
        dark:hover:bg-white dark:hover:text-primary
        sm:h-11 sm:w-11
      "
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDarkMode ? (
          <motion.span
            key="sun"
            initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={18} />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ opacity: 0, rotate: 45, scale: 0.85 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -45, scale: 0.85 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={18} />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

const Navbar = ({ socialLinks = [], settingData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1440,
  );
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activePill, setActivePill] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const location = useLocation();
  const projectMatch = useMatch("/projects/*");
  const blogMatch = useMatch("/blogs/*");

  const navWrapRef = useRef(null);
  const navItemRefs = useRef([]);

  const isDesktopScreen = screenWidth >= 1024;
  const isLargeMonitor = screenWidth >= 1536;

  const currentLogo = isDarkMode ? logoD : logoL;

  const navbarWidth = !isDesktopScreen
    ? screenWidth < 640
      ? "calc(100vw - 24px)"
      : "94%"
    : isScrolled
      ? isLargeMonitor
        ? "68%"
        : "78%"
      : "85%";

  const contactEmail =
    settingData?.primary_email ||
    settingData?.email ||
    settingData?.data?.primary_email ||
    settingData?.data?.email ||
    COMPANY_EMAIL;

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE,
  )}`;

  const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    contactEmail,
  )}&su=${encodeURIComponent(GMAIL_SUBJECT)}&body=${encodeURIComponent(
    GMAIL_BODY,
  )}`;

  const handleBookCall = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleGmailCompose = () => {
    window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => {
      const nextMode = !prev;
      document.documentElement.classList.toggle("dark", nextMode);
      localStorage.setItem("theme", nextMode ? "dark" : "light");
      return nextMode;
    });
  };

  const getPlatformIcon = (platform) => {
    const key = platform?.toLowerCase();
    return platformIcons[key] || <div className="h-4 w-4" />;
  };

  const isNavItemActive = (item) => {
    return (
      location.pathname === item.path ||
      (item.path === "/projects" && projectMatch) ||
      (item.path === "/blogs" && blogMatch)
    );
  };

  const activeIndex = navItems.findIndex((item) => isNavItemActive(item));

  useLayoutEffect(() => {
    const updateActivePill = () => {
      const activeEl = navItemRefs.current[activeIndex];
      const navWrapEl = navWrapRef.current;

      if (!activeEl || !navWrapEl) {
        setActivePill((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const activeRect = activeEl.getBoundingClientRect();
      const navRect = navWrapEl.getBoundingClientRect();

      setActivePill({
        left: activeRect.left - navRect.left,
        width: activeRect.width,
        opacity: 1,
      });
    };

    updateActivePill();

    window.addEventListener("resize", updateActivePill);
    return () => window.removeEventListener("resize", updateActivePill);
  }, [activeIndex, location.pathname, isScrolled, screenWidth]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const shouldUseDark = savedTheme === "dark";

    setIsDarkMode(shouldUseDark);
    document.documentElement.classList.toggle("dark", shouldUseDark);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="
          left-0 right-0  z-95
          fixed inset-x-0 top-4 overflow-x-hidden px-3 transition-none
          md:top-4 md:px-0
          lg:top-4
        "
      >
        <motion.div
          animate={{
            width: navbarWidth,
          }}
          transition={{
            duration: isDesktopScreen ? 0.45 : 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="mx-auto max-w-362.5 px-0"
        >
          <div
            className="
              flex h-15 max-w-full items-center justify-between rounded-full
              border border-gray-300/50 bg-white/20 px-3
              shadow-none backdrop-blur-md transition-all duration-500
              dark:border-gray-400/80 dark:bg-slate-950/50
              sm:h-16 sm:px-5
              lg:h-16.5 lg:px-6
            "
          >
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group min-w-0 shrink-0"
            >
              <NavLink to="/" className="relative block">
                <div
                  className="
                    relative flex h-13 w-39 items-center
                    md:w-42.5
                    md:h-18
                    lg:h-20 lg:w-50
                    py-2
                  "
                >
                  <img
                    src={currentLogo}
                    alt="iLabs360 Logo"
                    className="
                      h-full w-full object-contain
                      transition-transform duration-300
                      group-hover:scale-[1.02]
                    "
                  />
                </div>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <div
              ref={navWrapRef}
              className="relative hidden items-center gap-1 rounded-full p-1 lg:flex"
            >
              <motion.span
                animate={{
                  x: activePill.left,
                  width: activePill.width,
                  opacity: activePill.opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 430,
                  damping: 36,
                }}
                className="pointer-events-none absolute left-0 top-1 h-[calc(100%-8px)] rounded-full bg-primary dark:bg-white"
              />

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
                    transition={{ delay: index * 0.06 }}
                    className="relative z-10"
                  >
                    <NavLink
                      to={item.path}
                      className={`
                        relative block rounded-full px-3.5 py-2 text-xs font-bold uppercase
                        tracking-wide transition-colors duration-300
                        xl:px-4 xl:text-[13px]
                        2xl:text-sm
                        ${
                          isActive
                            ? "text-white dark:text-primary"
                            : " text-primary hover:bg-primary dark:hover:bg-gray-200 dark:text-white hover:text-white dark:hover:text-primary"
                        }
                      `}
                    >
                      {item.label}
                    </NavLink>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA + Mobile Menu */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3 lg:ml-5 xl:ml-7">
              <ThemeToggleButton
                isDarkMode={isDarkMode}
                onClick={handleThemeToggle}
              />

              {/* Book A Call Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBookCall}
                className="
                  group relative hidden h-10 items-center gap-1.5 overflow-hidden rounded-full
                  border border-primary/40 bg-transparent px-4 font-bold
                  text-primary shadow-none transition-all duration-300
                  hover:border-primary hover:bg-primary hover:text-white

                  dark:border-gray-400 dark:bg-primary dark:text-white
                  dark:hover:bg-transparent dark:hover:text-white

                  md:flex md:h-11 md:px-4
                  lg:h-11 lg:px-4
                  xl:px-4.5
                "
              >
                <CallSignalIcon iconSize={16} />

                <span className="relative z-10 whitespace-nowrap text-[11px] uppercase tracking-wider sm:text-xs xl:text-[13px] 2xl:text-sm">
                  Book a Call
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label="Toggle mobile menu"
                className="
                  relative flex h-10 w-10 shrink-0 items-center justify-center
                  overflow-hidden rounded-full bg-primary/10 p-0
                  text-primary transition-all duration-300 hover:bg-primary/15
                  dark:border dark:border-gray-400 dark:bg-transparent dark:text-white
                  dark:hover:bg-white dark:hover:text-primary
                  sm:h-11 sm:w-11
                  lg:hidden
                "
              >
                {isOpen ? <X size={18} /> : <Menu size={18} />}

                {!isOpen && (
                  <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary dark:bg-white"
                  />
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Floating Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-80 bg-transparent"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              className="
                fixed right-3 top-23.75 z-100 w-52.5 max-w-[calc(100vw-24px)] rounded-lg
                border border-gray-300 bg-white p-2 shadow-sm
                dark:border-gray-400 dark:bg-slate-950/95
                sm:right-8 sm:top-23 sm:w-52.5
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
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.035 }}
                    >
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`
                          flex items-center gap-3 rounded-md px-3 py-3 text-sm
                          font-extrabold transition-all duration-300
                          ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-slate-900 hover:bg-primary/10 hover:text-primary dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
                          }
                        `}
                      >
                        <Icon
                          size={16}
                          className={isActive ? "text-white" : ""}
                        />
                        <span>{item.label}</span>
                      </NavLink>
                    </motion.div>
                  );
                })}

                {/* Small mobile e menu te Book A Call thakbe, medium device e navbar e thakbe */}
                <motion.button
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navItems.length * 0.04 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsOpen(false);
                    handleBookCall();
                  }}
                  className="
                    group mt-1 flex items-center justify-center gap-4 rounded-md
                    border border-gray-300 bg-transparent px-3 py-3 text-sm
                    font-extrabold text-slate-900 transition-all duration-300
                    hover:border-primary hover:bg-primary hover:text-white
                    dark:border-gray-400 dark:text-white
                    dark:hover:bg-primary
                    md:hidden
                  "
                >
                  <CallSignalIcon iconSize={15} />
                  <span>Book A Call</span>
                </motion.button>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Contact Button for Mobile */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={handleBookCall}
        className="
                  group fixed bottom-10 right-4 z-90 rounded-full bg-[#25D366]
                  p-4 text-white shadow-lg transition-transform hover:scale-110
                  dark:border dark:border-gray-400
                  md:right-5
                  "
      >
        <FaWhatsapp size={24} />
      </motion.button>
    </>
  );
};

export default Navbar;
