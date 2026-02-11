import { useState, useRef, useEffect, useCallback, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [musicFile, setMusicFile] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const play = useCallback(() => {
    if (audioRef.current && musicFile) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [musicFile]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && musicFile && hasInteracted) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [musicFile, hasInteracted]);

  const toggle = () => {
    if (isPlaying) pause();
    else play();
    setHasInteracted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setMusicFile(url);
      setShowUpload(false);
    }
  };

  useEffect(() => {
    if (musicFile && audioRef.current) {
      audioRef.current.src = musicFile;
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
      play();
      setHasInteracted(true);
    }
  }, [musicFile, play]);

  return (
    <BgMusicContext.Provider value={{ pause, resume }}>
      <audio ref={audioRef} />

      {/* Floating music control */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showUpload && !musicFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-romantic p-4 max-w-[240px]"
          >
            <p className="text-sm font-romantic text-foreground mb-2">🎵 Add romantic music</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full bg-gradient-romantic text-primary-foreground font-romantic text-sm px-4 py-2 rounded-full"
            >
              Upload Music 🎶
            </button>
            <button
              onClick={() => setShowUpload(false)}
              className="text-xs text-muted-foreground mt-2 block mx-auto"
            >
              skip
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>
        )}

        {musicFile && (
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

        {!musicFile && !showUpload && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setShowUpload(true)}
            className="w-12 h-12 rounded-full bg-card border border-border shadow-soft flex items-center justify-center text-xl"
          >
            🎵
          </motion.button>
        )}
      </div>

      {children}
    </BgMusicContext.Provider>
  );
};

export default BackgroundMusic;
