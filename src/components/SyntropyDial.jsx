import React from 'react';
import { Compass, TrendingUp, TrendingDown, RefreshCw, Sparkles, Activity } from 'lucide-react';

export default function SyntropyDial({ santanderState }) {
  const { gamma, gammaStatus, gammaTitle, H, sigma } = santanderState;

  const statusThemes = {
    sintropia: {
      badge: 'bg-[#173132] border-[#376E6F]/60 text-[#376E6F]',
      icon: TrendingUp,
      textColor: 'text-[#376E6F]',
      desc: 'El territorio gana organización biológica, resiliencia y soberanía comunitaria. La tasa de regeneración supera con creces el desgaste.'
    },
    estacionario: {
      badge: 'bg-amber-950/80 border-amber-500/60 text-amber-300',
      icon: RefreshCw,
      textColor: 'text-amber-400',
      desc: 'El sistema se encuentra en un balance metabólico estacionario. Ni gana ni pierde capacidad portante estructural.'
    },
    entropia: {
      badge: 'bg-rose-950/80 border-rose-500/60 text-rose-300',
      icon: TrendingDown,
      textColor: 'text-rose-400',
      desc: 'Entropía dominante. La sobreexplotación está degradando la base estructural de soporte. Si persiste, el territorio colapsará.'
    }
  };

  const currentTheme = statusThemes[gammaStatus] || statusThemes.estacionario;
  const StatusIcon = currentTheme.icon;

  return (
    <div className="rounded-3xl p-6 transition-all duration-300 shadow-2xl card-teal">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-black/40 border-white/15 text-[#376E6F] shadow-sm">
            Nivel 3: Indicador de Trayectoria · ¿Hacia dónde vamos?
          </span>
          <h3 className="text-xl font-bold font-serif tracking-tight mt-1 text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#376E6F]" />
            Ciclaje Sintrópico: Γ = ΔH / (H · Δt)
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Tasa de cambio de la capacidad portante en el tiempo (Derivada normalizada)
          </p>
        </div>

        {/* Live Gamma Pill */}
        <div className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border shadow-lg ${currentTheme.badge}`}>
          <StatusIcon className="w-5 h-5 shrink-0" />
          <div>
            <div className="text-[10px] font-mono uppercase font-bold opacity-80">Velocidad (Γ)</div>
            <div className="text-lg font-mono font-black">
              {gamma >= 0 ? `+${gamma.toFixed(3)}` : gamma.toFixed(3)}/año
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Explanation vs Threshold Table */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        
        {/* Explanation Card */}
        <div className="md:col-span-7 space-y-3 p-5 rounded-2xl bg-bio-deep/90 border border-emerald-500/30 shadow-inner">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${currentTheme.badge}`}>
              {gammaTitle}
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {currentTheme.desc}
          </p>

          <div className="p-3 bg-cyan-950/50 rounded-xl border border-cyan-500/30 text-[11px] text-cyan-200 font-serif leading-relaxed">
            💡 <strong>La Paradoja Sintrópica:</strong> Un territorio puede encontrarse bajo estrés elevado temporalmente (σ &gt; 0.80) pero exhibir una trayectoria <strong>sintrópica positiva (Γ &gt; +0.03)</strong> si sus comunidades están sembrando agua, recuperando semillas y regenerando el suelo vivo.
          </div>
        </div>

        {/* Speedometer Threshold Table */}
        <div className="md:col-span-5 space-y-2 text-xs font-mono">
          <div className={`p-3 rounded-xl border transition-all ${
            gammaStatus === 'sintropia' 
              ? 'bg-emerald-950/80 border-emerald-400 font-bold text-emerald-200 shadow-lg ring-1 ring-emerald-400' 
              : 'bg-bio-deep/70 border-emerald-500/20 text-slate-400'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-emerald-300">Γ &gt; +0.03 / año</span>
              <span className="text-[10px] uppercase font-bold">Sintropía Activa</span>
            </div>
            <p className="text-[10px] opacity-80 font-sans font-normal mt-0.5">El sistema acumula vida y resiliencia</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            gammaStatus === 'estacionario' 
              ? 'bg-amber-950/80 border-amber-400 font-bold text-amber-200 shadow-lg ring-1 ring-amber-400' 
              : 'bg-bio-deep/70 border-emerald-500/20 text-slate-400'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-amber-300">−0.03 ≤ Γ ≤ +0.03</span>
              <span className="text-[10px] uppercase font-bold">Estacionario</span>
            </div>
            <p className="text-[10px] opacity-80 font-sans font-normal mt-0.5">Equilibrio metabólico dinámico</p>
          </div>

          <div className={`p-3 rounded-xl border transition-all ${
            gammaStatus === 'entropia' 
              ? 'bg-rose-950/80 border-rose-400 font-bold text-rose-200 shadow-lg ring-1 ring-rose-400' 
              : 'bg-bio-deep/70 border-emerald-500/20 text-slate-400'
          }`}>
            <div className="flex justify-between items-center">
              <span className="text-rose-300">Γ &lt; −0.03 / año</span>
              <span className="text-[10px] uppercase font-bold">Entropía Dominante</span>
            </div>
            <p className="text-[10px] opacity-80 font-sans font-normal mt-0.5">Degradación continua — intervención urgente</p>
          </div>
        </div>

      </div>
    </div>
  );
}
