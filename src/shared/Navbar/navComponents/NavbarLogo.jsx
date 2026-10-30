
import { NavLink } from "react-router-dom";

const NavbarLogo = ({ logo, alt = "Logo" }) => (
    <NavLink
        to="/"
        aria-label={alt}
        className="
            flex h-12 w-44 shrink-0 items-center
            sm:h-[52px] sm:w-48
            lg:w-[210px]
        "
    >
        <img
            src={logo}
            alt=""
            width="210"
            height="65"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-contain object-left"
        />
    </NavLink>
);

export default NavbarLogo;
