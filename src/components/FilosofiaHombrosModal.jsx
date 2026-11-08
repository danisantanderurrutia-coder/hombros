import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Sliders, RotateCcw, Trees, Users, Coins, 
  Sparkles, ShieldCheck, Mountain, Compass, Info
} from 'lucide-react';
import GoldenAtlasHillAscent from './GoldenAtlasHillAscent';

export default function FilosofiaHombrosModal({ isOpen, onClose }) {
  const [E, setE] = useState(0.72); // Ecológico
  const [S, setS] = useState(0.68); // Social
  const [K, setK] = useState(0.70); // Económico / Capital

  if (!isOpen) return null;

  const H = Math.pow(E * S * K, 1 / 3);
  const aritH = (E + S + K) / 3;
  const liebigPenalty = (aritH - H).toFixed(3);

  const applyPreset = (presetE, presetS, presetK) => {
    setE(presetE);
    setS(presetS);
    setK(presetK);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl my-auto rounded-3xl bg-[#091522] border border-emerald-500/30 shadow-2xl text-white overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Header del Modal */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center">
                <Mountain className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-white tracking-wide">
                    Filosofía de los Hombros: De Sísifo a Atlas
                  </h3>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                    ALEGORÍA FUNDACIONAL
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-sans">
                  La condena no es el peso del mundo, sino la atrofia de los pilares basales.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
              title="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contenido desplazable */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-6 flex-1">
            {/* Manifiesto Breve */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed space-y-2">
              <p>
                <strong>¿Por qué Sísifo empuja la roca mientras Atlas sostiene el mundo?</strong> La economía tradicional concibe el desarrollo como una piedra rodante: extracción acelerada, consumo entrópico y reconstrucción perpetua tras el colapso. Es la condena de Sísifo.
              </p>
              <p>
                <strong>HOMBROS</strong> postula que si el territorio desarrolla armónicamente sus tres hombros —la cuenca ecológica (<strong className="text-emerald-300">E</strong>), la comunidad cuidadora (<strong className="text-rose-300">S</strong>) y el capital regenerativo (<strong className="text-amber-300">K</strong>)— la roca deja de rodar hacia el abismo y se transforma en una esfera celeste que asciende con paso firme por la escalinata hacia la soberanía.
              </p>
            </div>

            {/* El Escenario Interactivo de la Escalinata del Olimpo */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/60">
              <GoldenAtlasHillAscent E={E} S={S} K={K} className="w-full" />
            </div>

            {/* Panel de Controles E, S, K */}
            <div className="p-5 rounded-2xl bg-[#0A1624]/90 border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Palancas de Capacidad Muscular Territorial
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-400">Capacidad H = </span>
                  <span className="text-emerald-400 font-bold">{H.toFixed(3)}</span>
                  <span className="text-slate-500">(Liebig: -{liebigPenalty})</span>
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* ECOLÓGICO */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-300 flex items-center gap-1.5 font-bold">
                      <Trees className="w-3.5 h-3.5" /> Hombro E (Ecológico)
                    </span>
                    <span className="font-mono text-emerald-300 font-bold">{E.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="1.00"
                    step="0.01"
                    value={E}
                    onChange={(e) => setE(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <p className="text-[10px] text-slate-400 font-sans leading-tight">
                    Agua limpia, salud del suelo vivo y fotosíntesis de cuenca.
                  </p>
                </div>

                {/* SOCIAL */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-rose-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-rose-300 flex items-center gap-1.5 font-bold">
                      <Users className="w-3.5 h-3.5" /> Hombro S (Social)
                    </span>
                    <span className="font-mono text-rose-300 font-bold">{S.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="1.00"
                    step="0.01"
                    value={S}
                    onChange={(e) => setS(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                  />
                  <p className="text-[10px] text-slate-400 font-sans leading-tight">
                    Cohesión vecinal, cuidados mutuos y paz territorial sin violencia.
                  </p>
                </div>

                {/* ECONÓMICO */}
                <div className="p-3.5 rounded-xl bg-black/40 border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-amber-300 flex items-center gap-1.5 font-bold">
                      <Coins className="w-3.5 h-3.5" /> Hombro K (Económico)
                    </span>
                    <span className="font-mono text-amber-300 font-bold">{K.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.10"
                    max="1.00"
                    step="0.01"
                    value={K}
                    onChange={(e) => setK(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                  <p className="text-[10px] text-slate-400 font-sans leading-tight">
                    Autonomía productiva, ausencia de usura y capital regenerativo.
                  </p>
                </div>
              </div>

              {/* Presets Rápidos */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10 text-xs">
                <span className="text-[11px] font-mono text-slate-400">Escenarios típicos:</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => applyPreset(0.85, 0.80, 0.82)}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-mono text-[11px]"
                  >
                    Sintrópico Pleno
                  </button>
                  <button
                    onClick={() => applyPreset(0.25, 0.80, 0.85)}
                    className="px-2.5 py-1 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-mono text-[11px]"
                  >
                    Colapso de Cuenca (E=0.25)
                  </button>
                  <button
                    onClick={() => applyPreset(0.72, 0.68, 0.70)}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-slate-200 font-mono text-[11px] flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reiniciar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
