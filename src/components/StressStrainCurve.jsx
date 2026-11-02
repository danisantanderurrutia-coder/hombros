import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Activity, ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

export default function StressStrainCurve({ state, territory }) {
  const { sigma, regime, materialProperties } = state;
  const yieldStress = materialProperties?.yieldStress || 0.85;
  const ultimateStress = materialProperties?.ultimateStress || 1.10;
  const fractureStress = materialProperties?.fractureStress || 1.25;

  const { isFcinq } = useTheme();
  const themePrimary = isFcinq ? '#D83F87' : '#DA7B93';
  const themeSecondary = isFcinq ? '#44318D' : '#376E6F';

  // Fixed SVG Geometry Anchors
  const x0 = 70;
  const y0 = 250;

  // Landmark Points on the constitutive curve
  // 1. Yield Point (boundary of Hookean Elasticity)
  const pYieldX = 185;
  const pYieldY = 135;

  // 2. Plastic Control Apex (Bézier midpoint)
  const pCtrlX = 300;
  const pCtrlY = 82;

  // 3. Fracture Point (Ultimate failure)
  const pFractX = 450;
  const pFractY = 88;

  // ROCK-SOLID MATHEMATICAL POINT TRACKING ALONG THE EXACT CURVE
  let curX = x0;
  let curY = y0;
  let statusBadge = 'RÉGIMEN ELÁSTICO REVERSIBLE';
  let statusColor = 'text-emerald-400';

  if (sigma <= yieldStress) {
    // 100% on the linear elastic line
    const t = Math.max(0, Math.min(1.0, sigma / yieldStress));
    curX = x0 + t * (pYieldX - x0);
    curY = y0 + t * (pYieldY - y0);
    statusBadge = 'RÉGIMEN ELÁSTICO REVERSIBLE';
    statusColor = 'text-emerald-400';
  } else if (sigma <= fractureStress) {
    // 100% on the exact Quadratic Bézier Plastic Curve
    const t = Math.max(0, Math.min(1.0, (sigma - yieldStress) / (fractureStress - yieldStress)));
    const oneMinusT = 1 - t;
    curX = (oneMinusT * oneMinusT * pYieldX) + (2 * oneMinusT * t * pCtrlX) + (t * t * pFractX);
    curY = (oneMinusT * oneMinusT * pYieldY) + (2 * oneMinusT * t * pCtrlY) + (t * t * pFractY);
    statusBadge = 'DEFORMACIÓN PLÁSTICA / HISTÉRESIS';
    statusColor = 'text-amber-400';
  } else {
    // Clamped at Fracture point with emergency failure mode
    curX = pFractX;
    curY = pFractY;
    statusBadge = 'FRACTURA CATASTRÓFICA';
    statusColor = 'text-rose-400';
  }

  const isFractured = sigma >= fractureStress;

  return (
    <div className="rounded-3xl p-6 sm:p-7 card-slate border border-white/10 shadow-2xl relative overflow-hidden space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-bold font-serif text-white tracking-wide">
              Curva Reológica: Esfuerzo (σ) vs Deformación (ε)
            </h3>
          </div>
          <p className="text-xs text-slate-300 mt-0.5">
            Ley constitutiva del medio continuo territorial · Muestra el paso de la adaptación elástica al daño irreversible
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl border border-white/10 bg-black/50 shadow-inner">
          <span className="text-slate-400">ESTADO:</span>
          <span className={`font-bold ${statusColor}`}>{statusBadge}</span>
          <span className="text-slate-600">|</span>
          <strong className="text-white">σ = {sigma.toFixed(2)}</strong>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-3 shadow-inner select-none">
        <svg viewBox="0 0 520 290" className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="elasticFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#376E6F" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8D69A6" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="plasticFill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.4" />
            </linearGradient>
            <filter id="pointGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={themePrimary} floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Grid lines */}
          <line x1={x0} y1={y0} x2="490" y2={y0} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1={x0} y1="35" x2={x0} y2={y0} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* Grid ticks */}
          <line x1={x0} y1={pYieldY} x2="490" y2={pYieldY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <text x={x0 - 8} y={pYieldY + 4} textAnchor="end" className="text-[10px] font-mono fill-amber-300 font-bold">
            0.85 (Yield)
          </text>

          <line x1={x0} y1={pFractY} x2="490" y2={pFractY} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <text x={x0 - 8} y={pFractY + 4} textAnchor="end" className="text-[10px] font-mono fill-rose-400 font-bold">
            1.25 (Fractura)
          </text>

          {/* Axis Titles */}
          <text x="280" y="278" textAnchor="middle" className="text-[11px] font-mono font-bold fill-slate-300">
            Deformación Plástica Acumulada (ε) →
          </text>
          <text x="22" y="145" textAnchor="middle" transform="rotate(-90 22 145)" className="text-[11px] font-mono font-bold fill-slate-300">
            Tensión Territorial (σ = D / H) →
          </text>

          {/* Shaded Elastic Region */}
          <polygon
            points={`${x0},${y0} ${x0},${pYieldY} ${pYieldX},${pYieldY} ${pYieldX},${y0}`}
            fill="url(#elasticFill)"
          />

          {/* Shaded Plastic Region */}
          <polygon
            points={`${pYieldX},${y0} ${pYieldX},${pYieldY} ${pCtrlX},${pCtrlY} ${pFractX},${pFractY} ${pFractX},${y0}`}
            fill="url(#plasticFill)"
          />

          {/* 1. Elastic Hookean Line (From Origin to Yield Point) */}
          <line
            x1={x0}
            y1={y0}
            x2={pYieldX}
            y2={pYieldY}
            stroke="#34d399"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* 2. Plastic Bézier Curve (From Yield Point through Apex to Fracture) */}
          <path
            d={`M ${pYieldX} ${pYieldY} Q ${pCtrlX} ${pCtrlY} ${pFractX} ${pFractY}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Yield Point Marker */}
          <circle cx={pYieldX} cy={pYieldY} r="5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
          <text x={pYieldX - 8} y={pYieldY - 12} className="text-[9px] font-mono font-bold fill-amber-300" textAnchor="end">
            LÍMITE DE FLUENCIA (σ = 0.85)
          </text>

          {/* Fracture Point Marker */}
          <circle cx={pFractX} cy={pFractY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
          <text x={pFractX} y={pFractY - 12} className="text-[10px] font-mono font-bold fill-rose-400" textAnchor="middle">
            FRACTURA CATASTRÓFICA (σ = 1.25)
          </text>

          {/* Crosshair Lines to Axes for current position */}
          <line x1={x0} y1={curY} x2={curX} y2={curY} stroke={statusColor.includes('rose') ? '#f43f5e' : themePrimary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />
          <line x1={curX} y1={curY} x2={curX} y2={y0} stroke={statusColor.includes('rose') ? '#f43f5e' : themePrimary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.7" />

          {/* DYNAMIC OPERATING POINT (STRICTLY ON THE CURVE) */}
          <g transform={`translate(${curX}, ${curY})`}>
            {/* Pulsing ring */}
            <circle
              r={isFractured ? "22" : "16"}
              fill="none"
              stroke={isFractured ? "#f43f5e" : themePrimary}
              strokeWidth="2"
              className={isFractured ? "animate-ping" : "animate-pulse"}
            />
            {/* Solid Knob */}
            <circle
              r="8"
              fill={isFractured ? "#f43f5e" : themePrimary}
              stroke="#ffffff"
              strokeWidth="2.5"
              filter="url(#pointGlow)"
            />
            <text y="-14" textAnchor="middle" className="text-[10px] font-mono font-bold fill-white drop-shadow">
              σ = {sigma.toFixed(2)}
            </text>
          </g>
        </svg>
      </div>

      {/* Regimes Explanatory Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className={`p-3 rounded-2xl border transition-all ${
          sigma < yieldStress ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-200' : 'bg-black/40 border-white/5 text-slate-400'
        }`}>
          <strong className="block text-emerald-300 text-[11px] font-serif uppercase">1. Régimen Elástico Reversible</strong>
          <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">
            σ &lt; 0.85 · El tejido territorial absorbe perturbaciones y retorna sin daño permanente.
          </p>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          sigma >= yieldStress && sigma < fractureStress ? 'bg-amber-950/70 border-amber-500/50 text-amber-200' : 'bg-black/40 border-white/5 text-slate-400'
        }`}>
          <strong className="block text-amber-300 text-[11px] font-serif uppercase">2. Zona de Fluencia & Histéresis</strong>
          <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">
            0.85 ≤ σ &lt; 1.25 · Microdeformaciones plásticas permanentes. Reparar cuesta mucha más exergía.
          </p>
        </div>

        <div className={`p-3 rounded-2xl border transition-all ${
          sigma >= fractureStress ? 'bg-rose-950/70 border-rose-500/50 text-rose-200 animate-pulse' : 'bg-black/40 border-white/5 text-slate-400'
        }`}>
          <strong className="block text-rose-300 text-[11px] font-serif uppercase">3. Fractura Catastrófica</strong>
          <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">
            σ ≥ 1.25 · Colapso metabólico irreversible. Pérdida total de autoreproducción comunitaria.
          </p>
        </div>
      </div>
    </div>
  );
}
