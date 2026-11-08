import React from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, ArrowRight, Download, ShieldCheck, 
  HeartPulse, Users, Microscope, Rocket, CheckCircle2, 
  ChevronRight, Compass, Scale, TreePine
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ThinkTankTeaserPortal({ onNavigate }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');

  return (
    <div className="relative rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white text-slate-900 p-7 sm:p-10 md:p-12">
      {/* Barra Superior Institucional */}
      <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#927660]" />

      <div className="relative z-10 space-y-8">
        {/* Cabecera del Portal */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                <Landmark className="w-3.5 h-3.5 text-[#1B4332]" />
                <span>NUESTRO THINK TANK & INCUBADORA</span>
              </div>
              <span className="text-[11px] font-mono font-medium text-[#1B4332] px-2.5 py-0.5 rounded-full bg-[#1B4332]/10 border border-[#1B4332]/20">
                SUR GLOBAL · TRANSDISCIPLINAR
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight text-slate-900 leading-tight">
              Ciencia de cuencas, cuidado psicosocial y soberanía vecinal
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-sans leading-relaxed">
              HOMBROS no es sólo un modelo matemático: es un centro de pensamiento crítico y acción territorial directa. Integramos la <strong>geofísica de sistemas complejos</strong> con la <strong>psicología comunitaria</strong> (en resistencia al modelo forestal) y la <strong>sociología de la seguridad vecinal</strong> para dotar a los territorios de evidencia inatacable y proyectos regenerativos reales.
            </p>
          </div>

          {/* Botones Principales de Acción */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('think_tank')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-serif font-bold text-white bg-[#1E293B] hover:bg-[#0F172A] shadow-sm transition-all transform hover:-translate-y-0.5 group"
            >
              <span>Explorar el Think Tank Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all group"
            >
              <Download className="w-4 h-4 text-[#1B4332] group-hover:-translate-y-0.5 transition-transform" />
              <span>Dossier Oficial en PDF</span>
            </a>
          </div>
        </div>

        {/* Tarjetas Gemelas: Misión & Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Misión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-slate-400 transition-all cursor-pointer group shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#1B4332]/10 text-[#1B4332] flex items-center justify-center font-bold">
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1B4332]">
                  Nuestra Misión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-sans italic border-l-2 border-[#1B4332] pl-3 leading-relaxed">
              "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos y aceleramos proyectos que devuelven soberanía y viabilidad material."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1B4332]" />
              <span>Evidencia técnica inatacable + Proyectos reales</span>
            </div>
          </div>

          {/* Visión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className="p-6 rounded-2xl bg-slate-50/80 border border-slate-200 hover:border-slate-400 transition-all cursor-pointer group shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#28475A]/10 text-[#28475A] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#28475A]">
                  Nuestra Visión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm text-slate-700 font-sans italic border-l-2 border-[#28475A] pl-3 leading-relaxed">
              "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#28475A]" />
              <span>Nuevo estándar vinculante + Salud comunitaria</span>
            </div>
          </div>
        </div>

        {/* Tríada de Fuerzas del Equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-slate-900">
              <Microscope className="w-4 h-4 text-[#1B4332]" />
              <span>Geofísica & Biofísica</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-normal">
              Daniel Santander: Límites físicos de cuenca, reología viscoelástica y scripts abiertos en R.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-slate-900">
              <HeartPulse className="w-4 h-4 text-[#991B1B]" />
              <span>Psicología Comunitaria</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-normal">
              Acompañamiento ante el conflicto forestal, sanación del trauma de incendios y duelo ecológico.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="flex items-center gap-2 text-xs font-serif font-bold text-slate-900">
              <Users className="w-4 h-4 text-[#28475A]" />
              <span>Seguridad Vecinal</span>
            </div>
            <p className="text-[11px] text-slate-600 font-sans leading-normal">
              Reconstrucción del tejido barrial, autogestión de riesgos y redes panal de ayuda mutua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
