import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Compass, ArrowRight, ShieldCheck, Activity, Satellite, Sparkles, Sliders, Move } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LandingSatelliteMapPreview from './LandingSatelliteMapPreview';
import ShouldersRadarTripod from './ShouldersRadarTripod';

export default function VisualToolsShowcase({ onNavigate }) {
  const { t } = useTranslation(['landing', 'common']);

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
            {t('visual_tools.section_badge')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            {t('visual_tools.section_title')}
          </h2>
        </div>
        <p className="text-xs text-slate-600 font-mono">
          {t('visual_tools.section_sub')}
        </p>
      </div>

      {/* 2-Column Visual Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        
        {/* CARD 1: Cartografía Satelital & Atlas */}
        <div className="rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#487075] to-[#28475A]" />
          
          <div className="p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#487075]/10 text-[#487075] border border-[#487075]/30">
                <Satellite className="w-3.5 h-3.5 text-[#487075]" />
                {t('visual_tools.atlas.badge')}
              </span>
              <button
                onClick={() => onNavigate('world_map')}
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FAF7F0] hover:bg-[#487075] hover:text-white border border-[#D4C9B8] text-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>{t('visual_tools.atlas.btn_top')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {t('visual_tools.atlas.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1 leading-relaxed">
                {t('visual_tools.atlas.description')}
              </p>

              {/* Informative Feature Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2.5 text-[11px] font-mono text-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#D4C9B8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <strong>{t('visual_tools.atlas.pill_nodos')}</strong>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#D4C9B8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-500" />
                  <span>{t('visual_tools.atlas.pill_semaforo')}</span>
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F0] border border-[#D4C9B8] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>{t('visual_tools.atlas.pill_scope3')}</span>
                </span>
              </div>
            </div>

            {/* Live Interactive Leaflet Satellite Preview */}
            <LandingSatelliteMapPreview onNavigate={onNavigate} />
          </div>

          {/* Action Footer */}
          <div 
            onClick={() => onNavigate('world_map')}
            className="p-3.5 sm:p-4 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#487075] hover:text-[#28475A] cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>{t('visual_tools.atlas.footer_text')}</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">{t('visual_tools.atlas.footer_sub')}</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* CARD 2: Trípode de Capacidad Portante (Interactivo en Vivo) */}
        <div className="rounded-3xl overflow-hidden border border-[#D4C9B8] bg-white/95 backdrop-blur-md shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
          {/* Top accent line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#C86D51] via-[#927660] to-[#1B4332]" />
          
          <div className="p-5 sm:p-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-[#C86D51]/10 text-[#C86D51] border border-[#C86D51]/30">
                <Activity className="w-3.5 h-3.5 text-[#C86D51]" />
                {t('visual_tools.tripod.badge')}
              </span>
              <button
                onClick={() => onNavigate('core')}
                className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#FAF7F0] hover:bg-[#C86D51] hover:text-white border border-[#D4C9B8] text-slate-800 transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <span>{t('visual_tools.tripod.btn_top')}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                {t('visual_tools.tripod.title')}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1 leading-relaxed">
                {t('visual_tools.tripod.description')}
              </p>
            </div>

            {/* Floating Action Banner Above Trípode */}
            <div 
              onClick={() => onNavigate('core')}
              className="p-2 sm:p-2.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-[#C86D51] text-white shadow-xl flex items-center justify-between cursor-pointer hover:bg-slate-900 transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C86D51] animate-ping" />
                <span className="font-bold text-[#DA7B93]">{t('visual_tools.tripod.floating_cta')}</span>
              </div>
              <span className="text-[11px] font-mono text-slate-300 hidden sm:flex items-center gap-1">
                <Move className="w-3 h-3 text-[#DA7B93]" />
                <span>{t('visual_tools.tripod.floating_sub')}</span>
              </span>
            </div>

            {/* Live Interactive ShouldersRadarTripod */}
            <div className="relative rounded-2xl overflow-hidden border border-[#D4C9B8]/70 bg-[#FAF7F0]/60 p-2 sm:p-2.5 flex items-center justify-center">
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
            className="p-3.5 sm:p-4 bg-[#FAF7F0] border-t border-[#D4C9B8]/60 flex items-center justify-between text-xs font-serif font-bold text-[#C86D51] hover:text-[#927660] cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>{t('visual_tools.tripod.footer_text')}</span>
              <span className="text-[10px] font-mono font-normal text-slate-500">{t('visual_tools.tripod.footer_sub')}</span>
            </span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

      </div>
    </div>
  );
}
