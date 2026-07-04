import { Section, SectionTitle } from './ui/Section';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const timelineData = [
  {
    date: 'Agustus 2025',
    title: 'Awal Mengenal',
    description: 'Saling mengenal pertama kali lewat platform Instagram, dimulai dari sekadar saling follow.',
  },
  {
    date: 'November 2025',
    title: 'Komunikasi Intens',
    description: 'Hubungan berlanjut ke komunikasi yang lebih intens melalui pesan digital, saling bertukar cerita dan pikiran.',
  },
  {
    date: 'Momen Berharga',
    title: 'Pertemuan Pertama',
    description: 'Pertemuan pertama secara langsung yang bermakna, kami meluangkan waktu untuk beribadah (Misa) bersama.',
  },
  {
    date: '28 November 2026',
    title: 'Langkah Serius',
    description: 'Puncak dari perjalanan kami. Melalui percakapan mendalam dan menemukan banyak kecocokan, kami akhirnya memutuskan berkomitmen serius untuk melangkah ke jenjang pernikahan.',
  },
];

export function Timeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pathLength = useTransform(scrollYProgress, [0.2, 0.8], [0, 1]);

  return (
    <Section id="story" className="relative mt-20" delay={0.2}>
      <SectionTitle title="Our Story" subtitle="Journey of love" />
      
      <div ref={containerRef} className="relative max-w-3xl mx-auto mt-20">
        {/* Animated Vertical Line */}
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/40 md:-translate-x-1/2 rounded-full overflow-hidden">
           <motion.div 
             style={{ scaleY: pathLength, originY: 0 }} 
             className="w-full h-full bg-blue-500"
           />
        </div>
        
        <div className="space-y-24">
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}
                initial={{ opacity: 0, y: 50, z: -100, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, z: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 50 }}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[16px] md:left-1/2 top-0 w-[10px] h-[10px] rounded-full bg-blue-500 md:-translate-x-1/2 ring-4 ring-sky-light z-10 shadow-[0_0_15px_rgba(59,130,246,0.6)]"></div>
                
                {/* Content Area */}
                <div className="md:w-1/2 pl-12 md:pl-0 flex flex-col pt-[-4px]">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotateY: isEven ? -5 : 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-8 glass-panel rounded-3xl ${isEven ? 'md:ml-12 md:origin-right' : 'md:mr-12 md:origin-left'} relative overflow-hidden`}
                  >
                    {/* Decorative reflection */}
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/40 rounded-full blur-3xl opacity-50"></div>

                    <span className="text-blue-700 font-sans text-xs font-bold tracking-widest uppercase block mb-3">
                      {item.date}
                    </span>
                    <h4 className="text-2xl font-serif text-charcoal-medium mb-3">{item.title}</h4>
                    <p className="text-charcoal-light text-sm leading-relaxed font-medium">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
