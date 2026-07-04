import { Section, SectionTitle } from './ui/Section';
import { motion } from 'motion/react';

// Placeholder images
const images = [
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
];

export function Gallery() {
  return (
    <Section id="gallery" className="mt-20">
      <SectionTitle title="Our Moments" subtitle="A glimpse of our journey" />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12 px-2">
        {images.map((src, index) => (
          <motion.div
            key={index}
            className="relative aspect-square md:aspect-[4/5] overflow-hidden group rounded-2xl shadow-lg border border-white/40"
            initial={{ opacity: 0, scale: 0.8, rotateZ: index % 2 === 0 ? -5 : 5 }}
            whileInView={{ opacity: 1, scale: 1, rotateZ: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 50 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <img 
              src={src} 
              alt={`Gallery moment ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Cinematic overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-sky-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"></div>
          </motion.div>
        ))}
      </div>
      
      <div className="text-center mt-16">
        <p className="text-charcoal-medium/60 font-serif text-xl italic tracking-wide">
          "Love is not about looking at each other, but looking in the same direction."
        </p>
      </div>
    </Section>
  );
}
