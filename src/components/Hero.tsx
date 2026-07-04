import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';

export function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-emerald-600 font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-6 drop-shadow-sm"
        >
          The Wedding Celebration Of
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.8, type: "spring", stiffness: 50 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-charcoal-medium mb-6 drop-shadow-sm"
        >
          Meggy <span className="text-blue-600 font-sans font-light">&</span> Felix
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="font-sans font-semibold text-charcoal-light tracking-[0.2em] text-sm md:text-base mt-4 flex items-center space-x-4"
        >
          <span className="w-12 h-[1px] bg-charcoal-light/30"></span>
          <span>28 . 11 . 2026</span>
          <span className="w-12 h-[1px] bg-charcoal-light/30"></span>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-widest text-charcoal-light font-bold mb-2">Scroll to discover</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-blue-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
