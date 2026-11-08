import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Landmark, ArrowRight, Download, ShieldCheck, 
  HeartPulse, Users, Microscope, Rocket, CheckCircle2, 
  ChevronRight, Compass, Scale, TreePine, Palette, Check
} from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export default function ThinkTankTeaserPortal({ onNavigate }) {
  const presentationPdfUrl = getAssetUrl('docs/HOMBROS_Presentacion_Oficial.pdf');
  const portalTheme = 'biofisica';

  const themes = {
    biofisica: {
      id: 'biofisica',
      name: 'Auditoría Biofísica & Travertino',
      container: 'bg-white/95 backdrop-blur-md border-[#D4C9B8] shadow-md text-slate-900',
      accentLine: 'bg-gradient-to-r from-[#1B4332] via-[#487075] to-[#C86D51]',
      badgeMain: 'bg-[#EDE8DC] text-slate-800 border-[#D4C9B8]',
      badgeSub: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/30',
      title: 'text-slate-900',
      desc: 'text-slate-700',
      cardMission: 'bg-[#FAF7F0] border-[#D4C9B8] hover:border-[#487075] text-slate-800',
      cardVision: 'bg-[#FAF7F0] border-[#D4C9B8] hover:border-[#C86D51] text-slate-800',
      cardTeam: 'bg-[#FAF7F0] border-[#D4C9B8] text-slate-800',
      btnPrimary: 'bg-[#28475A] hover:bg-[#1E293B] text-white shadow-sm border border-[#1E293B]',
      btnSecondary: 'bg-white hover:bg-[#EDE8DC] text-slate-800 border-[#D4C9B8]',
      iconBox: 'bg-[#EDE8DC] text-[#28475A]'
    },
    alabastro: {
      id: 'alabastro',
      name: '1. Blanco Alabastro & Cartografía',
      container: 'bg-white border-slate-200/90 shadow-sm text-slate-900',
      accentLine: 'bg-gradient-to-r from-[#1B4332] via-[#28475A] to-[#927660]',
      badgeMain: 'bg-slate-100 text-slate-700 border-slate-200',
      badgeSub: 'bg-[#1B4332]/10 text-[#1B4332] border-[#1B4332]/20',
      title: 'text-slate-900',
      desc: 'text-slate-600',
      cardMission: 'bg-slate-50/80 border-slate-200 hover:border-slate-400 text-slate-800',
      cardVision: 'bg-slate-50/80 border-slate-200 hover:border-slate-400 text-slate-800',
      cardTeam: 'bg-slate-50 border-slate-200/80 text-slate-800',
      btnPrimary: 'bg-[#1E293B] hover:bg-[#0F172A] text-white shadow-sm border border-slate-900',
      btnSecondary: 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200',
      iconBox: 'bg-[#1B4332]/10 text-[#1B4332]'
    }
  };

  const cur = themes[portalTheme];

  return (
    <div className={`relative rounded-3xl overflow-hidden border p-7 sm:p-10 md:p-12 transition-all duration-300 ${cur.container}`}>
      {/* Barra Superior Institucional */}
      <div className={`absolute top-0 inset-x-0 h-1.5 ${cur.accentLine}`} />

      <div className="relative z-10 space-y-8">
        {/* Cabecera del Portal */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-black/5 dark:border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border ${cur.badgeMain}`}>
                <Landmark className="w-3.5 h-3.5" />
                <span>NUESTRO THINK TANK & INCUBADORA</span>
              </div>
              <span className={`text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full border ${cur.badgeSub}`}>
                SUR GLOBAL · TRANSDISCIPLINAR
              </span>
            </div>

            <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-extrabold tracking-tight leading-tight ${cur.title}`}>
              Ciencia de cuencas, cuidado psicosocial y soberanía vecinal
            </h2>

            <p className={`text-sm sm:text-base font-sans leading-relaxed ${cur.desc}`}>
              HOMBROS no es sólo un modelo matemático: es un centro de pensamiento crítico y acción territorial directa. Integramos la <strong>geofísica de sistemas complejos</strong> con la <strong>psicología comunitaria</strong> (en resistencia al modelo forestal) y la <strong>sociología de la seguridad vecinal</strong> para dotar a los territorios de evidencia inatacable y proyectos regenerativos reales.
            </p>
          </div>

          {/* Botones Principales de Acción */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={() => onNavigate('think_tank')}
              className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-serif font-bold transition-all transform hover:-translate-y-0.5 group ${cur.btnPrimary}`}
            >
              <span>Explorar el Think Tank Completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={presentationPdfUrl}
              download="HOMBROS_Presentacion_Oficial.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-mono font-bold transition-all group ${cur.btnSecondary}`}
            >
              <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Dossier Oficial en PDF</span>
            </a>
          </div>
        </div>

        {/* Tarjetas Gemelas: Misión & Visión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Misión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer group shadow-xs space-y-3 ${cur.cardMission}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${cur.iconBox}`}>
                  <Compass className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-90">
                  Nuestra Misión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm font-sans italic border-l-2 border-emerald-600 pl-3 leading-relaxed opacity-90">
              "Cuantificar el estado social, económico y ecológico de los territorios, proveyendo la evidencia técnica necesaria para detener el colapso extractivo y planificar la regeneración sistémica; al tiempo que incubamos y aceleramos proyectos que devuelven soberanía y viabilidad material."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono opacity-75 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Evidencia técnica inatacable + Proyectos reales</span>
            </div>
          </div>

          {/* Visión Card */}
          <div 
            onClick={() => onNavigate('think_tank')}
            className={`p-6 rounded-2xl border transition-all cursor-pointer group shadow-xs space-y-3 ${cur.cardVision}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${cur.iconBox}`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider opacity-90">
                  Nuestra Visión
                </span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </div>

            <p className="text-xs sm:text-sm font-sans italic border-l-2 border-amber-600 pl-3 leading-relaxed opacity-90">
              "Transformar el paradigma del desarrollo en el Sur Global hacia un modelo de seguridad integral y cuidado de la vida, donde las comunidades dispongan de la fuerza para proteger sus bienes comunes, reparar la fractura extractiva y liderar su propio autogobierno territorial."
            </p>

            <div className="flex items-center gap-2 text-[10px] font-mono opacity-75 pt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
              <span>Nuevo estándar vinculante + Salud comunitaria</span>
            </div>
          </div>
        </div>

        {/* Tríada de Fuerzas del Equipo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          <div className={`p-4 rounded-xl border space-y-1 ${cur.cardTeam}`}>
            <div className="flex items-center gap-2 text-xs font-serif font-bold">
              <Microscope className="w-4 h-4 text-emerald-600" />
              <span>Geofísica & Biofísica</span>
            </div>
            <p className="text-[11px] opacity-80 font-sans leading-normal">
              Daniel Santander: Límites físicos de cuenca, reología viscoelástica y scripts abiertos en R.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 ${cur.cardTeam}`}>
            <div className="flex items-center gap-2 text-xs font-serif font-bold">
              <HeartPulse className="w-4 h-4 text-rose-600" />
              <span>Psicología Comunitaria</span>
            </div>
            <p className="text-[11px] opacity-80 font-sans leading-normal">
              Acompañamiento ante el conflicto forestal, sanación del trauma de incendios y duelo ecológico.
            </p>
          </div>

          <div className={`p-4 rounded-xl border space-y-1 ${cur.cardTeam}`}>
            <div className="flex items-center gap-2 text-xs font-serif font-bold">
              <Users className="w-4 h-4 text-amber-600" />
              <span>Seguridad Vecinal</span>
            </div>
            <p className="text-[11px] opacity-80 font-sans leading-normal">
              Reconstrucción del tejido barrial, autogestión de riesgos y redes panal de ayuda mutua.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
