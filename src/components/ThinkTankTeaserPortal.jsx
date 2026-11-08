import React from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, Sparkles, ArrowRight, Download, ShieldCheck, 
  HeartPulse, Users, Microscope, Rocket, CheckCircle2, 
  ChevronRight, Compass, Scale, TreePine
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ThinkTankTeaserPortal({ onNavigate }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');

  return (
    <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_12px_45px_rgba(0,0,0,0.45)] bg-gradient-to-br from-[#060D17] via-[#0B1A2C] to-[#081523] text-white p-7 sm:p-10 md:p-12">
      {/* Resplandores Bioluminiscentes de Fondo */}
      <div className="absolute top-0 right-0 w-[420px] h-[320px] bg-gradient-to-bl from-emerald-500/15 via-teal-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[380px] h-[280px] bg-gradient-to-tr from-amber-500/15 via-rose-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Borde Superior Tricolor Vibrante */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />

      <div className="relative z-10 space-y-8">
        {/* Cabecera del Portal */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-emerald-950/80 text-emerald-300 border border-emerald-400/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Landmark className="w-3.5 h-3.5 text-emerald-300" />
                <span>NUESTRO THINK TANK & INCUBADORA</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-amber-300/90 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-400/30">
                SUR GLOBAL · TRANSDISCIPLINAR
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-white leading-tight">
              Ciencia de cuencas, cuidado psicosocial y soberanía vecinal
            </h2>

            <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
              HOMBROS no es sólo un modelo matemático: es un centro de pensamiento crítico y acción territorial directa. Integramos la <strong>geofísica de sistemas complejos</strong> con la <strong>psicología comunitaria</strong> (en resistencia al modelo forestal) y la <strong>sociología de la seguridad vecinal</strong> para dotar a los territorios de evidencia inatacable y proyectos regenerativos reales.
            </p>
          </div>

          {/* Botones Principales de Acción */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('think_tank')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-serif font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-emerald-300 to-teal-300 hover:brightness-110 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all transform hover:-translate-y-0.5 group"
            >
              <span>Explorar el Think Tank Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 backdrop-blur-md transition-all group"
            >
              <Download className="w-4 h-4 text-emerald-300 group-hover:-translate-y-0.5 transition-transform" />
              <span>Dossier Oficial en PDF</span>
            </a>
          </div>
        </div>

        {/* Tarjetas Gemelas Vivas: Misión & Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Misión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#081A25] to-[#0A1624] border border-emerald-500/30 hover:border-emerald-400 transition-all cursor-pointer group shadow-inner space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Nuestra Misión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-300 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm text-slate-200 font-sans italic border-l-2 border-emerald-400/60 pl-3 leading-relaxed">
              "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos y aceleramos proyectos que devuelven soberanía y viabilidad material."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-300/80 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Evidencia técnica inatacable + Proyectos reales</span>
            </div>
          </div>

          {/* Visión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className="p-6 rounded-2xl bg-gradient-to-br from-[#1A140D] to-[#120F0A] border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer group shadow-inner space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-400/40 flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                  Nuestra Visión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm text-amber-100/90 font-sans italic border-l-2 border-amber-400/60 pl-3 leading-relaxed">
              "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300/80 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Nuevo estándar vinculante + Salud comunitaria</span>
            </div>
          </div>
        </div>

        {/* Tríada de Fuerzas del Equipo (Fichas Rápidas) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-emerald-300">
              <Microscope className="w-4 h-4 text-emerald-400" />
              <span>Geofísica & Biofísica</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Daniel Santander: Límites físicos de cuenca, reología viscoelástica y scripts abiertos en R.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-rose-300">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>Psicología Comunitaria</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Acompañamiento ante el conflicto forestal, sanación del trauma de incendios y duelo ecológico.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-300">
              <Users className="w-4 h-4 text-amber-400" />
              <span>Seguridad Vecinal</span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans leading-normal">
              Reconstrucción del tejido barrial, autogestión de riesgos y redes panal de ayuda mutua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
