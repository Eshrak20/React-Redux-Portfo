import {
  default as bannerDarkImage,
  default as bannerImage,
} from "@/assets/title/bannerD.png";
import CumButton from "@/components/CumButton/CumButton";
import SocialIcons from "@/components/SocialIcons/SocialIcons";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const BannerHome = () => {
  return (
    <section className="relative w-full min-h-0 md:min-h-[calc(100vh-80px)] bg-background overflow-hidden mt-0 lg:mt-12 flex items-start md:items-center pt-40 pb-4 sm:pt-8 sm:pb-4 md:py-6 lg:pt-10 lg:pb-4">
      {/* --- BACKGROUND DESIGN: Circuit Lines --- */}
      <div className="absolute top-0 right-0 w-1/2 md:w-1/3 h-full pointer-events-none opacity-20 md:opacity-35">
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

      <div className="relative z-10 w-full px-5 sm:px-5 md:px-12 lg:px-8 xl:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_400px] lg:grid-cols-2 items-center gap-6 sm:gap-6 md:gap-6 lg:gap-10 xl:gap-12">
            {/* --- CONTENT SIDE --- */}
            <div className="order-1 flex flex-col text-left space-y-3 sm:space-y-4 md:space-y-5 lg:space-y-5 w-full min-w-0 max-w-2xl">
              <div className="space-y-2 md:space-y-3">
                <p className="text-muted-foreground font-mono text-xs sm:text-sm md:text-sm lg:text-base flex items-start gap-2 leading-relaxed">
                  <span className="text-primary font-bold shrink-0">//</span>
                  <span>I don’t sleep, I just await</span>
                </p>

                <h1 className="font-black tracking-tighter text-foreground uppercase leading-[0.9]">
                  <span className="block whitespace-nowrap text-[40px] sm:text-6xl md:text-[54px] lg:text-[60px] xl:text-[72px] 2xl:text-[82px]">
                    SOFTWARE
                  </span>

                  <span className="block whitespace-nowrap text-primary text-[40px] sm:text-6xl md:text-[54px] lg:text-[60px] xl:text-[72px] 2xl:text-[82px]">
                    DEVELOPER
                  </span>
                </h1>
              </div>

              <div className="max-w-xl md:max-w-md lg:max-w-xl">
                <p className="text-muted-foreground text-base sm:text-lg md:text-[17px] lg:text-lg xl:text-xl leading-relaxed">
                  <span className="text-primary font-semibold">
                    Glad you made it! 👋
                  </span>{" "}
                  Congratulations—you've officially found Eshrak's Digital
                  Notebook. What started as curiosity about how computers work
                  somehow turned into building web applications with{" "}
                  <span className="text-primary font-semibold">
                    MERN, Laravel, Filament, and Medusa.js
                  </span>
                </p>
              </div>

              {/* Typewriter Effect */}

              <div className="flex items-center gap-3">
                {/* <span className="hidden h-px w-10 bg-border sm:block" /> */}
                <SocialIcons
                  iconSize={18}
                  className="gap-2"
                  buttonClassName="h-10 w-10 rounded-full"
                />
              </div>
              <div className="pt-2 sm:pt-3 md:pt-4 lg:pt-5">
                <div className="text-primary font-mono text-base sm:text-lg md:text-[18px] lg:text-[18px] font-semibold border-l-2 border-primary/20 pl-4 sm:pl-6 min-h-9">
                  <Typewriter
                    options={{
                      strings: [
                        "Web Application",
                        "Mobile Application",
                        "IT Consultancy",
                        "Managed Services",
                      ],
                      autoStart: true,
                      loop: true,
                      wrapperClassName: "text-primary",
                      cursorClassName: "text-primary animate-pulse",
                    }}
                  />
                </div>
              </div>
              <div className="flex justify-start -mt-10">
                <CumButton path="/contact" title="Let's Talk" />
              </div>
            </div>

            {/* --- IMAGE SIDE --- */}
            <div className="hidden md:flex order-2 justify-center items-center min-w-0">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative md:w-100 lg:w-130 xl:w-145 2xl:w-160 max-w-full flex items-center justify-center"
              >
                <img
                  src={bannerImage}
                  alt="iLabs360 software development banner"
                  className="w-full h-auto rounded-lg object-contain select-none pointer-events-none block dark:hidden"
                  draggable="false"
                />
                <img
                  src={bannerDarkImage}
                  alt="iLabs360 software development banner"
                  className="w-full h-auto rounded-lg object-contain select-none pointer-events-none hidden dark:block"
                  draggable="false"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerHome;
