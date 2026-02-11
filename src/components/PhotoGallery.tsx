import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PhotoGallery = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newPhotos = Array.from(files).map((f) => URL.createObjectURL(f));
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">Our Memories 📸</h3>
      <p className="text-muted-foreground font-body mb-6">
        Add your favorite photos together 💕
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group aspect-square rounded-2xl overflow-hidden shadow-soft border border-border cursor-pointer"
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo} alt={`Memory ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors" />
            <button
              onClick={(e) => { e.stopPropagation(); removePhoto(idx); }}
              className="absolute top-2 right-2 w-7 h-7 bg-card/80 backdrop-blur-sm rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-foreground"
            >
              ✕
            </button>
          </motion.div>
        ))}

        <motion.div
          whileHover={{ scale: 1.03 }}
          onClick={() => fileInputRef.current?.click()}
          className="aspect-square bg-card border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <span className="text-3xl mb-2">📷</span>
          <span className="text-sm font-romantic text-muted-foreground">Add Photos</span>
        </motion.div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
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
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={selectedPhoto}
              alt="Full size"
              className="max-w-full max-h-[85vh] rounded-2xl shadow-romantic object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
