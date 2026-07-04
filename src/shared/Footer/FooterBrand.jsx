import logoLight from "@/assets/title/eg1.png";
import logoDark from "@/assets/title/eg2.png";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { useGetSettingsDataQuery } from "@/redux/api/homeApi";

const FooterBrand = () => {
  const { data, isLoading } = useGetSettingsDataQuery();

  // API returns an array
  const settings = data?.data?.[0] ?? {};

  const lightLogo = settings.logo || logoLight;
  const darkLogo = settings.logo_dark || logoDark;

  const description =
    settings.seo_description ||
    "Congratulations—you've reached the end of the page! 😄 I'm passionate about building clean, scalable software, solving real-world problems, and continuously learning new technologies. Thanks for visiting my little corner of the internet.";

  const siteName = settings.site_name || "Eshrak";

  return (
    <div className="space-y-6">
      {/* Logo */}
      <div>
        {isLoading ? (
          <div className="h-32 w-48 animate-pulse rounded-lg bg-muted" />
        ) : (
          <>
            <img
              src={lightLogo}
              alt={`${siteName} Logo`}
              className="h-44 w-auto -ml-9 dark:hidden"
            />

            <img
              src={darkLogo}
              alt={`${siteName} Logo`}
              className="hidden h-44 w-auto -ml-9 dark:block"
            />
          </>
        )}
      </div>

      {/* Description */}
      <p className="max-w-md text-sm leading-7 text-muted-foreground">
        {description}
      </p>

      {/* Social Icons */}
      <SocialIcons />
    </div>
  );
};

export default FooterBrand;