import {useState} from "react";
import {
    Ellipsis,
    FolderOpen,
    Home,
    Newspaper,
    X,
} from "lucide-react";
import {NavLink} from "react-router-dom";
import {navItems} from "../data/navItems";
import BookCallButton from "./BookCallButton";

const primaryItems = [
    {path: "/", label: "Home", icon: Home},
    {path: "/projects", label: "Projects", icon: FolderOpen},
    {path: "/blogs", label: "Blogs", icon: Newspaper},
];

const MobileNav = ({isVisible, isNavItemActive, phoneNumber}) => {
    const [moreOpen, setMoreOpen] = useState(false);
    const moreItems = navItems.filter(
        (item) => !primaryItems.some((primary) => primary.path === item.path),
    );

    return (
        <>
            {moreOpen && (
                <button
                    type="button"
                    aria-label="Close more navigation"
                    onClick={() => setMoreOpen(false)}
                    className="fixed inset-0 z-[90] bg-slate-950/20 lg:hidden"
                />
            )}
            <nav
                aria-label="Mobile app navigation"
                className={`site-mobile-bar fixed inset-x-0 bottom-0 z-[100] px-3 pb-[env(safe-area-inset-bottom)] pt-2 transition-transform duration-200 ease-out motion-reduce:transition-none lg:hidden ${
                    isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-full opacity-0 pointer-events-none"
                }`}
            >
                {moreOpen && (
                    <div className="absolute inset-x-4 bottom-[calc(100%+0.75rem)] rounded-2xl border border-border bg-background p-2 shadow-xl">
                        {moreItems.map((item) => {
                            const Icon = item.icon;
                            const active = isNavItemActive(item);
                            return (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setMoreOpen(false)}
                                    aria-current={active ? "page" : undefined}
                                    className={`flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold ${
                                        active
                                            ? "bg-primary/10 text-primary"
                                            : "text-foreground hover:bg-muted"
                                    }`}
                                >
                                    <Icon aria-hidden="true" size={18} />
                                    {item.label}
                                </NavLink>
                            );
                        })}
                    </div>
                )}
                <div className="site-mobile-bar-inner mx-auto flex h-[4.25rem] max-w-lg items-center justify-around rounded-2xl border border-border/80 bg-background/95 px-1 shadow-[0_-8px_32px_rgb(15_23_42/0.12)] backdrop-blur-xl">
                    {primaryItems.slice(0, 2).map((item) => {
                        const Icon = item.icon;
                        const active = isNavItemActive(item);
                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                aria-current={active ? "page" : undefined}
                                className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
                                    active ? "text-primary" : "text-muted-foreground"
                                }`}
                            >
                                <Icon aria-hidden="true" size={19} />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                    <BookCallButton phoneNumber={phoneNumber} variant="mobile" />
                    <NavLink
                        to="/blogs"
                        aria-current={isNavItemActive(primaryItems[2]) ? "page" : undefined}
                        className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
                            isNavItemActive(primaryItems[2])
                                ? "text-primary"
                                : "text-muted-foreground"
                        }`}
                    >
                        <Newspaper aria-hidden="true" size={19} />
                        <span>Blogs</span>
                    </NavLink>
                    <button
                        type="button"
                        aria-expanded={moreOpen}
                        aria-label={moreOpen ? "Close more navigation" : "More navigation"}
                        onClick={() => setMoreOpen((open) => !open)}
                        className={`flex h-full min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
                            moreOpen || moreItems.some(isNavItemActive)
                                ? "text-primary"
                                : "text-muted-foreground"
                        }`}
                    >
                        {moreOpen ? (
                            <X aria-hidden="true" size={19} />
                        ) : (
                            <Ellipsis aria-hidden="true" size={19} />
                        )}
                        <span>More</span>
                    </button>
                </div>
            </nav>
        </>
    );
};

export default MobileNav;
