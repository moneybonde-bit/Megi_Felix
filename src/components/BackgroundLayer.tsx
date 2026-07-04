import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';
import { BlueRose, Blossom, BabyBreath, Petal } from './florals/Flowers';
import { CornerCluster, EdgeCluster } from './florals/Clusters';

/**
 * Rich blue floral background inspired by luxury silk wedding invitations:
 * flowing silk drapes, dense rose borders cascading down both edges,
 * blurred depth blooms behind, crisp blooms in front, and a soft central
 * clearing that keeps the content readable.
 */

const PETAL_TONES = ['#9fc3e6', '#7fb0dd', '#c4dcf2', '#5f94c8'];

// Deterministic scatter of small filler blossoms across the mid-field.
const SCATTER = [
  { left: '18%', top: '12%', w: 34, rot: 25, op: 0.3, blur: false },
  { left: '30%', top: '24%', w: 22, rot: -40, op: 0.22, blur: true },
  { left: '68%', top: '9%', w: 40, rot: 60, op: 0.32, blur: false },
  { left: '78%', top: '30%', w: 24, rot: 15, op: 0.2, blur: true },
  { left: '24%', top: '44%', w: 28, rot: 100, op: 0.24, blur: true },
  { left: '72%', top: '48%', w: 34, rot: -70, op: 0.28, blur: false },
  { left: '15%', top: '62%', w: 38, rot: 45, op: 0.3, blur: false },
  { left: '82%', top: '64%', w: 26, rot: 130, op: 0.22, blur: true },
  { left: '34%', top: '76%', w: 24, rot: -25, op: 0.24, blur: true },
  { left: '64%', top: '80%', w: 36, rot: 80, op: 0.3, blur: false },
  { left: '46%', top: '15%', w: 18, rot: 55, op: 0.16, blur: true },
  { left: '52%', top: '88%', w: 30, rot: -50, op: 0.26, blur: false },
  { left: '8%', top: '34%', w: 30, rot: 10, op: 0.3, blur: false },
  { left: '90%', top: '44%', w: 28, rot: -95, op: 0.26, blur: false },
];

function SilkDrapes() {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter id="silk-soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <g filter="url(#silk-soften)" fill="none" strokeLinecap="round">
        <path d="M-80,80 C 220,180 120,420 340,560 C 520,680 420,880 640,1020" stroke="#b5d2ec" strokeWidth="90" opacity="0.55" />
        <path d="M60,-60 C 320,120 180,360 420,480 C 640,590 560,840 800,980" stroke="#e2eefa" strokeWidth="70" opacity="0.7" />
        <path d="M1080,120 C 820,240 900,460 700,600 C 520,720 620,900 420,1060" stroke="#a7c8e6" strokeWidth="95" opacity="0.5" />
        <path d="M980,-40 C 760,140 860,380 660,520 C 480,650 560,860 360,1000" stroke="#dcebf8" strokeWidth="60" opacity="0.65" />
        <path d="M-40,520 C 240,600 200,760 480,860 C 700,940 680,1040 900,1100" stroke="#c3daf0" strokeWidth="80" opacity="0.5" />
        <path d="M500,-80 C 460,160 560,300 500,520 C 440,740 560,880 520,1080" stroke="#edf5fc" strokeWidth="55" opacity="0.55" />
      </g>
    </svg>
  );
}

export function BackgroundLayer() {
  const { scrollYProgress } = useScroll();
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Parallax speeds: depth blooms drift slowest, foreground blooms fastest.
  const yDepth = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yEdges = useTransform(scrollYProgress, [0, 1], [0, -160]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotFront = useTransform(scrollYProgress, [0, 1], [0, 18]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#cfe2f4] via-[#ddebf8] to-[#c2d8ee]">
      {/* Silk fabric drapes */}
      <SilkDrapes />

      {/* ---- Depth layer: oversized blurred blooms behind everything ---- */}
      <motion.div style={{ y: yDepth }} className="absolute inset-0">
        <BlueRose variant="powder" className="absolute -left-[14vw] top-[6vh] w-[44vw] max-w-[520px] blur-md opacity-35 rotate-12" />
        <BlueRose variant="sky" className="absolute -right-[16vw] top-[34vh] w-[48vw] max-w-[560px] blur-lg opacity-30 -rotate-45" />
        <BlueRose variant="powder" className="absolute -left-[10vw] top-[64vh] w-[40vw] max-w-[480px] blur-md opacity-30 rotate-[130deg]" />
        <BlueRose variant="sky" className="absolute right-[8vw] -top-[8vh] w-[30vw] max-w-[360px] blur-lg opacity-25 rotate-[60deg]" />
        <BlueRose variant="powder" className="absolute right-[20vw] top-[78vh] w-[34vw] max-w-[400px] blur-lg opacity-25 -rotate-[20deg]" />
      </motion.div>

      {/* ---- Border layer: dense cascading clusters down both edges ---- */}
      <motion.div style={{ y: yEdges }} className="absolute inset-0">
        {/* Corners */}
        <CornerCluster className="absolute -top-[6vh] -left-[8vw] w-[52vw] max-w-[460px] min-w-[170px]" />
        <CornerCluster className="absolute -top-[8vh] -right-[10vw] w-[48vw] max-w-[430px] min-w-[160px] -scale-x-100 rotate-6" />

        {/* Left edge cascade */}
        <EdgeCluster className="absolute top-[24vh] -left-[10vw] w-[30vw] max-w-[300px] min-w-[105px] rotate-3" />
        <EdgeCluster className="absolute top-[62vh] -left-[8vw] w-[27vw] max-w-[270px] min-w-[100px] -rotate-6 -scale-y-100" />
        <EdgeCluster className="absolute top-[100vh] -left-[10vw] w-[30vw] max-w-[300px] min-w-[105px] rotate-2" />

        {/* Right edge cascade */}
        <EdgeCluster className="absolute top-[36vh] -right-[10vw] w-[30vw] max-w-[300px] min-w-[105px] -scale-x-100 -rotate-3" />
        <EdgeCluster className="absolute top-[76vh] -right-[8vw] w-[27vw] max-w-[270px] min-w-[100px] -scale-x-100 rotate-6 -scale-y-100" />

        {/* Bottom corners (visible near end of viewport height) */}
        <CornerCluster className="absolute -bottom-[10vh] -left-[9vw] w-[46vw] max-w-[420px] min-w-[160px] -scale-y-100 -rotate-3" />
        <CornerCluster className="absolute -bottom-[12vh] -right-[10vw] w-[50vw] max-w-[450px] min-w-[165px] -scale-100 rotate-2" />
      </motion.div>

      {/* ---- Mid-field scatter: small blossoms + baby's breath ---- */}
      <div className="absolute inset-0">
        {SCATTER.map((s, i) => (
          <Blossom
            key={i}
            tone={i % 3 === 0 ? '#b3cfe9' : '#cfe2f4'}
            className={`absolute ${s.blur ? 'blur-[2px]' : ''}`}
            style={{ left: s.left, top: s.top, width: s.w, opacity: s.op, transform: `rotate(${s.rot}deg)` }}
          />
        ))}
        <BabyBreath className="absolute left-[40%] top-[6%] w-16 opacity-25 rotate-45" />
        <BabyBreath className="absolute left-[58%] top-[38%] w-14 opacity-20 -rotate-[30deg] blur-[1px]" />
        <BabyBreath className="absolute left-[28%] top-[58%] w-16 opacity-25 rotate-[100deg]" />
        <BabyBreath className="absolute left-[70%] top-[70%] w-14 opacity-20 rotate-[10deg] blur-[1px]" />
      </div>

      {/* ---- Foreground layer: crisp partially-cropped blooms, fast parallax ---- */}
      <motion.div style={{ y: yFront }} className="absolute inset-0">
        <motion.div style={{ rotate: rotFront }} className="absolute -left-[7vw] top-[46vh] w-[24vw] max-w-[230px] min-w-[90px]">
          <BlueRose variant="navy" className="w-full drop-shadow-lg" />
        </motion.div>
        <motion.div style={{ rotate: rotFront }} className="absolute -right-[6vw] top-[16vh] w-[22vw] max-w-[210px] min-w-[85px]">
          <BlueRose variant="royal" className="w-full drop-shadow-lg -rotate-[70deg]" />
        </motion.div>
        <motion.div style={{ rotate: rotFront }} className="absolute -right-[7vw] top-[88vh] w-[24vw] max-w-[230px] min-w-[90px]">
          <BlueRose variant="navy" className="w-full drop-shadow-lg rotate-[40deg]" />
        </motion.div>
        <motion.div style={{ rotate: rotFront }} className="absolute -left-[5vw] top-[112vh] w-[20vw] max-w-[190px] min-w-[80px]">
          <BlueRose variant="royal" className="w-full drop-shadow-lg rotate-[160deg]" />
        </motion.div>
      </motion.div>

      {/* ---- Readability scrim: soft clearing behind the content column ---- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_60%_at_center,rgba(235,244,252,0.72)_0%,rgba(235,244,252,0.38)_55%,transparent_82%)]" />
      {/* Extra scrim on small screens where the floral borders sit closer to the text */}
      <div className="absolute inset-0 md:hidden bg-[radial-gradient(ellipse_75%_65%_at_center,rgba(235,244,252,0.7)_0%,rgba(235,244,252,0.3)_60%,transparent_85%)]" />

      {/* ---- Falling blue petals ---- */}
      {[...Array(24)].map((_, i) => {
        const size = 12 + ((i * 53) % 14);
        const duration = 16 + ((i * 37) % 22);
        const delay = -((i * 29) % 34);
        const tone = PETAL_TONES[i % PETAL_TONES.length];
        const startX = ((i * 173) % 100) / 100;
        const drift = Math.sin(i) * 120;

        return (
          <motion.div
            key={`petal-${i}`}
            initial={{ y: -60, x: startX * windowDimensions.width, opacity: 0, rotate: 0 }}
            animate={{
              y: windowDimensions.height + 60,
              x: startX * windowDimensions.width + drift,
              opacity: [0, 0.75, 0.75, 0],
              rotate: 360 * (i % 2 === 0 ? 1 : -1),
            }}
            transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
            className="absolute"
            style={{ width: size, filter: i % 4 === 0 ? 'blur(2px)' : undefined }}
          >
            <Petal tone={tone} className="w-full" />
          </motion.div>
        );
      })}
    </div>
  );
}
