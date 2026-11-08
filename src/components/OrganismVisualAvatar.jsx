import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Mountain, Shield, Zap, Compass, Leaf, HeartHandshake, BrainCircuit, Activity } from 'lucide-react';

export default function OrganismVisualAvatar({ santanderState, activePreset }) {
  const { H, S, E, K, sigma, regime, regimeColor, isCritical } = santanderState;

  // Determine atmospheric aura based on regime
  const auraGlow = {
    green: 'from-emerald-500/15 via-teal-500/10 to-transparent',
    amber: 'from-amber-500/15 via-orange-500/10 to-transparent',
    red: 'from-rose-500/20 via-red-500/10 to-transparent',
    black: 'from-purple-950/30 via-black to-transparent',
  }[regimeColor] || 'from-emerald-500/15 via-blue-500/10 to-transparent';

  const badgeText = {
    green: '✨ RÉGIMEN SINTRÓPICO VIVO',
    amber: '⚠️ ATENCIÓN: FATIGA METABÓLICA',
    red: '🚨 ALERTA: SOBRECARGA CRÍTICA',
    black: '⛔ COLAPSO POR EXTRACTIVISMO',
  }[regimeColor] || 'ESTADO ESTABLE';

  const badgeStyle = {
    green: 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(52,211,153,0.3)]',
    amber: 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]',
    red: 'bg-rose-950/80 border-rose-400 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.3)]',
    black: 'bg-black/90 border-slate-700 text-slate-400 shadow-none',
  }[regimeColor];

  return (
    <div className="relative rounded-3xl p-6 sm:p-8 card-slate overflow-hidden shadow-2xl border border-white/15">
      {/* Dynamic Cosmic Radial Glow */}
      <div className={`absolute inset-0 bg-radial-gradient ${auraGlow} pointer-events-none transition-all duration-700`} />

      <div className="relative z-10 space-y-6">
        
        {/* Top Header: Telemetry State & Global Syntropy Index */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-amber-400 animate-pulse" />
              <h2 className="text-xl font-serif font-bold text-white tracking-wide">
                Telemetría Dinámica del Organismo Territorial
              </h2>
            </div>
            {/* Live Status Badge */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 2.5, repeatType: "reverse" }}
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${badgeStyle}`}
            >
              {badgeText}
            </motion.div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300/80 block">
                Índice Global (H)
              </span>
              <span className="font-mono text-2xl font-bold text-white tracking-tight">
                {H.toFixed(3)}
              </span>
            </div>
            <div className="h-8 w-px bg-white/15" />
            <div className="text-right">
              <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300/80 block">
                Tensión (σ)
              </span>
              <span className="font-mono text-2xl font-bold text-blue-300 tracking-tight">
                {sigma.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Master Progress Bar for Syntropy Index H */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Capacidad Portante y Autosustento Sintrópico
            </span>
            <span className="text-slate-400 text-[11px]">
              {H >= 0.7 ? 'Zona Resiliente' : H >= 0.5 ? 'Límite Elástico' : 'Zona Plástica/Fractura'}
            </span>
          </div>

          <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-cyan-400 shadow-[0_0_14px_rgba(245,197,66,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(Math.max(H * 100, 5), 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-0.5">
            <span>0.00 (Colapso Territorial)</span>
            <span className="text-amber-400/90 font-bold">0.50 (Límite Elástico / Umbral Crítico)</span>
            <span>1.00 (Autonomía Sintrópica Plena)</span>
          </div>
        </div>

        {/* The Three Pillars / Shoulders Visualized as Living Conduits */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          
          {/* Hombro Social */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#DA7B93]/30 hover:border-[#DA7B93] transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif font-bold text-[#DA7B93] flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4" />
                Hombro Social (S)
              </span>
              <span className="font-mono text-base font-bold text-white">
                {S.toFixed(2)}
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#DA7B93] to-rose-400 rounded-full"
                style={{ width: `${S * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 mt-2.5 leading-snug">
              <strong>Pico 1:</strong> Cohesión comunitaria, redes de cuidado mutuo y salud territorial.
            </p>
          </div>

          {/* Hombro Ecológico */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#376E6F]/40 hover:border-[#376E6F] transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif font-bold text-emerald-400 flex items-center gap-1.5">
                <Leaf className="w-4 h-4" />
                Hombro Ecológico (E)
              </span>
              <span className="font-mono text-base font-bold text-white">
                {E.toFixed(2)}
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#376E6F] to-emerald-400 rounded-full"
                style={{ width: `${E * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 mt-2.5 leading-snug">
              <strong>Pico 2:</strong> Suelo vivo, biomasa vegetal, balance hídrico y fotosíntesis activa.
            </p>
          </div>

          {/* Hombro Económico o Capital */}
          <div className="p-4 rounded-2xl bg-black/40 border border-[#927660]/40 hover:border-[#927660] transition-all group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-serif font-bold text-[#D4A373] flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4" />
                Hombro Económico o Capital (K)
              </span>
              <span className="font-mono text-base font-bold text-white">
                {K.toFixed(2)}
              </span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#927660] to-[#D4A373] rounded-full"
                style={{ width: `${K * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-300 mt-2.5 leading-snug">
              <strong>Pico 3:</strong> Capital productivo regenerativo, soberanía económica y tecnología abierta.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
