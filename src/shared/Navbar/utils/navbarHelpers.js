export const isNavItemActive = ({
  item,
  pathname,
  projectMatch,
  blogMatch,
}) => {
  return (
    pathname === item.path ||
    (item.path === "/projects" && projectMatch) ||
    (item.path === "/blogs" && blogMatch)
  );
};

export const getNavbarWidth = ({
  screenWidth,
  isDesktopScreen,
  isLargeMonitor,
  isScrolled,
}) => {
  if (!isDesktopScreen) {
    return screenWidth < 640 ? "calc(100vw - 24px)" : "94%";
  }

  if (isScrolled) {
    return isLargeMonitor ? "68%" : "78%";
  }

  return "85%";
};

export const getCurrentLogo = (isDarkMode, lightLogo, darkLogo) => {
  return isDarkMode ? darkLogo : lightLogo;
};