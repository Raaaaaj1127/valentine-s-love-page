import { useState, useRef } from "react";
import { motion } from "framer-motion";

const VideoSection = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFile(url);
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-4xl font-romantic text-foreground mb-2">Our Special Video</h3>
      <p className="text-muted-foreground font-body mb-6">
        Upload your special video or paste a URL 🎬
      </p>

      {!videoFile && !videoUrl && (
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => fileInputRef.current?.click()}
            className="bg-card border-2 border-dashed border-border rounded-2xl p-12 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <div className="text-5xl mb-4">🎥</div>
            <p className="font-romantic text-xl text-foreground">Click to upload your video</p>
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

      {(videoFile || videoUrl) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden shadow-romantic border border-border">
            {videoFile ? (
              <video
                src={videoFile}
                controls
                className="w-full aspect-video object-cover"
              />
            ) : (
              <iframe
                src={videoUrl.replace("watch?v=", "embed/")}
                className="w-full aspect-video"
                allowFullScreen
                title="Our special video"
              />
            )}
          </div>
          <button
            onClick={() => { setVideoFile(null); setVideoUrl(""); }}
            className="mt-4 text-sm text-muted-foreground hover:text-foreground font-body transition-colors"
          >
            Change video
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default VideoSection;
