import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Section } from './ui/Section';

export function Countdown() {
  // Target date: November 28, 2026
  const targetDate = new Date('2026-11-28T12:00:00+07:00').getTime(); // WIB timezone
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <Section id="countdown" className="pt-8 pb-16">
      <div className="max-w-4xl mx-auto glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        {/* Subtle decorative background elements inside the card */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-300/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2"></div>

        <h3 className="text-xs md:text-sm font-sans font-bold tracking-[0.3em] uppercase text-blue-700 mb-8 text-center relative z-10">Countdown to the Big Day</h3>
        
        <div className="grid grid-cols-4 gap-4 md:gap-12 w-full relative z-10">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hours', value: timeLeft.hours },
            { label: 'Minutes', value: timeLeft.minutes },
            { label: 'Seconds', value: timeLeft.seconds }
          ].map((item, index) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring', stiffness: 50 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="text-3xl md:text-5xl lg:text-6xl font-serif text-charcoal-medium mb-2 drop-shadow-sm tabular-nums">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest text-charcoal-light">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
