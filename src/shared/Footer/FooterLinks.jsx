import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Projects", path: "/projects" },
  { label: "Blogs", path: "/blogs" },
  { label: "Contact", path: "/contact" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Terms & Conditions", path: "/terms-conditions" },
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
      <h3 className="text-2xl font-bold text-foreground sm:text-2xl lg:text-3xl">
        Quick Links
      </h3>

      <nav className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 lg:mt-8 lg:gap-6">
        {footerLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            onClick={handleClick}
            className="group flex w-fit items-center gap-3 text-base font-medium text-muted-foreground transition-all duration-300 hover:translate-x-1.5 hover:text-primary sm:text-lg lg:gap-4 lg:text-xl"
          >
            <ChevronRight
              size={20}
              className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
            />

            <span>{link.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default FooterLinks;