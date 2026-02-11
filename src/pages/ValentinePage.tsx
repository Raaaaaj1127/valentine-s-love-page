import { motion } from "framer-motion";
import FloatingHearts from "@/components/FloatingHearts";
import PetalRain from "@/components/PetalRain";
import LoveLetters from "@/components/LoveLetters";
import TicTacToe from "@/components/TicTacToe";
import VideoSection from "@/components/VideoSection";
import PhotoGallery from "@/components/PhotoGallery";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const ValentinePage = () => {
  return (
    <div className="min-h-screen bg-gradient-blush relative overflow-hidden">
      <FloatingHearts />
      <PetalRain />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] text-center px-6 pt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-6xl block mb-6"
          >
            💖
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-romantic text-gradient-romantic mb-4">
            Happy Valentine's Day!
          </h1>
          <p className="text-lg md:text-xl font-body text-muted-foreground max-w-lg mx-auto">
            This whole page is made just for you, my love. Every pixel is filled with how much you mean to me. 💕
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex gap-3 text-3xl"
        >
          🌹🌷🌻🌸🌹🌷🌻🌸🌹
        </motion.div>
      </section>

      {/* Divider */}
      <div className="text-center text-2xl py-4 text-petal">~ ♥ ~</div>

      {/* Love Letters */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-12"
      >
        <LoveLetters />
      </motion.section>

      <div className="text-center text-2xl py-4 text-petal">~ 🌹 ~</div>

      {/* Tic Tac Toe */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-3xl mx-auto px-6 py-12"
      >
        <TicTacToe />
      </motion.section>

      <div className="text-center text-2xl py-4 text-petal">~ 💕 ~</div>

      {/* Video */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-4xl mx-auto px-6 py-12"
      >
        <VideoSection />
      </motion.section>

      <div className="text-center text-2xl py-4 text-petal">~ 🌷 ~</div>

      {/* Photos */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 max-w-5xl mx-auto px-6 py-12"
      >
        <PhotoGallery />
      </motion.section>

      {/* Footer */}
      <footer className="relative z-10 text-center py-16 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-3xl font-romantic text-foreground mb-2">
            I Love You, Forever & Always 💗
          </p>
          <p className="text-muted-foreground font-body text-sm">
            Made with all my love, just for you 🌹
          </p>
        </motion.div>
      </footer>
    </div>
  );
};

export default ValentinePage;
