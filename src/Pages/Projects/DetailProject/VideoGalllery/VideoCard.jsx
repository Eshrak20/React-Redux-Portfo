import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Maximize2 } from "lucide-react";

export const VideoCard = ({ videoId, title, duration = "2:30" }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout // Allows smooth expansion
      className={`relative bg-black group md:shadow-2xl overflow-hidden ${
        isExpanded 
          ? "fixed inset-0 z-[100] w-screen h-screen rounded-none" 
          : "md:rounded-2xl rounded-md aspect-video cursor-pointer"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className="relative w-full h-full">
        <iframe
          // If expanded, we show full controls; if not, we show a muted preview
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isExpanded ? 0 : 1}&controls=${isExpanded ? 1 : 0}&loop=1&playlist=${videoId}&modestbranding=1&playsinline=1`}
          className="w-full h-full"
          allow="autoplay; encrypted-media; fullscreen"
          allowFullScreen
          title={title}
        />
      </div>

      {/* Overlay only visible when NOT expanded */}
      {!isExpanded && (
        <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
              <span className="text-xs text-white font-medium">{duration}</span>
            </div>
          </div>

          <motion.div animate={isHovered ? { y: 0 } : { y: 20 }} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center shadow-lg">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
              <h3 className="text-lg font-bold text-white">{title}</h3>
            </div>
          </motion.div>
        </div>
      )}

      {/* Close button for when it's expanded */}
      {isExpanded && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
          }}
          className="absolute top-4 right-4 z-[101] p-2 bg-white/20 rounded-full hover:bg-white/40"
        >
          <Maximize2 className="text-white rotate-45" />
        </button>
      )}
    </motion.div>
  );
};