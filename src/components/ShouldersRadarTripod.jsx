import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trees, Coins, ShieldCheck, Sparkles, Move } from 'lucide-react';

export default function ShouldersRadarTripod({ S, E, K, H, hasCriticalShoulder, criticalDetails, onShoulderChange }) {
  const svgRef = useRef(null);
  const [activeDragging, setActiveDragging] = useState(null); // 'S' | 'E' | 'K' | null

  // Larger canvas dimensions for a grand, centerpiece experience
  const width = 440;
  const height = 400;
  const cx = 220;
  const cy = 210;
  const maxR = 150;

  // Angles for the 3 axes (Equilateral 120 deg apart)
  // Top: Social (S) at -90 deg (-PI/2)
  // Bottom-Right: Ambiental (E) at 30 deg (PI/6)
  // Bottom-Left: Económico (K) at 150 deg (5*PI/6)
  const angleS = -Math.PI / 2;
  const angleE = Math.PI / 6;
  const angleK = (5 * Math.PI) / 6;

  // Axis unit vectors
  const uS = { x: Math.cos(angleS), y: Math.sin(angleS) };
  const uE = { x: Math.cos(angleE), y: Math.sin(angleE) };
  const uK = { x: Math.cos(angleK), y: Math.sin(angleK) };

  // Scaled radii: value bounded between 0.05 and 1.0
  const rS = Math.max(0.08, Math.min(1.0, S)) * maxR;
  const rE = Math.max(0.08, Math.min(1.0, E)) * maxR;
  const rK = Math.max(0.08, Math.min(1.0, K)) * maxR;

  // Vertex positions
  const ptS = { x: cx + rS * uS.x, y: cy + rS * uS.y };
  const ptE = { x: cx + rE * uE.x, y: cy + rE * uE.y };
  const ptK = { x: cx + rK * uK.x, y: cy + rK * uK.y };

  // Guide concentric triangles (fraction from center)
  const getRingPoints = (fraction) => {
    const r = fraction * maxR;
    const s = { x: cx + r * uS.x, y: cy + r * uS.y };
    const e = { x: cx + r * uE.x, y: cy + r * uE.y };
    const k = { x: cx + r * uK.x, y: cy + r * uK.y };
    return `${s.x},${s.y} ${e.x},${e.y} ${k.x},${k.y}`;
  };

  // Center Dome Size based on H (Geometric Mean)
  const domeRadius = Math.max(16, H * 46);

  // Drag handling logic: converts mouse/touch coordinate into shoulder value (0.05 to 1.0)
  const handlePointerMove = useCallback((e) => {
    if (!activeDragging || !svgRef.current || !onShoulderChange) return;

    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    // Relative to SVG viewBox coordinates
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const mouseX = (clientX - rect.left) * scaleX;
    const mouseY = (clientY - rect.top) * scaleY;

    // Vector from center to pointer
    const dx = mouseX - cx;
    const dy = mouseY - cy;

    let targetUnit = uS;
    if (activeDragging === 'E') targetUnit = uE;
    if (activeDragging === 'K') targetUnit = uK;

    // Project mouse vector onto axis unit vector
    const projection = dx * targetUnit.x + dy * targetUnit.y;
    const normalized = Math.max(0.05, Math.min(1.0, projection / maxR));

    onShoulderChange(activeDragging, parseFloat(normalized.toFixed(2)));
  }, [activeDragging, onShoulderChange, cx, cy, maxR, uS, uE, uK, width, height]);

  const handlePointerUp = useCallback(() => {
    setActiveDragging(null);
  }, []);

  useEffect(() => {
    if (activeDragging) {
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
  }, [activeDragging, handlePointerMove, handlePointerUp]);

  return (
    <div className="rounded-3xl p-6 bg-white/95 border border-[#D4C9B8] shadow-md relative overflow-hidden flex flex-col justify-between text-slate-900">
      {/* Background ambient lighting */}
      <div className={`absolute inset-0 pointer-events-none transition-all duration-700 opacity-20 ${
        hasCriticalShoulder ? 'bg-rose-950/60' : 'bg-gradient-to-b from-[#C86D51]/10 via-transparent to-[#487075]/10'
      }`} />

      {/* Header with Call to Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D4C9B8] relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#C86D51]" />
            <h3 className="font-serif font-bold text-slate-900 text-base">
              Trípode de Capacidad Portante (Interactivo)
            </h3>
          </div>
          <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
            <Move className="w-3.5 h-3.5 text-[#C86D51]" />
            <strong className="text-slate-800">Arrastra los 3 vértices</strong> para modelar el soporte biofísico directamente
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-2xl bg-[#FAF7F0] border border-[#D4C9B8] shadow-2xs">
          <span className="text-slate-600">Domo H:</span>
          <strong className={`text-base ${hasCriticalShoulder ? 'text-rose-600 animate-pulse' : 'text-[#1B4332]'}`}>
            {H.toFixed(3)}
          </strong>
        </div>
      </div>

      {/* SVG Canvas for Large Interactive Tripod */}
      <div className="relative w-full flex items-center justify-center my-3 select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full max-w-[440px] h-auto overflow-visible cursor-default"
          style={{ touchAction: 'none' }}
        >
          <defs>
            {/* Ambient Radial Gradient for the membrane */}
            <radialGradient id="largeTripodMeshGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={hasCriticalShoulder ? '#f43f5e' : '#7DB2B2'} stopOpacity="0.75" />
              <stop offset="55%" stopColor={hasCriticalShoulder ? '#9f1239' : '#927660'} stopOpacity="0.5" />
              <stop offset="100%" stopColor={hasCriticalShoulder ? '#4c0519' : '#487075'} stopOpacity="0.25" />
            </radialGradient>

            <filter id="largeTripodGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* Pulsing Aura for Draggable Handles */}
            <filter id="handleShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Background Structural Spokes */}
          <line x1={cx} y1={cy} x2={cx + maxR * uS.x} y2={cy + maxR * uS.y} stroke="rgba(200,109,81,0.35)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1={cx} y1={cy} x2={cx + maxR * uE.x} y2={cy + maxR * uE.y} stroke="rgba(72,112,117,0.35)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1={cx} y1={cy} x2={cx + maxR * uK.x} y2={cy + maxR * uK.y} stroke="rgba(146,118,96,0.35)" strokeWidth="2" strokeDasharray="4 4" />

          {/* Concentric Guide Triangles */}
          <polygon points={getRingPoints(1.0)} fill="none" stroke="rgba(40,71,90,0.18)" strokeWidth="1.5" />
          <polygon points={getRingPoints(0.75)} fill="none" stroke="rgba(40,71,90,0.10)" strokeWidth="1" />
          <polygon points={getRingPoints(0.50)} fill="none" stroke="rgba(40,71,90,0.10)" strokeWidth="1" />
          
          {/* Critical Threshold 0.25 (Liebig Collapse Line) */}
          <polygon 
            points={getRingPoints(0.25)} 
            fill="none" 
            stroke="rgba(244,63,94,0.6)" 
            strokeWidth="2" 
            strokeDasharray="5 4" 
          />
          <text x={cx + 10} y={cy - maxR * 0.25 - 6} className="text-[10px] font-mono fill-rose-600 font-bold tracking-wider">
            UMBRAL DE COLAPSO LIEBIG (0.25)
          </text>

          {/* Axis Scale Markers */}
          <text x={cx + 6} y={cy - maxR + 12} className="text-[9px] font-mono fill-slate-500 font-bold">1.0</text>
          <text x={cx + 6} y={cy - maxR * 0.5 + 4} className="text-[9px] font-mono fill-slate-500 font-bold">0.5</text>

          {/* DYNAMIC MEMBRANE / POLYGON */}
          <polygon
            points={`${ptS.x},${ptS.y} ${ptE.x},${ptE.y} ${ptK.x},${ptK.y}`}
            fill="url(#largeTripodMeshGradient)"
            stroke={hasCriticalShoulder ? '#f43f5e' : '#487075'}
            strokeWidth="3.5"
            strokeLinejoin="round"
            filter="url(#largeTripodGlow)"
          />

          {/* Internal Connective Struts */}
          <line x1={cx} y1={cy} x2={ptS.x} y2={ptS.y} stroke={S < 0.25 ? '#f43f5e' : '#C86D51'} strokeWidth="2" />
          <line x1={cx} y1={cy} x2={ptE.x} y2={ptE.y} stroke={E < 0.25 ? '#f43f5e' : '#487075'} strokeWidth="2" />
          <line x1={cx} y1={cy} x2={ptK.x} y2={ptK.y} stroke={K < 0.25 ? '#f43f5e' : '#927660'} strokeWidth="2" />

          {/* CENTRAL CAPABILITY DOME (H = (S·E·K)^(1/3)) */}
          <circle
            cx={cx}
            cy={cy}
            r={domeRadius}
            fill={hasCriticalShoulder ? 'rgba(244,63,94,0.3)' : 'rgba(72,112,117,0.3)'}
            stroke={hasCriticalShoulder ? '#f43f5e' : '#487075'}
            strokeWidth="2.5"
            className="animate-pulse"
          />
          <circle cx={cx} cy={cy} r="6" fill="#28475A" />
          <text x={cx} y={cy + 4} textAnchor="middle" className="text-[11px] font-mono font-bold fill-white pointer-events-none drop-shadow">
            H
          </text>

          {/* =================================================================
              DRAGGABLE VERTEX 1: SOCIAL (S)
              ================================================================= */}
          <g
            className="cursor-grab active:cursor-grabbing transition-transform duration-75"
            onPointerDown={() => setActiveDragging('S')}
          >
            {/* Expanded Touch Target */}
            <circle cx={ptS.x} cy={ptS.y} r="28" fill="transparent" />
            
            {/* Outer Glow Halo */}
            <circle
              cx={ptS.x}
              cy={ptS.y}
              r={activeDragging === 'S' ? 18 : 13}
              fill="rgba(200,109,81,0.35)"
              className="animate-pulse"
            />
            {/* Core Handle Knob */}
            <circle
              cx={ptS.x}
              cy={ptS.y}
              r={S < 0.25 ? 10 : 8}
              fill={S < 0.25 ? '#f43f5e' : '#C86D51'}
              stroke="#ffffff"
              strokeWidth="3"
              filter="url(#handleShadow)"
            />
          </g>
          {/* Label S */}
          <text
            x={cx}
            y={cy - maxR - 22}
            textAnchor="middle"
            className="text-[13px] font-serif font-bold fill-[#C86D51]"
          >
            Hombro Social (S): {S.toFixed(2)}
          </text>

          {/* =================================================================
              DRAGGABLE VERTEX 2: AMBIENTAL (E)
              ================================================================= */}
          <g
            className="cursor-grab active:cursor-grabbing transition-transform duration-75"
            onPointerDown={() => setActiveDragging('E')}
          >
            <circle cx={ptE.x} cy={ptE.y} r="28" fill="transparent" />
            <circle
              cx={ptE.x}
              cy={ptE.y}
              r={activeDragging === 'E' ? 18 : 13}
              fill="rgba(72,112,117,0.35)"
              className="animate-pulse"
            />
            <circle
              cx={ptE.x}
              cy={ptE.y}
              r={E < 0.25 ? 10 : 8}
              fill={E < 0.25 ? '#f43f5e' : '#487075'}
              stroke="#ffffff"
              strokeWidth="3"
              filter="url(#handleShadow)"
            />
          </g>
          {/* Label E */}
          <text
            x={cx + maxR + 14}
            y={cy + maxR * 0.5 + 24}
            textAnchor="start"
            className="text-[13px] font-serif font-bold fill-[#487075]"
          >
            Ambiental (E): {E.toFixed(2)}
          </text>

          {/* =================================================================
              DRAGGABLE VERTEX 3: ECONÓMICO (K)
              ================================================================= */}
          <g
            className="cursor-grab active:cursor-grabbing transition-transform duration-75"
            onPointerDown={() => setActiveDragging('K')}
          >
            <circle cx={ptK.x} cy={ptK.y} r="28" fill="transparent" />
            <circle
              cx={ptK.x}
              cy={ptK.y}
              r={activeDragging === 'K' ? 18 : 13}
              fill="rgba(146,118,96,0.35)"
              className="animate-pulse"
            />
            <circle
              cx={ptK.x}
              cy={ptK.y}
              r={K < 0.25 ? 10 : 8}
              fill={K < 0.25 ? '#f43f5e' : '#927660'}
              stroke="#ffffff"
              strokeWidth="3"
              filter="url(#handleShadow)"
            />
          </g>
          {/* Label K */}
          <text
            x={cx - maxR - 14}
            y={cy + maxR * 0.5 + 24}
            textAnchor="end"
            className="text-[13px] font-serif font-bold fill-[#927660]"
          >
            Económico (K): {K.toFixed(2)}
          </text>
        </svg>
      </div>

      {/* Footer Diagnostic Note */}
      <div className={`p-3 rounded-2xl text-center text-xs font-mono transition-all relative z-10 ${
        hasCriticalShoulder 
          ? 'bg-rose-950/80 border border-rose-500/60 text-rose-200 animate-pulse' 
          : 'bg-[#FAF7F0] border border-[#D4C9B8] text-slate-700'
      }`}>
        {hasCriticalShoulder ? (
          <span>🚨 <strong>COLAPSO POR LEY DE LIEBIG:</strong> {criticalDetails.join(' y ')}. El territorio no puede mantenerse en pie.</span>
        ) : (
          <span>Soporte Biofísico: <strong>{(H * 100).toFixed(0)}%</strong> de solvencia simétrica armónica</span>
        )}
      </div>
    </div>
  );
}
