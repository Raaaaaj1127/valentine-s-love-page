import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import PetalRain from "@/components/PetalRain";
import FloralBackground from "@/components/FloralBackground";

const noMessages = [
  "Are you sure? 🥺 Look into my eyes...",
  "Please reconsider... my heart is breaking 💔",
  "I promise to love you forever! Try again? 🌹",
  "My world is incomplete without your YES 😢",
  "You're my everything... please say yes 💕",
  "I'll keep asking until you say yes! 💗",
  "The stars aligned for us... say yes! ✨",
  "Pretty please with a cherry on top? 🍒💝",
];

const ProposalPage = () => {
  const navigate = useNavigate();
  const [noCount, setNoCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [yesSize, setYesSize] = useState(1);

  const handleNo = () => {
    setShowMessage(true);
    setNoCount((prev) => prev + 1);
    setYesSize((prev) => prev + 0.2);
  };

  const handleYes = () => {
    navigate("/valentine");
  };

  return (
    <div className="min-h-screen bg-gradient-blush flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />
      <PetalRain />
      <FloralBackground />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-lg"
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl mb-8"
        >
          💝
        </motion.div>

        <h1 className="text-5xl md:text-7xl font-romantic text-foreground mb-4 leading-tight">
          Will You Be My
        </h1>
        <h2 className="text-6xl md:text-8xl font-romantic text-gradient-romantic mb-10">
          Valentine?
        </h2>

        <AnimatePresence mode="wait">
          {showMessage && (
            <motion.p
              key={noCount}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-lg font-body text-foreground mb-8 bg-card/80 backdrop-blur-sm p-4 rounded-xl shadow-romantic"
            >
              {noMessages[(noCount - 1) % noMessages.length]}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-6 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{ transform: `scale(${yesSize})` }}
            onClick={handleYes}
            className="bg-gradient-romantic text-primary-foreground font-romantic text-2xl px-10 py-4 rounded-full shadow-glow hover:shadow-romantic transition-all duration-300"
          >
            Yes! 💕
          </motion.button>

          <motion.button
            whileHover={{ x: Math.random() > 0.5 ? 50 : -50 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNo}
            className="bg-secondary text-secondary-foreground font-romantic text-lg px-8 py-3 rounded-full shadow-soft transition-all duration-300 hover:bg-muted"
          >
            No 😢
          </motion.button>
        </div>

        {noCount >= 3 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-sm text-muted-foreground font-body italic"
          >
            Hint: The Yes button is growing... it's a sign! ✨
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default ProposalPage;
