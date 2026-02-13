import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import { motion } from "framer-motion";
import bgMusic from "@/assets/Until_I_Found_You.mp3";

interface BgMusicContextType {
  pause: () => void;
  resume: () => void;
}

export const BgMusicContext = createContext<BgMusicContextType>({
  pause: () => {},
  resume: () => {},
});

export const useBgMusic = () => useContext(BgMusicContext);

const BackgroundMusic = ({ children }: { children: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && hasInteracted) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [hasInteracted]);

  const toggle = () => {
    if (isPlaying) pause();
    else play();
    setHasInteracted(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = bgMusic;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  return (
    <BgMusicContext.Provider value={{ pause, resume }}>
      <audio ref={audioRef} />

      {/* Floating music control */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-romantic p-4 max-w-[240px]"
          >
            <p className="text-sm font-romantic text-foreground mb-2">🎵 Tap to play music</p>
            <button
              onClick={toggle}
              className="w-full bg-gradient-romantic text-primary-foreground font-romantic text-sm px-4 py-2 rounded-full"
            >
              Play Music 🎶
            </button>
          </motion.div>
        )}

        {hasInteracted && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggle}
            className="w-14 h-14 rounded-full bg-gradient-romantic text-primary-foreground shadow-glow flex items-center justify-center text-2xl"
          >
            {isPlaying ? "🔊" : "🔇"}
          </motion.button>
        )}
      </div>

      {children}
    </BgMusicContext.Provider>
  );
};

export default BackgroundMusic;
