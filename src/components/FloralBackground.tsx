import sunflower from "@/assets/sunflower.png";
import tulip from "@/assets/tulip.png";
import rose from "@/assets/rose.png";

const flowers = [
  { src: sunflower, top: "5%", left: "-3%", rotate: -15, size: "140px", opacity: 0.25 },
  { src: tulip, top: "20%", right: "-2%", rotate: 12, size: "120px", opacity: 0.22 },
  { src: rose, top: "45%", left: "-4%", rotate: -20, size: "130px", opacity: 0.2 },
  { src: sunflower, top: "65%", right: "-3%", rotate: 18, size: "150px", opacity: 0.23 },
  { src: tulip, top: "85%", left: "5%", rotate: -8, size: "110px", opacity: 0.2 },
  { src: rose, top: "10%", right: "8%", rotate: 25, size: "100px", opacity: 0.18 },
  { src: sunflower, bottom: "5%", right: "2%", rotate: -10, size: "130px", opacity: 0.22 },
  { src: tulip, top: "55%", left: "8%", rotate: 15, size: "100px", opacity: 0.18 },
];

const FloralBackground = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {flowers.map((f, i) => (
      <img
        key={i}
        src={f.src}
        alt=""
        className="absolute select-none"
        style={{
          top: f.top,
          left: (f as any).left,
          right: (f as any).right,
          bottom: (f as any).bottom,
          width: f.size,
          opacity: f.opacity,
          transform: `rotate(${f.rotate}deg)`,
          filter: "blur(1px)",
        }}
      />
    ))}
  </div>
);

export default FloralBackground;
