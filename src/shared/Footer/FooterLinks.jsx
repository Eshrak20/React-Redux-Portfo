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
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    path: "/terms-conditions",
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

      <nav aria-label="Footer navigation" className="mt-5 grid grid-cols-2 gap-x-3 gap-y-3 sm:mt-6 sm:grid-cols-1 sm:gap-4">
        {footerLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleClick}
            className="group flex min-h-10 items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            <ChevronRight
              size={16}
              className="shrink-0 text-primary"
            />

            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterLinks;