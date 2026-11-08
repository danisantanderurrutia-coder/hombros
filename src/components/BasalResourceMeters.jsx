import React from 'react';
import { Droplets, Sprout, Zap, HeartHandshake, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function BasalResourceMeters({ territory, state }) {
  const { resources } = territory;
  const { resourceMetrics } = state;

  const icons = {
    water: Droplets,
    biomass: Sprout,
    energy: Zap,
    care: HeartHandshake,
  };

  const colors = {
    water: { 
      bar: 'bg-gradient-to-r from-[#7DB2B2] to-[#487075]', 
      text: 'text-[#487075]', 
      badge: 'bg-[#487075]/10 text-[#487075] border-[#487075]/30',
    },
    biomass: { 
      bar: 'bg-gradient-to-r from-[#1B4332] to-[#376E6F]', 
      text: 'text-[#1B4332]', 
      badge: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/30',
    },
    energy: { 
      bar: 'bg-gradient-to-r from-[#D4A373] to-[#927660]', 
      text: 'text-[#927660]', 
      badge: 'bg-[#927660]/10 text-[#927660] border-[#927660]/30',
    },
    care: { 
      bar: 'bg-gradient-to-r from-[#DA7B93] to-[#C86D51]', 
      text: 'text-[#C86D51]', 
      badge: 'bg-[#C86D51]/10 text-[#C86D51] border-[#C86D51]/30',
    },
  };

  return (
    <div className="rounded-3xl p-6 transition-all duration-300 bg-white/95 border border-[#D4C9B8] shadow-md text-slate-900">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider font-bold flex items-center gap-2 text-slate-900">
            <span className="w-2.5 h-2.5 rounded-full bg-[#487075] shadow-[0_0_8px_#487075] inline-block animate-pulse"></span>
            Los 4 Soportes Basales del Territorio
          </h3>
          <p className="text-xs mt-0.5 text-slate-600">
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
              className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#D4C9B8] hover:border-[#487075] transition-all flex flex-col justify-between shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-xl bg-white border border-[#D4C9B8] shadow-2xs">
                      <Icon className={`w-4 h-4 ${theme.text}`} />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-slate-900">
                        {res.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-mono">
                        Unidad: {res.unit}
                      </span>
                    </div>
                  </div>
                  
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${theme.badge}`}>
                    Peso: {Math.round(res.weight * 100)}%
                  </span>
                </div>

                {/* Progress bar container */}
                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-600">Presión sobre Recarga:</span>
                    <strong className={isStressed ? 'text-rose-600' : theme.text}>
                      {Math.round(metric.stress * 100)}%
                    </strong>
                  </div>

                  <div className="h-3 w-full rounded-full bg-slate-200 overflow-hidden p-0.5 border border-[#D4C9B8] relative">
                    {/* Basal Need Marker */}
                    <div 
                      className="absolute top-0 bottom-0 w-0.5 bg-amber-600 z-10"
                      style={{ left: `${basalPercent}%` }}
                      title={`Piso vital: ${res.basalNeed} ${res.unit}`}
                    />
                    
                    {/* Active load bar */}
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${isStressed ? 'bg-rose-500' : theme.bar}`}
                      style={{ width: `${Math.min(100, Math.round(metric.stress * 100))}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>Recarga: {metric.effectiveInflow} {res.unit}</span>
                    <span>Carga: {metric.effectiveLoad} {res.unit}</span>
                  </div>
                </div>
              </div>

              {/* Status footer */}
              <div className="pt-2 border-t border-[#D4C9B8] flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-500">Estado de la Cuenca:</span>
                <span className={`flex items-center gap-1 font-bold ${isStressed ? 'text-rose-600' : 'text-[#1B4332]'}`}>
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
