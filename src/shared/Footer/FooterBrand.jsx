import logoLight from "@/assets/title/eg1.png";
import logoDark from "@/assets/title/eg2.png";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import RichContent from "@/components/RichContent/RichContent.jsx";

const FooterBrand = ({settings = {}, isLoading, socialLinks = []}) => {
  const lightLogo = settings.logo || logoLight;
  const darkLogo = settings.logo_dark || logoDark;

  const description =
    settings.seo_description ||
    "Congratulations—you've reached the end of the page! 😄 I'm passionate about building clean, scalable software, solving real-world problems, and continuously learning new technologies. Thanks for visiting my little corner of the internet.";

  const siteName = settings.site_name || "Eshrak";

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Logo */}
      <div>
        {isLoading ? (
          <div className="h-24 w-40 animate-pulse rounded-lg bg-muted sm:h-28 sm:w-44" />
        ) : (
          <>
            <img
              src={lightLogo}
              alt={`${siteName} Logo`}
              width="176"
              height="120"
              className="h-28 w-auto object-contain object-left dark:hidden sm:h-32"
            />

            <img
              src={darkLogo}
              alt={`${siteName} Logo`}
              width="176"
              height="120"
              className="hidden h-28 w-auto object-contain object-left dark:block sm:h-32"
            />
          </>
        )}
      </div>

      {/* Description */}
      <div className="max-w-md text-sm leading-7 text-muted-foreground">
        <RichContent content={description} />
      </div>

      {/* Social Icons */}
      <SocialIcons socialLinks={socialLinks} />
    </div>
  );
};

export default FooterBrand;