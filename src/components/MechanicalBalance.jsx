import React, { useMemo } from 'react';
import { Activity, ShieldAlert, CheckCircle2, AlertTriangle, Disc, ArrowDown, ArrowUp, Compass } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function MechanicalBalance({ santanderState }) {
  const { D, H, sigma, trafficLight, trafficTitle } = santanderState;

  // Engineering calculations:
  // Factor of Safety: FS = H / D (inverse of systemic stress sigma)
  const factorOfSafety = useMemo(() => {
    return D > 0.001 ? parseFloat((H / D).toFixed(3)) : 9.99;
  }, [D, H]);

  // Angular deflection of the neutral axis theta (degrees)
  // Positive angle tilts right-down (extractivism overload)
  const tiltDeg = useMemo(() => {
    const rawDelta = (D - H);
    // Sigmoid/tangent damping between -16 deg and +20 deg
    const deg = Math.max(-16, Math.min(20, rawDelta * 18));
    return parseFloat(deg.toFixed(2));
  }, [D, H]);

  const thetaMrad = useMemo(() => {
    return parseFloat(((tiltDeg * Math.PI) / 180 * 1000).toFixed(1));
  }, [tiltDeg]);

  // Unbalanced Bending Moment (normalized kNm)
  const deltaMoment = useMemo(() => {
    return parseFloat(((D - H) * 125).toFixed(1));
  }, [D, H]);

  // Structural Limit State (Eurocode / AISC nomenclature)
  const limitState = useMemo(() => {
    if (sigma < 0.70) {
      return {
        code: 'SLS-A (Serviceability Limit State · Safe Elastic)',
        label: 'Régimen Elástico Admisible',
        fsBadge: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 ring-1 ring-emerald-500/30',
        fsColor: 'text-emerald-400',
        statusColor: '#34d399',
        diag: 'La reacción estructural elástica absorbe la carga extractiva con reserva portante holgada.'
      };
    } else if (sigma <= 1.00) {
      return {
        code: 'SLS-B (Serviceability Limit State · High Stress)',
        label: 'Fatiga de Servicio / Fluencia Inminente',
        fsBadge: 'bg-amber-950/80 border-amber-500/60 text-amber-300 ring-1 ring-amber-500/30',
        fsColor: 'text-amber-400',
        statusColor: '#fbbf24',
        diag: 'Tensión próxima al límite de fluencia (Yield). Comienzan microdeformaciones plásticas.'
      };
    } else if (sigma <= 1.20) {
      return {
        code: 'ULS (Ultimate Limit State · Plastic Failure)',
        label: 'Colapso Plástico Estructural',
        fsBadge: 'bg-rose-950/80 border-rose-500/60 text-rose-300 ring-1 ring-rose-500/50',
        fsColor: 'text-rose-400',
        statusColor: '#f43f5e',
        diag: 'La carga externa excede la capacidad plástica portante. Ruptura del equilibrio estático.'
      };
    } else {
      return {
        code: 'FLS (Fatigue Limit State · Structural Fracture)',
        label: 'Fractura Crítica Ineludible',
        fsBadge: 'bg-red-950/90 border-red-500 text-red-200 ring-2 ring-red-500',
        fsColor: 'text-red-400',
        statusColor: '#ef4444',
        diag: 'Quiebre irreversible del tensor territorial. Detención inmediata de cargas extractivas.'
      };
    }
  }, [sigma]);

  return (
    <div className="rounded-3xl p-6 transition-all duration-300 shadow-2xl card-indigo">
      
      {/* Engineering Header & Telemetry Badges */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5 pb-4 border-b border-emerald-500/20">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border bg-bio-deep border-cyan-500/40 text-cyan-300">
              ISO/TR 14045 · MECÁNICA DE MEDIOS CONTINUOS
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-500/30 bg-emerald-950/40 text-emerald-300">
              {limitState.code}
            </span>
          </div>
          
          <h3 className="text-xl font-bold font-serif tracking-tight mt-1 text-white flex items-center gap-2">
            <Disc className="w-5 h-5 text-cyan-400 animate-spin-slow" />
            Rig de Equilibrio Estático & Celdas de Carga
          </h3>
          <p className="text-xs text-slate-300 mt-0.5 font-mono">
            ΣF_y = 0 · ΣM_O = 0 · Tensión Uniaxial σ = D / H
          </p>
        </div>

        {/* Real-time Engineering Readouts: FS and Sigma */}
        <div className="flex items-center gap-3">
          {/* Factor of Safety */}
          <div className={`px-3.5 py-2 rounded-xl border ${limitState.fsBadge}`}>
            <div className="text-[9px] font-mono uppercase tracking-wider opacity-80 font-bold">
              Factor de Seguridad (FS = 1/σ)
            </div>
            <div className="text-xl font-mono font-black flex items-baseline gap-1">
              <span>{factorOfSafety.toFixed(2)}</span>
              <span className="text-[10px] font-normal opacity-70">
                {factorOfSafety >= 1.0 ? '[Estable]' : '[Falla]'}
              </span>
            </div>
          </div>

          {/* Systemic Stress σ */}
          <div className="px-3.5 py-2 rounded-xl border bg-bio-deep/90 border-cyan-500/40 text-cyan-300 shadow-inner">
            <div className="text-[9px] font-mono uppercase tracking-wider opacity-80 font-bold">
              Tensión Uniaxial (σ = D/H)
            </div>
            <div className="text-xl font-mono font-black text-white">
              {sigma.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* CAD Schematic / Technical Blueprint Canvas */}
      <div className="relative w-full bg-[#05130e] rounded-2xl border border-emerald-500/30 p-4 sm:p-6 overflow-hidden shadow-2xl select-none">
        
        {/* Engineering Technical Grid Background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(52, 211, 153, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(52, 211, 153, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Overlay Telemetry HUD Tags */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-2 text-[10px] font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>TRANSDUCER RIG · SENSOR BIAXIAL</span>
            <span className="text-emerald-400">STATUS: ON-LINE</span>
          </div>
          <div className="flex items-center gap-3">
            <span>DEFLEXIÓN θ: <strong className="text-white">{tiltDeg > 0 ? `+${tiltDeg}` : tiltDeg}°</strong> ({thetaMrad} mrad)</span>
            <span>MOMENTO NETO ΔM: <strong className={deltaMoment > 0 ? 'text-rose-400' : 'text-emerald-400'}>{deltaMoment} kNm</strong></span>
          </div>
        </div>

        {/* Technical SVG Schematic */}
        <div className="relative z-10 w-full flex justify-center py-2">
          <svg viewBox="0 0 680 250" className="w-full max-w-2xl h-auto overflow-visible">
            <defs>
              {/* Force Vector Gradients */}
              <linearGradient id="loadVectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#be123c" />
              </linearGradient>
              <linearGradient id="reactionVectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>

              {/* Technical Hatch Pattern for Fixed Ground */}
              <pattern id="groundHatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                <line x1="0" y1="0" x2="0" y2="8" stroke="#34d399" strokeWidth="1.2" strokeOpacity="0.4" />
              </pattern>

              {/* Marker Arrowheads */}
              <marker id="arrowRed" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#f43f5e" />
              </marker>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
              </marker>
              <marker id="arrowCyan" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* ============================================================== */}
            {/* 1. FIXED DATUM & MEASUREMENT BENCHMARK LINES                   */}
            {/* ============================================================== */}
            
            {/* Horizontal Neutral Line (Datum 0) */}
            <line x1="40" y1="125" x2="640" y2="125" stroke="#1e4e3d" strokeWidth="1" strokeDasharray="4 4" />
            <text x="45" y="120" className="text-[8px] font-mono fill-emerald-500/60">DATUM EJE NEUTRO (y = 0)</text>

            {/* Left Dimension Line for L/2 */}
            <line x1="120" y1="35" x2="340" y2="35" stroke="#065f46" strokeWidth="1" markerStart="url(#arrowCyan)" markerEnd="url(#arrowCyan)" />
            <text x="230" y="30" textAnchor="middle" className="text-[9px] font-mono fill-cyan-400/80">L/2 = 250 mm</text>

            {/* Right Dimension Line for L/2 */}
            <line x1="340" y1="35" x2="560" y2="35" stroke="#065f46" strokeWidth="1" markerStart="url(#arrowCyan)" markerEnd="url(#arrowCyan)" />
            <text x="450" y="30" textAnchor="middle" className="text-[9px] font-mono fill-cyan-400/80">L/2 = 250 mm</text>

            {/* ============================================================== */}
            {/* 2. RIG STRUCTURAL SUPPORT STAND (ROCA / BASE FIJA)            */}
            {/* ============================================================== */}
            {/* Base block */}
            <rect x="290" y="220" width="100" height="15" fill="#09281e" stroke="#34d399" strokeWidth="1.2" />
            <rect x="290" y="235" width="100" height="8" fill="url(#groundHatch)" stroke="#34d399" strokeWidth="0.8" strokeOpacity="0.5" />

            {/* Triangular Fulcrum (Rótula Fija ISO) */}
            <polygon points="340,132 305,220 375,220" fill="#0b3829" stroke="#34d399" strokeWidth="1.8" />
            <circle cx="340" cy="180" r="14" fill="#051a13" stroke="#34d399" strokeWidth="1" strokeDasharray="2 2" />

            {/* Knife-edge Hardened Pivot Pin */}
            <circle cx="340" cy="125" r="9" fill="#0f4935" stroke="#38bdf8" strokeWidth="2" />
            <circle cx="340" cy="125" r="3" fill="#ffffff" />
            <circle cx="340" cy="125" r="1" fill="#000000" />

            {/* Angular Vernier Scale Arc at Pivot */}
            <path d="M 315 125 A 25 25 0 0 1 365 125" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="340" y1="100" x2="340" y2="92" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="340" y="87" textAnchor="middle" className="text-[8px] font-mono fill-cyan-300">0.0°</text>

            {/* ============================================================== */}
            {/* 3. DYNAMICALLY DEFLECTING STRUCTURAL BEAM (VIGA I-BEAM / TRUSS) */}
            {/* ============================================================== */}
            <g transform={`rotate(${tiltDeg} 340 125)`} className="transition-transform duration-700 ease-out">
              
              {/* Main Structural I-Beam Body */}
              {/* Web plate */}
              <rect x="110" y="119" width="460" height="12" fill="#0b2e22" stroke="#38bdf8" strokeWidth="1.5" rx="2" />
              {/* Top Flange */}
              <rect x="110" y="115" width="460" height="5" fill="#14533d" stroke="#34d399" strokeWidth="1" />
              {/* Bottom Flange */}
              <rect x="110" y="130" width="460" height="5" fill="#14533d" stroke="#34d399" strokeWidth="1" />

              {/* Neutral axis dashed center-line inside beam */}
              <line x1="110" y1="125" x2="570" y2="125" stroke="#a7f3d0" strokeWidth="1" strokeDasharray="6 3" />

              {/* Laser-Etched Measurement Ticks along Beam */}
              {[150, 190, 230, 270, 310, 370, 410, 450, 490, 530].map(tx => (
                <line key={tx} x1={tx} y1="115" x2={tx} y2="120" stroke="#34d399" strokeWidth="1" strokeOpacity="0.7" />
              ))}

              {/* ------------------------------------------------------------ */}
              {/* LEFT APPLICATION RIG: Extractive Load F_D                    */}
              {/* ------------------------------------------------------------ */}
              <g transform="translate(120, 125)">
                {/* Load Cell Cylinder Mount */}
                <rect x="-18" y="-14" width="36" height="28" fill="#1c0f14" stroke="#f43f5e" strokeWidth="1.5" rx="3" />
                <circle cx="0" cy="0" r="4" fill="#f43f5e" />
                <text x="0" y="3" textAnchor="middle" className="text-[7px] font-mono font-bold fill-white">LC-1</text>

                {/* Vertical Engineering Load Vector Arrow (Downwards) */}
                <line 
                  x1="0" 
                  y1="-75" 
                  x2="0" 
                  y2="-18" 
                  stroke="#f43f5e" 
                  strokeWidth="3.5" 
                  markerEnd="url(#arrowRed)" 
                />

                {/* Force Vector Annotation Box */}
                <rect x="-85" y="-105" width="170" height="26" fill="#1f0910" stroke="#f43f5e" strokeWidth="1.2" rx="4" />
                <text x="0" y="-93" textAnchor="middle" className="text-[9px] font-mono font-bold fill-rose-300">
                  CARGA ACTUANTE (F_D)
                </text>
                <text x="0" y="-82" textAnchor="middle" className="text-[10px] font-mono font-black fill-white">
                  D = {D.toFixed(2)} [EXTRACCIÓN]
                </text>
              </g>

              {/* ------------------------------------------------------------ */}
              {/* RIGHT APPLICATION RIG: Structural Capacity Reaction R_H      */}
              {/* ------------------------------------------------------------ */}
              <g transform="translate(560, 125)">
                {/* Reaction Load Cell Mount */}
                <rect x="-18" y="-14" width="36" height="28" fill="#092119" stroke="#34d399" strokeWidth="1.5" rx="3" />
                <circle cx="0" cy="0" r="4" fill="#34d399" />
                <text x="0" y="3" textAnchor="middle" className="text-[7px] font-mono font-bold fill-white">LC-2</text>

                {/* Vertical Engineering Reaction Vector Arrow (Downwards/Equilibrating) */}
                <line 
                  x1="0" 
                  y1="-75" 
                  x2="0" 
                  y2="-18" 
                  stroke="#34d399" 
                  strokeWidth="3.5" 
                  markerEnd="url(#arrowGreen)" 
                />

                {/* Force Vector Annotation Box */}
                <rect x="-85" y="-105" width="170" height="26" fill="#072318" stroke="#34d399" strokeWidth="1.2" rx="4" />
                <text x="0" y="-93" textAnchor="middle" className="text-[9px] font-mono font-bold fill-emerald-300">
                  REACCIÓN PORTANTE (R_H)
                </text>
                <text x="0" y="-82" textAnchor="middle" className="text-[10px] font-mono font-black fill-white">
                  H = {H.toFixed(2)} [CAPACIDAD]
                </text>
              </g>

              {/* Deflection Angle Indicator Line along tilted beam */}
              <line x1="280" y1="125" x2="400" y2="125" stroke="#38bdf8" strokeWidth="1" />
            </g>

            {/* Real-time Resultant Moment Vector (Curved Arrow at Pivot) */}
            <g transform="translate(340, 125)">
              <circle cx="0" cy="0" r="28" fill="none" stroke={deltaMoment > 0 ? '#f43f5e' : '#34d399'} strokeWidth="1.5" strokeDasharray="4 2" />
              <text x="0" y="44" textAnchor="middle" className="text-[8px] font-mono fill-slate-300">
                M_O = {deltaMoment > 0 ? `+${deltaMoment}` : deltaMoment} kNm
              </text>
            </g>

          </svg>
        </div>

        {/* Engineering Diagnostic Footer Bar */}
        <div className="relative z-10 mt-3 pt-3 border-t border-emerald-500/20 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          
          <div className="flex items-center gap-2 bg-bio-deep/70 p-2.5 rounded-xl border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: limitState.statusColor }}></span>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Estado Límite (Eurocódigo)</span>
              <strong className="text-white text-[11px]">{limitState.label}</strong>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-bio-deep/70 p-2.5 rounded-xl border border-emerald-500/20">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Respuesta del Eje Neutro</span>
              <span className="text-cyan-200 text-[11px]">
                {tiltDeg > 2 ? 'Inclinación Horaria (Sobrecarga D)' : tiltDeg < -2 ? 'Inclinación Antihoraria (Reserva H)' : 'Equilibrio Cuasi-Estático'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-bio-deep/70 p-2.5 rounded-xl border border-emerald-500/20">
            <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-bold">Veredicto Estructural</span>
              <span className="text-slate-200 text-[10px] leading-tight block">
                {limitState.diag}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
