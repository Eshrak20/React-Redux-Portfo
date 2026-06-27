import React, { useState, useEffect } from "react";

const CommonMap = ({ google_map_embed, loading }) => {
  const [displayedTitle, setDisplayedTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const fullTitle = "Find ME";
  const typingSpeed = 80; // ms per character
  const cursorBlinkSpeed = 500; // ms

  // Typing effect
  useEffect(() => {
    if (currentIndex < fullTitle.length) {
      const timer = setTimeout(() => {
        setDisplayedTitle((prev) => prev + fullTitle[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // After typing completes, start blinking cursor
      const blinkTimer = setInterval(() => {
        setShowCursor((prev) => !prev);
      }, cursorBlinkSpeed);

      return () => clearInterval(blinkTimer);
    }
  }, [currentIndex]);

  // Reset effect when component mounts
  useEffect(() => {
    setDisplayedTitle("");
    setCurrentIndex(0);
    setShowCursor(true);
  }, []);

  return (
    <section
      className="relative w-full mb-20 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 pt-10 md:py-24"
      
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-white/10 to-white/5"
            style={{
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 20 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
      

          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-blue-100 via-teal-100 to-blue-100 bg-clip-text text-transparent">
                {displayedTitle}
              </span>
              <span
                className={`inline-block w-[2px] h-12 md:h-14 ml-2 bg-gradient-to-b from-teal-400 via-blue-400 to-teal-400 align-middle ${
                  showCursor ? "opacity-100" : "opacity-0"
                } transition-opacity duration-150`}
              ></span>
            </h2>
          </div>
        </div>

        {/* Map Container */}
        <div className="relative w-full">
          {/* Floating elements */}
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-teal-500/10 rounded-full blur-3xl -z-10"></div>

          {/* Map Frame */}
          <div className="relative bg-card md:rounded-2xl rounded-md overflow-hidden md:shadow-2xl shadow-blue-900/30 border border-border">
            {/* Frame top bar */}
            <div className="h-12 bg-card border-b border-border flex items-center px-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400"></div>
              </div>
              <div className="ml-6 text-sm text-muted-foreground font-medium tracking-wide">
                Location Interface
              </div>
            </div>

            {/* Map content */}
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-800 to-gray-900">
                  {/* Elegant loading spinner */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-border"></div>
                    <div className="absolute top-0 left-0 w-20 h-20 rounded-full border-4 border-t-transparent border-r-blue-400 border-b-teal-400 border-l-transparent animate-spin"></div>

                    {/* Inner ring */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-gray-600/30"></div>
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full border-2 border-t-transparent border-r-teal-400/50 border-b-blue-400/50 border-l-transparent animate-spin animation-delay-200"></div>

                    {/* Center dot */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 animate-pulse"></div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-foreground font-medium tracking-wider mb-2">
                      LOADING MAP DATA
                    </p>
                    <div className="w-64 h-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-gradient-to-r from-blue-400 via-teal-400 to-blue-400 animate-shimmer rounded-full"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Map container with overlay effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-teal-900/20 z-10 pointer-events-none"></div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gradient-to-r from-blue-400 to-teal-400 z-20"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gradient-to-r from-teal-400 to-blue-400 z-20"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gradient-to-r from-blue-400 to-teal-400 z-20"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gradient-to-r from-teal-400 to-blue-400 z-20"></div>

                  {/* Map iframe with enhanced styling */}
                  <iframe
                    src={google_map_embed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="relative z-0 filter saturate-110 contrast-110 brightness-105 hover:brightness-110 transition-all duration-500"
                    title="Google Maps Location"
                  />

                  {/* Mobile Control Button */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="relative group">
                      {/* Pulsing effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 to-teal-400/20 rounded-full animate-ping"></div>

                      {/* Button */}
                    
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Frame bottom bar */}
            <div className="h-10 bg-gradient-to-r from-gray-900 to-gray-800 border-t border-border flex items-center justify-between px-6 text-xs text-gray-500 font-mono">
              <div>MAP:ACTIVE</div>
              <div className="flex items-center gap-4">
                <span>ZOOM: 14x</span>
                <span className="w-px h-4 bg-gray-700"></span>
                <span>VIEW: SATELLITE</span>
                <span className="w-px h-4 bg-gray-700"></span>
                <span>GOOGLE MAPS</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-16 md:h-24"></div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(20px, -20px) rotate(90deg);
          }
          50% {
            transform: translate(0, -40px) rotate(180deg);
          }
          75% {
            transform: translate(-20px, -20px) rotate(270deg);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .border-gradient-to-r {
          border-image: linear-gradient(to right, #2dd4bf, #60a5fa) 1;
        }
      `}</style>
    </section>
  );
};

export default CommonMap;