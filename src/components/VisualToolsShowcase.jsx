import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Compass, ArrowRight, ShieldCheck, Activity, Satellite, Layers, Sparkles } from 'lucide-react';

export default function VisualToolsShowcase({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B4332] font-bold block">
            ACCESOS DIRECTOS · HERRAMIENTAS VISUALES
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Exploradores Visuales del Territorio
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          Haz clic para abrir directamente los módulos interactivos
        </p>
      </div>

      {/* 2-Column Visual Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
        
        {/* CARD 1: Cartografía Satelital & Atlas */}
        <div 
          onClick={() => onNavigate('world_map')}
          className="group relative rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl hover:border-[#487075] transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#487075] to-[#28475A]" />
          
          <div className="p-7 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#487075]/10 text-[#487075] border border-[#487075]/30">
                <Satellite className="w-3.5 h-3.5 text-[#487075]" />
                Cartografía Satelital & Semáforo
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#EDE8DC] text-[#487075] group-hover:bg-[#487075] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <Globe className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-[#487075] transition-colors">
                Atlas de Cuencas & Teledetección Orbital
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
                Explora el mapa satelital interactivo con <strong>25 territorios y cuencas calibradas</strong> en Chile Central y Europa. Visualiza el Semáforo Biofísico, el balance de sequía, la huella importada Scope 3 y la red de flujos metabólicos.
              </p>
            </div>

            {/* Visual Tags / Highlights */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#D4C9B8]/50 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8]/60 text-slate-700">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Observatorio Situado</span>
                <strong>25 Ciudades & Cuencas</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8]/60 text-slate-700">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Telemetría Orbital</span>
                <strong>Capas Sentinel & Clima</strong>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-5 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#487075] group-hover:text-[#28475A]">
            <span className="flex items-center gap-2">
              <span>Abrir Mapa de Cartografía Satelital</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">(Interactivo)</span>
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

        {/* CARD 2: Trípode de Capacidad Portante (Interactivo) */}
        <div 
          onClick={() => onNavigate('core')}
          className="group relative rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl hover:border-[#C86D51] transition-all duration-300 cursor-pointer flex flex-col justify-between"
        >
          {/* Top accent */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#C86D51] via-[#927660] to-[#1B4332]" />
          
          <div className="p-7 sm:p-8 space-y-5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C86D51]/10 text-[#C86D51] border border-[#C86D51]/30">
                <Activity className="w-3.5 h-3.5 text-[#C86D51]" />
                Trípode Interactivo de Capacidad Portante
              </span>
              <div className="w-10 h-10 rounded-2xl bg-[#EDE8DC] text-[#C86D51] group-hover:bg-[#C86D51] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                <Compass className="w-5 h-5" />
              </div>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 group-hover:text-[#C86D51] transition-colors">
                Trípode de Capacidad Portante: H = (S · E · K)<sup>1/3</sup>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans mt-2">
                Experimenta en vivo con el <strong>Trípode de Hombros</strong>: simula cómo interactúan el hombro ambiental (<strong className="text-[#1B4332]">E</strong>), el social (<strong className="text-[#C86D51]">S</strong>) y el capital regenerativo (<strong className="text-[#927660]">K</strong>) bajo la Ley de Liebig no compensatoria.
              </p>
            </div>

            {/* Visual Tags / Highlights */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#D4C9B8]/50 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8]/60 text-slate-700">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Regla de Liebig</span>
                <strong>No Compensabilidad 0.25</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FAF7F0] border border-[#D4C9B8]/60 text-slate-700">
                <span className="block text-[10px] text-slate-500 font-bold uppercase">Simulación Dinámica</span>
                <strong>12 Variables en Vivo</strong>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="p-5 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#C86D51] group-hover:text-[#927660]">
            <span className="flex items-center gap-2">
              <span>Experimentar con el Trípode Interactivo</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">(CORE Dashboard)</span>
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
}
