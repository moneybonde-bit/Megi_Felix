import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Square } from 'lucide-react';

export function AutoScroll({ isOpened }: { isOpened?: boolean }) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const SCROLL_SPEED = 0.5; // pixels per millisecond (approx 30px per sec at 60fps)

  const scrollStep = (time: number) => {
    if (lastTimeRef.current != undefined) {
      const deltaTime = time - lastTimeRef.current;
      window.scrollBy({ top: SCROLL_SPEED * (deltaTime / 16), left: 0, behavior: 'auto' });
      
      // Stop if reached the bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
         setIsAutoScrolling(false);
         return;
      }
    }
    lastTimeRef.current = time;
    if (isAutoScrolling) {
      requestRef.current = requestAnimationFrame(scrollStep);
    }
  };

  useEffect(() => {
    if (isAutoScrolling) {
      requestRef.current = requestAnimationFrame(scrollStep);
      
      // Stop on user manual scroll (wheel, touchmove)
      const handleUserScroll = (e: Event) => {
        if (e.isTrusted) setIsAutoScrolling(false);
      };
      
      window.addEventListener('wheel', handleUserScroll, { passive: true });
      window.addEventListener('touchstart', handleUserScroll, { passive: true });
      
      return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        window.removeEventListener('wheel', handleUserScroll);
        window.removeEventListener('touchstart', handleUserScroll);
      };
    } else {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  if (isOpened === false) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, type: "spring" }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleAutoScroll}
      className={`fixed bottom-6 left-6 z-50 px-5 py-3 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 flex items-center gap-2
        ${isAutoScrolling 
          ? 'bg-blue-500 text-white border-blue-300 shadow-[0_10px_25px_rgba(59,130,246,0.4)]' 
          : 'bg-white/80 border-white/50 text-charcoal-medium hover:bg-white'
        }`}
    >
      {isAutoScrolling ? (
        <>
          <Square className="w-4 h-4 fill-current" />
          <span className="text-xs font-bold tracking-widest uppercase">Stop</span>
        </>
      ) : (
        <>
          <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-4 h-4" />
          </motion.div>
          <span className="text-xs font-bold tracking-widest uppercase">Auto-Scroll</span>
        </>
      )}
    </motion.button>
  );
}
