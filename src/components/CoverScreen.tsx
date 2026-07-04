import { motion, AnimatePresence } from 'motion/react';
import { BlueRose, Blossom, BabyBreath, LeafSpray, Bud } from './florals/Flowers';
import { CornerCluster } from './florals/Clusters';

interface CoverScreenProps {
  onOpen: () => void;
  isOpened: boolean;
}

/**
 * Opening screen styled after a navy luxury invitation card:
 * deep navy ground, lush blue-rose arrangements spilling around a thin
 * rectangular frame that holds the names.
 */
export function CoverScreen({ onOpen, isOpened }: CoverScreenProps) {
  const LEAF_TONE = '#7d93a8'; // lighter silver-blue foliage for the dark ground

  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0d1b33]"
          exit={{
            opacity: 0,
            scale: 1.1,
            y: '-100vh',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Soft vignette so the center glows slightly */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_center,#16294a_0%,#0d1b33_70%)]" />

          {/* ---- Floral arrangements framing the card ---- */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Top garland spilling from above */}
            <CornerCluster leafTone={LEAF_TONE} className="absolute -top-[10vh] -left-[10vw] w-[58vw] max-w-[440px] min-w-[250px]" />
            <CornerCluster leafTone={LEAF_TONE} className="absolute -top-[12vh] -right-[12vw] w-[54vw] max-w-[410px] min-w-[230px] -scale-x-100 rotate-6" />

            {/* Bottom arrangements */}
            <CornerCluster leafTone={LEAF_TONE} className="absolute -bottom-[12vh] -left-[12vw] w-[56vw] max-w-[430px] min-w-[240px] -scale-y-100" />
            <CornerCluster leafTone={LEAF_TONE} className="absolute -bottom-[10vh] -right-[10vw] w-[58vw] max-w-[450px] min-w-[250px] -scale-x-100 -scale-y-100 -rotate-3" />

            {/* Side accents */}
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-[-6vw] top-[38%] w-[26vw] max-w-[190px] min-w-[110px]"
            >
              <BlueRose variant="royal" className="w-full drop-shadow-lg rotate-[70deg]" />
              <Bud variant="sky" className="absolute -right-[16%] top-[10%] w-[34%] rotate-[40deg]" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 14, 0], rotate: [0, -4, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute right-[-6vw] top-[50%] w-[24vw] max-w-[180px] min-w-[100px]"
            >
              <BlueRose variant="sky" className="w-full drop-shadow-lg -rotate-[35deg]" />
              <LeafSpray tone={LEAF_TONE} className="absolute -left-[30%] -top-[24%] w-[60%] -rotate-[120deg]" />
            </motion.div>

            {/* Scattered filler blossoms + baby's breath over the navy field */}
            <Blossom tone="#c9def2" className="absolute left-[30%] top-[8%] w-8 opacity-70 rotate-[25deg]" />
            <Blossom tone="#a8c8e8" className="absolute left-[64%] top-[14%] w-6 opacity-60 -rotate-[40deg]" />
            <Blossom tone="#c9def2" className="absolute left-[14%] top-[30%] w-7 opacity-60 rotate-[80deg]" />
            <Blossom tone="#b3cfe9" className="absolute left-[82%] top-[34%] w-8 opacity-70 rotate-[10deg]" />
            <Blossom tone="#c9def2" className="absolute left-[10%] top-[66%] w-6 opacity-55 -rotate-[25deg]" />
            <Blossom tone="#a8c8e8" className="absolute left-[86%] top-[68%] w-7 opacity-65 rotate-[55deg]" />
            <Blossom tone="#c9def2" className="absolute left-[38%] top-[88%] w-6 opacity-55 rotate-[120deg]" />
            <Blossom tone="#b3cfe9" className="absolute left-[58%] top-[86%] w-8 opacity-65 -rotate-[65deg]" />
            <BabyBreath tone="#a8c8e8" className="absolute left-[22%] top-[16%] w-14 opacity-50 rotate-[30deg]" />
            <BabyBreath tone="#a8c8e8" className="absolute left-[72%] top-[74%] w-14 opacity-50 -rotate-[45deg]" />
            <BabyBreath tone="#a8c8e8" className="absolute left-[6%] top-[48%] w-12 opacity-40 rotate-[90deg]" />
            <BabyBreath tone="#a8c8e8" className="absolute left-[88%] top-[20%] w-12 opacity-40 -rotate-[70deg]" />
          </div>

          {/* ---- Framed card content ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center justify-center text-center px-8 py-12 md:px-14 md:py-16 bg-[#0b1830]/70 backdrop-blur-[2px] border border-white/40 shadow-[0_25px_60px_rgba(0,0,0,0.45)] max-w-md w-[86%] mx-4"
          >
            {/* inner hairline for the double-frame look */}
            <div className="absolute inset-2 border border-white/15 pointer-events-none" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="uppercase tracking-[0.4em] text-[10px] font-sans font-semibold text-sky-200/80 mb-8"
            >
              The Wedding Of
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1.2, type: 'spring', stiffness: 40 }}
              className="font-serif text-5xl md:text-6xl text-white tracking-[0.08em] uppercase mb-2"
            >
              Meggy
            </motion.h1>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 1 }}
              className="font-serif italic text-2xl text-sky-300/90 mb-2"
            >
              and
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 1.2, type: 'spring', stiffness: 40 }}
              className="font-serif text-5xl md:text-6xl text-white tracking-[0.08em] uppercase mb-6"
            >
              Felix
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="font-sans font-semibold tracking-[0.35em] text-xs text-sky-100/80 mb-8 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-sky-200/40" />
              28 . 11 . 2026
              <span className="w-8 h-[1px] bg-sky-200/40" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mb-8 text-center"
            >
              <p className="text-[10px] text-sky-200/70 uppercase tracking-[0.3em] mb-2 font-semibold">Dear</p>
              <p className="text-lg font-serif text-white border-b border-sky-200/30 pb-1 px-4 inline-block">
                Guest
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpen}
              className="relative overflow-hidden group px-10 py-4 bg-white/10 border border-white/50 text-white font-sans tracking-[0.3em] uppercase text-[11px] hover:bg-white/20 transition-colors shadow-xl"
            >
              <span className="relative z-10 font-bold">Open Invitation</span>
              <div className="absolute inset-0 bg-sky-400/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full origin-center" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
