import {NavLink} from "react-router-dom";

const NavbarLogo = ({logo, alt = "Logo"}) => (
    <NavLink
        to="/"
        aria-label={alt}
        className="flex h-11 w-32 shrink-0 items-center sm:h-12 sm:w-36 lg:w-40"
    >
        <img
            src={logo}
            alt=""
            width="160"
            height="52"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-contain object-left"
        />
    </NavLink>
);

export default NavbarLogo;
