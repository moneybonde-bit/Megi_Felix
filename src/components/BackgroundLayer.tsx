import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState } from 'react';

export function BackgroundLayer() {
  const { scrollYProgress } = useScroll();
  const [windowDimensions, setWindowDimensions] = useState({ width: 1000, height: 1000 });

  useEffect(() => {
    setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
  }, []);
  
  // Parallax effects for 3D depth perception - distinct speeds
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -350]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -450]);
  const y5 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y6 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  // Real flower placeholders (using Unsplash images with white/light backgrounds that blend well)
  const flower1 = "https://images.unsplash.com/photo-1562690868-60bbe7293e94?q=80&w=400&auto=format&fit=crop"; // Pink Rose
  const flower2 = "https://images.unsplash.com/photo-1490750967868-88cb4ecb0713?q=80&w=400&auto=format&fit=crop"; // Peach blooms
  const flower3 = "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=400&auto=format&fit=crop"; // Eucalyptus/Leaves
  const flower4 = "https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=400&auto=format&fit=crop"; // Delicate pink
  const flower5 = "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=400&auto=format&fit=crop"; // Soft white/blue cluster

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-sky-light">
      {/* Silk base simulation */}
      <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-gradient-to-b from-sky-blue via-sky-light to-sky-blue"></div>
      
      {/* Organic Flower Placements - Cascading from top-left to bottom-right naturally */}
      <motion.img 
        src={flower2} 
        style={{ y: y2, x: useTransform(scrollYProgress, [0, 1], [0, 50]), rotate: useTransform(scrollYProgress, [0, 1], [-10, 10]) }}
        className="absolute -top-10 -left-10 w-72 h-72 object-cover rounded-full opacity-80 mix-blend-multiply blur-[1px]"
        alt="Botanical arrangement"
      />
      
      <motion.img 
        src={flower1} 
        style={{ y: y1, rotate: useTransform(scrollYProgress, [0, 1], [15, 30]) }}
        className="absolute top-[20%] right-[-5%] w-56 h-56 object-cover rounded-full opacity-85 mix-blend-multiply"
        alt="Rose"
      />

      <motion.img 
        src={flower3} 
        style={{ y: y4, rotate: useTransform(scrollYProgress, [0, 1], [-20, -50]) }}
        className="absolute top-[40%] left-[-10%] w-80 h-80 object-cover rounded-full opacity-60 mix-blend-multiply blur-[2px]"
        alt="Foliage"
      />

      <motion.img 
        src={flower4} 
        style={{ y: y3, x: useTransform(scrollYProgress, [0, 1], [0, -30]), rotate: useTransform(scrollYProgress, [0, 1], [45, 60]) }}
        className="absolute top-[60%] right-[10%] w-48 h-48 object-cover rounded-full opacity-75 mix-blend-multiply"
        alt="Delicate blooms"
      />

      <motion.img 
        src={flower5} 
        style={{ y: y6, rotate: useTransform(scrollYProgress, [0, 1], [-10, -30]) }}
        className="absolute top-[85%] left-[15%] w-64 h-64 object-cover rounded-full opacity-80 mix-blend-multiply"
        alt="Soft cluster"
      />

      <motion.img 
        src={flower2} 
        style={{ y: y5, rotate: useTransform(scrollYProgress, [0, 1], [90, 110]) }}
        className="absolute top-[110%] right-[-10%] w-80 h-80 object-cover rounded-full opacity-70 mix-blend-multiply blur-[1px]"
        alt="Botanical bottom"
      />

      {/* Realistic Falling Petals Simulation */}
      {[...Array(30)].map((_, i) => {
        const size = 10 + Math.random() * 15;
        const duration = 15 + Math.random() * 25;
        const delay = Math.random() * -30; // Negative delay to start already falling
        const colorClass = Math.random() > 0.5 ? 'bg-blue-300' : 'bg-white';
        
        return (
          <motion.div
            key={`petal-${i}`}
            initial={{ y: -50, x: Math.random() * windowDimensions.width, opacity: 0, rotateX: 0, rotateY: 0, rotateZ: 0 }}
            animate={{ 
              y: windowDimensions.height + 50, 
              x: `calc(${Math.random() * windowDimensions.width}px + ${Math.sin(i) * 100}px)`, 
              opacity: [0, 0.8, 0.8, 0],
              rotateX: 360 * (Math.random() > 0.5 ? 1 : -1),
              rotateY: 360 * (Math.random() > 0.5 ? 1 : -1),
              rotateZ: 360 * (Math.random() > 0.5 ? 1 : -1)
            }}
            transition={{ 
              duration: duration, 
              repeat: Infinity, 
              ease: "linear",
              delay: delay
            }}
            className={`absolute rounded-full opacity-70 ${colorClass} shadow-sm`}
            style={{
              width: size,
              height: size * 0.8,
              borderRadius: '50% 0 50% 50%',
              filter: `blur(${Math.random() > 0.7 ? '2px' : '0px'})`
            }}
          />
        );
      })}
    </div>
  );
}
