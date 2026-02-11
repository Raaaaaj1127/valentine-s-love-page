import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<string[]>(Array(5).fill(""));
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingSlot !== null) {
      const url = URL.createObjectURL(file);
      setPhotos((prev) => prev.map((p, i) => (i === editingSlot ? url : p)));
      setEditingSlot(null);
    }
  }, [editingSlot]);

  const openFilePicker = (slot: number) => {
    setEditingSlot(slot);
    setTimeout(() => fileInputRef.current?.click(), 50);
  };

  // Decorative layout configs for each slot
  const layouts = [
    { className: "col-span-2 row-span-2", rotate: -2, label: "🌹" },
    { className: "col-span-1 row-span-1", rotate: 3, label: "🌷" },
    { className: "col-span-1 row-span-1", rotate: -1, label: "🌻" },
    { className: "col-span-1 row-span-1", rotate: 2, label: "🌸" },
    { className: "col-span-1 row-span-1", rotate: -3, label: "💐" },
  ];

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">Our Memories 📸</h3>
      <p className="text-muted-foreground font-body mb-8">
        Click each frame to add your favorite photos together 💕
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
            onClick={() => photos[idx] ? setSelectedPhoto(photos[idx]) : openFilePicker(idx)}
            style={{ transform: `rotate(${layout.rotate}deg)` }}
          >
            {photos[idx] ? (
              <>
                <img src={photos[idx]} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
                <button
                  onClick={(e) => { e.stopPropagation(); openFilePicker(idx); }}
                  className="absolute bottom-2 right-2 bg-card/80 backdrop-blur-sm text-xs px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity font-romantic text-foreground"
                >
                  Change 📷
                </button>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors">
                <span className="text-4xl mb-2">{layout.label}</span>
                <span className="font-romantic text-lg text-muted-foreground">Add Photo</span>
                <span className="text-xs text-muted-foreground/70 mt-1">Click here</span>
              </div>
            )}

            {/* Decorative corner flower */}
            <span className="absolute top-1 left-2 text-lg opacity-60 pointer-events-none">
              {layout.label}
            </span>
          </motion.div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />

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
