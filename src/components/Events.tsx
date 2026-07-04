import { Section, SectionTitle } from './ui/Section';
import { MapPin, Clock, CalendarHeart } from 'lucide-react';
import { motion } from 'motion/react';

export function Events() {
  return (
    <Section id="events" className="relative mt-20">
      <SectionTitle title="Event Schedule" subtitle="Join us in our celebration" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-20">
        {/* Pemberkatan Nikah */}
        <motion.div 
          className="glass-panel p-8 lg:p-12 rounded-3xl relative overflow-hidden group"
          initial={{ opacity: 0, x: -50, rotateY: 10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", stiffness: 50 }}
          whileHover={{ y: -10 }}
        >
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-300 via-blue-500 to-transparent opacity-80"></div>
          
          <h3 className="text-3xl font-serif text-charcoal-medium mb-8 text-center">
            Pemberkatan Nikah
          </h3>
          
          <div className="space-y-6 text-charcoal-light font-sans text-sm">
            <div className="flex items-start gap-4">
              <CalendarHeart className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Hari & Tanggal</strong>
                Sabtu, 28 November 2026
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Waktu</strong>
                12:00 WIB - Selesai
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Lokasi</strong>
                <span className="block mb-2 font-bold text-emerald-600">Gereja Katolik Santo Gabriel Pulogebang</span>
                Perumahan Pulo Gebang Permai Blok J6 Nomor 1-2, RT.4/RW.11, Kelurahan Pulo Gebang, Kecamatan Cakung, Jakarta Timur
              </div>
            </div>
          </div>

          <div className="mt-10 text-center relative z-10">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.google.com/?q=Gereja+Katolik+Santo+Gabriel+Pulogebang" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-charcoal-medium text-sm tracking-widest font-semibold uppercase transition-shadow shadow-md hover:shadow-xl rounded-full border border-white/50 w-full"
            >
              Open Google Maps
            </motion.a>
          </div>
          {/* Flower decorative asset placeholder */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-full mix-blend-multiply" alt="flower" />
          </div>
        </motion.div>

        {/* Resepsi Pernikahan */}
        <motion.div 
          className="glass-panel p-8 lg:p-12 rounded-3xl relative overflow-hidden group"
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 50 }}
          whileHover={{ y: -10 }}
        >
          {/* Subtle accent line */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-blue via-emerald-400 to-transparent opacity-80"></div>
          
          <h3 className="text-3xl font-serif text-charcoal-medium mb-8 text-center">
            Resepsi Pernikahan
          </h3>
          
          <div className="space-y-6 text-charcoal-light font-sans text-sm">
            <div className="flex items-start gap-4">
              <CalendarHeart className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Hari & Tanggal</strong>
                Sabtu, 28 November 2026
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Waktu</strong>
                18:00 WIB - Selesai
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5 drop-shadow-sm" />
              <div>
                <strong className="block text-charcoal-medium font-semibold mb-1">Lokasi</strong>
                <span className="block mb-2 font-bold text-emerald-600">Golden Leaf Chinese Restaurant</span>
                Lotte Grosir Kelapa Gading, Jl. Boulevard Barat Raya No.18 Lantai 2, RT.18/RW.8, Kelapa Gading Barat, Kecamatan Kelapa Gading, Jakarta Utara
              </div>
            </div>
          </div>

          <div className="mt-10 text-center relative z-10">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://maps.google.com/?q=Golden+Leaf+Chinese+Restaurant+Kelapa+Gading" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-charcoal-medium text-sm tracking-widest font-semibold uppercase transition-shadow shadow-md hover:shadow-xl rounded-full border border-white/50 w-full"
            >
              Open Google Maps
            </motion.a>
          </div>
           {/* Flower decorative asset placeholder */}
           <div className="absolute -bottom-10 -right-10 w-40 h-40 opacity-20 pointer-events-none">
            <img src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?q=80&w=200&auto=format&fit=crop" className="w-full h-full object-cover rounded-full mix-blend-multiply" alt="flower" />
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
