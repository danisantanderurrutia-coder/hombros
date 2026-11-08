import React from 'react';
import { getAssetUrl } from '../utils/assets';

/**
 * SolarpunkAtlasCanvas — Wallpaper Oficial HOMBROS
 * 
 * Integra:
 *  1. Imagen Panorámica: Madre con niño en hombros sosteniendo el pequeño planeta Tierra,
 *     con la vasta cuenca andina y río en el fondo (wallpaper_madre_nino_planeta_v1.jpg).
 *  2. Velo Arquitectónico Vellum / Alabastro: Permite apreciar la escena humana y paisajística
 *     con calidez sin interferir con la legibilidad y contraste de los textos institucionales.
 *  3. Retícula Cartográfica Geodésica: Puntos de mira (+) y cotas topográficas sutiles.
 *  4. Coordenadas Marginales: Datum WGS-84 y Sistema Metabólico Territorial.
 */
export default function SolarpunkAtlasCanvas() {
  const wallpaperUrl = getAssetUrl('art/wallpaper_madre_nino_planeta_v1.jpg');

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. IMAGEN PANORÁMICA DE BASE (MADRE, NIÑO Y PLANETA EN LA CUENCA ANDINA) */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={wallpaperUrl}
          alt="Madre con niño en hombros sosteniendo la Tierra - HOMBROS"
          className="w-full h-full object-cover object-right md:object-center filter saturate-[1.05] contrast-[1.02]"
        />
      </div>

      {/* 2. VELO ARQUITECTÓNICO VELLUM / CRISTAL TRAVERTINO PULIDO */}
      {/* Equilibrio armónico: deja brillar el paisaje y la figura humana con nitidez y calidez, */}
      {/* a la vez que asegura contraste óptimo (WCAG AAA) para las tarjetas y textos de la web. */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, 
              rgba(248, 246, 241, 0.62) 0%, 
              rgba(245, 242, 236, 0.45) 30%, 
              rgba(243, 239, 231, 0.55) 70%,
              rgba(240, 235, 226, 0.72) 100%
            ),
            radial-gradient(ellipse 90% 60% at 25% 20%, rgba(255, 255, 255, 0.70) 0%, transparent 60%),
            radial-gradient(circle 800px at 85% 60%, rgba(200, 109, 81, 0.08) 0%, transparent 60%)
          `,
          backdropFilter: 'blur(1.2px)',
          WebkitBackdropFilter: 'blur(1.2px)'
        }}
      />

      {/* 3. FILIGRANA DE RETÍCULA CARTOGRÁFICA GEODÉSICA DE CAMPO */}
      <svg 
        className="absolute inset-0 w-full h-full opacity-25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="cartoFineGeoGrid" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Líneas sutiles de cuadrícula */}
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(40, 71, 90, 0.12)" strokeWidth="0.7" />
            {/* Cruz de precisión cartográfica en el nodo (+) */}
            <path d="M -4 0 L 4 0 M 0 -4 L 0 4" stroke="rgba(40, 71, 90, 0.35)" strokeWidth="0.8" />
            <path d="M 96 0 L 104 0 M 100 -4 L 100 4" stroke="rgba(40, 71, 90, 0.35)" strokeWidth="0.8" />
            <path d="M -4 100 L 4 100 M 0 96 L 0 104" stroke="rgba(40, 71, 90, 0.35)" strokeWidth="0.8" />
            <path d="M 96 100 L 104 100 M 100 96 L 100 104" stroke="rgba(40, 71, 90, 0.35)" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cartoFineGeoGrid)" />
      </svg>

      {/* 4. COORDENADAS MARGINALES Y COTAS DE ATLAS EN LOS BORDES */}
      <div className="absolute top-2 left-6 text-[10px] font-mono font-bold tracking-widest text-[#28475A]/75 flex items-center gap-3 bg-white/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-[#D4C9B8]/70 shadow-2xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
        <span>33° 26' 16" S · 70° 39' 01" W</span>
        <span>•</span>
        <span>SISTEMA METABÓLICO HOMBROS</span>
        <span>•</span>
        <span>CUENCA AGROECOLÓGICA</span>
      </div>

      <div className="absolute bottom-2 left-6 text-[10px] font-mono font-bold tracking-widest text-[#28475A]/75 flex items-center gap-3 bg-white/70 px-3.5 py-1 rounded-full backdrop-blur-md border border-[#D4C9B8]/70 shadow-2xs">
        <span>DATUM: WGS-84 / SIRGAS-CHILE</span>
        <span>•</span>
        <span>ESCALA TOPOGRÁFICA 1:25.000</span>
        <span>•</span>
        <span>SOBERANÍA BIOFÍSICA & CUIDADO</span>
      </div>
    </div>
  );
}
