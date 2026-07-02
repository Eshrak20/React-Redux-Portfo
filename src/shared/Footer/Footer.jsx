import FooterBottom from "./FooterBottom";
import FooterBrand from "./FooterBrand";
import FooterContact from "./FooterContact";
import FooterLinks from "./FooterLinks";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr]">
          <FooterBrand />

          <FooterLinks />

          <FooterContact />
        </div>

        <div className="mt-14">
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
};

export default Footer;