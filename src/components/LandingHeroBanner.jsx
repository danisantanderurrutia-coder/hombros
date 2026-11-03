import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Sliders, ArrowRight, ShieldCheck, 
  RotateCcw, Trees, Users, Coins, Activity, 
  ChevronRight, Compass, Flame, Info, CheckCircle2,
  TrendingUp, Award, Layers
} from 'lucide-react';
import GoldenAtlasHillAscent from './GoldenAtlasHillAscent';

export default function LandingHeroBanner({ onNavigate }) {
  // Variables E, S, K state (starting at a balanced inspiring state)
  const [E, setE] = useState(0.72); // Ecológico
  const [S, setS] = useState(0.68); // Social
  const [K, setK] = useState(0.70); // Económico / Capital

  // Mathematical capacity calculations
  const H = Math.pow(E * S * K, 1 / 3);
  const aritH = (E + S + K) / 3;
  const liebigPenalty = (aritH - H).toFixed(3);

  // Muscle bulk and elevation percentage
  const musclePercent = Math.round(((E + S + K) / 3) * 100);
  const liftElevationPercent = Math.round(H * 100);

  // Status diagnostics
  const getRegimeStatus = () => {
    const minVal = Math.min(E, S, K);
    if (minVal < 0.3) {
      return {
        title: 'Asimetría Crítica (Cuello de Botella)',
        color: 'text-rose-400 bg-rose-950/80 border-rose-500/50',
        desc: 'Un hombro colapsado impide levantar el mundo, sin importar cuánto crezcan los otros dos.',
      };
    }
    if (H < 0.5) {
      return {
        title: 'Fatiga de Ascenso',
        color: 'text-amber-300 bg-amber-950/80 border-amber-500/50',
        desc: 'La esfera se siente pesada y los músculos se fatigan en la pendiente.',
      };
    }
    if (H >= 0.8) {
      return {
        title: 'Autosustento Sintrópico Pleno',
        color: 'text-emerald-300 bg-emerald-950/80 border-emerald-500/50',
        desc: 'Hombros gigantescos elevan la biosfera hacia las estrellas con solidez inquebrantable.',
      };
    }
    return {
      title: 'Desarrollo en Equilibrio Elástico',
      color: 'text-teal-300 bg-[#16272b] border-teal-500/40',
      desc: 'Capacidad portante suficiente para sostener la carga y continuar el ascenso.',
    };
  };

  const status = getRegimeStatus();

  // Presets
  const applyPreset = (presetE, presetS, presetK) => {
    setE(presetE);
    setS(presetS);
    setK(presetK);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[#D4A373]/50 shadow-2xl bg-gradient-to-b from-[#0B1522] via-[#101C2B] to-[#182838] text-white">
      {/* Dynamic Cosmic Background Atmosphere */}
      <div className="absolute inset-0 bg-radial-gradient from-[#7DB2B2]/10 via-[#D4A373]/5 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-gradient-to-bl from-[#F5D061]/15 via-[#38BDF8]/10 to-transparent pointer-events-none rounded-bl-full blur-2xl" />

      {/* Decorative Top Accent Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#D4A373] via-[#F5D061] to-[#7DB2B2]" />

      <div className="p-6 sm:p-8 md:p-10 relative z-10 space-y-8">
        
        {/* ========================================================
            HEADER MONUMENTAL / BRUTAL
            ======================================================== */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-white/10 text-[#F5D061] border border-[#F5D061]/40 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#F5D061] animate-pulse" />
            <span>SISTEMA METABÓLICO TERRITORIAL · LEY DE LIEBIG & CAUCHY</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Desarrollar los hombros, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF4D0] via-[#F5D061] to-[#D4A373]">
              autosustentar el desarrollo
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
            El peso del porvenir no se aligera disminuyendo aspiraciones, sino ensanchando la capacidad portante territorial: los tres hombros inseparables{' '}
            <strong className="text-emerald-300">Ecológico (E)</strong>,{' '}
            <strong className="text-rose-300">Social (S)</strong> y{' '}
            <strong className="text-amber-300">Económico o Capital (K)</strong>.
          </p>
        </div>

        {/* ========================================================
            BANNER GRÁFICO: EL ATLAS DORADO SUBIENDO EL CERRO
            ======================================================= */}
        <div className="relative rounded-3xl p-2 sm:p-4 bg-gradient-to-b from-[#080E18]/80 to-[#121E2C]/90 border border-white/10 shadow-inner">
          <GoldenAtlasHillAscent E={E} S={S} K={K} />

          {/* Floating Live Telemetry Overlay in graphic */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 pointer-events-none">
            <div className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border backdrop-blur-md shadow-lg ${status.color}`}>
              {status.title}
            </div>
            <div className="text-[11px] font-mono text-slate-300 bg-black/60 px-3 py-1 rounded-lg border border-white/10 backdrop-blur-md">
              Capacidad Portante: <strong className="text-[#F5D061] text-sm font-bold">{H.toFixed(3)}</strong>
            </div>
          </div>

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex flex-col gap-1.5 pointer-events-none text-right font-mono text-xs">
            <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-slate-300">
              Desarrollo Muscular: <strong className="text-emerald-400">{musclePercent}%</strong>
            </div>
            <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-slate-300">
              Elevación Celeste: <strong className="text-[#38BDF8]">{liftElevationPercent}%</strong>
            </div>
            <div className="bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-slate-300">
              Escalinata del Olimpo: <strong className={1 - H > 0.5 ? 'text-rose-400' : 'text-[#F5D061]'}>
                {Math.round((0.07 + 0.2 * (1 - H)) * 100)}% {1 - H > 0.5 ? '(Entropía)' : '(Sintropía)'}
              </strong>
            </div>
          </div>
        </div>

        {/* ========================================================
            PANEL DE CONTROL INTERACTIVO DE VARIABLES E, S, K
            ======================================================== */}
        <div className="p-6 sm:p-8 rounded-3xl bg-black/40 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2.5">
                <Sliders className="w-5 h-5 text-[#F5D061]" />
                <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                  Palancas de Crecimiento Muscular y Elevación
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Mueve las variables E, S y K: observa cómo se ensanchan los hombros, cómo la esfera se eleva hacia las estrellas y cómo la pendiente se allana con la sintropía.
              </p>
            </div>

            {/* Presets Rápidos */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono text-slate-400">Arquetipos:</span>
              <button
                onClick={() => applyPreset(0.20, 0.35, 0.90)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-rose-950/70 text-rose-300 border border-rose-600/40 hover:bg-rose-900/80 transition-all"
              >
                Colapso Extractivo
              </button>
              <button
                onClick={() => applyPreset(0.55, 0.55, 0.55)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-800 text-slate-200 border border-slate-600/50 hover:bg-slate-700 transition-all"
              >
                Equilibrio Basal
              </button>
              <button
                onClick={() => applyPreset(0.95, 0.92, 0.96)}
                className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-[#D49419] to-[#7DB2B2] text-white border border-white/30 hover:scale-102 transition-all shadow-md"
              >
                Plenitud Sintrópica
              </button>
            </div>
          </div>

          {/* SLIDERS GRID: E, S, K */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Slider 1: Hombro Ecológico (E) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#142628]/90 to-[#0e1d1f]/90 border border-[#7DB2B2]/40 shadow-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-serif font-bold text-[#7DB2B2] flex items-center gap-2">
                  <Trees className="w-4 h-4 text-[#7DB2B2]" />
                  Hombro Ecológico (E)
                </span>
                <span className="font-mono text-lg font-bold text-emerald-400">
                  {E.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0.10"
                max="1.00"
                step="0.01"
                value={E}
                onChange={(e) => setE(parseFloat(e.target.value))}
                className="w-full accent-[#7DB2B2] cursor-pointer h-2 bg-black/60 rounded-lg"
              />

              <div className="text-[11px] text-slate-300 space-y-1">
                <p><strong>Músculo:</strong> Ensancha los deltoides y la base de apoyo.</p>
                <p className="text-slate-400">Cuenca hídrica, suelo vivo, biomasa activa y regeneración fotosintética.</p>
              </div>
            </div>

            {/* Slider 2: Hombro Social (S) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#2d1b22]/90 to-[#201319]/90 border border-[#C86D51]/40 shadow-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-serif font-bold text-rose-300 flex items-center gap-2">
                  <Users className="w-4 h-4 text-rose-400" />
                  Hombro Social (S)
                </span>
                <span className="font-mono text-lg font-bold text-rose-300">
                  {S.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0.10"
                max="1.00"
                step="0.01"
                value={S}
                onChange={(e) => setS(parseFloat(e.target.value))}
                className="w-full accent-rose-400 cursor-pointer h-2 bg-black/60 rounded-lg"
              />

              <div className="text-[11px] text-slate-300 space-y-1">
                <p><strong>Músculo:</strong> Potencia los bíceps y la fuerza de agarre.</p>
                <p className="text-slate-400">Cohesión comunitaria, redes de cuidado, equidad y salud territorial.</p>
              </div>
            </div>

            {/* Slider 3: Hombro Económico o Capital (K) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#2a2418]/90 to-[#1e1910]/90 border border-[#F5D061]/40 shadow-lg space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-[#F5D061]" />
                  Hombro Económico o Capital (K)
                </span>
                <span className="font-mono text-lg font-bold text-amber-300">
                  {K.toFixed(2)}
                </span>
              </div>

              <input
                type="range"
                min="0.10"
                max="1.00"
                step="0.01"
                value={K}
                onChange={(e) => setK(parseFloat(e.target.value))}
                className="w-full accent-[#F5D061] cursor-pointer h-2 bg-black/60 rounded-lg"
              />

              <div className="text-[11px] text-slate-300 space-y-1">
                <p><strong>Músculo:</strong> Fortalece el torso, la columna y la postura erguida.</p>
                <p className="text-slate-400">Economía comunitaria, capital productivo regenerativo, diversificación y soberanía material.</p>
              </div>
            </div>

          </div>

          {/* METRIC BREAKDOWN BAR */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#F5D061] animate-ping shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Fórmula de Liebig (Media Geométrica):</span>
                <span className="text-white font-bold text-sm">
                  H = (E · S · K)<sup>1/3</sup> = <strong className="text-[#F5D061] text-base">{H.toFixed(3)}</strong>
                </span>
              </div>
            </div>

            <div className="text-slate-300 text-center md:text-left text-[11px]">
              {parseFloat(liebigPenalty) > 0.1 ? (
                <span className="text-rose-400">
                  ⚠️ El hombro más débil limita todo el sistema (Penalización Liebig: -{liebigPenalty}).
                </span>
              ) : (
                <span className="text-emerald-400">
                  ✨ Armonía de trípode: los tres hombros comparten la carga equitativamente.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {onNavigate && (
                <button
                  onClick={() => onNavigate('core')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-serif font-bold text-xs bg-gradient-to-r from-[#F5D061] to-[#D4A373] text-slate-950 hover:brightness-110 shadow-lg shadow-[#F5D061]/20 transition-all"
                >
                  Entrar a El Núcleo
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
