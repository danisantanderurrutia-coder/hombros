import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, Sparkles, Cpu, Droplets, ShieldCheck, 
  ArrowRight, Compass, FileText, Mountain, CheckCircle2,
  Sliders, RotateCcw, AlertTriangle, Layers, BookOpen
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function KitAuditaTuCuencaBanner({ 
  isCustomActive = false,
  customMeta = {},
  onActivateCustom, 
  onResetToBenchmark,
  variant = 'full' // 'full' (for MetabolicAuditView) | 'compact' (for Landing / Atlas)
}) {
  const isAgriTwin = customMeta?.agritwinLinked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`relative w-full rounded-3xl overflow-hidden border shadow-xl transition-all ${
        isCustomActive 
          ? 'border-amber-400/80 ring-2 ring-amber-400/30 shadow-amber-900/20' 
          : 'border-[#7DB2B2]/60 hover:border-[#487075] shadow-[#28475A]/15'
      } bg-gradient-to-br from-[#122227] via-[#1A2E33] to-[#0E171B] text-white`}
    >
      {/* Decorative Atmospheric Lighting & Topographic Accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#7DB2B2]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-[#C86D51]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Grid / Cartographic Isohyet Background */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none bg-[radial-gradient(#7DB2B2_1px,transparent_1px)] [background-size:16px_16px]"
      />

      <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        
        {/* Left Column: Context, Title & Description */}
        <div className="space-y-3.5 max-w-3xl">
          
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              Kit Ciudadano & Municipal Abierto
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
              <Radio className="w-3 h-3 text-amber-300" />
              Telemetría Satelital Sentinel-2 STAC/COG
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#28475A]/60 text-slate-200 border border-white/10">
              Protocolo SEIA 2.0
            </span>
            <a 
              href={getAssetUrl('docs/PAPER_PRACTICO_AUDITA_TU_CUENCA.md')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 border border-amber-400/50 transition-all shadow-sm"
            >
              <BookOpen className="w-3 h-3 text-amber-300" />
              <span>Paper Práctico N° 2 (Manual Comunal)</span>
            </a>
          </div>

          {/* Banner Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight flex flex-wrap items-center gap-2">
              <span>Kit: Audita tu Propia Cuenca</span>
              <span className="text-amber-300 font-serif italic text-xl sm:text-2xl font-normal">
                · Modelación y Tracción Territorial
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans font-normal">
              No dependas de consultoras extractivas ni informes burocráticos cerrados. Modela los <strong>Tres Hombros basales (Social, Ambiental y Económico)</strong> de tu comuna, o acopla con un solo clic el <strong>Gemelo Digital de la Cuenca del Río Longaví</strong> (telemetría Sentinel-2, balance de embalse y Comités APR) para someter cualquier proyecto al <strong>Ensayo de Tracción SEIA 2.0</strong> y calcular su dictamen pre-inversional vinculante.
            </p>
          </div>

          {/* Quick Metrics / Guarantees Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <Droplets className="w-3.5 h-3.5 text-[#7DB2B2]" />
              <span>12 Variables Físicas Normalizadas [0, 1]</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Corte No-Compensatorio de Liebig (H &lt; 0.25)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Acta Imprimible & Ficha JSON Abierta</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Action Triggers & Session Status */}
        <div className="w-full lg:w-auto shrink-0 flex flex-col gap-3">
          
          {isCustomActive ? (
            /* ACTIVE CUSTOM BASIN SESSION CARD */
            <div className="p-4 rounded-2xl bg-black/60 border border-amber-400/60 shadow-lg space-y-3 min-w-[280px]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Auditoría Personalizada Activa
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  {isAgriTwin ? 'Preset AgriTwin' : 'Plantilla Comunal'}
                </span>
              </div>

              <div>
                <strong className="text-sm font-serif block text-white">
                  {customMeta.name || 'Mi Cuenca Personalizada'}
                </strong>
                <span className="text-[11px] font-mono text-slate-300 block">
                  {customMeta.region || 'Territorio en Estudio'} · {customMeta.population?.toLocaleString() || '15.000'} hab.
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => onActivateCustom && onActivateCustom(!isAgriTwin)}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3 text-amber-300" />
                  <span>{isAgriTwin ? 'Cambiar a Plantilla en Blanco' : 'Cargar Preset AgriTwin'}</span>
                </button>

                {onResetToBenchmark && (
                  <button
                    onClick={onResetToBenchmark}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Volver a Cuencas de Referencia
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* ACTION LAUNCH BUTTONS WHEN BROWSING BENCHMARKS */
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 min-w-[290px]">
              
              {/* Preset 1: AgriTwin Longaví */}
              <button
                onClick={() => onActivateCustom && onActivateCustom(true)}
                className="group w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-600 hover:to-teal-700 text-white border border-emerald-400/50 shadow-lg shadow-emerald-950/40 font-serif font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-black/30 text-emerald-300 group-hover:scale-110 transition-transform">
                    <Radio className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block leading-tight font-extrabold text-white">
                      Cargar Gemelo AgriTwin
                    </span>
                    <span className="block text-[10px] font-mono font-normal text-emerald-200 opacity-90 mt-0.5">
                      Río Longaví · Sentinel-2 + 5 APRs
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              {/* Preset 2: Blank Municipal Template */}
              <button
                onClick={() => onActivateCustom && onActivateCustom(false)}
                className="group w-full px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-amber-300/40 hover:border-amber-300 shadow-md font-serif font-bold text-xs sm:text-sm transition-all flex items-center justify-between gap-3 text-left"
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 group-hover:scale-110 transition-transform">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block leading-tight font-extrabold text-white">
                      Auditar Nueva Cuenca en Blanco
                    </span>
                    <span className="block text-[10px] font-mono font-normal text-amber-200 opacity-90 mt-0.5">
                      Ingresa tu Comuna / Cuenca Local
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-amber-200 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

            </div>
          )}

        </div>

      </div>
    </motion.div>
  );
}
