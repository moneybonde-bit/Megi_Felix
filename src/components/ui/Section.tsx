import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function Section({ children, id, className = '', delay = 0 }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto relative z-10 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay, type: "spring", stiffness: 50 }}
        style={{ perspective: 1000 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ title, subtitle, className = "" }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`text-center mb-16 sticky top-24 z-30 py-4 ${className}`}>
      {/* Subtle backdrop for sticky text */}
      <div className="absolute inset-0 bg-sky-light/80 backdrop-blur-md -z-10 rounded-2xl shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] opacity-0 md:opacity-100"></div>
      {subtitle && (
        <span className="text-blue-700 font-sans font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-2 block">
          {subtitle}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-charcoal-medium">
        {title}
      </h2>
    </div>
  );
}
