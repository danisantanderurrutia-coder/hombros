import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Sparkles, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function SyntropyGauge({ gamma, gammaStatus, gammaTitle, H }) {
  // Angular range: -90 deg (left, extreme entropy) to +90 deg (right, extreme syntropy)
  // Gamma typical bounds: -0.08 to +0.08 / year
  const minGamma = -0.08;
  const maxGamma = 0.08;
  const clampedGamma = Math.max(minGamma, Math.min(maxGamma, gamma));

  // Map gamma to angle in degrees (-90 to +90)
  const angleDeg = (clampedGamma / maxGamma) * 90;

  // Center and radius
  const cx = 160;
  const cy = 150;
  const r = 110;

  // Arc path generator
  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');
  };

  return (
    <div className="rounded-3xl p-5 card-slate border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <h3 className="font-serif font-bold text-white text-sm">
            Velocímetro de Ciclaje Sintrópico
          </h3>
        </div>
        <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold uppercase ${
          gammaStatus === 'sintropia' 
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50' 
            : gammaStatus === 'entropia' 
              ? 'bg-rose-950/80 text-rose-300 border-rose-500/50' 
              : 'bg-amber-950/80 text-amber-300 border-amber-500/50'
        }`}>
          {gammaTitle}
        </span>
      </div>

      {/* SVG Analog Gauge */}
      <div className="relative w-full flex items-center justify-center my-1">
        <svg viewBox="0 0 320 180" className="w-full max-w-[320px] h-auto select-none overflow-visible">
          <defs>
            <filter id="gaugeShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Background Track */}
          <path
            d={describeArc(cx, cy, r, -90, 90)}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Zone 1: Entropic Degradation (Red, -90 deg to -34 deg) */}
          <path
            d={describeArc(cx, cy, r, -90, -34)}
            fill="none"
            stroke="#f43f5e"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Zone 2: Stationary / Dynamic Balance (Amber, -34 deg to +34 deg) */}
          <path
            d={describeArc(cx, cy, r, -34, 34)}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="14"
            opacity="0.8"
          />

          {/* Zone 3: Syntropic Order (Emerald, +34 deg to +90 deg) */}
          <path
            d={describeArc(cx, cy, r, 34, 90)}
            fill="none"
            stroke="#34d399"
            strokeWidth="14"
            strokeLinecap="round"
            opacity="0.8"
          />

          {/* Zone Labels */}
          <text x="50" y="165" className="text-[9px] font-mono font-bold fill-rose-400">ENTROPÍA</text>
          <text x="160" y="46" textAnchor="middle" className="text-[9px] font-mono font-bold fill-amber-300">ESTACIONARIO</text>
          <text x="270" y="165" textAnchor="end" className="text-[9px] font-mono font-bold fill-emerald-400">SINTROPÍA</text>

          {/* ROTATING NEEDLE */}
          <motion.g
            animate={{ rotate: angleDeg }}
            transition={{ type: 'spring', stiffness: 60, damping: 15 }}
            style={{ originX: `${cx}px`, originY: `${cy}px` }}
          >
            {/* Needle body */}
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - r + 8}
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#gaugeShadow)"
            />
            {/* Red accent needle tip */}
            <polygon
              points={`${cx - 4},${cy - r + 16} ${cx + 4},${cy - r + 16} ${cx},${cy - r + 4}`}
              fill={gamma >= 0 ? '#34d399' : '#f43f5e'}
            />
          </motion.g>

          {/* Center Pivot Cap */}
          <circle cx={cx} cy={cy} r="10" fill="#180e25" stroke="#ffffff" strokeWidth="2.5" />
          <circle cx={cx} cy={cy} r="4" fill={gamma >= 0 ? '#34d399' : '#f43f5e'} />
        </svg>
      </div>

      {/* Digital Readout & Metric */}
      <div className="p-3 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between text-xs font-mono">
        <div>
          <span className="text-[10px] text-slate-400 uppercase block">Derivada Temporal (Γ):</span>
          <strong className={`text-base ${
            gamma > 0 ? 'text-emerald-400' : gamma === 0 ? 'text-amber-300' : 'text-rose-400'
          }`}>
            {gamma >= 0 ? `+${gamma.toFixed(3)}` : gamma.toFixed(3)} <span className="text-xs text-slate-400 font-normal">año⁻¹</span>
          </strong>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 uppercase block">Capacidad Base:</span>
          <strong className="text-sm text-white">H = {H.toFixed(3)}</strong>
        </div>
      </div>
    </div>
  );
}
