import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Compass, ArrowRight, ShieldCheck, Activity, Satellite, Sparkles, Sliders, Move } from 'lucide-react';
import LandingSatelliteMapPreview from './LandingSatelliteMapPreview';
import ShouldersRadarTripod from './ShouldersRadarTripod';

export default function VisualToolsShowcase({ onNavigate }) {
  // Estado local para el Trípode interactivo en vivo en la landing
  const [S, setS] = useState(0.70); // Social
  const [E, setE] = useState(0.75); // Ambiental
  const [K, setK] = useState(0.65); // Capital

  const H = Math.pow(S * E * K, 1 / 3);
  const hasCritical = S < 0.25 || E < 0.25 || K < 0.25;

  const handleShoulderChange = (shoulder, val) => {
    if (shoulder === 'S') setS(val);
    if (shoulder === 'E') setE(val);
    if (shoulder === 'K') setK(val);
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#1B4332] font-bold block">
            ACCESOS DIRECTOS INTERACTIVOS EN VIVO
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Herramientas Visuales de la Plataforma
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          Prueba los motores visuales aquí o ábrelos para explorar la plataforma
        </p>
      </div>

      {/* 2-Column Visual Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">
        
        {/* CARD 1: Cartografía Satelital & Atlas */}
        <div className="rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#487075] to-[#28475A]" />
          
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#487075]/10 text-[#487075] border border-[#487075]/30">
                <Satellite className="w-3.5 h-3.5 text-[#487075]" />
                Cartografía Satelital de Cuencas
              </span>
              <button
                onClick={() => onNavigate('world_map')}
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FAF7F0] hover:bg-[#487075] hover:text-white border border-[#D4C9B8] text-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>Ver Atlas</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Atlas Territorial & Telemetría Orbital
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-1">
                Monitorea en tiempo real 25 cuencas y ciudades en Chile Central y Europa. Visualiza el Semáforo Biofísico, el balance hídrico y las redes metabólicas.
              </p>
            </div>

            {/* Live Interactive Leaflet Satellite Preview */}
            <LandingSatelliteMapPreview onNavigate={onNavigate} />
          </div>

          {/* Action Footer */}
          <div 
            onClick={() => onNavigate('world_map')}
            className="p-4 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#487075] hover:text-[#28475A] cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>Abrir Mapa de Cartografía Satelital Completo</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">(25 Cuencas)</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 2: Trípode de Capacidad Portante (Interactivo en Vivo) */}
        <div className="rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#C86D51] via-[#927660] to-[#1B4332]" />
          
          <div className="p-6 sm:p-7 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C86D51]/10 text-[#C86D51] border border-[#C86D51]/30">
                <Activity className="w-3.5 h-3.5 text-[#C86D51]" />
                Trípode Interactivo de Capacidad Portante
              </span>
              <button
                onClick={() => onNavigate('core')}
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FAF7F0] hover:bg-[#C86D51] hover:text-white border border-[#D4C9B8] text-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>Abrir CORE</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Trípode Biofísico: H = (S · E · K)<sup>1/3</sup>
              </h3>
              <p className="text-xs text-slate-600 font-sans mt-1">
                La regla no compensatoria de Liebig: arrastra los 3 vértices en la figura para observar cómo la pérdida de un solo pilar arrastra a cero la capacidad portante total.
              </p>
            </div>

            {/* Floating Action Banner Above Trípode */}
            <div 
              onClick={() => onNavigate('core')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-[#C86D51] text-white shadow-xl flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51] animate-ping" />
                <span className="font-bold text-[#DA7B93]">¡Aprieta aquí o arrastra los vértices para probar el trípode!</span>
              </div>
              <span className="text-[11px] font-mono text-slate-300 hidden sm:flex items-center gap-1">
                <Move className="w-3 h-3 text-[#DA7B93]" />
                <span>Interactivo</span>
              </span>
            </div>

            {/* Live Interactive ShouldersRadarTripod */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D4C9B8]/70 bg-[#FAF7F0]/60 p-2 sm:p-3 flex items-center justify-center">
              <ShouldersRadarTripod
                S={S}
                E={E}
                K={K}
                H={H}
                hasCriticalShoulder={hasCritical}
                criticalDetails={{}}
                onShoulderChange={handleShoulderChange}
              />
            </div>
          </div>

          {/* Action Footer */}
          <div 
            onClick={() => onNavigate('core')}
            className="p-4 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#C86D51] hover:text-[#927660] cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>Experimentar en el Simulador Completo CORE</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">(12 Variables)</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
