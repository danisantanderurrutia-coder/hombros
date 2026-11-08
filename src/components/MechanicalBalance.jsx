import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Scale, Sparkles, AlertTriangle, ShieldCheck, ShieldAlert, Compass } from 'lucide-react';

export default function MechanicalBalance({ santanderState }) {
  const { D, H, sigma, trafficLight } = santanderState;

  // Factor of Safety: FS = H / D
  const factorOfSafety = useMemo(() => {
    return D > 0.001 ? parseFloat((H / D).toFixed(2)) : 9.99;
  }, [D, H]);

  // Margin of reserve (positive = safe reserve, negative = overdrawn deficit)
  const marginReserve = parseFloat((H - D).toFixed(3));

  // Angular deflection theta (degrees)
  // Positive angle tilts right-down (extractivism overload)
  // Negative angle tilts left-down (carrying capacity dominance)
  const tiltDeg = useMemo(() => {
    const rawDelta = D - H;
    // Damped between -14 deg and +16 deg for organic aesthetic balance
    const deg = Math.max(-14, Math.min(16, rawDelta * 16));
    return parseFloat(deg.toFixed(1));
  }, [D, H]);

  // Visual status badge
  const statusInfo = useMemo(() => {
    if (sigma < 0.85) {
      return {
        label: 'Equilibrio Sintrópico Seguro',
        badge: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 ring-1 ring-emerald-500/30',
        textColor: 'text-emerald-400',
        barColor: 'bg-emerald-400',
        desc: 'Los hombros sostienen con holgura la carga. El territorio acumula margen biofísico.'
      };
    } else if (sigma <= 1.00) {
      return {
        label: 'Zona de Fatiga / Ajuste',
        badge: 'bg-amber-950/80 border-amber-500/60 text-amber-300 ring-1 ring-amber-500/30',
        textColor: 'text-amber-400',
        barColor: 'bg-amber-400',
        desc: 'Tensión próxima al límite elástico. Se requiere moderar la presión extractiva.'
      };
    } else {
      return {
        label: 'Sobrecarga y Riesgo de Falla',
        badge: 'bg-rose-950/90 border-rose-500 text-rose-200 ring-1 ring-rose-500/50',
        textColor: 'text-rose-400',
        barColor: 'bg-rose-500',
        desc: 'La carga externa vence la resistencia estructural. Deformación permanente en curso.'
      };
    }
  }, [sigma]);

  // Sphere visual sizes for pans
  const leftSpheresCount = Math.max(1, Math.min(5, Math.round(H * 5)));
  const rightSpheresCount = Math.max(1, Math.min(5, Math.round(D * 3.5)));

  return (
    <div className="rounded-3xl p-6 sm:p-7 card-slate border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Soft warm ambient radial halo */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-25 ${
        sigma < 0.85 
          ? 'bg-gradient-to-r from-emerald-500/20 via-transparent to-teal-500/20' 
          : sigma <= 1.00 
            ? 'bg-gradient-to-r from-amber-500/25 via-transparent to-purple-500/20' 
            : 'bg-gradient-to-r from-rose-500/30 via-transparent to-red-600/25'
      }`} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#DA7B93]" />
            <h3 className="text-xl font-bold font-serif text-white tracking-wide">
              Balanza de Esfuerzos y Margen de Reserva
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Equilibrio dinámico entre la <strong>Capacidad Portante (H)</strong> y la <strong>Carga de Desarrollo (D)</strong>
          </p>
        </div>

        {/* Readout Badges */}
        <div className="flex items-center gap-3">
          {/* Factor of Safety */}
          <div className={`px-4 py-2 rounded-2xl border ${statusInfo.badge} shadow-lg text-right`}>
            <span className="text-[10px] font-mono uppercase tracking-wider block opacity-80">
              Factor Seguridad (H/D)
            </span>
            <div className="text-xl font-mono font-bold flex items-baseline justify-end gap-1">
              <span>{factorOfSafety.toFixed(2)}x</span>
            </div>
          </div>

          {/* Reserve Margin */}
          <div className="px-4 py-2 rounded-2xl border bg-black/50 border-white/10 text-right">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
              Margen (H − D)
            </span>
            <strong className={`text-xl font-mono ${marginReserve >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {marginReserve > 0 ? `+${marginReserve.toFixed(2)}` : marginReserve.toFixed(2)}
            </strong>
          </div>
        </div>
      </div>

      {/* THE BALANCED RIG (ORGANIC WARM SVG) */}
      <div className="relative z-10 w-full flex items-center justify-center py-4 select-none">
        <svg viewBox="0 0 620 220" className="w-full max-w-2xl h-auto overflow-visible">
          <defs>
            {/* Beam Metallic Finish */}
            <linearGradient id="beamMetalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#487075" />
              <stop offset="50%" stopColor="#A4B3B6" />
              <stop offset="100%" stopColor="#C86D51" />
            </linearGradient>

            {/* Brass Pedestal Gradient */}
            <linearGradient id="brassPedestalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#927660" />
              <stop offset="50%" stopColor="#78350F" />
              <stop offset="100%" stopColor="#28475A" />
            </linearGradient>

            {/* Pan Soft Glow */}
            <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Center Pedestal Tower */}
          <polygon points="310,95 285,185 335,185" fill="url(#brassPedestalGrad)" opacity="0.9" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <ellipse cx="310" cy="185" rx="38" ry="8" fill="#140b20" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
          
          {/* Base Inclinometer Level Arc */}
          <path d="M 270 178 A 45 45 0 0 1 350 178" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
          
          {/* Inclinometer indicator needle */}
          <line
            x1="310"
            y1="185"
            x2={310 + tiltDeg * 2.2}
            y2="165"
            stroke={sigma < 0.85 ? '#34d399' : sigma <= 1.0 ? '#fbbf24' : '#f43f5e'}
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Central Fulcrum Jewel Bearing */}
          <circle cx="310" cy="95" r="9" fill="#140b20" stroke="#927660" strokeWidth="2.5" />
          <circle cx="310" cy="95" r="4" fill="#ffffff" filter="url(#softGlow)" />

          {/* =================================================================
              TILTING BEAM (Smooth Spring Animation around Center Pivot 310, 95)
              ================================================================= */}
          <motion.g
            animate={{ rotate: tiltDeg }}
            transition={{ type: 'spring', stiffness: 70, damping: 14 }}
            style={{ originX: '310px', originY: '95px' }}
          >
            {/* The Sculpted Beam */}
            <path
              d="M 120 95 Q 215 90 310 93 Q 405 90 500 95 L 498 99 Q 405 96 310 97 Q 215 96 122 99 Z"
              fill="url(#beamMetalGrad)"
              filter="url(#softGlow)"
            />

            {/* Left Suspension Hook */}
            <circle cx="120" cy="97" r="4" fill="#487075" stroke="#ffffff" strokeWidth="1.5" />
            
            {/* Right Suspension Hook */}
            <circle cx="500" cy="97" r="4" fill="#C86D51" stroke="#ffffff" strokeWidth="1.5" />

            {/* -------------------------------------------------------------
                LEFT SUSPENDED PAN (Hombros / Capacidad H)
                ------------------------------------------------------------- */}
            {/* Left Strings */}
            <line x1="120" y1="97" x2="85" y2="148" stroke="rgba(55,110,111,0.6)" strokeWidth="1.5" />
            <line x1="120" y1="97" x2="155" y2="148" stroke="rgba(55,110,111,0.6)" strokeWidth="1.5" />

            {/* Left Pan Saucer */}
            <path
              d="M 80 148 Q 120 162 160 148 Z"
              fill="rgba(55,110,111,0.4)"
              stroke="#376E6F"
              strokeWidth="2"
              filter="url(#softGlow)"
            />

            {/* Biocapacity Orbs in Left Pan (Proportional to H) */}
            <g transform="translate(120, 142)">
              {Array.from({ length: leftSpheresCount }).map((_, i) => (
                <circle
                  key={`left-orb-${i}`}
                  cx={(i - (leftSpheresCount - 1) / 2) * 12}
                  cy={-8}
                  r={8 + H * 4}
                  fill="url(#brassPedestalGrad)"
                  stroke="#376E6F"
                  strokeWidth="1.5"
                  className="animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </g>

            {/* Left Pan Label */}
            <text x="120" y="180" textAnchor="middle" className="text-[12px] font-serif font-bold fill-[#376E6F]">
              Hombros: H = {H.toFixed(2)}
            </text>
            <text x="120" y="194" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
              [Sostén Territorial]
            </text>

            {/* -------------------------------------------------------------
                RIGHT SUSPENDED PAN (Carga / Presión D)
                ------------------------------------------------------------- */}
            {/* Right Strings */}
            <line x1="500" y1="97" x2="465" y2="148" stroke="rgba(200,109,81,0.6)" strokeWidth="1.5" />
            <line x1="500" y1="97" x2="535" y2="148" stroke="rgba(200,109,81,0.6)" strokeWidth="1.5" />

            {/* Right Pan Saucer */}
            <path
              d="M 460 148 Q 500 162 540 148 Z"
              fill="rgba(200,109,81,0.3)"
              stroke="#C86D51"
              strokeWidth="2"
              filter="url(#softGlow)"
            />

            {/* Extractive Load Blocks in Right Pan (Proportional to D) */}
            <g transform="translate(500, 142)">
              {Array.from({ length: rightSpheresCount }).map((_, i) => (
                <rect
                  key={`right-block-${i}`}
                  x={(i - (rightSpheresCount - 1) / 2) * 12 - 7}
                  y={-14}
                  width="14"
                  height="12"
                  rx="3"
                  fill="#f43f5e"
                  stroke="#ffffff"
                  strokeWidth="1.2"
                  opacity="0.85"
                />
              ))}
            </g>

            {/* Right Pan Label */}
            <text x="500" y="180" textAnchor="middle" className="text-[12px] font-serif font-bold fill-[#DA7B93]">
              Carga Externa: D = {D.toFixed(2)}
            </text>
            <text x="500" y="194" textAnchor="middle" className="text-[9px] font-mono fill-slate-400">
              [Presión de Desarrollo]
            </text>
          </motion.g>
        </svg>
      </div>

      {/* Human Interpretation Footer */}
      <div className={`p-3.5 rounded-2xl border text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10 transition-all ${
        sigma < 0.85 
          ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200' 
          : sigma <= 1.00 
            ? 'bg-amber-950/40 border-amber-500/30 text-amber-200' 
            : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-base">{sigma < 0.85 ? '✨' : sigma <= 1.00 ? '⚠️' : '🚨'}</span>
          <span><strong>Diagnóstico:</strong> {statusInfo.desc}</span>
        </div>
        <div className="text-[11px] font-bold uppercase tracking-wider shrink-0 text-slate-300">
          Inclinación: <span className="text-white font-mono">{tiltDeg > 0 ? `+${tiltDeg}` : tiltDeg}°</span> {tiltDeg > 0 ? '(Sobrecarga Extractiva)' : '(Reserva Holgada)'}
        </div>
      </div>
    </div>
  );
}
