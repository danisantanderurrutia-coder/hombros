import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Move, AlertOctagon, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function StressStrainCurve({ state, territory, onStressChange }) {
  const svgRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const { sigma, materialProperties } = state;
  const yieldStress = materialProperties?.yieldStress || 0.85;
  const fractureStress = materialProperties?.fractureStress || 1.25;

  const themePrimary = '#487075';

  // SVG Geometry Dimensions with generous margins (No clipping!)
  const width = 640;
  const height = 310;
  const x0 = 110; // 110px margin on left for clean Y-axis numbers and rotated title
  const y0 = 240; // 240px baseline giving 70px below for X-axis labels
  const pYieldX = 250;
  const pYieldY = 145;
  const pCtrlX = 390;
  const pCtrlY = 75;
  const pFractX = 540;
  const pFractY = 90;

  // STRICT MATHEMATICAL PARAMETRIZATION ALONG THE CURVE
  let curX = x0;
  let curY = y0;
  let statusBadge = 'RÉGIMEN ELÁSTICO REVERSIBLE';
  let statusColor = 'text-emerald-400';
  let statusBg = 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';

  if (sigma <= yieldStress) {
    // 100% on the linear elastic line
    const t = Math.max(0, Math.min(1.0, sigma / yieldStress));
    curX = x0 + t * (pYieldX - x0);
    curY = y0 + t * (pYieldY - y0);
    statusBadge = 'RÉGIMEN ELÁSTICO (REVERSIBLE)';
    statusColor = 'text-emerald-400';
    statusBg = 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';
  } else if (sigma <= fractureStress) {
    // 100% on the exact Quadratic Bézier Plastic Curve
    const t = Math.max(0, Math.min(1.0, (sigma - yieldStress) / (fractureStress - yieldStress)));
    const oneMinusT = 1 - t;
    curX = (oneMinusT * oneMinusT * pYieldX) + (2 * oneMinusT * t * pCtrlX) + (t * t * pFractX);
    curY = (oneMinusT * oneMinusT * pYieldY) + (2 * oneMinusT * t * pCtrlY) + (t * t * pFractY);
    statusBadge = 'DEFORMACIÓN PLÁSTICA (HISTÉRESIS)';
    statusColor = 'text-amber-400';
    statusBg = 'bg-amber-950/80 border-amber-500/50 text-amber-300';
  } else {
    // Clamped at Fracture point
    curX = pFractX;
    curY = pFractY;
    statusBadge = 'FRACTURA CATASTRÓFICA / COLAPSO';
    statusColor = 'text-rose-400';
    statusBg = 'bg-rose-950/90 border-rose-500 text-rose-200 animate-pulse';
  }

  const isFractured = sigma >= fractureStress;

  // INTERACTIVE DRAGGING / CLICKING DIRECTLY ON THE CURVE
  const updateSigmaFromPointer = useCallback((clientX) => {
    if (!svgRef.current || !onStressChange) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = width / rect.width;
    const mouseX = (clientX - rect.left) * scaleX;

    let targetSigma = 0.5;
    if (mouseX <= x0) {
      targetSigma = 0.1;
    } else if (mouseX <= pYieldX) {
      const t = (mouseX - x0) / (pYieldX - x0);
      targetSigma = t * yieldStress;
    } else if (mouseX <= pFractX) {
      const t = (mouseX - pYieldX) / (pFractX - pYieldX);
      targetSigma = yieldStress + t * (fractureStress - yieldStress);
    } else {
      targetSigma = fractureStress + (mouseX - pFractX) * 0.005;
    }

    targetSigma = Math.max(0.1, Math.min(1.4, targetSigma));
    onStressChange(parseFloat(targetSigma.toFixed(2)));
  }, [onStressChange, width, x0, pYieldX, pFractX, yieldStress, fractureStress]);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSigmaFromPointer(clientX);
  };

  const handlePointerMove = useCallback((e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateSigmaFromPointer(clientX);
  }, [isDragging, updateSigmaFromPointer]);

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handlePointerMove, handlePointerUp]);

  return (
    <div className="rounded-3xl p-6 sm:p-7 bg-white/95 border border-[#D4C9B8] shadow-md relative overflow-hidden space-y-4 text-slate-900">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D4C9B8]">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#28475A]" />
            <h3 className="text-xl font-bold font-serif text-slate-900 tracking-wide">
              Curva Reológica: Esfuerzo (σ) vs Deformación (ε)
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-[#487075]" />
            <strong className="text-slate-800">Haz clic o arrastra sobre la curva</strong> para probar directamente diferentes niveles de tensión
          </p>
        </div>

        {/* Status Badge */}
        <div className={`px-4 py-2 rounded-2xl border text-xs font-mono font-bold shadow-lg flex items-center gap-2 ${statusBg}`}>
          <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse inline-block" />
          <span>{statusBadge}</span>
          <span className="opacity-60">|</span>
          <span className="text-sm">σ = {sigma.toFixed(2)}</span>
        </div>
      </div>

      {/* SVG Canvas with Perfect Bounds & Layout */}
      <div 
        className="relative w-full overflow-hidden rounded-2xl border border-[#D4C9B8] bg-slate-950 p-2 shadow-inner select-none cursor-pointer"
        onPointerDown={handlePointerDown}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          style={{ touchAction: 'none' }}
        >
          <defs>
            {/* Shaded Elastic Zone Gradient */}
            <linearGradient id="curveElasticFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#376E6F" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#34d399" stopOpacity="0.25" />
            </linearGradient>

            {/* Shaded Plastic Zone Gradient */}
            <linearGradient id="curvePlasticFillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.45" />
            </linearGradient>

            {/* Intense Glow for Active Point */}
            <filter id="operatingPointGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={themePrimary} floodOpacity="0.9" />
            </filter>
          </defs>

          {/* =================================================================
              AXES AND GRID LINES
              ================================================================= */}
          {/* X Axis Baseline */}
          <line x1={x0} y1={y0} x2="590" y2={y0} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
          {/* Y Axis Baseline */}
          <line x1={x0} y1="35" x2={x0} y2={y0} stroke="rgba(255,255,255,0.2)" strokeWidth="2" />

          {/* Horizontal Grid Ticks */}
          <line x1={x0} y1={pYieldY} x2="590" y2={pYieldY} stroke="rgba(251,191,36,0.25)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={x0 - 12} y={pYieldY + 4} textAnchor="end" className="text-[11px] font-mono fill-amber-300 font-bold">
            0.85 (Yield)
          </text>

          <line x1={x0} y1={pFractY} x2="590" y2={pFractY} stroke="rgba(244,63,94,0.3)" strokeWidth="1.5" strokeDasharray="4 4" />
          <text x={x0 - 12} y={pFractY + 4} textAnchor="end" className="text-[11px] font-mono fill-rose-400 font-bold">
            1.25 (Fractura)
          </text>

          {/* Vertical Grid Ticks */}
          <line x1={pYieldX} y1={pYieldY} x2={pYieldX} y2={y0} stroke="rgba(251,191,36,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={pYieldX} y={y0 + 18} textAnchor="middle" className="text-[10px] font-mono fill-amber-300 font-bold">
            ε_yield
          </text>

          <line x1={pFractX} y1={pFractY} x2={pFractX} y2={y0} stroke="rgba(244,63,94,0.2)" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x={pFractX} y={y0 + 18} textAnchor="middle" className="text-[10px] font-mono fill-rose-400 font-bold">
            ε_fractura
          </text>

          {/* AXIS TITLES (With spacious margins, completely legible) */}
          <text x="350" y={y0 + 40} textAnchor="middle" className="text-[12px] font-mono font-bold fill-slate-300">
            Deformación Estructural Acumulada (ε) →
          </text>
          <text
            x="32"
            y="145"
            textAnchor="middle"
            transform="rotate(-90 32 145)"
            className="text-[12px] font-mono font-bold fill-slate-300"
          >
            Tensión Territorial (σ = D / H) →
          </text>

          {/* =================================================================
              SHADED REGIONS UNDER THE EXACT CURVE
              ================================================================= */}
          {/* Shaded Elastic Triangle */}
          <polygon
            points={`${x0},${y0} ${pYieldX},${pYieldY} ${pYieldX},${y0}`}
            fill="url(#curveElasticFillGrad)"
          />

          {/* Shaded Plastic Area (Exact Path matching the Bézier curve) */}
          <path
            d={`M ${pYieldX} ${y0} L ${pYieldX} ${pYieldY} Q ${pCtrlX} ${pCtrlY} ${pFractX} ${pFractY} L ${pFractX} ${y0} Z`}
            fill="url(#curvePlasticFillGrad)"
          />

          {/* =================================================================
              THE CONSTITUTIVE CURVE STROKES
              ================================================================= */}
          {/* 1. Linear Elastic Line (Hookean solid) */}
          <line
            x1={x0}
            y1={y0}
            x2={pYieldX}
            y2={pYieldY}
            stroke="#34d399"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* 2. Quadratic Plastic Bézier Curve */}
          <path
            d={`M ${pYieldX} ${pYieldY} Q ${pCtrlX} ${pCtrlY} ${pFractX} ${pFractY}`}
            fill="none"
            stroke="#fbbf24"
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Region Label Annotations */}
          <text x="175" y={y0 - 25} textAnchor="middle" className="text-[11px] font-serif font-bold fill-emerald-300 opacity-90 pointer-events-none">
            Régimen Elástico Reversible
          </text>
          <text x="390" y={y0 - 25} textAnchor="middle" className="text-[11px] font-serif font-bold fill-amber-300 opacity-90 pointer-events-none">
            Histéresis Plástica & Daño Acumulado
          </text>

          {/* Yield Landmark Pin */}
          <circle cx={pYieldX} cy={pYieldY} r="5.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
          <text x={pYieldX - 6} y={pYieldY - 14} textAnchor="end" className="text-[10px] font-mono font-bold fill-amber-300">
            LÍMITE DE FLUENCIA
          </text>

          {/* Fracture Landmark Pin */}
          <circle cx={pFractX} cy={pFractY} r="6.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
          <text x={pFractX + 8} y={pFractY - 14} textAnchor="middle" className="text-[11px] font-mono font-bold fill-rose-400">
            FRACTURA CATASTRÓFICA
          </text>

          {/* =================================================================
              ACTIVE OPERATING POINT (STRICTLY CONSTRAINED TO THE CURVE)
              ================================================================= */}
          {/* Crosshairs projection to axes */}
          <line x1={x0} y1={curY} x2={curX} y2={curY} stroke={isFractured ? '#f43f5e' : themePrimary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <line x1={curX} y1={curY} x2={curX} y2={y0} stroke={isFractured ? '#f43f5e' : themePrimary} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

          {/* The Draggable Glowing Knob */}
          <g transform={`translate(${curX}, ${curY})`}>
            {/* Pulsing indicator beacon */}
            <circle
              r={isFractured ? 26 : isDragging ? 22 : 18}
              fill="none"
              stroke={isFractured ? '#f43f5e' : themePrimary}
              strokeWidth="2.5"
              className={isFractured ? 'animate-ping' : 'animate-pulse'}
            />
            
            {/* Solid Center Handle */}
            <circle
              r={isDragging ? 10 : 8}
              fill={isFractured ? '#f43f5e' : themePrimary}
              stroke="#ffffff"
              strokeWidth="3"
              filter="url(#operatingPointGlow)"
            />

            {/* Float readout tag */}
            <g transform="translate(0, -22)">
              <rect x="-35" y="-14" width="70" height="18" rx="6" fill="#140b20" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="0" y="-1" textAnchor="middle" className="text-[10px] font-mono font-bold fill-white">
                σ = {sigma.toFixed(2)}
              </text>
            </g>
          </g>
        </svg>
      </div>

      {/* Preset Quick-Jump Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs font-mono">
        <span className="text-slate-400 text-[11px]">Probar Regímenes Rápidos:</span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onStressChange && onStressChange(0.60)}
            className="px-3 py-1.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/60 font-bold text-[11px] transition-all"
          >
            🟢 Elástico Seguro (σ = 0.60)
          </button>
          <button
            onClick={() => onStressChange && onStressChange(0.85)}
            className="px-3 py-1.5 rounded-xl border border-amber-500/40 bg-amber-950/40 text-amber-300 hover:bg-amber-900/60 font-bold text-[11px] transition-all"
          >
            🟡 En Límite de Fluencia (σ = 0.85)
          </button>
          <button
            onClick={() => onStressChange && onStressChange(1.05)}
            className="px-3 py-1.5 rounded-xl border border-orange-500/40 bg-orange-950/40 text-orange-300 hover:bg-orange-900/60 font-bold text-[11px] transition-all"
          >
            🟠 Daño Plástico (σ = 1.05)
          </button>
          <button
            onClick={() => onStressChange && onStressChange(1.25)}
            className="px-3 py-1.5 rounded-xl border border-rose-500/40 bg-rose-950/40 text-rose-300 hover:bg-rose-900/60 font-bold text-[11px] transition-all"
          >
            🔴 Fractura Catastrófica (σ = 1.25)
          </button>
        </div>
      </div>
    </div>
  );
}
