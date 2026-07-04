import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const NAV_ITEMS = [
  {
    label: 'Mempelai',
    href: '#couple',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path
          d="M12 21C12 21 3 15.5 3 9.5C3 7 5 5 7.5 5C9.24 5 10.91 6.01 12 7.08C13.09 6.01 14.76 5 16.5 5C19 5 21 7 21 9.5C21 15.5 12 21 12 21Z"
          fill={active ? '#3b82f6' : 'none'}
          stroke={active ? '#3b82f6' : 'currentColor'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* small petal accent */}
        <ellipse cx="12" cy="10" rx="2" ry="3" fill={active ? '#93c5fd' : 'none'} opacity="0.6" transform="rotate(-20 12 10)" />
      </svg>
    ),
  },
  {
    label: 'Acara',
    href: '#events',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="5" width="18" height="16" rx="3" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" fill={active ? '#dbeafe' : 'none'} />
        <path d="M8 3v4M16 3v4M3 10h18" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" />
        {/* small flower on calendar */}
        <circle cx="12" cy="16" r="2" fill={active ? '#3b82f6' : 'none'} stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.2" />
        <path d="M12 13.5a1 1 0 010-1.5M10.5 14.5a1 1 0 01-1-1.5M13.5 14.5a1 1 0 011-1.5" stroke={active ? '#93c5fd' : 'currentColor'} strokeWidth="1" strokeLinecap="round" opacity={active ? 1 : 0.5} />
      </svg>
    ),
  },
  {
    label: 'Galeri',
    href: '#gallery',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="3" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" fill={active ? '#dbeafe' : 'none'} />
        <circle cx="8.5" cy="9.5" r="1.5" fill={active ? '#3b82f6' : 'currentColor'} />
        <path d="M3 16l5-4 4 3 3-2 6 5" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* tiny petal accent */}
        <circle cx="18" cy="5" r="2.5" fill={active ? '#bfdbfe' : 'none'} stroke={active ? '#3b82f6' : 'none'} strokeWidth="1" />
        <path d="M18 3.5v3M16.5 5h3" stroke={active ? '#3b82f6' : 'none'} strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'RSVP',
    href: '#rsvp',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M4 6h16c1.1 0 2 .9 2 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8c0-1.1.9-2 2-2z" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" fill={active ? '#dbeafe' : 'none'} />
        <path d="M22 8l-10 7L2 8" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" />
        {/* tiny rose bud on envelope flap */}
        <circle cx="12" cy="7.5" r="1.5" fill={active ? '#3b82f6' : 'none'} stroke={active ? '#3b82f6' : 'none'} />
        <path d="M11 6.5q1-1.5 2 0" stroke={active ? '#93c5fd' : 'none'} strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'Ucapan',
    href: '#guestbook',
    icon: (active: boolean) => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke={active ? '#3b82f6' : 'currentColor'} strokeWidth="1.8" fill={active ? '#dbeafe' : 'none'} strokeLinejoin="round" />
        {/* small blossom inside bubble */}
        <circle cx="12" cy="10" r="1" fill={active ? '#3b82f6' : 'currentColor'} />
        <circle cx="9" cy="10" r="1" fill={active ? '#3b82f6' : 'currentColor'} />
        <circle cx="15" cy="10" r="1" fill={active ? '#3b82f6' : 'currentColor'} />
      </svg>
    ),
  },
];

export function NavBar({ isOpened }: { isOpened?: boolean }) {
  const [activeHref, setActiveHref] = useState('');

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => item.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isOpened]);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!isOpened) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 80 }}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-safe"
      aria-label="Section navigation"
    >
      <div className="mx-4 mb-3 bg-white/80 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(59,130,246,0.18)] rounded-2xl flex items-center px-2 py-1.5 gap-1 w-full max-w-sm">
        {NAV_ITEMS.map(item => {
          const active = activeHref === item.href;
          return (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="flex flex-col items-center justify-center flex-1 gap-0.5 py-1 rounded-xl transition-all duration-200 group"
              aria-label={item.label}
            >
              <div className={`transition-all duration-200 ${active ? 'text-blue-600 scale-110' : 'text-charcoal-light/70 group-hover:text-blue-400'}`}>
                {item.icon(active)}
              </div>
              <span className={`text-[9px] font-semibold tracking-wide transition-colors duration-200 leading-none ${active ? 'text-blue-600' : 'text-charcoal-light/60 group-hover:text-blue-400'}`}>
                {item.label}
              </span>
              {active && (
                <motion.div
                  layoutId="nav-dot"
                  className="w-1 h-1 rounded-full bg-blue-500 mt-0.5"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}
