import { NavLink } from "react-router-dom";

const NavbarLogo = ({ logo, alt = "Logo" }) => (
    <NavLink
        to="/"
        aria-label={alt}
        className="
            flex h-16 w-56 shrink-0 items-center
            sm:h-[72px] sm:w-64
            lg:h-24 lg:w-[150px] mt-8
        "
    >
        <img
            src={logo}
            alt=""
            width="280"
            height="86"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-contain object-left"
        />
    </NavLink>
);

export default NavbarLogo;