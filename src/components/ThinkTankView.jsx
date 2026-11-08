import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, Building2, Compass, ShieldCheck, HeartPulse, 
  TreePine, Sparkles, Download, ArrowRight, CheckCircle2, 
  Users, FileText, Layers, Activity, Microscope, Scale, 
  MountainSnow, Waves, Zap, Flame, Award, Globe, Rocket, 
  Eye, ShieldAlert, Cpu, ExternalLink, ChevronRight, BookOpen,
  HelpCircle, Check
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ThinkTankView({ onNavigate, onNavigateCustomAudit }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');
  const [activeFaq, setActiveFaq] = useState(null);

  const teamDisciplines = [
    {
      id: 'geophysics',
      role: 'Dirección Científica & Biofísica',
      title: 'Geofísica de Cuencas & Modelación de No-Equilibrio',
      lead: 'Daniel S. Santander Urrutia',
      credentials: 'Geofísico & Permacultor · Creador del Modelo HOMBROS · Investigador Doctoral EHU',
      accent: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      borderGlow: 'border-emerald-500/40 hover:border-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/30',
      icon: Microscope,
      highlights: [
        'Mecánica de medios continuos aplicada a cuencas hidrográficas y suelos vivos.',
        'Regla de no-compensabilidad de Liebig (H) y tensores de fatiga territorial (σ).',
        'Desarrollo de scripts de ciencia abierta reproducibles en R y Python.',
        'Superación de las fallas metodológicas de la Huella Ecológica, IDH y Planetary Boundaries.'
      ]
    },
    {
      id: 'psychology',
      role: 'Cuidado Colectivo & Salud Comunitaria',
      title: 'Psicología Comunitaria & Duelo Socioambiental',
      lead: 'Área de Salud y Acompañamiento Psicosocial',
      credentials: 'Especialista en intervención psicosocial y comunidades en conflicto territorial',
      accent: 'from-rose-500/20 via-orange-500/10 to-transparent',
      borderGlow: 'border-rose-500/40 hover:border-rose-400',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-400/30',
      icon: HeartPulse,
      highlights: [
        'Acompañamiento a comunidades en conflicto crónico con el modelo forestal (monocultivo de pino y eucalipto).',
        'Contención y reparación del trauma por incendios recurrentes, sequía y despojo del agua.',
        'Sanación del duelo ecológico y fortalecimiento de la resistencia afectiva comunitaria.',
        'Metodologías participativas de cartografía de afectos y cuidados del territorio.'
      ]
    },
    {
      id: 'sociology',
      role: 'Seguridad Integral & Tejido Barrial',
      title: 'Sociología de la Seguridad Vecinal & Gobernanza Local',
      lead: 'Área de Seguridad Comunitaria y Cohesión',
      credentials: 'Especialista en prevención sociocomunitaria, habitabilidad y redes barriales',
      accent: 'from-amber-500/20 via-yellow-500/10 to-transparent',
      borderGlow: 'border-amber-500/40 hover:border-amber-400',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-400/30',
      icon: Users,
      highlights: [
        'Seguridad ciudadana y vecinal construida desde el tejido social y la confianza mutua, no desde la militarización.',
        'Autogestión comunitaria de riesgos socionaturales en zonas de interfaz urbano-forestal.',
        'Recuperación del espacio público, habitabilidad rural-urbana y gobernanza de bienes comunes.',
        'Estructuración de redes panal de ayuda mutua entre juntas de vecinos y comités de agua.'
      ]
    }
  ];

  const strategicAxes = [
    {
      number: '01',
      title: 'Modelación Territorial & Diagnóstico Transdisciplinar',
      tag: 'CIENCIA DE FRONTERA & BIOFÍSICA',
      icon: Microscope,
      color: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30',
      accentBg: 'from-emerald-950/40 to-[#0A1625]',
      description: 'Integración rigurosa de geofísica, termodinámica y ciencia de datos abierta para medir la verdadera capacidad portante (H) y anticipar el punto de fluencia antes de la fractura irreversible.',
      bullets: [
        'Capacidad portante tridimensional no lineal (E, S, K)',
        'Monitoreo del límite de fluencia y fatiga hídrica',
        'Código abierto en R (tidyverse, ggplot2, montecarlo)',
        'Benchmarking satelital de 25 territorios globales'
      ]
    },
    {
      number: '02',
      title: 'Instrumentos de Planificación, Regulación & Políticas Públicas',
      tag: 'INCIDENCIA NORMATIVA & GOBERNANZA',
      icon: Scale,
      color: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/30',
      accentBg: 'from-cyan-950/40 to-[#0A1625]',
      description: 'Modernización transversal de los instrumentos de gestión territorial del Estado: Planes Reguladores Comunales (PRC), PROT, Evaluaciones Ambientales Estratégicas (EAE) y SEIA 2.0.',
      bullets: [
        'Cláusula Pre-Inversional de Salvaguarda Biofísica',
        'Ordenanzas municipales de protección de cuencas',
        'Veto técnico objetivo ante sobrecarga de Liebig',
        'Minutas y comparecencias en comisiones parlamentarias'
      ]
    },
    {
      number: '03',
      title: 'Incubadora de Proyectos & Ecotecnologías Territoriales',
      tag: 'ACCIÓN DIRECTA & SOBERANÍA MATERIAL',
      icon: Rocket,
      color: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
      accentBg: 'from-amber-950/40 to-[#0A1625]',
      description: 'Co-diseño, aceleración y canalización de fondos para proyectos productivos sintrópicos que elevan activamente la capacidad de carga del territorio en el barro y la economía real.',
      bullets: [
        'AgriTwin: Telemetría vecinal abierta de cuencas en tiempo real',
        'Agroforestería sintrópica y recarga freática (Chanco/Maule)',
        'Redes panal mutualistas entre comités de agua potable (APR)',
        'Bioeconomía circular de alto valor agregado local'
      ]
    },
    {
      number: '04',
      title: 'Cohesión Psicosocial, Seguridad Vecinal & Salud Comunitaria',
      tag: 'CUIDADO COLECTIVO & TEJIDO PROTECTOR',
      icon: HeartPulse,
      color: 'text-rose-300 bg-rose-500/15 border-rose-400/30',
      accentBg: 'from-rose-950/40 to-[#0A1625]',
      description: 'Acompañamiento psicosocial frente al monocultivo forestal, gestión comunitaria de riesgos de desastres (incendios) y fortalecimiento de la seguridad barrial desde la confianza vecinal.',
      bullets: [
        'Intervención en comunidades bajo conflicto forestal',
        'Prevención comunitaria de incendios en interfaz forestal',
        'Sanación del duelo ecológico y despojo hídrico',
        'Articulación de redes barriales de cuidado mutuo'
      ]
    }
  ];

  const incubatorProjects = [
    {
      title: 'AgriTwin: Gemelo Digital Vecinal de Cuenca',
      badge: 'EN PILOTAJE · TECNOLOGÍA ABIERTA',
      tagline: 'Telemetría hidrológica y climática comunitaria para comités de agua potable.',
      stats: '5 APRs interconectados · Telemetría horaria',
      desc: 'Plataforma abierta que conecta sensores de nivel freático, caudales y balance hídrico satelital con los teléfonos de los vecinos y dirigentes de APR, detectando estrés antes del corte de suministro.',
      icon: Cpu,
      color: 'text-cyan-400 border-cyan-500/40'
    },
    {
      title: 'Agroforestería Sintrópica & Bosques de Agua',
      badge: 'TERRENO · RESTAURACIÓN PRODUCTIVA',
      tagline: 'Regeneración de suelo vivo y recarga de acuíferos en secano costero.',
      stats: '+140% retención de humedad · Cero agroquímicos',
      desc: 'Sistemas agroforestales estratificados en Chanco y Maule Sur que combinan producción de alimentos con árboles nativos para infiltrar lluvia en zanjas Keyline y frenar la aridez generada por pinos.',
      icon: TreePine,
      color: 'text-emerald-400 border-emerald-500/40'
    },
    {
      title: 'Red Panal de Amortiguación Vecinal (APRs)',
      badge: 'GOBERNANZA COMÚN · BIENES COLECTIVOS',
      tagline: 'Mutualismo hídrico interconectado contra la sequía extrema.',
      stats: 'Factor de absorción κ = 0.38 · Cero camiones aljibe',
      desc: 'Estructura policéntrica de interconexión donde las comunidades con superávit estacional auxilian a las zonas bajo estrés, eliminando la dependencia parasitaria de los camiones aljibe privados.',
      icon: Globe,
      color: 'text-amber-400 border-amber-500/40'
    }
  ];

  const faqs = [
    {
      q: '¿Por qué HOMBROS es a la vez un Think Tank y una Incubadora?',
      a: 'Porque el diagnóstico sin acción material conduce a la parálisis académica, y la acción técnica sin marco biofísico termina en greenwashing. El Think Tank establece la norma, el límite físico y la reforma de políticas públicas; la Incubadora construye y acelera en el barro los proyectos regenerativos que demuestran la viabilidad material del nuevo paradigma.'
    },
    {
      q: '¿Qué significa que el modelo sea "no compensatorio"?',
      a: 'La economía neoclásica tradicional asume que si destruyes un río o un suelo fértil, puedes "compensarlo" pagando una indemnización monetaria o plantando árboles en otro lugar. HOMBROS aplica la Ley de Liebig de la naturaleza: el capital financiero no puede sustituir al agua ni a la fotosíntesis. Si un pilar cae por debajo del umbral crítico, el sistema entero colapsa sin importar cuánto dinero haya.'
    },
    {
      q: '¿Cómo se conecta la psicología comunitaria y la seguridad vecinal con la física de cuencas?',
      a: 'El territorio no es solo tierra y agua: está habitado por personas organizadas en comunidades. El extractivismo forestal o minero no solo seca napas; fractura familias, impone miedo al fuego, destruye oficios tradicionales y rompe la confianza barrial. No hay seguridad hídrica sin cohesión vecinal, y no hay salud mental comunitaria en un entorno ecológico devastado.'
    },
    {
      q: '¿Cómo puede un municipio o una asamblea comunitaria colaborar con HOMBROS?',
      a: 'Un municipio puede solicitar una pre-auditoría biofísica para incorporar límites de capacidad portante en su Plan Regulador o diseñar ordenanzas hídricas. Una junta vecinal o APR puede utilizar nuestro Kit "Audita tu Cuenca" para obtener dictámenes técnicos independientes con validez jurídica y científica ante proyectos extractivos.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-16 pb-12"
    >
      {/* ========================================================
          1. HERO MONUMENTAL INSTITUCIONAL (NOCHE ESMERALDA & ORO)
          ======================================================== */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_10px_50px_rgba(0,0,0,0.7)] bg-gradient-to-b from-[#060D17] via-[#0A1625] to-[#0E1F33] text-white p-8 sm:p-12 md:p-16">
        {/* Nebulosas y Resplandores Bioluminiscentes de Fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-gradient-to-bl from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-radial-gradient from-white/[0.03] to-transparent pointer-events-none" />

        {/* Borde Superior Luminoso Tricolor */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              <span>THINK TANK & INCUBADORA TERRITORIAL · SUR GLOBAL</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider bg-white/10 text-slate-300 border border-white/15 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>CIENCIA VINCULANTE & ACCIÓN MATERIAL</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.15] text-white">
            De la autopsia extractiva a la{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-emerald-200 to-cyan-300 italic">
              seguridad integral y el cuidado de la vida
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl font-sans leading-relaxed">
            HOMBROS desafía la ficción contable que pretende comprar con dinero la destrucción del agua y de las comunidades. Articulamos la <strong>geofísica de cuencas</strong>, la <strong>psicología comunitaria</strong> y la <strong>sociología de la seguridad vecinal</strong> para dotar a los territorios de evidencia matemática inatacable y proyectos regenerativos vivos.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-serif font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300 hover:brightness-110 shadow-[0_0_30px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 group"
            >
              <Download className="w-4 h-4 text-slate-900 group-hover:-translate-y-0.5 transition-transform" />
              <span>Descargar Presentación Oficial (PDF)</span>
            </a>

            <button
              onClick={() => onNavigate('articles')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-mono font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md shadow-sm transition-all"
            >
              <FileText className="w-4 h-4 text-emerald-300" />
              <span>Ver Propuesta de Ley & Policy</span>
            </button>

            <button
              onClick={() => onNavigate('audit')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-mono font-bold text-amber-200 bg-amber-950/40 hover:bg-amber-900/50 border border-amber-400/40 backdrop-blur-md transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>Kit Audita tu Cuenca</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          2. MISIÓN Y VISIÓN OFICIALES (ALBA & SINTROPÍA MONUMENTAL)
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* TARJETA MISIÓN */}
        <div className="relative rounded-3xl p-8 sm:p-10 border border-emerald-500/40 shadow-xl bg-gradient-to-br from-[#081822] via-[#0C2230] to-[#081822] text-white flex flex-col justify-between space-y-6 overflow-hidden group hover:border-emerald-400 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="h-1.5 w-28 bg-gradient-to-r from-emerald-400 to-teal-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center shadow-inner">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block">
                    PROPÓSITO FUNDACIONAL
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                    Nuestra Misión
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                PENSAMIENTO + ACCIÓN
              </span>
            </div>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-sans italic border-l-2 border-emerald-400/50 pl-5 py-2 bg-emerald-950/20 rounded-r-xl">
              "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo a comunidades, municipios y tomadores de decisión la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos, co-diseñamos y aceleramos proyectos productivos, tecnológicos y comunitarios que devuelven soberanía y viabilidad material a los territorios."
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-300/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Evidencia técnica inatacable
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Proyectos reales en el terreno
            </span>
          </div>
        </div>

        {/* TARJETA VISIÓN */}
        <div className="relative rounded-3xl p-8 sm:p-10 border border-amber-500/40 shadow-xl bg-gradient-to-br from-[#1C160F] via-[#241D14] to-[#14100B] text-white flex flex-col justify-between space-y-6 overflow-hidden group hover:border-amber-400 transition-all">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="h-1.5 w-28 bg-gradient-to-r from-amber-400 to-rose-300 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center shadow-inner">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                    HORIZONTE EMANCIPATORIO
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide">
                    Nuestra Visión
                  </h3>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40">
                SOBERANÍA & CUIDADO
              </span>
            </div>

            <p className="text-base sm:text-lg text-amber-100/90 leading-relaxed font-sans italic border-l-2 border-amber-400/50 pl-5 py-2 bg-amber-950/20 rounded-r-xl">
              "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza técnica, psicosocial y productiva para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-amber-300/90">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Nuevo estándar regulatorio vinculante
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              Autogobierno y salud de la comunidad
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================
          3. EL TRÍPODE TRANSDISCIPLINAR DEL EQUIPO
          ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-400/30">
              <Users className="w-3.5 h-3.5" />
              CONVERGENCIA TRANSDISCIPLINAR
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1">
              Las Tres Fuerzas Fundamentales del Laboratorio
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono max-w-md">
            Unimos la física de sistemas complejos con la vivencia comunitaria del conflicto extractivo y la seguridad ciudadana.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamDisciplines.map((disc) => {
            const Icon = disc.icon;
            return (
              <div
                key={disc.id}
                className={`p-7 rounded-3xl bg-white border ${disc.borderGlow} shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between space-y-6 relative overflow-hidden group`}
              >
                <div className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${disc.accent} rounded-full blur-2xl pointer-events-none`} />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${disc.badgeColor}`}>
                      {disc.role}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform flex items-center justify-center text-slate-700">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {disc.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-slate-600 mt-1">
                      {disc.lead}
                    </p>
                    <p className="text-[11px] text-slate-400 italic font-sans mt-0.5">
                      {disc.credentials}
                    </p>
                  </div>

                  <ul className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-sans">
                    {disc.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          4. LOS 4 EJES ESTRATÉGICOS (LABORATORIOS DE ACCIÓN)
          ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block">
              ESTRUCTURA OPERATIVA VINCULANTE
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Los 4 Ejes Estratégicos de HOMBROS
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Dos brazos de pensamiento riguroso + Dos brazos de incubación y defensa directa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strategicAxes.map((axis) => {
            const Icon = axis.icon;
            return (
              <div 
                key={axis.number}
                className="p-7 rounded-3xl bg-white border border-[#D4C9B8] hover:border-slate-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-bold text-slate-400">
                      {axis.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${axis.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      {axis.tag}
                    </span>
                    <h3 className="text-base font-serif font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                      {axis.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {axis.description}
                  </p>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    {axis.bullets.map((b, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] font-mono text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          5. LA ESTRATEGIA DE PINZA: TRACCIÓN INSTITUCIONAL & COMUNITARIA
          ======================================================== */}
      <div className="relative rounded-3xl p-8 sm:p-12 border border-[#D4C9B8] bg-gradient-to-br from-[#FAF7F0] via-[#EDE8DC] to-[#FAF7F0] shadow-inner space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300">
            ESTRATEGIA POLÍTICA DE TRANSFORMACIÓN
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900">
            La Pinza Territorial: Doble Tracción Simultánea
          </h2>
          <p className="text-sm text-slate-700 font-sans leading-relaxed">
            Las transformaciones duraderas no se logran solo esperando reformas desde el Congreso, ni solo resistiendo en marchas sin respaldo técnico. HOMBROS presiona en ambos costados para quebrar la impunidad extractiva:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* LADO A: INSTITUCIONAL */}
          <div className="p-8 rounded-3xl bg-white border border-[#D4C9B8] shadow-md space-y-4 hover:border-slate-400 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-slate-500 block">
                  DE ARRIBA HACIA ABAJO
                </span>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Tracción Institucional & Normativa
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Asesoramos a ministerios, parlamentarios, gobiernos regionales (GORE) y municipios para integrar la **Cláusula Pre-Inversional de Salvaguarda Biofísica** en Planes Reguladores, ordenanzas y reformas de ley. Imponemos la no-compensabilidad para que ninguna empresa pueda pagar dinero a cambio de secar una cuenca.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Estándar legal inexpugnable ante tribunales ambientales</span>
            </div>
          </div>

          {/* LADO B: COMUNITARIO */}
          <div className="p-8 rounded-3xl bg-white border border-[#D4C9B8] shadow-md space-y-4 hover:border-slate-400 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 flex items-center justify-center font-bold">
                <Users className="w-5 h-5 text-rose-700" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-rose-600 block">
                  DE ABAJO HACIA ARRIBA
                </span>
                <h3 className="text-lg font-serif font-bold text-slate-900">
                  Tracción Comunitaria & Autogobierno
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              Entregamos a las Juntas Vecinales, Comités de Agua Potable Rural (APR) y asambleas territoriales el **Kit "Audita tu Cuenca"** y dictámenes periciales independientes. Dejan de pelear solo desde la consigna y disputan el territorio con mecánica de medios continuos y balances metabólicos inatacables.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-rose-700">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <span>Poder técnico de veto y soberanía comunitaria efectiva</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          6. LA INCUBADORA EN EL TERRENO (PIPELINE DE PROYECTOS VIVOS)
          ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 border border-amber-400/40">
              <Rocket className="w-3.5 h-3.5" />
              INCUBADORA TERRITORIAL & ECOTECNOLOGÍAS
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight mt-1">
              Proyectos Reales en Fase de Pilotaje & Aceleración
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Soluciones materiales que devuelven capacidad de carga al territorio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {incubatorProjects.map((proj, idx) => {
            const Icon = proj.icon;
            return (
              <div 
                key={idx}
                className="p-8 rounded-3xl bg-white border border-[#D4C9B8] hover:border-amber-500 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {proj.badge}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-amber-800 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs font-mono font-semibold text-emerald-700 mt-1">
                      {proj.stats}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {proj.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{proj.tagline}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================
          7. SHOWCASE DEL DOSSIER EJECUTIVO (PDF PRESENTACIÓN)
          ======================================================== */}
      <div className="relative rounded-3xl p-8 sm:p-10 border border-slate-700 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 overflow-hidden">
        <div className="space-y-4 max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/40">
            <BookOpen className="w-3.5 h-3.5" />
            DOCUMENTO INSTITUCIONAL OFICIAL
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Dossier & Presentación Oficial del Modelo HOMBROS
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            Consulte la presentación canónica completa: fundamentación matemática de tensores, superación crítica de los marcos globales (Doughnut, Límites Planetarios), validación empírica en ocho territorios y hoja de ruta estratégica para gobiernos locales y asambleas.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-serif font-bold text-slate-950 bg-gradient-to-r from-amber-300 to-emerald-300 hover:brightness-110 shadow-lg transition-all"
            >
              <Download className="w-4 h-4 text-slate-900" />
              <span>Descargar PDF Oficial</span>
            </a>

            <a
              href={getAssetUrl('paper.html')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-cyan-300" />
              <span>Ver Paper Científico Interactivo</span>
            </a>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs font-mono space-y-2.5 max-w-sm w-full">
          <div className="text-amber-300 font-bold border-b border-white/10 pb-2">
            Índice del Dossier Ejecutivo:
          </div>
          <div className="text-slate-300 space-y-1">
            <div>1. Epistemología de Medios Continuos</div>
            <div>2. La Regla de Liebig Generalizada</div>
            <div>3. Ensayo de Tracción & Curvas σ-ε</div>
            <div>4. Deuda Entrópica Scope 3 (Chile vs Europa)</div>
            <div>5. Kit Audita tu Cuenca & Red Panal</div>
          </div>
          <div className="text-[10px] text-slate-400 pt-2 border-t border-white/10 flex justify-between">
            <span>Formato: PDF Vectorial</span>
            <span className="text-emerald-400 font-bold">Acceso Abierto</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          8. PREGUNTAS FRECUENTES (FAQ)
          ======================================================== */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-800 font-bold block">
            CLARIDAD CONCEPTUAL & OPERATIVA
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Preguntas Frecuentes sobre el Think Tank & Incubadora
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-[#D4C9B8] bg-white overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-slate-900 hover:text-emerald-800 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
