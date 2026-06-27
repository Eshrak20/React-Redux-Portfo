import React from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bannerImage from "@/assets/title/banner4.png";
import bannerDarkImage from "@/assets/title/bannerD.png";
import CumButton from "@/components/CumButton/CumButton";

const BannerHome = () => {
  return (
    <section className="relative w-full min-h-0 md:min-h-[calc(100vh-80px)] bg-background overflow-hidden mt-0 lg:mt-12 flex items-start md:items-center pt-40 pb-4 sm:pt-8 sm:pb-4 md:py-6 lg:pt-10 lg:pb-4">
      {/* --- BACKGROUND DESIGN: Circuit Lines --- */}
      <div className="absolute top-0 left-0 w-1/2 md:w-1/3 h-full pointer-events-none opacity-20 md:opacity-35">
        <svg viewBox="0 0 400 800" className="w-full h-full">
          <path
            d="M0 200 H100 L150 250 H250"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/40"
          />
          <path
            d="M0 400 H150 L200 350 H300"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-primary/60"
          />
          <circle cx="250" cy="250" r="4" className="fill-primary" />
          <circle cx="300" cy="350" r="3" className="fill-primary/50" />
        </svg>
      </div>

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
                    Welcome to my portfolio.
                  </span>{" "}
                  Curiosity is what brought me into software development. Today,
                  I build modern web applications with{" "}
                  <span className="text-primary font-semibold">
                    MERN, Laravel, Filament, and Medusa.js
                  </span>
                  , focusing on creating products that are scalable, practical,
                  and solve real-life problems.
                </p>
              </div>

              {/* Typewriter Effect */}
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

              {/* Let's Talk Button */}
              <div className="-ml-102.5">
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
                  className="w-full h-auto rounded-lg object-contain select-none border border-gray-200 shadow-sm pointer-events-none block dark:hidden"
                  draggable="false"
                />
                <img
                  src={bannerDarkImage}
                  alt="iLabs360 software development banner"
                  className="w-full h-auto rounded-lg object-contain select-none border border-gray-200 shadow-sm pointer-events-none hidden dark:block"
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
