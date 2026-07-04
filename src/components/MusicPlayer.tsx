import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Music, Disc } from 'lucide-react';
import { motion } from 'motion/react';

// Place your audio file at: public/wedding-music.mp3
// It will be served at /wedding-music.mp3 by Vite/Vercel.
const AUDIO_SRC = '/wedding-music.mp3';

export function MusicPlayer({ isOpened }: { isOpened?: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create the audio element once
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Auto-play when invitation is opened (browser allows this because the
  // "Open Invitation" button click is the user gesture that precedes it).
  useEffect(() => {
    if (isOpened && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked — user can tap the player button to start.
      });
    }
  }, [isOpened]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  if (isOpened === false) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 50 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={togglePlay}
      className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 flex items-center justify-center overflow-hidden
        ${isPlaying
          ? 'bg-white/80 border-blue-300 shadow-[0_10px_25px_rgba(59,130,246,0.3)] text-blue-600'
          : 'bg-white/60 border-white/50 text-charcoal-light hover:text-charcoal-medium shadow-lg'
        }`}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <motion.div
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <Disc className="w-6 h-6" />
      </motion.div>

      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 rounded-full backdrop-blur-[1px]">
          <Play className="w-4 h-4 ml-1 fill-current" />
        </div>
      )}

      {isPlaying && (
        <motion.div
          animate={{ y: [-5, -20], opacity: [1, 0], x: [0, 10] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          className="absolute -top-2 -right-2 pointer-events-none"
        >
          <Music className="w-4 h-4 text-blue-500" />
        </motion.div>
      )}
    </motion.button>
  );
}
