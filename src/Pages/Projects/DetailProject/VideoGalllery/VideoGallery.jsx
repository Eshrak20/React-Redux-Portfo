import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Play, 
  Video, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  Volume2, 
  Maximize2,
  Clock,
  Eye
} from "lucide-react";
import { VideoModal } from "./VideoModal";

const VideoGallery = ({ videoId, title = "Project Walkthrough", duration = "3:45" }) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!videoId) return null;

  return (
    <section className="relative px-6 md:px-12 py-32 overflow-hidden bg-transparent">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/5 to-blue-500/5 dark:from-primary/10 dark:to-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-pink-500/5 dark:from-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 mb-6"
          >
            <Video className="w-5 h-5 text-primary" />
            <span className="text-primary font-bold tracking-[0.3em] text-sm uppercase">
              Video Showcase
            </span>
            <Sparkles className="w-4 h-4 text-yellow-500" />
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight mb-6">
            <span className="relative">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                Visual Experience
              </span>
              <motion.span 
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-r from-primary/20 via-blue-500/20 to-primary/20 blur-xl opacity-70"
              />
            </span>
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Watch the project come to life with our immersive walkthrough video
          </p>
        </motion.div>

        {/* Enhanced Video Thumbnail Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Glow Effect */}
          <motion.div 
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="absolute -inset-8 bg-gradient-to-r from-primary/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"
          />

          {/* Main Video Card */}
          <motion.div
            whileHover={{ 
              scale: 1.02,
              rotateX: 1,
              rotateY: 1
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => setOpen(true)}
            transition={{ 
              type: "spring", 
              stiffness: 300,
              damping: 25 
            }}
            className="relative cursor-pointer rounded-3xl overflow-hidden md:shadow-2xl border-2 border-white/20 dark:border-white/10 bg-gradient-to-br from-gray-900 to-black group"
          >
            {/* Video Thumbnail with Parallax Effect */}
            <motion.div 
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Project video"
                className="w-full h-[600px] object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Animated Gradient Overlay */}
              <motion.div 
                animate={{ 
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="absolute inset-0 bg-gradient-to-br from-transparent via-primary/10 to-transparent opacity-50"
              />
            </motion.div>

            {/* Enhanced Play Button */}
            <motion.div 
              animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="relative">
                {/* Outer Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                  className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-primary to-blue-500 blur-md"
                />
                
                {/* Middle Ring */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 w-28 h-28 rounded-full border-4 border-white/30"
                />
                
                {/* Main Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="relative w-24 h-24 rounded-full bg-gradient-to-r from-primary to-blue-500 flex items-center justify-center md:shadow-2xl"
                >
                  <Play className="w-10 h-10 text-white ml-2" />
                </motion.div>
              </div>
            </motion.div>

            {/* Video Info Overlay - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <motion.h3 
                    animate={isHovered ? { x: 10 } : { x: 0 }}
                    className="text-2xl md:text-3xl font-bold text-white"
                  >
                    {title}
                  </motion.h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">{duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <Eye className="w-4 h-4" />
                      <span className="text-sm font-medium">HD Quality</span>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <motion.div
                  animate={isHovered ? { x: -10 } : { x: 0 }}
                  className="hidden md:flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
                >
                  <span className="text-white font-semibold">Watch Now</span>
                  <ArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Volume2 className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Sound On</span>
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
              className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <Maximize2 className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">Full Screen</span>
            </motion.div>
          </motion.div>

          {/* Call to Action Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              Click the play button or anywhere on the video preview to start watching
            </p>
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
                boxShadow: ["0 0 0 0 rgba(59, 130, 246, 0)", "0 0 0 10px rgba(59, 130, 246, 0)", "0 0 0 0 rgba(59, 130, 246, 0)"]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 2
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-blue-500 text-white font-semibold cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              Click to Watch Full Experience
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Video Cards (Optional) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20"
        >
          {['Behind the Scenes', 'Technical Deep Dive', 'Client Testimonial'].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-6 md:rounded-2xl rounded-md bg-white/50 dark:bg-neutral-900/40 backdrop-blur-sm border border-gray-100 dark:border-neutral-800/60 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary/10 to-blue-500/10 dark:from-primary/20 dark:to-blue-500/20 flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-gray-800 dark:text-gray-200 mb-2">{item}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Coming Soon</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <VideoModal
            videoData={{ videoId }}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoGallery;