import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Globe, GitCompare, Layers, Database, BookOpen, 
  ArrowRight, Sparkles, Shield, Cpu, Flame, Trees, Users, Coins,
  Mountain, Compass, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LandingHeroBanner from './LandingHeroBanner';
import VisualToolsShowcase from './VisualToolsShowcase';
import KitAuditaTuCuencaBanner from './KitAuditaTuCuencaBanner';
import FilosofiaHombrosClosingBanner from './FilosofiaHombrosClosingBanner';

export default function LandingView({ onNavigate, onNavigateCustomAudit }) {
  const { t } = useTranslation(['landing', 'common']);

  const modules = [
    {
      id: 'articles',
      number: '01',
      title: t('modules.articles.title'),
      tag: t('modules.articles.tag'),
      desc: t('modules.articles.desc'),
      icon: BookOpen,
      btnText: t('modules.articles.btn'),
    },
    {
      id: 'core',
      number: '02',
      title: t('modules.core.title'),
      tag: t('modules.core.tag'),
      desc: t('modules.core.desc'),
      icon: Activity,
      btnText: t('modules.core.btn'),
    },
    {
      id: 'world_map',
      number: '03',
      title: t('modules.world_map.title'),
      tag: t('modules.world_map.tag'),
      desc: t('modules.world_map.desc'),
      icon: Globe,
      btnText: t('modules.world_map.btn'),
    },
    {
      id: 'audit',
      number: '04',
      title: t('modules.audit.title'),
      tag: t('modules.audit.tag'),
      desc: t('modules.audit.desc'),
      icon: Shield,
      btnText: t('modules.audit.btn'),
    },
    {
      id: 'agritwin',
      number: '05',
      title: t('modules.agritwin.title'),
      tag: t('modules.agritwin.tag'),
      desc: t('modules.agritwin.desc'),
      icon: Trees,
      btnText: t('modules.agritwin.btn'),
    },
    {
      id: 'scenarios',
      number: '06',
      title: t('modules.scenarios.title'),
      tag: t('modules.scenarios.tag'),
      desc: t('modules.scenarios.desc'),
      icon: Layers,
      btnText: t('modules.scenarios.btn'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-12"
    >
      {/* 1. HERO MONUMENTAL INTERACTIVO: DIOSA OLÍMPICA ASCENDIENDO CON LA ESFERA CÓSMICA Y HUD DE HOMBROS */}
      <LandingHeroBanner 
        onNavigate={onNavigate} 
        onNavigateCustomAudit={onNavigateCustomAudit} 
      />

      {/* 2. ACCESOS DIRECTOS A LAS HERRAMIENTAS VISUALES MÁS POTENTES (CARTOGRAFÍA & TRÍPODE) */}
      <VisualToolsShowcase onNavigate={onNavigate} />

      {/* 3. BANNER DESTACADO: KIT AUDITA TU PROPIA CUENCA */}
      <KitAuditaTuCuencaBanner
        isCustomActive={false}
        onActivateCustom={(useAgriTwin) => {
          if (onNavigateCustomAudit) {
            onNavigateCustomAudit(useAgriTwin ? 'agritwin' : 'blank');
          } else {
            onNavigate('audit');
          }
        }}
      />

      {/* 4. CATÁLOGO DE MÓDULOS DEL ECOSISTEMA HOMBROS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold block">
              {t('modules.section_badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {t('modules.section_title')}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            {t('modules.section_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.id}
                onClick={() => onNavigate(m.id)}
                className="p-6 rounded-3xl bg-white border border-[#D4C9B8]/80 shadow-md hover:shadow-xl hover:border-[#487075] transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {m.number}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[#EDE8DC] group-hover:bg-[#487075] text-[#487075] group-hover:text-white flex items-center justify-center transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#487075] block">
                      {m.tag}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-[#487075] transition-colors mt-0.5">
                      {m.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#D4C9B8]/40 flex items-center justify-between text-xs font-serif font-bold text-[#487075] group-hover:text-[#28475A]">
                  <span>{m.btnText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CIERRE CON EL BANNER DE LA FILOSOFÍA DE LOS HOMBROS (ASCENSO TERRITORIAL) */}
      <FilosofiaHombrosClosingBanner />
    </motion.div>
  );
}
