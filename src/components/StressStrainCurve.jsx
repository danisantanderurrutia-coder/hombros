import React from 'react';
import { useTheme } from '../context/ThemeContext';

export default function StressStrainCurve({ state, territory }) {
  const { sigma, epsilon, regime, materialProperties } = state;
  const { yieldStress, ultimateStress, fractureStress } = materialProperties;
  const { isFcinq } = useTheme();

  const mapX = (val) => 60 + (val / 1.4) * 400;
  const mapY = (val) => 260 - (val / 1.3) * 220;

  const pYieldX = mapX(yieldStress / materialProperties.modulusElasticity);
  const pYieldY = mapY(yieldStress);

  const pUltX = mapX(0.7);
  const pUltY = mapY(ultimateStress);

  const pFractX = mapX(1.15);
  const pFractY = mapY(fractureStress * 0.92);

  const curX = Math.min(460, Math.max(60, mapX(epsilon)));
  const curY = Math.min(260, Math.max(30, mapY(sigma)));

  const themePrimary = isFcinq ? '#D83F87' : '#DA7B93';
  const themeSecondary = isFcinq ? '#44318D' : '#376E6F';

  return (
    <div className="rounded-3xl p-6 transition-all duration-300 bio-hud-panel shadow-2xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 theme-text-primary">
            <span 
              className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"
              style={{ backgroundColor: themePrimary, boxShadow: `0 0 10px ${themePrimary}` }}
            />
            Curva Mecánica del Territorio · Esfuerzo (σ) vs Deformación (ε)
          </h3>
          <p className="text-xs mt-0.5 text-slate-300">
            Respuesta elástica y plástica del tejido socio-ecológico
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-xl border border-white/10 bg-brand-void text-slate-200 shadow-inner">
          <span className="text-slate-400">STATUS:</span>
          <span className="font-bold theme-text-primary">σ = {sigma}</span>
          <span className="text-slate-600">|</span>
          <span className="font-bold text-white">ε = {epsilon}</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-void/90 p-2.5 shadow-inner">
        <svg viewBox="0 0 500 300" className="w-full h-auto select-none">
          <defs>
            <linearGradient id="curveElasticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={themeSecondary} stopOpacity="0.45" />
              <stop offset="100%" stopColor={themePrimary} stopOpacity="0.30" />
            </linearGradient>
            <linearGradient id="curvePlasticGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.45" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="60" y1="260" x2="480" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <line x1="60" y1="30" x2="60" y2="260" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

          {/* Grid ticks */}
          <line x1="60" y1={mapY(0.5)} x2="480" y2={mapY(0.5)} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <text x="50" y={mapY(0.5) + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">0.5</text>

          <line x1="60" y1={mapY(1.0)} x2="480" y2={mapY(1.0)} stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
          <text x="50" y={mapY(1.0) + 4} textAnchor="end" className="text-[10px] font-mono fill-slate-400">1.0</text>

          {/* X Axis Labels */}
          <text x={mapX(0.5)} y="278" textAnchor="middle" className="text-[10px] font-mono fill-slate-400">0.5</text>
          <text x={mapX(1.0)} y="278" textAnchor="middle" className="text-[10px] font-mono fill-slate-400">1.0</text>

          {/* Axis Titles */}
          <text x="270" y="295" textAnchor="middle" className="text-[11px] font-mono font-bold fill-slate-300">
            Deformación Estructural (ε) →
          </text>
          <text x="25" y="145" textAnchor="middle" transform="rotate(-90 25 145)" className="text-[11px] font-mono font-bold fill-slate-300">
            Tensión Extractiva (σ) →
          </text>

          {/* Shaded Elastic Zone */}
          <polygon
            points={`60,260 60,${pYieldY} ${pYieldX},${pYieldY} ${pYieldX},260`}
            fill="url(#curveElasticGradient)"
          />

          {/* Shaded Plastic Zone */}
          <polygon
            points={`${pYieldX},260 ${pYieldX},${pYieldY} ${pUltX},${pUltY} ${pFractX},${pFractY} ${pFractX},260`}
            fill="url(#curvePlasticGradient)"
          />

          {/* 1. Elastic Hookean Line */}
          <line
            x1="60"
            y1="260"
            x2={pYieldX}
            y2={pYieldY}
            stroke={themePrimary}
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${themePrimary})` }}
          />

          {/* 2. Plastic Region Curve */}
          <path
            d={`M ${pYieldX} ${pYieldY} Q ${(pYieldX + pUltX) / 2} ${pUltY - 12} ${pUltX} ${pUltY} T ${pFractX} ${pFractY}`}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.5))' }}
          />

          {/* Yield Point */}
          <circle cx={pYieldX} cy={pYieldY} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
          <text x={pYieldX - 8} y={pYieldY - 12} className="text-[9px] font-mono font-bold fill-amber-300" textAnchor="end">
            σ_yield ({yieldStress})
          </text>

          {/* Ultimate Point */}
          <circle cx={pUltX} cy={pUltY} r="5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
          <text x={pUltX} y={pUltY - 10} className="text-[9px] font-mono font-bold fill-rose-300" textAnchor="middle">
            σ_ult ({ultimateStress})
          </text>

          {/* Fracture Point */}
          <circle cx={pFractX} cy={pFractY} r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
          <text x={pFractX + 10} y={pFractY + 4} className="text-[9px] font-mono font-bold fill-rose-400" textAnchor="start">
            FRACTURA ({fractureStress})
          </text>

          {/* CURRENT OPERATING POINT */}
          <circle
            cx={curX}
            cy={curY}
            r="16"
            fill="none"
            stroke={themePrimary}
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className="animate-spin"
            style={{ transformOrigin: `${curX}px ${curY}px` }}
          />
          <circle
            cx={curX}
            cy={curY}
            r="7"
            fill={themePrimary}
            stroke="#ffffff"
            strokeWidth="2.5"
            style={{ filter: `drop-shadow(0 0 12px ${themePrimary})` }}
          />

          {/* Crosshairs to axes */}
          <line x1="60" y1={curY} x2={curX} y2={curY} stroke={themePrimary} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <line x1={curX} y1={curY} x2={curX} y2="260" stroke={themePrimary} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        </svg>
      </div>

      {/* Regimes Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mt-4 text-[11px] font-mono">
        <div className="p-2.5 rounded-xl border border-white/10 bg-brand-void text-slate-300">
          <span className="block font-bold theme-text-primary">01 · RÉGIMEN ELÁSTICO</span>
          <span className="text-[10px] text-slate-400">Reversibilidad biótica intacta</span>
        </div>
        <div className="p-2.5 rounded-xl border border-amber-500/30 bg-amber-950/30 text-amber-200">
          <span className="block font-bold">02 · FLUENCIA (σ_y)</span>
          <span className="text-[10px] text-slate-300">Umbral de estrés crítico</span>
        </div>
        <div className="p-2.5 rounded-xl border border-rose-500/30 bg-rose-950/30 text-rose-200">
          <span className="block font-bold">03 · DAÑO PLÁSTICO</span>
          <span className="text-[10px] text-slate-300">Histéresis y erosión permanente</span>
        </div>
        <div className="p-2.5 rounded-xl border border-red-500/40 bg-red-950/40 text-red-300">
          <span className="block font-bold">04 · FRACTURA TOTAL</span>
          <span className="text-[10px] text-slate-300">Pérdida irreversible del acuífero</span>
        </div>
      </div>
    </div>
  );
}
