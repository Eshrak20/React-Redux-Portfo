import logoL from "@/assets/title/eg1.png";
import logoD from "@/assets/title/eg2.png";
import { WHATSAPP_NUMBER } from "@/data/emailGreating";
import { useLayoutEffect, useRef, useState } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { navItems } from "./data/navItems";
import useNavbar from "./hooks/useNavbar";
import DesktopNav from "./navComponents/DesktopNav";
import FloatingWhatsapp from "./navComponents/FloatingWhatsapp";
import MobileNav from "./navComponents/MobileNav";
import NavbarActions from "./navComponents/NavbarActions";
import NavbarLogo from "./navComponents/NavbarLogo";
import ScrollToTopButton from "./navComponents/ScrollToTopButton";
import "./styles/navbar.css";
import { isNavItemActive } from "./utils/navbarHelpers";

const Navbar = ({ settingData }) => {
  const {
    isScrolled,
    showTopButton,
    isNavbarVisible,
    isDarkMode,
    toggleTheme,
  } = useNavbar();

  const location = useLocation();
  const projectMatch = useMatch("/projects/*");
  const blogMatch = useMatch("/blogs/*");

  const navWrapRef = useRef(null);
  const navItemRefs = useRef([]);

  const [activePill, setActivePill] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const phoneNumber =
    settingData?.primary_phone ||
    settingData?.phone ||
    settingData?.data?.primary_phone ||
    settingData?.data?.phone ||
    WHATSAPP_NUMBER;

  const isActive = (item) =>
    isNavItemActive({
      item,
      pathname: location.pathname,
      projectMatch,
      blogMatch,
    });

  const activeIndex = navItems.findIndex(isActive);

  useLayoutEffect(() => {
    const updateActivePill = () => {
      const activeElement = navItemRefs.current[activeIndex];
      const navElement = navWrapRef.current;

      if (!activeElement || !navElement) {
        setActivePill((previous) => ({
          ...previous,
          opacity: 0,
        }));
        return;
      }

      setActivePill({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        opacity: 1,
      });
    };

    updateActivePill();

    const observer = new ResizeObserver(updateActivePill);

    if (navWrapRef.current) {
      observer.observe(navWrapRef.current);
    }

    navItemRefs.current.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeIndex, location.pathname]);

  return (
    <>
      {/* Desktop Navbar */}

      <header
        className={`
        site-navbar fixed inset-x-0 top-2 z-[90]
        hidden px-3 transition-all duration-300
        ease-out motion-reduce:transition-none
        md:flex sm:top-3 sm:px-4
        ${
          isNavbarVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-16 pointer-events-none opacity-0"
        }
    `}
      >
        <div
          className={`
            site-navbar-shell mx-auto
            flex h-[52px] w-full items-center
            justify-between gap-3
            transition-all duration-300
            sm:h-14 sm:px-5
            lg:w-[92%] lg:px-6
            xl:w-[86%] xl:px-7
            2xl:w-[73%]
            ${
              isScrolled
                ? `
                        backdrop-blur-xl
                    `
                : `
                        backdrop-blur-xl
                    `
            }
        `}
        >
          <NavbarLogo
            logo={isDarkMode ? logoD : logoL}
            alt="Eshrak Portfolio"
          />

          <DesktopNav
            navWrapRef={navWrapRef}
            navItemRefs={navItemRefs}
            activePill={activePill}
            isNavItemActive={isActive}
          />

          <NavbarActions
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            phoneNumber={phoneNumber}
          />
        </div>
      </header>

      <MobileNav
        isVisible={isNavbarVisible}
        isNavItemActive={isActive}
        phoneNumber={phoneNumber}
      />

      <ScrollToTopButton isVisible={showTopButton} />

      <FloatingWhatsapp phoneNumber={phoneNumber} />
    </>
  );
};

export default Navbar;
