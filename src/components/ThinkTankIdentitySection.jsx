import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, ShieldCheck, HeartHandshake, TreePine, 
  Sparkles, Download, ArrowRight, CheckCircle2, Users, 
  FileText, Layers, Activity, Compass, Flame, Shield, 
  ExternalLink, Microscope, Milestone, Scale
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ThinkTankIdentitySection({ onNavigate, onNavigateCustomAudit }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');

  const strategicAxes = [
    {
      number: '01',
      title: 'Modelación Territorial & Diagnóstico Transdisciplinar',
      tag: 'CIENCIA DE FRONTERA & BIOFÍSICA',
      icon: Microscope,
      color: 'text-[#487075] bg-[#487075]/10 border-[#487075]/30',
      description: 'Integración de geofísica de cuencas, termodinámica del no-equilibrio y ciencia de datos abierta para medir la verdadera capacidad portante (H) y anticipar límites de fatiga antes del colapso estructural.'
    },
    {
      number: '02',
      title: 'Instrumentos de Planificación, Regulación & Políticas Públicas',
      tag: 'INCIDENCIA NORMATIVA & GOBERNANZA',
      icon: Scale,
      color: 'text-[#28475A] bg-[#28475A]/10 border-[#28475A]/30',
      description: 'Modernización de instrumentos territoriales (Planes Reguladores, PROT, EAE, SEIA): formulación de cláusulas pre-inversionales de salvaguarda biofísica, ordenanzas de protección de bienes comunes y reglas de no-compensabilidad.'
    },
    {
      number: '03',
      title: 'Incubadora de Proyectos & Ecotecnologías Territoriales',
      tag: 'ACCIÓN DIRECTA & SOBERANÍA MATERIAL',
      icon: Layers,
      color: 'text-[#C86D51] bg-[#C86D51]/10 border-[#C86D51]/30',
      description: 'Co-diseño, aceleración y canalización de financiamiento para iniciativas productivas regenerativas: agroecología sintrópica, telemetría comunitaria abierta (AgriTwin), cooperativas de cuenca y bioeconomía local de valor agregado.'
    },
    {
      number: '04',
      title: 'Cohesión Psicosocial, Seguridad Vecinal & Salud Comunitaria',
      tag: 'CUIDADO COLECTIVO & TEJIDO VECINAL',
      icon: HeartHandshake,
      color: 'text-[#927660] bg-[#927660]/10 border-[#927660]/30',
      description: 'Acompañamiento psicosocial a comunidades en conflicto socioambiental (impacto del monocultivo forestal y zonas de sacrificio), prevención de riesgos socionaturales (incendios) y fortalecimiento de la seguridad comunitaria barrial.'
    }
  ];

  const targetAudiences = [
    {
      title: 'Municipios y Gobiernos Regionales',
      badge: 'PLANIFICACIÓN & NORMAS',
      desc: 'Incorporación de capacidad portante biofísica en Planes Reguladores Comunales (PRC), ordenanzas hídricas y análisis preventivo de inversiones.',
      actionLabel: 'Ver Instrumentos de Política',
      onClick: () => onNavigate('articles')
    },
    {
      title: 'Comunidades, Juntas Vecinales y APRs',
      badge: 'DEFENSA & PERITAJE',
      desc: 'Peritajes técnicos independientes, contención psicosocial ante presiones extractivas y auditorías de cuenca con rigor matemático.',
      actionLabel: 'Auditar Mi Territorio',
      onClick: () => onNavigateCustomAudit ? onNavigateCustomAudit('agritwin') : onNavigate('audit')
    },
    {
      title: 'Proyectos & Cooperativas a Incubar',
      badge: 'INCUBADORA REGENERATIVA',
      desc: 'Acompañamiento técnico, validación de modelos productivos sintrópicos y articulación con fondos de financiamiento territorial.',
      actionLabel: 'Conocer el Modelo CORE',
      onClick: () => onNavigate('core')
    },
    {
      title: 'Academia & Centros de Estudio',
      badge: 'CIENCIA ABIERTA & REPRODUCIBLE',
      desc: 'Acceso a scripts canónicos en R, formulación matemática de Cauchy-Liebig y datasets comparativos multiescala (Chile y Europa).',
      actionLabel: 'Revisar Marco Epistémico',
      onClick: () => onNavigate('theory')
    }
  ];

  return (
    <section className="space-y-10 pt-2">
      {/* 1. ENCABEZADO INSTITUCIONAL THINK TANK + INCUBADORA */}
      <div className="relative p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#FAF7F0] via-[#EDE8DC] to-[#FAF7F0] border border-[#D4C9B8] shadow-md overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#487075]/10 via-[#C86D51]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider bg-white/90 text-[#28475A] border border-[#D4C9B8] shadow-sm">
            <Building className="w-3.5 h-3.5 text-[#487075]" />
            THINK TANK & INCUBADORA TERRITORIAL · SUR GLOBAL
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-snug">
            De la fragmentación extractiva a la <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#28475A] via-[#487075] to-[#C86D51]">seguridad integral y el cuidado de la vida</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-sans">
            <strong>HOMBROS</strong> articula un laboratorio de pensamiento crítico y acción territorial directa. Superamos la desmaterialización económica tradicional uniendo tres fuerzas indisociables: la <strong>geofísica y termodinámica de cuencas</strong>, la <strong>psicología comunitaria</strong> en resistencia a modelos extractivos y la <strong>sociología de la seguridad vecinal</strong>. 
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-serif font-bold text-white bg-gradient-to-r from-[#28475A] to-[#487075] hover:brightness-110 shadow-md transition-all group"
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              Descargar Presentación Oficial (PDF)
            </a>

            <button
              onClick={() => onNavigate('articles')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-700 bg-white hover:bg-slate-50 border border-[#D4C9B8] shadow-sm transition-all"
            >
              <FileText className="w-3.5 h-3.5 text-[#487075]" />
              Ver Policy Briefs & Propuestas
            </button>
          </div>
        </div>
      </div>

      {/* 2. MISIÓN Y VISIÓN OFICIALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MISIÓN */}
        <div className="p-8 rounded-3xl bg-white border border-[#D4C9B8] shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-[#487075] transition-all">
          <div className="h-1.5 w-24 bg-[#487075] rounded-full" />
          
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#487075]/10 text-[#487075] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#487075]">
                NUESTRA MISIÓN
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
              Cuantificación rigurosa e incubación regenerativa
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-[#487075]/30 pl-4 py-1">
              "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo a comunidades, municipios y tomadores de decisión la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos, co-diseñamos y aceleramos proyectos productivos, tecnológicos y comunitarios que devuelven soberanía y viabilidad material a los territorios."
            </p>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#487075]" />
            <span>Evidencia técnica inatacable + Proyectos reales en el terreno</span>
          </div>
        </div>

        {/* VISIÓN */}
        <div className="p-8 rounded-3xl bg-white border border-[#D4C9B8] shadow-md flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-[#C86D51] transition-all">
          <div className="h-1.5 w-24 bg-[#C86D51] rounded-full" />

          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#C86D51]/10 text-[#C86D51] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C86D51]">
                NUESTRA VISIÓN
              </span>
            </div>

            <h3 className="text-xl font-serif font-bold text-slate-900 leading-tight">
              Seguridad integral, cuidado y autogobierno territorial
            </h3>

            <p className="text-sm text-slate-600 leading-relaxed font-sans italic border-l-2 border-[#C86D51]/30 pl-4 py-1">
              "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza técnica, psicosocial y productiva para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
            </p>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-100">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Transformación institucional + Soberanía y salud comunitaria</span>
          </div>
        </div>
      </div>

      {/* 3. LOS 4 EJES ESTRATÉGICOS (THINK TANK + INCUBADORA) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold block">
              ESTRUCTURA DE ACCIÓN TRANSDISCIPLINAR
            </span>
            <h3 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Los 4 Ejes Estratégicos
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Convergencia entre investigación, regulación, incubación y cuidado vecinal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {strategicAxes.map((axis) => {
            const Icon = axis.icon;
            return (
              <div 
                key={axis.number}
                className="p-6 rounded-2xl bg-white border border-[#D4C9B8]/80 shadow-sm hover:shadow-md hover:border-slate-400 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {axis.number}
                    </span>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${axis.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {axis.tag}
                    </span>
                    <h4 className="text-base font-serif font-bold text-slate-900 group-hover:text-[#28475A] transition-colors leading-snug">
                      {axis.title}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {axis.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. LA PINZA ESTRATÉGICA: DOBLE TRACCIÓN (ESTADO & COMUNIDADES) */}
      <div className="p-8 rounded-3xl bg-[#EDE8DC]/70 border border-[#D4C9B8] space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold">
            ESTRATEGIA DE PINZA TERRITORIAL
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Doble Tracción: Estándar Normativo & Autonomía Comunitaria
          </h3>
          <p className="text-xs text-slate-600 font-sans">
            La transformación territorial no ocurre solo desde arriba (leyes) ni solo desde abajo (resistencia aislada). HOMBROS opera en ambos extremos:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          <div className="p-5 rounded-2xl bg-white border border-[#D4C9B8] space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#28475A]">
              <Milestone className="w-4 h-4 text-[#28475A]" />
              <span>Tracción Institucional (De Arriba hacia Abajo)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trabajamos con municipios, ministerios y comisiones parlamentarias para fijar límites biofísicos objetivos en Planes Reguladores, ordenanzas y sistemas de evaluación ambiental, impidiendo que el capital financiero sustituya legalmente al agua y los ecosistemas.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#D4C9B8] space-y-2">
            <div className="flex items-center gap-2 text-sm font-serif font-bold text-[#C86D51]">
              <Users className="w-4 h-4 text-[#C86D51]" />
              <span>Tracción Territorial (De Abajo hacia Arriba)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Proveemos a Juntas de Vecinos, Comités de Agua Potable Rural (APR) y asambleas socioambientales las pruebas técnicas, el respaldo psicosocial y los modelos productivos necesarios para ejercer su derecho al autogobierno y al veto fundado.
            </p>
          </div>
        </div>
      </div>

      {/* 5. LLAMADOS A LA ACCIÓN SEGMENTADOS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#487075] font-bold block">
              CANALES DE ARTICULACIÓN
            </span>
            <h3 className="text-xl font-serif font-bold text-slate-900">
              ¿Cómo interactuar con HOMBROS?
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {targetAudiences.map((aud, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-[#D4C9B8] hover:border-[#487075] hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-[#487075] px-2 py-0.5 rounded bg-[#487075]/10 inline-block">
                  {aud.badge}
                </span>
                <h4 className="text-sm font-serif font-bold text-slate-900 leading-tight">
                  {aud.title}
                </h4>
                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {aud.desc}
                </p>
              </div>

              <button
                onClick={aud.onClick}
                className="w-full inline-flex items-center justify-between text-xs font-serif font-bold text-[#28475A] hover:text-[#487075] pt-3 border-t border-slate-100 group"
              >
                <span>{aud.actionLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
