import { Section, SectionTitle } from './ui/Section';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { BlueRose } from './florals/Flowers';

export function CoupleProfiles() {
  return (
    <Section id="couple" className="relative">
      <SectionTitle title="The Bride & Groom" subtitle="With the blessing of God" />

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mt-12 relative z-10">
        
        {/* Bride Profile */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-sm glass-panel p-8 rounded-3xl"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-48 h-64 md:w-56 md:h-72 mb-8 p-2 rounded-t-full border border-white/50 relative shadow-xl bg-white/20">
            <div className="w-full h-full rounded-t-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1546167888-66236b2b2413?q=80&w=1974&auto=format&fit=crop" 
                alt="Meggy" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* 3D Floral Decoration Placeholder */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-300 rounded-full blur-xl opacity-60"></div>
            <BlueRose variant="sky" className="absolute -bottom-4 -right-4 w-12 drop-shadow-md rotate-12" /> 
          </div>
          
          <h3 className="text-3xl font-serif text-charcoal-medium mb-2">Meggy Claudia Tadjamawo</h3>
          <p className="text-charcoal-light text-sm leading-relaxed mb-4 font-medium">
            Putri Tunggal dari<br />
            Bapak Robert Marthinus Tadjamawo &<br />
            Ibu Pdt. Agustina Lakukua
          </p>
          <a 
            href="https://instagram.com/meegyrobert" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-blue-700 hover:text-blue-600 font-bold transition-colors"
          >
            <Instagram className="w-4 h-4" /> @meegyrobert
          </a>
        </motion.div>

        {/* Ampersand */}
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 50, delay: 0.3 }}
          className="text-6xl md:text-8xl font-serif text-blue-500 italic drop-shadow-sm my-8 lg:my-0"
        >
          &
        </motion.div>

        {/* Groom Profile */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-sm glass-panel p-8 rounded-3xl"
          whileHover={{ y: -10 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="w-48 h-64 md:w-56 md:h-72 mb-8 p-2 rounded-t-full border border-white/50 relative shadow-xl bg-white/20">
            <div className="w-full h-full rounded-t-full overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop" 
                alt="Felix" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* 3D Floral Decoration Placeholder */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-sky-blue rounded-full blur-xl opacity-60"></div>
            <BlueRose variant="royal" className="absolute -bottom-4 -left-4 w-12 drop-shadow-md -rotate-12" />
          </div>
          
          <h3 className="text-3xl font-serif text-charcoal-medium mb-2">Felix Ferdinand</h3>
          <p className="text-charcoal-light text-sm leading-relaxed mb-4 font-medium">
            Putra kedua dari<br />
            Bapak Kelvin Kartika &<br />
            Ibu Laurentia Delimarta
          </p>
          <a 
            href="https://instagram.com/ffeerdinand" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-blue-700 hover:text-blue-600 font-bold transition-colors"
          >
            <Instagram className="w-4 h-4" /> @ffeerdinand
          </a>
        </motion.div>

      </div>
    </Section>
  );
}
