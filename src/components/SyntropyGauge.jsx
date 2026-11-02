import React, { useState, useMemo } from 'react';
import { Activity, Sparkles, TrendingUp, TrendingDown, RefreshCw, ZoomIn, Info, ShieldCheck, AlertTriangle } from 'lucide-react';
import { InlineMath } from './KaTeXMath';

export default function SyntropyGauge({ gamma = 0, gammaStatus = 'estacionario', gammaTitle = 'Equilibrio Dinámico', H = 0.60 }) {
  // Configurable zoom scale for higher detail (precision vs standard vs macro)
  const [scaleMode, setScaleMode] = useState('standard'); // 'precision' (±0.04) | 'standard' (±0.08) | 'macro' (±0.16)

  const maxGamma = useMemo(() => {
    switch (scaleMode) {
      case 'precision': return 0.04;
      case 'macro': return 0.16;
      case 'standard':
      default: return 0.08;
    }
  }, [scaleMode]);

  const minGamma = -maxGamma;
  const clampedGamma = Math.max(minGamma, Math.min(maxGamma, gamma));

  // Map gamma to angle in degrees (-90 deg = full left/entropy, 0 = vertical/stationary, +90 deg = full right/syntropy)
  const angleDeg = (clampedGamma / maxGamma) * 90;

  // Center and radius
  const cx = 170;
  const cy = 160;
  const r = 115;

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

  // Generate tick marks along the arc
  const ticks = useMemo(() => {
    const tickList = [];
    const stepCount = 16; // 16 subdivisions
    for (let i = 0; i <= stepCount; i++) {
      const fraction = i / stepCount; // 0 to 1
      const tickAngle = -90 + fraction * 180;
      const tickValue = minGamma + fraction * (maxGamma - minGamma);
      const isMajor = i % 4 === 0;
      const isSemi = i % 2 === 0;

      const innerR = isMajor ? r - 14 : isSemi ? r - 9 : r - 5;
      const outerR = r + 2;

      const p1 = polarToCartesian(cx, cy, innerR, tickAngle);
      const p2 = polarToCartesian(cx, cy, outerR, tickAngle);

      // Label coordinate slightly inside
      const labelP = polarToCartesian(cx, cy, r - 24, tickAngle);

      tickList.push({
        angle: tickAngle,
        p1,
        p2,
        labelP,
        value: tickValue,
        isMajor,
        label: isMajor ? (tickValue >= 0 ? `+${tickValue.toFixed(2)}` : tickValue.toFixed(2)) : null
      });
    }
    return tickList;
  }, [minGamma, maxGamma, cx, cy, r]);

  // Derived detail metrics
  const annualDeltaH = H * gamma;
  const doublingOrHalfLifeYears = Math.abs(gamma) > 0.005 ? Math.abs(Math.log(2) / gamma).toFixed(1) : '∞';

  return (
    <div className="rounded-3xl p-5 card-slate border border-[#927660]/30 shadow-xl flex flex-col justify-between relative overflow-hidden bg-white/95">
      {/* Header with Title and Mode Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D4C9B8]">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#487075] text-white shadow-xs">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-extrabold text-black text-sm sm:text-base">
              Acelerómetro de Ciclaje Sintrópico (Γ)
            </h3>
          </div>
          <p className="text-[11px] text-black font-medium mt-0.5">
            Velocímetro constitutivo: <InlineMath math="\Gamma = \frac{1}{H} \frac{dH}{dt}" />
          </p>
        </div>

        {/* Zoom Selector for High Detail */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#FAF7F0] p-1 rounded-xl border border-[#DDD5C5]">
          <span className="text-[9px] font-mono uppercase font-bold text-black pl-1.5 flex items-center gap-1">
            <ZoomIn className="w-3 h-3 text-[#487075]" /> Detalle:
          </span>
          <button
            onClick={() => setScaleMode('precision')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
              scaleMode === 'precision'
                ? 'bg-[#487075] text-white shadow-xs'
                : 'text-black hover:bg-black/5'
            }`}
            title="Escala Fina (±0.04/año) para ver micro-oscilaciones con 2x de aumento"
          >
            Fina ±0.04
          </button>
          <button
            onClick={() => setScaleMode('standard')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
              scaleMode === 'standard'
                ? 'bg-[#487075] text-white shadow-xs'
                : 'text-black hover:bg-black/5'
            }`}
            title="Escala Estándar (±0.08/año)"
          >
            Normal ±0.08
          </button>
          <button
            onClick={() => setScaleMode('macro')}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold transition-all ${
              scaleMode === 'macro'
                ? 'bg-[#487075] text-white shadow-xs'
                : 'text-black hover:bg-black/5'
            }`}
            title="Escala Macro (±0.16/año) para evaluar megasequías y perturbaciones severas"
          >
            Macro ±0.16
          </button>
        </div>
      </div>

      {/* SVG Analog Gauge */}
      <div className="relative w-full flex items-center justify-center my-2">
        <svg viewBox="0 0 340 195" className="w-full max-w-[340px] h-auto select-none overflow-visible">
          <defs>
            <linearGradient id="entropyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C86D51" />
              <stop offset="100%" stopColor="#E2927A" />
            </linearGradient>
            <linearGradient id="steadyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D4A373" />
              <stop offset="100%" stopColor="#E5BE92" />
            </linearGradient>
            <linearGradient id="syntropyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7DB2B2" />
              <stop offset="100%" stopColor="#487075" />
            </linearGradient>

            <filter id="needleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Track Arc */}
          <path
            d={describeArc(cx, cy, r, -90, 90)}
            fill="none"
            stroke="#E9E2D5"
            strokeWidth="18"
            strokeLinecap="round"
          />

          {/* Zone 1: Entropic Degradation (Terracotta / Coral, -90 deg to -28 deg) */}
          <path
            d={describeArc(cx, cy, r, -90, -28)}
            fill="none"
            stroke="url(#entropyGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Zone 2: Stationary / Dynamic Balance (Travertino / Brass, -28 deg to +28 deg) */}
          <path
            d={describeArc(cx, cy, r, -28, 28)}
            fill="none"
            stroke="url(#steadyGradient)"
            strokeWidth="14"
          />

          {/* Zone 3: Syntropic Order (Celadón / Teal, +28 deg to +90 deg) */}
          <path
            d={describeArc(cx, cy, r, 28, 90)}
            fill="none"
            stroke="url(#syntropyGradient)"
            strokeWidth="14"
            strokeLinecap="round"
          />

          {/* Minor & Major Ticks */}
          {ticks.map((t, idx) => (
            <g key={idx}>
              <line
                x1={t.p1.x}
                y1={t.p1.y}
                x2={t.p2.x}
                y2={t.p2.y}
                stroke={t.isMajor ? '#1E293B' : '#78716C'}
                strokeWidth={t.isMajor ? '2' : '1'}
                strokeLinecap="round"
              />
              {t.label && (
                <text
                  x={t.labelP.x}
                  y={t.labelP.y + 3}
                  textAnchor="middle"
                  className="text-[9px] font-mono font-extrabold fill-slate-900"
                >
                  {t.label}
                </text>
              )}
            </g>
          ))}

          {/* Arc Sector Labels */}
          <text x="56" y="180" className="text-[10px] font-mono font-extrabold fill-[#C86D51]">
            ENTROPÍA
          </text>
          <text x="170" y="42" textAnchor="middle" className="text-[10px] font-mono font-extrabold fill-[#927660]">
            ESTACIONARIO
          </text>
          <text x="284" y="180" textAnchor="end" className="text-[10px] font-mono font-extrabold fill-[#487075]">
            SINTROPÍA
          </text>

          {/* ROCK-SOLID NEEDLE WITH PERFECT PIVOT ROTATION */}
          <g
            transform={`rotate(${angleDeg}, ${cx}, ${cy})`}
            style={{
              transition: 'transform 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)'
            }}
            filter="url(#needleGlow)"
          >
            {/* Needle Rear Counterweight */}
            <circle cx={cx} cy={cy + 18} r="6" fill="#28475A" />
            <line x1={cx} y1={cy + 18} x2={cx} y2={cy} stroke="#28475A" strokeWidth="3" />

            {/* Needle Body (Brass/Steel shaft) */}
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - r + 6}
              stroke="#1E293B"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Needle Centerline Groove */}
            <line
              x1={cx}
              y1={cy}
              x2={cx}
              y2={cy - r + 14}
              stroke="#FFFFFF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* Vivid Pointer Arrowhead */}
            <polygon
              points={`${cx - 5},${cy - r + 16} ${cx + 5},${cy - r + 16} ${cx},${cy - r - 2}`}
              fill={gamma >= 0 ? '#487075' : '#C86D51'}
              stroke="#1E293B"
              strokeWidth="1"
            />
          </g>

          {/* Central Pivot Metallic Hub */}
          <circle cx={cx} cy={cy} r="12" fill="#FAF7F0" stroke="#1E293B" strokeWidth="3" />
          <circle cx={cx} cy={cy} r="6" fill={gamma >= 0 ? '#487075' : '#C86D51'} />
          <circle cx={cx} cy={cy} r="2" fill="#FFFFFF" />
        </svg>
      </div>

      {/* High-Detail Analytical Diagnostics Card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
        {/* Metric 1: Derivada Temporal Γ */}
        <div className="p-3 rounded-2xl bg-[#FAF7F0] border border-[#DDD5C5] shadow-2xs">
          <span className="text-[10px] font-mono uppercase font-bold text-black block mb-0.5">
            Velocidad (Γ):
          </span>
          <div className="flex items-baseline gap-1">
            <strong className={`text-base font-mono font-black ${
              gamma > 0.01 ? 'text-[#487075]' : gamma < -0.01 ? 'text-[#C86D51]' : 'text-black'
            }`}>
              {gamma >= 0 ? `+${gamma.toFixed(4)}` : gamma.toFixed(4)}
            </strong>
            <span className="text-[10px] text-black font-semibold">año⁻¹</span>
          </div>
          <span className="text-[9px] text-black font-medium block mt-0.5">
            {gamma > 0.03 ? '🌱 Ganando biomasa viva' : gamma < -0.03 ? '⚠️ Senescencia acelerada' : '⚖️ Flujo en equilibrio'}
          </span>
        </div>

        {/* Metric 2: Cambio Neto Anual en Capacidad */}
        <div className="p-3 rounded-2xl bg-[#E2F4F2] border border-[#7DB2B2] shadow-2xs">
          <span className="text-[10px] font-mono uppercase font-bold text-black block mb-0.5">
            Balance Anual (ΔH):
          </span>
          <div className="flex items-baseline gap-1">
            <strong className="text-base font-mono font-black text-black">
              {annualDeltaH >= 0 ? `+${annualDeltaH.toFixed(4)}` : annualDeltaH.toFixed(4)}
            </strong>
            <span className="text-[10px] text-black font-semibold">pts/año</span>
          </div>
          <span className="text-[9px] text-black font-medium block mt-0.5">
            Capacidad base: <strong>H = {H.toFixed(3)}</strong>
          </span>
        </div>

        {/* Metric 3: Horizonte Temporal Proyectado */}
        <div className="p-3 rounded-2xl bg-[#FEECE8] border border-[#F4A79D] shadow-2xs">
          <span className="text-[10px] font-mono uppercase font-bold text-black block mb-0.5">
            Tiempo de Respuesta:
          </span>
          <div className="flex items-baseline gap-1">
            <strong className="text-base font-mono font-black text-black">
              {doublingOrHalfLifeYears}
            </strong>
            <span className="text-[10px] text-black font-semibold">años</span>
          </div>
          <span className="text-[9px] text-black font-medium block mt-0.5">
            {gamma > 0 ? 'Para duplicar capacidad' : gamma < 0 ? 'Para fractura estructural' : 'Régimen estacionario'}
          </span>
        </div>
      </div>
    </div>
  );
}
