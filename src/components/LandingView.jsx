import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Globe, GitCompare, Layers, Database, BookOpen, 
  ArrowRight, Sparkles, Shield, Cpu, Flame, Trees, Users, Coins,
  Mountain, Compass, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import LandingHeroBanner from './LandingHeroBanner';
import KitAuditaTuCuencaBanner from './KitAuditaTuCuencaBanner';

export default function LandingView({ onNavigate, onNavigateCustomAudit }) {
  const modules = [
    {
      id: 'articles',
      number: '01',
      title: 'Artículos & Policy (SEIA + OLCA)',
      tag: 'THINK TANK & ECOLOGÍA POLÍTICA',
      desc: 'Propuesta legislativa de Reforma Estructural al SEIA (Cláusula Pre-Inversional) y los 4 Policy Briefs adaptados de los ensayos publicados en el OLCA.',
      icon: BookOpen,
      accent: 'from-[#28475A] to-[#1E293B]',
      btnText: 'Leer Policy Briefs',
    },
    {
      id: 'core',
      number: '02',
      title: 'CORE: El Motor del Modelo',
      tag: 'LEYES BIOFÍSICAS & MECÁNICA CONTINUA',
      desc: 'El corazón matemático del modelo HOMBROS: Capacidad Portante (H), Tensión Sistémica (σ = D/H), Tasa Sintrópica (Γ), Prospectiva y Organismo Integrado.',
      icon: Activity,
      accent: 'from-[#487075] to-[#28475A]',
      btnText: 'Abrir CORE',
    },
    {
      id: 'world_map',
      number: '03',
      title: 'Atlas Territorial & Semáforo',
      tag: 'OBSERVATORIO SITUADO DE CUENCAS',
      desc: 'Cartografía orbital, Semáforo Biofísico en 25 ciudades (Chile Central y Europa), Contraste de Modelos, Deuda Scope 3 y Red Panal.',
      icon: Globe,
      accent: 'from-[#376E6F] to-[#28475A]',
      btnText: 'Ver Atlas Territorial',
    },
    {
      id: 'audit',
      number: '04',
      title: 'Auditoría Biofísica SEIA 2.0 & ROI',
      tag: 'HIPÓTESIS PRE-INVERSIÓN & TRACCIÓN',
      desc: 'Evalúa tu propio territorio o conecta la telemetría de AgriTwin, somete proyectos al Ensayo de Tracción y calcula el ROI Sintrópico frente al gasto paliativo.',
      icon: Shield,
      accent: 'from-[#C86D51] to-[#927660]',
      btnText: 'Auditar Cuenca',
    },
    {
      id: 'theory',
      number: '05',
      title: 'Marco Epistémico',
      tag: 'SOBRE HOMBROS DE GIGANTES',
      desc: 'Genealogía conceptual: bioeconomía de Georgescu-Roegen, cibernética de Stafford Beer, buen vivir y ecología política latinoamericana.',
      icon: BookOpen,
      accent: 'from-[#D4A373] to-[#927660]',
      btnText: 'Leer Manifiesto',
    },
    {
      id: 'scenarios',
      number: '06',
      title: 'Simulador Prospectivo',
      tag: 'PROYECCIONES ESTOCÁSTICAS',
      desc: 'Pon a prueba cualquier territorio ante megasequías, colapsos de cadenas de suministro y transición agroecológica sintrópica.',
      icon: Layers,
      accent: 'from-[#927660] to-[#487075]',
      btnText: 'Simular Futuros',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-12"
    >
      {/* 1. HERO BANNER MONUMENTAL (ATLAS DORADO + CERRO + CONTROLES E, S, K) */}
      <LandingHeroBanner onNavigate={onNavigate} />

      {/* 2. MANIFIESTO FILOSÓFICO: DE SÍSIFO A ATLAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-10 rounded-3xl bio-hud-panel">
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EDE8DC] text-[#487075] border border-[#D4C9B8]">
            <Mountain className="w-3.5 h-3.5 text-[#487075]" />
            PARADIGMA BIOFÍSICO TERRITORIAL
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-slate-900 tracking-tight leading-snug">
            ¿Por qué Sísifo empuja la roca mientras Atlas sostiene el mundo?
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            El modelo económico convencional concibe el desarrollo como una piedra rodante: extracción acelerada, consumo entrópico y reconstrucción perpetua tras el desastre. Es la condena de Sísifo.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
            <strong>HOMBROS</strong> propone trascender la condena: si el territorio cultiva sus tres hombros basales —regenerando la cuenca (<strong className="text-[#487075]">E</strong>), tejiendo comunidad solidaria (<strong className="text-[#C86D51]">S</strong>) y fortaleciendo el hombro económico o capital regenerativo (<strong className="text-[#D4A373]">K</strong>)— la roca deja de ser una carga trágica y se transforma en una esfera celestial que asciende hacia la autonomía biosférica.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('theory')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold text-white bg-gradient-to-r from-[#487075] to-[#28475A] shadow-md hover:brightness-110 transition-all"
            >
              Conocer la Genealogía Teórica
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('core')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-700 bg-white hover:bg-slate-50 border border-[#D4C9B8] shadow-sm transition-all"
            >
              Ver Ecuaciones en CORE
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Mini Gráfica o Quote Card Ilustrada */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-gradient-to-br from-[#FAF7F0] to-[#EDE8DC] border border-[#D4C9B8] shadow-inner space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#487075] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
              H
            </div>
            <div>
              <h3 className="font-serif font-bold text-slate-900 text-sm">
                Regla de Oro de Liebig
              </h3>
              <p className="text-[11px] font-mono text-slate-500">
                Media Geométrica No Compensatoria
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/80 border border-[#D4C9B8]/80 text-xs font-mono text-slate-700 space-y-2">
            <div className="flex justify-between">
              <span>Hombro Ecológico (E):</span>
              <strong className="text-[#487075]">Agua, suelo y fotosíntesis</strong>
            </div>
            <div className="flex justify-between">
              <span>Hombro Social (S):</span>
              <strong className="text-[#C86D51]">Cuidados y cohesión cívica</strong>
            </div>
            <div className="flex justify-between">
              <span>Hombro Económico o Capital (K):</span>
              <strong className="text-[#927660]">Soberanía material y capital regenerativo</strong>
            </div>
            <div className="pt-2 border-t border-slate-200 text-center font-bold text-slate-900">
              H = (E · S · K)<sup>1/3</sup>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 italic text-center">
            "Si un solo hombro cae a cero, la capacidad portante total del territorio colapsa. El capital financiero no puede sustituir a la cuenca hídrica."
          </p>
        </div>
      </div>

      {/* 2.5 BANNER DESTACADO: KIT AUDITA TU PROPIA CUENCA */}
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

      {/* 3. CATÁLOGO DE MÓDULOS DEL ECOSISTEMA HOMBROS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold block">
              PLATAFORMA CIBERNÉTICA INTEGRAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Módulos del Sistema Territorial
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Haz clic en cualquier módulo para ingresar directamente
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
    </motion.div>
  );
}
