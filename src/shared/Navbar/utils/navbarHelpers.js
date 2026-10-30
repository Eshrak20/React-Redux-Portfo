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
