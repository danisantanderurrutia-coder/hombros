import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, Sliders, ArrowRight, ShieldCheck, 
  RotateCcw, Trees, Users, Coins, Activity, 
  ChevronRight, Compass, Flame, Info, CheckCircle2,
  TrendingUp, Award, Layers, Mountain, BookOpen, Globe
} from 'lucide-react';
import GoldenAtlasHillAscent from './GoldenAtlasHillAscent';
import FilosofiaHombrosModal from './FilosofiaHombrosModal';

export default function LandingHeroBanner({ onNavigate, onNavigateCustomAudit }) {
  // Variables E, S, K state (starting at a balanced inspiring state)
  const [E, setE] = useState(0.72); // Ecológico
  const [S, setS] = useState(0.68); // Social
  const [K, setK] = useState(0.70); // Económico / Capital
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mathematical capacity calculations
  const H = Math.pow(E * S * K, 1 / 3);
  const aritH = (E + S + K) / 3;
  const liebigPenalty = (aritH - H).toFixed(3);

  // Muscle bulk and elevation percentage
  const musclePercent = Math.round(((E + S + K) / 3) * 100);
  const liftElevationPercent = Math.round(H * 100);

  // Identify bottleneck shoulder
  const minVal = Math.min(E, S, K);
  const bottleneckName = minVal === E ? 'Ecológico (E)' : minVal === S ? 'Social (S)' : 'Económico (K)';

  // Status diagnostics
  const getRegimeStatus = () => {
    if (minVal < 0.3) {
      return {
        title: 'Asimetría Crítica · Cuello de Botella',
        badgeColor: 'bg-rose-950/80 text-rose-300 border-rose-500/50',
        glowColor: 'shadow-rose-500/20',
        dotColor: 'bg-rose-400',
        desc: `El hombro ${bottleneckName} está colapsado y bloquea el ascenso del territorio, sin importar cuánto crezcan los otros dos.`,
      };
    }
    if (H < 0.5) {
      return {
        title: 'Fatiga de Ascenso · Capacidad Limitada',
        badgeColor: 'bg-amber-950/80 text-amber-200 border-amber-500/50',
        glowColor: 'shadow-amber-500/20',
        dotColor: 'bg-amber-400',
        desc: 'La esfera se siente pesada y la musculatura comunitaria se fatiga en la pendiente.',
      };
    }
    if (H >= 0.8) {
      return {
        title: 'Autosustento Sintrópico Pleno',
        badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-400/50',
        glowColor: 'shadow-emerald-500/30',
        dotColor: 'bg-emerald-400',
        desc: 'Hombros gigantescos elevan la biosfera hacia las estrellas con solidez inquebrantable.',
      };
    }
    return {
      title: 'Desarrollo en Equilibrio Elástico',
      badgeColor: 'bg-[#0E2A38]/90 text-teal-200 border-teal-400/40',
      glowColor: 'shadow-teal-500/20',
      dotColor: 'bg-teal-400',
      desc: 'Capacidad portante suficiente para sostener la carga territorial y continuar el ascenso continuo.',
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
    <>
      <div className="relative w-full rounded-3xl overflow-hidden border border-[#D4C9B8]/70 shadow-2xl bg-gradient-to-b from-[#091522] via-[#0E2032] to-[#142A3E] text-white">
        {/* Dynamic Cosmic Background Atmosphere */}
        <div className="absolute inset-0 bg-radial-gradient from-[#7DB2B2]/15 via-[#1B4332]/10 to-transparent pointer-events-none" />
        <div className="absolute top-0 right-0 w-[450px] h-[350px] bg-gradient-to-bl from-[#7FDBDA]/10 via-[#38BDF8]/5 to-transparent pointer-events-none rounded-bl-full blur-3xl opacity-50" />

        {/* Decorative Top Accent Stripe */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#1B4332] via-[#7DB2B2] to-[#C86D51] relative z-20" />

        {/* ========================================================
            BLOQUE SUPERIOR EXTENDIDO (BASE OSCURA CON DIFUMINADO)
            El texto se sitúa alto para dejar el planeta cósmico 100% libre y visible
            ======================================================== */}
        <div className="relative z-10 pt-10 sm:pt-14 md:pt-16 pb-4 sm:pb-6 px-4 sm:px-6 md:px-8 text-center max-w-4xl mx-auto space-y-3 sm:space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-black/60 text-emerald-300 border border-emerald-400/40 shadow-lg backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>SISTEMA METABÓLICO TERRITORIAL · LEY DE LIEBIG & CAUCHY</span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 backdrop-blur-md transition-all cursor-pointer"
            >
              <Mountain className="w-3 h-3 text-emerald-300" />
              <span>Alegoría de los Hombros</span>
              <ChevronRight className="w-3 h-3 text-emerald-300" />
            </button>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-white leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Desarrollar los hombros, <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7DB2B2] to-[#C86D51]">
              autosustentar el desarrollo
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 max-w-2xl mx-auto font-sans leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
            El peso del porvenir no se aligera disminuyendo aspiraciones, sino ensanchando la capacidad portante territorial: los tres hombros inseparables{' '}
            <strong className="text-emerald-300 font-semibold">Ecológico (E)</strong>,{' '}
            <strong className="text-rose-300 font-semibold">Social (S)</strong> y{' '}
            <strong className="text-amber-300 font-semibold">Económico o Capital (K)</strong>.
          </p>
        </div>

        {/* ========================================================
            EL GRÁFICO CUBRIENDO EL ÁREA CON DIFUMINADO INTEGRADO
            El planeta queda completamente libre y despejado
            ======================================================== */}
        <div
          className="relative w-full overflow-hidden -mt-6 sm:-mt-10 md:-mt-14"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.95) 24%, black 36%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.5) 12%, rgba(0,0,0,0.95) 24%, black 36%)',
          }}
        >
          {/* Difuminado suave continuo entre el bloque oscuro superior y el cielo del gráfico */}
          <div className="absolute inset-x-0 top-0 h-44 sm:h-56 md:h-68 bg-gradient-to-b from-[#091522] via-[#091522]/85 to-transparent pointer-events-none z-10" />
          
          {/* Velo complementario específico en el lado superior derecho para igualar perfectamente la disolución al fondo */}
          <div className="absolute top-0 right-0 w-2/3 h-52 sm:h-64 md:h-76 bg-gradient-to-bl from-[#091522] via-[#091522]/85 to-transparent pointer-events-none z-10" />

          <GoldenAtlasHillAscent E={E} S={S} K={K} className="w-full" />
        </div>

        {/* ========================================================
            CONSOLA DE CONTROL HUD AEROESPACIAL (GLASSMORPHISM SLEEK)
            ======================================================== */}
        <div className="relative z-10 p-5 sm:p-7 md:p-8 bg-[#07131e]/85 border-t border-white/15 backdrop-blur-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] space-y-6">
          
          {/* BARRA DE TELEMETRÍA Y ARQUETIPOS */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-white/10">
            <div className="space-y-1.5">
              <div className="flex items-center gap-3">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border shadow-md backdrop-blur-md ${status.badgeColor} ${status.glowColor}`}>
                  <span className={`w-2 h-2 rounded-full ${status.dotColor} animate-pulse`} />
                  <span>{status.title}</span>
                </div>
                <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 text-xs font-mono">
                  <span className="text-slate-400">Capacidad Portante H:</span>
                  <span className="text-cyan-300 font-bold">{H.toFixed(3)}</span>
                </div>
              </div>
              <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-xl">
                {status.desc}
              </p>
            </div>

            {/* Presets de Arquetipos Territoriales */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-semibold mr-1">
                Arquetipos:
              </span>
              <button
                onClick={() => applyPreset(0.20, 0.35, 0.90)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  E === 0.20 && S === 0.35 && K === 0.90
                    ? 'bg-rose-900/90 text-rose-200 border-rose-400 shadow-md shadow-rose-950'
                    : 'bg-black/40 text-slate-300 border-white/10 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40'
                }`}
              >
                ⚡ Colapso Extractivo
              </button>
              <button
                onClick={() => applyPreset(0.55, 0.55, 0.55)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  E === 0.55 && S === 0.55 && K === 0.55
                    ? 'bg-slate-700 text-white border-slate-400 shadow-md'
                    : 'bg-black/40 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white hover:border-slate-500/50'
                }`}
              >
                ⚖️ Equilibrio Basal
              </button>
              <button
                onClick={() => applyPreset(0.85, 0.90, 0.65)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  E === 0.85 && S === 0.90 && K === 0.65
                    ? 'bg-teal-900/90 text-teal-200 border-teal-400 shadow-md'
                    : 'bg-black/40 text-slate-300 border-white/10 hover:bg-teal-950/40 hover:text-teal-300 hover:border-teal-500/40'
                }`}
              >
                🌿 Resiliencia Territorial
              </button>
              <button
                onClick={() => applyPreset(0.95, 0.92, 0.96)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                  E === 0.95 && S === 0.92 && K === 0.96
                    ? 'bg-gradient-to-r from-amber-500 to-teal-400 text-slate-950 font-bold border-white shadow-lg'
                    : 'bg-black/40 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white hover:border-amber-400/50'
                }`}
              >
                🌟 Plenitud Sintrópica
              </button>
            </div>
          </div>

          {/* SLIDERS GRID: TRES HOMBROS E, S, K */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            
            {/* 1. Hombro Ecológico (E) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#0a1e1b]/80 via-[#071614]/90 to-black/60 border border-emerald-500/30 hover:border-emerald-400/60 transition-all shadow-lg shadow-emerald-950/20 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-serif font-bold text-emerald-300 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                    <Trees className="w-3.5 h-3.5" />
                  </span>
                  Hombro Ecológico (E)
                </span>
                <span className="font-mono text-base font-bold text-emerald-300 px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500/40">
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
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-black/60 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-300 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(52,211,153,0.8)]"
              />

              <div className="text-[11px] text-slate-300 space-y-1 mt-3 pt-3 border-t border-white/5">
                <p className="flex items-center justify-between font-mono text-[10px] text-emerald-400">
                  <span>MÚSCULO: DELTOIDES</span>
                  <span>{Math.round(E * 100)}%</span>
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cuenca hídrica, suelo vivo, biomasa activa y regeneración fotosintética.
                </p>
              </div>
            </div>

            {/* 2. Hombro Social (S) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#24131a]/80 via-[#1a0e14]/90 to-black/60 border border-rose-500/30 hover:border-rose-400/60 transition-all shadow-lg shadow-rose-950/20 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-serif font-bold text-rose-300 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center border border-rose-500/40">
                    <Users className="w-3.5 h-3.5" />
                  </span>
                  Hombro Social (S)
                </span>
                <span className="font-mono text-base font-bold text-rose-300 px-2 py-0.5 rounded-md bg-rose-950/80 border border-rose-500/40">
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
                className="w-full accent-rose-400 cursor-pointer h-2 bg-black/60 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-rose-300 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(251,113,133,0.8)]"
              />

              <div className="text-[11px] text-slate-300 space-y-1 mt-3 pt-3 border-t border-white/5">
                <p className="flex items-center justify-between font-mono text-[10px] text-rose-400">
                  <span>MÚSCULO: BÍCEPS & AGARRE</span>
                  <span>{Math.round(S * 100)}%</span>
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Cohesión comunitaria, redes de cuidado, equidad vecinal y salud colectiva.
                </p>
              </div>
            </div>

            {/* 3. Hombro Económico o Capital (K) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#111f2d]/80 via-[#0d1620]/90 to-black/60 border border-cyan-500/30 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-950/20 group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-serif font-bold text-cyan-200 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
                    <Coins className="w-3.5 h-3.5" />
                  </span>
                  Hombro Económico (K)
                </span>
                <span className="font-mono text-base font-bold text-cyan-300 px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/40">
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
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-black/60 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-300 [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(103,232,249,0.8)]"
              />

              <div className="text-[11px] text-slate-300 space-y-1 mt-3 pt-3 border-t border-white/5">
                <p className="flex items-center justify-between font-mono text-[10px] text-cyan-400">
                  <span>MÚSCULO: TORSO & COLUMNA</span>
                  <span>{Math.round(K * 100)}%</span>
                </p>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Capital regenerativo, diversificación productiva y soberanía material.
                </p>
              </div>
            </div>

          </div>

          {/* METRIC BREAKDOWN & ACTION DOCK */}
          <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 font-mono text-xs backdrop-blur-md">
            
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping shrink-0" />
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold tracking-wider">
                  Fórmula de Liebig (Media Geométrica):
                </span>
                <span className="text-white font-bold text-sm">
                  H = (E · S · K)<sup>1/3</sup> = <strong className="text-cyan-300 text-base">{H.toFixed(3)}</strong>
                </span>
              </div>
            </div>

            <div className="text-slate-300 text-left text-[11px] max-w-md font-sans">
              {parseFloat(liebigPenalty) > 0.08 ? (
                <span className="text-rose-300 flex items-center gap-1.5 font-medium">
                  <span className="text-rose-400 font-bold">⚠️ Asimetría:</span>
                  El hombro más rezagado ({bottleneckName}) limita toda la capacidad portante (penalización Liebig: -{liebigPenalty}).
                </span>
              ) : (
                <span className="text-emerald-300 flex items-center gap-1.5 font-medium">
                  <span className="text-emerald-400 font-bold">✨ Armonía de Trípode:</span>
                  Los tres hombros equilibran la carga de manera eficiente y sin fisuras metabólicas.
                </span>
              )}
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-serif font-bold text-xs bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white transition-all border border-white/10 shadow"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                <span>Alegoría Completa</span>
              </button>

              {onNavigate && (
                <>
                  <button
                    onClick={() => onNavigate('core')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-bold text-xs bg-gradient-to-r from-[#28475A] to-[#487075] text-white hover:brightness-110 shadow-lg shadow-[#487075]/20 transition-all border border-white/20"
                  >
                    <Activity className="w-3.5 h-3.5 text-cyan-300" />
                    <span>Entrar a CORE</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>

                  <button
                    onClick={() => onNavigate('world_map')}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-serif font-bold text-xs bg-gradient-to-r from-emerald-700 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-700/20 transition-all border border-white/20"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-200" />
                    <span>Atlas Territorial</span>
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* MODAL DE FILOSOFÍA DE LOS HOMBROS (ALEGORÍA DE SÍSIFO A ATLAS) */}
      <FilosofiaHombrosModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
