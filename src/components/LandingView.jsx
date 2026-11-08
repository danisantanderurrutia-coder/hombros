import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, Globe, GitCompare, Layers, Database, BookOpen, 
  ArrowRight, Sparkles, Shield, Cpu, Flame, Trees, Users, Coins,
  Mountain, Compass, CheckCircle2, ChevronRight, HelpCircle
} from 'lucide-react';
import NewLandingHero from './NewLandingHero';
import VisualToolsShowcase from './VisualToolsShowcase';
import KitAuditaTuCuencaBanner from './KitAuditaTuCuencaBanner';
import FilosofiaHombrosClosingBanner from './FilosofiaHombrosClosingBanner';

export default function LandingView({ onNavigate, onNavigateCustomAudit }) {
  const modules = [
    {
      id: 'articles',
      number: '01',
      title: 'Instrumentos, Normativa & Policy',
      tag: 'THINK TANK & GOBERNANZA TERRITORIAL',
      desc: 'Propuestas de modernización regulatoria (Planes Reguladores, SEIA, ordenanzas de protección) y Policy Briefs de soberanía biofísica.',
      icon: BookOpen,
      btnText: 'Leer Propuestas & Policy',
    },
    {
      id: 'core',
      number: '02',
      title: 'CORE: El Motor del Modelo',
      tag: 'LEYES BIOFÍSICAS & CAPACIDAD PORTANTE',
      desc: 'El corazón matemático del modelo HOMBROS: Capacidad Portante (H), Tensión Sistémica (σ = D/H), Tasa Sintrópica (Γ), Prospectiva y Organismo Integrado.',
      icon: Activity,
      btnText: 'Abrir CORE',
    },
    {
      id: 'world_map',
      number: '03',
      title: 'Atlas Territorial & Semáforo',
      tag: 'OBSERVATORIO SITUADO DE CUENCAS',
      desc: 'Cartografía orbital, Semáforo Biofísico en 25 ciudades (Chile Central y Europa), Contraste de Modelos, Deuda Scope 3 y Red Panal.',
      icon: Globe,
      btnText: 'Ver Atlas Territorial',
    },
    {
      id: 'audit',
      number: '04',
      title: 'Auditoría Biofísica SEIA 2.0 & ROI',
      tag: 'HIPÓTESIS PRE-INVERSIÓN & TRACCIÓN',
      desc: 'Evalúa tu propio territorio o conecta la telemetría de AgriTwin, somete proyectos al Ensayo de Tracción y calcula el ROI Sintrópico frente al gasto paliativo.',
      icon: Shield,
      btnText: 'Auditar Cuenca',
    },
    {
      id: 'theory',
      number: '05',
      title: 'Marco Epistémico',
      tag: 'SOBRE HOMBROS DE GIGANTES',
      desc: 'Genealogía conceptual: bioeconomía de Georgescu-Roegen, cibernética de Stafford Beer, buen vivir y ecología política latinoamericana.',
      icon: BookOpen,
      btnText: 'Leer Manifiesto',
    },
    {
      id: 'scenarios',
      number: '06',
      title: 'Simulador Prospectivo',
      tag: 'PROYECCIONES ESTOCÁSTICAS',
      desc: 'Pon a prueba cualquier territorio ante megasequías, colapsos de cadenas de suministro y transición agroecológica sintrópica.',
      icon: Layers,
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
      {/* 1. HERO INSTITUCIONAL PRINCIPAL */}
      <NewLandingHero 
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

      {/* 5. CIERRE CON EL BANNER DE LA MUJER SUBIENDO LAS ESCALERAS (FILOSOFÍA DE LOS HOMBROS) */}
      <FilosofiaHombrosClosingBanner />
    </motion.div>
  );
}
