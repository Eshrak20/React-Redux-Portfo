import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, Zap } from "lucide-react";

export const VideoCard = ({ videoId, title, onClick, duration = "2:30" }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.05,
        transition: { type: "spring", stiffness: 300 }
      }}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsMuted(false);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsMuted(true);
      }}
      onClick={onClick}
      className="relative md:rounded-2xl rounded-md overflow-hidden cursor-pointer bg-black aspect-video group md:shadow-2xl"
    >
      {/* Video Preview with Enhanced Controls */}
      <div className="relative w-full h-full">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${
            isMuted ? 1 : 0
          }&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
          className="w-full h-full pointer-events-none"
          allow="autoplay; encrypted-media"
          title={title}
        />
        
        {/* Animated Overlay */}
        <motion.div 
          animate={isHovered ? { opacity: 0 } : { opacity: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"
        />
      </div>

      {/* Enhanced Overlay with Info */}
      <div className="absolute inset-0 p-6 flex flex-col justify-between">
        {/* Top Controls */}
        <div className="flex justify-between items-start">
          <motion.div
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 text-white" />
            )}
            <span className="text-xs text-white font-medium">
              {isMuted ? 'Muted' : 'Sound On'}
            </span>
          </motion.div>
          
          <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
            <span className="text-xs text-white font-medium">{duration}</span>
          </div>
        </div>

        {/* Bottom Info */}
        <motion.div
          animate={isHovered ? { y: 0 } : { y: 20 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.6 }}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center shadow-lg"
            >
              <Play className="w-6 h-6 text-white ml-1" />
            </motion.div>
            
            <div>
              <motion.h3 
                animate={isHovered ? { x: 10 } : { x: 0 }}
                className="text-lg font-bold text-white"
              >
                {title}
              </motion.h3>
              <p className="text-sm text-white/80">Click to watch full video</p>
            </div>
          </div>
          
          {/* Hover Indicator */}
          <motion.div
            animate={isHovered ? { width: "100%" } : { width: "0%" }}
            className="h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full"
          />
        </motion.div>
      </div>

      {/* Glow Effect on Hover */}
      {isHovered && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 md:rounded-2xl rounded-md blur-xl"
        />
      )}
    </motion.div>
  );
};