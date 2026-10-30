import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = ({
  data: settings = {},
  socialLinksData,
  isLoading = false,
  isError = false,
}) => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <FooterBrand settings={settings} isLoading={isLoading} socialLinks={socialLinksData?.data ?? []} />

          <FooterLinks />

          <FooterContact settings={settings} isLoading={isLoading} isError={isError} />
        </div>

        <div className="mt-10 sm:mt-14">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;