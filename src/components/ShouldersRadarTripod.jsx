import React from 'react';
import { motion } from 'framer-motion';
import { Users, Trees, Coins, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ShouldersRadarTripod({ S, E, K, H, hasCriticalShoulder, criticalDetails }) {
  // Center coordinates and maximum radius in SVG canvas
  const cx = 180;
  const cy = 160;
  const maxR = 110;

  // Angles for the 3 shoulders (Equilateral 120 deg apart)
  // Top: Social (S) at -90 deg
  // Bottom-Right: Ambiental (E) at 30 deg
  // Bottom-Left: Económico (K) at 150 deg
  const angleS = -Math.PI / 2;
  const angleE = Math.PI / 6;
  const angleK = (5 * Math.PI) / 6;

  // Scaled radii: value bounded between 0.05 and 1.0
  const rS = Math.max(0.1, Math.min(1.0, S)) * maxR;
  const rE = Math.max(0.1, Math.min(1.0, E)) * maxR;
  const rK = Math.max(0.1, Math.min(1.0, K)) * maxR;

  // Vertex positions
  const ptS = { x: cx + rS * Math.cos(angleS), y: cy + rS * Math.sin(angleS) };
  const ptE = { x: cx + rE * Math.cos(angleE), y: cy + rE * Math.sin(angleE) };
  const ptK = { x: cx + rK * Math.cos(angleK), y: cy + rK * Math.sin(angleK) };

  // Guide rings coordinates (0.25, 0.50, 0.75, 1.0)
  const getRingPoints = (fraction) => {
    const r = fraction * maxR;
    const s = { x: cx + r * Math.cos(angleS), y: cy + r * Math.sin(angleS) };
    const e = { x: cx + r * Math.cos(angleE), y: cy + r * Math.sin(angleE) };
    const k = { x: cx + r * Math.cos(angleK), y: cy + r * Math.sin(angleK) };
    return `${s.x},${s.y} ${e.x},${e.y} ${k.x},${k.y}`;
  };

  // Center Dome Size based on H (Geometric Mean)
  const domeRadius = Math.max(12, H * 36);

  return (
    <div className="rounded-3xl p-5 card-slate border border-white/10 shadow-2xl relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#DA7B93]" />
          <h3 className="font-serif font-bold text-white text-sm">
            Trípode Geométrico de los Hombros
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-full bg-black/50 border border-white/10">
          <span className="text-slate-400">Domo H:</span>
          <strong className={`text-xs ${hasCriticalShoulder ? 'text-rose-400' : 'text-emerald-400'}`}>
            {H.toFixed(3)}
          </strong>
        </div>
      </div>

      {/* SVG Tripod / Radar */}
      <div className="relative w-full flex items-center justify-center my-2">
        <svg viewBox="0 0 360 320" className="w-full max-w-[340px] h-auto select-none overflow-visible">
          <defs>
            {/* Dynamic Gradient for the Territory Tissue Polygon */}
            <radialGradient id="tripodMeshGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={hasCriticalShoulder ? '#f43f5e' : '#34d399'} stopOpacity="0.65" />
              <stop offset="60%" stopColor={hasCriticalShoulder ? '#881337' : '#8D69A6'} stopOpacity="0.45" />
              <stop offset="100%" stopColor={hasCriticalShoulder ? '#4c0519' : '#376E6F'} stopOpacity="0.25" />
            </radialGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Guide Axes (Spokes from Center) */}
          <line x1={cx} y1={cy} x2={cx + maxR * Math.cos(angleS)} y2={cy + maxR * Math.sin(angleS)} stroke="rgba(218,123,147,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={cx} y1={cy} x2={cx + maxR * Math.cos(angleE)} y2={cy + maxR * Math.sin(angleE)} stroke="rgba(55,110,111,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1={cx} y1={cy} x2={cx + maxR * Math.cos(angleK)} y2={cy + maxR * Math.sin(angleK)} stroke="rgba(141,105,166,0.35)" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Concentric Guide Triangles */}
          <polygon points={getRingPoints(1.0)} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <polygon points={getRingPoints(0.75)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <polygon points={getRingPoints(0.50)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          
          {/* Critical Threshold 0.25 (Liebig Limit Ring) */}
          <polygon 
            points={getRingPoints(0.25)} 
            fill="none" 
            stroke="rgba(244,63,94,0.45)" 
            strokeWidth="1.5" 
            strokeDasharray="4 3" 
          />
          <text x={cx + 8} y={cy - maxR * 0.25 - 4} className="text-[8px] font-mono fill-rose-400 font-bold">
            UMBRAL LIEBIG (0.25)
          </text>

          {/* DYNAMIC TERRITORIAL POLYGON (S-E-K Membrane) */}
          <motion.polygon
            points={`${ptS.x},${ptS.y} ${ptE.x},${ptE.y} ${ptK.x},${ptK.y}`}
            fill="url(#tripodMeshGradient)"
            stroke={hasCriticalShoulder ? '#f43f5e' : '#DA7B93'}
            strokeWidth="2.5"
            strokeLinejoin="round"
            filter="url(#glowFilter)"
            animate={{
              points: `${ptS.x},${ptS.y} ${ptE.x},${ptE.y} ${ptK.x},${ptK.y}`
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />

          {/* Internal Struts connecting Vertices to Central Dome */}
          <line x1={cx} y1={cy} x2={ptS.x} y2={ptS.y} stroke={S < 0.25 ? '#f43f5e' : '#DA7B93'} strokeWidth="1.5" />
          <line x1={cx} y1={cy} x2={ptE.x} y2={ptE.y} stroke={E < 0.25 ? '#f43f5e' : '#376E6F'} strokeWidth="1.5" />
          <line x1={cx} y1={cy} x2={ptK.x} y2={ptK.y} stroke={K < 0.25 ? '#f43f5e' : '#8D69A6'} strokeWidth="1.5" />

          {/* CENTRAL CAPABILITY DOME (H = (S·E·K)^(1/3)) */}
          <circle
            cx={cx}
            cy={cy}
            r={domeRadius}
            fill={hasCriticalShoulder ? 'rgba(244,63,94,0.3)' : 'rgba(52,211,153,0.25)'}
            stroke={hasCriticalShoulder ? '#f43f5e' : '#34d399'}
            strokeWidth="2"
            className="animate-pulse"
          />
          <circle cx={cx} cy={cy} r="4" fill="#ffffff" />
          <text x={cx} y={cy + 4} textAnchor="middle" className="text-[10px] font-mono font-bold fill-white pointer-events-none drop-shadow">
            H
          </text>

          {/* VERTEX 1: SOCIAL (S) */}
          <circle cx={ptS.x} cy={ptS.y} r={S < 0.25 ? 7 : 5} fill={S < 0.25 ? '#f43f5e' : '#DA7B93'} stroke="#ffffff" strokeWidth="1.5" />
          <text x={cx} y={cy - maxR - 16} textAnchor="middle" className="text-[11px] font-serif font-bold fill-[#DA7B93]">
            S (Social): {S.toFixed(2)}
          </text>

          {/* VERTEX 2: AMBIENTAL (E) */}
          <circle cx={ptE.x} cy={ptE.y} r={E < 0.25 ? 7 : 5} fill={E < 0.25 ? '#f43f5e' : '#376E6F'} stroke="#ffffff" strokeWidth="1.5" />
          <text x={cx + maxR + 8} y={cy + (maxR * 0.5) + 16} textAnchor="start" className="text-[11px] font-serif font-bold fill-[#376E6F]">
            E (Ambiental): {E.toFixed(2)}
          </text>

          {/* VERTEX 3: ECONÓMICO (K) */}
          <circle cx={ptK.x} cy={ptK.y} r={K < 0.25 ? 7 : 5} fill={K < 0.25 ? '#f43f5e' : '#8D69A6'} stroke="#ffffff" strokeWidth="1.5" />
          <text x={cx - maxR - 8} y={cy + (maxR * 0.5) + 16} textAnchor="end" className="text-[11px] font-serif font-bold fill-[#8D69A6]">
            K (Económico): {K.toFixed(2)}
          </text>
        </svg>
      </div>

      {/* Footer Diagnostic Note */}
      <div className={`p-2.5 rounded-xl text-center text-[11px] font-mono transition-all ${
        hasCriticalShoulder 
          ? 'bg-rose-950/80 border border-rose-500/50 text-rose-200 animate-pulse' 
          : 'bg-black/40 border border-white/5 text-slate-300'
      }`}>
        {hasCriticalShoulder ? (
          <span>🚨 <strong>COLAPSO POR HOMBRO CRÍTICO:</strong> {criticalDetails.join(' y ')}</span>
        ) : (
          <span>Área de Soporte: <strong>{(H * 100).toFixed(0)}%</strong> de biocapacidad armónica</span>
        )}
      </div>
    </div>
  );
}
