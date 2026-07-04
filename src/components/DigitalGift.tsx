import { Section, SectionTitle } from './ui/Section';
import { Gift, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const accounts = [
  {
    bankName: "BCA",
    accountNumber: "1234567890",
    accountName: "Meggy Claudia Tadjamawo",
  },
  {
    bankName: "Mandiri",
    accountNumber: "0987654321",
    accountName: "Felix Ferdinand",
  }
];

export function DigitalGift() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Section id="gift" className="mt-20">
      <SectionTitle title="Digital Gift" subtitle="Wedding Wishes" />
      
      <div className="max-w-2xl mx-auto text-center mb-12">
        <p className="text-charcoal-light font-sans text-sm md:text-base leading-relaxed bg-white/30 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-white/50">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
          Dan jika memberi adalah ungkapan tanda kasih Anda, Anda dapat memberi kado secara cashless melalui:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {accounts.map((account, index) => (
          <motion.div
            key={index}
            className="glass-panel p-10 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group shadow-lg"
            whileHover={{ y: -10, scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Cinematic subtle glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/40 rounded-full blur-3xl -z-10 group-hover:bg-blue-300/30 transition-colors duration-500"></div>
            
            <Gift className="w-10 h-10 text-blue-600 mb-6 drop-shadow-sm" />
            
            <h4 className="text-2xl font-serif text-charcoal-medium mb-2">{account.bankName}</h4>
            <p className="font-mono text-2xl text-charcoal-medium font-medium tracking-widest mb-2">{account.accountNumber}</p>
            <p className="text-xs text-charcoal-light mb-8 uppercase tracking-widest font-semibold">a.n {account.accountName}</p>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCopy(account.accountNumber, index)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-sky-50 border border-silver-500/30 rounded-full text-sm font-sans font-medium transition-colors shadow-sm text-charcoal-medium"
            >
              {copiedIndex === index ? (
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
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
