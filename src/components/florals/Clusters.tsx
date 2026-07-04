import { CSSProperties } from 'react';
import { BabyBreath, Blossom, BlueRose, Bud, LeafSpray } from './Flowers';

/**
 * Pre-composed floral arrangements built from the blue flower library.
 * Each cluster layers foliage → baby's breath → roses → filler blossoms
 * so arrangements read as designed bouquets, not scattered circles.
 */

interface ClusterProps {
  className?: string;
  style?: CSSProperties;
  /** Foliage tone — lighter for dark backgrounds. */
  leafTone?: string;
}

const abs = 'absolute';

/** Callers position clusters with `absolute ...`; only add `relative` when they don't. */
function pos(className: string): string {
  return className.includes('absolute') ? className : `relative ${className}`;
}

/** Dense corner arrangement (roughly square). Anchor it to a corner and crop. */
export function CornerCluster({ className = '', style, leafTone = '#8fa6ba' }: ClusterProps) {
  return (
    <div className={pos(className)} style={{ aspectRatio: '1 / 1', ...style }} aria-hidden="true">
      {/* foliage layer */}
      <LeafSpray tone={leafTone} className={`${abs} left-[2%] top-[-8%] w-[34%] rotate-[160deg]`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[38%] top-[30%] w-[38%] rotate-[115deg] opacity-90`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[-6%] top-[26%] w-[36%] -rotate-[155deg]`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[52%] top-[-10%] w-[30%] rotate-[65deg] opacity-80`} />
      <BabyBreath className={`${abs} left-[46%] top-[2%] w-[34%] rotate-[40deg]`} />
      <BabyBreath className={`${abs} left-[-4%] top-[44%] w-[32%] -rotate-[70deg] opacity-90`} />
      <BabyBreath className={`${abs} left-[30%] top-[48%] w-[28%] rotate-[150deg] opacity-80`} />

      {/* main blooms — mixed sizes and depths */}
      <BlueRose variant="navy" className={`${abs} left-[1%] top-[1%] w-[46%] rotate-[14deg] drop-shadow-md`} />
      <BlueRose variant="royal" className={`${abs} left-[34%] top-[16%] w-[40%] -rotate-[24deg] drop-shadow-md`} />
      <BlueRose variant="sky" className={`${abs} left-[12%] top-[38%] w-[33%] rotate-[52deg] drop-shadow`} />
      <BlueRose variant="powder" className={`${abs} left-[48%] top-[44%] w-[26%] rotate-[80deg] opacity-95`} />
      <BlueRose variant="navy" className={`${abs} left-[58%] top-[4%] w-[22%] rotate-[130deg] opacity-90`} />

      {/* buds + filler blossoms */}
      <Bud variant="royal" className={`${abs} left-[70%] top-[24%] w-[13%] rotate-[35deg]`} />
      <Bud variant="sky" className={`${abs} left-[6%] top-[62%] w-[12%] -rotate-[40deg]`} />
      <Blossom className={`${abs} left-[44%] top-[6%] w-[13%] rotate-[20deg]`} />
      <Blossom className={`${abs} left-[26%] top-[26%] w-[10%] -rotate-[15deg]`} tone="#dcebf8" />
      <Blossom className={`${abs} left-[62%] top-[52%] w-[11%] rotate-[65deg]`} />
      <Blossom className={`${abs} left-[36%] top-[58%] w-[8%] rotate-[100deg]`} tone="#b3cfe9" />
      <Blossom className={`${abs} left-[74%] top-[10%] w-[8%] -rotate-[30deg] opacity-90`} tone="#d5e6f5"/>
    </div>
  );
}

/** Tall arrangement for page edges — flowers cascade vertically. */
export function EdgeCluster({ className = '', style, leafTone = '#8fa6ba' }: ClusterProps) {
  return (
    <div className={pos(className)} style={{ aspectRatio: '1 / 2.1', ...style }} aria-hidden="true">
      <LeafSpray tone={leafTone} className={`${abs} left-[8%] top-[-3%] w-[64%] rotate-[150deg]`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[18%] top-[36%] w-[60%] rotate-[35deg] opacity-90`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[-4%] top-[64%] w-[58%] -rotate-[130deg]`} />
      <BabyBreath className={`${abs} left-[34%] top-[12%] w-[52%] rotate-[75deg]`} />
      <BabyBreath className={`${abs} left-[2%] top-[52%] w-[48%] -rotate-[60deg] opacity-85`} />

      <BlueRose variant="royal" className={`${abs} left-[-4%] top-[2%] w-[70%] rotate-[8deg] drop-shadow-md`} />
      <BlueRose variant="navy" className={`${abs} left-[24%] top-[22%] w-[58%] -rotate-[40deg] drop-shadow`} />
      <BlueRose variant="sky" className={`${abs} left-[-2%] top-[42%] w-[52%] rotate-[95deg] drop-shadow`} />
      <BlueRose variant="powder" className={`${abs} left-[26%] top-[58%] w-[44%] rotate-[150deg] opacity-95`} />
      <BlueRose variant="navy" className={`${abs} left-[2%] top-[74%] w-[50%] -rotate-[15deg] drop-shadow`} />

      <Bud variant="royal" className={`${abs} left-[58%] top-[48%] w-[20%] rotate-[50deg]`} />
      <Bud variant="sky" className={`${abs} left-[52%] top-[6%] w-[18%] -rotate-[25deg]`} />
      <Blossom className={`${abs} left-[42%] top-[16%] w-[18%] rotate-[30deg]`} />
      <Blossom className={`${abs} left-[10%] top-[36%] w-[15%] -rotate-[10deg]`} tone="#dcebf8" />
      <Blossom className={`${abs} left-[48%] top-[70%] w-[16%] rotate-[85deg]`} />
      <Blossom className={`${abs} left-[20%] top-[90%] w-[13%] rotate-[45deg]`} tone="#b3cfe9" />
    </div>
  );
}

/** Wide horizontal garland for top/bottom borders. */
export function GarlandCluster({ className = '', style, leafTone = '#8fa6ba' }: ClusterProps) {
  return (
    <div className={pos(className)} style={{ aspectRatio: '3.2 / 1', ...style }} aria-hidden="true">
      <LeafSpray tone={leafTone} className={`${abs} left-[-2%] top-[-14%] w-[17%] rotate-[125deg]`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[20%] top-[10%] w-[16%] rotate-[80deg] opacity-90`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[46%] top-[-16%] w-[17%] rotate-[105deg]`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[70%] top-[6%] w-[16%] rotate-[70deg] opacity-85`} />
      <LeafSpray tone={leafTone} className={`${abs} left-[86%] top-[-12%] w-[15%] rotate-[115deg]`} />
      <BabyBreath className={`${abs} left-[10%] top-[-20%] w-[14%] rotate-[15deg]`} />
      <BabyBreath className={`${abs} left-[38%] top-[8%] w-[13%] -rotate-[35deg] opacity-90`} />
      <BabyBreath className={`${abs} left-[62%] top-[-18%] w-[13%] rotate-[45deg]`} />
      <BabyBreath className={`${abs} left-[88%] top-[10%] w-[12%] -rotate-[20deg] opacity-85`} />

      <BlueRose variant="navy" className={`${abs} left-[0%] top-[-8%] w-[13%] rotate-[10deg] drop-shadow-md`} />
      <BlueRose variant="sky" className={`${abs} left-[10%] top-[18%] w-[10%] rotate-[70deg]`} />
      <BlueRose variant="royal" className={`${abs} left-[19%] top-[-14%] w-[12%] -rotate-[30deg] drop-shadow`} />
      <BlueRose variant="powder" className={`${abs} left-[29%] top-[14%] w-[9%] rotate-[120deg]`} />
      <BlueRose variant="navy" className={`${abs} left-[37%] top-[-6%] w-[13%] rotate-[45deg] drop-shadow-md`} />
      <BlueRose variant="sky" className={`${abs} left-[48%] top-[16%] w-[10%] -rotate-[60deg]`} />
      <BlueRose variant="royal" className={`${abs} left-[56%] top-[-16%] w-[12%] rotate-[85deg] drop-shadow`} />
      <BlueRose variant="powder" className={`${abs} left-[66%] top-[12%] w-[9%] rotate-[25deg]`} />
      <BlueRose variant="navy" className={`${abs} left-[74%] top-[-10%] w-[13%] -rotate-[15deg] drop-shadow-md`} />
      <BlueRose variant="royal" className={`${abs} left-[86%] top-[8%] w-[11%] rotate-[60deg] drop-shadow`} />

      <Bud variant="sky" className={`${abs} left-[15%] top-[30%] w-[4%] rotate-[20deg]`} />
      <Bud variant="royal" className={`${abs} left-[52%] top-[34%] w-[4%] -rotate-[30deg]`} />
      <Bud variant="sky" className={`${abs} left-[82%] top-[30%] w-[4%] rotate-[15deg]`} />
      <Blossom className={`${abs} left-[7%] top-[4%] w-[5%] rotate-[35deg]`} />
      <Blossom className={`${abs} left-[26%] top-[-4%] w-[4%] -rotate-[20deg]`} tone="#dcebf8" />
      <Blossom className={`${abs} left-[44%] top-[26%] w-[5%] rotate-[75deg]`} />
      <Blossom className={`${abs} left-[63%] top-[-8%] w-[4%] rotate-[110deg]`} tone="#b3cfe9" />
      <Blossom className={`${abs} left-[80%] top-[20%] w-[5%] -rotate-[45deg]`} tone="#d5e6f5" />
      <Blossom className={`${abs} left-[95%] top-[-6%] w-[4%] rotate-[55deg]`} />
    </div>
  );
}
