import { Link } from "react-router-dom";

const FooterBottom = () => {
  return (
    <div className="border-t border-border pt-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground md:flex-row md:text-left">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">
            Tashrif Hasan Jilan Eshrak
          </span>
          . All rights reserved.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-5">
          <Link
            to="/privacy-policy"
            className="transition-colors duration-300 hover:text-primary"
          >
            Privacy Policy
          </Link>

          <Link
            to="/terms-conditions"
            className="transition-colors duration-300 hover:text-primary"
          >
            Terms & Conditions
          </Link>

          <Link
            to="/contact"
            className="transition-colors duration-300 hover:text-primary"
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FooterBottom;