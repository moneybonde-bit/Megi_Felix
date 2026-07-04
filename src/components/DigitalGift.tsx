import { Section, SectionTitle } from './ui/Section';
import { Gift, Copy, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const accounts = [
  {
    bankName: 'BCA',
    accountNumber: '1234567890',
    accountName: 'Meggy Claudia Tadjamawo',
  },
  {
    bankName: 'Mandiri',
    accountNumber: '0987654321',
    accountName: 'Felix Ferdinand',
  },
];

export function DigitalGift() {
  const [revealed, setRevealed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number>(0);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const prev = () => setActiveIndex(i => (i - 1 + accounts.length) % accounts.length);
  const next = () => setActiveIndex(i => (i + 1) % accounts.length);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  return (
    <Section id="gift" className="mt-20">
      <SectionTitle title="Digital Gift" subtitle="Wedding Wishes" />

      <div className="max-w-2xl mx-auto text-center mb-10">
        <p className="text-charcoal-light font-sans text-sm md:text-base leading-relaxed bg-white/30 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami.
          Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless melalui:
        </p>
      </div>

      {/* Reveal button */}
      {!revealed && (
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setRevealed(true)}
            className="flex flex-col items-center gap-3 group"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 shadow-lg flex items-center justify-center group-hover:border-blue-400 transition-colors"
            >
              <Gift className="w-9 h-9 text-blue-600" />
            </motion.div>
            <span className="text-sm font-semibold text-blue-600 tracking-wide bg-white/60 backdrop-blur-sm border border-blue-200 px-5 py-2 rounded-full shadow-sm">
              Lihat Rekening ✦
            </span>
          </motion.button>
        </div>
      )}

      {/* Slider */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            className="max-w-sm mx-auto"
          >
            {/* Card slider */}
            <div
              className="relative overflow-hidden"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -60 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                >
                  {(() => {
                    const account = accounts[activeIndex];
                    return (
                      <div className="glass-panel p-10 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-lg">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-200/30 rounded-full blur-3xl -z-10" />
                        <Gift className="w-10 h-10 text-blue-600 mb-6 drop-shadow-sm" />
                        <h4 className="text-2xl font-serif text-charcoal-medium mb-2">{account.bankName}</h4>
                        <p className="font-mono text-2xl text-charcoal-medium font-medium tracking-widest mb-2">{account.accountNumber}</p>
                        <p className="text-xs text-charcoal-light mb-8 uppercase tracking-widest font-semibold">a.n {account.accountName}</p>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCopy(account.accountNumber, activeIndex)}
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-sky-50 border border-silver-500/30 rounded-full text-sm font-sans font-medium transition-colors shadow-sm text-charcoal-medium"
                        >
                          {copiedIndex === activeIndex ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-blue-600" />
                              <span className="text-blue-700">Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-charcoal-light" />
                              <span>Salin No. Rekening</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    );
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Prev / Next + dots */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full bg-white/80 border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
                aria-label="Rekening sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-2">
                {accounts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-5 h-2 bg-blue-500' : 'w-2 h-2 bg-blue-200 hover:bg-blue-300'}`}
                    aria-label={`Rekening ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-white/80 border border-blue-200 flex items-center justify-center text-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
                aria-label="Rekening berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Swipe hint */}
            <p className="text-center text-[11px] text-charcoal-light/60 mt-3 tracking-wide">Geser untuk berpindah rekening</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
