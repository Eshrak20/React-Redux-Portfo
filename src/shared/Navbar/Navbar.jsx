import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";

import logoL from "@/assets/title/eg1.png";
import logoD from "@/assets/title/eg2.png";

import { WHATSAPP_NUMBER } from "@/data/emailGreating";

import DesktopNav from "./navComponents/DesktopNav";
import FloatingWhatsapp from "./navComponents/FloatingWhatsapp";
import MobileNav from "./navComponents/MobileNav";
import NavbarActions from "./navComponents/NavbarActions";
import NavbarLogo from "./navComponents/NavbarLogo";

import { navItems } from "./data/navItems";

import useNavbar from "./hooks/useNavbar";

import ScrollToTopButton from "./navComponents/ScrollToTopButton";
import { getNavbarWidth, isNavItemActive } from "./utils/navbarHelpers";

const Navbar = ({ settingData }) => {
  const {
    isOpen,
    setIsOpen,

    isScrolled,
    screenWidth,

    isDarkMode,
    toggleTheme,

    activePill,
    setActivePill,
  } = useNavbar();
  const location = useLocation();
  const projectMatch = useMatch("/projects/*");
  const blogMatch = useMatch("/blogs/*");
  const navWrapRef = useRef(null);
  const navItemRefs = useRef([]);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const isDesktopScreen = screenWidth >= 1024;
  const isLargeMonitor = screenWidth >= 1536;
  const currentLogo = isDarkMode ? logoD : logoL;
  const navbarWidth = getNavbarWidth({
    screenWidth,
    isDesktopScreen,
    isLargeMonitor,
    isScrolled,
  });

  /* -------------------------------- */
  /* Phone Number                     */
  /* -------------------------------- */

  const phoneNumber =
    settingData?.primary_phone ||
    settingData?.phone ||
    settingData?.data?.primary_phone ||
    settingData?.data?.phone ||
    WHATSAPP_NUMBER;

  /* -------------------------------- */
  /* Active Nav                       */
  /* -------------------------------- */

  const checkActive = (item) =>
    isNavItemActive({
      item,
      pathname: location.pathname,
      projectMatch,
      blogMatch,
    });

  const activeIndex = navItems.findIndex(checkActive);

  /* -------------------------------- */
  /* Active Pill Animation            */
  /* -------------------------------- */

  useLayoutEffect(() => {
    const updateActivePill = () => {
      const activeEl = navItemRefs.current[activeIndex];

      const navWrapEl = navWrapRef.current;

      if (!activeEl || !navWrapEl) {
        setActivePill((prev) => ({
          ...prev,
          opacity: 0,
        }));

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
  }, [activeIndex, location.pathname, screenWidth, isScrolled, setActivePill]);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
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
        className="fixed inset-x-0 top-4 z-90 px-3 md:px-0"
      >
        <motion.div
          animate={{ width: navbarWidth }}
          transition={{
            duration: isDesktopScreen ? 0.45 : 0.2,
            ease: [0.23, 1, 0.32, 1],
          }}
          className="mx-auto max-w-362.5"
        >
          <div className="flex h-15 items-center justify-between rounded-full border border-gray-300/50 bg-white/20 px-3 backdrop-blur-md transition-all duration-500 dark:border-gray-400/80 dark:bg-slate-950/50 sm:h-16 sm:px-5 lg:h-[66px] lg:px-6">
            <NavbarLogo logo={currentLogo} alt="Eshrak Portfolio" />

            <DesktopNav
              navWrapRef={navWrapRef}
              navItemRefs={navItemRefs}
              activePill={activePill}
              isNavItemActive={checkActive}
            />

            <NavbarActions
              isDarkMode={isDarkMode}
              onThemeToggle={toggleTheme}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              phoneNumber={phoneNumber}
            />
          </div>
        </motion.div>
      </motion.nav>

      <MobileNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isNavItemActive={checkActive}
        onBookCall={() => setIsOpen(false)}
      />

      <ScrollToTopButton />
      <FloatingWhatsapp
        phoneNumber={phoneNumber}
        showScrollButton={showTopBtn}
      />
    </>
  );
};

export default Navbar;
