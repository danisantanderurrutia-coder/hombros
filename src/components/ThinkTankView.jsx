import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, Building2, Compass, ShieldCheck, HeartPulse, 
  TreePine, Download, ArrowRight, CheckCircle2, 
  Users, FileText, Layers, Activity, Microscope, Scale, 
  MountainSnow, Waves, Zap, Flame, Award, Globe, Rocket, 
  Eye, ShieldAlert, Cpu, ExternalLink, ChevronRight, BookOpen,
  HelpCircle, Check, Palette, Mountain
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';
import FilosofiaHombrosModal from './FilosofiaHombrosModal';

export default function ThinkTankView({ onNavigate, onNavigateCustomAudit }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');
  const [activeFaq, setActiveFaq] = useState(null);
  const [isFilosofiaOpen, setIsFilosofiaOpen] = useState(false);
  
  // Fondo fijo institucional: Pizarra Ejecutiva & Gabinete (Chatham House / RAND)
  const selectedTheme = 'pizarra';

  const themes = {
    alabastro: {
      id: 'alabastro',
      name: 'Opción 1: Blanco Alabastro & Cartografía',
      sub: 'Estilo Stockholm Resilience Centre / Oxford Martin School (Limpio, Geodésico, Multilateral)',
      wrapper: 'bg-[#F8FAF9] text-slate-800',
      gridPattern: 'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.04) 1px, transparent 1px)',
      gridSize: '24px 24px',
      heroBg: 'bg-white border-slate-200/90 shadow-sm text-slate-900',
      heroAccentLine: 'bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51]',
      heroBadge: 'bg-slate-100 text-slate-700 border-slate-200',
      heroBadgeSecondary: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20',
      heroTitle: 'text-slate-900',
      heroTitleGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#927660]',
      heroDesc: 'text-slate-600',
      btnPrimary: 'bg-[#1E293B] hover:bg-[#0F172A] text-white shadow-sm border border-slate-900',
      btnSecondary: 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 shadow-xs',
      btnAccent: 'bg-[#1B4332] hover:bg-[#122E22] text-white shadow-sm border border-[#1B4332]',
      misionCard: 'bg-white border-slate-200 text-slate-900 border-t-4 border-t-[#1B4332] shadow-xs',
      misionBadge: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20',
      misionQuote: 'bg-slate-50 border-[#1B4332]/30 text-slate-700',
      visionCard: 'bg-white border-slate-200 text-slate-900 border-t-4 border-t-[#28475A] shadow-xs',
      visionBadge: 'bg-[#28475A]/10 text-[#28475A] border-[#28475A]/20',
      visionQuote: 'bg-slate-50 border-[#28475A]/30 text-slate-700',
      pillarCard: 'bg-white border-slate-200 hover:border-slate-400 text-slate-800 shadow-xs',
      axisCard: 'bg-white border-slate-200 hover:border-slate-400 text-slate-800 shadow-xs',
      pinchContainer: 'bg-slate-100/70 border-slate-200 text-slate-900',
      pinchCard: 'bg-white border-slate-200 shadow-xs text-slate-800',
      incubatorCard: 'bg-white border-slate-200 hover:border-slate-400 shadow-xs text-slate-800',
      dossierCard: 'bg-[#1E293B] border-slate-700 text-white shadow-md',
      faqCard: 'bg-white border-slate-200 text-slate-800',
      iconBox: 'bg-slate-100 text-[#1E293B]'
    },
    lino: {
      id: 'lino',
      name: 'Opción 2: Lino Editorial & Archivo de Estado',
      sub: 'Estilo Financial Times / CEPAL / Memoria Histórica (Papel Prensa noble, Calidez, Derecho Territorial)',
      wrapper: 'bg-[#F4EFEA] text-stone-800',
      gridPattern: 'linear-gradient(to bottom, rgba(146, 118, 96, 0.07) 1px, transparent 1px)',
      gridSize: '100% 28px',
      heroBg: 'bg-[#FAF7F2] border-[#DCD5CB] shadow-xs text-stone-900',
      heroAccentLine: 'bg-gradient-to-r from-[#78350F] via-[#991B1B] to-[#78350F]',
      heroBadge: 'bg-[#EFE9DF] text-stone-700 border-[#D5CDBD]',
      heroBadgeSecondary: 'bg-[#991B1B]/10 text-[#991B1B] border-[#991B1B]/20',
      heroTitle: 'text-stone-900',
      heroTitleGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-[#78350F] via-[#991B1B] to-[#5C2809]',
      heroDesc: 'text-stone-600',
      btnPrimary: 'bg-[#78350F] hover:bg-[#5C2809] text-amber-50 shadow-xs border border-[#78350F]',
      btnSecondary: 'bg-[#FAF7F2] hover:bg-[#EDE6DC] text-stone-800 border-[#DCD5CB]',
      btnAccent: 'bg-[#991B1B] hover:bg-[#7F1D1D] text-white shadow-xs border border-[#991B1B]',
      misionCard: 'bg-[#FCFAF7] border-[#DCD5CB] text-stone-900 border-l-4 border-l-[#78350F] shadow-xs',
      misionBadge: 'bg-[#78350F]/10 text-[#78350F] border-[#78350F]/20',
      misionQuote: 'bg-[#F4EFEA] border-[#78350F]/30 text-stone-700',
      visionCard: 'bg-[#FCFAF7] border-[#DCD5CB] text-stone-900 border-l-4 border-l-[#991B1B] shadow-xs',
      visionBadge: 'bg-[#991B1B]/10 text-[#991B1B] border-[#991B1B]/20',
      visionQuote: 'bg-[#F4EFEA] border-[#991B1B]/30 text-stone-700',
      pillarCard: 'bg-[#FCFAF7] border-[#DCD5CB] hover:border-stone-400 text-stone-800 shadow-xs',
      axisCard: 'bg-[#FCFAF7] border-[#DCD5CB] hover:border-stone-400 text-stone-800 shadow-xs',
      pinchContainer: 'bg-[#EAE4DC] border-[#DCD5CB] text-stone-900',
      pinchCard: 'bg-[#FCFAF7] border-[#DCD5CB] shadow-xs text-stone-800',
      incubatorCard: 'bg-[#FCFAF7] border-[#DCD5CB] hover:border-stone-400 shadow-xs text-stone-800',
      dossierCard: 'bg-[#2E1F18] border-[#533A2D] text-[#FDFBF7] shadow-md',
      faqCard: 'bg-[#FCFAF7] border-[#DCD5CB] text-stone-800',
      iconBox: 'bg-[#EFE9DF] text-[#78350F]'
    },
    pizarra: {
      id: 'pizarra',
      name: 'Opción 3: Pizarra Ejecutiva & Gabinete',
      sub: 'Estilo Chatham House Executive / RAND (Antracita mate, Sin neones gamer, Autoridad de Estado Mayor)',
      wrapper: 'bg-[#0B1120] text-slate-200',
      gridPattern: 'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      gridSize: '36px 36px',
      heroBg: 'bg-[#111C30] border-slate-700/80 shadow-lg text-slate-100',
      heroAccentLine: 'bg-gradient-to-r from-[#D4AF37] via-[#38BDF8] to-[#10B981]',
      heroBadge: 'bg-slate-800 text-slate-300 border-slate-700',
      heroBadgeSecondary: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/30',
      heroTitle: 'text-slate-50',
      heroTitleGradient: 'text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-amber-200 to-slate-300',
      heroDesc: 'text-slate-300',
      btnPrimary: 'bg-[#D4AF37] hover:bg-[#C29D2D] text-slate-950 font-bold shadow-sm',
      btnSecondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700',
      btnAccent: 'bg-emerald-700 hover:bg-emerald-600 text-white shadow-sm border border-emerald-600',
      misionCard: 'bg-[#132238] border-slate-700 text-slate-100 border-l-4 border-l-[#10B981] shadow-sm',
      misionBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700',
      misionQuote: 'bg-[#0B1424] border-emerald-500/40 text-slate-200',
      visionCard: 'bg-[#132238] border-slate-700 text-slate-100 border-l-4 border-l-[#D4AF37] shadow-sm',
      visionBadge: 'bg-amber-950/80 text-amber-300 border-amber-700',
      visionQuote: 'bg-[#0B1424] border-amber-500/40 text-slate-200',
      pillarCard: 'bg-[#111C30] border-slate-800 hover:border-slate-600 text-slate-200 shadow-sm',
      axisCard: 'bg-[#111C30] border-slate-800 hover:border-slate-600 text-slate-200 shadow-sm',
      pinchContainer: 'bg-[#0F172A] border-slate-800 text-slate-100',
      pinchCard: 'bg-[#142034] border-slate-700 shadow-sm text-slate-200',
      incubatorCard: 'bg-[#111C30] border-slate-800 hover:border-slate-600 shadow-sm text-slate-200',
      dossierCard: 'bg-[#0A0F1D] border-slate-700 text-white shadow-md',
      faqCard: 'bg-[#111C30] border-slate-800 text-slate-200',
      iconBox: 'bg-slate-800 text-amber-300'
    }
  };

  const current = themes[selectedTheme] || themes.alabastro;

  const teamDisciplines = [
    {
      id: 'geophysics',
      role: 'DIRECCIÓN CIENTÍFICA & BIOFÍSICA',
      title: 'Geofísica de Cuencas & Modelación de No-Equilibrio',
      lead: 'Daniel S. Santander Urrutia',
      credentials: 'Geofísico & Permacultor · Creador del Modelo HOMBROS · Investigador Doctoral EHU',
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
      role: 'CUIDADO COLECTIVO & SALUD COMUNITARIA',
      title: 'Psicología Comunitaria & Duelo Socioambiental',
      lead: 'Área de Salud y Acompañamiento Psicosocial',
      credentials: 'Especialista en intervención psicosocial y comunidades en conflicto territorial',
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
      role: 'SEGURIDAD INTEGRAL & TEJIDO BARRIAL',
      title: 'Sociología de la Seguridad Vecinal & Gobernanza Local',
      lead: 'Área de Seguridad Comunitaria y Cohesión',
      credentials: 'Especialista en prevención sociocomunitaria, habitabilidad y redes barriales',
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
    },
    {
      title: 'Agroforestería Sintrópica & Bosques de Agua',
      badge: 'TERRENO · RESTAURACIÓN PRODUCTIVA',
      tagline: 'Regeneración de suelo vivo y recarga de acuíferos en secano costero.',
      stats: '+140% retención de humedad · Cero agroquímicos',
      desc: 'Sistemas agroforestales estratificados en Chanco y Maule Sur que combinan producción de alimentos con árboles nativos para infiltrar lluvia en zanjas Keyline y frenar la aridez generada por pinos.',
      icon: TreePine,
    },
    {
      title: 'Red Panal de Amortiguación Vecinal (APRs)',
      badge: 'GOBERNANZA COMÚN · BIENES COLECTIVOS',
      tagline: 'Mutualismo hídrico interconectado contra la sequía extrema.',
      stats: 'Factor de absorción κ = 0.38 · Cero camiones aljibe',
      desc: 'Estructura policéntrica de interconexión donde las comunidades con superávit estacional auxilian a las zonas bajo estrés, eliminando la dependencia parasitaria de los camiones aljibe privados.',
      icon: Globe,
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
    <div 
      className={`relative min-h-screen transition-colors duration-300 p-4 sm:p-6 md:p-8 rounded-3xl ${current.wrapper}`}
      style={{
        backgroundImage: current.gridPattern,
        backgroundSize: current.gridSize
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-14"
      >
        {/* ========================================================
            1. HERO INSTITUCIONAL
            ======================================================== */}
        <div className={`relative rounded-3xl overflow-hidden border p-8 sm:p-12 md:p-14 ${current.heroBg}`}>
          <div className={`absolute top-0 inset-x-0 h-1.5 ${current.heroAccentLine}`} />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${current.heroBadge}`}>
                <Landmark className="w-3.5 h-3.5" />
                <span>THINK TANK & INCUBADORA TERRITORIAL</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider border ${current.heroBadgeSecondary}`}>
                <span>SUR GLOBAL · TRANSDISCIPLINAR</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.15]">
              De la autopsia extractiva a la{' '}
              <span className={current.heroTitleGradient}>
                seguridad integral y el cuidado de la vida
              </span>
            </h1>

            <p className={`text-base sm:text-lg md:text-xl max-w-3xl font-sans leading-relaxed ${current.heroDesc}`}>
              HOMBROS desafía la ficción contable que pretende comprar con dinero la destrucción del agua y de las comunidades. Articulamos la <strong>geofísica de cuencas</strong>, la <strong>psicología comunitaria</strong> y la <strong>sociología de la seguridad vecinal</strong> para dotar a los territorios de evidencia matemática inatacable y proyectos regenerativos vivos.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <a
                href={presentationPdfUrl}
                download="HOMBROS_Presentacion_Oficial.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all ${current.btnPrimary}`}
              >
                <Download className="w-4 h-4" />
                <span>Descargar Presentación Oficial (PDF)</span>
              </a>

              <button
                onClick={() => onNavigate('articles')}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${current.btnSecondary}`}
              >
                <FileText className="w-4 h-4" />
                <span>Ver Propuesta de Ley & Policy</span>
              </button>

              <button
                onClick={() => onNavigate('audit')}
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all ${current.btnAccent}`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Kit Audita tu Cuenca</span>
              </button>

              <button
                onClick={() => setIsFilosofiaOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-serif font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 transition-all shadow-xs"
              >
                <Mountain className="w-4 h-4 text-amber-300" />
                <span>Filosofía de los Hombros</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal interactivo de la Filosofía de los Hombros (Alegoría de Atlas & Escalinata) */}
        <FilosofiaHombrosModal 
          isOpen={isFilosofiaOpen} 
          onClose={() => setIsFilosofiaOpen(false)} 
        />

        {/* ========================================================
            2. MISIÓN Y VISIÓN
            ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {/* MISIÓN */}
          <div className={`p-8 sm:p-9 rounded-3xl border flex flex-col justify-between space-y-6 ${current.misionCard}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${current.iconBox}`}>
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      PROPÓSITO FUNDACIONAL
                    </span>
                    <h3 className="text-xl font-serif font-bold tracking-tight">
                      Nuestra Misión
                    </h3>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${current.misionBadge}`}>
                  PENSAMIENTO + ACCIÓN
                </span>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed font-sans italic border-l-2 pl-4 py-2 rounded-r-lg ${current.misionQuote}`}>
                "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo a comunidades, municipios y tomadores de decisión la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos, co-diseñamos y aceleramos proyectos productivos, tecnológicos y comunitarios que devuelven soberanía y viabilidad material a los territorios."
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono opacity-80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Evidencia técnica inatacable
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Proyectos reales en el terreno
              </span>
            </div>
          </div>

          {/* VISIÓN */}
          <div className={`p-8 sm:p-9 rounded-3xl border flex flex-col justify-between space-y-6 ${current.visionCard}`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${current.iconBox}`}>
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      HORIZONTE EMANCIPATORIO
                    </span>
                    <h3 className="text-xl font-serif font-bold tracking-tight">
                      Nuestra Visión
                    </h3>
                  </div>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full border ${current.visionBadge}`}>
                  SOBERANÍA & CUIDADO
                </span>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed font-sans italic border-l-2 pl-4 py-2 rounded-r-lg ${current.visionQuote}`}>
                "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza técnica, psicosocial y productiva para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs font-mono opacity-80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Nuevo estándar regulatorio vinculante
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Autogobierno y salud comunitaria
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. EL TRÍPODE TRANSDISCIPLINAR DEL EQUIPO
            ======================================================== */}
        <div className="space-y-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                COMPOSICIÓN DEL EQUIPO CIENTÍFICO
              </span>
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                Las Tres Fuerzas Fundamentales del Laboratorio
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500 max-w-md">
              Unimos la física de sistemas complejos con la vivencia comunitaria del conflicto extractivo y la seguridad ciudadana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamDisciplines.map((disc) => {
              const Icon = disc.icon;
              return (
                <div
                  key={disc.id}
                  className={`p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all ${current.pillarCard}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {disc.role}
                      </span>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${current.iconBox}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-serif font-bold leading-snug">
                        {disc.title}
                      </h3>
                      <p className="text-xs font-mono font-semibold opacity-90 mt-1">
                        {disc.lead}
                      </p>
                      <p className="text-[11px] opacity-60 italic font-sans mt-0.5">
                        {disc.credentials}
                      </p>
                    </div>

                    <ul className="space-y-1.5 pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-sans opacity-90">
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
            4. LOS 4 EJES ESTRATÉGICOS
            ======================================================== */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                ESTRUCTURA OPERATIVA VINCULANTE
              </span>
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                Los 4 Ejes Estratégicos de HOMBROS
              </h2>
            </div>
            <p className="text-xs font-mono text-slate-500">
              Dos brazos de pensamiento riguroso + Dos brazos de incubación y defensa directa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {strategicAxes.map((axis) => {
              const Icon = axis.icon;
              return (
                <div 
                  key={axis.number}
                  className={`p-6 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${current.axisCard}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold opacity-50">
                        {axis.number}
                      </span>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${current.iconBox}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider opacity-60 block mb-1">
                        {axis.tag}
                      </span>
                      <h3 className="text-sm font-serif font-bold leading-snug">
                        {axis.title}
                      </h3>
                    </div>

                    <p className="text-xs opacity-80 leading-relaxed font-sans">
                      {axis.description}
                    </p>

                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 space-y-1">
                      {axis.bullets.map((b, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] font-mono opacity-80">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
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
            5. LA PINZA TERRITORIAL: TRACCIÓN INSTITUCIONAL & COMUNITARIA
            ======================================================== */}
        <div className={`p-8 sm:p-10 rounded-3xl border space-y-6 ${current.pinchContainer}`}>
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-60">
              ESTRATEGIA POLÍTICA DE TRANSFORMACIÓN
            </span>
            <h2 className="text-2xl font-serif font-bold">
              La Pinza Territorial: Doble Tracción Simultánea
            </h2>
            <p className="text-xs font-sans opacity-80 leading-relaxed">
              Las transformaciones duraderas no se logran solo esperando reformas desde el Congreso, ni solo resistiendo en marchas sin respaldo técnico. HOMBROS presiona en ambos costados:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className={`p-6 rounded-2xl border space-y-3 ${current.pinchCard}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${current.iconBox}`}>
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase opacity-60 block">
                    DE ARRIBA HACIA ABAJO
                  </span>
                  <h3 className="text-base font-serif font-bold">
                    Tracción Institucional & Normativa
                  </h3>
                </div>
              </div>
              <p className="text-xs font-sans opacity-80 leading-relaxed">
                Asesoramos a ministerios, parlamentarios, gobiernos regionales (GORE) y municipios para integrar la **Cláusula Pre-Inversional de Salvaguarda Biofísica** en Planes Reguladores, ordenanzas y reformas de ley. Imponemos la no-compensabilidad para que ninguna empresa pueda pagar dinero a cambio de secar una cuenca.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border space-y-3 ${current.pinchCard}`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${current.iconBox}`}>
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase opacity-60 block">
                    DE ABAJO HACIA ARRIBA
                  </span>
                  <h3 className="text-base font-serif font-bold">
                    Tracción Comunitaria & Autogobierno
                  </h3>
                </div>
              </div>
              <p className="text-xs font-sans opacity-80 leading-relaxed">
                Entregamos a las Juntas Vecinales, Comités de Agua Potable Rural (APR) y asambleas territoriales el **Kit "Audita tu Cuenca"** y dictámenes periciales independientes. Dejan de pelear solo desde la consigna y disputan el territorio con mecánica de medios continuos y balances metabólicos inatacables.
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================
            6. LA INCUBADORA EN TERRENO
            ======================================================== */}
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60 block">
                INCUBADORA TERRITORIAL & ECOTECNOLOGÍAS
              </span>
              <h2 className="text-2xl font-serif font-bold tracking-tight">
                Proyectos Reales en Fase de Pilotaje & Aceleración
              </h2>
            </div>
            <p className="text-xs font-mono opacity-60">
              Soluciones materiales que devuelven capacidad de carga al territorio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {incubatorProjects.map((proj, idx) => {
              const Icon = proj.icon;
              return (
                <div 
                  key={idx}
                  className={`p-7 rounded-3xl border flex flex-col justify-between space-y-5 transition-all ${current.incubatorCard}`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 opacity-80">
                        {proj.badge}
                      </span>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${current.iconBox}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-serif font-bold leading-snug">
                        {proj.title}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {proj.stats}
                      </p>
                    </div>

                    <p className="text-xs opacity-80 leading-relaxed font-sans">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 text-[11px] font-mono opacity-70 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{proj.tagline}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            7. DOSSIER EJECUTIVO (PDF)
            ======================================================== */}
        <div className={`p-8 sm:p-10 rounded-3xl border flex flex-col lg:flex-row items-center justify-between gap-8 ${current.dossierCard}`}>
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 border border-white/20">
              <BookOpen className="w-3.5 h-3.5" />
              DOCUMENTO INSTITUCIONAL OFICIAL
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight">
              Dossier & Presentación Oficial del Modelo HOMBROS
            </h2>

            <p className="text-xs sm:text-sm font-sans opacity-85 leading-relaxed">
              Consulte la presentación canónica completa: fundamentación matemática de tensores, superación crítica de los marcos globales (Doughnut, Límites Planetarios), validación empírica en ocho territorios y hoja de ruta estratégica para gobiernos locales y asambleas.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={presentationPdfUrl}
                download="HOMBROS_Presentacion_Oficial.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-serif font-bold bg-white text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>Descargar PDF Oficial</span>
              </a>

              <a
                href={getAssetUrl('paper.html')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold bg-white/10 hover:bg-white/15 border border-white/20 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Ver Paper Científico</span>
              </a>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-black/20 border border-white/10 text-xs font-mono space-y-2 max-w-sm w-full">
            <div className="font-bold border-b border-white/10 pb-1.5 opacity-90">
              Índice del Dossier Ejecutivo:
            </div>
            <div className="opacity-80 space-y-1">
              <div>1. Epistemología de Medios Continuos</div>
              <div>2. La Regla de Liebig Generalizada</div>
              <div>3. Ensayo de Tracción & Curvas σ-ε</div>
              <div>4. Deuda Entrópica Scope 3 (Chile vs Europa)</div>
              <div>5. Kit Audita tu Cuenca & Red Panal</div>
            </div>
          </div>
        </div>

        {/* ========================================================
            8. FAQ
            ======================================================== */}
        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold opacity-60 block">
              CLARIDAD CONCEPTUAL & OPERATIVA
            </span>
            <h2 className="text-2xl font-serif font-bold tracking-tight">
              Preguntas Frecuentes sobre el Think Tank & Incubadora
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className={`rounded-2xl border overflow-hidden transition-all shadow-xs ${current.faqCard}`}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm font-sans opacity-80 leading-relaxed border-t border-slate-200/60 dark:border-slate-800 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
