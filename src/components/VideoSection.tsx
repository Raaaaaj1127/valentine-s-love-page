import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBgMusic } from "@/components/BackgroundMusic";
import giftboxImg from "@/assets/giftbox.png";
import editVideo from "@/assets/edit1.mp4";

const VideoSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pause, resume } = useBgMusic();

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">A Little Surprise For You 🎁</h3>
      <p className="text-muted-foreground font-body mb-6">
        {!isOpen ? "Tap the gift to unwrap your surprise! 💝" : "Made this just for you 🎬💕"}
      </p>

      {!isOpen && (
        <motion.div
          className="cursor-pointer mx-auto w-fit"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="relative w-56 h-56 mx-auto">
            <img src={giftboxImg} alt="Gift box" className="w-full h-full object-contain drop-shadow-lg" />
            <motion.span className="absolute -top-4 -right-4 text-2xl" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 20, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>✨</motion.span>
            <motion.span className="absolute top-0 -left-5 text-xl" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, -15, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>💖</motion.span>
            <motion.span className="absolute -bottom-3 -right-5 text-xl" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}>✨</motion.span>
            <motion.span className="absolute bottom-4 -left-3 text-lg" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}>💕</motion.span>
          </div>
          <p className="font-romantic text-2xl text-primary mt-4 animate-pulse">Tap to open! 💝</p>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="max-w-sm mx-auto"
          >
            <div className="rounded-2xl overflow-hidden shadow-romantic border-4 border-primary/20 bg-card p-2">
              <div className="rounded-xl overflow-hidden">
                <video
                  src={editVideo}
                  controls
                  onPlay={pause}
                  onPause={resume}
                  onEnded={resume}
                  className="w-full aspect-[9/16] object-cover"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-body italic">
                🎵 Background music pauses automatically
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSection;
