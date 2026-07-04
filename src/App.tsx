import { useState, useEffect } from 'react';
import { CoverScreen } from './components/CoverScreen';
import { BackgroundLayer } from './components/BackgroundLayer';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { CoupleProfiles } from './components/CoupleProfiles';
import { Timeline } from './components/Timeline';
import { Events } from './components/Events';
import { Gallery } from './components/Gallery';
import { DigitalGift } from './components/DigitalGift';
import { RSVP } from './components/RSVP';
import { Guestbook } from './components/Guestbook';
import { MusicPlayer } from './components/MusicPlayer';
import { AutoScroll } from './components/AutoScroll';
import { ScrollProgress } from './components/ScrollProgress';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    // Disable scrolling when cover is open
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      window.scrollTo(0, 0); // Reset scroll on open
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpened]);

  return (
    <div className="bg-sky-light min-h-screen font-sans selection:bg-blue-300 selection:text-charcoal-medium relative text-charcoal-medium overflow-x-hidden">
      <CoverScreen isOpened={isOpened} onOpen={() => setIsOpened(true)} />
      
      {isOpened && (
        <>
          <ScrollProgress />
          {/* Background Parallax Layer */}
          <BackgroundLayer />

          <main className="relative z-10">
            <Hero />
            <Countdown />
            <CoupleProfiles />
            <Timeline />
            <Events />
            <Gallery />
            <DigitalGift />
            <RSVP />
            <Guestbook />
          </main>
          
          <footer className="relative z-10 glass-panel border-x-0 border-b-0 py-10 text-center">
            <p className="font-serif text-charcoal-medium text-2xl mb-2">Meggy & Felix</p>
            <p className="text-xs text-charcoal-light tracking-widest uppercase font-semibold">28 November 2026</p>
          </footer>

          <MusicPlayer isOpened={isOpened} />
          <AutoScroll isOpened={isOpened} />
        </>
      )}
    </div>
  );
}

