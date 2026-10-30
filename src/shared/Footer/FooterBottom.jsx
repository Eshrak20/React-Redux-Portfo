
import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="border-t border-border pt-4 sm:pt-5">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs leading-relaxed text-muted-foreground md:flex-row md:text-left">

        {/* Copyright */}
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">
            Tashrif Hasan Jilan Eshrak
          </span>
          . All rights reserved.
        </p>

        {/* Footer Links */}
        <nav
          aria-label="Footer navigation "
          className=" hidden md:flex flex-wrap items-center justify-center gap-x-4 gap-y-2 md:justify-end"
        >
          <Link
            to="/privacy-policy"
            className="transition-colors duration-200 hover:text-primary"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms-conditions"
            className="transition-colors duration-200 hover:text-primary"
          >
            Terms & Conditions
          </Link>

          <Link
            to="/contact"
            className="transition-colors duration-200 hover:text-primary"
          >
            Contact
          </Link>
        </nav>

      </div>
    </div>
  );
};

export default FooterBottom;
