import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Landmark, ShieldCheck, Activity, Globe, 
  ArrowRight, Download, FileText, Sparkles, Layers,
  Compass, CheckCircle2, ChevronRight, Trees, Users, 
  Scale, Milestone, Cpu, ExternalLink
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getAssetUrl } from '../utils/assets';

export default function NewLandingHero({ onNavigate, onNavigateCustomAudit }) {
  const { t } = useTranslation(['landing', 'common']);
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');

  const metricHighlights = [
    { label: t('hero.metrics.cuencas.label'), value: t('hero.metrics.cuencas.value'), sub: t('hero.metrics.cuencas.sub'), icon: Globe },
    { label: t('hero.metrics.axes.label'), value: t('hero.metrics.axes.value'), sub: t('hero.metrics.axes.sub'), icon: Layers },
    { label: t('hero.metrics.seia.label'), value: t('hero.metrics.seia.value'), sub: t('hero.metrics.seia.sub'), icon: Scale },
    { label: t('hero.metrics.open_science.label'), value: t('hero.metrics.open_science.value'), sub: t('hero.metrics.open_science.sub'), icon: Activity },
  ];

  const primaryGateways = [
    {
      id: 'think_tank',
      title: t('hero.gateways.think_tank.title'),
      tag: t('hero.gateways.think_tank.tag'),
      desc: t('hero.gateways.think_tank.desc'),
      icon: Landmark,
      color: 'from-[#1B4332] to-[#2D5A46]',
      accentBorder: 'hover:border-[#1B4332]',
      btnText: t('hero.gateways.think_tank.btn')
    },
    {
      id: 'audit',
      title: t('hero.gateways.audit.title'),
      tag: t('hero.gateways.audit.tag'),
      desc: t('hero.gateways.audit.desc'),
      icon: ShieldCheck,
      color: 'from-[#C86D51] to-[#927660]',
      accentBorder: 'hover:border-[#C86D51]',
      btnText: t('hero.gateways.audit.btn')
    },
    {
      id: 'core',
      title: t('hero.gateways.core.title'),
      tag: t('hero.gateways.core.tag'),
      desc: t('hero.gateways.core.desc'),
      icon: Activity,
      color: 'from-[#28475A] to-[#1E293B]',
      accentBorder: 'hover:border-[#28475A]',
      btnText: t('hero.gateways.core.btn')
    },
    {
      id: 'world_map',
      title: t('hero.gateways.world_map.title'),
      tag: t('hero.gateways.world_map.tag'),
      desc: t('hero.gateways.world_map.desc'),
      icon: Globe,
      color: 'from-[#487075] to-[#28475A]',
      accentBorder: 'hover:border-[#487075]',
      btnText: t('hero.gateways.world_map.btn')
    }
  ];

  return (
    <div className="space-y-10">
      {/* 1. HERO INSTITUCIONAL PRINCIPAL */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm p-8 sm:p-12 md:p-14">
        {/* Filete Superior Tricolor */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              <Landmark className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>{t('hero.badge')}</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-[#1B4332] px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20">
              {t('hero.sub_badge')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            {t('hero.title_main')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51] italic">
              {t('hero.title_gradient')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-sans leading-relaxed max-w-3xl">
            {t('hero.description')}
          </p>

          {/* Botones de Acción Inmediata */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('think_tank')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-serif font-bold text-white bg-[#1E293B] hover:bg-[#0F172A] shadow-md transition-all transform hover:-translate-y-0.5 group"
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>{t('hero.btn_think_tank')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('audit')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1B4332] bg-[#1B4332]/10 hover:bg-[#1B4332]/20 border border-[#1B4332]/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('hero.btn_audit')}</span>
            </button>

            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all group"
            >
              <Download className="w-4 h-4 text-slate-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>{t('hero.btn_pdf')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. BARRA DE INDICADORES EN VIVO (MÉTRICAS & VALOR) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {metricHighlights.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-2 hover:border-slate-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xl sm:text-2xl font-serif font-extrabold text-slate-900">
                  {m.value}
                </span>
                <Icon className="w-4 h-4 text-[#1B4332]" />
              </div>
              <div>
                <span className="text-xs font-serif font-bold text-slate-800 block leading-tight">
                  {m.label}
                </span>
                <span className="text-[11px] font-mono text-slate-500 block mt-0.5 leading-tight">
                  {m.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. LAS CUATRO PUERTAS PRINCIPALES DE NAVEGACIÓN */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B4332] font-bold block">
              {t('hero.gateways.section_badge')}
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              {t('hero.gateways.section_title')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            {t('hero.gateways.section_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {primaryGateways.map((gate) => {
            const Icon = gate.icon;
            return (
              <div
                key={gate.id}
                onClick={() => onNavigate(gate.id)}
                className={`p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs ${gate.accentBorder} hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                      {gate.tag}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-[#1E293B] group-hover:text-white text-slate-700 flex items-center justify-center transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#1B4332] transition-colors leading-snug">
                    {gate.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {gate.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-serif font-bold text-[#1E293B] group-hover:text-[#1B4332]">
                  <span>{gate.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
