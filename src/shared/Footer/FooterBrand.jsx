import logoLight from "@/assets/title/eg1.png";
import logoDark from "@/assets/title/eg2.png";
import SocialIcons from "@/components/SocialIcons/SocialIcons";

const FooterBrand = () => {
  return (
    <div className="space-y-6">
      {/* Logo */}
      <div>
        <img
          src={logoLight}
          alt="iLabs360 Logo"
          className="h-44 -ml-9 w-auto dark:hidden"
        />

        <img
          src={logoDark}
          alt="iLabs360 Logo"
          className="hidden h-44 -ml-9 w-auto dark:block"
        />
      </div>

      {/* Description */}
      <p className="max-w-md text-sm leading-7 text-muted-foreground">
        Congratulations—you've reached the end of the page! 😄 I'm passionate
        about building clean, scalable software, solving real-world problems,
        and continuously learning new technologies. Thanks for visiting my
        little corner of the internet.
      </p>

      {/* Social Icons */}
      <SocialIcons />
    </div>
  );
};

export default FooterBrand;
