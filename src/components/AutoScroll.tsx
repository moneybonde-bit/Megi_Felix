import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Square } from 'lucide-react';

export function AutoScroll({ isOpened }: { isOpened?: boolean }) {
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();

  const SCROLL_SPEED = 0.5;

  const scrollStep = (time: number) => {
    if (lastTimeRef.current != undefined) {
      const deltaTime = time - lastTimeRef.current;
      window.scrollBy({ top: SCROLL_SPEED * (deltaTime / 16), left: 0, behavior: 'auto' });

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 2) {
        setIsAutoScrolling(false);
        return;
      }
    }
    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(scrollStep);
  };

  useEffect(() => {
    if (!isAutoScrolling) {
      lastTimeRef.current = undefined;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    requestRef.current = requestAnimationFrame(scrollStep);

    // Delay attaching cancel-listeners so the tap that starts auto-scroll
    // doesn't immediately trigger them on mobile.
    const timer = setTimeout(() => {
      const stop = (e: Event) => { if (e.isTrusted) setIsAutoScrolling(false); };
      window.addEventListener('wheel', stop, { passive: true });
      window.addEventListener('touchmove', stop, { passive: true });
      return () => {
        window.removeEventListener('wheel', stop);
        window.removeEventListener('touchmove', stop);
      };
    }, 400);

    return () => {
      clearTimeout(timer);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isAutoScrolling]);

  if (isOpened === false) return null;

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 2, type: 'spring' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsAutoScrolling(prev => !prev)}
      className={`fixed bottom-24 left-4 z-50 px-4 py-2.5 rounded-full shadow-xl backdrop-blur-md border transition-all duration-300 flex items-center gap-2
        ${isAutoScrolling
          ? 'bg-blue-500 text-white border-blue-300 shadow-[0_10px_25px_rgba(59,130,246,0.4)]'
          : 'bg-white/80 border-white/50 text-charcoal-medium hover:bg-white'
        }`}
    >
      {isAutoScrolling ? (
        <>
          <Square className="w-3.5 h-3.5 fill-current" />
          <span className="text-xs font-bold tracking-widest uppercase">Stop</span>
        </>
      ) : (
        <>
          <motion.div animate={{ y: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-3.5 h-3.5" />
          </motion.div>
          <span className="text-xs font-bold tracking-widest uppercase">Auto</span>
        </>
      )}
    </motion.button>
  );
}
