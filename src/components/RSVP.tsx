import { Section, SectionTitle } from './ui/Section';
import { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

export function RSVP() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      
      // Trigger canvas confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd'] // shades of blue
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#60a5fa', '#2563eb', '#93c5fd']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <Section id="rsvp" className="mt-20 mb-20 relative">
      <div className="max-w-xl mx-auto relative">
        <SectionTitle title="RSVP" subtitle="Confirmation of Attendance" />
        
        <motion.div 
          className="glass-panel p-8 md:p-12 rounded-3xl relative z-10 shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
        >
           {/* Decorative background element */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10"></div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-blue-200">
                <span className="text-blue-600 text-3xl">✓</span>
              </div>
              <h3 className="text-3xl font-serif text-charcoal-medium mb-3">Terima Kasih!</h3>
              <p className="text-charcoal-light font-sans text-sm">
                Konfirmasi kehadiran Anda telah kami terima. Kami menantikan kehadiran Anda di hari bahagia kami.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-charcoal-medium mb-2 font-sans tracking-wide uppercase">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-5 py-4 text-charcoal-medium placeholder-charcoal-light/50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner backdrop-blur-sm"
                />
              </div>

              <div>
                <label htmlFor="guests" className="block text-sm font-semibold text-charcoal-medium mb-2 font-sans tracking-wide uppercase">
                  Jumlah Tamu
                </label>
                <select
                  id="guests"
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-5 py-4 text-charcoal-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner backdrop-blur-sm appearance-none"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>

              <div>
                <label htmlFor="attendance" className="block text-sm font-semibold text-charcoal-medium mb-2 font-sans tracking-wide uppercase">
                  Konfirmasi Kehadiran
                </label>
                <select
                  id="attendance"
                  className="w-full bg-white/50 border border-white/60 rounded-xl px-5 py-4 text-charcoal-medium focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner backdrop-blur-sm appearance-none"
                >
                  <option value="hadir">Ya, saya akan hadir</option>
                  <option value="tidak_hadir">Maaf, saya tidak bisa hadir</option>
                </select>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-charcoal-medium hover:bg-charcoal-light text-white font-sans font-bold tracking-widest uppercase py-4 rounded-xl transition-colors mt-6 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
              >
                {status === 'submitting' ? 'Mengirim...' : 'Kirim Konfirmasi'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}
