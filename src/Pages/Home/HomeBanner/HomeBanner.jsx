
import bannerImage from "@/assets/title/bannerD.png";
import CumButton from "@/components/CumButton/CumButton";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const roles = [
  "Web Application",
  "Mobile Application",
  "IT Consultancy",
  "Managed Services",
];

const BannerHome = () => {
  return (
    <section className="relative w-full overflow-hidden bg-background mt-0 lg:mt-12">

      {/* Background circuit design */}
      <div className="absolute top-0 right-0 w-1/3 h-full pointer-events-none opacity-20 md:opacity-35">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path
            d="M400 300 H300 L250 350 H150"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
          />
          <path
            d="M400 500 H250 L200 450 H100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/60"
          />
          <circle cx="150" cy="350" r="4" className="fill-primary" />
        </svg>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="relative z-10 md:hidden">
        <MobileBanner />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="relative z-10 hidden md:flex min-h-[calc(100vh-80px)] items-center px-5 md:px-12 lg:px-8 xl:px-10 py-8">
        <DesktopBanner />
      </div>

    </section>
  );
};

/* ---------------- MOBILE BANNER ---------------- */

const MobileBanner = () => {
  return (
    <div className="flex flex-col px-5 pt-3 pb-8 sm:px-8 sm:pt-12">

      {/* Introduction */}
      <div className="space-y-2">
        <p className="flex mb-3 items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
          <span className="text-primary font-bold">//</span>
          I don't sleep, I just await
        </p>

        <h1 className="font-black uppercase tracking-tighter leading-[0.9] text-foreground">
          <span className="block text-[clamp(2.7rem,12vw,4.5rem)]">
            SOFTWARE
          </span>
          <span className="block text-primary text-[clamp(2.7rem,12vw,4.5rem)]">
            DEVELOPER
          </span>
        </h1>
      </div>

      {/* Description */}
      <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
        <span className="font-semibold text-primary">
          Glad you made it! 👋
        </span>{" "}
        Welcome to Eshrak's Digital Notebook. I enjoy building web
        applications with{" "}
        <span className="font-semibold text-primary">
          MERN, Laravel, Filament, and Medusa.js.
        </span>
      </p>

      {/* Typewriter */}
      <div className="mt-5 min-h-8 border-l-2 border-primary/30 pl-3 flex items-center">
        <div className="font-mono text-sm sm:text-base font-semibold text-primary">
          <Typewriter
            options={{
              strings: roles,
              autoStart: true,
              loop: true,
              delay: 45,
              deleteSpeed: 25,
              wrapperClassName: "text-primary",
              cursorClassName: "text-primary animate-pulse",
            }}
          />
        </div>
      </div>

      {/* Image */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full mt-5 mb-4 flex justify-center"
      >
        <img
          src={bannerImage}
          alt="Software development banner"
          draggable="false"
          className="w-full max-w-[460px] h-auto object-contain select-none pointer-events-none"
        />
      </motion.div>

      {/* Social + Contact */}
      <div className="flex flex-col items-start gap-5 mt-1">
        <SocialIcons
          iconSize={18}
          className="gap-2"
          buttonClassName="h-10 w-10 rounded-full"
        />

        <CumButton path="/contact" title="Let's Talk" />
      </div>

    </div>
  );
};

/* ---------------- DESKTOP BANNER ---------------- */

const DesktopBanner = () => {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="grid grid-cols-2 items-center gap-8 lg:gap-10 xl:gap-12">

        {/* Content */}
        <div className="flex min-w-0 max-w-2xl flex-col text-left space-y-5">

          <div className="space-y-3">
            <p className="flex items-start gap-2 font-mono text-sm lg:text-base text-muted-foreground">
              <span className="text-primary font-bold">//</span>
              I don't sleep, I just await
            </p>

            <h1 className="font-black tracking-tighter uppercase leading-[0.9] text-foreground">
              <span className="block whitespace-nowrap text-[54px] lg:text-[60px] xl:text-[72px] 2xl:text-[82px]">
                SOFTWARE
              </span>

              <span className="block whitespace-nowrap text-primary text-[54px] lg:text-[60px] xl:text-[72px] 2xl:text-[82px]">
                DEVELOPER
              </span>
            </h1>
          </div>

          <p className="max-w-xl text-muted-foreground text-[17px] lg:text-lg xl:text-xl leading-relaxed">
            <span className="font-semibold text-primary">
              Glad you made it! 👋
            </span>{" "}
            Congratulations—you've officially found Eshrak's Digital
            Notebook. What started as curiosity about how computers work
            somehow turned into building web applications with{" "}
            <span className="font-semibold text-primary">
              MERN, Laravel, Filament, and Medusa.js.
            </span>
          </p>

          <SocialIcons
            iconSize={18}
            className="gap-2"
            buttonClassName="h-10 w-10 rounded-full"
          />

          <div className="pt-2">
            <div className="min-h-9 border-l-2 border-primary/20 pl-4 font-mono text-lg font-semibold text-primary">
              <Typewriter
                options={{
                  strings: roles,
                  autoStart: true,
                  loop: true,
                  wrapperClassName: "text-primary",
                  cursorClassName: "text-primary animate-pulse",
                }}
              />
            </div>
          </div>

          <div className="pt-1">
            <CumButton path="/contact" title="Let's Talk" />
          </div>
        </div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex min-w-0 items-center justify-center"
        >
          <picture className="block w-full max-w-[650px]">
            <source
              srcSet={bannerImage}
              media="(prefers-color-scheme: light)"
            />
            <img
              src={bannerImage}
              alt="Software development banner"
              draggable="false"
              className="block h-auto w-full rounded-lg object-contain select-none pointer-events-none"
            />
          </picture>
        </motion.div>

      </div>
    </div>
  );
};

export default BannerHome;
