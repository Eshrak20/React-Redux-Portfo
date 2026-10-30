import {useEffect, useRef, useState} from "react";

export default function useNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const previousScrollY = useRef(0);
  const scrollDirection = useRef(null);
  const directionDistance = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const delta = scrollY - previousScrollY.current;
      setIsScrolled(scrollY > 50);
      setShowTopButton(scrollY > 300);

      if (scrollY < 60) {
        setIsNavbarVisible(true);
        scrollDirection.current = null;
        directionDistance.current = 0;
      } else if (delta !== 0) {
        const nextDirection = delta > 0 ? "down" : "up";

        if (nextDirection !== scrollDirection.current) {
          scrollDirection.current = nextDirection;
          directionDistance.current = 0;
        }

        directionDistance.current += Math.abs(delta);

        if (directionDistance.current >= 8) {
          setIsNavbarVisible(nextDirection === "up");
          directionDistance.current = 0;
        }
      }

      previousScrollY.current = scrollY;
    };

    previousScrollY.current = window.scrollY;
    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    isScrolled,
    showTopButton,
    isNavbarVisible,
    isDarkMode,
    toggleTheme,
  };
}