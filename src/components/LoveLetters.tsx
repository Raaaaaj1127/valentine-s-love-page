import { useState } from "react";
import { motion } from "framer-motion";

const loveLetters = [
  {
    title: "My Dearest Love 💌",
    content:
      "Every moment with you feels like a beautiful dream I never want to wake up from. You are the reason my heart beats with joy, and I am so grateful for every second we share together. You make my world brighter just by being in it.",
  },
  {
    title: "Forever Yours 🌹",
    content:
      "From the day I met you, I knew my life would never be the same. You brought colors into my world that I didn't know existed. I promise to love you, cherish you, and make you smile every single day. You are my forever.",
  },
  {
    title: "To My Heart 💕",
    content:
      "If I had a flower for every time you made me smile, I'd have an endless garden. You are my sunshine on cloudy days, my warmth in the cold, and my peace in the chaos. I love you more than words could ever express.",
  },
];

const LoveLetters = () => {
  const [letters, setLetters] = useState(loveLetters);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleEdit = (idx: number, field: "title" | "content", value: string) => {
    setLetters((prev) =>
      prev.map((l, i) => (i === idx ? { ...l, [field]: value } : l))
    );
  };

  return (
    <div>
      <h3 className="text-4xl font-romantic text-foreground text-center mb-2">
        Love Letters
      </h3>
      <p className="text-muted-foreground font-body text-center mb-8">
        💌
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {letters.map((letter, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="bg-card rounded-2xl p-6 shadow-romantic border border-border hover:shadow-glow transition-shadow cursor-pointer"
            onClick={() => setEditingIdx(editingIdx === idx ? null : idx)}
          >
            {editingIdx === idx ? (
              <div className="space-y-3" onClick={(e) => e.stopPropagation()}>
                <input
                  value={letter.title}
                  onChange={(e) => handleEdit(idx, "title", e.target.value)}
                  className="w-full bg-secondary/50 rounded-lg px-3 py-2 font-romantic text-xl text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <textarea
                  value={letter.content}
                  onChange={(e) => handleEdit(idx, "content", e.target.value)}
                  rows={6}
                  className="w-full bg-secondary/50 rounded-lg px-3 py-2 font-body text-sm text-foreground border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
                <button
                  onClick={() => setEditingIdx(null)}
                  className="text-sm bg-gradient-romantic text-primary-foreground px-4 py-1.5 rounded-full font-romantic"
                >
                  Done ✓
                </button>
              </div>
            ) : (
              <>
                <h4 className="text-2xl font-romantic text-foreground mb-3">
                  {letter.title}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed italic">
                  "{letter.content}"
                </p>
                
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoveLetters;
