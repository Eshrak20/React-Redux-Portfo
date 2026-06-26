import { useState, useRef, useEffect } from "react";
import {
  X, Maximize2, Minimize2, Play, Pause, 
  SkipBack, SkipForward, ChevronLeft, ChevronRight,
  Volume2, VolumeX
} from "lucide-react";
import { motion } from "framer-motion";

export const VideoModal = ({ videoData, onNext, onPrev, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const playerRef = useRef(null); 
  const iframeRef = useRef(null);
  const playerApiRef = useRef(null);
  const isPlayerReady = useRef(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    isPlayerReady.current = false;
    setIsLoading(true);

    const initPlayer = () => {
      // If player exists, just change video
      if (playerApiRef.current && typeof playerApiRef.current.loadVideoById === 'function') {
        playerApiRef.current.loadVideoById(videoData.videoId);
        return;
      }

      // Initialize YouTube Player API
      playerApiRef.current = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event) => {
            isPlayerReady.current = true;
            setIsLoading(false);
            event.target.playVideo();
            // Start unmuted
            event.target.unMute();
            setDuration(event.target.getDuration());
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            if (event.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
            if (event.data === window.YT.PlayerState.ENDED) onNext();
          },
        },
      });
    };

    if (!window.YT || !window.YT.Player) {
      if (!document.getElementById('youtube-sdk')) {
        const tag = document.createElement("script");
        tag.id = 'youtube-sdk';
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
      window.onYouTubeIframeAPIReady = initPlayer;
    } else {
      initPlayer();
    }

    const interval = setInterval(() => {
      if (isPlayerReady.current && playerApiRef.current?.getCurrentTime) {
        setCurrentTime(playerApiRef.current.getCurrentTime());
      }
    }, 500);

    return () => clearInterval(interval);
  }, [videoData.videoId]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!isPlayerReady.current) return;
    const state = playerApiRef.current.getPlayerState();
    state === 1 ? playerApiRef.current.pauseVideo() : playerApiRef.current.playVideo();
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!isPlayerReady.current) return;
    if (isMuted) {
      playerApiRef.current.unMute();
      setIsMuted(false);
    } else {
      playerApiRef.current.mute();
      setIsMuted(true);
    }
  };

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      playerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <motion.div
      ref={playerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
    >
      <div className="absolute inset-0 z-0" onClick={onClose} />

      <div 
        className={`relative w-full aspect-video bg-black md:shadow-2xl z-10 group transition-all duration-300 ${
            isFullscreen ? "max-w-full h-screen" : "max-w-5xl mx-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Yellow Close Button - Always Visible */}
        <button 
          onClick={onClose} 
          className="absolute -top-12 right-0 p-2 bg-primary hover:bg-secondary rounded-full text-white transition-all z-50 shadow-lg"
        >
          <X size={24} strokeWidth={3} />
        </button>

        <div className="w-full h-full">
            <iframe
                ref={iframeRef}
                src={`https://www.youtube.com/embed/${videoData.videoId}?enablejsapi=1&autoplay=1&mute=1&rel=0&controls=0`}
                className="w-full h-full pointer-events-none"
                allow="autoplay; encrypted-media; fullscreen"
            />
        </div>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity bg-linear-to-t from-black/90 via-transparent to-black/60 p-4 md:p-6 z-30">
          
          <div className="flex justify-between items-start">
            <div className="text-white">
              <h3 className="text-lg md:text-xl font-bold">{videoData.title}</h3>
              <p className="text-gray-400 text-sm">Now Playing</p>
            </div>
            
            {/* Mute Toggle Button */}
            <button 
                onClick={toggleMute} 
                className="p-3 bg-white/10 hover:bg-primary hover:text-black rounded-full text-white transition-all backdrop-blur-sm"
            >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          </div>

          <div className="flex items-center justify-center gap-6 md:gap-12">
            <button onClick={onPrev} className="text-white hover:text-primary transition-colors">
              <SkipBack size={32} fill="currentColor" />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg"
            >
              {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
            </button>
            <button onClick={onNext} className="text-white hover:text-primary transition-colors">
              <SkipForward size={32} fill="currentColor" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 text-white">
              <span className="text-xs font-mono w-10">
                {Math.floor(currentTime/60)}:{(Math.floor(currentTime%60)).toString().padStart(2, '0')}
              </span>
              <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300" 
                  style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }} 
                />
              </div>
              <button onClick={toggleFullscreen} className="hover:text-primary transition-colors">
                {isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {!isFullscreen && (
        <>
          <button onClick={onPrev} className="absolute left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-all hidden lg:block z-50">
            <ChevronLeft size={64} />
          </button>
          <button onClick={onNext} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-primary transition-all hidden lg:block z-50">
            <ChevronRight size={64} />
          </button>
        </>
      )}
    </motion.div>
  );
};