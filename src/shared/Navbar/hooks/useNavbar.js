import { useEffect, useState } from "react";

export default function useNavbar() {
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

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Resize Effect
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Theme Effect
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const shouldUseDark = savedTheme === "dark";

    setIsDarkMode(shouldUseDark);

    document.documentElement.classList.toggle(
      "dark",
      shouldUseDark,
    );
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;

      document.documentElement.classList.toggle(
        "dark",
        next,
      );

      localStorage.setItem(
        "theme",
        next ? "dark" : "light",
      );

      return next;
    });
  };

  return {
    isOpen,
    setIsOpen,

    isScrolled,
    screenWidth,

    isDarkMode,
    toggleTheme,

    activePill,
    setActivePill,
  };
}