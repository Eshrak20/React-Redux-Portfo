import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-9 sm:gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr] lg:gap-12">
          <FooterBrand />

          <FooterLinks />

          <FooterContact />
        </div>

        <div className="mt-10 sm:mt-12">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;