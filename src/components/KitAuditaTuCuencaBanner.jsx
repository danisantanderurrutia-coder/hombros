import React from 'react';
import { motion } from 'framer-motion';
import { 
  Radio, Sparkles, Cpu, Droplets, ShieldCheck, 
  ArrowRight, Compass, FileText, Mountain, CheckCircle2,
  Sliders, RotateCcw, AlertTriangle, Layers, BookOpen
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '../utils/assets';

export default function KitAuditaTuCuencaBanner({ 
  isCustomActive = false,
  customMeta = {},
  onActivateCustom, 
  onResetToBenchmark,
  variant = 'full' // 'full' (for MetabolicAuditView) | 'compact' (for Landing / Atlas)
}) {
  const { t } = useTranslation(['landing', 'common']);
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
              {t('kit_banner.badge_citizen')}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
              <Radio className="w-3 h-3 text-amber-300" />
              {t('kit_banner.badge_telemetry')}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#28475A]/60 text-slate-200 border border-white/10">
              {t('kit_banner.badge_protocol')}
            </span>
            <a 
              href={getAssetUrl('docs/PAPER_PRACTICO_AUDITA_TU_CUENCA.md')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 border border-amber-400/50 transition-all shadow-sm"
            >
              <BookOpen className="w-3 h-3 text-amber-300" />
              <span>{t('kit_banner.badge_paper')}</span>
            </a>
          </div>

          {/* Banner Heading */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-tight leading-tight flex flex-wrap items-center gap-2">
              <span>{t('kit_banner.title_main')}</span>
              <span className="text-amber-300 font-serif italic text-xl sm:text-2xl font-normal">
                {t('kit_banner.title_sub')}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-sans font-normal">
              {t('kit_banner.description')}
            </p>
          </div>

          {/* Quick Metrics / Guarantees Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono text-slate-300">
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <Droplets className="w-3.5 h-3.5 text-[#7DB2B2]" />
              <span>{t('kit_banner.pill_vars')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t('kit_banner.pill_liebig')}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/30 px-3 py-1 rounded-xl border border-white/10">
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>{t('kit_banner.pill_json')}</span>
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
                  {t('kit_banner.active_badge')}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-200 border border-amber-400/30">
                  {isAgriTwin ? t('kit_banner.preset_agritwin') : t('kit_banner.preset_municipal')}
                </span>
              </div>

              <div>
                <strong className="text-sm font-serif block text-white">
                  {customMeta.name || t('kit_banner.default_basin_name')}
                </strong>
                <span className="text-[11px] font-mono text-slate-300 block">
                  {customMeta.region || t('kit_banner.default_region')} · {customMeta.population?.toLocaleString() || '15.000'} {t('kit_banner.pop_unit')}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1 border-t border-white/10">
                <button
                  onClick={() => onActivateCustom && onActivateCustom(!isAgriTwin)}
                  className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold bg-white/10 hover:bg-white/20 text-slate-200 border border-white/20 transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3 h-3 text-amber-300" />
                  <span>{isAgriTwin ? t('kit_banner.switch_to_blank') : t('kit_banner.load_agritwin_preset')}</span>
                </button>

                {onResetToBenchmark && (
                  <button
                    onClick={onResetToBenchmark}
                    className="px-3 py-1.5 rounded-xl text-[11px] font-mono font-bold text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {t('kit_banner.back_to_benchmarks')}
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
                      {t('kit_banner.btn_agritwin_title')}
                    </span>
                    <span className="block text-[10px] font-mono font-normal text-emerald-200 opacity-90 mt-0.5">
                      {t('kit_banner.btn_agritwin_sub')}
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
                      {t('kit_banner.btn_blank_title')}
                    </span>
                    <span className="block text-[10px] font-mono font-normal text-amber-200 opacity-90 mt-0.5">
                      {t('kit_banner.btn_blank_sub')}
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
