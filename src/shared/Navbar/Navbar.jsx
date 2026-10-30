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

const Navbar = ({settingData}) => {
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
        left: 10,
        width: 10,
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
            if (!activeElement || !navElement) return;
            const activeBounds = activeElement.getBoundingClientRect();
            const navBounds = navElement.getBoundingClientRect();
            setActivePill({
                left: activeBounds.left - navBounds.left,
                width: activeBounds.width,
                opacity: 1,
            });
        };
        updateActivePill();
        window.addEventListener("resize", updateActivePill);
        return () => window.removeEventListener("resize", updateActivePill);
    }, [activeIndex, location.pathname]);

    return (
        <>
            <header
                className={`site-navbar fixed inset-x-0 top-3 z-[90] px-3 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none sm:top-4 sm:px-5 lg:px-0 ${
                    isNavbarVisible
                        ? "translate-y-0 opacity-100"
                        : "-translate-y-[calc(10%+1rem)] opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className={`site-navbar-shell mx-auto flex h-14 w-full items-center justify-between rounded-2xl border px-3 shadow-sm transition-[width,background-color,box-shadow] duration-300 sm:h-16 sm:px-5 lg:h-[66px] lg:w-[90%] lg:rounded-full lg:px-6 xl:w-[85%] ${
                        isScrolled
                            ? "border-border/80 bg-background/95 shadow-md lg:w-[88%] xl:w-[78%] 2xl:w-[78%]"
                            : "border-gray-300/50 bg-white/80 dark:border-gray-400/80 dark:bg-slate-950/75"
                    }`}
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
