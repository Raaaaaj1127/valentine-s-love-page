import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBgMusic } from "@/components/BackgroundMusic";
import giftboxImg from "@/assets/giftbox.png";

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { pause, resume } = useBgMusic();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
    }
  };

  const hasVideo = videoFile || videoUrl;

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">A Little Surprise For You 🎁</h3>
      <p className="text-muted-foreground font-body mb-6">
        {hasVideo && !isOpen ? "Tap the gift to unwrap your surprise! 💝" : "Upload your special edit 🎬"}
      </p>

      {!hasVideo && (
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => fileInputRef.current?.click()}
            className="bg-card border-2 border-dashed border-border rounded-2xl p-12 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="text-5xl mb-4">🎥</div>
            <p className="font-romantic text-xl text-foreground">Click to upload her video</p>
            <p className="text-sm text-muted-foreground mt-2 font-body">MP4, WebM supported</p>
          </motion.div>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <div className="flex items-center gap-3 max-w-md mx-auto">
            <span className="text-muted-foreground text-sm">or paste URL:</span>
            <input
              type="text"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              className="flex-1 bg-card border border-border rounded-lg px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      )}

      {hasVideo && !isOpen && (
        <motion.div
          className="cursor-pointer mx-auto w-fit"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -8, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          {/* Gift box image */}
          <div className="relative w-56 h-56 mx-auto">
            <img src={giftboxImg} alt="Gift box" className="w-full h-full object-contain drop-shadow-lg" />
            {/* Sparkles */}
            <motion.span
              className="absolute -top-4 -right-4 text-2xl"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
            >✨</motion.span>
            <motion.span
              className="absolute top-0 -left-5 text-xl"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5], rotate: [0, -15, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >💖</motion.span>
            <motion.span
              className="absolute -bottom-3 -right-5 text-xl"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            >✨</motion.span>
            <motion.span
              className="absolute bottom-4 -left-3 text-lg"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.8 }}
            >💕</motion.span>
          </div>
          <p className="font-romantic text-2xl text-primary mt-4 animate-pulse">Tap to open! 💝</p>
        </motion.div>
      )}

      <AnimatePresence>
        {hasVideo && isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="max-w-sm mx-auto"
          >
            <div className="rounded-2xl overflow-hidden shadow-romantic border-4 border-primary/20 bg-card p-2">
              <div className="rounded-xl overflow-hidden">
                {videoFile ? (
                  <video
                    src={videoFile}
                    controls
                    onPlay={pause}
                    onPause={resume}
                    onEnded={resume}
                    className="w-full aspect-[9/16] object-cover"
                  />
                ) : (
                  <iframe
                    src={videoUrl.replace("watch?v=", "embed/")}
                    className="w-full aspect-[9/16]"
                    allowFullScreen
                    title="A special video for you"
                  />
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-body italic">
                🎵 Background music pauses automatically
              </p>
            </div>
            <button
              onClick={() => { setVideoFile(null); setVideoUrl(""); setIsOpen(false); }}
              className="mt-3 text-sm text-muted-foreground hover:text-foreground font-body transition-colors"
            >
              Change video
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoSection;
