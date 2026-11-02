import React from 'react';
import { Droplets, Sprout, Zap, HeartHandshake, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function BasalResourceMeters({ territory, state }) {
  const { resources } = territory;
  const { resourceMetrics } = state;
  const { isFcinq } = useTheme();

  const icons = {
    water: Droplets,
    biomass: Sprout,
    energy: Zap,
    care: HeartHandshake,
  };

  const colors = isFcinq 
    ? {
        water: { 
          bar: 'bg-gradient-to-r from-[#D83F87] to-[#8D69A6]', 
          text: 'text-[#D83F87]', 
          badge: 'bg-[#2A1B3D] text-[#D83F87] border-[#D83F87]/40',
        },
        biomass: { 
          bar: 'bg-gradient-to-r from-[#8D69A6] to-[#44318D]', 
          text: 'text-[#8D69A6]', 
          badge: 'bg-[#2A1B3D] text-[#8D69A6] border-[#8D69A6]/40',
        },
        energy: { 
          bar: 'bg-gradient-to-r from-[#44318D] to-[#D83F87]', 
          text: 'text-[#D83F87]', 
          badge: 'bg-[#2A1B3D] text-[#D83F87] border-[#D83F87]/40',
        },
        care: { 
          bar: 'bg-gradient-to-r from-[#D83F87] to-[#A4B3B6]', 
          text: 'text-[#A4B3B6]', 
          badge: 'bg-[#2A1B3D] text-[#A4B3B6] border-[#A4B3B6]/40',
        },
      }
    : {
        water: { 
          bar: 'bg-gradient-to-r from-[#376E6F] to-[#2F4454]', 
          text: 'text-[#376E6F]', 
          badge: 'bg-[#1C3334] text-[#376E6F] border-[#376E6F]/40',
        },
        biomass: { 
          bar: 'bg-gradient-to-r from-[#DA7B93] to-[#376E6F]', 
          text: 'text-[#DA7B93]', 
          badge: 'bg-[#1C3334] text-[#DA7B93] border-[#DA7B93]/40',
        },
        energy: { 
          bar: 'bg-gradient-to-r from-[#2F4454] to-[#376E6F]', 
          text: 'text-[#376E6F]', 
          badge: 'bg-[#1C3334] text-[#376E6F] border-[#376E6F]/40',
        },
        care: { 
          bar: 'bg-gradient-to-r from-[#DA7B93] to-[#2E151B]', 
          text: 'text-[#DA7B93]', 
          badge: 'bg-[#1C3334] text-[#DA7B93] border-[#DA7B93]/40',
        },
      };

  return (
    <div className="rounded-3xl p-6 transition-all duration-300 bio-hud-panel shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 theme-text-primary">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_8px_var(--brand-primary)] inline-block animate-pulse"></span>
            Los 4 Soportes Basales del Territorio
          </h3>
          <p className="text-xs mt-0.5 text-slate-300">
            Equilibrio de flujo entre recarga natural, requerimiento vital y carga extractiva
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(resources).map(([key, res]) => {
          const metric = resourceMetrics[key] || {};
          const Icon = icons[key] || Droplets;
          const theme = colors[key] || colors.water;
          
          const basalPercent = Math.min(100, Math.round((res.basalNeed / (metric.effectiveInflow || 1)) * 100));
          const loadPercent = Math.min(100, Math.round(((metric.effectiveLoad || 0) / (metric.effectiveInflow || 1)) * 100));
          const isStressed = metric.effectiveLoad > (metric.effectiveInflow - res.basalNeed);

          return (
            <div 
              key={key} 
              className="p-4 rounded-2xl bg-brand-void/80 border border-white/10 hover:border-brand-primary/50 transition-all flex flex-col justify-between shadow-md"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-xl bg-brand-deep border border-white/10">
                      <Icon className={`w-4 h-4 ${theme.text}`} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        Unidad: {res.unit}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${theme.badge}`}>
                    Peso: {Math.round(res.weight * 100)}%
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-400">Presión sobre Recarga:</span>
                    <strong className={isStressed ? 'text-rose-400' : 'theme-text-primary'}>
                      {Math.round(metric.stress * 100)}%
                    </strong>
                  </div>

                  <div className="h-3 w-full rounded-full bg-brand-deep overflow-hidden p-0.5 border border-white/10 relative">
                    {/* Basal Need Marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-400 z-10"
                      style={{ left: `${basalPercent}%` }}
                      title={`Piso vital: ${res.basalNeed} ${res.unit}`}
                    />
                    
                    {/* Active load bar */}
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isStressed ? 'bg-rose-500' : theme.bar}`}
                      style={{ width: `${Math.min(100, Math.round(metric.stress * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <span>Recarga: {metric.effectiveInflow} {res.unit}</span>
                    <span>Carga: {metric.effectiveLoad} {res.unit}</span>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Estado de la Cuenca:</span>
                <span className={`flex items-center gap-1 font-bold ${isStressed ? 'text-rose-400' : 'theme-text-primary'}`}>
                  {isStressed ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                  {isStressed ? 'SOBRE-EXTRACCIÓN' : 'RECARGA SEGURA'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
