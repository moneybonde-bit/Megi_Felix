import { CSSProperties, useId } from 'react';

/**
 * Blue monochrome floral SVG library.
 * All flowers are procedurally drawn — zero image downloads, fully scalable,
 * and locked to the blue wedding palette (baby blue → navy).
 */

export type RoseVariant = 'navy' | 'royal' | 'sky' | 'powder';

interface FlowerProps {
  className?: string;
  style?: CSSProperties;
}

interface RoseProps extends FlowerProps {
  variant?: RoseVariant;
}

/* ------------------------------------------------------------------ */
/* Palette helpers                                                     */
/* ------------------------------------------------------------------ */

const ROSE_PALETTES: Record<RoseVariant, string[]> = {
  // outer ring → inner ring
  navy: ['#14283f', '#1b3654', '#25476d', '#325d8a', '#4676a6'],
  royal: ['#1d3f70', '#265092', '#3264ae', '#477dc4', '#6698d6'],
  sky: ['#3b6da6', '#4d82ba', '#6398cc', '#80b0dc', '#a0c6e8'],
  powder: ['#7ba3cc', '#92b7da', '#abc9e6', '#c4dbf0', '#daeaf8'],
};

function clamp(v: number) {
  return Math.min(255, Math.max(0, Math.round(v)));
}

/** Lighten (amt > 0) or darken (amt < 0) a hex color. */
function shade(hex: string, amt: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = clamp(((n >> 16) & 255) + 255 * amt);
  const g = clamp(((n >> 8) & 255) + 255 * amt);
  const b = clamp((n & 255) + 255 * amt);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** Deterministic pseudo-random jitter so renders are stable. */
function jitter(seed: number, range: number): number {
  return (((seed * 7919 + 104729) % 1000) / 1000 - 0.5) * 2 * range;
}

/* ------------------------------------------------------------------ */
/* Rose — layered top-view garden rose                                 */
/* ------------------------------------------------------------------ */

interface Ring {
  count: number;
  radius: number;
  len: number;
  wid: number;
  offset: number;
}

const ROSE_RINGS: Ring[] = [
  { count: 9, radius: 56, len: 54, wid: 42, offset: 0 },
  { count: 8, radius: 41, len: 46, wid: 35, offset: 22 },
  { count: 7, radius: 29, len: 37, wid: 28, offset: 8 },
  { count: 5, radius: 17, len: 28, wid: 22, offset: 30 },
];

function petalPath(len: number, wid: number): string {
  const w = wid / 2;
  // Rounded cup-shaped petal (soft tip) for a garden-rose look.
  return `M0,${len * 0.18}
    C ${-w},${len * 0.06} ${-w * 1.12},${-len * 0.5} ${-w * 0.62},${-len * 0.82}
    Q 0,${-len * 1.04} ${w * 0.62},${-len * 0.82}
    C ${w * 1.12},${-len * 0.5} ${w},${len * 0.06} 0,${len * 0.18} Z`;
}

export function BlueRose({ variant = 'royal', className = '', style }: RoseProps) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const colors = ROSE_PALETTES[variant];

  return (
    <svg viewBox="0 0 200 200" className={className} style={style} aria-hidden="true">
      <defs>
        {ROSE_RINGS.map((_, i) => (
          <linearGradient key={i} id={`${uid}p${i}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={shade(colors[i], -0.16)} />
            <stop offset="70%" stopColor={colors[i]} />
            <stop offset="100%" stopColor={shade(colors[i], 0.14)} />
          </linearGradient>
        ))}
        <radialGradient id={`${uid}c`}>
          <stop offset="0%" stopColor={shade(colors[4], -0.28)} />
          <stop offset="100%" stopColor={shade(colors[3], -0.1)} />
        </radialGradient>
      </defs>

      {ROSE_RINGS.map((ring, ri) => (
        <g key={ri}>
          {Array.from({ length: ring.count }).map((_, pi) => {
            const angle =
              ring.offset + (360 / ring.count) * pi + jitter(ri * 31 + pi, 7);
            const scale = 1 + jitter(ri * 17 + pi * 3, 0.08);
            return (
              <path
                key={pi}
                d={petalPath(ring.len, ring.wid)}
                fill={`url(#${uid}p${ri})`}
                stroke={shade(colors[ri], -0.24)}
                strokeWidth="1"
                strokeOpacity="0.45"
                transform={`translate(100 100) rotate(${angle}) translate(0 ${-ring.radius}) scale(${scale})`}
              />
            );
          })}
        </g>
      ))}

      {/* Center whorl */}
      <circle cx="100" cy="100" r="13" fill={`url(#${uid}c)`} />
      <path
        d="M100,92 a8,8 0 1,1 -8,8 a6,6 0 1,0 6,-6 a4,4 0 1,1 -2,4"
        fill="none"
        stroke={shade(colors[4], -0.35)}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Blossom — small 5-petal filler flower (pale blue)                   */
/* ------------------------------------------------------------------ */

export function Blossom({ className = '', style, tone = '#c9def2' }: FlowerProps & { tone?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}b`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={shade(tone, -0.14)} />
          <stop offset="100%" stopColor={shade(tone, 0.1)} />
        </linearGradient>
      </defs>
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d="M0,6 C -13,-2 -15,-22 -8,-31 Q 0,-39 8,-31 C 15,-22 13,-2 0,6 Z"
          fill={`url(#${uid}b)`}
          stroke={shade(tone, -0.22)}
          strokeWidth="1"
          strokeOpacity="0.5"
          transform={`translate(50 50) rotate(${72 * i + jitter(i, 6)}) translate(0 -8)`}
        />
      ))}
      <circle cx="50" cy="50" r="7" fill={shade(tone, 0.12)} />
      {Array.from({ length: 6 }).map((_, i) => (
        <circle
          key={i}
          cx={50 + Math.cos((i * Math.PI) / 3) * 4.5}
          cy={50 + Math.sin((i * Math.PI) / 3) * 4.5}
          r="1.6"
          fill="#3b6da6"
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Bud — closed rosebud with sepals                                    */
/* ------------------------------------------------------------------ */

export function Bud({ variant = 'royal', className = '', style }: RoseProps) {
  const c = ROSE_PALETTES[variant];
  return (
    <svg viewBox="0 0 60 110" className={className} style={style} aria-hidden="true">
      {/* stem */}
      <path d="M30,52 C 28,72 32,90 30,108" fill="none" stroke="#7d93a8" strokeWidth="3" strokeLinecap="round" />
      {/* bud petals */}
      <path d="M30,8 C 14,16 12,40 30,54 C 48,40 46,16 30,8 Z" fill={c[1]} />
      <path d="M30,12 C 21,20 20,38 30,50 C 40,38 39,20 30,12 Z" fill={c[2]} />
      <path d="M30,18 C 26,24 25,36 30,44 C 35,36 34,24 30,18 Z" fill={c[3]} />
      {/* sepals */}
      <path d="M30,50 C 18,44 12,32 14,22 C 22,30 26,38 30,50 Z" fill="#8fa6ba" />
      <path d="M30,50 C 42,44 48,32 46,22 C 38,30 34,38 30,50 Z" fill="#a3b8c9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* LeafSpray — silver-blue foliage stem                                */
/* ------------------------------------------------------------------ */

export function LeafSpray({ className = '', style, tone = '#8fa6ba' }: FlowerProps & { tone?: string }) {
  const leaves = Array.from({ length: 9 });
  return (
    <svg viewBox="0 0 120 240" className={className} style={style} aria-hidden="true">
      <path
        d="M60,235 C 55,180 62,120 58,60 C 56,35 60,18 62,5"
        fill="none"
        stroke={shade(tone, -0.12)}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {leaves.map((_, i) => {
        const t = i / (leaves.length - 1);
        const y = 215 - t * 195;
        const side = i % 2 === 0 ? 1 : -1;
        const size = 1 - t * 0.45;
        const fill = shade(tone, (i % 3) * 0.06 - 0.02);
        return (
          <g key={i} transform={`translate(${60 + side * 2} ${y}) rotate(${side * (52 + jitter(i, 14))}) scale(${size})`}>
            <path
              d="M0,0 C -14,-10 -16,-34 0,-46 C 16,-34 14,-10 0,0 Z"
              fill={fill}
              stroke={shade(tone, -0.22)}
              strokeWidth="1"
              strokeOpacity="0.4"
            />
            <path d="M0,-4 L0,-40" stroke={shade(tone, -0.25)} strokeWidth="1" strokeOpacity="0.5" />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* BabyBreath — sprig of tiny pale-blue buds                           */
/* ------------------------------------------------------------------ */

export function BabyBreath({ className = '', style, tone = '#bdd8ef' }: FlowerProps & { tone?: string }) {
  const branches = [
    { d: 'M60,160 C 58,120 40,90 24,58', tip: [24, 58] },
    { d: 'M60,160 C 62,115 66,80 60,38', tip: [60, 38] },
    { d: 'M60,160 C 64,125 84,95 98,64', tip: [98, 64] },
    { d: 'M60,145 C 50,120 40,110 30,96', tip: [30, 96] },
    { d: 'M60,140 C 72,118 82,108 90,98', tip: [90, 98] },
  ];
  return (
    <svg viewBox="0 0 120 165" className={className} style={style} aria-hidden="true">
      {branches.map((b, i) => (
        <g key={i}>
          <path d={b.d} fill="none" stroke="#93aabf" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx={b.tip[0]} cy={b.tip[1]} r={4 + jitter(i, 1.4)} fill={shade(tone, jitter(i + 3, 0.1))} />
          <circle cx={b.tip[0] + jitter(i + 5, 10)} cy={b.tip[1] + 12} r="3" fill={shade(tone, 0.06)} />
        </g>
      ))}
      <circle cx="52" cy="112" r="3.2" fill={tone} />
      <circle cx="72" cy="104" r="2.6" fill={shade(tone, 0.08)} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Petal — single loose petal for scatter/falling effects              */
/* ------------------------------------------------------------------ */

export function Petal({ className = '', style, tone = '#9fc3e6' }: FlowerProps & { tone?: string }) {
  return (
    <svg viewBox="0 0 40 48" className={className} style={style} aria-hidden="true">
      <path
        d="M20,46 C 4,36 2,14 20,2 C 38,14 36,36 20,46 Z"
        fill={tone}
        stroke={shade(tone, -0.15)}
        strokeWidth="1"
        strokeOpacity="0.5"
      />
    </svg>
  );
}
