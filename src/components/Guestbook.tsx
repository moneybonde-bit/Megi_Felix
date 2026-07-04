import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'motion/react';
import { Section, SectionTitle } from './ui/Section';
import { Send, Heart } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  date: string;
}

const initialWishes: Wish[] = [
  { id: 1, name: "Sarah & John", message: "Congratulations to the beautiful couple! May your journey together be filled with love, joy, and endless blessings. We are so happy for you both!", date: "24 Nov 2026" },
  { id: 2, name: "Michael T.", message: "Happy wedding Meggy & Felix! Semoga langgeng sampai kakek nenek dan bahagia selalu ya. Sorry couldn't be there in person.", date: "25 Nov 2026" },
  { id: 3, name: "Auntie Linda", message: "Wishing you a lifetime of love and happiness. God bless your marriage!", date: "26 Nov 2026" },
  { id: 4, name: "The Smiths", message: "So incredibly happy for the two of you! What a beautiful celebration.", date: "27 Nov 2026" },
];

export function Guestbook() {
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newWish: Wish = {
        id: Date.now(),
        name,
        message,
        date: new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date())
      };
      
      setWishes([newWish, ...wishes]);
      setName("");
      setMessage("");
      setIsSubmitting(false);
    }, 1000);
  };

  useAnimationFrame((time, delta) => {
    if (!carouselRef.current || isHovering) return;
    
    // Auto scroll the masonry grid slowly upwards
    const { scrollTop, scrollHeight, clientHeight } = carouselRef.current;
    
    // Reset to top when reached bottom to create a loop effect (or just bounce)
    if (scrollTop + clientHeight >= scrollHeight - 1) {
      carouselRef.current.scrollTop = 0;
    } else {
      carouselRef.current.scrollTop += 0.5; // Scroll speed
    }
  });

  return (
    <Section id="guestbook" className="mt-20 mb-32 relative">
      <SectionTitle title="Guestbook" subtitle="Wishes & Prayers" />
      
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-12 relative z-10">
        
        {/* Form Section */}
        <div className="w-full lg:w-1/3">
          <motion.div 
            className="glass-panel p-8 rounded-3xl sticky top-32"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          >
            <h3 className="text-2xl font-serif text-charcoal-medium mb-6">Leave a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="guestName" className="block text-xs font-semibold text-charcoal-medium mb-2 uppercase tracking-widest">
                  Name
                </label>
                <input
                  type="text"
                  id="guestName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-charcoal-medium placeholder-charcoal-light/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-charcoal-medium mb-2 uppercase tracking-widest">
                  Message / Prayer
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  placeholder="Write your wishes here..."
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-charcoal-medium placeholder-charcoal-light/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner resize-none"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-charcoal-medium hover:bg-charcoal-light text-white font-sans font-bold tracking-widest uppercase py-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Wish <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
        
        {/* Display Section (Auto-scrolling grid) */}
        <div className="w-full lg:w-2/3 h-[600px] relative overflow-hidden rounded-3xl">
          {/* Top/Bottom gradient fades for smooth scrolling effect */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-sky-light to-transparent z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-sky-light to-transparent z-10 pointer-events-none"></div>
          
          <div 
            ref={carouselRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={() => setIsHovering(true)}
            onTouchEnd={() => setIsHovering(false)}
            className="h-full overflow-y-auto no-scrollbar pb-12 pt-12 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
              <AnimatePresence>
                {wishes.map((wish, i) => (
                  <motion.div
                    key={wish.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100, delay: (i % 4) * 0.1 }}
                    className="glass-panel p-6 rounded-2xl flex flex-col relative group"
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="absolute top-4 right-4 text-blue-300 opacity-20 group-hover:opacity-100 transition-opacity">
                      <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <p className="text-charcoal-medium font-serif italic text-lg leading-relaxed mb-6 mt-2 relative z-10">
                      "{wish.message}"
                    </p>
                    <div className="mt-auto">
                      <p className="font-sans font-bold text-charcoal-medium tracking-wide">{wish.name}</p>
                      <p className="text-xs text-charcoal-light font-medium tracking-widest uppercase mt-1">{wish.date}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
      </div>
    </Section>
  );
}
