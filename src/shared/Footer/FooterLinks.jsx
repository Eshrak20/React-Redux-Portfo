import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Blogs",
    path: "/blogs",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];

const FooterLinks = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <h3 className="text-xl font-bold text-foreground">
        Quick Links
      </h3>

      <nav className="mt-6 grid gap-4">
        {footerLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleClick}
            className="group flex w-fit items-center gap-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:translate-x-1 hover:text-primary"
          >
            <ChevronRight
              size={16}
              className="text-primary transition-transform duration-300 group-hover:translate-x-1"
            />

            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterLinks;