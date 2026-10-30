import {Moon, Sun} from "lucide-react";

const ThemeToggle = ({isDarkMode, onClick, className = ""}) => {
    const Icon = isDarkMode ? Sun : Moon;
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={`Switch to ${isDarkMode ? "light" : "dark"} theme`}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:h-11 sm:w-11 ${className}`}
        >
            <Icon aria-hidden="true" size={18} />
        </button>
    );
};

export default ThemeToggle;
