
import BookCallButton from "./BookCallButton";
import ThemeToggle from "./ThemeToggle";

const NavbarActions = ({
    isDarkMode,
    onThemeToggle,
    phoneNumber,
}) => {
    return (
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle
                isDarkMode={isDarkMode}
                onClick={onThemeToggle}
            />

            <BookCallButton phoneNumber={phoneNumber} />
        </div>
    );
};

export default NavbarActions;
