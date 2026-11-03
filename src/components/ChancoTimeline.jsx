import React from 'react';
import { Calendar, History, TrendingUp, TrendingDown, MapPin, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ChancoTimeline({ territory }) {
  const { isAtlas } = useTheme();
  const history = territory.history || [];

  return (
    <div className={`rounded-3xl p-6 transition-all duration-300 shadow-xl border ${
      isAtlas ? 'glass-panel-atlas' : 'greenhouse-panel'
    }`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-solarpunk-brass/25">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border bg-amber-100 text-amber-900 border-amber-300">
            Caso de Estudio Emblemático: Chanco (Región del Maule)
          </span>
          <h3 className={`text-xl font-bold tracking-tight mt-1 ${
            isAtlas ? 'font-serif text-atlas-ink' : 'font-serif text-solarpunk-leaf'
          }`}>
            Trayectoria Multitemporal Censal & Satelital (2002 – 2030)
          </h3>
          <p className="text-xs text-stone-600 mt-0.5">
            Evolución empírica del Índice H ante la expansión de plantaciones forestales sobre ecosistema nativo
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-white px-3.5 py-1.5 rounded-xl border border-solarpunk-brass/35 text-stone-700 shadow-sm">
          <History className="w-4 h-4 text-amber-700" />
          <span>Cortes: 2002 · 2017 · 2024 · 2030*</span>
        </div>
      </div>

      {/* Timeline Steps Card */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 mb-6">
        {history.map((h, idx) => {
          const isProjected = h.isProjectedHombros || h.isProjectedBAU;
          const isHombrosProj = h.isProjectedHombros;
          const isBAUProj = h.isProjectedBAU;

          return (
            <div 
              key={idx}
              className={`p-4 rounded-2xl border flex flex-col justify-between transition-all ${
                isHombrosProj
                  ? 'bg-emerald-50/90 border-emerald-400 shadow-md ring-2 ring-emerald-400'
                  : isBAUProj
                    ? 'bg-rose-50/90 border-rose-400 shadow-md ring-2 ring-rose-400'
                    : 'bg-white/90 border-stone-200 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${
                    isHombrosProj 
                      ? 'bg-emerald-700 text-white' 
                      : isBAUProj 
                        ? 'bg-rose-700 text-white' 
                        : 'bg-stone-200 text-stone-900'
                  }`}>
                    {h.year} {isProjected ? '*' : ''}
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 font-semibold">
                    σ = {h.sigma}
                  </span>
                </div>

                <div className="my-2">
                  <div className="text-[10px] font-mono text-stone-500 uppercase">Capacidad H</div>
                  <div className={`text-2xl font-mono font-black ${
                    isHombrosProj ? 'text-emerald-700' : isBAUProj ? 'text-rose-700' : 'text-stone-900'
                  }`}>
                    {h.H}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1 text-[9px] font-mono py-1.5 border-t border-stone-200 text-stone-600">
                  <div>S: {h.S}</div>
                  <div>E: {h.E}</div>
                  <div>K: {h.K}</div>
                </div>
              </div>

              <p className="text-[10px] text-stone-600 mt-2.5 pt-2 border-t border-dashed border-stone-200 leading-snug">
                {h.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Synthesis Insight from PDF */}
      <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-stone-700 leading-relaxed space-y-1.5">
        <div className="font-bold font-serif text-amber-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-700" />
          Diagnóstico de Chanco: Del Extractivismo al Autogobierno Sintrópico
        </div>
        <p className="text-[11px] leading-relaxed">
          Entre 2002 y 2024, Chanco experimentó un retroceso del 23% en su capacidad portante (H = 0.56 → 0.43), impulsado por el monocultivo de pino/eucalipto que secó las napas litorales (Hombro Ambiental E bajó de 0.58 a 0.36) y redujo la autonomía municipal (SINIM). La intervención con el modelo Hombros proyecta una senda sintrópica (H = 0.68 en 2030) basada en agroforestería de secano, algas comunitarias y restauración de cuencas.
        </p>
      </div>
    </div>
  );
}
