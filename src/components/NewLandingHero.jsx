import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, Landmark, ShieldCheck, Activity, Globe, 
  ArrowRight, Download, FileText, Sparkles, Layers,
  Compass, CheckCircle2, ChevronRight, Trees, Users, 
  Scale, Milestone, Cpu, ExternalLink
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function NewLandingHero({ onNavigate, onNavigateCustomAudit }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');

  const metricHighlights = [
    { label: 'Cuencas & Nodos Calibrados', value: '25', sub: 'Chile Central & Europa', icon: Globe },
    { label: 'Ejes Transdisciplinares', value: '4', sub: 'Geofísica, Psicología, Sociología, Ecotecnias', icon: Layers },
    { label: 'Protocolo SEIA 2.0', value: 'Vinculante', sub: 'Cláusula Pre-Inversional de Salvaguarda', icon: Scale },
    { label: 'Ciencia Abierta', value: '100% R', sub: 'Scripts canónicos reproducibles', icon: Activity },
  ];

  const primaryGateways = [
    {
      id: 'think_tank',
      title: 'El Think Tank & Incubadora',
      tag: 'MISIÓN, VISIÓN & ACCIÓN',
      desc: 'Centro de soberanía biofísica, psicología comunitaria en conflictos forestales, seguridad vecinal y proyectos en terreno.',
      icon: Landmark,
      color: 'from-[#1B4332] to-[#2D5A46]',
      accentBorder: 'hover:border-[#1B4332]',
      btnText: 'Conocer Institución'
    },
    {
      id: 'audit',
      title: 'Auditoría Biofísica de Cuencas',
      tag: 'SEIA 2.0 & TELEMETRÍA',
      desc: 'Ensayo de tracción pre-inversión, conector AgriTwin en tiempo real y cálculo del Costo de Inacción vs. Regeneración.',
      icon: ShieldCheck,
      color: 'from-[#C86D51] to-[#927660]',
      accentBorder: 'hover:border-[#C86D51]',
      btnText: 'Auditar Cuenca'
    },
    {
      id: 'core',
      title: 'Motor Matemático CORE',
      tag: 'LEYES FÍSICAS & REOLOGÍA',
      desc: 'Mecánica de medios continuos: Capacidad Portante de Liebig (H), Tensión Sistémica (σ = D/H) y Tasa Sintrópica (Γ).',
      icon: Activity,
      color: 'from-[#28475A] to-[#1E293B]',
      accentBorder: 'hover:border-[#28475A]',
      btnText: 'Ver Ecuaciones'
    },
    {
      id: 'world_map',
      title: 'Atlas Territorial Global',
      tag: 'OBSERVATORIO DE CIUDADES',
      desc: 'Semáforo biofísico de 25 territorios contrastados, Deuda Entrópica Scope 3 (Chile vs. Europa) y Red Panal de APRs.',
      icon: Globe,
      color: 'from-[#487075] to-[#28475A]',
      accentBorder: 'hover:border-[#487075]',
      btnText: 'Abrir Atlas'
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
              <span>THINK TANK & INCUBADORA TERRITORIAL</span>
            </div>
            <span className="text-[11px] font-mono font-medium text-[#1B4332] px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20">
              SUR GLOBAL · TRANSDISCIPLINAR
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Soberanía Biofísica, Gobernanza de Cuencas y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#C86D51] italic">
              Acción Regenerativa
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-600 font-sans leading-relaxed max-w-3xl">
            El primer centro de investigación, política pública y aceleración territorial que integra la <strong>geofísica de sistemas complejos</strong>, la <strong>psicología comunitaria</strong> en conflictos extractivos y la <strong>sociología de la seguridad vecinal</strong> para reemplazar la autopsia ambiental por salvaguardas vinculantes y proyectos productivos reales.
          </p>

          {/* Botones de Acción Inmediata */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => onNavigate('think_tank')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-serif font-bold text-white bg-[#1E293B] hover:bg-[#0F172A] shadow-md transition-all transform hover:-translate-y-0.5 group"
            >
              <Landmark className="w-4 h-4 text-emerald-400" />
              <span>Explorar el Think Tank</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('audit')}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-[#1B4332] bg-[#1B4332]/10 hover:bg-[#1B4332]/20 border border-[#1B4332]/30 transition-all"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Kit Audita tu Cuenca (SEIA 2.0)</span>
            </button>

            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl text-xs sm:text-sm font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-all group"
            >
              <Download className="w-4 h-4 text-slate-600 group-hover:-translate-y-0.5 transition-transform" />
              <span>Dossier Oficial en PDF</span>
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
              ECOSISTEMA OPERATIVO
            </span>
            <h2 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Puertas de Acceso a la Plataforma
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            Selecciona un área para ingresar directamente al módulo de trabajo
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
