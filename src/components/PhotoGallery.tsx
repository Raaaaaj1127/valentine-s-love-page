import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import pic1 from "@/assets/pic1.jpeg";
import pic2 from "@/assets/pic2.jpeg";
import pic3 from "@/assets/pic3.jpeg";
import pic4 from "@/assets/pic4.jpeg";

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const photos = [pic1, pic2, pic3, pic4];

  const layouts = [
    { className: "col-span-2 row-span-2", rotate: -2, label: "🌹" },
    { className: "col-span-1 row-span-1", rotate: 3, label: "🌷" },
    { className: "col-span-1 row-span-1", rotate: -1, label: "🌻" },
    { className: "col-span-1 row-span-1", rotate: 2, label: "🌸" },
  ];

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">You, My Beautiful 💐</h3>
      <p className="text-muted-foreground font-body mb-8">
        Every picture of you takes my breath away 💕
      </p>

      <div className="grid grid-cols-3 grid-rows-2 gap-4 max-w-3xl mx-auto auto-rows-[200px] md:auto-rows-[260px]">
        {layouts.map((layout, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30, rotate: layout.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: layout.rotate }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
            className={`${layout.className} relative group rounded-2xl overflow-hidden shadow-romantic border-4 border-card bg-card cursor-pointer transition-shadow hover:shadow-glow`}
            onClick={() => setSelectedPhoto(photos[idx])}
            style={{ transform: `rotate(${layout.rotate}deg)` }}
          >
            <img src={photos[idx]} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            <span className="absolute top-1 left-2 text-lg opacity-60 pointer-events-none">
              {layout.label}
            </span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.8 }}
              src={selectedPhoto}
              alt="Full size"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-romantic object-contain border-4 border-card"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
