import { motion, AnimatePresence } from 'motion/react';

interface CoverScreenProps {
  onOpen: () => void;
  isOpened: boolean;
}

export function CoverScreen({ onOpen, isOpened }: CoverScreenProps) {
  // Premium organic silk + floral placeholder background
  const COVER_BG = "https://images.unsplash.com/photo-1558235235-97c9b83bbaaa?q=80&w=1974&auto=format&fit=crop";
  
  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-sky-light"
          exit={{ 
            opacity: 0, 
            scale: 1.1,
            y: "-100vh", // Curtain parting effect
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Background Silk Simulation */}
          <div className="absolute inset-0 z-0">
             <img src={COVER_BG} alt="Silk Background" className="w-full h-full object-cover opacity-70 mix-blend-multiply" />
             <div className="absolute inset-0 bg-gradient-to-b from-sky-blue/40 via-transparent to-sky-light/80 backdrop-blur-[2px]"></div>
          </div>

          {/* Floating Organic Foreground Elements */}
          <motion.img 
            src="https://images.unsplash.com/photo-1542469608-8e6c4e09fde1?q=80&w=400&auto=format&fit=crop"
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[10%] left-[-5%] w-48 h-48 object-cover rounded-full mix-blend-multiply opacity-80 blur-[1px]"
            alt="Foreground Flower"
          />
          <motion.img 
            src="https://images.unsplash.com/photo-1534043464124-3be32fe000cb?q=80&w=400&auto=format&fit=crop"
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-5%] right-[-5%] w-64 h-64 object-cover rounded-full mix-blend-multiply opacity-80"
            alt="Foreground Flower"
          />

          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] max-w-lg w-full mx-4">
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5, duration: 1 }}
               className="uppercase tracking-[0.3em] text-xs font-sans font-semibold text-charcoal-light mb-6"
             >
               The Wedding Of
             </motion.p>
             
             <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.8, duration: 1.2, type: "spring", stiffness: 40 }}
               className="font-serif text-5xl md:text-6xl text-charcoal-medium mb-6 drop-shadow-sm"
             >
               Meggy <br/><span className="text-blue-600 font-sans font-light text-4xl">&</span><br/> Felix
             </motion.h1>

             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 1.2, duration: 1 }}
               className="font-sans font-semibold tracking-widest text-sm text-charcoal-light mb-10 flex items-center gap-4"
             >
               <span className="w-8 h-[1px] bg-charcoal-light/30"></span>
               28 . 11 . 2026
               <span className="w-8 h-[1px] bg-charcoal-light/30"></span>
             </motion.div>

             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 1.5, duration: 1 }}
               className="mb-10 text-center"
             >
               <p className="text-xs text-charcoal-medium/70 uppercase tracking-widest mb-2 font-semibold">Dear</p>
               <p className="text-lg font-serif text-charcoal-medium border-b border-charcoal-medium/20 pb-1 px-4 inline-block">
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
               className="relative overflow-hidden group px-10 py-4 bg-charcoal-medium text-white rounded-full font-sans tracking-widest uppercase text-xs hover:bg-charcoal-light transition-colors shadow-xl"
             >
               <span className="relative z-10 font-bold">Open Invitation</span>
               {/* Ripple effect placeholder */}
               <div className="absolute inset-0 bg-blue-600/20 scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full origin-center"></div>
             </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
